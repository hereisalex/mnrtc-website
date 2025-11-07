'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getBrowserSupabaseClient } from '@/lib/supabaseClient';
import { getUserRole, userHasDashboardAccess } from '@/lib/auth';
import type { User } from '@supabase/supabase-js';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getBrowserSupabaseClient();
      if (!supabase) {
        router.push('/login?redirectedFrom=' + encodeURIComponent(pathname || '/dashboard'));
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login?redirectedFrom=' + encodeURIComponent(pathname || '/dashboard'));
        return;
      }

      const access = userHasDashboardAccess(session.user);
      if (!access) {
        router.push('/login?redirectedFrom=' + encodeURIComponent(pathname || '/dashboard') + '&unauthorized=true');
        return;
      }

      setHasAccess(true);
      setIsLoading(false);

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session || !userHasDashboardAccess(session.user)) {
          router.push('/login?redirectedFrom=' + encodeURIComponent(pathname || '/dashboard'));
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top, #1e3a8a 0%, #0b1120 42%, #020617 100%)',
        color: '#f8fafc'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (mounted) {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted) {
          setUser(session?.user ?? null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    const cleanup = initAuth();

    return () => {
      mounted = false;
      cleanup.then(cleanupFn => cleanupFn?.());
    };
  }, []);

  return { user, isLoading, getUserRole: () => getUserRole(user), hasAccess: userHasDashboardAccess(user) };
}

