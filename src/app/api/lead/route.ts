import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Content-Type check
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    // 2. Body size check (4 KB max)
    const rawBody = await req.text();
    if (rawBody.length > 4096) {
      return NextResponse.json(
        { ok: false, error: "Payload exceeds 4 KB limit" },
        { status: 413 }
      );
    }

    const data = JSON.parse(rawBody);

    // 3. Honeypot check
    if (data.hp && data.hp.trim().length > 0) {
      // Quietly succeed to avoid tipping off bots
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    // 4. Basic input check (full Zod schema will be bound in Phase 1 / A7)
    if (!data.name || !data.phone || data.consent !== true) {
      return NextResponse.json(
        { ok: false, error: "Name, valid phone, and consent are required" },
        { status: 400 }
      );
    }

    // Console sink in dev/demo mode
    console.log(`[LeadSink:Console] New lead received for ${data.name} (${data.program || "General"})`);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }
}
