import { notFound } from "next/navigation";
import MacWindow from "@/components/mac-ui/MacWindow";
import MacButton from "@/components/mac-ui/MacButton";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { format } from "date-fns";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | MNRTC Blog`,
    description: post.description,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <MacWindow title={post.title} width="100%">
        <div className="mb-6">
          <h1 className="text-3xl font-chicago mb-3">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm font-geneva text-mac-gray-dark mb-4">
            <span>By {post.author}</span>
            <span>•</span>
            <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-geneva bg-mac-platinum-dark border border-mac-gray"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="prose prose-sm max-w-none font-geneva blog-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <hr className="my-8 border-mac-gray" />

        <div className="flex gap-3">
          <MacButton href="/blog">← Back to Blog</MacButton>
          <MacButton href="/" variant="primary">
            Home
          </MacButton>
        </div>
      </MacWindow>
    </div>
  );
}

