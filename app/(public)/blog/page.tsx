'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getBrowserSupabaseClient } from "@/lib/supabaseClient";
import { format } from "date-fns";
import GeoCitiesWindow from "@/components/geocities/GeoCitiesWindow";
import GeoCitiesButton from "@/components/geocities/GeoCitiesButton";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  content: string;
}

interface BlogPostSummary {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
}

function BlogContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  // Load all posts
  useEffect(() => {
    const loadPosts = async () => {
      const supabase = getBrowserSupabaseClient();
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: postsData, error } = await supabase
          .from("blog_posts")
          .select("slug, title, date, description, author, tags")
          .eq("published", true)
          .order("date", { ascending: false });

        if (error) {
          console.error("[Blog] Failed to load posts", error);
        } else {
          setPosts(postsData || []);
        }
      } catch (error) {
        console.error("[Blog] Error loading posts", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Load individual post if slug is provided
  useEffect(() => {
    if (!slug) {
      setSelectedPost(null);
      return;
    }

    const loadPost = async () => {
      setIsLoadingPost(true);
      const supabase = getBrowserSupabaseClient();
      if (!supabase) {
        setIsLoadingPost(false);
        return;
      }

      try {
        const { data: postData, error } = await supabase
          .from("blog_posts")
          .select("slug, title, date, description, author, tags, content")
          .eq("slug", slug)
          .eq("published", true)
          .single();

        if (error || !postData) {
          setSelectedPost(null);
        } else {
          setSelectedPost(postData);
        }
      } catch (error) {
        console.error("[Blog] Error loading post", error);
        setSelectedPost(null);
      } finally {
        setIsLoadingPost(false);
      }
    };

    loadPost();
  }, [slug]);

  // If viewing a single post
  if (slug && selectedPost) {
    return (
      <div style={{ marginTop: '30px', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 className="geocities-title geocities-rainbow">
            <span className="geocities-blink geocities-spin">📝</span> Blog Post <span className="geocities-blink geocities-spin">📝</span>
          </h1>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GeoCitiesWindow 
            title={selectedPost.title} 
            width="800px" 
            height="600px"
          >
            <div style={{ overflowY: 'auto', height: '520px', padding: '10px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '21px', fontWeight: 'bold', marginBottom: '10px', color: '#4169e1' }}>
                  {selectedPost.title}
                </h1>
                <div style={{ fontSize: '14px', color: '#666666', marginBottom: '10px' }}>
                  <span>By {selectedPost.author}</span>
                  <span style={{ margin: '0 5px' }}>•</span>
                  <time>{format(new Date(selectedPost.date), 'MMMM d, yyyy')}</time>
                </div>
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '15px' }}>
                    {selectedPost.tags.map((tag) => (
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
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
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

  if (slug && isLoadingPost) {
    return (
      <div style={{ marginTop: '30px', padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '16px', color: '#666666' }}>Loading blog post...</div>
      </div>
    );
  }

  if (slug && !selectedPost) {
    return (
      <div style={{ marginTop: '30px', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Post Not Found</h1>
        <p style={{ fontSize: '16px', color: '#666666', marginBottom: '20px' }}>
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <GeoCitiesButton href="/blog">← Back to Blog</GeoCitiesButton>
          <GeoCitiesButton href="/" variant="primary">🏠 Home</GeoCitiesButton>
        </div>
      </div>
    );
  }

  // Blog listing page
  return (
    <>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          MNRTC Blog
        </h1>
        <div style={{ 
          background: '#ffff00', 
          color: '#000000', 
          padding: '4px 8px', 
          border: '2px solid #000000',
          display: 'inline-block',
          fontSize: '15px',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}>
          NEWS, UPDATES & ARTICLES!
        </div>
      </div>

      {/* Blog Posts Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '19px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Latest Posts
        </h2>
        <p style={{ 
          fontSize: '15px', 
          color: '#666666', 
          marginBottom: '15px',
          lineHeight: '1.4'
        }}>
          Stay up to date with club news, meeting recaps, and articles about retro technology
        </p>

        {isLoading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666666' }}>
            Loading posts...
          </div>
        ) : posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <div key={post.slug} style={{
                background: '#ffffff',
                border: '1px solid #000000',
                padding: '10px',
                marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '5px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 'bold', margin: 0, flex: 1, minWidth: '200px' }}>{post.title}</h3>
                  <span style={{ fontSize: '13px', color: '#666666', whiteSpace: 'nowrap' }}>
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <p style={{ fontSize: '14px', marginBottom: '8px', lineHeight: '1.4' }}>{post.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <span style={{ fontSize: '13px', color: '#666666' }}>
                    By {post.author}
                  </span>
                  <Link 
                    href={`/blog?slug=${post.slug}`}
                    style={{
                      display: 'inline-block',
                      background: '#e0e0e0',
                      color: '#000000',
                      padding: '3px 8px',
                      border: '1px solid #000000',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      textDecoration: 'none'
                    }}
                  >
                    Read More
                  </Link>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: 'inline-block',
                          background: '#ffff00',
                          color: '#000000',
                          padding: '2px 6px',
                          border: '1px solid #000000',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: '#f0f0f0',
            border: '1px solid #000000',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Coming Soon!</h2>
            <p style={{ fontSize: '11px', marginBottom: '15px', lineHeight: '1.4' }}>
              We haven't published any blog posts yet, but check back soon for
              updates, meeting recaps, and articles about retro technology.
            </p>
            <a 
              href="https://groups.io/g/mnretrotech" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#e0e0e0',
                color: '#000000',
                padding: '5px 10px',
                border: '1px solid #000000',
                fontSize: '11px',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              📬 Join the Mailing List for Updates
            </a>
          </div>
        )}
      </div>

      {/* Writing Tips Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Want to Write for Us?
        </h2>
        <p style={{ 
          fontSize: '11px', 
          lineHeight: '1.4', 
          marginBottom: '15px' 
        }}>
          We're always looking for writers who share our passion for retro technology! 
          Contact us if you'd like to contribute to our blog.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '15px' }}>
          <span style={{
            display: 'inline-block',
            background: '#ffff00',
            color: '#000000',
            padding: '2px 6px',
            border: '1px solid #000000',
            fontSize: '9px',
            fontWeight: 'bold'
          }}>Retro Computing</span>
          <span style={{
            display: 'inline-block',
            background: '#ffff00',
            color: '#000000',
            padding: '2px 6px',
            border: '1px solid #000000',
            fontSize: '9px',
            fontWeight: 'bold'
          }}>Vintage Hardware</span>
          <span style={{
            display: 'inline-block',
            background: '#ffff00',
            color: '#000000',
            padding: '2px 6px',
            border: '1px solid #000000',
            fontSize: '9px',
            fontWeight: 'bold'
          }}>Software History</span>
          <span style={{
            display: 'inline-block',
            background: '#ffff00',
            color: '#000000',
            padding: '2px 6px',
            border: '1px solid #000000',
            fontSize: '9px',
            fontWeight: 'bold'
          }}>Club News</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a 
            href="mailto:hello@mnretrotech.org" 
            style={{
              display: 'inline-block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '5px 10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            📧 Contact Us
          </a>
          <a 
            href="https://groups.io/g/mnretrotech" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '5px 10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            💬 Join Discussion
          </a>
        </div>
      </div>

      {/* RSS Feed Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Stay Updated
        </h2>
        <p style={{ 
          fontSize: '11px', 
          lineHeight: '1.4', 
          marginBottom: '15px' 
        }}>
          Subscribe to our RSS feed or join our mailing list to never miss an update!
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <a 
            href="/rss.xml"
            style={{
              display: 'inline-block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '5px 10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            📡 RSS Feed
          </a>
          <a 
            href="https://groups.io/g/mnretrotech" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '5px 10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            📬 Mailing List
          </a>
          <a 
            href="/"
            style={{
              display: 'inline-block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '5px 10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            🏠 Home
          </a>
        </div>
      </div>
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div style={{ marginTop: '30px', padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '16px', color: '#666666' }}>Loading...</div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
