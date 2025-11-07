'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";
import { BlogPostList } from "./_components/BlogPostList";
import { BlogPostForm } from "./_components/BlogPostForm";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  content_markdown?: string;
  published: boolean;
}

export default function BlogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "list";
  const editSlug = searchParams.get("slug");
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const supabase = getBrowserSupabaseClient();
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch all posts (including unpublished) for admin view
        const { data: postsData, error: postsError } = await supabase
          .from("blog_posts")
          .select("slug, title, date, description, author, tags, published")
          .order("date", { ascending: false });

        if (postsError) {
          console.error("[Dashboard] Failed to load blog posts", postsError);
        } else {
          setPosts(postsData || []);
        }

        // If editing, fetch the specific post
        if (editSlug && mode === "edit") {
          const { data: postData, error: postError } = await supabase
            .from("blog_posts")
            .select("slug, title, date, description, author, tags, content_markdown, published")
            .eq("slug", editSlug)
            .single();

          if (!postError && postData) {
            setEditPost(postData);
          }
        }
      } catch (error) {
        console.error("[Dashboard] Error loading data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [mode, editSlug]);

  const handleRefresh = () => {
    router.refresh();
    // Reload data
    const supabase = getBrowserSupabaseClient();
    if (supabase) {
      supabase
        .from("blog_posts")
        .select("slug, title, date, description, author, tags, published")
        .order("date", { ascending: false })
        .then(({ data }) => {
          if (data) setPosts(data);
        });
    }
  };

  if (isLoading) {
    return <div style={{ color: 'rgba(226,232,240,0.7)' }}>Loading...</div>;
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
        <BlogPostList posts={posts} />
      )}

      {(mode === "new" || mode === "edit") && (
        <div style={formContainerStyle}>
          <BlogPostForm
            post={editPost || undefined}
            onSave={handleRefresh}
            onCancel={() => router.push('/dashboard/blog')}
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

