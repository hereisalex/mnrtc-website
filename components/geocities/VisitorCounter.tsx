'use client';

import React, { useState, useEffect } from 'react';
import { incrementVisitorCount, getCurrentCount } from '@/lib/github-counter';

interface VisitorCounterProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function VisitorCounter({ className = '', style = {} }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateVisitorCount = async () => {
      try {
        setIsLoading(true);
        
        // Check if this is the first visit in this session
        const hasVisited = sessionStorage.getItem('mnrtc_visited');
        
        if (!hasVisited) {
          // First visit in this session - increment the counter
          const newCount = await incrementVisitorCount();
          setCount(newCount);
          sessionStorage.setItem('mnrtc_visited', 'true');
        } else {
          // Not first visit - just get current count
          const currentCount = await getCurrentCount();
          setCount(currentCount);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to update visitor count:', err);
        setError('Our counter is having a midlife crisis');
        
        // Don't show fallback data - show error instead
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    updateVisitorCount();
  }, []);

  const formatCount = (num: number): string => {
    return num.toString().padStart(6, '0');
  };

  return (
    <div className={className} style={style}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#ff0000',
          marginBottom: '5px',
          fontFamily: 'Courier New, monospace'
        }}>
          {isLoading ? '------' : error ? 'ERROR' : formatCount(count || 0)}
        </div>
        <div style={{ 
          fontSize: '9px', 
          fontWeight: 'bold',
          color: '#000000',
          fontFamily: 'Arial, sans-serif'
        }}>
          {error ? 'Our counter is having a midlife crisis' : 'visitors since 1995!'}
        </div>
        {!isLoading && !error && (
          <div style={{ 
            fontSize: '7px', 
            color: '#666666',
            marginTop: '2px',
            fontFamily: 'Arial, sans-serif'
          }}>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
