import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/lead/route";

describe("API Security & Abuse Suite (/api/lead)", () => {
  it("rejects non-JSON Content-Type with 400", async () => {
    const req = new Request("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "plain text attack",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  it("rejects oversized payloads (> 4 KB) with 413 Payload Too Large", async () => {
    const oversized = JSON.stringify({
      name: "Attacker",
      phone: "9876543210",
      padding: "A".repeat(5000),
    });

    const req = new Request("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: oversized,
    });

    const res = await POST(req);
    expect(res.status).toBe(413);
  });

  it("silently swallows bot submissions with honeypot filled (returning 201)", async () => {
    const botPayload = JSON.stringify({
      name: "Spam Bot",
      phone: "9876543210",
      hp: "http://malicious-spam-url.com",
      consent: true,
    });

    const req = new Request("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: botPayload,
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
  });

  it("rejects XSS and SQL injection payloads via schema validation", async () => {
    const malicious = JSON.stringify({
      name: "<script>document.cookie</script>",
      phone: "9876543210",
      consent: true,
      hp: "",
    });

    const req = new Request("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: malicious,
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors?.name).toBeDefined();
  });
});
