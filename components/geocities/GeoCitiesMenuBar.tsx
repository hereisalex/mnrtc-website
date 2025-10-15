'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface MenuItem {
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
}

export default function GeoCitiesMenuBar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      label: 'MNRTC',
      submenu: [
        { label: 'About MNRTC', href: '/about' },
        { label: 'Club Proposal', href: '/proposal' },
        { label: 'Contact Us', href: 'mailto:hello@mnretrotech.org' },
      ]
    },
    {
      label: 'Community',
      submenu: [
        { label: 'Join Mailing List', href: 'https://groups.io/g/mnretrotech' },
        { label: 'Join Discord', href: 'https://discord.gg/hF9wh6gPcP' },
        { label: 'Meetup.com', href: 'https://www.meetup.com/' },
        { label: 'Interest Form', href: '/assets/files/MNRTC_Interest_Form_Responses.xlsx' },
      ]
    },
    {
      label: 'Events',
      href: '/events'
    },
    {
      label: 'Blog',
      href: '/blog'
    },
    {
      label: 'Resources',
      href: '/resources'
    },
    {
      label: 'Links',
      href: '/links'
    },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: '#008080',
      borderBottom: '2px solid #000000',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      boxShadow: '0 2px 0 #000000'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {/* Logo */}
        <div style={{
          width: '16px',
          height: '16px',
          background: '#ffffff',
          border: '1px solid #000000',
          marginRight: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          fontWeight: 'bold'
        }}>
          M
        </div>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            style={{ position: 'relative' }}
            onMouseEnter={() => setActiveMenu(item.label)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {item.href ? (
              <Link
                href={item.href}
                style={{
                  height: '20px',
                  padding: '0 8px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontFamily: 'Arial, sans-serif',
                  color: pathname === item.href ? '#000000' : '#ffffff',
                  background: pathname === item.href ? '#ffffff' : 'transparent',
                  textDecoration: 'none',
                  border: pathname === item.href ? '1px solid #000000' : '1px solid transparent',
                  borderBottom: 'none',
                  fontWeight: 'bold',
                }}
              >
                {item.label}
              </Link>
            ) : (
              <button
                style={{
                  height: '20px',
                  padding: '0 8px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontFamily: 'Arial, sans-serif',
                  color: activeMenu === item.label ? '#000000' : '#ffffff',
                  background: activeMenu === item.label ? '#ffffff' : 'transparent',
                  border: activeMenu === item.label ? '1px solid #000000' : '1px solid transparent',
                  borderBottom: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            )}
            
            {/* Dropdown Menu */}
            {item.submenu && activeMenu === item.label && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#ffffff',
                border: '1px solid #000000',
                borderTop: 'none',
                minWidth: '150px',
                zIndex: 1001,
                boxShadow: '2px 2px 0 #000000'
              }}>
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href}
                    style={{
                      display: 'block',
                      padding: '4px 8px',
                      fontSize: '11px',
                      fontFamily: 'Arial, sans-serif',
                      color: '#000000',
                      textDecoration: 'none',
                      borderBottom: subIndex < item.submenu!.length - 1 ? '1px solid #c0c0c0' : 'none',
                    }}
                    target={subItem.href.startsWith('http') ? '_blank' : undefined}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0000ff';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#000000';
                    }}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side - Clock and badges */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a 
          href="https://frogfind.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            background: '#00ff00',
            color: '#000000',
            padding: '1px 4px',
            border: '1px solid #000000',
            fontSize: '9px',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
        >
          🐸 FROGFIND
        </a>
        <div style={{
          background: '#ffff00',
          color: '#000000',
          padding: '1px 4px',
          border: '1px solid #000000',
          fontSize: '9px',
          fontWeight: 'bold'
        }}>
          BEST VIEWED IN IE 4.0
        </div>
        <span style={{
          fontSize: '11px',
          fontFamily: 'Arial, sans-serif',
          color: '#ffffff',
          fontWeight: 'bold'
        }}>
          {new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
