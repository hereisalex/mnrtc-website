'use client';

import React, { useState, useEffect } from 'react';
import { getBrowserSupabaseClient } from '@/lib/supabaseClient';
// API-based visitor counter functions

interface VisitorCounterProps {
  className?: string;
  style?: React.CSSProperties;
}

const describeError = (err: unknown): string => {
  if (err instanceof Error) return `${err.name}: ${err.message}`;
  if (typeof err === 'string') return err;
  try {
    return JSON.stringify(err);
  } catch {
    return 'Unknown error';
  }
};

export default function VisitorCounter({ className = '', style = {} }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fallbackCount = () => {
      const storedCount = localStorage.getItem('mnrtc_visitor_count');
      const hasVisited = sessionStorage.getItem('mnrtc_visited');
      const current = storedCount ? parseInt(storedCount, 10) : 1000;

      if (!hasVisited) {
        const next = current + 1;
        localStorage.setItem('mnrtc_visitor_count', next.toString());
        sessionStorage.setItem('mnrtc_visited', 'true');
        return next;
      }

      return current;
    };

    const updateVisitorCount = async () => {
      setIsLoading(true);

      const supabase = getBrowserSupabaseClient();

      if (!supabase) {
        setCount(fallbackCount());
        setError(null);
        setIsLoading(false);
        return;
      }

      try {
        const sessionKey = 'mnrtc_visited';
        const hasVisited = sessionStorage.getItem(sessionKey);

        if (!hasVisited) {
          const { error: insertError } = await supabase.from('site_visits').insert({});
          if (insertError) {
            throw new Error(`Supabase insert failed: ${describeError(insertError)}`);
          }
          sessionStorage.setItem(sessionKey, 'true');
        }

        const { count: visitsCount, error: countError } = await supabase
          .from('site_visits')
          .select('*', { count: 'exact', head: true });
        if (countError) {
          throw new Error(`Supabase count failed: ${describeError(countError)}`);
        }

        const numericCount = typeof visitsCount === 'number' ? visitsCount : 0;
        setCount(numericCount);
        setError(null);
      } catch (err) {
        const detail = describeError(err);
        console.error('[VisitorCounter] Failed to update visitor count:', detail, err);
        setError(`Visitor counter offline: ${detail}`);
        setCount(fallbackCount());
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
          marginBottom: '3px',
          fontFamily: 'Courier New, monospace'
        }}>
          {isLoading ? '------' : error ? 'ERROR' : formatCount(count || 0)}
        </div>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: 'bold',
          color: '#000000',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.2'
        }}>
          {error ? 'Visitor counter offline — check console' : 'visitors since 1995!'}
        </div>
        {!isLoading && error && (
          <div style={{ 
            fontSize: '10px',
            color: '#cc0000',
            marginTop: '2px',
            fontFamily: 'Arial, sans-serif'
          }}>
            {error}
          </div>
        )}
        {!isLoading && !error && (
          <div style={{ 
            fontSize: '10px', 
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
