import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const report = await req.json();
    // Log violation directive without user PII
    if (process.env.NODE_ENV !== "production") {
      console.warn("CSP Violation reported:", report["csp-report"]?.["violated-directive"] || report);
    }
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 400 });
  }
}
