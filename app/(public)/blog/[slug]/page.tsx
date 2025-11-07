import { notFound } from "next/navigation";
import GeoCitiesWindow from "@/components/geocities/GeoCitiesWindow";
import GeoCitiesButton from "@/components/geocities/GeoCitiesButton";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { format } from "date-fns";

// Required for static export - generate static params for all published blog posts
export async function generateStaticParams() {
  // For now, return empty array - pages will be generated on-demand
  // In production, you could fetch all blog post slugs here
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div style={{ marginTop: '30px', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="geocities-title geocities-rainbow">
          <span className="geocities-blink geocities-spin">📝</span> Blog Post <span className="geocities-blink geocities-spin">📝</span>
        </h1>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GeoCitiesWindow 
          title={post.title} 
          width="800px" 
          height="600px"
        >
          <div style={{ overflowY: 'auto', height: '520px', padding: '10px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '21px', fontWeight: 'bold', marginBottom: '10px', color: '#4169e1' }}>
                {post.title}
              </h1>
              <div style={{ fontSize: '14px', color: '#666666', marginBottom: '10px' }}>
                <span>By {post.author}</span>
                <span style={{ margin: '0 5px' }}>•</span>
                <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '15px' }}>
                  {post.tags.map((tag) => (
                    <div
                      key={tag}
                      className="geocities-badge"
                      style={{ fontSize: '13px' }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ 
              fontSize: '15px', 
              lineHeight: '1.4',
              fontFamily: 'Arial, sans-serif'
            }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div style={{ 
              borderTop: '1px solid #000000', 
              margin: '20px 0', 
              paddingTop: '15px' 
            }}>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <GeoCitiesButton href="/blog">← Back to Blog</GeoCitiesButton>
                <GeoCitiesButton href="/" variant="primary">
                  🏠 Home
                </GeoCitiesButton>
              </div>
            </div>
          </div>
        </GeoCitiesWindow>
      </div>
    </div>
  );
}

