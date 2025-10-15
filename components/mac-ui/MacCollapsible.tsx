'use client';

import React, { useState } from 'react';

interface MacCollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function MacCollapsible({
  title,
  children,
  defaultOpen = false,
}: MacCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 p-3 bg-mac-platinum mac-3d-border hover:bg-mac-platinum-dark transition-colors"
      >
        <span className="font-chicago text-xs">{isOpen ? '▼' : '▶'}</span>
        <span className="font-chicago text-lg flex-1 text-left">{title}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-mac-white mac-3d-border-inset mt-1">
          {children}
        </div>
      )}
    </div>
  );
}

