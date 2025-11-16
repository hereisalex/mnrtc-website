'use client';

import VisitorCounter from '@/components/geocities/VisitorCounter';
import ExternalLink from './ExternalLink';
import MailLink from './MailLink';
import EventCalendar from './EventCalendar';
import { SPACING, TYPOGRAPHY, BUTTONS } from '@/lib/spacing';

function InfoSidebar() {
  return (
    <div className="sidebar-content" style={{ 
      background: 'transparent',
      border: 'none',
      height: '100%',
    }}>
      {/* Event Calendar */}
      <div>
        <EventCalendar />
      </div>

      {/* My Links */}
      <div className="postit-note postit-note-green">
        <h3 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_LG}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
          color: '#000000',
          marginBottom: `${SPACING.NAV_HEADER_MARGIN_BOTTOM}px`,
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: `${SPACING.NAV_HEADER_PADDING_BOTTOM}px`
        }}>
          My Links
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${SPACING.SIDEBAR_BUTTON_GAP}px` }}>
          <ExternalLink
            href="https://discord.gg/hF9wh6gPcP"
            className="postit-note postit-note-blue"
            style={{
              display: 'block',
              padding: BUTTONS.BUTTON_PADDING_MD,
              fontSize: `${BUTTONS.BUTTON_FONT_SIZE_MD}px`,
              fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF,
              color: '#0000ff',
              textDecoration: 'none',
              textAlign: 'center',
              margin: BUTTONS.BUTTON_MARGIN_SM
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
              padding: BUTTONS.BUTTON_PADDING_MD,
              fontSize: `${BUTTONS.BUTTON_FONT_SIZE_MD}px`,
              fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF,
              color: '#0000ff',
              textDecoration: 'none',
              textAlign: 'center',
              margin: BUTTONS.BUTTON_MARGIN_SM
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
              padding: BUTTONS.BUTTON_PADDING_MD,
              fontSize: `${BUTTONS.BUTTON_FONT_SIZE_MD}px`,
              fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF,
              color: '#0000ff',
              textDecoration: 'none',
              textAlign: 'center',
              margin: BUTTONS.BUTTON_MARGIN_SM
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
              padding: BUTTONS.BUTTON_PADDING_MD,
              fontSize: `${BUTTONS.BUTTON_FONT_SIZE_MD}px`,
              fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF,
              color: '#0000ff',
              textDecoration: 'none',
              textAlign: 'center',
              margin: BUTTONS.BUTTON_MARGIN_SM
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
          fontSize: `${TYPOGRAPHY.FONT_SIZE_LG}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
          color: '#000000',
          marginBottom: `${SPACING.NAV_HEADER_MARGIN_BOTTOM}px`,
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: `${SPACING.NAV_HEADER_PADDING_BOTTOM}px`
        }}>
          Visitor Counter
        </h3>
        <VisitorCounter />
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer */}
      <div style={{
        fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`,
        textAlign: 'center',
        color: '#666666',
        borderTop: 'none',
        paddingTop: `${SPACING.SIDEBAR_FOOTER_PADDING_TOP}px`
      }}>
        Under construction since 1995!
      </div>
    </div>
  );
}

InfoSidebar.displayName = 'InfoSidebar';

export default InfoSidebar;
