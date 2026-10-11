import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("In-Memory Sliding Window Rate Limiter", () => {
  it("permits initial requests and blocks on 6th request from same IP", () => {
    const testIp = "test_ip_192_168_1_100";

    // 5 allowed
    for (let i = 0; i < 5; i++) {
      const res = checkRateLimit(testIp);
      expect(res.success).toBe(true);
    }

    // 6th blocked
    const blocked = checkRateLimit(testIp);
    expect(blocked.success).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("limits submissions per phone number to 3 per hour", () => {
    const testPhone = "+919487530299";
    const uniqueIp1 = "ip_1";
    const uniqueIp2 = "ip_2";
    const uniqueIp3 = "ip_3";
    const uniqueIp4 = "ip_4";

    expect(checkRateLimit(uniqueIp1, testPhone).success).toBe(true);
    expect(checkRateLimit(uniqueIp2, testPhone).success).toBe(true);
    expect(checkRateLimit(uniqueIp3, testPhone).success).toBe(true);

    // 4th request with same phone blocked even from new IP
    const blockedPhone = checkRateLimit(uniqueIp4, testPhone);
    expect(blockedPhone.success).toBe(false);
    expect(blockedPhone.reason).toContain("Phone rate limit exceeded");
  });
});
