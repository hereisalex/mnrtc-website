import Image from "next/image";
import GeoCitiesWindow from "@/components/geocities/GeoCitiesWindow";
import GeoCitiesButton from "@/components/geocities/GeoCitiesButton";
import { FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Home() {
  return (
    <div style={{ marginTop: '30px', position: 'relative', minHeight: 'calc(100vh - 30px)' }}>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
            <GeoCitiesButton type="submit" variant="accent">
              🐸 Search
            </GeoCitiesButton>
          </form>
        </div>
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
          width: '1200px', 
          height: '600px',
          margin: '0 auto'
        }}>
        {/* Welcome Window */}
        <GeoCitiesWindow 
          title="Welcome to MNRTC!" 
          width="350px" 
          height="280px"
          x={50}
          y={50}
        >
          <div style={{ textAlign: 'center' }}>
            <Image
              src="/images/mnrtc.png"
              alt="Minnesota Retro Technology Club"
              width={120}
              height={120}
              style={{ imageRendering: 'pixelated', marginBottom: '10px' }}
            />
            <h2 className="geocities-rainbow" style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              marginBottom: '10px'
            }}>
              Hello, World! <span className="geocities-bounce">🌍</span>
            </h2>
            <p style={{ fontSize: '12px', lineHeight: '1.4', marginBottom: '15px' }}>
              Minnesota Retro Technology Club is a new organization based in the Twin Cities. 
              We're still figuring things out, but please join our community below!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <GeoCitiesButton href="https://groups.io/g/mnretrotech" external variant="primary">
                📧 Join Mailing List
              </GeoCitiesButton>
              <GeoCitiesButton href="https://discord.gg/hF9wh6gPcP" external variant="accent">
                💬 Join Discord
              </GeoCitiesButton>
            </div>
          </div>
        </GeoCitiesWindow>

        {/* Mission Window */}
        <GeoCitiesWindow 
          title="Our Mission" 
          width="320px" 
          height="240px"
          x={450}
          y={80}
        >
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: '#4169e1' }}>
            What We Do
          </h3>
          <p style={{ fontSize: '11px', marginBottom: '10px' }}>
            This club exists as a user's group for retro/vintage computer/technology enthusiasts. 
            Our goal is to...
          </p>
          <ul style={{ fontSize: '11px', paddingLeft: '15px' }}>
            <li style={{ marginBottom: '5px' }}>• Connect people within the community</li>
            <li style={{ marginBottom: '5px' }}>• Preserve computing history</li>
            <li style={{ marginBottom: '5px' }}>• Provide educational outreach</li>
            <li style={{ marginBottom: '5px' }}>• Share knowledge</li>
          </ul>
        </GeoCitiesWindow>

        {/* Meetings Window */}
        <GeoCitiesWindow 
          title="Meetings" 
          width="280px" 
          height="200px"
          x={50}
          y={360}
        >
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: '#9932cc' }}>
            Get Involved
          </h3>
          <div style={{ 
            background: '#f0f0f0', 
            border: '1px solid #000000', 
            padding: '8px', 
            marginBottom: '10px',
            boxShadow: 'inset 1px 1px 0 #000000'
          }}>
            <p style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>Next Meeting</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff0000' }}>TBA</p>
            <p style={{ fontSize: '10px', color: '#666666' }}>Check back soon!</p>
          </div>
          <p style={{ fontSize: '11px', marginBottom: '10px' }}>
            Second Sunday of every month, 1-5 PM CT in the Twin Cities metro area.
          </p>
          <GeoCitiesButton href="/proposal" style={{ width: '100%' }}>
            View Full Proposal
          </GeoCitiesButton>
        </GeoCitiesWindow>

        {/* Quick Links Window */}
        <GeoCitiesWindow 
          title="Quick Links" 
          width="350px" 
          height="200px"
          x={370}
          y={360}
        >
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '5px',
            fontSize: '11px'
          }}>
            <GeoCitiesButton href="/about">About Us</GeoCitiesButton>
            <GeoCitiesButton href="/proposal">Club Proposal</GeoCitiesButton>
            <GeoCitiesButton href="/events">Events</GeoCitiesButton>
            <GeoCitiesButton href="/blog">Blog</GeoCitiesButton>
            <GeoCitiesButton href="/resources">Resources</GeoCitiesButton>
            <GeoCitiesButton href="/links">Links</GeoCitiesButton>
            <GeoCitiesButton href="https://www.meetup.com/" external>Meetup.com</GeoCitiesButton>
            <GeoCitiesButton href="mailto:hello@mnretrotech.org" external>Contact Us</GeoCitiesButton>
            <GeoCitiesButton href="/assets/files/MNRTC_Interest_Form_Responses.xlsx" external>
              Interest Form
            </GeoCitiesButton>
          </div>
        </GeoCitiesWindow>

        {/* Visitor Counter Window */}
        <GeoCitiesWindow 
          title="Visitor Counter" 
          width="150px" 
          height="100px"
          x={800}
          y={80}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#ff0000',
              marginBottom: '5px'
            }}>
              000001
            </div>
            <div style={{ fontSize: '10px' }}>
              visitors since 1995!
            </div>
          </div>
        </GeoCitiesWindow>

        {/* Webring Badges Window */}
        <GeoCitiesWindow 
          title="Webring Badges" 
          width="180px" 
          height="120px"
          x={800}
          y={200}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            <div className="geocities-badge">RETRO TECH</div>
            <div className="geocities-badge">GEEK CULTURE</div>
            <div className="geocities-badge">MINNESOTA</div>
            <div className="geocities-badge">VINTAGE</div>
            <div className="geocities-badge">COMPUTING</div>
            <div className="geocities-badge">CLUB</div>
          </div>
        </GeoCitiesWindow>
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
    </div>
  );
}
