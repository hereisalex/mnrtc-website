'use client';

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";
import { GuestbookEntryList } from "./_components/GuestbookEntryList";

interface GuestbookEntry {
  id: string;
  text: string;
  name?: string;
  created_at: string;
}

export default function GuestbookModerationPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      const supabase = getBrowserSupabaseClient();
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: entriesData, error } = await supabase
          .from("guestbook_entries")
          .select("id, text, name, created_at")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("[Dashboard] Failed to load guestbook entries", error);
        } else {
          setEntries(entriesData || []);
        }
      } catch (error) {
        console.error("[Dashboard] Error loading guestbook entries", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, []);

  const handleRefresh = () => {
    const supabase = getBrowserSupabaseClient();
    if (supabase) {
      supabase
        .from("guestbook_entries")
        .select("id, text, name, created_at")
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) setEntries(data);
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
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>Guestbook Moderation</h2>
          <p style={{ margin: "0.35rem 0 0", color: "rgba(226,232,240,0.7)" }}>
            Review and moderate guestbook entries. Delete inappropriate content.
          </p>
        </div>
        <div style={statsContainerStyle}>
          <span style={statLabelStyle}>Total Entries</span>
          <strong style={statValueStyle}>{entries.length}</strong>
        </div>
      </div>

      <GuestbookEntryList entries={entries} />
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

