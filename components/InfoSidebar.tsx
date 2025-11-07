'use client';

import VisitorCounter from '@/components/geocities/VisitorCounter';
import ExternalLink from './ExternalLink';
import MailLink from './MailLink';
import EventCalendar from './EventCalendar';

function InfoSidebar() {
  return (
    <div style={{ 
      background: 'transparent',
      border: 'none',
      padding: '10px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      {/* Top Spacer - aligns month navigation top with Home button top */}
      {/* Left sidebar: 10px padding + 230px spacer + Navigation h3 (~31px: 18px font + 8px marginBottom + 5px paddingBottom) + 3px gap = 274px to Home button top */}
      {/* Right sidebar: 10px padding + spacer + PostItNote padding 10px + Calendar h3 (~31px) + h3 marginBottom 8px = 274px to month navigation top */}
      {/* So: 10 + X + 10 + 31 + 8 = 274, therefore X = 215px */}
      {/* Firefox-specific adjustment: Add extra spacing for font rendering differences */}
      <div className="info-sidebar-spacer" style={{ height: '215px' }} />

      {/* Event Calendar */}
      <EventCalendar />

      {/* My Links */}
      <div className="postit-note postit-note-green">
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'normal',
          color: '#000000',
          marginBottom: '8px',
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: '5px'
        }}>
          My Links
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <ExternalLink
            href="https://discord.gg/hF9wh6gPcP"
            className="postit-note postit-note-blue"
            style={{
              display: 'block',
              padding: '3px 6px',
              fontSize: '10px',
              fontFamily: 'Arial, sans-serif',
              color: '#0000ff',
              textDecoration: 'none',
              textAlign: 'center',
              margin: '2px 0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d0e0ff';
            }}
            onMouseLeave={(e) => {
              // Remove inline style to restore CSS class background color
              e.currentTarget.style.background = '';
            }}
          >
            💬 Discord
          </ExternalLink>
          <ExternalLink
            href="https://groups.io/g/mnretrotech"
            className="postit-note postit-note-green"
            style={{
              display: 'block',
              padding: '3px 6px',
              fontSize: '10px',
              fontFamily: 'Arial, sans-serif',
              color: '#0000ff',
              textDecoration: 'none',
              textAlign: 'center',
              margin: '2px 0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d0e0ff';
            }}
            onMouseLeave={(e) => {
              // Remove inline style to restore CSS class background color
              e.currentTarget.style.background = '';
            }}
          >
            📧 Mailing List
          </ExternalLink>
          <MailLink
            href="mailto:hello@mnretrotech.org"
            className="postit-note postit-note-pink"
            style={{
              display: 'block',
              padding: '3px 6px',
              fontSize: '10px',
              fontFamily: 'Arial, sans-serif',
              color: '#0000ff',
              textDecoration: 'none',
              textAlign: 'center',
              margin: '2px 0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d0e0ff';
            }}
            onMouseLeave={(e) => {
              // Remove inline style to restore CSS class background color
              e.currentTarget.style.background = '';
            }}
          >
            📬 Contact
          </MailLink>
          <ExternalLink
            href="https://www.meetup.com/"
            className="postit-note postit-note-orange"
            style={{
              display: 'block',
              padding: '3px 6px',
              fontSize: '10px',
              fontFamily: 'Arial, sans-serif',
              color: '#0000ff',
              textDecoration: 'none',
              textAlign: 'center',
              margin: '2px 0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d0e0ff';
            }}
            onMouseLeave={(e) => {
              // Remove inline style to restore CSS class background color
              e.currentTarget.style.background = '';
            }}
          >
            📅 Meetup
          </ExternalLink>
        </div>
      </div>

      {/* Guestbook moved to left sidebar */}

      {/* Visitor Counter */}
      <div className="postit-note postit-note-purple" style={{ textAlign: 'center' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'normal',
          color: '#000000',
          marginBottom: '8px',
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: '5px'
        }}>
          Visitor Counter
        </h3>
        <VisitorCounter />
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer */}
      <div style={{
        fontSize: '8px',
        textAlign: 'center',
        color: '#666666',
        borderTop: 'none',
        paddingTop: '5px'
      }}>
        Under construction since 1995!
      </div>
    </div>
  );
}

InfoSidebar.displayName = 'InfoSidebar';

export default InfoSidebar;
