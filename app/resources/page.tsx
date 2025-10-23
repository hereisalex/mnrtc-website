export const metadata = {
  title: "Resources | Minnesota Retro Technology Club",
  description:
    "Links to community resources, other clubs, and useful information for retro technology enthusiasts",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Resources
        </h1>
        <div style={{ 
          background: '#ffff00', 
          color: '#000000', 
          padding: '4px 8px', 
          border: '2px solid #000000',
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}>
          COMMUNITY RESOURCES & CONNECTIONS!
        </div>
      </div>

      {/* Join Our Community Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Join Our Community
        </h2>
        <p style={{ fontSize: '12px', marginBottom: '15px', lineHeight: '1.4' }}>
          Connect with fellow retro technology enthusiasts in the Twin Cities!
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <a 
            href="https://groups.io/g/mnretrotech" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            📬 Mailing List
          </a>
          <a 
            href="https://discord.gg/hF9wh6gPcP" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            💬 Discord Server
          </a>
          <a 
            href="https://www.meetup.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            📅 Meetup.com
          </a>
          <a 
            href="mailto:hello@mnretrotech.org"
            style={{
              display: 'block',
              background: '#e0e0e0',
              color: '#000000',
              padding: '10px',
              border: '1px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            📧 Email Contact
          </a>
        </div>
      </div>

      {/* Related Organizations Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Related Organizations
        </h2>
        <p style={{ fontSize: '12px', marginBottom: '15px', lineHeight: '1.4' }}>
          Check out these awesome organizations in the retro computing and geek community!
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #000000',
            padding: '10px'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
              <a 
                href="https://www.atlhcs.org" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#0000ff', textDecoration: 'underline' }}
              >
                Atlanta Historical Computing Society
              </a>
            </h3>
            <p style={{ fontSize: '10px', margin: 0, lineHeight: '1.3' }}>
              The inspiration for MNRTC! A great example of a successful retro computing club.
            </p>
          </div>
          <div style={{
            background: '#ffffff',
            border: '1px solid #000000',
            padding: '10px'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
              <a 
                href="https://twincitiesgeek.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#0000ff', textDecoration: 'underline' }}
              >
                Twin Cities Geek
              </a>
            </h3>
            <p style={{ fontSize: '10px', margin: 0, lineHeight: '1.3' }}>
              Local geek culture news and events in the Twin Cities.
            </p>
          </div>
          <div style={{
            background: '#ffffff',
            border: '1px solid #000000',
            padding: '10px'
          }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
              <a 
                href="https://geekpartnership.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#0000ff', textDecoration: 'underline' }}
              >
                Geek Partnership Society
              </a>
            </h3>
            <p style={{ fontSize: '10px', margin: 0, lineHeight: '1.3' }}>
              Supporting and connecting geek communities in the Twin Cities.
            </p>
          </div>
        </div>
      </div>

      {/* Interest Form Section */}
      <div style={{
        background: '#ffff00',
        border: '2px solid #000000',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Interest Form
        </h2>
        <p style={{ fontSize: '11px', marginBottom: '15px', lineHeight: '1.4' }}>
          Help us understand what you're interested in! Fill out our interest form to let us know 
          what topics, activities, and meeting formats you'd like to see.
        </p>
        <a 
          href="/assets/files/MNRTC_Interest_Form_Responses.xlsx" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#ffffff',
            color: '#000000',
            padding: '5px 10px',
            border: '2px solid #000000',
            fontSize: '11px',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
        >
          📊 Download Interest Form
        </a>
      </div>

      {/* Useful Links Section */}
      <div style={{
        background: '#f8f8f8',
        border: '2px solid #000000',
        padding: '15px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Useful Links
        </h2>
        <p style={{ fontSize: '12px', marginBottom: '15px', lineHeight: '1.4' }}>
          Helpful resources for retro computing enthusiasts:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          <a 
            href="https://www.vcfed.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#ffffff',
              color: '#0000ff',
              padding: '8px',
              border: '1px solid #000000',
              fontSize: '10px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              textAlign: 'center'
            }}
          >
            Vintage Computer Federation
          </a>
          <a 
            href="https://www.computerhistory.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#ffffff',
              color: '#0000ff',
              padding: '8px',
              border: '1px solid #000000',
              fontSize: '10px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              textAlign: 'center'
            }}
          >
            Computer History Museum
          </a>
          <a 
            href="https://www.retrocomputing.stackexchange.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#ffffff',
              color: '#0000ff',
              padding: '8px',
              border: '1px solid #000000',
              fontSize: '10px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              textAlign: 'center'
            }}
          >
            Retrocomputing Stack Exchange
          </a>
          <a 
            href="https://www.reddit.com/r/retrobattlestations/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#ffffff',
              color: '#0000ff',
              padding: '8px',
              border: '1px solid #000000',
              fontSize: '10px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              textAlign: 'center'
            }}
          >
            r/retrobattlestations
          </a>
        </div>
      </div>
    </>
  );
}