import { performance } from "node:perf_hooks";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

type HealthSummary = {
  status: "ok" | "degraded" | "offline";
  latencyMs: number | null;
  error?: string;
  statusCode?: number;
};

type EndpointHealth = {
  path: string;
  method: string;
  status: HealthSummary;
};

const checkSupabase = async (): Promise<HealthSummary> => {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      status: "offline",
      latencyMs: null,
      error: "Supabase admin client unavailable.",
    };
  }

  const started = performance.now();

  try {
    const { error } = await supabase
      .from("page_views")
      .select("id", { head: true, count: "exact" })
      .limit(1);

    if (error) {
      throw error;
    }

    return {
      status: "ok",
      latencyMs: Math.round(performance.now() - started),
    };
  } catch (error) {
    return {
      status: "degraded",
      latencyMs: Math.round(performance.now() - started),
      error: error instanceof Error ? error.message : "Unknown Supabase error.",
    };
  }
};

const checkEndpoint = async (
  baseUrl: string,
  path: string,
  method: string = "GET",
  body?: unknown
): Promise<HealthSummary> => {
  const started = performance.now();
  const url = `${baseUrl}${path}`;

  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    };

    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const latencyMs = Math.round(performance.now() - started);

    if (response.ok || response.status < 500) {
      return {
        status: response.ok ? "ok" : "degraded",
        latencyMs,
        statusCode: response.status,
        error: response.ok ? undefined : `HTTP ${response.status}`,
      };
    }

    return {
      status: "degraded",
      latencyMs,
      statusCode: response.status,
      error: `HTTP ${response.status}: ${response.statusText}`,
    };
  } catch (error) {
    return {
      status: "offline",
      latencyMs: Math.round(performance.now() - started),
      error: error instanceof Error ? error.message : "Network error",
    };
  }
};

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;

  // Test all endpoints in parallel
  const [
    supabaseHealth,
    telemetryTrackHealth,
    telemetryLogErrorHealth,
    authCallbackHealth,
  ] = await Promise.all([
    checkSupabase(),
    checkEndpoint(baseUrl, "/api/telemetry/track", "POST", {
      path: "/health-check",
      referrer: null,
      sessionId: null,
      userAgent: "Health Check",
      timestamp: new Date().toISOString(),
    }),
    checkEndpoint(baseUrl, "/api/telemetry/log-error", "POST", {
      message: "Health check test",
      level: "info",
      source: "health-check",
      timestamp: new Date().toISOString(),
    }),
    checkEndpoint(baseUrl, "/api/auth/[...supabase]", "GET"),
  ]);

  const endpoints: EndpointHealth[] = [
    {
      path: "/api/telemetry/track",
      method: "POST",
      status: telemetryTrackHealth,
    },
    {
      path: "/api/telemetry/log-error",
      method: "POST",
      status: telemetryLogErrorHealth,
    },
    {
      path: "/api/auth/[...supabase]",
      method: "GET",
      status: authCallbackHealth,
    },
  ];

  const allServicesOk =
    supabaseHealth.status === "ok" &&
    endpoints.every((ep) => ep.status.status === "ok");

  const response = {
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: {
      nodeVersion: process.version,
      region: process.env.VERCEL_REGION ?? null,
      nextRuntime: process.env.NEXT_RUNTIME ?? "nodejs",
    },
    services: {
      supabase: supabaseHealth,
    },
    endpoints,
    overall: {
      status: allServicesOk ? "ok" : "degraded",
      healthyEndpoints: endpoints.filter((ep) => ep.status.status === "ok").length,
      totalEndpoints: endpoints.length,
    },
  };

  const statusCode = allServicesOk ? 200 : 503;
  return NextResponse.json(response, { status: statusCode });
}


