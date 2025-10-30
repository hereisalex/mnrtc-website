'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
// API-based visitor counter functions

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
        // If Supabase is configured, use global persistent counter via append-only table
        if (supabase) {
          const sessionKey = 'mnrtc_visited';
          const hasVisited = sessionStorage.getItem(sessionKey);

          // Insert one visit per session
          if (!hasVisited) {
            const { error: insertError } = await supabase.from('site_visits').insert({});
            if (!insertError) {
              sessionStorage.setItem(sessionKey, 'true');
            }
          }

          // Fetch exact count
          const { count: visitsCount, error: countError } = await supabase
            .from('site_visits')
            .select('*', { count: 'exact', head: true });
          if (countError) throw countError;
          setCount(typeof visitsCount === 'number' ? visitsCount : 0);
          setError(null);
          return;
        }

        // Fallback: localStorage-based counter
        const storedCount = localStorage.getItem('mnrtc_visitor_count');
        const hasVisited = sessionStorage.getItem('mnrtc_visited');
        if (!hasVisited) {
          const currentCount = storedCount ? parseInt(storedCount) : 1000;
          const newCount = currentCount + 1;
          localStorage.setItem('mnrtc_visitor_count', newCount.toString());
          sessionStorage.setItem('mnrtc_visited', 'true');
          setCount(newCount);
        } else {
          const currentCount = storedCount ? parseInt(storedCount) : 1000;
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
          fontSize: '16px', 
          fontWeight: 'bold', 
          color: '#ff0000',
          marginBottom: '3px',
          fontFamily: 'Courier New, monospace'
        }}>
          {isLoading ? '------' : error ? 'ERROR' : formatCount(count || 0)}
        </div>
        <div style={{ 
          fontSize: '8px', 
          fontWeight: 'bold',
          color: '#000000',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.2'
        }}>
          {error ? 'Our counter is having a midlife crisis' : 'visitors since 1995!'}
        </div>
        {!isLoading && !error && (
          <div style={{ 
            fontSize: '6px', 
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
