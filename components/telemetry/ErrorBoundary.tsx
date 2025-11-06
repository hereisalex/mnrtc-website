'use client';

import React, { Component, type ReactNode } from 'react';
import { logError } from '@/lib/telemetry';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * React Error Boundary that logs errors to the dashboard.
 * Wrap your app or specific sections with this component.
 */
export class TelemetryErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error.message, {
      level: 'error',
      stack: error.stack ?? null,
      context: {
        componentStack: errorInfo.componentStack,
      },
      source: 'ErrorBoundary',
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#f8fafc',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.3)',
            borderRadius: '8px',
            margin: '2rem auto',
            maxWidth: '600px',
          }}
        >
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem' }}>Something went wrong</h2>
          <p style={{ margin: 0, color: 'rgba(226, 232, 240, 0.8)' }}>
            An error occurred and has been logged. Please refresh the page.
          </p>
          {this.state.error && process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '1rem', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>Error details</summary>
              <pre
                style={{
                  padding: '0.75rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  overflow: 'auto',
                }}
              >
                {this.state.error.toString()}
                {this.state.error.stack && `\n\n${this.state.error.stack}`}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

