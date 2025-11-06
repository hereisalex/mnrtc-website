'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

interface EventFormProps {
  event?: Event;
  onSave: () => void;
  onCancel: () => void;
}

export function EventForm({ event, onSave, onCancel }: EventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Event>({
    id: event?.id || '',
    title: event?.title || '',
    date: event?.date || new Date().toISOString().split('T')[0],
    time: event?.time || '',
    location: event?.location || '',
    description: event?.description || '',
    status: event?.status || 'upcoming',
    published: event?.published ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = event ? `/api/events/${event.id}` : '/api/events';
      const method = event ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          description: formData.description,
          status: formData.status,
          published: formData.published,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save event');
      }

      onSave();
      router.push('/dashboard/events');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onCancel();
    router.push('/dashboard/events');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{
          padding: '0.75rem',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#fca5a5',
        }}>
          {error}
        </div>
      )}

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          style={inputStyle}
          placeholder="First Meeting - Planning Session"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Time
          </label>
          <input
            type="text"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            style={inputStyle}
            placeholder="1:00 PM - 5:00 PM CT"
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Location
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          style={inputStyle}
          placeholder="Twin Cities Metro Area (TBA)"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={6}
          style={inputStyle}
          placeholder="Event description..."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'upcoming' | 'past' | 'tba' })}
            style={inputStyle}
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="tba">TBA</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.75rem' }}>
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            style={{ width: '1rem', height: '1rem' }}
          />
          <label htmlFor="published" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>
            Published (visible to public)
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleCancel}
          style={buttonStyle}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ ...buttonStyle, ...primaryButtonStyle }}
        >
          {isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148,163,184,0.25)',
  borderRadius: '8px',
  color: '#f8fafc',
  fontSize: '0.95rem',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.625rem 1.25rem',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148,163,184,0.25)',
  borderRadius: '8px',
  color: '#f8fafc',
  fontSize: '0.875rem',
  fontWeight: 600,
  cursor: 'pointer',
};

const primaryButtonStyle: React.CSSProperties = {
  background: '#1d4ed8',
  borderColor: '#3b82f6',
};

