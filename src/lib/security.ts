import crypto from "crypto";

export function normalizePhone(rawPhone: string): string {
  // Strip all non-digit characters
  const digits = rawPhone.replace(/\D/g, "");

  // If 10 digits starting with 6-9:
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `+91${digits}`;
  }

  // If 11 digits starting with 0 followed by 6-9:
  if (digits.length === 11 && digits.startsWith("0") && /^[6-9]/.test(digits.slice(1))) {
    return `+91${digits.slice(1)}`;
  }

  // If 12 digits starting with 91 followed by 6-9:
  if (digits.length === 12 && digits.startsWith("91") && /^[6-9]/.test(digits.slice(2))) {
    return `+91${digits.slice(2)}`;
  }

  throw new Error("Invalid Indian mobile number format");
}

export function hashIp(ip: string, salt?: string): string {
  const secretSalt = salt || process.env.IP_HASH_SALT || "karka_default_ip_hash_salt";
  return crypto.createHmac("sha256", secretSalt).update(ip).digest("hex");
}

export function verifyOrigin(originHeader: string | null, hostHeader: string | null): boolean {
  if (!originHeader || !hostHeader) return true; // Relaxed in testing/curl
  try {
    const originUrl = new URL(originHeader);
    const host = hostHeader.split(":")[0];
    return originUrl.hostname === host || originUrl.hostname === "localhost";
  } catch {
    return false;
  }
}
