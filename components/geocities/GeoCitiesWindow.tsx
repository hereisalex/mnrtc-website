'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface GeoCitiesWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  closable?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
  showHomeButton?: boolean;
  onHome?: () => void;
}

export default function GeoCitiesWindow({
  title,
  children,
  className = '',
  width = '300px',
  height = '200px',
  closable = false,
  onClose,
  style = {},
  showHomeButton = true,
  onHome,
}: GeoCitiesWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const windowStyle: React.CSSProperties = {
    position: 'relative',
    width,
    height: isMinimized ? '22px' : height,
    ...style,
  };

  return (
    <div
      className={`geocities-window ${className}`}
      style={windowStyle}
    >
      {/* Title Bar */}
      <div className="geocities-window-title">
        {/* Window Controls */}
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          {showHomeButton && (
            <Link href="/">
              <button
                style={{
                  width: '12px',
                  height: '12px',
                  background: '#0080ff',
                  border: '1px solid #000',
                  cursor: 'pointer',
                  fontSize: '8px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Home"
                title="Go to Homepage"
              >
                🏠
              </button>
            </Link>
          )}
          {closable && (
            <button
              onClick={onClose}
              style={{
                width: '12px',
                height: '12px',
                background: '#ff0000',
                border: '1px solid #000',
                cursor: 'pointer',
                fontSize: '8px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close"
            >
              ×
            </button>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              width: '12px',
              height: '12px',
              background: '#ffff00',
              border: '1px solid #000',
              cursor: 'pointer',
              fontSize: '8px',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Minimize"
          >
            −
          </button>
          <div
            style={{
              width: '12px',
              height: '12px',
              background: '#00ff00',
              border: '1px solid #000',
            }}
          />
        </div>

        {/* Title */}
        <div style={{ flex: 1, textAlign: 'center', padding: '0 8px' }}>
          <span style={{ 
            fontSize: '11px', 
            fontFamily: 'Times New Roman, Times, serif', 
            color: '#ffffff', 
            fontWeight: 'bold',
            textShadow: '1px 1px 0 #000'
          }}>
            {title}
          </span>
        </div>

        {/* Spacer for alignment */}
        <div style={{ width: '40px' }} />
      </div>

      {/* Window Content */}
      {!isMinimized && (
        <div 
          className="geocities-window-content"
          style={{
            background: '#ffffff',
            padding: '8px',
            overflow: 'auto',
            height: 'calc(100% - 22px)',
            border: '1px solid #000',
            borderTop: 'none',
          }}
        >
          {children}
        </div>
      )}

    </div>
  );
}
