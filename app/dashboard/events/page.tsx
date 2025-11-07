'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";
import { EventList } from "./_components/EventList";
import { EventForm } from "./_components/EventForm";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'past' | 'tba';
  published: boolean;
}

export default function EventsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "list";
  const editId = searchParams.get("id");
  
  const [events, setEvents] = useState<Event[]>([]);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const supabase = getBrowserSupabaseClient();
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch all events (including unpublished) for admin view
        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select("id, title, date, time, location, description, status, published")
          .order("date", { ascending: false });

        if (eventsError) {
          console.error("[Dashboard] Failed to load events", eventsError);
        } else {
          setEvents(eventsData || []);
        }

        // If editing, fetch the specific event
        if (editId && mode === "edit") {
          const { data: eventData, error: eventError } = await supabase
            .from("events")
            .select("id, title, date, time, location, description, status, published")
            .eq("id", editId)
            .single();

          if (!eventError && eventData) {
            setEditEvent(eventData);
          }
        }
      } catch (error) {
        console.error("[Dashboard] Error loading data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [mode, editId]);

  const handleRefresh = () => {
    router.refresh();
    // Reload data
    const supabase = getBrowserSupabaseClient();
    if (supabase) {
      supabase
        .from("events")
        .select("id, title, date, time, location, description, status, published")
        .order("date", { ascending: false })
        .then(({ data }) => {
          if (data) setEvents(data);
        });
    }
  };

  if (isLoading) {
    return <div style={{ color: 'rgba(226,232,240,0.7)' }}>Loading...</div>;
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
        <EventList events={events} />
      )}

      {(mode === "new" || mode === "edit") && (
        <div style={formContainerStyle}>
          <EventForm
            event={editEvent || undefined}
            onSave={handleRefresh}
            onCancel={() => router.push('/dashboard/events')}
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

