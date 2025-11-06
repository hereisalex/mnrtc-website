'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserSupabaseClient } from '@/lib/supabaseClient';

type SignOutButtonProps = {
  className?: string;
};

export function SignOutButton({ className }: SignOutButtonProps) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setError('Supabase client unavailable.');
      return;
    }

    setSigningOut(true);
    setError(null);

    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError(signOutError.message);
        return;
      }

      router.push('/login');
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Unexpected error during sign out.'
      );
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className={className}>
      <button type="button" onClick={handleSignOut} disabled={signingOut}>
        {signingOut ? 'Signing out…' : 'Sign out'}
      </button>
      {error && (
        <p style={{ marginTop: '0.5rem', color: '#ffbaba' }}>
          {error}
        </p>
      )}
    </div>
  );
}


