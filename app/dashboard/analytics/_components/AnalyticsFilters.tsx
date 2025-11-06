'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type AnalyticsFiltersProps = {
  defaultFrom: string;
  defaultTo: string;
};

export function AnalyticsFilters({ defaultFrom, defaultTo }: AnalyticsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.set("from", from);
    params.set("to", to);
    router.push(`/dashboard/analytics?${params.toString()}`);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("from");
    params.delete("to");
    router.push(`/dashboard/analytics?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "flex-end",
        marginBottom: "1.5rem",
      }}
    >
      <label style={{ display: "flex", flexDirection: "column", color: "rgba(226,232,240,0.85)", fontSize: "0.875rem" }}>
        From
        <input
          type="date"
          value={from}
          max={to}
          onChange={(event) => setFrom(event.target.value)}
          style={{
            marginTop: "0.35rem",
            padding: "0.45rem 0.65rem",
            borderRadius: "8px",
            border: "1px solid rgba(148,163,184,0.35)",
            background: "rgba(15,23,42,0.8)",
            color: "#f8fafc",
          }}
        />
      </label>
      <label style={{ display: "flex", flexDirection: "column", color: "rgba(226,232,240,0.85)", fontSize: "0.875rem" }}>
        To
        <input
          type="date"
          value={to}
          min={from}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(event) => setTo(event.target.value)}
          style={{
            marginTop: "0.35rem",
            padding: "0.45rem 0.65rem",
            borderRadius: "8px",
            border: "1px solid rgba(148,163,184,0.35)",
            background: "rgba(15,23,42,0.8)",
            color: "#f8fafc",
          }}
        />
      </label>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          type="submit"
          style={{
            padding: "0.5rem 0.95rem",
            borderRadius: "8px",
            background: "#38bdf8",
            border: "none",
            color: "#0f172a",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "0.5rem 0.95rem",
            borderRadius: "8px",
            background: "transparent",
            border: "1px solid rgba(148,163,184,0.45)",
            color: "rgba(226,232,240,0.75)",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}


