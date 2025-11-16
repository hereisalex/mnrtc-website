"use client";

import RetroSidebar from "@/components/RetroSidebar";
import InfoSidebar from "@/components/InfoSidebar";
import { usePathname } from "next/navigation";
import { SPACING, LAYOUT } from "@/lib/spacing";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const isGuestbook = pathname === "/guestbook";
  
  // Select spacing constants based on page type
  const leftSidebarTopPadding = isMainPage 
    ? SPACING.LEFT_SIDEBAR_TOP_PADDING_HOME 
    : SPACING.LEFT_SIDEBAR_TOP_PADDING_OTHER;
  const centerContentTopPadding = isMainPage 
    ? SPACING.CENTER_CONTENT_TOP_PADDING_HOME 
    : SPACING.CENTER_CONTENT_TOP_PADDING_OTHER;
  const rightSidebarTopPadding = isMainPage 
    ? SPACING.RIGHT_SIDEBAR_TOP_PADDING_HOME 
    : SPACING.RIGHT_SIDEBAR_TOP_PADDING_OTHER;
  
  return (
    <div
      style={{
        marginTop: `${SPACING.VIEWPORT_TOP_MARGIN}px`,
        // Set CSS variables from spacing constants at a wrapper level
        ['--viewport-top-margin' as string]: `${SPACING.VIEWPORT_TOP_MARGIN}px`,
        ['--center-content-padding' as string]: `${SPACING.CENTER_CONTENT_PADDING}px`,
        ['--sidebar-left-width' as string]: `${LAYOUT.SIDEBAR_LEFT_WIDTH}px`,
        ['--sidebar-right-width' as string]: `${LAYOUT.SIDEBAR_RIGHT_WIDTH}px`,
        ['--sidebar-horizontal-gap' as string]: `${SPACING.SIDEBAR_SECTION_GAP}px`,
        ['--sidebar-section-gap' as string]: `${SPACING.SIDEBAR_SECTION_GAP}px`,
        ['--container-max-width' as string]: `${LAYOUT.CONTAINER_MAX_WIDTH}px`,
        // Independent top spacing for each column (page-specific)
        ['--left-sidebar-top-padding' as string]: `${leftSidebarTopPadding}px`,
        ['--center-content-top-padding' as string]: `${centerContentTopPadding}px`,
        ['--right-sidebar-top-padding' as string]: `${rightSidebarTopPadding}px`,
      } as React.CSSProperties}
    >
      <table 
        className="retro-layout"
      >
        <tbody>
          <tr>
            <td className="left-sidebar">
              <RetroSidebar />
            </td>
            <td className="center-content">
              <main>
                {/* Spacer for non-homepage pages to match homepage banner height */}
                {!isMainPage && !isGuestbook && (
                  <div style={{ height: `${SPACING.HEADER_BANNER_TOTAL_HEIGHT}px` }} />
                )}
                {children}
              </main>
            </td>
            <td className="right-sidebar">
              <InfoSidebar />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
