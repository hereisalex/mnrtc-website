export const metadata = {
  title: "Links | Minnesota Retro Technology Club",
  description: "Links to geeky clubs, conventions, and organizations in the Twin Cities area",
};

export default function LinksPage() {
  const clubs = [
    { name: "MinnSpec: Minnesota Speculative Fiction Writers", url: "https://minnspec.org/" },
    { name: "Minnesota Browncoats", url: "https://www.mnbrowncoats.org/" },
    { name: "Southern MN Alliance", url: "https://www.southernmnalliance.org/" },
    { name: "The Garou Nation – Twin Cities Last Stand", description: "Live action RPG", url: "https://www.garou-nation.org/" },
    { name: "Kingdom of Northshield (SCA)", url: "https://northshield.org/" },
    { name: "TwinLUG (LEGO)", url: "https://twinlug.org/" },
    { name: "Transvestite Soup – Rocky Horror", url: "https://www.transvestitesoup.com/" },
    { name: "MN Astronomical Society", url: "https://www.mnastro.org/" },
    { name: "TC Regional Science Fairs", url: "https://www.tcsciencefair.org/" },
    { name: "Dimensions SF/F", url: "https://www.dimensionssf.com/" },
    { name: "North Country Gaylaxians", url: "https://www.gaylaxians.org/" },
    { name: "501st Stormtroopers", url: "https://www.501st.com/" },
    { name: "Geek Girls Guide", url: "https://www.geekgirlsguide.com/" },
    { name: "Twin Cities Makers", url: "https://www.tcmaker.org/" },
    { name: "Starfleet Region 6", url: "https://www.starfleet.org/" },
    { name: "USS Nokomis", url: "https://www.ussnokomis.org/" },
    { name: "Rivendell Group", url: "https://www.rivendellgroup.org/" },
  ];

  const conventions = [
    { name: "2D Con", url: "https://www.2dcon.net/" },
    { name: "CONsole Room", url: "https://www.consoleroom.org/" },
    { name: "MarsCon", url: "https://www.marscon.org/" },
    { name: "Con of the North", url: "https://www.conofthenorth.org/" },
    { name: "Anime Detour", url: "https://www.animedetour.com/" },
    { name: "Minicon", url: "https://www.minicon.org/" },
    { name: "Springcon", url: "https://www.springcon.com/" },
    { name: "CONvergence", url: "https://www.convergence-con.org/" },
    { name: "Diversicon", url: "https://www.diversicon.org/" },
    { name: "Furry Migration", url: "https://www.furrymigration.org/" },
    { name: "ConFABulous", url: "https://www.confabulous.org/" },
    { name: "Anime Fusion", url: "https://www.animefusion.org/" },
    { name: "Fallcon", url: "https://www.fallcon.com/" },
    { name: "Fables and Flames Romantacy Gala", url: "https://www.fablesandflames.org/" },
    { name: "Crypticon Minnesota", url: "https://www.crypticonminnesota.com/" },
    { name: "OmegaCon", url: "https://www.omegacon.org/" },
    { name: "SuperCon", url: "https://www.supercon.org/" },
    { name: "VGM Con", url: "https://www.vgmcon.org/" },
  ];

  const organizations = [
    { name: "Anime Twin Cities", url: "https://www.animetc.org/" },
    { name: "Asian Media Access", url: "https://www.asianmediaaccess.org/" },
    { name: "MNCBA (Minnesota Comic Book Fans)", url: "https://www.mncba.org/" },
    { name: "Convergence Events, Inc.", url: "https://www.convergence-con.org/" },
    { name: "MN Furs", url: "https://www.mnfurs.org/" },
    { name: "Minnesota Science Fiction Society (MNStF)", url: "https://www.mnstf.org/" },
    { name: "Quad Cities Anime", url: "https://www.quadcitiesanime.org/" },
  ];

  const regionalConventions = [
    { name: "AnimeIowa", url: "https://www.animeiowa.com/" },
    { name: "Capricon", url: "https://www.capricon.org/" },
    { name: "DemiCon", url: "https://www.demicon.org/" },
    { name: "Icon", url: "https://www.iconstl.org/" },
    { name: "ValleyCon", url: "https://www.valleycon.org/" },
    { name: "Windycon", url: "https://www.windycon.org/" },
    { name: "WisCon", url: "https://www.wiscon.org/" },
  ];

  const websites = [
    { name: "Sequential Tart", url: "https://www.sequentialtart.com/" },
    { name: "Outpost Galifrey", url: "https://www.outpostgalifrey.com/" },
    { name: "Fanac Fan History Project", url: "https://fanac.org/" },
    { name: "Fandom Directory", url: "https://www.fandomdirectory.org/" },
    { name: "Monsterzine", url: "https://www.monsterzine.com/" },
    { name: "Ain't-it-Cool News", url: "https://www.aintitcool.com/" },
    { name: "Kevin's Science Fiction Convention List", url: "https://www.nesfa.org/kevin/conventions.html" },
    { name: "Ralan.com", url: "https://www.ralan.com/" },
  ];

  return (
    <>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Twin Cities Geek Links
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
          THE ULTIMATE GUIDE TO TWIN CITIES GEEK CULTURE!
        </div>
      </div>

      {/* Clubs Section */}
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
          Clubs & Groups
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8px' }}>
          {clubs.map((club, index) => (
            <div key={index} style={{
              background: '#ffffff',
              border: '1px solid #000000',
              padding: '8px'
            }}>
              <a
                href={club.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0000ff',
                  textDecoration: 'underline',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  display: 'block',
                  marginBottom: '2px'
                }}
              >
                {club.name}
              </a>
              {club.description && (
                <div style={{ fontSize: '10px', color: '#666666' }}>
                  {club.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conventions Section */}
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
          Local Conventions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
          {conventions.map((con, index) => (
            <div key={index} style={{
              background: '#ffffff',
              border: '1px solid #000000',
              padding: '8px'
            }}>
              <a
                href={con.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0000ff',
                  textDecoration: 'underline',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
              >
                {con.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Organizations Section */}
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
          Organizations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
          {organizations.map((org, index) => (
            <div key={index} style={{
              background: '#ffffff',
              border: '1px solid #000000',
              padding: '8px'
            }}>
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0000ff',
                  textDecoration: 'underline',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
              >
                {org.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Conventions Section */}
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
          Regional Conventions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {regionalConventions.map((con, index) => (
            <div key={index} style={{
              background: '#ffffff',
              border: '1px solid #000000',
              padding: '8px'
            }}>
              <a
                href={con.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0000ff',
                  textDecoration: 'underline',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
              >
                {con.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Websites Section */}
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
          Cool Websites
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
          {websites.map((site, index) => (
            <div key={index} style={{
              background: '#ffffff',
              border: '1px solid #000000',
              padding: '8px'
            }}>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0000ff',
                  textDecoration: 'underline',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}
              >
                {site.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Partners Section */}
      <div style={{
        background: '#ffff00',
        border: '2px solid #000000',
        padding: '15px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Featured Partners
        </h2>
        <p style={{
          fontSize: '11px',
          marginBottom: '15px'
        }}>
          Check out these awesome local geek organizations!
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://twincitiesgeek.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#ffffff',
              color: '#000000',
              padding: '5px 10px',
              border: '2px solid #000000',
              fontSize: '11px',
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
              padding: '5px 10px',
              border: '2px solid #000000',
              fontSize: '11px',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            🤝 Geek Partnership Society
          </a>
        </div>
      </div>
    </>
  );
}
