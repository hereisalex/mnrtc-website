'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface GeoCitiesWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  x?: number;
  y?: number;
  closable?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
  draggable?: boolean;
  resizable?: boolean;
  showHomeButton?: boolean;
  onHome?: () => void;
}

export default function GeoCitiesWindow({
  title,
  children,
  className = '',
  width = '300px',
  height = '200px',
  x = 0,
  y = 0,
  closable = false,
  onClose,
  style = {},
  draggable = true,
  resizable = true,
  showHomeButton = true,
  onHome,
}: GeoCitiesWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [size, setSize] = useState({ 
    width: parseInt(width), 
    height: parseInt(height) 
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);

  // Mouse event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Keep window within viewport bounds
      const maxX = window.innerWidth - size.width;
      const maxY = window.innerHeight - (isMinimized ? 22 : size.height);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    } else if (isResizing) {
      const newWidth = resizeStart.width + (e.clientX - resizeStart.x);
      const newHeight = resizeStart.height + (e.clientY - resizeStart.y);
      
      setSize({
        width: Math.max(200, newWidth),
        height: Math.max(100, newHeight),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent) => {
    if (!resizable) return;
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart]);

  const windowStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${size.width}px`,
    height: isMinimized ? '22px' : `${size.height}px`,
    left: position.x,
    top: position.y,
    cursor: isDragging ? 'grabbing' : 'default',
    zIndex: isDragging || isResizing ? 1000 : 'auto',
    ...style,
  };

  return (
    <div
      ref={windowRef}
      className={`geocities-window ${className}`}
      style={windowStyle}
    >
      {/* Title Bar */}
      <div 
        className="geocities-window-title"
        onMouseDown={handleMouseDown}
        style={{ 
          cursor: draggable ? 'grab' : 'default',
          userSelect: 'none'
        }}
      >
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
            fontFamily: 'Arial, sans-serif', 
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

      {/* Resize Handle */}
      {resizable && !isMinimized && (
        <div
          onMouseDown={handleResizeStart}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '12px',
            height: '12px',
            background: '#c0c0c0',
            border: '1px solid #000',
            borderBottom: 'none',
            borderRight: 'none',
            cursor: 'nw-resize',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
