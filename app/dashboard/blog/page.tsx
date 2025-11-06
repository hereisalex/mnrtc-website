import type { CSSProperties } from "react";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";
import { BlogPostList } from "./_components/BlogPostList";
import { BlogPostForm } from "./_components/BlogPostForm";
import Link from "next/link";

type BlogPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !userHasDashboardAccess(session.user)) {
    redirect("/login?redirectedFrom=/dashboard/blog");
  }

  const mode = typeof searchParams?.mode === "string" ? searchParams.mode : "list";
  const editSlug = typeof searchParams?.slug === "string" ? searchParams.slug : null;

  // Fetch all posts (including unpublished) for admin view
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug, title, date, description, author, tags, published")
    .order("date", { ascending: false });

  if (error) {
    console.error("[Dashboard] Failed to load blog posts", error);
  }

  // If editing, fetch the specific post
  let editPost = null;
  if (editSlug && mode === "edit") {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, date, description, author, tags, content_markdown, published")
      .eq("slug", editSlug)
      .single();
    editPost = data;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>Blog Management</h2>
          <p style={{ margin: "0.35rem 0 0", color: "rgba(226,232,240,0.7)" }}>
            Create, edit, and manage blog posts.
          </p>
        </div>
        {mode === "list" && (
          <Link
            href="/dashboard/blog?mode=new"
            style={newPostButtonStyle}
          >
            + New Post
          </Link>
        )}
        {mode !== "list" && (
          <Link
            href="/dashboard/blog"
            style={newPostButtonStyle}
          >
            ← Back to List
          </Link>
        )}
      </div>

      {mode === "list" && (
        <BlogPostList posts={posts || []} />
      )}

      {(mode === "new" || mode === "edit") && (
        <div style={formContainerStyle}>
          <BlogPostForm
            post={editPost || undefined}
            onSave={() => {}}
            onCancel={() => {}}
          />
        </div>
      )}
    </div>
  );
}

const newPostButtonStyle: CSSProperties = {
  padding: "0.625rem 1.25rem",
  background: "#1d4ed8",
  border: "1px solid #3b82f6",
  borderRadius: "8px",
  color: "#f8fafc",
  fontSize: "0.875rem",
  fontWeight: 600,
  textDecoration: "none",
  cursor: "pointer",
  display: "inline-block",
};

const formContainerStyle: CSSProperties = {
  background: "rgba(15, 23, 42, 0.4)",
  border: "1px solid rgba(148,163,184,0.25)",
  borderRadius: "12px",
  padding: "1.5rem",
};

