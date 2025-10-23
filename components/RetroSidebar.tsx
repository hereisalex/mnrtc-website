'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationButton from './NavigationButton';

function RetroSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Events', href: '/events' },
    { label: 'Proposal', href: '/proposal' },
    { label: 'Resources', href: '/resources' },
    { label: 'Links', href: '/links' },
  ];

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

      {/* Navigation */}
      <div>
        <h3 style={{
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '8px',
          textAlign: 'center',
          borderBottom: 'none',
          paddingBottom: '5px',
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
        }}>
          Navigation
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
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
      <div className="postit-note postit-note-orange" style={{ fontSize: '10px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          MNRTC Online
        </div>
        <div>
          Minnesota Retro Technology Club
        </div>
        <div style={{ marginTop: '5px', fontSize: '9px' }}>
          Best viewed in Netscape Navigator 4.0!
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
        © 2025 MNRTC
      </div>
    </div>
  );
}

RetroSidebar.displayName = 'RetroSidebar';

export default RetroSidebar;
