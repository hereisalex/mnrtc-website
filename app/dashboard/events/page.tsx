import type { CSSProperties } from "react";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";
import { EventList } from "./_components/EventList";
import { EventForm } from "./_components/EventForm";
import Link from "next/link";

type EventsPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !userHasDashboardAccess(session.user)) {
    redirect("/login?redirectedFrom=/dashboard/events");
  }

  const mode = typeof searchParams?.mode === "string" ? searchParams.mode : "list";
  const editId = typeof searchParams?.id === "string" ? searchParams.id : null;

  // Fetch all events (including unpublished) for admin view
  const { data: events, error } = await supabase
    .from("events")
    .select("id, title, date, time, location, description, status, published")
    .order("date", { ascending: false });

  if (error) {
    console.error("[Dashboard] Failed to load events", error);
  }

  // If editing, fetch the specific event
  let editEvent = null;
  if (editId && mode === "edit") {
    const { data } = await supabase
      .from("events")
      .select("id, title, date, time, location, description, status, published")
      .eq("id", editId)
      .single();
    editEvent = data;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>Event Management</h2>
          <p style={{ margin: "0.35rem 0 0", color: "rgba(226,232,240,0.7)" }}>
            Create, edit, and manage events.
          </p>
        </div>
        {mode === "list" && (
          <Link
            href="/dashboard/events?mode=new"
            style={newEventButtonStyle}
          >
            + New Event
          </Link>
        )}
        {mode !== "list" && (
          <Link
            href="/dashboard/events"
            style={newEventButtonStyle}
          >
            ← Back to List
          </Link>
        )}
      </div>

      {mode === "list" && (
        <EventList events={events || []} />
      )}

      {(mode === "new" || mode === "edit") && (
        <div style={formContainerStyle}>
          <EventForm
            event={editEvent || undefined}
            onSave={() => {}}
            onCancel={() => {}}
          />
        </div>
      )}
    </div>
  );
}

const newEventButtonStyle: CSSProperties = {
  padding: "0.625rem 1.25rem",
  background: "#1d4ed8",
  border: "1px solid #3b82f6",
  borderRadius: "8px",
  color: "#f8fafc",
  fontSize: "0.875rem",
  fontWeight: 600,
  textDecoration: "none",
  cursor: "pointer",
  display: "inline-block",
};

const formContainerStyle: CSSProperties = {
  background: "rgba(15, 23, 42, 0.4)",
  border: "1px solid rgba(148,163,184,0.25)",
  borderRadius: "12px",
  padding: "1.5rem",
};

