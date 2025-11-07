'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";
import { BlogPostForm } from "../_components/BlogPostForm";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  content_markdown: string;
  published: boolean;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      const supabase = getBrowserSupabaseClient();
      if (!supabase || !slug) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: postData, error } = await supabase
          .from("blog_posts")
          .select("slug, title, date, description, author, tags, content_markdown, published")
          .eq("slug", slug)
          .single();

        if (error || !postData) {
          router.push("/dashboard/blog");
          return;
        }

        setPost(postData);
      } catch (error) {
        console.error("[Dashboard] Error loading post", error);
        router.push("/dashboard/blog");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug, router]);

  if (isLoading) {
    return <div style={{ color: 'rgba(226,232,240,0.7)' }}>Loading...</div>;
  }

  if (!post) {
    return null;
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
          onSave={() => router.push('/dashboard/blog')}
          onCancel={() => router.push('/dashboard/blog')}
        />
      </div>
    </div>
  );
}

