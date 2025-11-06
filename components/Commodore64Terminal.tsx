'use client';

import { useState, useEffect } from 'react';
import './Commodore64Terminal.css';

interface TypingTerminalProps {
  lines: string[];
  typingSpeed?: number;
  lineDelay?: number;
}

export function Commodore64Terminal({ lines, typingSpeed = 50, lineDelay = 500 }: TypingTerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = lines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Line complete, move to next line
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay);

      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, lineDelay]);

  const currentLine = lines[currentLineIndex] || '';
  const currentDisplay = currentLine.substring(0, currentCharIndex);

  return (
    <div style={terminalContainerStyle}>
      <div style={terminalStyle}>
        {/* Header */}
        <div style={headerStyle}>
          **** COMMODORE 64 BASIC V2 ****
        </div>
        <div style={systemInfoStyle}>
          64K RAM SYSTEM 38911 BASIC BYTES FREE
        </div>
        
        {/* Displayed lines */}
        {displayedLines.map((line, index) => (
          <div key={index} style={lineStyle}>
            {line}
          </div>
        ))}
        
        {/* Current typing line */}
        {isTyping && currentLineIndex < lines.length && (
          <div style={lineStyle}>
            {currentDisplay}
            <span className="c64-cursor">█</span>
          </div>
        )}
        
        {/* Show cursor after all lines are typed */}
        {!isTyping && (
          <div style={lineStyle}>
            <span className="c64-cursor">█</span>
          </div>
        )}
      </div>
    </div>
  );
}

const terminalContainerStyle: React.CSSProperties = {
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
};

const terminalStyle: React.CSSProperties = {
  background: '#352879', // Commodore 64 blue
  color: '#6c5ce7', // Light blue text
  fontFamily: 'monospace, "Courier New", Courier',
  fontSize: '17px',
  lineHeight: '1.5',
  padding: '15px',
  border: '3px solid #1a1a2e',
  borderRadius: '4px',
  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)',
  minWidth: '100%',
  maxWidth: '600px',
  textShadow: '0 0 2px rgba(108, 92, 231, 0.5)',
  // Pixelated rendering for retro feel
  imageRendering: 'pixelated',
  fontSmooth: 'never',
  WebkitFontSmoothing: 'none',
  letterSpacing: '0.5px',
  height: '220px', // Fixed height to prevent expansion during animation
  overflow: 'hidden', // Prevent scrolling
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#6c5ce7',
  letterSpacing: '1px',
  fontSize: '16px',
};

const systemInfoStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '12px',
  color: '#6c5ce7',
  fontSize: '14px',
  opacity: 0.9,
};

const lineStyle: React.CSSProperties = {
  marginBottom: '2px',
  whiteSpace: 'pre',
  fontFamily: 'monospace, "Courier New", Courier',
  minHeight: '21px',
};

