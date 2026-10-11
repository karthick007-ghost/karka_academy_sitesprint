interface RateLimitRecord {
  timestamps: number[];
}

const ipStore = new Map<string, RateLimitRecord>();
const phoneStore = new Map<string, RateLimitRecord>();

// Cleanup stale records every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipStore.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < 10 * 60 * 1000);
    if (record.timestamps.length === 0) ipStore.delete(ip);
  }
  for (const [phone, record] of phoneStore.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < 60 * 60 * 1000);
    if (record.timestamps.length === 0) phoneStore.delete(phone);
  }
}, 15 * 60 * 1000).unref();

export function checkRateLimit(
  ipHash: string,
  normalizedPhone?: string
): { success: boolean; retryAfter?: number; reason?: string } {
  const now = Date.now();

  // 1. Check IP rate limit: 5 requests per 10 minutes (600,000 ms)
  const ipWindowMs = 10 * 60 * 1000;
  const maxPerIp = 5;
  const ipRecord = ipStore.get(ipHash) || { timestamps: [] };
  ipRecord.timestamps = ipRecord.timestamps.filter((t) => now - t < ipWindowMs);

  if (ipRecord.timestamps.length >= maxPerIp) {
    const oldest = ipRecord.timestamps[0];
    const retryAfter = Math.ceil((ipWindowMs - (now - oldest)) / 1000);
    return { success: false, retryAfter: Math.max(retryAfter, 1), reason: "IP rate limit exceeded" };
  }

  // 2. Check Phone rate limit if phone is provided: 3 requests per hour (3,600,000 ms)
  if (normalizedPhone) {
    const phoneWindowMs = 60 * 60 * 1000;
    const maxPerPhone = 3;
    const phoneRecord = phoneStore.get(normalizedPhone) || { timestamps: [] };
    phoneRecord.timestamps = phoneRecord.timestamps.filter((t) => now - t < phoneWindowMs);

    if (phoneRecord.timestamps.length >= maxPerPhone) {
      const oldest = phoneRecord.timestamps[0];
      const retryAfter = Math.ceil((phoneWindowMs - (now - oldest)) / 1000);
      return { success: false, retryAfter: Math.max(retryAfter, 1), reason: "Phone rate limit exceeded" };
    }

    phoneRecord.timestamps.push(now);
    phoneStore.set(normalizedPhone, phoneRecord);
  }

  ipRecord.timestamps.push(now);
  ipStore.set(ipHash, ipRecord);

  return { success: true };
}
