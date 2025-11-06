'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/telemetry';

/**
 * Client component that tracks page views automatically.
 * Place this in the root layout or a client component that wraps your pages.
 */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    // Small delay to ensure page is fully loaded
    const timeoutId = setTimeout(() => {
      trackPageView(pathname);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null;
}

