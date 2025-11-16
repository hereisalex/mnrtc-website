import { TYPOGRAPHY } from "@/lib/spacing";

export const metadata = {
  title: "Club Proposal | Minnesota Retro Technology Club",
  description: "The official proposal for the Minnesota Retro Technology Club",
};

export default function ProposalPage() {
  return (
    <>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_XXL}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: '10px',
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          Club Proposal
        </h1>
        <div style={{ 
          background: '#ffff00', 
          color: '#000000', 
          padding: '4px 8px', 
          border: '2px solid #000000',
          display: 'inline-block',
          fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          marginBottom: '15px'
        }}>
          THE OFFICIAL CLUB PROPOSAL!
        </div>
      </div>

      {/* Mission & Guidelines Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_LG}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: '10px',
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          Mission & Guidelines
        </h2>
        <p style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`, marginBottom: '10px', lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL }}>
          <strong>Mission:</strong> The Minnesota Retro Technology Club (MNRTC) exists as a user's group for 
          retro/vintage computer/technology enthusiasts. Our goal is to connect people within the community, 
          preserve computing history, provide educational outreach, and share knowledge.
        </p>
        <div style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`, lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL }}>
          <strong>Guidelines:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>Be respectful and inclusive to all members</li>
            <li>Share knowledge and help others learn</li>
            <li>Preserve and document computing history</li>
            <li>Support the retro computing community</li>
          </ul>
        </div>
      </div>

      {/* Meeting Format Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_LG}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: '10px',
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          Meeting Format & Location
        </h2>
        <div style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`, lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL }}>
          <p><strong>Frequency:</strong> Second Sunday of every month, 1-5 PM CT</p>
          <p><strong>Location:</strong> Twin Cities metro area (specific location TBA)</p>
          <p><strong>Format:</strong> Show-and-tell, technical discussions, and community building</p>
          <p><strong>Activities:</strong></p>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>Project demonstrations and presentations</li>
            <li>Technical discussions and Q&A sessions</li>
            <li>Equipment trading and sharing</li>
            <li>Collaborative troubleshooting</li>
            <li>Social networking and community building</li>
          </ul>
        </div>
      </div>

      {/* Communication Methods Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_LG}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: '10px',
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          Communication Methods
        </h2>
        <div style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`, lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL }}>
          <p><strong>Primary:</strong> Groups.io mailing list for announcements and discussions</p>
          <p><strong>Secondary:</strong> Discord server for real-time chat and casual conversation</p>
          <p><strong>Website:</strong> This website for information, blog posts, and resources</p>
          <p><strong>Social Media:</strong> Meetup.com for event listings (when available)</p>
        </div>
      </div>

      {/* Future Growth Plans Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_LG}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: '10px',
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          Future Growth Plans
        </h2>
        <div style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`, lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL }}>
          <p><strong>Short-term (6 months):</strong></p>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>Establish regular meeting schedule and location</li>
            <li>Build core membership base</li>
            <li>Develop meeting format and activities</li>
            <li>Create online presence and resources</li>
          </ul>
          <p><strong>Long-term (1-2 years):</strong></p>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>Host special events and workshops</li>
            <li>Partner with local organizations and museums</li>
            <li>Develop educational outreach programs</li>
            <li>Create member projects and collaborations</li>
          </ul>
        </div>
      </div>

      {/* Inspiration Section */}
      <div style={{
        background: '#ffff00',
        border: '2px solid #000000',
        padding: '15px'
      }}>
        <h2 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_LG}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: '10px',
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          Inspiration & Related Organizations
        </h2>
        <div style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`, lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL }}>
          <p><strong>Inspiration:</strong> The Atlanta Historical Computing Society (AHCS) - a successful 
          retro computing club that has been operating for many years and serves as our model.</p>
          <p><strong>Related Organizations:</strong></p>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li><a href="https://www.atlhcs.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Atlanta Historical Computing Society</a></li>
            <li><a href="https://www.vcfed.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Vintage Computer Federation</a></li>
            <li><a href="https://twincitiesgeek.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Twin Cities Geek</a></li>
            <li><a href="https://geekpartnership.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', textDecoration: 'underline' }}>Geek Partnership Society</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}