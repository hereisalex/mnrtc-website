'use client';

import type { CSSProperties } from "react";
import { useState } from "react";

type HealthServiceStatus = {
  status: "ok" | "degraded" | "offline";
  latencyMs: number | null;
  error?: string;
  statusCode?: number;
};

type EndpointHealth = {
  path: string;
  method: string;
  status: HealthServiceStatus;
};

type HealthPayload = {
  uptimeSeconds: number;
  timestamp: string;
  environment: {
    nodeVersion: string;
    region: string | null;
    nextRuntime?: string;
  };
  services: {
    supabase: HealthServiceStatus;
  };
  endpoints: EndpointHealth[];
  overall: {
    status: "ok" | "degraded" | "offline";
    healthyEndpoints: number;
    totalEndpoints: number;
  };
};

type HealthStatusProps = {
  initialData: HealthPayload | null;
};

export function HealthStatus({ initialData }: HealthStatusProps) {
  const [health, setHealth] = useState<HealthPayload | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);

    try {
      // Health check API is not available in static export mode
      // Show a message explaining this limitation
      setError(
        "Health check is not available in static export mode. " +
        "This feature requires a server runtime and API routes, which are not supported " +
        "when deploying as a static site (e.g., GitHub Pages)."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error while fetching health status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>System health</h2>
          <p style={{ margin: "0.4rem 0 0", color: "rgba(226,232,240,0.7)" }}>
            Comprehensive status check for all services and API endpoints.
          </p>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "10px",
            border: "1px solid rgba(148,163,184,0.35)",
            background: loading ? "rgba(30,41,59,0.6)" : "#22d3ee",
            color: loading ? "rgba(226,232,240,0.65)" : "#0f172a",
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading ? "Checking..." : "Refresh all"}
        </button>
      </div>

      {error && (
        <div style={errorBoxStyle}>
          <strong style={{ display: "block", marginBottom: "0.4rem" }}>Health check failed</strong>
          {error}
        </div>
      )}

      {health && health.overall && (
        <section style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ ...sectionTitleStyle, margin: 0 }}>Overall status</h3>
            <span style={{ ...badgeStyle, background: statusColor(health.overall.status) }}>
              {health.overall.status.toUpperCase()}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div>
              <span style={metricLabelStyle}>Healthy endpoints</span>
              <div style={metricValueStyle}>
                {health.overall.healthyEndpoints ?? 0} / {health.overall.totalEndpoints ?? 0}
              </div>
            </div>
            <div>
              <span style={metricLabelStyle}>Services</span>
              <div style={metricValueStyle}>
                {health.services?.supabase?.status === "ok" ? "1 / 1" : "0 / 1"}
              </div>
            </div>
          </div>
        </section>
      )}

      <section style={cardStyle}>
        <h3 style={sectionTitleStyle}>Supabase Database</h3>
        {health?.services?.supabase ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", gap: "0.65rem", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ ...badgeStyle, background: statusColor(health.services.supabase.status) }}>
                {health.services.supabase.status.toUpperCase()}
              </span>
              <span style={{ color: "rgba(226,232,240,0.75)" }}>
                Latency:{" "}
                {typeof health.services.supabase.latencyMs === "number"
                  ? `${health.services.supabase.latencyMs} ms`
                  : "n/a"}
              </span>
            </div>
            {health.services.supabase.error && (
              <div style={errorLineStyle}>{health.services.supabase.error}</div>
            )}
          </div>
        ) : (
          <p style={{ color: "rgba(226,232,240,0.55)" }}>No health data yet.</p>
        )}
      </section>

      <section style={cardStyle}>
        <h3 style={sectionTitleStyle}>API Endpoints</h3>
        {health?.endpoints && health.endpoints.length > 0 ? (
          <div style={{ display: "grid", gap: "1rem" }}>
            {health.endpoints.map((endpoint) => (
              <div
                key={`${endpoint.method}-${endpoint.path}`}
                style={{
                  padding: "1rem",
                  background: "rgba(15, 23, 42, 0.5)",
                  borderRadius: "10px",
                  border: "1px solid rgba(148,163,184,0.2)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span
                        style={{
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          background: methodColor(endpoint.method),
                          color: "#0f172a",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          fontFamily: "monospace",
                        }}
                      >
                        {endpoint.method}
                      </span>
                      <code style={{ color: "#e2e8f0", fontSize: "0.9rem", fontFamily: "monospace" }}>
                        {endpoint.path}
                      </code>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ ...badgeStyle, background: statusColor(endpoint.status?.status ?? "offline") }}>
                        {(endpoint.status?.status ?? "offline").toUpperCase()}
                      </span>
                      {endpoint.status?.latencyMs !== null && endpoint.status?.latencyMs !== undefined && (
                        <span style={{ color: "rgba(226,232,240,0.75)", fontSize: "0.875rem" }}>
                          {endpoint.status.latencyMs} ms
                        </span>
                      )}
                      {endpoint.status?.statusCode && (
                        <span style={{ color: "rgba(226,232,240,0.65)", fontSize: "0.875rem" }}>
                          HTTP {endpoint.status.statusCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {endpoint.status?.error && (
                  <div style={{ ...errorLineStyle, marginTop: "0.75rem", fontSize: "0.85rem" }}>
                    {endpoint.status.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "rgba(226,232,240,0.55)" }}>No endpoint data available.</p>
        )}
      </section>

      <section style={cardStyle}>
        <h3 style={sectionTitleStyle}>Runtime environment</h3>
        {health?.environment ? (
          <dl style={definitionListStyle}>
            <div style={definitionRowStyle}>
              <dt style={definitionTermStyle}>Node.js</dt>
              <dd style={definitionValueStyle}>{health.environment.nodeVersion}</dd>
            </div>
            <div style={definitionRowStyle}>
              <dt style={definitionTermStyle}>Runtime</dt>
              <dd style={definitionValueStyle}>{health.environment.nextRuntime ?? "nodejs"}</dd>
            </div>
            <div style={definitionRowStyle}>
              <dt style={definitionTermStyle}>Region</dt>
              <dd style={definitionValueStyle}>{health.environment.region ?? "local"}</dd>
            </div>
            <div style={definitionRowStyle}>
              <dt style={definitionTermStyle}>Uptime</dt>
              <dd style={definitionValueStyle}>
                {Math.round(health.uptimeSeconds / 60)} minutes ({health.uptimeSeconds} seconds)
              </dd>
            </div>
            <div style={definitionRowStyle}>
              <dt style={definitionTermStyle}>Last check</dt>
              <dd style={definitionValueStyle}>
                {new Date(health.timestamp).toLocaleString()}
              </dd>
            </div>
          </dl>
        ) : (
          <p style={{ color: "rgba(226,232,240,0.55)" }}>No health data yet.</p>
        )}
      </section>
    </div>
  );
}

const cardStyle: CSSProperties = {
  background: "rgba(15, 23, 42, 0.65)",
  borderRadius: "14px",
  border: "1px solid rgba(148,163,184,0.28)",
  padding: "1.5rem",
  backdropFilter: "blur(16px)",
};

const sectionTitleStyle: CSSProperties = {
  margin: "0 0 1rem",
  fontSize: "1.15rem",
  fontWeight: 600,
};

const badgeStyle: CSSProperties = {
  padding: "0.35rem 0.75rem",
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "#0f172a",
  letterSpacing: "0.05em",
};

const errorLineStyle: CSSProperties = {
  padding: "0.5rem 0.75rem",
  borderRadius: "8px",
  background: "rgba(239,68,68,0.15)",
  border: "1px solid rgba(248,113,113,0.3)",
  color: "#fecaca",
  fontSize: "0.85rem",
};

const errorBoxStyle: CSSProperties = {
  padding: "1rem 1.25rem",
  borderRadius: "12px",
  background: "rgba(239,68,68,0.18)",
  border: "1px solid rgba(248,113,113,0.35)",
  color: "#fecaca",
};

const definitionListStyle: CSSProperties = {
  display: "grid",
  gap: "0.75rem",
  margin: 0,
};

const definitionRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "140px 1fr",
  gap: "1rem",
  alignItems: "baseline",
};

const definitionTermStyle: CSSProperties = {
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontSize: "0.75rem",
  color: "rgba(148,163,184,0.75)",
};

const definitionValueStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.95rem",
  color: "#f8fafc",
};

const metricLabelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "rgba(148,163,184,0.75)",
  marginBottom: "0.25rem",
};

const metricValueStyle: CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#f8fafc",
};

const statusColor = (status: HealthServiceStatus["status"]): string => {
  switch (status) {
    case "ok":
      return "#4ade80";
    case "degraded":
      return "#facc15";
    case "offline":
      return "#f87171";
    default:
      return "#94a3b8";
  }
};

const methodColor = (method: string): string => {
  switch (method.toUpperCase()) {
    case "GET":
      return "#60a5fa";
    case "POST":
      return "#34d399";
    case "PUT":
      return "#fbbf24";
    case "PATCH":
      return "#a78bfa";
    case "DELETE":
      return "#f87171";
    default:
      return "#94a3b8";
  }
};


