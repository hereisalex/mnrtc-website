import GeoCitiesWindow from "@/components/geocities/GeoCitiesWindow";
import GeoCitiesButton from "@/components/geocities/GeoCitiesButton";
import Image from "next/image";

export const metadata = {
  title: "About | Minnesota Retro Technology Club",
  description:
    "Learn about the Minnesota Retro Technology Club and who's behind it",
};

export default function AboutPage() {
  return (
    <div style={{ marginTop: '30px', position: 'relative', minHeight: 'calc(100vh - 30px)' }}>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="geocities-title geocities-glitter">
          <span className="geocities-blink geocities-spin">★</span> About MNRTC <span className="geocities-blink geocities-spin">★</span>
            </h1>
          </div>

      {/* Overlapping Windows */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: 'calc(100vh - 200px)', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div style={{ 
          position: 'relative', 
          width: '1000px', 
          height: '600px',
          margin: '0 auto'
        }}>
        {/* Main About Window */}
        <GeoCitiesWindow 
          title="Meet the Founder" 
          width="400px" 
          height="300px"
          x={50}
          y={50}
        >
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: '120px',
                height: '120px',
                background: '#f0f0f0',
                border: '2px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 1px 1px 0 #000000'
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
              <p style={{ fontSize: '12px', lineHeight: '1.4', marginBottom: '10px' }}>
                Hey there! I'm{" "}
                  <a
                    href="https://hannahap.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  style={{ color: '#0000ff', textDecoration: 'underline' }}
                  >
                    Hannah A. Patellis
                  </a>{" "}
                and I recently moved to the Twin Cities from Atlanta, Georgia. As a lifelong tech enthusiast, I've always been fascinated by vintage computing and retro technology. By day, I work in IT, but my real passion lies in preserving and celebrating the history of computing.
                </p>
              <p style={{ fontSize: '12px', lineHeight: '1.4' }}>
                While living in Atlanta, I was an active member of the{" "}
                  <a
                    href="https://www.atlhcs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  style={{ color: '#0000ff', textDecoration: 'underline' }}
                  >
                  Atlanta Historical Computing Society
                  </a>
                , which opened my eyes to how amazing it is to connect with fellow retro tech enthusiasts. When I relocated to Minnesota, I was surprised to find there wasn't a similar organization here. So I decided to take the initiative and start building a community of like-minded individuals who share a love for vintage technology!
                </p>
            </div>
          </div>
        </GeoCitiesWindow>

        {/* Vision Window */}
        <GeoCitiesWindow 
          title="Club Vision" 
          width="320px" 
          height="240px"
          x={500}
          y={70}
        >
          <div>
            <p style={{ fontSize: '12px', lineHeight: '1.4', marginBottom: '15px' }}>
              The Minnesota Retro Technology Club aims to be a welcoming,
              inclusive space for anyone interested in vintage computing and
              technology. Whether you're a collector, hobbyist, educator, or
              just curious, there's a place for you here.
            </p>
            <p style={{ fontSize: '12px', lineHeight: '1.4' }}>
              We believe in preserving the history of computing while fostering
              a community that shares knowledge, resources, and enthusiasm for
              the technology that shaped our world.
            </p>
          </div>
        </GeoCitiesWindow>

        {/* Get In Touch Window */}
        <GeoCitiesWindow 
          title="Get In Touch" 
          width="300px" 
          height="200px"
          x={50}
          y={380}
        >
          <div>
            <p style={{ fontSize: '12px', marginBottom: '15px' }}>
              Interested in helping? Joining? Questions, comments, and/or
              concerns?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <GeoCitiesButton href="mailto:hello@mnretrotech.org" external variant="primary">
                📧 Shoot me an email!
              </GeoCitiesButton>
              <GeoCitiesButton href="https://discord.gg/hF9wh6gPcP" external variant="accent">
                💬 Join the Discord
              </GeoCitiesButton>
              <GeoCitiesButton href="https://groups.io/g/mnretrotech" external>
                📬 Join the Mailing List
              </GeoCitiesButton>
            </div>
          </div>
        </GeoCitiesWindow>

        {/* Status Window */}
        <GeoCitiesWindow 
          title="Under Construction" 
          width="260px" 
          height="140px"
          x={380}
          y={340}
        >
          <div style={{
            background: '#ffff00',
            border: '2px solid #000000',
            padding: '10px',
            marginBottom: '10px'
          }}>
            <p style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>
              ⚠️ WARNING: UNDER CONSTRUCTION ⚠️
            </p>
            <p style={{ fontSize: '10px' }}>
              This website, the{" "}
              <a href="/proposal" style={{ color: '#0000ff', textDecoration: 'underline' }}>
                club proposal
              </a>
              , and pretty much everything else here are subject to change. I'm
              very much still in the "planning" and "gauging interest" phase!
            </p>
          </div>
        </GeoCitiesWindow>

        {/* Quick Links Window */}
        <GeoCitiesWindow 
          title="Quick Links" 
          width="300px" 
          height="140px"
          x={680}
          y={340}
        >
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '8px'
          }}>
            <GeoCitiesButton href="/proposal">Read Proposal</GeoCitiesButton>
            <GeoCitiesButton href="/events">View Events</GeoCitiesButton>
            <GeoCitiesButton href="/resources">Resources</GeoCitiesButton>
            <GeoCitiesButton href="/links">Links</GeoCitiesButton>
            <GeoCitiesButton href="/blog">Blog</GeoCitiesButton>
          </div>
        </GeoCitiesWindow>

        {/* Twin Cities Geek Community Window */}
        <GeoCitiesWindow 
          title="Twin Cities Geek Community" 
          width="260px" 
          height="160px"
          x={380}
          y={500}
        >
          <div>
            <p style={{ fontSize: '11px', marginBottom: '10px' }}>
              We're proud to be part of the vibrant Twin Cities geek community! Check out these awesome local organizations:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <a
                href="https://twincitiesgeek.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#ffff00',
                  color: '#000000',
                  padding: '3px 6px',
                  border: '1px solid #000000',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                📰 Twin Cities Geek
              </a>
              <a
                href="https://geekpartnership.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#00ff00',
                  color: '#000000',
                  padding: '3px 6px',
                  border: '1px solid #000000',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                🤝 Geek Partnership Society
              </a>
            </div>
          </div>
        </GeoCitiesWindow>

        {/* Fun GIF Window */}
        <GeoCitiesWindow 
          title="Retro Computing Fun!" 
          width="180px" 
          height="130px"
          x={680}
          y={500}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '40px', 
              marginBottom: '10px',
              animation: 'geocities-spin 2s linear infinite'
            }}>
              💻
            </div>
            <p style={{ fontSize: '10px', fontWeight: 'bold' }}>
              Computing is fun!
            </p>
          </div>
        </GeoCitiesWindow>
        </div>
        </div>
    </div>
  );
}

