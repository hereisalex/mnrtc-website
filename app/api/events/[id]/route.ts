import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const includeUnpublished = session && userHasDashboardAccess(session.user);

    let query = supabase
      .from("events")
      .select("id, title, date, time, location, description, status, published")
      .eq("id", id)
      .single();

    if (!includeUnpublished) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error || !data) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      status,
      published,
    } = body;

    const updateData: Record<string, unknown> = {
      updated_by: session.user.id,
    };

    if (title !== undefined) updateData.title = title;
    if (date !== undefined) updateData.date = new Date(date).toISOString().split('T')[0];
    if (time !== undefined) updateData.time = time;
    if (location !== undefined) updateData.location = location;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (published !== undefined) updateData.published = published;

    const { data, error } = await supabase
      .from("events")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !userHasDashboardAccess(session.user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

