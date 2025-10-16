import CursorTrail from "@/components/CursorTrail";

export const metadata = {
  title: "About | Minnesota Retro Technology Club",
  description: "Learn about the Minnesota Retro Technology Club and who's behind it",
};

export default function AboutPage() {
  return (
    <>
      <CursorTrail />
      <div className="geocities-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 className="geocities-title geocities-glitter">
            <span className="geocities-blink geocities-spin">★</span> About MNRTC <span className="geocities-blink geocities-spin">★</span>
          </h1>
        </div>

        {/* Founder Section */}
        <div className="geocities-section">
          <h2>Meet the Founder</h2>
          <div style={{ display: 'flex', gap: '15px' }} className="founder-flex">
            <div style={{ flexShrink: 0, textAlign: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: '#f0f0f0',
                border: '2px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 1px 1px 0 #000000',
                margin: '0 auto'
              }}>
                <span style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  color: '#666666'
                }}>
                  HAP
                </span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p>
                Hey there! I'm{" "}
                <a href="https://hannahap.com" target="_blank" rel="noopener noreferrer" className="geocities-link">
                  Hannah A. Patellis
                </a>{" "}
                and I recently moved to the Twin Cities from Atlanta, Georgia. As a lifelong tech enthusiast, 
                I've always been fascinated by vintage computing and retro technology. By day, I work in IT, 
                but my real passion lies in preserving and celebrating the history of computing.
              </p>
              <p>
                While living in Atlanta, I was an active member of the{" "}
                <a href="https://www.atlhcs.org" target="_blank" rel="noopener noreferrer" className="geocities-link">
                  Atlanta Historical Computing Society
                </a>
                , which opened my eyes to how amazing it is to connect with fellow retro tech enthusiasts. 
                When I relocated to Minnesota, I was surprised to find there wasn't a similar organization here. 
                So I decided to take the initiative and start building a community of like-minded individuals 
                who share a love for vintage technology!
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="geocities-section">
          <h2>Club Vision</h2>
          <p>
            The Minnesota Retro Technology Club aims to be a welcoming, inclusive space for anyone 
            interested in vintage computing and technology. Whether you're a collector, hobbyist, 
            educator, or just curious, there's a place for you here.
          </p>
          <p>
            We believe in preserving the history of computing while fostering a community that shares 
            knowledge, resources, and enthusiasm for the technology that shaped our world.
          </p>
        </div>

        {/* Contact Section */}
        <div className="geocities-section">
          <h2>Get In Touch</h2>
          <h3>Interested in helping? Joining? Questions, comments, and/or concerns?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '15px' }}>
            <a href="mailto:hello@mnretrotech.org" className="geocities-button">
              📧 Shoot me an email!
            </a>
            <a href="https://discord.gg/hF9wh6gPcP" target="_blank" rel="noopener noreferrer" className="geocities-button">
              💬 Join the Discord
            </a>
            <a href="https://groups.io/g/mnretrotech" target="_blank" rel="noopener noreferrer" className="geocities-button">
              📬 Join the Mailing List
            </a>
          </div>
        </div>

        {/* Status Section */}
        <div className="geocities-section">
          <h2>Under Construction</h2>
          <div style={{
            background: '#ffff00',
            border: '2px solid #000000',
            padding: '10px',
            marginBottom: '15px'
          }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
              ⚠️ WARNING: UNDER CONSTRUCTION ⚠️
            </p>
            <p style={{ fontSize: '11px' }}>
              This website, the{" "}
              <a href="/proposal" className="geocities-link">
                club proposal
              </a>
              , and pretty much everything else here are subject to change. I'm
              very much still in the "planning" and "gauging interest" phase!
            </p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="geocities-section">
          <h2>Quick Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            <a href="/proposal" className="geocities-button">Read Proposal</a>
            <a href="/events" className="geocities-button">View Events</a>
            <a href="/resources" className="geocities-button">Resources</a>
            <a href="/links" className="geocities-button">Links</a>
            <a href="/blog" className="geocities-button">Blog</a>
          </div>
        </div>

        {/* Community Section */}
        <div className="geocities-section">
          <h2>Twin Cities Geek Community</h2>
          <p>
            We're proud to be part of the vibrant Twin Cities geek community! Check out these awesome local organizations:
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <a
              href="https://twincitiesgeek.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="geocities-badge"
              style={{ fontSize: '12px', padding: '5px 10px' }}
            >
              📰 Twin Cities Geek
            </a>
            <a
              href="https://geekpartnership.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="geocities-badge"
              style={{ fontSize: '12px', padding: '5px 10px', background: '#00ff00' }}
            >
              🤝 Geek Partnership Society
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