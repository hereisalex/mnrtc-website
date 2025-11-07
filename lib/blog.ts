import { createServerSupabaseClient, createPublicSupabaseClient } from './supabaseServer';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags?: string[];
  content: string;
}

interface BlogPostRow {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[] | null;
  content: string;
  content_markdown: string;
  published: boolean;
}

function transformPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    description: row.description,
    author: row.author,
    tags: row.tags || [],
    content: row.content || marked(row.content_markdown) as string,
  };
}

export async function getAllPosts(includeUnpublished: boolean = false): Promise<BlogPost[]> {
  try {
    // Use public client for static generation (no cookies), or server client for authenticated requests
    const supabase = includeUnpublished 
      ? createServerSupabaseClient() 
      : (createPublicSupabaseClient() || createServerSupabaseClient());
    
    if (!supabase) {
      console.warn('Blog: Supabase client not available');
      return [];
    }
    
    let query = supabase
      .from('blog_posts')
      .select('slug, title, date, description, author, tags, content, content_markdown, published')
      .order('date', { ascending: false });

    if (!includeUnpublished) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    return data.map(transformPost);
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string, includeUnpublished: boolean = false): Promise<BlogPost | null> {
  try {
    // Use public client for static generation (no cookies), or server client for authenticated requests
    const supabase = includeUnpublished 
      ? createServerSupabaseClient() 
      : (createPublicSupabaseClient() || createServerSupabaseClient());
    
    if (!supabase) {
      console.warn('Blog: Supabase client not available');
      return null;
    }
    
    let query = supabase
      .from('blog_posts')
      .select('slug, title, date, description, author, tags, content, content_markdown, published')
      .eq('slug', slug);

    if (!includeUnpublished) {
      query = query.eq('published', true);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      return null;
    }

    return transformPost(data);
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    return null;
  }
}

