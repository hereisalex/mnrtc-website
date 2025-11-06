'use client';

import type { CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationControlsProps = {
  page: number;
  pageSize: number;
  totalCount: number | null;
};

export function PaginationControls({ page, pageSize, totalCount }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages =
    totalCount && totalCount > 0 ? Math.ceil(totalCount / pageSize) : page;

  const goToPage = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (targetPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", targetPage.toString());
    }
    router.push(`/dashboard/errors?${params.toString()}`);
  };

  if (!totalCount || totalCount <= pageSize) {
    return null;
  }

  return (
    <div style={containerStyle}>
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        style={{ ...buttonStyle, opacity: page <= 1 ? 0.4 : 1 }}
      >
        ← Previous
      </button>
      <span style={pageLabelStyle}>
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
        style={{ ...buttonStyle, opacity: page >= totalPages ? 0.4 : 1 }}
      >
        Next →
      </button>
    </div>
  );
}

const containerStyle: CSSProperties = {
  marginTop: "1.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  flexWrap: "wrap",
};

const buttonStyle: CSSProperties = {
  padding: "0.45rem 0.9rem",
  borderRadius: "8px",
  border: "1px solid rgba(148,163,184,0.35)",
  background: "rgba(15,23,42,0.6)",
  color: "rgba(226,232,240,0.9)",
  fontWeight: 500,
  cursor: "pointer",
};

const pageLabelStyle: CSSProperties = {
  fontSize: "0.9rem",
  color: "rgba(226,232,240,0.65)",
};


