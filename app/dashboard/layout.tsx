import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { getUserRole, userHasDashboardAccess } from "@/lib/auth";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { DashboardNav } from "./_components/DashboardNav";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !userHasDashboardAccess(session.user)) {
    redirect("/login?redirectedFrom=/dashboard");
  }

  const userEmail = session.user.email ?? "unknown user";
  const role = getUserRole(session.user);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1e3a8a 0%, #0b1120 42%, #020617 100%)",
        color: "#f8fafc",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 2.5rem 3rem" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            gap: "1.5rem",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>MN Retro Tech Dashboard</h1>
            <p style={{ margin: "0.4rem 0 0", color: "rgba(226,232,240,0.8)" }}>
              Signed in as {userEmail}
              {role ? ` · ${role}` : null}
            </p>
          </div>
          <SignOutButton />
        </header>

        <DashboardNav />

        <section
          style={{
            background: "rgba(15, 23, 42, 0.75)",
            borderRadius: "16px",
            border: "1px solid rgba(148, 163, 184, 0.35)",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.45)",
            padding: "2rem",
            backdropFilter: "blur(16px)",
          }}
        >
          {children}
        </section>
      </div>
    </div>
  );
}


