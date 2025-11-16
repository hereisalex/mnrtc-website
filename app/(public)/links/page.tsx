import { SPACING, TYPOGRAPHY, BORDERS } from "@/lib/spacing";

export const metadata = {
  title: "Links | Minnesota Retro Technology Club",
  description: "Directory of geek communities and activities related to retro computing",
};

export default function LinksPage() {
  const localGroups = [
    { 
      name: "Saint Paul Atari Computer Enthusiasts (SPACE)", 
      description: "User group for fans of Atari computers and hardware that meets twice a month.",
      url: "https://space.atari.org/" 
    },
    { 
      name: "Mini'app'les", 
      description: "Minnesota Apple computer users group.",
      url: "https://miniapples.org/" 
    },
    { 
      name: "Twin Cities Geek", 
      description: "A community blog, calendar, and discussion group to all things geek culture in the Twin Cities.",
      url: "https://twincitiesgeek.com/" 
    },
    { 
      name: "Geek Partnership Society", 
      description: "A non-profit organization that helps organize events for other local clubs and conventions.",
      url: "https://geekpartnership.org/" 
    },
    { 
      name: "Free Geek Twin Cities", 
      description: "An electronics recycling/reseller that specializes in vintage computers, with an active chat community.",
      url: "https://www.freegeektwincities.org/" 
    },
    { 
      name: "Twin Cities Maker", 
      description: "A makerspace and public workshop for creatives of all trades.",
      url: "https://www.tcmaker.org/" 
    },
  ];

  const eventsAndConventions = [
    { 
      name: "2D Con", 
      description: "A tabletop and video gaming convention in Bloomington, Minnesota.",
      url: "https://www.2dcon.net/" 
    },
    { 
      name: "CONvergence", 
      description: "The largest science fiction and general geek culture convention in Minneapolis, Minnesota.",
      url: "https://www.convergence-con.org/" 
    },
    { 
      name: "Below Zero LAN", 
      description: "A 3-day PC gaming LAN event twice a year in Roseville, Minnesota.",
      url: "https://www.belowzerolan.com/" 
    },
    { 
      name: "Vintage Computer Festival Midwest", 
      description: "A massive retro computer exhibition in Schaumburg, Illinois.",
      url: "https://vcfed.org/events/vcf-midwest/" 
    },
  ];

  const retroComputerLinks = [
    { 
      name: "Compute!'s Gazette", 
      description: "A magazine for enthusiasts of retro computers including hand-typed programs, BBS updates, developer stories, discussion of new projects, and more.",
      url: "https://archive.org/details/computegazette" 
    },
    { 
      name: "The 8-Bit Guy", 
      description: "Blog and merchandise store for Youtuber David Murray, featuring new games for various vintage computers.",
      url: "https://www.the8bitguy.com/" 
    },
    { 
      name: "Nostalgia Nerd", 
      description: "Blog and merchandise store for Youtuber Peter Leigh, featuring articles on vintage computing and gaming.",
      url: "https://nostalgienerd.com/" 
    },
  ];

  return (
    <>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: `${SPACING.PAGE_SECTION_MARGIN_BOTTOM}px` }}>
        <h1 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_XXL}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: `${SPACING.PAGE_TITLE_MARGIN_BOTTOM}px`,
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          Links
        </h1>
        <p style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`,
          color: '#000000',
          marginBottom: `${SPACING.PAGE_SUBTITLE_MARGIN_BOTTOM}px`,
          lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL
        }}>
          Here you will find a directory of other geek communities and activities related to us that are worth checking out!
        </p>
        <p style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_BASE}px`,
          color: '#333333',
          fontStyle: 'normal',
          marginBottom: `${SPACING.PAGE_DISCLAIMER_MARGIN_BOTTOM}px`,
          lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL
        }}>
          *Legal disclaimer: MnRTC is not sponsored by any of the groups below*
        </p>
      </div>

      {/* Local Groups Section */}
      <div style={{
        background: '#ffffff',
        border: BORDERS.BORDER_MEDIUM,
        padding: `${SPACING.PAGE_SECTION_PADDING}px`,
        marginBottom: `${SPACING.PAGE_SECTION_MARGIN_BOTTOM}px`
      }}>
        <h2 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: `${SPACING.PAGE_TITLE_MARGIN_BOTTOM}px`,
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          LOCAL GROUPS
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${SPACING.POSTIT_GAP}px` }}>
          {localGroups.map((group, index) => {
            return (
              <div key={index} style={{
                padding: `${SPACING.POSTIT_PADDING}px`,
                margin: `${SPACING.POSTIT_MARGIN}px 0`
              }}>
                <a
                  href={group.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0000ff',
                    textDecoration: 'underline',
                    fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`,
                    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
                    display: 'block',
                    marginBottom: `${SPACING.POSTIT_LINK_MARGIN_BOTTOM}px`
                  }}
                >
                  {group.name}
                </a>
                {group.description && (
                  <div style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`, color: '#000000', lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL }}>
                    {group.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Events & Conventions Section */}
      <div style={{
        background: '#ffffff',
        border: BORDERS.BORDER_MEDIUM,
        padding: `${SPACING.PAGE_SECTION_PADDING}px`,
        marginBottom: `${SPACING.PAGE_SECTION_MARGIN_BOTTOM}px`
      }}>
        <h2 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: `${SPACING.PAGE_TITLE_MARGIN_BOTTOM}px`,
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          EVENTS & CONVENTIONS
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${SPACING.POSTIT_GAP}px` }}>
          {eventsAndConventions.map((event, index) => {
            return (
              <div key={index} style={{
                padding: `${SPACING.POSTIT_PADDING}px`,
                margin: `${SPACING.POSTIT_MARGIN}px 0`
              }}>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0000ff',
                    textDecoration: 'underline',
                    fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`,
                    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
                    display: 'block',
                    marginBottom: `${SPACING.POSTIT_LINK_MARGIN_BOTTOM}px`
                  }}
                >
                  {event.name}
                </a>
                {event.description && (
                  <div style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`, color: '#000000', lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL }}>
                    {event.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Retro Computer Related Links Section */}
      <div style={{
        background: '#ffffff',
        border: BORDERS.BORDER_MEDIUM,
        padding: `${SPACING.PAGE_SECTION_PADDING}px`,
        marginBottom: `${SPACING.PAGE_SECTION_MARGIN_BOTTOM}px`
      }}>
        <h2 style={{
          fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`,
          fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
          color: '#000000',
          marginBottom: `${SPACING.PAGE_TITLE_MARGIN_BOTTOM}px`,
          fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF
        }}>
          RETRO COMPUTER RELATED LINKS
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${SPACING.POSTIT_GAP}px` }}>
          {retroComputerLinks.map((link, index) => {
            return (
              <div key={index} style={{
                padding: `${SPACING.POSTIT_PADDING}px`,
                margin: `${SPACING.POSTIT_MARGIN}px 0`
              }}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0000ff',
                    textDecoration: 'underline',
                    fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`,
                    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
                    display: 'block',
                    marginBottom: `${SPACING.POSTIT_LINK_MARGIN_BOTTOM}px`
                  }}
                >
                  {link.name}
                </a>
                {link.description && (
                  <div style={{ fontSize: `${TYPOGRAPHY.FONT_SIZE_MD}px`, color: '#000000', lineHeight: TYPOGRAPHY.LINE_HEIGHT_NORMAL }}>
                    {link.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
