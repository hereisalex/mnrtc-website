/**
 * Client-side telemetry utilities for tracking page views and errors.
 * These functions write directly to Supabase (for static export compatibility).
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
    // Use dynamic import to avoid SSR issues
    const { getBrowserSupabaseClient } = await import('@/lib/supabaseClient');
    const supabase = getBrowserSupabaseClient();
    
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Telemetry] Supabase client not available');
      }
      return;
    }

    const isUuidV4 = (value: string): boolean => {
      const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidV4.test(value);
    };

    const sanitizePath = (path: string): string => {
      if (!path.startsWith('/')) {
        return `/${path}`;
      }
      return path.slice(0, 512);
    };

    const record = {
      path: sanitizePath(payload.path),
      referrer: payload.referrer ? payload.referrer.slice(0, 512) : null,
      session_id: payload.sessionId && isUuidV4(payload.sessionId) ? payload.sessionId : null,
      user_agent: payload.userAgent?.slice(0, 512) ?? null,
      created_at: payload.timestamp ? new Date(payload.timestamp).toISOString() : undefined,
    };

    const { error } = await supabase.from('page_views').insert(record);
    
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Telemetry] Failed to track page view:', error);
      }
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
    // Use dynamic import to avoid SSR issues
    const { getBrowserSupabaseClient } = await import('@/lib/supabaseClient');
    const supabase = getBrowserSupabaseClient();
    
    if (!supabase) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Telemetry] Supabase client not available');
      }
      return;
    }

    const ACCEPTED_LEVELS = new Set(['debug', 'info', 'warn', 'error', 'fatal']);
    const sanitizeLevel = (level?: string): string => {
      if (!level) return 'error';
      const normalized = level.toLowerCase();
      return ACCEPTED_LEVELS.has(normalized) ? normalized : 'error';
    };

    const record = {
      message: payload.message.slice(0, 2000),
      level: sanitizeLevel(payload.level),
      stack: payload.stack?.slice(0, 8000) ?? null,
      context: payload.context ?? {},
      source: payload.source?.slice(0, 512) ?? null,
      created_at: payload.timestamp ? new Date(payload.timestamp).toISOString() : undefined,
    };

    const { error } = await supabase.from('error_logs').insert(record);
    
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Telemetry] Failed to log error:', error);
      }
    }
  } catch (error) {
    // Silently fail - telemetry should not break the app
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Telemetry] Error logging error:', error);
    }
  }
};

