'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginForm } from "./login-form";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";
import { userHasDashboardAccess } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getBrowserSupabaseClient();
      if (!supabase) {
        setIsChecking(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      const redirectedFrom = searchParams.get('redirectedFrom') || '/dashboard';
      const unauthorized = searchParams.get('unauthorized') === 'true';

      if (session && userHasDashboardAccess(session.user)) {
        router.push(redirectedFrom);
        return;
      }

      if (session && !userHasDashboardAccess(session.user)) {
        setShowUnauthorized(true);
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router, searchParams]);

  if (isChecking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at top, #1e3a8a 0%, #0b1120 42%, #020617 100%)',
          padding: '2rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f8fafc'
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  const redirectedFrom = searchParams.get('redirectedFrom') || '/dashboard';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #1e3a8a 0%, #0b1120 42%, #020617 100%)',
        padding: '2rem 1rem',
      }}
    >
      <LoginForm
        redirectPath={redirectedFrom}
        showUnauthorizedMessage={showUnauthorized}
      />
    </div>
  );
}


