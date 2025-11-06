import type { User } from '@supabase/supabase-js';

export const DASHBOARD_ALLOWED_ROLES = ['admin', 'developer'] as const;

export type DashboardRole = (typeof DASHBOARD_ALLOWED_ROLES)[number];

export const getUserRole = (user: User | null): string | undefined => {
  if (!user) {
    return undefined;
  }

  return (
    (user.app_metadata?.role as string | undefined) ??
    (user.user_metadata?.role as string | undefined)
  );
};

export const userHasDashboardAccess = (user: User | null): boolean => {
  const role = getUserRole(user);
  return role ? DASHBOARD_ALLOWED_ROLES.includes(role as DashboardRole) : false;
};


