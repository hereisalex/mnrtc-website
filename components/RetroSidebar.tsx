'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationButton from './NavigationButton';
import { SPACING, TYPOGRAPHY } from '@/lib/spacing';

function RetroSidebar() {
  const pathname = usePathname();
  const isGuestbookPage = pathname === '/guestbook';
  const isMainPage = pathname === '/';
  const showLogo = !isMainPage && !isGuestbookPage;

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Events', href: '/events' },
    { label: 'Proposal', href: '/proposal' },
    { label: 'Resources', href: '/resources' },
    { label: 'Links', href: '/links' },
    { label: 'Guestbook', href: '/guestbook' },
  ];

  return (
    <div className="sidebar-content" style={{ 
      background: 'transparent',
      border: 'none',
      height: '100%',
    }}>
      {/* Logo for guestbook page */}
      {isGuestbookPage && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: `${SPACING.TEXT_MARGIN_BOTTOM * 2}px`,
        }}>
          <img
            src="/images/full-logo.png"
            alt="Minnesota Retro Technology Club Logo"
            style={{ 
              imageRendering: 'pixelated',
              maxWidth: '180px',
              height: 'auto',
              display: 'block',
              width: 'auto',
            }}
          />
        </div>
      )}

      {/* Logo above Navigation for non-main, non-guestbook pages */}
      {showLogo && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: `${SPACING.LOGO_TO_NAV_GAP}px`,
        }}>
          <Link href="/" style={{ display: 'block' }}>
            <img
              src="/images/full-logo.png"
              alt="Minnesota Retro Technology Club"
              style={{
                imageRendering: 'pixelated',
                width: 'auto',
                height: 'auto',
                maxWidth: `${SPACING.LOGO_MAX_WIDTH}px`,
                display: 'block',
                border: 'none',
                background: 'transparent',
                padding: 0,
                boxShadow: 'none',
              }}
            />
          </Link>
        </div>
      )}

      {/* Navigation */}
      <div>
        <h3 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_HUGE}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: `${SPACING.NAV_HEADER_MARGIN_BOTTOM}px`,
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: `${SPACING.NAV_HEADER_PADDING_BOTTOM}px`,
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
        }}>
          Navigation
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${SPACING.SIDEBAR_BUTTON_GAP}px` }}>
          {navItems.map((item, index) => {
            const colors = ['postit-note-yellow', 'postit-note-blue', 'postit-note-pink', 'postit-note-green', 'postit-note-orange', 'postit-note-purple'];
            const colorClass = colors[index % colors.length];
            return (
              <NavigationButton
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={pathname === item.href}
                color={colorClass}
              />
            );
          })}
        </div>
      </div>

      {/* Quick Info */}
      <div className="postit-note postit-note-orange" style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px` }}>
        <div style={{ fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD, marginBottom: `${SPACING.TEXT_MARGIN_BOTTOM}px` }}>
          MNRTC Online
        </div>
        <div>
          Minnesota Retro Technology Club
        </div>
        <div style={{ marginTop: `${SPACING.TEXT_MARGIN_BOTTOM}px`, fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px` }}>
          Best viewed in Netscape Navigator 4.0!
        </div>
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
        © 2025 MNRTC
      </div>
    </div>
  );
}

RetroSidebar.displayName = 'RetroSidebar';

export default RetroSidebar;
