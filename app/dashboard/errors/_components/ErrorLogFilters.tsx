'use client';

import type { CSSProperties } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LEVEL_OPTIONS = ["all", "fatal", "error", "warn", "info", "debug"] as const;

type ErrorLogFiltersProps = {
  defaultLevel: string;
  defaultFrom: string;
  defaultTo: string;
};

export function ErrorLogFilters({ defaultLevel, defaultFrom, defaultTo }: ErrorLogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [level, setLevel] = useState(defaultLevel);
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (level === "all") {
      params.delete("level");
    } else {
      params.set("level", level);
    }

    params.set("from", from);
    params.set("to", to);

    router.push(`/dashboard/errors?${params.toString()}`);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("level");
    params.delete("from");
    params.delete("to");
    params.delete("page");
    router.push(`/dashboard/errors?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <label style={labelStyle}>
        Level
        <select
          value={level}
          onChange={(event) => setLevel(event.target.value)}
          style={inputStyle}
        >
          {LEVEL_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All levels" : option.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <label style={labelStyle}>
        From
        <input
          type="date"
          value={from}
          max={to}
          onChange={(event) => setFrom(event.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        To
        <input
          type="date"
          value={to}
          min={from}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(event) => setTo(event.target.value)}
          style={inputStyle}
        />
      </label>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end", justifyContent: "flex-end" }}>
        <button type="submit" style={primaryButton}>
          Apply
        </button>
        <button type="button" onClick={handleReset} style={secondaryButton}>
          Reset
        </button>
      </div>
    </form>
  );
}

const labelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  color: "rgba(226,232,240,0.85)",
  fontSize: "0.85rem",
  gap: "0.35rem",
};

const inputStyle: CSSProperties = {
  padding: "0.5rem 0.65rem",
  borderRadius: "8px",
  border: "1px solid rgba(148,163,184,0.35)",
  background: "rgba(15,23,42,0.85)",
  color: "#f8fafc",
  fontSize: "0.95rem",
};

const primaryButton: CSSProperties = {
  padding: "0.55rem 1.1rem",
  borderRadius: "8px",
  border: "none",
  background: "#f97316",
  color: "#0f172a",
  fontWeight: 600,
  cursor: "pointer",
};

const secondaryButton: CSSProperties = {
  padding: "0.55rem 1.1rem",
  borderRadius: "8px",
  border: "1px solid rgba(148,163,184,0.35)",
  background: "transparent",
  color: "rgba(226,232,240,0.75)",
  fontWeight: 500,
  cursor: "pointer",
};


