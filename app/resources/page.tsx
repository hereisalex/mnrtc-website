import GeoCitiesWindow from "@/components/geocities/GeoCitiesWindow";
import GeoCitiesButton from "@/components/geocities/GeoCitiesButton";

export const metadata = {
  title: "Resources | Minnesota Retro Technology Club",
  description:
    "Links to community resources, other clubs, and useful information for retro technology enthusiasts",
};

export default function ResourcesPage() {
  return (
    <div style={{ marginTop: '30px', position: 'relative', minHeight: 'calc(100vh - 200px)' }}>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="geocities-title geocities-rainbow">
          <span className="geocities-blink geocities-spin">📚</span> Resources <span className="geocities-blink geocities-spin">📚</span>
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
          COMMUNITY RESOURCES & CONNECTIONS!
        </div>
      </div>

      {/* Overlapping Windows */}
      <div style={{ position: 'relative', width: '100%', minHeight: 'calc(100vh - 200px)', padding: '20px' }}>
        {/* Join Our Community Window */}
        <GeoCitiesWindow 
          title="Join Our Community" 
          width="500px" 
          height="400px"
          x={20}
          y={20}
        >
          <div style={{ overflowY: 'auto', height: '320px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <div style={{
                background: '#f8f8f8',
                border: '1px solid #000000',
                padding: '10px',
                boxShadow: 'inset 1px 1px 0 #000000'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>📧 Mailing List</h3>
                <p style={{ fontSize: '11px', marginBottom: '10px' }}>
                  Official announcements and discussions via Groups.io
                </p>
                <GeoCitiesButton href="https://groups.io/g/mnretrotech" external variant="primary" style={{ width: '100%', fontSize: '10px' }}>
                  Join on Groups.io
                </GeoCitiesButton>
              </div>

              <div style={{
                background: '#f8f8f8',
                border: '1px solid #000000',
                padding: '10px',
                boxShadow: 'inset 1px 1px 0 #000000'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>💬 Discord</h3>
                <p style={{ fontSize: '11px', marginBottom: '10px' }}>
                  Real-time chat and community discussions
                </p>
                <GeoCitiesButton href="https://discord.gg/hF9wh6gPcP" external variant="accent" style={{ width: '100%', fontSize: '10px' }}>
                  Join Discord Server
                </GeoCitiesButton>
              </div>

              <div style={{
                background: '#f8f8f8',
                border: '1px solid #000000',
                padding: '10px',
                boxShadow: 'inset 1px 1px 0 #000000'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>📅 Meetup.com</h3>
                <p style={{ fontSize: '11px', marginBottom: '10px' }}>
                  RSVP to events and find other members
                </p>
                <GeoCitiesButton href="https://www.meetup.com/" external style={{ width: '100%', fontSize: '10px' }}>
                  View on Meetup
                </GeoCitiesButton>
              </div>

              <div style={{
                background: '#f8f8f8',
                border: '1px solid #000000',
                padding: '10px',
                boxShadow: 'inset 1px 1px 0 #000000'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>📋 Interest Form</h3>
                <p style={{ fontSize: '11px', marginBottom: '10px' }}>
                  View responses from May - October 2025
                </p>
                <GeoCitiesButton href="/assets/files/MNRTC_Interest_Form_Responses.xlsx" external style={{ width: '100%', fontSize: '10px' }}>
                  Download Results
                </GeoCitiesButton>
              </div>
            </div>
          </div>
        </GeoCitiesWindow>

        {/* Related Organizations Window */}
        <GeoCitiesWindow 
          title="Related Organizations" 
          width="450px" 
          height="400px"
          x={540}
          y={40}
        >
          <div style={{ overflowY: 'auto', height: '320px' }}>
            <p style={{ fontSize: '11px', marginBottom: '15px' }}>
              Other retro computing clubs and organizations that inspired us
            </p>
            
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>National Organizations</h3>
              <div style={{ fontSize: '11px' }}>
                • <a href="https://vcfed.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Vintage Computing Federation</a>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Regional Clubs</h3>
              <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                • <a href="https://www.atlhcs.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Atlanta Historical Computing Society</a><br/>
                • <a href="https://sea-rcs.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Seattle Retro Computing Society</a><br/>
                • <a href="https://chiclassiccomp.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Chicago Classic Computing</a><br/>
                • <a href="https://www.rcsri.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Retro-Computing Society of Rhode Island</a>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Local Minnesota Organizations</h3>
              <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                • <a href="https://www.freegeektwincities.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Free Geek Twin Cities</a><br/>
                • <a href="https://miniapples.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Mini'app'les</a><br/>
                • <a href="https://www.facebook.com/groups/1006333239526745/" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>MN Vintage Computer User Group & Marketplace</a>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Other Resources</h3>
              <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                • <a href="http://ACRPC.net" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>ACRPC.net</a><br/>
                • <a href="http://BitHistory.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>BitHistory.org</a>
              </div>
            </div>
          </div>
        </GeoCitiesWindow>

        {/* Contact Info Window */}
        <GeoCitiesWindow 
          title="Suggest a Resource" 
          width="300px" 
          height="150px"
          x={20}
          y={440}
        >
          <div style={{
            background: '#ffff00',
            border: '2px solid #000000',
            padding: '10px'
          }}>
            <p style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '8px' }}>
              Know of a resource we should include?
            </p>
            <p style={{ fontSize: '10px', marginBottom: '10px' }}>
              Send us an email at{" "}
              <a href="mailto:hello@mnretrotech.org" style={{ color: '#0000ff', textDecoration: 'underline' }}>
                hello@mnretrotech.org
              </a>
            </p>
          </div>
        </GeoCitiesWindow>

        {/* Fun Stats Window */}
        <GeoCitiesWindow 
          title="Resource Stats" 
          width="200px" 
          height="150px"
          x={340}
          y={460}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '30px', 
              marginBottom: '10px',
              animation: 'geocities-bounce 2s infinite'
            }}>
              📊
            </div>
            <div style={{ fontSize: '10px', marginBottom: '5px' }}>
              <strong>Total Resources:</strong> 12+
            </div>
            <div style={{ fontSize: '10px', marginBottom: '5px' }}>
              <strong>National Orgs:</strong> 1
            </div>
            <div style={{ fontSize: '10px', marginBottom: '5px' }}>
              <strong>Regional Clubs:</strong> 4
            </div>
            <div style={{ fontSize: '10px' }}>
              <strong>Local MN:</strong> 3
            </div>
          </div>
        </GeoCitiesWindow>
      </div>
    </div>
  );
}

