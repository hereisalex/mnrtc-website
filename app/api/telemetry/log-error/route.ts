import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

const ACCEPTED_LEVELS = new Set(["debug", "info", "warn", "error", "fatal"]);

type ErrorPayload = {
  message?: string;
  level?: string;
  stack?: string | null;
  context?: Record<string, unknown> | null;
  source?: string | null;
  timestamp?: string | number | null;
};

const sanitizeLevel = (level?: string): string => {
  if (!level) return "error";
  const normalized = level.toLowerCase();
  return ACCEPTED_LEVELS.has(normalized) ? normalized : "error";
};

export async function POST(request: NextRequest) {
  const adminClient = getSupabaseAdminClient();
  if (!adminClient) {
    return NextResponse.json(
      { error: "Telemetry storage unavailable." },
      { status: 503 }
    );
  }

  let payload: ErrorPayload;

  try {
    payload = (await request.json()) as ErrorPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload?.message || typeof payload.message !== "string") {
    return NextResponse.json(
      { error: "`message` is required when logging an error." },
      { status: 400 }
    );
  }

  const record = {
    message: payload.message.slice(0, 2000),
    level: sanitizeLevel(payload.level),
    stack: payload.stack?.slice(0, 8000) ?? null,
    context: payload.context ?? {},
    source: payload.source?.slice(0, 512) ?? null,
    created_at: payload.timestamp
      ? new Date(payload.timestamp).toISOString()
      : undefined,
  };

  try {
    const { error } = await adminClient.from("error_logs").insert(record);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("[Telemetry] Failed to log error", error);
    return NextResponse.json(
      { error: "Failed to persist error log." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}


