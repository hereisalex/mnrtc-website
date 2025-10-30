'use client';

import ExternalLink from './ExternalLink';
import MailLink from './MailLink';

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
      {/* Meetings */}
      <div className="postit-note postit-note-green">
        <h3 style={{
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '8px',
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: '5px'
        }}>
          Meetings
        </h3>
        <div style={{ 
          background: '#e0f0ff', 
          border: 'none', 
          padding: '8px', 
          marginBottom: '8px' 
        }}>
          <strong style={{ fontSize: '11px' }}>Next Meeting TBA</strong><br />
          <em style={{ fontSize: '10px' }}>Check back soon!</em>
        </div>
        <p style={{
          fontSize: '10px',
          lineHeight: '1.4',
          margin: '0'
        }}>
          <strong>When:</strong> Second Sunday of every month, 1-5 PM CT<br />
          <strong>Where:</strong> Twin Cities metro area (location TBA)<br />
          <strong>What:</strong> Show-and-tell, technical discussions, and community building!
        </p>
      </div>

      {/* My Links */}
      <div className="postit-note postit-note-green">
        <h3 style={{
          fontSize: '12px',
          fontWeight: 'bold',
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
              e.currentTarget.style.background = '#e0f0ff';
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
              e.currentTarget.style.background = '#e0f0ff';
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
              e.currentTarget.style.background = '#e0f0ff';
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
              e.currentTarget.style.background = '#e0f0ff';
            }}
          >
            📅 Meetup
          </ExternalLink>
        </div>
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
