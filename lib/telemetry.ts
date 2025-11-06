/**
 * Client-side telemetry utilities for tracking page views and errors.
 * These functions send data to the Next.js API routes which persist to Supabase.
 */

type TelemetryOptions = {
  sessionId?: string | null;
};

let sessionId: string | null = null;

const getOrCreateSessionId = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (sessionId) {
    return sessionId;
  }

  // Try to get from sessionStorage
  const stored = sessionStorage.getItem('telemetry_session_id');
  if (stored) {
    sessionId = stored;
    return stored;
  }

  // Generate a new UUID v4
  const newId = crypto.randomUUID();
  sessionId = newId;
  sessionStorage.setItem('telemetry_session_id', newId);
  return newId;
};

/**
 * Track a page view. Automatically throttled to avoid excessive requests.
 */
let lastTrackTime = 0;
const TRACK_THROTTLE_MS = 2000; // Minimum 2 seconds between tracks

export const trackPageView = async (
  path: string,
  options?: TelemetryOptions
): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  const now = Date.now();
  if (now - lastTrackTime < TRACK_THROTTLE_MS) {
    return;
  }
  lastTrackTime = now;

  const payload = {
    path,
    referrer: document.referrer || null,
    sessionId: options?.sessionId ?? getOrCreateSessionId(),
    userAgent: navigator.userAgent || null,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch('/api/telemetry/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn('[Telemetry] Failed to track page view:', response.status);
    }
  } catch (error) {
    // Silently fail - telemetry should not break the app
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Telemetry] Error tracking page view:', error);
    }
  }
};

type ErrorLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

type LogErrorOptions = {
  level?: ErrorLevel;
  stack?: string | null;
  context?: Record<string, unknown> | null;
  source?: string | null;
};

/**
 * Log an error or warning to the dashboard.
 * Useful for capturing runtime errors that don't crash the app.
 */
export const logError = async (
  message: string,
  options?: LogErrorOptions
): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = {
    message,
    level: options?.level ?? 'error',
    stack: options?.stack ?? null,
    context: options?.context ?? null,
    source: options?.source ?? null,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch('/api/telemetry/log-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn('[Telemetry] Failed to log error:', response.status);
    }
  } catch (error) {
    // Silently fail - telemetry should not break the app
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Telemetry] Error logging error:', error);
    }
  }
};

