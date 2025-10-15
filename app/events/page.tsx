'use client';

import { useState } from 'react';
import GeoCitiesWindow from "@/components/geocities/GeoCitiesWindow";
import GeoCitiesButton from "@/components/geocities/GeoCitiesButton";

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
    <div style={{ marginTop: '30px', position: 'relative', minHeight: 'calc(100vh - 30px)' }}>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="geocities-title geocities-glitter">
          <span className="geocities-blink geocities-spin">📅</span> Events Calendar <span className="geocities-blink geocities-spin">📅</span>
        </h1>
      </div>

      {/* Overlapping Windows */}
      <div style={{ position: 'relative', width: '100%', height: '900px' }}>
        {/* Main Events Window */}
        <GeoCitiesWindow 
          title="Upcoming Events" 
          width="600px" 
          height="400px"
          x={50}
          y={50}
        >
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontSize: '12px', color: '#666666', marginBottom: '15px' }}>
              Meetings are typically held on the second Sunday of every month from 1-5 PM CT in the Twin Cities metro area.
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div style={{ overflowY: 'auto', height: '280px' }}>
              {upcomingEvents.map((event) => (
                <div key={event.id} style={{
                  background: '#f8f8f8',
                  border: '1px solid #000000',
                  padding: '10px',
                  marginBottom: '10px',
                  boxShadow: 'inset 1px 1px 0 #000000'
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
                  <GeoCitiesButton
                    onClick={() => setSelectedEvent(event)}
                    style={{ width: '100%', fontSize: '10px', padding: '3px' }}
                  >
                    View Details
                  </GeoCitiesButton>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: '#f0f0f0',
              border: '1px solid #000000',
              padding: '20px',
              textAlign: 'center',
              boxShadow: 'inset 1px 1px 0 #000000'
            }}>
              <div style={{ 
                fontSize: '30px', 
                marginBottom: '10px',
                animation: 'geocities-spin 2s linear infinite'
              }}>
                ⏰
              </div>
              <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
                No upcoming events scheduled yet. Check back soon or join our mailing list for updates!
              </p>
            </div>
          )}
        </GeoCitiesWindow>

        {/* Get Notified Window */}
        <GeoCitiesWindow 
          title="Get Notified" 
          width="250px" 
          height="200px"
          x={500}
          y={100}
        >
          <div>
            <p style={{ fontSize: '11px', marginBottom: '15px' }}>
              Join our mailing list to receive event announcements
            </p>
            <GeoCitiesButton
              href="https://groups.io/g/mnretrotech"
              external
              variant="primary"
              style={{ width: '100%', fontSize: '11px' }}
            >
              📧 Join Mailing List
            </GeoCitiesButton>
          </div>
        </GeoCitiesWindow>

        {/* Discord Window */}
        <GeoCitiesWindow 
          title="Discord Chat" 
          width="250px" 
          height="200px"
          x={500}
          y={320}
        >
          <div>
            <p style={{ fontSize: '11px', marginBottom: '15px' }}>
              Chat with members and discuss upcoming events
            </p>
            <GeoCitiesButton
              href="https://discord.gg/hF9wh6gPcP"
              external
              variant="accent"
              style={{ width: '100%', fontSize: '11px' }}
            >
              💬 Join Discord
            </GeoCitiesButton>
          </div>
        </GeoCitiesWindow>

        {/* Meetup Window */}
        <GeoCitiesWindow 
          title="Meetup.com" 
          width="250px" 
          height="150px"
          x={500}
          y={480}
        >
          <div>
            <p style={{ fontSize: '11px', marginBottom: '15px' }}>
              RSVP to events and find other members
            </p>
            <GeoCitiesButton href="https://www.meetup.com/" external style={{ width: '100%', fontSize: '11px' }}>
              🤝 View on Meetup
            </GeoCitiesButton>
          </div>
        </GeoCitiesWindow>

        {/* Event Details Modal */}
        {selectedEvent && (
          <GeoCitiesWindow 
            title={selectedEvent.title} 
            width="400px" 
            height="350px"
            x={150}
            y={200}
            closable
            onClose={() => setSelectedEvent(null)}
          >
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Event Details</h3>
              <div style={{ fontSize: '11px', marginBottom: '15px' }}>
                <p><strong>Date:</strong> {selectedEvent.date}</p>
                <p><strong>Time:</strong> {selectedEvent.time}</p>
                <p><strong>Location:</strong> {selectedEvent.location}</p>
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Description</h3>
              <p style={{ fontSize: '11px', marginBottom: '15px', lineHeight: '1.4' }}>
                {selectedEvent.description}
              </p>
              <div style={{
                background: '#ffff00',
                border: '1px solid #000000',
                padding: '8px',
                marginBottom: '15px'
              }}>
                <p style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>
                  What to bring:
                </p>
                <p style={{ fontSize: '10px' }}>
                  Your enthusiasm! Projects, collections, or questions are welcome but not required. 
                  Free table items are also appreciated.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <GeoCitiesButton
                  href="https://groups.io/g/mnretrotech"
                  external
                  variant="primary"
                  style={{ flex: 1, fontSize: '10px' }}
                >
                  RSVP via Email
                </GeoCitiesButton>
                <GeoCitiesButton 
                  onClick={() => setSelectedEvent(null)}
                  style={{ flex: 1, fontSize: '10px' }}
                >
                  Close
                </GeoCitiesButton>
              </div>
            </div>
          </GeoCitiesWindow>
        )}
      </div>
    </div>
  );
}

