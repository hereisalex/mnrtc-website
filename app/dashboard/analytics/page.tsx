'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";
import { AnalyticsFilters } from "./_components/AnalyticsFilters";
import { TrafficChart } from "./_components/TrafficChart";

const formatDateInput = (date: Date): string => date.toISOString().slice(0, 10);

const parseDateParam = (value: string | null, fallback: Date): Date => {
  if (!value) return fallback;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }
  return parsed;
};

export default function AnalyticsPage() {
  const searchParams = useSearchParams();
  const [dailyData, setDailyData] = useState<Array<{ day: string; view_count: number | string }>>([]);
  const [referrerData, setReferrerData] = useState<Array<{ referrer: string; view_count: number | string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();
  const defaultTo = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const defaultFrom = new Date(defaultTo);
  defaultFrom.setUTCDate(defaultFrom.getUTCDate() - 13); // 14-day window

  const fromDate = parseDateParam(
    searchParams.get("from"),
    defaultFrom
  );

  const toDate = parseDateParam(
    searchParams.get("to"),
    defaultTo
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
        const [{ data: dailyDataResult, error: dailyError }, { data: referrerDataResult, error: referrerError }] =
          await Promise.all([
            supabase.rpc("dashboard_page_views_daily", {
              from_date: fromIso,
              to_date: toIso,
            }),
            supabase.rpc("dashboard_top_referrers", {
              limit_count: 8,
              from_date: fromIso,
              to_date: toIso,
            }),
          ]);

        if (dailyError) {
          console.error("[Dashboard] dashboard_page_views_daily failed", dailyError);
        } else {
          setDailyData(dailyDataResult || []);
        }

        if (referrerError) {
          console.error("[Dashboard] dashboard_top_referrers failed", referrerError);
        } else {
          setReferrerData(referrerDataResult || []);
        }
      } catch (error) {
        console.error("[Dashboard] Error loading analytics", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fromIso, toIso]);

  const chartData = dailyData.map((entry: { day: string; view_count: number | string }) => ({
    day: entry.day,
    view_count: Number(entry.view_count) || 0,
  }));

  const totalViews = chartData.reduce((acc: number, entry: { view_count: number }) => acc + entry.view_count, 0);
  const averageViews =
    chartData.length > 0 ? Math.round(totalViews / chartData.length) : 0;
  const maxViews = chartData.reduce((max: number, entry: { view_count: number }) => Math.max(max, entry.view_count), 0);

  if (isLoading) {
    return <div style={{ color: 'rgba(226,232,240,0.7)' }}>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>Traffic Overview</h2>
          <p style={{ margin: "0.35rem 0 0", color: "rgba(226,232,240,0.7)" }}>
            Page views captured via the lightweight telemetry endpoint.
          </p>
        </div>
      </div>

      <AnalyticsFilters defaultFrom={fromIso} defaultTo={toIso} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div style={metricCardStyle}>
          <span style={metricLabelStyle}>Total views</span>
          <strong style={metricValueStyle}>{totalViews}</strong>
        </div>
        <div style={metricCardStyle}>
          <span style={metricLabelStyle}>Average per day</span>
          <strong style={metricValueStyle}>{averageViews}</strong>
        </div>
        <div style={metricCardStyle}>
          <span style={metricLabelStyle}>Peak day</span>
          <strong style={metricValueStyle}>{maxViews}</strong>
        </div>
        <div style={metricCardStyle}>
          <span style={metricLabelStyle}>Date range</span>
          <strong style={metricValueStyle}>
            {new Date(fromIso).toLocaleDateString()} – {new Date(toIso).toLocaleDateString()}
          </strong>
        </div>
      </div>

      <div style={{ marginBottom: "2.5rem" }}>
        <TrafficChart data={chartData} />
      </div>

      <section>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>Top referrers</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "280px" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "rgba(226,232,240,0.75)", fontSize: "0.875rem" }}>
                <th style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid rgba(148,163,184,0.2)" }}>Referrer</th>
                <th style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid rgba(148,163,184,0.2)" }}>Views</th>
              </tr>
            </thead>
            <tbody>
              {referrerData.length === 0 ? (
                <tr>
                  <td colSpan={2} style={{ padding: "1rem 0.5rem", color: "rgba(226,232,240,0.45)" }}>
                    No referrer data for the selected window.
                  </td>
                </tr>
              ) : (
                referrerData.map((item: { referrer: string; view_count: number | string }) => (
                  <tr key={`${item.referrer}-${item.view_count}`}>
                    <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid rgba(148,163,184,0.15)" }}>
                      {item.referrer}
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem", borderBottom: "1px solid rgba(148,163,184,0.15)" }}>
                      {item.view_count}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

const metricCardStyle: CSSProperties = {
  background: "rgba(15, 23, 42, 0.6)",
  border: "1px solid rgba(148,163,184,0.2)",
  borderRadius: "12px",
  padding: "1rem 1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};

const metricLabelStyle: CSSProperties = {
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "rgba(148,163,184,0.7)",
  fontSize: "0.7rem",
  fontWeight: 600,
};

const metricValueStyle: CSSProperties = {
  fontSize: "1.75rem",
  fontWeight: 700,
  color: "#f8fafc",
};
