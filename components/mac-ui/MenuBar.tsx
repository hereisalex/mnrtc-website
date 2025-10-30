'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface MenuItem {
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
}

export default function MenuBar() {
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
        { label: 'Meetup.com', href: 'https://meetup.com' },
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
  ];

  return (
    <div className="mac-menu-bar fixed top-0 left-0 right-0 z-50 bg-mac-platinum border-b border-mac-black">
      <div className="flex items-center h-6 px-2">
        {/* Apple Menu with Logo */}
        <div 
          className="relative flex items-center"
          onMouseEnter={() => setActiveMenu('mnrtc')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="flex items-center h-6 px-1 hover:bg-mac-blue hover:text-mac-white transition-colors">
            <img
              src="/images/full-logo.png"
              alt="MNRTC"
              width={14}
              height={14}
              className="pixelated"
              style={{ imageRendering: 'pixelated' }}
            />
          </button>
          
          {/* Dropdown Menu */}
          {activeMenu === 'mnrtc' && (
            <div className="absolute top-full left-0 bg-mac-platinum border border-mac-black shadow-lg min-w-48 z-50">
              {menuItems[0].submenu?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-3 py-1 text-xs font-geneva hover:bg-mac-blue hover:text-mac-white border-b border-mac-gray last:border-b-0"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex items-center ml-4">
          {menuItems.slice(1).map((item, index) => (
            <div
              key={index}
              className="relative flex items-center"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className={`h-6 px-2 flex items-center text-xs font-geneva transition-colors ${
                    pathname === item.href
                      ? 'bg-mac-blue text-mac-white'
                      : 'hover:bg-mac-blue hover:text-mac-white'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button className="h-6 px-2 flex items-center text-xs font-geneva hover:bg-mac-blue hover:text-mac-white transition-colors">
                  {item.label}
                </button>
              )}
              
              {/* Dropdown Menu */}
              {item.submenu && activeMenu === item.label && (
                <div className="absolute top-full left-0 bg-mac-platinum border border-mac-black shadow-lg min-w-48 z-50">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className="block px-3 py-1 text-xs font-geneva hover:bg-mac-blue hover:text-mac-white border-b border-mac-gray last:border-b-0"
                      target={subItem.href.startsWith('http') ? '_blank' : undefined}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side - Clock */}
        <div className="ml-auto px-2 flex items-center h-6">
          <span className="font-geneva text-xs">
            {new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}