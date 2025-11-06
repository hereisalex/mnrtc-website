import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { userHasDashboardAccess } from "@/lib/auth";
import { BlogPostForm } from "./_components/BlogPostForm";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !userHasDashboardAccess(session.user)) {
    redirect("/login?redirectedFrom=/dashboard/blog");
  }

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("slug, title, date, description, author, tags, content_markdown, published")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    redirect("/dashboard/blog");
  }

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>Edit Blog Post</h2>
        <p style={{ margin: "0.35rem 0 0", color: "rgba(226,232,240,0.7)" }}>
          Update blog post: {post.title}
        </p>
      </div>

      <div style={{
        background: "rgba(15, 23, 42, 0.4)",
        border: "1px solid rgba(148,163,184,0.25)",
        borderRadius: "12px",
        padding: "1.5rem",
      }}>
        <BlogPostForm
          post={post}
          onSave={() => {}}
          onCancel={() => {}}
        />
      </div>
    </div>
  );
}

