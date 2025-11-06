import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";

type LoginPageProps = {
  searchParams: {
    redirectedFrom?: string;
  };
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const redirectedFrom = searchParams.redirectedFrom ?? "/dashboard";
  const hasAccess = session ? userHasDashboardAccess(session.user) : false;

  if (hasAccess) {
    redirect(redirectedFrom);
  }

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
        showUnauthorizedMessage={Boolean(session) && !hasAccess}
      />
    </div>
  );
}


