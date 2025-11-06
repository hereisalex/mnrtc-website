import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabaseServer";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirect") ?? "/dashboard";

  if (code) {
    const supabase = createRouteHandlerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerSupabaseClient();
  const requestUrl = new URL(request.url);

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}


