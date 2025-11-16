'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserSupabaseClient } from '@/lib/supabaseClient';

type LoginFormProps = {
  redirectPath?: string;
  showUnauthorizedMessage?: boolean;
};

export function LoginForm({ redirectPath = '/dashboard', showUnauthorizedMessage = false }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setErrorMessage('Supabase client unavailable. Please verify environment variables.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unexpected error during sign in. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setErrorMessage('Supabase client unavailable. Please verify environment variables.');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setEmail('');
      setPassword('');
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unexpected error during sign out. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '4rem auto',
        padding: '2rem',
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(148, 163, 184, 0.3)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      }}
    >
      <h1
        style={{
          fontFamily: 'Times New Roman, Times, serif',
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#f8fafc',
        }}
      >
        Admin Login
      </h1>

      {showUnauthorizedMessage && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(248, 113, 113, 0.5)',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '8px',
          }}
        >
          <p style={{ margin: 0, color: '#fecaca', fontSize: '0.9rem' }}>
            Your account does not have developer dashboard access. Please contact an administrator.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            style={{
              marginTop: '0.75rem',
              width: '100%',
              padding: '0.5rem',
              background: 'rgba(239, 68, 68, 0.3)',
              border: '1px solid rgba(248, 113, 113, 0.5)',
              borderRadius: '6px',
              color: '#fecaca',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            disabled={submitting}
          >
            Sign out
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <span
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#e2e8f0',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            style={{
              width: '100%',
              padding: '0.65rem 0.75rem',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            disabled={submitting}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1.25rem' }}>
          <span
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#e2e8f0',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            style={{
              width: '100%',
              padding: '0.65rem 0.75rem',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
            disabled={submitting}
          />
        </label>

        {errorMessage && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(248, 113, 113, 0.5)',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
          >
            <p style={{ margin: 0, color: '#fecaca', fontSize: '0.9rem' }}>
              {errorMessage}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: submitting ? 'rgba(59, 130, 246, 0.5)' : '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: submitting ? 'wait' : 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}


