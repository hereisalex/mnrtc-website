'use client';

import { useState } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'past' | 'tba';
}

// Sample events data - in production, this would come from the events folder or API
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'First Meeting - Planning Session',
    date: 'TBA',
    time: '1:00 PM - 5:00 PM CT',
    location: 'Twin Cities Metro Area (TBA)',
    description:
      'Our inaugural meeting! Join us as we finalize the club structure, discuss meeting locations, and get to know fellow retro tech enthusiasts. Bring your projects, collections, or just your enthusiasm!',
    status: 'tba',
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const upcomingEvents = sampleEvents.filter((e) => e.status === 'upcoming' || e.status === 'tba');
  const pastEvents = sampleEvents.filter((e) => e.status === 'past');

  return (
    <>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Events Calendar
        </h1>
        <div style={{ 
          background: '#ffff00', 
          color: '#000000', 
          padding: '4px 8px', 
          border: '2px solid #000000',
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}>
          UPCOMING MEETINGS & EVENTS!
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Upcoming Events
        </h2>
        <p style={{ fontSize: '12px', color: '#666666', marginBottom: '15px' }}>
          Meetings are typically held on the second Sunday of every month from 1-5 PM CT in the Twin Cities metro area.
        </p>
        {upcomingEvents.length > 0 ? (
          <div>
            {upcomingEvents.map((event) => (
              <div key={event.id} style={{
                background: '#ffffff',
                border: '1px solid #000000',
                padding: '10px',
                marginBottom: '10px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{event.title}</h3>
                <div style={{ fontSize: '11px', marginBottom: '8px' }}>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                </div>
                <p style={{ fontSize: '11px', marginBottom: '10px', lineHeight: '1.4' }}>
                  {event.description}
                </p>
                <button
                  onClick={() => setSelectedEvent(event)}
                  style={{
                    display: 'inline-block',
                    background: '#e0e0e0',
                    color: '#000000',
                    padding: '3px 8px',
                    border: '1px solid #000000',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: '#f0f0f0',
            border: '1px solid #000000',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>No Upcoming Events</h2>
            <p style={{ fontSize: '11px', marginBottom: '15px', lineHeight: '1.4' }}>
              We're still planning our first meeting! Check back soon for updates.
            </p>
            <a 
              href="https://groups.io/g/mnretrotech" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#e0e0e0',
                color: '#000000',
                padding: '5px 10px',
                border: '1px solid #000000',
                fontSize: '11px',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              📬 Join the Mailing List for Updates
            </a>
          </div>
        )}
      </div>

      {/* Past Events Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Past Events
        </h2>
        {pastEvents.length > 0 ? (
          <div>
            {pastEvents.map((event) => (
              <div key={event.id} style={{
                background: '#ffffff',
                border: '1px solid #000000',
                padding: '8px',
                marginBottom: '8px'
              }}>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', margin: '0 0 5px 0' }}>{event.title}</h3>
                <div style={{ fontSize: '10px', color: '#666666', marginBottom: '5px' }}>
                  {event.date} • {event.time}
                </div>
                <p style={{ fontSize: '9px', margin: 0, lineHeight: '1.3' }}>{event.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: '#f0f0f0',
            border: '1px solid #000000',
            padding: '15px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '11px', margin: 0, lineHeight: '1.4' }}>
              No past events yet. We're just getting started!
            </p>
          </div>
        )}
      </div>

      {/* Quick Links Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Quick Links
        </h2>
        <p style={{ fontSize: '11px', marginBottom: '15px' }}>
          Stay connected with the MNRTC community!
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a 
            href="https://groups.io/g/mnretrotech" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '5px 10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            📬 Join Mailing List
          </a>
          <a 
            href="https://discord.gg/hF9wh6gPcP" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '5px 10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            💬 Join Discord
          </a>
          <a 
            href="https://www.meetup.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '5px 10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            📅 Meetup.com
          </a>
        </div>
      </div>

      {/* RSVP Info Section */}
      <div style={{
        background: '#ffff00',
        border: '2px solid #000000',
        padding: '15px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          RSVP Information
        </h2>
        <p style={{ fontSize: '11px', marginBottom: '15px' }}>
          Want to attend our meetings? Here's how to RSVP:
        </p>
        <div style={{ fontSize: '10px', lineHeight: '1.4', marginBottom: '15px' }}>
          <strong>1.</strong> Join our mailing list on Groups.io<br />
          <strong>2.</strong> Watch for meeting announcements<br />
          <strong>3.</strong> Reply to the RSVP thread<br />
          <strong>4.</strong> Show up and have fun!
        </div>
        <a 
          href="https://groups.io/g/mnretrotech" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#ffffff',
            color: '#000000',
            padding: '5px 10px',
            border: '2px solid #000000',
            fontSize: '11px',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
        >
          📬 Join Groups.io
        </a>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div style={{
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
        }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid #000000',
            padding: '20px',
            maxWidth: '500px',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                {selectedEvent.title}
              </h2>
              <button 
                onClick={() => setSelectedEvent(null)}
                style={{
                  background: '#ff0000',
                  color: '#ffffff',
                  border: '1px solid #000000',
                  padding: '2px 6px',
                  fontSize: '10px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
            <div style={{ fontSize: '12px', marginBottom: '15px', lineHeight: '1.4' }}>
              <div><strong>Date:</strong> {selectedEvent.date}</div>
              <div><strong>Time:</strong> {selectedEvent.time}</div>
              <div><strong>Location:</strong> {selectedEvent.location}</div>
              <div><strong>Status:</strong> {selectedEvent.status.toUpperCase()}</div>
            </div>
            <div style={{ fontSize: '11px', lineHeight: '1.4', marginBottom: '20px' }}>
              <strong>Description:</strong><br />
              {selectedEvent.description}
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <a 
                href="https://groups.io/g/mnretrotech" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: '#e0e0e0',
                  color: '#000000',
                  padding: '5px 10px',
                  border: '1px solid #000000',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textDecoration: 'none'
                }}
              >
                📬 RSVP on Groups.io
              </a>
              <button 
                onClick={() => setSelectedEvent(null)}
                style={{
                  display: 'inline-block',
                  background: '#e0e0e0',
                  color: '#000000',
                  padding: '5px 10px',
                  border: '1px solid #000000',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
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