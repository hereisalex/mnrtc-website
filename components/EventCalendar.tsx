'use client';

import { useState, useMemo, useEffect } from 'react';
import PostItNote from './PostItNote';

interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'past' | 'tba';
}

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get events for the current month
  const monthEvents = useMemo(() => {
    return events.filter((event) => {
      if (!event.date || event.date === 'TBA') return false;
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month
      );
    });
  }, [events, year, month]);

  // Create a map of date strings to events
  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    monthEvents.forEach((event) => {
      const dateStr = event.date;
      if (!map.has(dateStr)) {
        map.set(dateStr, []);
      }
      map.get(dateStr)!.push(event);
    });
    return map;
  }, [monthEvents]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const events = eventsByDate.get(dateStr);
    if (events && events.length > 0) {
      setSelectedDate(dateStr);
      setSelectedEvent(events[0]); // Show first event if multiple
    } else {
      setSelectedDate(null);
      setSelectedEvent(null);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <>
      <PostItNote color="yellow">
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'normal',
          color: '#000000',
          marginBottom: '8px',
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: '5px'
        }}>
          📅 Event Calendar
        </h3>

        {/* Month Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
          padding: '2px 0'
        }}>
          <button
            onClick={goToPreviousMonth}
            style={{
              background: '#e0e0e0',
              border: '1px solid #000000',
              padding: '2px 6px',
              fontSize: '9px',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d0d0d0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#e0e0e0';
            }}
          >
            ←
          </button>
          <div style={{
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1
          }}>
            {monthNames[month]} {year}
          </div>
          <button
            onClick={goToNextMonth}
            style={{
              background: '#e0e0e0',
              border: '1px solid #000000',
              padding: '2px 6px',
              fontSize: '9px',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d0d0d0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#e0e0e0';
            }}
          >
            →
          </button>
        </div>

        {/* Today Button */}
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <button
            onClick={goToToday}
            style={{
              background: '#ffff00',
              border: '1px solid #000000',
              padding: '2px 8px',
              fontSize: '8px',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#eeee00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffff00';
            }}
          >
            Today
          </button>
        </div>

        {/* Day Names */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          marginBottom: '4px'
        }}>
          {dayNames.map((day) => (
            <div
              key={day}
              style={{
                fontSize: '8px',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '2px 0'
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px'
        }}>
          {calendarDays.map((day, index) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  style={{
                    aspectRatio: '1',
                    background: '#f5f5f5',
                    border: '1px solid #e0e0e0'
                  }}
                />
              );
            }

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEvent = eventsByDate.has(dateStr);
            const isTodayDate = isToday(day);

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                style={{
                  aspectRatio: '1',
                  background: isTodayDate
                    ? '#ffff00'
                    : hasEvent
                    ? '#e0f0ff'
                    : '#ffffff',
                  border: isTodayDate
                    ? '2px solid #000000'
                    : '1px solid #000000',
                  fontSize: '9px',
                  cursor: hasEvent ? 'pointer' : 'default',
                  fontFamily: 'Arial, sans-serif',
                  padding: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (hasEvent) {
                    e.currentTarget.style.background = '#d0e0ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (hasEvent) {
                    e.currentTarget.style.background = '#e0f0ff';
                  }
                }}
              >
                <span>{day}</span>
                {hasEvent && (
                  <span style={{
                    fontSize: '6px',
                    position: 'absolute',
                    bottom: '1px',
                    color: '#0000ff'
                  }}>
                    ●
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Event Indicator Legend */}
        {monthEvents.length > 0 && (
          <div style={{
            marginTop: '8px',
            paddingTop: '6px',
            borderTop: '1px solid #000000',
            fontSize: '8px',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ color: '#0000ff' }}>●</span> = Event
            </div>
            <div>
              <span style={{ background: '#ffff00', padding: '1px 4px', border: '1px solid #000000' }}>
                Today
              </span>
            </div>
          </div>
        )}

        {/* Quick Event Info */}
        {monthEvents.length > 0 && (
          <div style={{
            marginTop: '8px',
            paddingTop: '6px',
            borderTop: '1px solid #000000',
            fontSize: '8px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              This Month:
            </div>
            {monthEvents.map((event) => {
              const eventDate = new Date(event.date);
              return (
                <div
                  key={event.id}
                  style={{
                    marginBottom: '4px',
                    padding: '2px',
                    background: '#f0f0f0',
                    border: '1px solid #000000',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedEvent(event);
                    setSelectedDate(event.date);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e0e0e0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f0f0f0';
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>
                    {eventDate.getDate()} {monthNames[eventDate.getMonth()].substring(0, 3)}
                  </div>
                  <div style={{ fontSize: '7px' }}>
                    {event.title.length > 20 ? event.title.substring(0, 20) + '...' : event.title}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No Events Message */}
        {monthEvents.length === 0 && !loading && !error && (
          <div style={{
            marginTop: '8px',
            paddingTop: '6px',
            borderTop: '1px solid #000000',
            fontSize: '8px',
            textAlign: 'center',
            color: '#666666'
          }}>
            No events this month
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{
            marginTop: '8px',
            paddingTop: '6px',
            borderTop: '1px solid #000000',
            fontSize: '8px',
            textAlign: 'center',
            color: '#666666'
          }}>
            Loading events...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            marginTop: '8px',
            paddingTop: '6px',
            borderTop: '1px solid #000000',
            fontSize: '8px',
            textAlign: 'center',
            color: '#ff0000'
          }}>
            {error}
          </div>
        )}
      </PostItNote>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => {
            setSelectedEvent(null);
            setSelectedDate(null);
          }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '2px solid #000000',
              padding: '15px',
              maxWidth: '400px',
              maxHeight: '400px',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                margin: 0,
                fontFamily: 'Arial, sans-serif'
              }}>
                {selectedEvent.title}
              </h3>
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setSelectedDate(null);
                }}
                style={{
                  background: '#ff0000',
                  color: '#ffffff',
                  border: '1px solid #000000',
                  padding: '2px 6px',
                  fontSize: '10px',
                  cursor: 'pointer',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                ×
              </button>
            </div>
            <div style={{ fontSize: '10px', marginBottom: '10px', lineHeight: '1.4' }}>
              <div><strong>Date:</strong> {selectedEvent.date}</div>
              <div><strong>Time:</strong> {selectedEvent.time}</div>
              <div><strong>Location:</strong> {selectedEvent.location}</div>
              <div><strong>Status:</strong> {selectedEvent.status.toUpperCase()}</div>
            </div>
            <div style={{
              fontSize: '9px',
              lineHeight: '1.4',
              marginBottom: '10px',
              padding: '8px',
              background: '#f0f0f0',
              border: '1px solid #000000'
            }}>
              {selectedEvent.description}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <a
                href="https://groups.io/g/mnretrotech"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#e0e0e0',
                  color: '#000000',
                  padding: '4px 8px',
                  border: '1px solid #000000',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontFamily: 'Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#d0d0d0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#e0e0e0';
                }}
              >
                📬 RSVP on Groups.io
              </a>
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setSelectedDate(null);
                }}
                style={{
                  display: 'inline-block',
                  background: '#e0e0e0',
                  color: '#000000',
                  padding: '4px 8px',
                  border: '1px solid #000000',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#d0d0d0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#e0e0e0';
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

