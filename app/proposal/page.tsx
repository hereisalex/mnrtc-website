import GeoCitiesWindow from "@/components/geocities/GeoCitiesWindow";

export const metadata = {
  title: "Club Proposal | Minnesota Retro Technology Club",
  description: "The official proposal for the Minnesota Retro Technology Club",
};

export default function ProposalPage() {
  return (
    <div style={{ marginTop: '30px', position: 'relative', minHeight: 'calc(100vh - 200px)' }}>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="geocities-title geocities-rainbow">
          <span className="geocities-blink geocities-spin">📋</span> Club Proposal <span className="geocities-blink geocities-spin">📋</span>
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
          THE OFFICIAL CLUB PROPOSAL!
        </div>
      </div>

      {/* Main Proposal Window */}
      <GeoCitiesWindow 
        title="Club Proposal" 
        width="800px" 
        height="600px"
        x={50}
        y={50}
      >
        <div style={{ overflowY: 'auto', height: '520px', padding: '10px' }}>
          {/* Disclaimer */}
          <div style={{
            background: '#ffff00',
            border: '2px solid #000000',
            padding: '10px',
            marginBottom: '15px'
          }}>
            <p style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>
              ⚠️ IMPORTANT DISCLAIMER ⚠️
            </p>
            <p style={{ fontSize: '10px', fontStyle: 'italic' }}>
              This proposal is subject to change and adjustment: This is just the initial draft!
            </p>
          </div>

          {/* Mission Section */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#4169e1' }}>
              🎯 Our Mission
            </h2>
            <p style={{ fontSize: '12px', marginBottom: '10px' }}>
              This club will exist as a user's group for retro/vintage computer/technology enthusiasts. Our goal is to…
            </p>
            <ul style={{ fontSize: '11px', paddingLeft: '15px', lineHeight: '1.4' }}>
              <li style={{ marginBottom: '5px' }}>• Connect people within the community</li>
              <li style={{ marginBottom: '5px' }}>• Preserve computing history</li>
              <li style={{ marginBottom: '5px' }}>• Provide educational outreach to the community</li>
              <li style={{ marginBottom: '5px' }}>• And share knowledge</li>
            </ul>
          </div>

          {/* Guidelines Section */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#9932cc' }}>
              📜 Club Guidelines
            </h2>
            <ul style={{ fontSize: '11px', paddingLeft: '15px', lineHeight: '1.4' }}>
              <li style={{ marginBottom: '5px' }}>• In-person meetings will be held within the metro area of the Twin Cities of Minnesota</li>
              <li style={{ marginBottom: '5px' }}>• All ages welcome. Anyone under the age of 15 needs to be accompanied by a guardian</li>
              <li style={{ marginBottom: '5px' }}>• All tech is welcome! While the focus is retro/vintage, we welcome any discussion on anything unique/cool/exciting!</li>
              <li style={{ marginBottom: '5px' }}>• A genuine interest in retro/vintage tech is all you need. Nothing else required!</li>
              <li style={{ marginBottom: '5px' }}>• Leave all politics at the door</li>
              <li style={{ marginBottom: '5px' }}>• No sexual content, topics, or discussions</li>
              <li style={{ marginBottom: '5px' }}>• This is a safe and inclusive environment. Use inclusive language and keep things appropriate</li>
              <li style={{ marginBottom: '5px' }}>• Be respectful. Treat everyone with kindness and respect. No harassment, hate speech, or personal attacks</li>
            </ul>
          </div>

          {/* Meeting Schedule Section */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#ff8c00' }}>
              📅 Meeting Schedule
            </h2>
            <div style={{
              background: '#f0f0f0',
              border: '1px solid #000000',
              padding: '10px',
              marginBottom: '10px',
              boxShadow: 'inset 1px 1px 0 #000000'
            }}>
              <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Regular Meetings</p>
              <p style={{ fontSize: '11px' }}>Second Sunday of every month, 1-5 PM CT</p>
              <p style={{ fontSize: '11px' }}>Location: TBA (within Twin Cities metro area)</p>
            </div>
            <p style={{ fontSize: '11px', lineHeight: '1.4' }}>
              Meetings will include show-and-tell sessions, technical discussions, and opportunities to connect with fellow enthusiasts. 
              Bring your projects, collections, or just your curiosity!
            </p>
          </div>

          {/* Membership Section */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#00ff00' }}>
              👥 Membership
            </h2>
            <p style={{ fontSize: '11px', marginBottom: '10px' }}>
              Membership is free and open to anyone with an interest in retro technology. No dues, no requirements, just enthusiasm!
            </p>
            <div style={{
              background: '#e0f0ff',
              border: '1px solid #000000',
              padding: '8px',
              marginBottom: '10px',
              boxShadow: 'inset 1px 1px 0 #000000'
            }}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>How to Join:</p>
              <ul style={{ fontSize: '10px', paddingLeft: '15px' }}>
                <li>• Join our mailing list on Groups.io</li>
                <li>• Join our Discord server</li>
                <li>• Attend a meeting</li>
                <li>• That's it!</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#ff69b4' }}>
              📞 Contact Information
            </h2>
            <p style={{ fontSize: '11px', marginBottom: '10px' }}>
              Questions? Comments? Suggestions? We'd love to hear from you!
            </p>
            <div style={{
              background: '#ffff00',
              border: '1px solid #000000',
              padding: '8px'
            }}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}>Get in Touch:</p>
              <p style={{ fontSize: '10px' }}>Email: <a href="mailto:hello@mnretrotech.org" style={{ color: '#0000ff', textDecoration: 'underline' }}>hello@mnretrotech.org</a></p>
              <p style={{ fontSize: '10px' }}>Website: <a href="https://mnretrotech.org" style={{ color: '#0000ff', textDecoration: 'underline' }}>mnretrotech.org</a></p>
            </div>
          </div>
        </div>
      </GeoCitiesWindow>

      {/* Fun Stats Window */}
      <GeoCitiesWindow 
        title="Proposal Stats" 
        width="200px" 
        height="150px"
        x={870}
        y={100}
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
            <strong>Proposal Length:</strong> 1 Page
          </div>
          <div style={{ fontSize: '10px', marginBottom: '5px' }}>
            <strong>Guidelines:</strong> 8 Rules
          </div>
          <div style={{ fontSize: '10px', marginBottom: '5px' }}>
            <strong>Meetings:</strong> Monthly
          </div>
          <div style={{ fontSize: '10px' }}>
            <strong>Membership:</strong> Free!
          </div>
        </div>
      </GeoCitiesWindow>
    </div>
  );
}