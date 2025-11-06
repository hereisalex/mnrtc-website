import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";
import { marked } from "marked";

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const includeUnpublished = session && userHasDashboardAccess(session.user);

    let query = supabase
      .from("blog_posts")
      .select("slug, title, date, description, author, tags, content, content_markdown, published")
      .order("date", { ascending: false });

    if (!includeUnpublished) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts: data || [] });
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
      slug,
      title,
      date,
      description,
      author,
      tags,
      content_markdown,
      published = true,
    } = body;

    if (!slug || !title || !content_markdown) {
      return NextResponse.json(
        { error: "Missing required fields: slug, title, content_markdown" },
        { status: 400 }
      );
    }

    // Generate HTML from markdown
    const content = marked(content_markdown) as string;

    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        slug,
        title,
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
        description: description || "",
        author: author || "MNRTC",
        tags: tags || [],
        content,
        content_markdown,
        published,
        created_by: session.user.id,
        updated_by: session.user.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

