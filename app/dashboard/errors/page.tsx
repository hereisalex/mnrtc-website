'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";
import { ErrorLogFilters } from "./_components/ErrorLogFilters";
import { PaginationControls } from "./_components/PaginationControls";
import { CopyButton } from "@/components/dashboard/CopyButton";

type ErrorLogRow = {
  id: string;
  level: string;
  message: string;
  stack: string | null;
  context: Record<string, unknown> | null;
  source: string | null;
  created_at: string;
};

const formatDateInput = (date: Date): string => date.toISOString().slice(0, 10);

const parseDateParam = (value: string | null, fallback: Date): Date => {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
};

const startOfDayUtc = (date: Date): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

const addDaysUtc = (date: Date, days: number): Date => {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
};

export default function ErrorLogsPage() {
  const searchParams = useSearchParams();
  const [errorLogs, setErrorLogs] = useState<ErrorLogRow[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const today = startOfDayUtc(new Date());
  const defaultFrom = addDaysUtc(today, -7);

  const levelParam = searchParams.get("level") || "all";
  const pageParam = Number.parseInt(searchParams.get("page") || "1", 10);
  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  const fromDate = parseDateParam(
    searchParams.get("from"),
    defaultFrom
  );
  const toDate = parseDateParam(
    searchParams.get("to"),
    today
  );

  const fromIso = formatDateInput(fromDate);
  const toIso = formatDateInput(toDate);

  useEffect(() => {
    const loadData = async () => {
      const supabase = getBrowserSupabaseClient();
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        let query = supabase
          .from("error_logs")
          .select("id, level, message, stack, context, source, created_at", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(offset, offset + pageSize - 1);

        if (levelParam && levelParam !== "all") {
          query = query.eq("level", levelParam);
        }

        query = query
          .gte("created_at", startOfDayUtc(fromDate).toISOString())
          .lt("created_at", addDaysUtc(toDate, 1).toISOString());

        const { data: errorLogsData, count: countData, error } = await query;

        if (error) {
          console.error("[Dashboard] Failed to load error logs", error);
        } else {
          setErrorLogs(errorLogsData || []);
          setCount(countData);
        }
      } catch (error) {
        console.error("[Dashboard] Error loading error logs", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [levelParam, page, fromIso, toIso, offset, pageSize, fromDate, toDate]);

  const rows: ErrorLogRow[] = errorLogs;

  if (isLoading) {
    return <div style={{ color: 'rgba(226,232,240,0.7)' }}>Loading...</div>;
  }

  return (
    <div>
      <header style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>Error log viewer</h2>
        <p style={{ margin: "0.35rem 0 0", color: "rgba(226,232,240,0.7)" }}>
          Inspect captured runtime errors and warnings to aid in debugging.
        </p>
      </header>

      <ErrorLogFilters
        defaultLevel={levelParam || "all"}
        defaultFrom={fromIso}
        defaultTo={toIso}
      />

      <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(148,163,184,0.25)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "rgba(226,232,240,0.75)", fontSize: "0.85rem" }}>
              <th style={headerCell}>Time</th>
              <th style={headerCell}>Level</th>
              <th style={headerCell}>Message</th>
              <th style={headerCell}>Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "1.25rem", color: "rgba(226,232,240,0.55)" }}>
                  No error logs found for the selected filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td style={bodyCell}>
                    {new Date(row.created_at).toLocaleString(undefined, {
                      hour12: false,
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td style={{ ...bodyCell, fontWeight: 600, color: levelColor(row.level) }}>
                    {row.level.toUpperCase()}
                  </td>
                  <td style={bodyCell}>{row.message}</td>
                  <td style={bodyCell}>
                    <details>
                      <summary style={{ cursor: "pointer", color: "#38bdf8" }}>Inspect</summary>
                      <div style={{ marginTop: "0.6rem", display: "grid", gap: "0.5rem" }}>
                        {row.source && (
                          <div>
                            <span style={detailLabel}>Source:</span> {row.source}
                          </div>
                        )}
                        {row.stack && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                              <span style={detailLabel}>Stack trace:</span>
                              <CopyButton text={row.stack} />
                            </div>
                            <pre style={preStyle}>{row.stack}</pre>
                          </div>
                        )}
                        {row.context && Object.keys(row.context).length > 0 && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                              <span style={detailLabel}>Context:</span>
                              <CopyButton text={JSON.stringify(row.context, null, 2)} />
                            </div>
                            <pre style={preStyle}>
                              {JSON.stringify(row.context, null, 2)}
                            </pre>
                          </div>
                        )}
                        {!row.stack && !row.context && (
                          <div style={{ color: "rgba(226,232,240,0.55)", fontSize: "0.9rem" }}>
                            No additional details available.
                          </div>
                        )}
                      </div>
                    </details>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationControls page={page} pageSize={pageSize} totalCount={count} />
    </div>
  );
}

const headerCell: CSSProperties = {
  padding: "0.9rem 0.75rem",
  borderBottom: "1px solid rgba(148,163,184,0.25)",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const bodyCell: CSSProperties = {
  padding: "0.85rem 0.75rem",
  borderBottom: "1px solid rgba(148,163,184,0.18)",
  verticalAlign: "top",
  fontSize: "0.95rem",
};

const preStyle: CSSProperties = {
  margin: 0,
  padding: "0.75rem",
  background: "rgba(15, 23, 42, 0.7)",
  border: "1px solid rgba(148,163,184,0.2)",
  borderRadius: "8px",
  fontSize: "0.85rem",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const detailLabel: CSSProperties = {
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "rgba(226,232,240,0.65)",
  marginRight: "0.25rem",
};

const levelColor = (level: string): string => {
  switch (level.toLowerCase()) {
    case "fatal":
    case "error":
      return "#f87171";
    case "warn":
      return "#facc15";
    case "info":
      return "#38bdf8";
    case "debug":
      return "#a855f7";
    default:
      return "rgba(226,232,240,0.85)";
  }
};
