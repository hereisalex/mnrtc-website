import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";
import Link from "next/link";

export const metadata = {
  title: "Blog | Minnesota Retro Technology Club",
  description: "News, updates, and articles from the Minnesota Retro Technology Club",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

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

        {posts.length > 0 ? (
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
                    href={`/blog/${post.slug}`}
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