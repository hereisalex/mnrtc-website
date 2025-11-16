'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={copyButtonStyle}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  );
}

const copyButtonStyle: CSSProperties = {
  padding: '0.4rem 0.75rem',
  borderRadius: '6px',
  border: '1px solid rgba(148,163,184,0.35)',
  background: 'rgba(30,41,59,0.8)',
  color: '#e2e8f0',
  fontSize: '0.8rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontFamily: 'Times New Roman, Times, serif',
};

