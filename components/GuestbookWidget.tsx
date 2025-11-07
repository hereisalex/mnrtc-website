"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";

type GuestbookEntry = {
    id: string;
    text: string;
    name?: string;
    timestampMs: number;
};

const STORAGE_KEY = "mnrt_guestbook_entries_v1";

function readEntriesFromStorage(): GuestbookEntry[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as GuestbookEntry[];
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((e) => typeof e?.id === "string" && typeof e?.text === "string")
			.slice(0, 200);
	} catch {
		return [];
	}
}

function writeEntriesToStorage(entries: GuestbookEntry[]): void {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 200)));
	} catch {
		// ignore write errors
	}
}

export default function GuestbookWidget(): React.ReactElement {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [draft, setDraft] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            try {
                // If Supabase not configured, use local storage
                const supabase = getBrowserSupabaseClient();

                if (!supabase) {
                    if (!isMounted) return;
                    setEntries(readEntriesFromStorage());
                    return;
                }
                // Fetch from Supabase
                const { data, error } = await supabase
                    .from("guestbook_entries")
                    .select("id, text, name, created_at")
                    .order("created_at", { ascending: true });
                if (error) throw error;
                const mapped: GuestbookEntry[] = (data || []).map((row: any) => ({
                    id: row.id,
                    text: String(row.text || ""),
                    name: row.name ? String(row.name) : undefined,
                    timestampMs: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
                }));
                if (!isMounted) return;
                setEntries(mapped.slice(0, 200));
            } catch {
                // Fallback to local storage on error
                if (!isMounted) return;
                setEntries(readEntriesFromStorage());
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };
        load();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        writeEntriesToStorage(entries);
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [entries]);

    const handleSubmit = async () => {
        const trimmed = draft.replace(/\s+/g, " ").trim();
        if (!trimmed) return;
        const trimmedName = name.trim() || undefined;
        const optimistic: GuestbookEntry = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            text: trimmed.slice(0, 240),
            name: trimmedName,
            timestampMs: Date.now(),
        };
        setDraft("");
        setName("");

        // Optimistic update
        setEntries((prev) => [...prev, optimistic]);

        // Persist
        const supabase = getBrowserSupabaseClient();

        if (supabase) {
            try {
                const { error } = await supabase.from("guestbook_entries").insert({
                    text: optimistic.text,
                    name: optimistic.name || null,
                    created_at: new Date(optimistic.timestampMs).toISOString(),
                });
                if (error) throw error;
            } catch {
                // swallow error; UI already updated and localStorage has it
            }
        } else {
            // Local fallback only
            writeEntriesToStorage([...entries, optimistic]);
        }
    };

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const formattedEntries = useMemo(() => {
		return entries.map((e) => ({
			...e,
			date: new Date(e.timestampMs).toLocaleDateString(undefined, {
				month: "short",
				day: "2-digit",
				year: "numeric",
			}),
		}));
	}, [entries]);

	return (
		<div
			className="postit-note postit-note-yellow"
			style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "6px" }}
		>
			<h3
				style={{
					fontSize: "12px",
					fontWeight: "bold",
					color: "#000000",
					marginBottom: "0",
					textAlign: "center",
					borderBottom: "none",
					paddingBottom: "0",
				}}
			>
				Guestbook
			</h3>
			<div
				ref={listRef}
				style={{
					background: "#ffffcc",
					border: "1px dashed #999",
					padding: "6px",
					height: "220px",
					overflowY: "auto",
					fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
					fontSize: "10px",
					color: "#000",
				}}
			>
				{formattedEntries.length === 0 ? (
					<div style={{ opacity: 0.7, textAlign: "center" }}>Be the first to sign! ✍️</div>
				) : (
					formattedEntries.map((e) => (
						<div key={e.id} style={{ marginBottom: "6px" }}>
							<div style={{ fontWeight: "bold", fontSize: "9px", color: "#333" }}>{e.date}</div>
							{e.name && (
								<div style={{ fontWeight: "bold", fontSize: "9px", color: "#555", marginBottom: "2px" }}>
									— {e.name}
								</div>
							)}
							<div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{e.text}</div>
						</div>
					))
				)}
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
				<input
					type="text"
					value={name}
					placeholder="Your name (optional)..."
					onChange={(e) => setName(e.target.value)}
					maxLength={50}
					style={{
						padding: "4px 6px",
						fontSize: "9px",
						border: "1px solid #999",
						background: "#fffef2",
						outline: "none",
					}}
				/>
				<div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
					<input
						type="text"
						value={draft}
						placeholder="Leave a note..."
						onChange={(e) => setDraft(e.target.value)}
						onKeyDown={handleKeyDown}
						style={{
							flex: 1,
							padding: "4px 6px",
							fontSize: "10px",
							border: "1px solid #999",
							background: "#fffef2",
							outline: "none",
						}}
					/>
					<button
						onClick={handleSubmit}
						style={{
							padding: "4px 8px",
							fontSize: "10px",
							cursor: "pointer",
							border: "1px solid #999",
							background: "#ffff66",
						}}
					>
						Sign
					</button>
				</div>
			</div>
		</div>
	);
}


