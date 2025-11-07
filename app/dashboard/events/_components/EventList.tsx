'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserSupabaseClient } from '@/lib/supabaseClient';

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

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      alert('Supabase client not available');
      setDeletingId(null);
      return;
    }

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete event');
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (event: Event) => {
    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      alert('Supabase client not available');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { error } = await supabase
        .from('events')
        .update({ 
          published: !event.published,
          updated_by: session.user.id,
        })
        .eq('id', event.id);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update event');
    }
  };

  if (events.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'rgba(226,232,240,0.6)',
      }}>
        No events found. Create your first event!
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(148,163,184,0.25)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
        <thead>
          <tr style={{ textAlign: 'left', color: 'rgba(226,232,240,0.75)', fontSize: '0.85rem' }}>
            <th style={headerCell}>Title</th>
            <th style={headerCell}>Date</th>
            <th style={headerCell}>Time</th>
            <th style={headerCell}>Location</th>
            <th style={headerCell}>Status</th>
            <th style={headerCell}>Published</th>
            <th style={headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td style={bodyCell}>
                <strong style={{ color: '#f8fafc' }}>{event.title}</strong>
                {event.description && (
                  <div style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'rgba(226,232,240,0.6)' }}>
                    {event.description.length > 50 
                      ? event.description.substring(0, 50) + '...' 
                      : event.description}
                  </div>
                )}
              </td>
              <td style={bodyCell}>
                {new Date(event.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td style={bodyCell}>{event.time || '-'}</td>
              <td style={bodyCell}>{event.location || '-'}</td>
              <td style={bodyCell}>
                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: 
                      event.status === 'upcoming' 
                        ? 'rgba(59, 130, 246, 0.2)'
                        : event.status === 'past'
                        ? 'rgba(148, 163, 184, 0.2)'
                        : 'rgba(234, 179, 8, 0.2)',
                    color: 
                      event.status === 'upcoming'
                        ? '#93c5fd'
                        : event.status === 'past'
                        ? '#cbd5e1'
                        : '#fde047',
                  }}
                >
                  {event.status.toUpperCase()}
                </span>
              </td>
              <td style={bodyCell}>
                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: event.published
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(148, 163, 184, 0.2)',
                    color: event.published ? '#86efac' : '#cbd5e1',
                  }}
                >
                  {event.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td style={bodyCell}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => router.push(`/dashboard/events?mode=edit&id=${event.id}`)}
                    style={actionButtonStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleTogglePublish(event)}
                    style={actionButtonStyle}
                  >
                    {event.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    disabled={deletingId === event.id}
                    style={{ ...actionButtonStyle, ...deleteButtonStyle }}
                  >
                    {deletingId === event.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

