'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/errors", label: "Error Logs" },
  { href: "/dashboard/health", label: "System Health" },
  { href: "/dashboard/blog", label: "Blog Posts" },
  { href: "/dashboard/events", label: "Events" },
  { href: "/dashboard/guestbook", label: "Guestbook" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav style={{ marginBottom: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              background: isActive ? "#1d4ed8" : "#1f2937",
              color: "#f9fafb",
              border: "1px solid rgba(255,255,255,0.2)",
              textDecoration: "none",
              fontWeight: isActive ? 700 : 500,
              boxShadow: isActive ? "0 0 12px rgba(59,130,246,0.45)" : "none",
              transition: "all 0.15s ease-in-out",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}


