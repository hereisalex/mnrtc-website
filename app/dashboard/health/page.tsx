import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";
import { HealthStatus } from "./HealthStatus";

const isProduction = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);

export default async function HealthPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !userHasDashboardAccess(session.user)) {
    redirect("/login?redirectedFrom=/dashboard/health");
  }

  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = isProduction ? "https" : "http";
  let initialData = null;

  try {
    const response = await fetch(`${protocol}://${host}/api/health`, {
      cache: "no-store",
    });
    if (response.ok) {
      initialData = await response.json();
    }
  } catch (error) {
    console.error("[Dashboard] Health check fetch failed", error);
  }

  return <HealthStatus initialData={initialData} />;
}


