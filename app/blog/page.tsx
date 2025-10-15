import GeoCitiesWindow from "@/components/geocities/GeoCitiesWindow";
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
    <div style={{ marginTop: '30px', position: 'relative', minHeight: 'calc(100vh - 30px)' }}>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="geocities-title geocities-rainbow">
          <span className="geocities-blink geocities-spin">📝</span> MNRTC Blog <span className="geocities-blink geocities-spin">📝</span>
        </h1>
      </div>

      {/* Overlapping Windows */}
      <div style={{ position: 'relative', width: '100%', height: '900px' }}>
        {/* Main Blog Window */}
        <GeoCitiesWindow 
          title="Blog & Updates" 
          width="600px" 
          height="500px"
          x={50}
          y={50}
        >
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontSize: '12px', color: '#666666', marginBottom: '15px' }}>
              Stay up to date with club news, meeting recaps, and articles about retro technology
            </p>
          </div>

          {posts.length > 0 ? (
            <div style={{ overflowY: 'auto', height: '350px' }}>
              {posts.map((post) => (
                <div key={post.slug} style={{
                  background: '#f8f8f8',
                  border: '1px solid #000000',
                  padding: '10px',
                  marginBottom: '10px',
                  boxShadow: 'inset 1px 1px 0 #000000'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{post.title}</h3>
                    <span style={{ fontSize: '10px', color: '#666666', whiteSpace: 'nowrap' }}>
                      {format(new Date(post.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', marginBottom: '8px', lineHeight: '1.4' }}>{post.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                          style={{
                            background: '#ffff00',
                            color: '#000000',
                            padding: '1px 4px',
                            fontSize: '9px',
                            border: '1px solid #000000',
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
              textAlign: 'center',
              boxShadow: 'inset 1px 1px 0 #000000'
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Coming Soon!</h2>
              <p style={{ fontSize: '11px', marginBottom: '15px', lineHeight: '1.4' }}>
                We haven't published any blog posts yet, but check back soon for
                updates, meeting recaps, and articles about retro technology.
              </p>
              <GeoCitiesButton href="https://groups.io/g/mnretrotech" external variant="primary">
                📬 Join the Mailing List for Updates
              </GeoCitiesButton>
            </div>
          )}
        </GeoCitiesWindow>

        {/* Writing Tips Window */}
        <GeoCitiesWindow 
          title="Writing Tips" 
          width="250px" 
          height="200px"
          x={500}
          y={100}
        >
          <div>
            <p style={{ fontSize: '11px', lineHeight: '1.4', marginBottom: '10px' }}>
              Want to contribute to our blog? We're always looking for writers who share our passion for retro technology!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div className="geocities-badge">Retro Computing</div>
              <div className="geocities-badge">Vintage Hardware</div>
              <div className="geocities-badge">Software History</div>
              <div className="geocities-badge">Club News</div>
            </div>
          </div>
        </GeoCitiesWindow>

        {/* RSS Feed Window */}
        <GeoCitiesWindow 
          title="RSS Feed" 
          width="200px" 
          height="150px"
          x={500}
          y={280}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '30px', 
              marginBottom: '10px',
              animation: 'geocities-bounce 2s infinite'
            }}>
              📡
            </div>
            <p style={{ fontSize: '10px', fontWeight: 'bold' }}>
              Subscribe to our RSS feed!
            </p>
            <GeoCitiesButton href="/rss.xml" style={{ fontSize: '10px', padding: '2px 6px' }}>
              RSS
            </GeoCitiesButton>
          </div>
        </GeoCitiesWindow>

        {/* Guestbook Window */}
        <GeoCitiesWindow 
          title="Guestbook" 
          width="300px" 
          height="200px"
          x={100}
          y={340}
        >
          <div>
            <p style={{ fontSize: '11px', marginBottom: '10px' }}>
              Leave a comment in our digital guestbook!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
              <input 
                type="text" 
                placeholder="Your name" 
                style={{
                  padding: '3px',
                  border: '1px solid #000000',
                  fontSize: '10px',
                  width: '100%'
                }}
              />
              <textarea 
                placeholder="Your message..." 
                rows={3}
                style={{
                  padding: '3px',
                  border: '1px solid #000000',
                  fontSize: '10px',
                  width: '100%',
                  resize: 'none'
                }}
              />
            </div>
            <GeoCitiesButton style={{ width: '100%', fontSize: '10px', padding: '3px' }}>
              Sign Guestbook
            </GeoCitiesButton>
          </div>
        </GeoCitiesWindow>
      </div>
    </div>
  );
}

