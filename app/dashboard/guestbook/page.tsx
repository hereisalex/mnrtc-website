import type { CSSProperties } from "react";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";
import { GuestbookEntryList } from "./_components/GuestbookEntryList";

export default async function GuestbookModerationPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !userHasDashboardAccess(session.user)) {
    redirect("/login?redirectedFrom=/dashboard/guestbook");
  }

  // Fetch all guestbook entries
  const { data: entries, error } = await supabase
    .from("guestbook_entries")
    .select("id, text, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Dashboard] Failed to load guestbook entries", error);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>Guestbook Moderation</h2>
          <p style={{ margin: "0.35rem 0 0", color: "rgba(226,232,240,0.7)" }}>
            Review and moderate guestbook entries. Delete inappropriate content.
          </p>
        </div>
        <div style={statsContainerStyle}>
          <span style={statLabelStyle}>Total Entries</span>
          <strong style={statValueStyle}>{entries?.length || 0}</strong>
        </div>
      </div>

      <GuestbookEntryList entries={entries || []} />
    </div>
  );
}

const statsContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "0.25rem",
};

const statLabelStyle: CSSProperties = {
  fontSize: "0.75rem",
  color: "rgba(226,232,240,0.6)",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const statValueStyle: CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#f8fafc",
};

