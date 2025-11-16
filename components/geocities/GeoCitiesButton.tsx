'use client';

import React from 'react';
import Link from 'next/link';

interface GeoCitiesButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'primary' | 'accent';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
  style?: React.CSSProperties;
}

export default function GeoCitiesButton({
  children,
  onClick,
  href,
  variant = 'default',
  className = '',
  disabled = false,
  type = 'button',
  external = false,
  style = {},
}: GeoCitiesButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          background: '#4169e1',
          color: '#ffffff',
          borderColor: '#ffffff #000000 #000000 #ffffff',
        };
      case 'accent':
        return {
          background: '#ff69b4',
          color: '#000000',
          borderColor: '#ffffff #000000 #000000 #ffffff',
        };
      default:
        return {
          background: '#e0e0e0',
          color: '#000000',
          borderColor: '#ffffff #000000 #000000 #ffffff',
        };
    }
  };

  const variantStyle = getVariantStyle();

  const baseStyles: React.CSSProperties = {
    background: variantStyle.background,
    border: '2px solid',
    borderColor: variantStyle.borderColor,
    color: variantStyle.color,
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '3px 8px',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    minWidth: '60px',
    textAlign: 'center',
    boxShadow: `
      inset -1px -1px 0 #ffffff,
      inset 1px 1px 0 #000000,
      1px 1px 0 #000000
    `,
    ...style,
  };

  const buttonContent = (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
      {children}
    </span>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`geocities-button ${className}`}
          style={baseStyles}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.background = '#d0d0d0';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.background = variantStyle.background;
            }
          }}
          onMouseDown={(e) => {
            if (!disabled) {
              e.currentTarget.style.transform = 'translate(1px, 1px)';
              e.currentTarget.style.boxShadow = 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff';
            }
          }}
          onMouseUp={(e) => {
            if (!disabled) {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = `
                inset -1px -1px 0 #ffffff,
                inset 1px 1px 0 #000000,
                1px 1px 0 #000000
              `;
            }
          }}
        >
          {buttonContent}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={`geocities-button ${className}`}
        style={baseStyles}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = '#d0d0d0';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = variantStyle.background;
          }
        }}
        onMouseDown={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'translate(1px, 1px)';
            e.currentTarget.style.boxShadow = 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff';
          }
        }}
        onMouseUp={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = `
              inset -1px -1px 0 #ffffff,
              inset 1px 1px 0 #000000,
              1px 1px 0 #000000
            `;
          }
        }}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`geocities-button ${className}`}
      style={baseStyles}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = '#d0d0d0';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = variantStyle.background;
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translate(1px, 1px)';
          e.currentTarget.style.boxShadow = 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = `
            inset -1px -1px 0 #ffffff,
            inset 1px 1px 0 #000000,
            1px 1px 0 #000000
          `;
        }
      }}
    >
      {buttonContent}
    </button>
  );
}
