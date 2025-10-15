'use client';

import React from 'react';
import Link from 'next/link';

interface MacButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'primary';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
}

export default function MacButton({
  children,
  onClick,
  href,
  variant = 'default',
  className = '',
  disabled = false,
  type = 'button',
  external = false,
}: MacButtonProps) {
  const baseStyles = `
    mac-button px-4 py-2 font-geneva text-sm
    border-2 bg-mac-platinum
    transition-all duration-75
    min-w-24
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${
      variant === 'primary'
        ? 'border-mac-black font-bold bg-mac-platinum text-mac-black'
        : 'bg-mac-platinum text-mac-black'
    }
  `;

  const activeStyles = !disabled
    ? `
    hover:bg-mac-platinum-dark active:bg-mac-gray
  `
    : '';

  const buttonContent = (
    <span className="flex items-center justify-center gap-2">{children}</span>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseStyles} ${activeStyles} ${className} inline-flex items-center`}
        >
          {buttonContent}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={`${baseStyles} ${activeStyles} ${className} inline-flex items-center`}
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
      className={`${baseStyles} ${activeStyles} ${className}`}
    >
      {buttonContent}
    </button>
  );
}

