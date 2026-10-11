import { describe, it, expect } from "vitest";
import { LeadSubmissionSchema } from "@/lib/schemas";
import { normalizePhone } from "@/lib/security";

describe("Lead Submission Zod Validation Schema", () => {
  it("validates a compliant submission", () => {
    const validData = {
      name: "Senthil Kumar",
      phone: "9487530243",
      email: "senthil@example.com",
      program: "mern-fullstack",
      consent: true,
      consentVersion: "v1.0-dpdp2023",
      hp: "",
    };

    const res = LeadSubmissionSchema.safeParse(validData);
    expect(res.success).toBe(true);
  });

  it("accepts valid Tamil Unicode names", () => {
    const tamilData = {
      name: "செந்தில் குமார்",
      phone: "+91 9487530243",
      consent: true,
      hp: "",
    };

    const res = LeadSubmissionSchema.safeParse(tamilData);
    expect(res.success).toBe(true);
  });

  it("rejects names with numbers or script injection tags", () => {
    const badNames = [
      "<script>alert(1)</script>",
      "John Doe 123",
      "A", // Too short
      "'); DROP TABLE leads;--",
    ];

    for (const name of badNames) {
      const res = LeadSubmissionSchema.safeParse({
        name,
        phone: "9487530243",
        consent: true,
        hp: "",
      });
      expect(res.success).toBe(false);
    }
  });

  it("rejects submission if consent is false or missing", () => {
    const noConsent = {
      name: "Ramesh",
      phone: "9876543210",
      consent: false,
      hp: "",
    };

    const res = LeadSubmissionSchema.safeParse(noConsent);
    expect(res.success).toBe(false);
  });
});

describe("Phone Normalization", () => {
  it("normalizes 10-digit Indian numbers starting with 6-9", () => {
    expect(normalizePhone("9487530243")).toBe("+919487530243");
    expect(normalizePhone("+91 94875 30243")).toBe("+919487530243");
    expect(normalizePhone("09487530243")).toBe("+919487530243");
    expect(normalizePhone("91-94875-30243")).toBe("+919487530243");
  });

  it("throws an error for invalid numbers", () => {
    expect(() => normalizePhone("1234567890")).toThrow(); // starts with 1
    expect(() => normalizePhone("948753024")).toThrow();  // 9 digits
    expect(() => normalizePhone("948753024300")).toThrow(); // too long
  });
});
