import { NextResponse } from "next/server";
import { LeadSubmissionSchema } from "@/lib/schemas";
import { normalizePhone, hashIp, verifyOrigin } from "@/lib/security";
import { checkRateLimit } from "@/lib/rate-limit";
import { dispatchLead } from "@/lib/lead-sinks";

export async function POST(req: Request) {
  try {
    // 1. Content-Type verification
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    // 2. Payload size cap (4 KB max)
    const rawBody = await req.text();
    if (rawBody.length > 4096) {
      return NextResponse.json(
        { ok: false, error: "Payload exceeds size limit" },
        { status: 413 }
      );
    }

    // 3. Origin check
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (!verifyOrigin(origin, host)) {
      return NextResponse.json(
        { ok: false, error: "Invalid request origin" },
        { status: 403 }
      );
    }

    // 4. JSON parsing
    let json: Record<string, unknown>;
    try {
      json = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Malformed JSON payload" },
        { status: 400 }
      );
    }

    // 5. Bot Trap: Honeypot check (quietly succeed with 201 without storing)
    if (typeof json.hp === "string" && json.hp.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    // 6. Zod strict schema parsing
    const parseResult = LeadSubmissionSchema.safeParse(json);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { ok: false, errors: fieldErrors },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 7. Bot Trap: Time trap (must take >= 2s and <= 2h)
    if (data.ts) {
      const now = Date.now();
      const elapsedMs = now - data.ts;
      if (elapsedMs < 2000 || elapsedMs > 2 * 60 * 60 * 1000) {
        return NextResponse.json(
          { ok: false, error: "Form interaction timing invalid" },
          { status: 400 }
        );
      }
    }

    // 8. Normalise phone to E.164
    let normalizedPhone: string;
    try {
      normalizedPhone = normalizePhone(data.phone);
    } catch {
      return NextResponse.json(
        { ok: false, errors: { phone: ["Invalid mobile number"] } },
        { status: 400 }
      );
    }

    // 9. Rate limiting (IP hash + normalized phone)
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const ipHash = hashIp(clientIp);
    const rateLimit = checkRateLimit(ipHash, normalizedPhone);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimit.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter || 60),
          },
        }
      );
    }

    // 10. Dispatch to configured lead sinks
    await dispatchLead({
      name: data.name,
      phone: normalizedPhone,
      email: data.email || undefined,
      program: data.program,
      audience: data.audience,
      consent: data.consent,
      consentVersion: data.consentVersion,
      trackSource: data.trackSource,
      ipHash: ipHash,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Unhandled error in lead submission handler:", err);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred. Please contact us via WhatsApp." },
      { status: 500 }
    );
  }
}
