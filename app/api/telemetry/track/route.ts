import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

type TrackPayload = {
  path?: string;
  referrer?: string | null;
  sessionId?: string | null;
  userAgent?: string | null;
  timestamp?: string | number | null;
};

const isUuidV4 = (value: string): boolean => {
  const uuidV4 =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV4.test(value);
};

const sanitizePath = (path: string): string => {
  if (!path.startsWith("/")) {
    return `/${path}`;
  }
  return path.slice(0, 512);
};

export async function POST(request: NextRequest) {
  const adminClient = getSupabaseAdminClient();

  if (!adminClient) {
    return NextResponse.json(
      { error: "Telemetry storage unavailable." },
      { status: 503 }
    );
  }

  let payload: TrackPayload;

  try {
    payload = (await request.json()) as TrackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload?.path || typeof payload.path !== "string") {
    return NextResponse.json(
      { error: "`path` is required when tracking a page view." },
      { status: 400 }
    );
  }

  const record = {
    path: sanitizePath(payload.path),
    referrer: payload.referrer ? payload.referrer.slice(0, 512) : null,
    session_id:
      payload.sessionId && isUuidV4(payload.sessionId)
        ? payload.sessionId
        : null,
    user_agent:
      payload.userAgent?.slice(0, 512) ??
      request.headers.get("user-agent")?.slice(0, 512) ??
      null,
    created_at: payload.timestamp
      ? new Date(payload.timestamp).toISOString()
      : undefined,
  };

  try {
    const { error } = await adminClient.from("page_views").insert(record);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("[Telemetry] Failed to record page view", error);
    return NextResponse.json(
      { error: "Failed to record page view." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}


