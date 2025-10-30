"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type GuestbookEntry = {
	id: string;
	text: string;
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

export default function GuestbookWidget(): JSX.Element {
	const [entries, setEntries] = useState<GuestbookEntry[]>([]);
	const [draft, setDraft] = useState<string>("");
	const listRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setEntries(readEntriesFromStorage());
	}, []);

	useEffect(() => {
		writeEntriesToStorage(entries);
		// scroll to bottom on new entry
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight;
		}
	}, [entries]);

	const handleSubmit = () => {
		const trimmed = draft.replace(/\s+/g, " ").trim();
		if (!trimmed) return;
		const newEntry: GuestbookEntry = {
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
			text: trimmed.slice(0, 240),
			timestampMs: Date.now(),
		};
		setEntries((prev) => [...prev, newEntry]);
		setDraft("");
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
					height: "160px",
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
							<div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{e.text}</div>
						</div>
					))
				)}
			</div>
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
	);
}


