'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GuestbookEntry {
  id: string;
  text: string;
  created_at: string;
}

interface GuestbookEntryListProps {
  entries: GuestbookEntry[];
}

export function GuestbookEntryList({ entries }: GuestbookEntryListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');

  const handleDelete = async (id: string, text: string) => {
    const preview = text.length > 50 ? text.substring(0, 50) + '...' : text;
    if (!confirm(`Are you sure you want to delete this entry?\n\n"${preview}"\n\nThis action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/guestbook/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Failed to delete entry' }));
        throw new Error(error.error || 'Failed to delete entry');
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete entry');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEntries = filter
    ? entries.filter((entry) =>
        entry.text.toLowerCase().includes(filter.toLowerCase())
      )
    : entries;

  if (entries.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'rgba(226,232,240,0.6)',
      }}>
        No guestbook entries found.
      </div>
    );
  }

  return (
    <div>
      {/* Search Filter */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search entries..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={searchInputStyle}
        />
        {filter && (
          <span style={filterCountStyle}>
            Showing {filteredEntries.length} of {entries.length} entries
          </span>
        )}
      </div>

      {/* Entries Table */}
      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(148,163,184,0.25)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'rgba(226,232,240,0.75)', fontSize: '0.85rem' }}>
              <th style={headerCell}>Date</th>
              <th style={headerCell}>Entry</th>
              <th style={headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: 'rgba(226,232,240,0.6)' }}>
                  No entries match your search.
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry) => (
                <tr key={entry.id}>
                  <td style={bodyCell}>
                    <div>
                      <div style={{ color: '#f8fafc', fontWeight: 600 }}>
                        {new Date(entry.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(226,232,240,0.6)', marginTop: '0.25rem' }}>
                        {new Date(entry.created_at).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </td>
                  <td style={bodyCell}>
                    <div style={{
                      maxWidth: '500px',
                      wordBreak: 'break-word',
                      lineHeight: '1.5',
                      color: '#f8fafc',
                    }}>
                      {entry.text}
                    </div>
                  </td>
                  <td style={bodyCell}>
                    <button
                      onClick={() => handleDelete(entry.id, entry.text)}
                      disabled={deletingId === entry.id}
                      style={{ ...actionButtonStyle, ...deleteButtonStyle }}
                    >
                      {deletingId === entry.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const headerCell: React.CSSProperties = {
  padding: '0.9rem 0.75rem',
  borderBottom: '1px solid rgba(148,163,184,0.25)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

const bodyCell: React.CSSProperties = {
  padding: '0.85rem 0.75rem',
  borderBottom: '1px solid rgba(148,163,184,0.18)',
  verticalAlign: 'top',
  fontSize: '0.95rem',
};

const actionButtonStyle: React.CSSProperties = {
  padding: '0.375rem 0.75rem',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148,163,184,0.25)',
  borderRadius: '6px',
  color: '#f8fafc',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  background: 'rgba(239, 68, 68, 0.2)',
  borderColor: 'rgba(239, 68, 68, 0.3)',
  color: '#fca5a5',
};

const searchInputStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '400px',
  padding: '0.625rem 0.875rem',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148,163,184,0.25)',
  borderRadius: '8px',
  color: '#f8fafc',
  fontSize: '0.875rem',
  outline: 'none',
};

const filterCountStyle: React.CSSProperties = {
  display: 'block',
  marginTop: '0.5rem',
  fontSize: '0.75rem',
  color: 'rgba(226,232,240,0.6)',
};

