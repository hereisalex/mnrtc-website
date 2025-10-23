'use client';

import VisitorCounter from '@/components/geocities/VisitorCounter';
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
      {/* About Our Club */}
      <div className="postit-note postit-note-yellow">
        <h3 style={{
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '8px',
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: '5px'
        }}>
          About Our Club
        </h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ flexShrink: 0 }}>
            <img
              src="/images/mnrtc.png"
              alt="Minnesota Retro Technology Club Logo"
              width={40}
              height={40}
              style={{ 
                imageRendering: 'pixelated',
                maxWidth: '100%',
                height: 'auto'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: '10px',
              lineHeight: '1.4',
              margin: '0'
            }}>
              Minnesota Retro Technology Club is a new organization based in the Twin Cities. 
              We're still figuring things out, but please join our community!
            </p>
          </div>
        </div>
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

      {/* Visitor Counter */}
      <div className="postit-note postit-note-purple" style={{ textAlign: 'center' }}>
        <h3 style={{
          fontSize: '12px',
          fontWeight: 'bold',
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

      {/* Guestbook */}
      <div className="postit-note postit-note-yellow" style={{ textAlign: 'center' }}>
        <h3 style={{
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '8px',
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: '5px'
        }}>
          Guestbook
        </h3>
        <MailLink
          href="mailto:hello@mnretrotech.org"
          className="postit-note postit-note-yellow"
          style={{
            display: 'block',
            padding: '5px',
            fontSize: '10px',
            fontFamily: 'Arial, sans-serif',
            color: '#000000',
            textDecoration: 'none',
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '2px 0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffdd00';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffff00';
          }}
        >
          Sign Guestbook
        </MailLink>
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
