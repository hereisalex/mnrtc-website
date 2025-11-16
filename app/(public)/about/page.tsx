import { TYPOGRAPHY } from "@/lib/spacing";

export const metadata = {
  title: "About | Minnesota Retro Technology Club",
  description: "Learn about the Minnesota Retro Technology Club and who's behind it",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_XXL}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: '10px',
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          About MNRTC
        </h1>
      </div>

      {/* Founder Section */}
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
          Meet the Founder
        </h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#f0f0f0',
              border: '2px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 1px 1px 0 #000000',
              margin: '0 auto'
            }}>
              <span style={{
                fontSize: `${TYPOGRAPHY.FONT_SIZE_LG}px`,
                fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
                color: '#666666'
              }}>
                HAP
              </span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`,
              lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL,
              margin: '0 0 10px 0'
            }}>
              Hey there! I'm{" "}
              <a href="https://hannahap.com" target="_blank" rel="noopener noreferrer" style={{
                color: '#0000ff',
                textDecoration: 'underline'
              }}>
                Hannah A. Patellis
              </a>{" "}
              and I recently moved to the Twin Cities from Atlanta, Georgia. As a lifelong tech enthusiast,
              I've always been fascinated by vintage computing and retro technology.
            </p>
            <p style={{
              fontSize: '12px',
              lineHeight: '1.5',
              margin: '0'
            }}>
              While living in Atlanta, I was an active member of the{" "}
              <a href="https://www.atlhcs.org" target="_blank" rel="noopener noreferrer" style={{
                color: '#0000ff',
                textDecoration: 'underline'
              }}>
                Atlanta Historical Computing Society
              </a>
              . When I relocated to Minnesota, I was surprised to find there wasn't a similar organization here.
              So I decided to take the initiative and start building a community!
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
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
          Club Vision
        </h2>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.5',
          margin: '0 0 10px 0'
        }}>
          The Minnesota Retro Technology Club aims to be a welcoming, inclusive space for anyone
          interested in vintage computing and technology. Whether you're a collector, hobbyist,
          educator, or just curious, there's a place for you here.
        </p>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.5',
          margin: '0'
        }}>
          We believe in preserving the history of computing while fostering a community that shares
          knowledge, resources, and enthusiasm for the technology that shaped our world.
        </p>
      </div>

      {/* Status Section */}
      <div style={{
        background: '#ffff00',
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
          ⚠️ Under Construction ⚠️
        </h2>
        <p style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`,
          lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL,
          margin: '0'
        }}>
          This website, the{" "}
          <a href="/proposal" style={{
            color: '#0000ff',
            textDecoration: 'underline'
          }}>
            club proposal
          </a>
          , and pretty much everything else here are subject to change. I'm
          very much still in the "planning" and "gauging interest" phase!
        </p>
      </div>

      {/* Community Section */}
      <div style={{
        background: '#f8f8f8',
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
          Twin Cities Geek Community
        </h2>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.5',
          margin: '0 0 10px 0'
        }}>
          We're proud to be part of the vibrant Twin Cities geek community! Check out these awesome local organizations:
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href="https://twincitiesgeek.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#ffff00',
              color: '#000000',
              padding: '3px 8px',
              border: '1px solid #000000',
              fontSize: `${TYPOGRAPHY.FONT_SIZE_TINY}px`,
              fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
              textDecoration: 'none'
            }}
          >
            📰 Twin Cities Geek
          </a>
          <a
            href="https://geekpartnership.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#00ff00',
              color: '#000000',
              padding: '3px 8px',
              border: '1px solid #000000',
              fontSize: `${TYPOGRAPHY.FONT_SIZE_TINY}px`,
              fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
              textDecoration: 'none'
            }}
          >
            🤝 Geek Partnership Society
          </a>
        </div>
      </div>
    </>
  );
}

