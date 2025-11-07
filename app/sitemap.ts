import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable or default to GitHub Pages URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hereisalex.github.io/mnrtc-website';
  
  // Try to fetch posts, but don't fail if Supabase is unavailable during build
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.warn('[Sitemap] Failed to fetch blog posts, continuing without blog URLs:', error);
  }

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog?slug=${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/proposal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...blogUrls,
  ];
}

