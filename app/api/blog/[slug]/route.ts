import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";
import { marked } from "marked";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const includeUnpublished = session && userHasDashboardAccess(session.user);

    let query = supabase
      .from("blog_posts")
      .select("slug, title, date, description, author, tags, content, content_markdown, published")
      .eq("slug", slug)
      .single();

    if (!includeUnpublished) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error || !data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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
      description,
      author,
      tags,
      content_markdown,
      published,
    } = body;

    const updateData: Record<string, unknown> = {
      updated_by: session.user.id,
    };

    if (title !== undefined) updateData.title = title;
    if (date !== undefined) updateData.date = new Date(date).toISOString();
    if (description !== undefined) updateData.description = description;
    if (author !== undefined) updateData.author = author;
    if (tags !== undefined) updateData.tags = tags;
    if (published !== undefined) updateData.published = published;
    if (content_markdown !== undefined) {
      updateData.content_markdown = content_markdown;
      updateData.content = marked(content_markdown) as string;
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !userHasDashboardAccess(session.user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("slug", slug);

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

