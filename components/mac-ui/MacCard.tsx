import React from 'react';

interface MacCardProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}

export default function MacCard({
  children,
  className = '',
  inset = false,
}: MacCardProps) {
  return (
    <div
      className={`
        bg-mac-platinum p-4
        ${inset ? 'mac-3d-border-inset' : 'mac-3d-border'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

