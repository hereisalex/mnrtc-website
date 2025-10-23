import PostItNote from "@/components/PostItNote";
import WebringBadge from "@/components/WebringBadge";
import ContentMinnesotaLogo from "@/components/ContentMinnesotaLogo";
import PageSection from "@/components/PageSection";
import ContentGroup from "@/components/ContentGroup";

function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Blog Content Section */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '10px',
        background: '#ffffff',
        border: '2px outset #cccccc',
        margin: '10px 0',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '15px',
          textAlign: 'center',
          borderBottom: '2px solid #000000',
          paddingBottom: '5px'
        }}>
          📝 Latest Blog Posts
        </h2>
        
        {/* Blog Posts */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px'
        }}>
          {/* Blog Post 1 */}
          <PostItNote color="yellow">
            <h3 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '8px',
              fontFamily: 'Arial, sans-serif'
            }}>
              Welcome to MNRTC!
            </h3>
            <p style={{
              fontSize: '11px',
              lineHeight: '1.4',
              margin: '0 0 8px 0'
            }}>
              We're excited to announce the formation of the Minnesota Retro Technology Club! 
              Join us as we explore vintage computing and preserve computing history.
            </p>
            <div style={{
              fontSize: '10px',
              color: '#666666',
              fontStyle: 'italic'
            }}>
              Posted: January 15, 2024
            </div>
          </PostItNote>

          {/* Blog Post 2 */}
          <PostItNote color="blue">
            <h3 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '8px',
              fontFamily: 'Arial, sans-serif'
            }}>
              First Meeting Scheduled
            </h3>
            <p style={{
              fontSize: '11px',
              lineHeight: '1.4',
              margin: '0 0 8px 0'
            }}>
              Our inaugural meeting will be held on the second Sunday of next month. 
              Bring your favorite retro hardware and join the discussion!
            </p>
            <div style={{
              fontSize: '10px',
              color: '#666666',
              fontStyle: 'italic'
            }}>
              Posted: January 10, 2024
            </div>
          </PostItNote>

          {/* Blog Post 3 */}
          <PostItNote color="green">
            <h3 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '8px',
              fontFamily: 'Arial, sans-serif'
            }}>
              Retro Computing Resources
            </h3>
            <p style={{
              fontSize: '11px',
              lineHeight: '1.4',
              margin: '0 0 8px 0'
            }}>
              Check out our growing collection of resources for retro computing enthusiasts. 
              From repair guides to software archives, we've got you covered.
            </p>
            <div style={{
              fontSize: '10px',
              color: '#666666',
              fontStyle: 'italic'
            }}>
              Posted: January 5, 2024
            </div>
          </PostItNote>

          {/* Pagination */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '20px',
            padding: '10px',
            background: '#f0f0f0',
            border: '2px inset #cccccc'
          }}>
            <button style={{
              padding: '4px 8px',
              fontSize: '11px',
              background: '#e0e0e0',
              border: '2px outset #cccccc',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif'
            }}>
              ← Previous
            </button>
            <span style={{
              padding: '4px 8px',
              fontSize: '11px',
              color: '#000000',
              background: '#ffffff',
              border: '2px inset #cccccc',
              fontFamily: 'Arial, sans-serif'
            }}>
              Page 1 of 3
            </span>
            <button style={{
              padding: '4px 8px',
              fontSize: '11px',
              background: '#e0e0e0',
              border: '2px outset #cccccc',
              cursor: 'pointer',
              fontFamily: 'Arial, sans-serif'
            }}>
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <PostItNote color="blue">
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Our Mission
        </h2>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.5',
          margin: '0 0 10px 0'
        }}>
          This club exists as a user's group for retro/vintage computer/technology enthusiasts. 
          Our goal is to connect people within the community, preserve computing history, 
          provide educational outreach, and share knowledge.
        </p>
        <ul style={{ 
          fontSize: '11px', 
          paddingLeft: '20px',
          margin: '0'
        }}>
          <li>Connect people within the community</li>
          <li>Preserve computing history</li>
          <li>Provide educational outreach</li>
          <li>Share knowledge</li>
        </ul>
      </PostItNote>

      {/* Meetings Section */}
      <PostItNote color="green">
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Meetings
        </h2>
        <div style={{ 
          background: '#e0f0ff', 
          border: 'none', 
          padding: '10px', 
          marginBottom: '10px' 
        }}>
          <strong style={{ fontSize: '12px' }}>Next Meeting TBA</strong><br />
          <em style={{ fontSize: '11px' }}>Check back soon!</em>
        </div>
        <p style={{
          fontSize: '11px',
          lineHeight: '1.4',
          margin: '0'
        }}>
          <strong>When:</strong> Second Sunday of every month, 1-5 PM CT<br />
          <strong>Where:</strong> Twin Cities metro area (location TBA)<br />
          <strong>What:</strong> Show-and-tell, technical discussions, and community building!
        </p>
      </PostItNote>

      {/* Webring Badges */}
      <PostItNote color="pink" style={{ textAlign: 'center' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Webring Badges
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
          <WebringBadge text="RETRO TECH" color="yellow" />
          <WebringBadge text="GEEK CULTURE" color="blue" />
          <WebringBadge text="MINNESOTA" color="pink" />
          <WebringBadge text="VINTAGE" color="green" />
          <WebringBadge text="COMPUTING" color="orange" />
          <WebringBadge text="CLUB" color="purple" />
        </div>
      </PostItNote>
    </div>
  );
}

Home.displayName = 'Home';

export default Home;