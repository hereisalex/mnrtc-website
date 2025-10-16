import Image from "next/image";
import VisitorCounter from "@/components/geocities/VisitorCounter";

export default function Home() {
  return (
    <>
    <div className="geocities-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 className="geocities-title geocities-glitter">
            <span className="geocities-blink geocities-spin">★</span> Minnesota Retro Technology Club <span className="geocities-blink geocities-spin">★</span>
          </h1>
          <div style={{ 
            background: '#ffff00', 
            color: '#000000', 
            padding: '2px 8px', 
            border: '2px solid #000000',
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 'bold',
            marginTop: '10px'
          }}>
            WELCOME TO THE FUTURE OF THE PAST!
          </div>
          
          {/* Search Box with FrogFind */}
          <div style={{ marginTop: '15px' }}>
            <form action="https://frogfind.com/" method="get" target="_blank" style={{ display: 'inline-block' }}>
              <input 
                type="text" 
                name="q" 
                placeholder="Search the web with FrogFind!" 
                style={{
                  padding: '5px 10px',
                  border: '2px solid #000000',
                  fontSize: '12px',
                  width: '250px',
                  marginRight: '5px'
                }}
              />
              <button type="submit" className="geocities-button">
                🐸 Search
              </button>
            </form>
          </div>
        </div>

        <hr />

        {/* Welcome Section */}
        <div className="geocities-section circuit-board-bg">
          <h2>Welcome to MNRTC!</h2>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }} className="welcome-flex">
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image
                src="/images/newlogo2.png"
                alt="Minnesota Retro Technology Club Wordmark"
                width={200}
                height={60}
                style={{ imageRendering: 'pixelated', maxWidth: '100%', height: 'auto' }}
              />
              <Image
                src="/images/mnrtc.png"
                alt="Minnesota Retro Technology Club Logo"
                width={120}
                height={120}
                style={{ imageRendering: 'pixelated', maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="geocities-rainbow">
                Hello, World! <span className="geocities-bounce">🌍</span>
              </h3>
              <p>
                Minnesota Retro Technology Club is a new organization based in the Twin Cities. 
                We're still figuring things out, but please join our community below!
              </p>
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href="https://groups.io/g/mnretrotech" target="_blank" rel="noopener noreferrer" className="geocities-button">
                  📧 Join Mailing List
                </a>
                <a href="https://discord.gg/hF9wh6gPcP" target="_blank" rel="noopener noreferrer" className="geocities-button">
                  💬 Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="geocities-section">
          <h2>Our Mission</h2>
          <h3>What We Do</h3>
          <p>
            This club exists as a user's group for retro/vintage computer/technology enthusiasts. 
            Our goal is to connect people within the community, preserve computing history, 
            provide educational outreach, and share knowledge.
          </p>
          <ul style={{ fontSize: '12px', paddingLeft: '20px' }}>
            <li>Connect people within the community</li>
            <li>Preserve computing history</li>
            <li>Provide educational outreach</li>
            <li>Share knowledge</li>
          </ul>
        </div>

        {/* Meetings Section */}
        <div className="geocities-section">
          <h2>Meetings</h2>
          <h3>Get Involved</h3>
          <div style={{ 
            background: '#e0f0ff', 
            border: '2px solid #000000', 
            padding: '10px', 
            marginBottom: '15px' 
          }}>
            <strong>Next Meeting TBA</strong><br />
            <em>Check back soon!</em>
          </div>
          <p>
            <strong>When:</strong> Second Sunday of every month, 1-5 PM CT<br />
            <strong>Where:</strong> Twin Cities metro area (location TBA)<br />
            <strong>What:</strong> Show-and-tell, technical discussions, and community building!
          </p>
          <div style={{ marginTop: '15px' }}>
            <a href="/proposal" className="geocities-button">
              View Full Proposal
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="geocities-section">
          <h2>Quick Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }} className="quick-links-grid">
            <a href="/about" className="geocities-button">About Us</a>
            <a href="/proposal" className="geocities-button">Club Proposal</a>
            <a href="/events" className="geocities-button">Events</a>
            <a href="/blog" className="geocities-button">Blog</a>
            <a href="/resources" className="geocities-button">Resources</a>
            <a href="/links" className="geocities-button">Links</a>
            <a href="https://www.meetup.com/" target="_blank" rel="noopener noreferrer" className="geocities-button">Meetup.com</a>
            <a href="mailto:hello@mnretrotech.org" className="geocities-button">Contact Us</a>
            <a href="/assets/files/MNRTC_Interest_Form_Responses.xlsx" target="_blank" rel="noopener noreferrer" className="geocities-button">
              Interest Form
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="geocities-section stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <h3>Visitor Counter</h3>
            <div style={{ textAlign: 'center', padding: '10px', background: '#ffffff', border: '1px solid #000000' }}>
              <VisitorCounter />
            </div>
          </div>
          <div>
            <h3>Webring Badges</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              <span className="geocities-badge">RETRO TECH</span>
              <span className="geocities-badge">GEEK CULTURE</span>
              <span className="geocities-badge">MINNESOTA</span>
              <span className="geocities-badge">VINTAGE</span>
              <span className="geocities-badge">COMPUTING</span>
              <span className="geocities-badge">CLUB</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '30px', padding: '10px', background: '#f0f0f0', border: '1px solid #000000' }}>
          <p style={{ fontSize: '10px', margin: '0' }}>
            © 2025 Minnesota Retro Technology Club | Best viewed in Netscape Navigator 4.0!
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ 
        position: 'fixed', 
        bottom: '0', 
        left: '0', 
        right: '0', 
        background: '#000000', 
        color: '#00ff00',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 1000
      }}>
        <div className="geocities-marquee">
          ★ Welcome to the Minnesota Retro Technology Club! ★ Join us for vintage computing fun! ★ Best viewed in Netscape Navigator 4.0! ★ Under construction since 1995! ★
        </div>
      </div>
    </>
  );
}