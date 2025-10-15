'use client';

import React, { useState } from 'react';

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  closable?: boolean;
  onClose?: () => void;
  width?: string;
  height?: string;
}

export default function MacWindow({
  title,
  children,
  className = '',
  closable = false,
  onClose,
  width = 'auto',
  height = 'auto',
}: MacWindowProps) {
  const [isActive] = useState(true);

  return (
    <div
      className={`mac-window bg-mac-platinum border-2 border-mac-black shadow-mac-window ${className}`}
      style={{ width, height }}
    >
      {/* Title Bar */}
      <div className="mac-window-title">
        {/* Window Controls */}
        <div className="mac-window-controls">
          {closable && (
            <button
              onClick={onClose}
              className="mac-window-control close"
              aria-label="Close"
            />
          )}
          <div className="mac-window-control minimize" />
          <div className="mac-window-control maximize" />
        </div>

        {/* Title */}
        <div className="flex-1 text-center px-4">
          <span className="text-xs font-geneva text-mac-black font-bold">
            {title}
          </span>
        </div>

        {/* Spacer for alignment */}
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="mac-window-content bg-mac-platinum p-6 overflow-auto" style={{
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 1px,
            rgba(0,0,0,0.03) 1px,
            rgba(0,0,0,0.03) 2px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 1px,
            rgba(0,0,0,0.03) 1px,
            rgba(0,0,0,0.03) 2px
          )
        `
      }}>
        {children}
      </div>

      {/* Resize Handle */}
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-mac-platinum-dark border-t border-l border-mac-border-dark" />
    </div>
  );
}

