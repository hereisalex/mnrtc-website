# Converting Dashboard to Static Export

This document explains how to convert dashboard pages from server-side to client-side for static export on GitHub Pages.

## Key Changes

1. **Remove API routes** - Replace with direct Supabase client calls
2. **Convert pages to client components** - Add `'use client'` directive
3. **Use AuthGuard** - Wrap pages with `<AuthGuard>` component
4. **Fetch data in useEffect** - Load data client-side instead of server-side

## Example: Blog Page Conversion

### Before (Server Component)
```tsx
export default async function BlogPage({ searchParams }) {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  // ... server-side logic
}
```

### After (Client Component)
```tsx
'use client';

export default function BlogPage() {
  const searchParams = useSearchParams();
  const supabase = getBrowserSupabaseClient();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    // Fetch data client-side
  }, []);
}
```

## BlogPostForm: Replace API Calls

### Before
```tsx
const response = await fetch(`/api/blog/${post.slug}`, {
  method: 'PUT',
  // ...
});
```

### After
```tsx
const supabase = getBrowserSupabaseClient();
const { data, error } = await supabase
  .from('blog_posts')
  .update({ ...formData, tags })
  .eq('slug', post.slug);
```

## Files That Need Conversion

- ✅ `app/dashboard/layout.tsx` - DONE
- ⏳ `app/dashboard/blog/page.tsx` - Needs conversion
- ⏳ `app/dashboard/blog/[slug]/page.tsx` - Needs conversion  
- ⏳ `app/dashboard/blog/_components/BlogPostForm.tsx` - Replace API calls
- ⏳ `app/dashboard/blog/_components/BlogPostList.tsx` - Replace API calls
- ⏳ `app/dashboard/events/page.tsx` - Needs conversion
- ⏳ `app/dashboard/events/_components/EventForm.tsx` - Replace API calls
- ⏳ `app/dashboard/events/_components/EventList.tsx` - Replace API calls
- ⏳ `app/dashboard/analytics/page.tsx` - Needs conversion
- ⏳ `app/dashboard/guestbook/page.tsx` - Needs conversion
- ⏳ `app/dashboard/guestbook/_components/GuestbookEntryList.tsx` - Replace API calls
- ⏳ `app/dashboard/health/page.tsx` - Needs conversion
- ⏳ `app/dashboard/errors/page.tsx` - Needs conversion
- ⏳ `app/login/page.tsx` - Needs conversion

## Important Notes

1. **Row Level Security (RLS)** - Make sure your Supabase tables have proper RLS policies to secure data
2. **Environment Variables** - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be set
3. **Static Export** - `output: 'export'` is enabled in `next.config.ts`
4. **No API Routes** - All API routes will be ignored in static export

## Security Considerations

Since we're using the anonymous key client-side:
- RLS policies in Supabase must restrict access properly
- Only authenticated users with proper roles should access dashboard data
- Consider using Supabase RLS policies that check user metadata for roles

