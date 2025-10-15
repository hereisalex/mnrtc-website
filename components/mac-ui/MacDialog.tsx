'use client';

import React from 'react';
import MacButton from './MacButton';

interface MacDialogProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  actions?: React.ReactNode;
}

export default function MacDialog({
  title,
  children,
  isOpen,
  onClose,
  actions,
}: MacDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-mac-platinum border-2 border-mac-black shadow-mac-window max-w-lg w-full mx-4">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-2 py-1 border-b border-mac-black bg-gradient-to-r from-mac-gray-dark via-mac-gray to-mac-platinum">
          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              className="w-3 h-3 bg-mac-platinum border border-mac-black hover:bg-mac-gray-dark"
              aria-label="Close"
            />
          </div>
          <span className="text-xs font-chicago text-mac-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
            {title}
          </span>
          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">{children}</div>
          {actions && <div className="flex justify-end gap-2">{actions}</div>}
          {!actions && (
            <div className="flex justify-end">
              <MacButton onClick={onClose} variant="primary">
                OK
              </MacButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

