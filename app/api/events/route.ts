import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const includeUnpublished = session && userHasDashboardAccess(session.user);

    let query = supabase
      .from("events")
      .select("id, title, date, time, location, description, status, published")
      .order("date", { ascending: false });

    if (!includeUnpublished) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ events: data || [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !userHasDashboardAccess(session.user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      date,
      time,
      location,
      description,
      status = "upcoming",
      published = true,
    } = body;

    if (!title || !date) {
      return NextResponse.json(
        { error: "Missing required fields: title, date" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("events")
      .insert({
        title,
        date: new Date(date).toISOString().split('T')[0], // Store as date only
        time: time || "",
        location: location || "",
        description: description || "",
        status: status || "upcoming",
        published,
        created_by: session.user.id,
        updated_by: session.user.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ event: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

