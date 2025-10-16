import GeoCitiesButton from "@/components/geocities/GeoCitiesButton";
import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";

export const metadata = {
  title: "Blog | Minnesota Retro Technology Club",
  description: "News, updates, and articles from the Minnesota Retro Technology Club",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="geocities-container">
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="geocities-title geocities-rainbow">
          <span className="geocities-blink geocities-spin">📝</span> MNRTC Blog <span className="geocities-blink geocities-spin">📝</span>
        </h1>
      </div>

      {/* Blog Posts Section */}
      <div className="geocities-section">
        <h2>Latest Posts</h2>
        <p style={{ fontSize: '12px', color: '#666666', marginBottom: '15px' }}>
          Stay up to date with club news, meeting recaps, and articles about retro technology
        </p>

        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <div key={post.slug} style={{
                background: '#f8f8f8',
                border: '1px solid #000000',
                padding: '10px',
                marginBottom: '15px',
                boxShadow: 'inset 1px 1px 0 #000000'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '5px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, flex: 1, minWidth: '200px' }}>{post.title}</h3>
                  <span style={{ fontSize: '10px', color: '#666666', whiteSpace: 'nowrap' }}>
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <p style={{ fontSize: '11px', marginBottom: '8px', lineHeight: '1.4' }}>{post.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <span style={{ fontSize: '10px', color: '#666666' }}>
                    By {post.author}
                  </span>
                  <GeoCitiesButton href={`/blog/${post.slug}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                    Read More
                  </GeoCitiesButton>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="geocities-badge"
                        style={{ fontSize: '9px' }}
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
            textAlign: 'center',
            boxShadow: 'inset 1px 1px 0 #000000'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Coming Soon!</h2>
            <p style={{ fontSize: '11px', marginBottom: '15px', lineHeight: '1.4' }}>
              We haven't published any blog posts yet, but check back soon for
              updates, meeting recaps, and articles about retro technology.
            </p>
            <GeoCitiesButton href="https://groups.io/g/mnretrotech" external>
              📬 Join the Mailing List for Updates
            </GeoCitiesButton>
          </div>
        )}
      </div>

      {/* Writing Tips Section */}
      <div className="geocities-section">
        <h2>Want to Write for Us?</h2>
        <p style={{ fontSize: '11px', lineHeight: '1.4', marginBottom: '15px' }}>
          We're always looking for writers who share our passion for retro technology! 
          Contact us if you'd like to contribute to our blog.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '15px' }}>
          <span className="geocities-badge">Retro Computing</span>
          <span className="geocities-badge">Vintage Hardware</span>
          <span className="geocities-badge">Software History</span>
          <span className="geocities-badge">Club News</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href="mailto:hello@mnretrotech.org" className="geocities-button">
            📧 Contact Us
          </a>
          <a href="https://groups.io/g/mnretrotech" target="_blank" rel="noopener noreferrer" className="geocities-button">
            💬 Join Discussion
          </a>
        </div>
      </div>

      {/* RSS Feed Section */}
      <div className="geocities-section">
        <h2>Stay Updated</h2>
        <p style={{ fontSize: '11px', lineHeight: '1.4', marginBottom: '15px' }}>
          Subscribe to our RSS feed or join our mailing list to never miss an update!
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="/rss.xml" className="geocities-button">
            📡 RSS Feed
          </a>
          <a href="https://groups.io/g/mnretrotech" target="_blank" rel="noopener noreferrer" className="geocities-button">
            📬 Mailing List
          </a>
          <a href="/" className="geocities-button">
            🏠 Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', padding: '10px', background: '#f0f0f0', border: '1px solid #000000' }}>
        <p style={{ fontSize: '10px', margin: '0' }}>
          © 2025 Minnesota Retro Technology Club | Best viewed in Netscape Navigator 4.0!
        </p>
      </div>
    </div>
  );
}