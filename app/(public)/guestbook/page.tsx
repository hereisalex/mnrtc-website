"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";
import PostItNote from "@/components/PostItNote";

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

export default function GuestbookPage(): React.ReactElement {
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

	const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
		if (e.key === "Enter" && e.ctrlKey) {
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
			time: new Date(e.timestampMs).toLocaleTimeString(undefined, {
				hour: "2-digit",
				minute: "2-digit",
			}),
		}));
	}, [entries]);

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			gap: '20px',
			height: '100%',
			paddingTop: '20px',
		}}>
			{/* Compact Header Section */}
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				marginBottom: '10px',
			}}>
				{/* Title Section */}
				<div style={{
					background: '#ffffff',
					border: '2px outset #cccccc',
					padding: '10px 15px',
					textAlign: 'center',
					fontFamily: 'Arial, sans-serif',
				}}>
					<h1 style={{
						fontSize: '18px',
						fontWeight: 'bold',
						color: '#000000',
						margin: '0 0 5px 0',
						textShadow: '1px 1px 0 #cccccc',
					}}>
						✍️ GUESTBOOK ✍️
					</h1>
					<div style={{
						fontSize: '11px',
						color: '#666666',
						fontStyle: 'italic',
					}}>
						Sign the Guestbook! Leave your mark on the web!
					</div>
				</div>
			</div>

			{/* Sign Guestbook Form */}
			<PostItNote color="pink">
				<h3 style={{
					fontSize: '14px',
					fontWeight: 'bold',
					color: '#000000',
					marginBottom: '8px',
					fontFamily: 'Arial, sans-serif'
				}}>
					✍️ Sign the Guestbook ✍️
				</h3>
				<div style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}>
					<input
						type="text"
						value={name}
						placeholder="Your name (optional)..."
						onChange={(e) => setName(e.target.value)}
						maxLength={50}
						style={{
							width: "100%",
							padding: "8px",
							fontSize: "11px",
							border: "2px inset #cccccc",
							background: "#ffffff",
							fontFamily: "Arial, sans-serif",
							outline: "none",
							boxSizing: "border-box",
						}}
					/>
					<textarea
						value={draft}
						placeholder="Type your message here... (Ctrl+Enter to submit)"
						onChange={(e) => setDraft(e.target.value)}
						onKeyDown={handleKeyDown}
						rows={4}
						maxLength={240}
						style={{
							width: "100%",
							padding: "8px",
							fontSize: "11px",
							border: "2px inset #cccccc",
							background: "#ffffff",
							fontFamily: "Arial, sans-serif",
							resize: "vertical",
							outline: "none",
							boxSizing: "border-box",
							lineHeight: "1.4",
						}}
					/>
					<div style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "10px",
					}}>
						<div style={{
							fontSize: "10px",
							color: "#666666",
							fontStyle: "italic",
						}}>
							{draft.length}/240 characters
						</div>
						<button
							onClick={handleSubmit}
							disabled={!draft.trim()}
							style={{
								padding: '4px 8px',
								fontSize: '11px',
								background: draft.trim() ? '#e0e0e0' : '#f0f0f0',
								border: '2px outset #cccccc',
								cursor: draft.trim() ? 'pointer' : 'not-allowed',
								fontFamily: 'Arial, sans-serif',
								color: draft.trim() ? '#000000' : '#999999',
							}}
						>
							✍️ Sign Guestbook
						</button>
					</div>
				</div>
			</PostItNote>

			{/* Guestbook Entries Section */}
			<div style={{
				flex: 1,
				overflow: 'auto',
				padding: '10px',
				background: '#ffffff',
				border: '2px outset #cccccc',
				margin: '10px 0',
				fontFamily: 'Arial, sans-serif'
			}}>
				<h2 style={{
					fontSize: '16px',
					fontWeight: 'bold',
					color: '#000000',
					marginBottom: '15px',
					textAlign: 'center',
					borderBottom: '2px solid #000000',
					paddingBottom: '5px'
				}}>
					✍️ Guestbook Entries
				</h2>

				<div
					ref={listRef}
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '15px',
						maxHeight: '500px',
						overflowY: 'auto',
						padding: '5px',
					}}
				>
					{isLoading ? (
						<PostItNote color="yellow">
							<div style={{ textAlign: "center", opacity: 0.7 }}>
								<div style={{ fontSize: "16px", marginBottom: "10px" }}>⏳</div>
								<div>Loading guestbook entries...</div>
							</div>
						</PostItNote>
					) : formattedEntries.length === 0 ? (
						<PostItNote color="yellow">
							<div style={{ textAlign: "center", opacity: 0.8 }}>
								<div style={{ fontSize: "32px", marginBottom: "10px" }}>📝</div>
								<div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}>
									Be the first to sign the guestbook!
								</div>
								<div style={{ fontSize: "11px" }}>
									Leave a message below and become part of our retro web history!
								</div>
							</div>
						</PostItNote>
					) : (
						formattedEntries.map((e, index) => {
							const colors: Array<'yellow' | 'blue' | 'pink' | 'green' | 'orange' | 'purple'> = 
								['yellow', 'blue', 'pink', 'green', 'orange', 'purple'];
							const color = colors[index % colors.length];
							return (
								<PostItNote key={e.id} color={color}>
									<div style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										marginBottom: "8px",
										paddingBottom: "6px",
										borderBottom: "1px dashed #999999",
									}}>
										<div style={{
											fontWeight: "bold",
											fontSize: "11px",
											color: "#000000",
											fontFamily: "Arial, sans-serif",
										}}>
											{e.name ? e.name : `Entry #${index + 1}`}
										</div>
										<div style={{
											fontSize: "10px",
											color: "#666666",
											fontStyle: "italic",
										}}>
											{e.date} at {e.time}
										</div>
									</div>
									<div style={{
										whiteSpace: "pre-wrap",
										wordBreak: "break-word",
										lineHeight: "1.4",
										fontSize: "11px",
										color: "#000000",
									}}>
										{e.text}
									</div>
								</PostItNote>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
}

