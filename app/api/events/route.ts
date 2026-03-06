import { NextRequest, NextResponse } from "next/server";

const EVENTS_API_URL = process.env.EVENTS_API_URL;

/**
 * Proxy events to the deployed backend that writes to Supabase.
 * Set EVENTS_API_URL to the backend base URL (e.g. https://app.disclosurely.com).
 */
export async function POST(request: NextRequest) {
  if (!EVENTS_API_URL) {
    return NextResponse.json(
      { error: "Events API not configured (EVENTS_API_URL)" },
      { status: 501 }
    );
  }

  try {
    const body = await request.json();
    const url = EVENTS_API_URL.replace(/\/$/, "") + "/api/events";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.warn("[api/events] proxy error:", err);
    return NextResponse.json(
      { error: "Failed to forward event" },
      { status: 502 }
    );
  }
}
