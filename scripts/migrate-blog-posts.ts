/**
 * Migration script to import existing blog posts from MDX files into Supabase
 * 
 * Usage:
 * 1. Make sure your Supabase database is set up (run supabase/dashboard.sql)
 * 2. Set your environment variables (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
 * 3. Run: npx tsx scripts/migrate-blog-posts.ts
 * 
 * This script will:
 * - Read all MDX/MD files from content/blog/
 * - Parse frontmatter and content
 * - Insert them into Supabase blog_posts table
 * - Skip posts that already exist (by slug)
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import { marked } from 'marked';

const blogDirectory = path.join(process.cwd(), 'content/blog');

const getSupabaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined.');
  }
  return url;
};

const getServiceRoleKey = (): string => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined.');
  }
  return serviceRoleKey;
};

async function migrateBlogPosts() {
  console.log('Starting blog post migration...\n');

  // Initialize Supabase admin client
  const supabase = createClient(getSupabaseUrl(), getServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  // Check if blog directory exists
  if (!fs.existsSync(blogDirectory)) {
    console.log('Blog directory not found. Nothing to migrate.');
    return;
  }

  // Read all blog files
  const fileNames = fs.readdirSync(blogDirectory);
  const blogFiles = fileNames.filter(
    (fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md')
  );

  if (blogFiles.length === 0) {
    console.log('No blog files found to migrate.');
    return;
  }

  console.log(`Found ${blogFiles.length} blog file(s) to migrate.\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const fileName of blogFiles) {
    try {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Check if post already exists
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (existingPost) {
        console.log(`⏭️  Skipping "${data.title || slug}" (already exists)`);
        skipCount++;
        continue;
      }

      // Prepare post data
      const postData = {
        slug,
        title: data.title || 'Untitled',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        description: data.description || '',
        author: data.author || 'MNRTC',
        tags: data.tags || [],
        content_markdown: content,
        content: marked(content) as string,
        published: true,
      };

      // Insert into Supabase
      const { error } = await supabase.from('blog_posts').insert(postData);

      if (error) {
        throw error;
      }

      console.log(`✅ Migrated "${postData.title}"`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error migrating ${fileName}:`, error instanceof Error ? error.message : error);
      errorCount++;
    }
  }

  console.log('\n--- Migration Summary ---');
  console.log(`✅ Successfully migrated: ${successCount}`);
  console.log(`⏭️  Skipped (already exists): ${skipCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📊 Total: ${blogFiles.length}`);
}

// Run migration
migrateBlogPosts().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});

