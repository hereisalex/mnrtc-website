// Consistent design tokens used across the entire application
// Update these values to adjust spacing, typography, borders, and other design elements globally

export const SPACING = {
  // Header banner (main page)
  HEADER_BANNER_HEIGHT: 120, // Approximate height of header banner image
  HEADER_BANNER_MARGIN_TOP: 20, // Margin-top of banner from CSS (.banner class)
  HEADER_BANNER_PADDING: 4, // Padding inside banner div
  HEADER_BANNER_BORDER: 4, // Border width (BORDER_OUTSET)
  HEADER_BANNER_IMAGE_BORDER: 1, // Border width of image inside banner
  HEADER_BANNER_GAP: 20, // Gap after banner (from flex gap in homepage)
  
  // Total space taken by banner on homepage (for spacer on other pages)
  // margin-top (20px) + padding top (4px) + image height (120px) + padding bottom (4px) + gap (20px) = 168px
  HEADER_BANNER_TOTAL_HEIGHT: 20 + 4 + 120 + 4 + 20, // 168px
  
  // Consistent top spacing from viewport
  VIEWPORT_TOP_MARGIN: 18, // Space from viewport top to content (consistent across all pages)
  
  // Logo positioning
  LOGO_TOP_MARGIN: 38, // Space from viewport top to logo (reduced from 25px) - now matches VIEWPORT_TOP_MARGIN
  LOGO_LEFT_OFFSET: 10, // Left offset for logo positioning
  LOGO_CONTAINER_WIDTH: 180, // Width of logo container (matches sidebar width)
  LOGO_MAX_WIDTH: 180, // Maximum width of logo image (matches container width to prevent overlap)
  LOGO_HEIGHT: 108, // Approximate logo height (250px width with aspect ratio, enlarged)
  LOGO_TO_NAV_GAP: 5, // Gap between logo bottom and Navigation header (reduced to bring logo closer to nav)
  
  // Consistent top spacing for all pages (ensures sidebars/content align)
  // This should match: logo top margin + logo height + gap = 18 + 108 + 5 = 131px
  // Set to 125px to reduce spacing between logo and navigation while preventing overlap
  CONTENT_START_TOP: 125, // Top spacing for three-column layout (ensures logo doesn't overlap content)
  
  // Navigation header
  NAV_HEADER_HEIGHT: 57, // Navigation h3 height (38px font + line-height + margins) - updated for larger font
  NAV_HEADER_MARGIN_BOTTOM: 6, // Margin below navigation header (reduced from 8px)
  NAV_HEADER_PADDING_BOTTOM: 4, // Padding below navigation header (reduced from 5px)
  NAV_TO_BUTTON_GAP: 2, // Gap between Navigation header and first button (reduced from 3px)
  
  // Sidebar spacing
  SIDEBAR_PADDING: 8, // Sidebar internal padding (reduced from 10px)
  SIDEBAR_SECTION_GAP: 10, // Gap between sections in sidebar (reduced from 15px)
  SIDEBAR_BUTTON_GAP: 2, // Gap between buttons/links in sidebar (reduced from 3px)
  SIDEBAR_FOOTER_PADDING_TOP: 4, // Footer padding top in sidebar (reduced from 5px)
  
  // Center content spacing
  CENTER_CONTENT_PADDING: 15, // Default padding for center content (left, right, bottom)
  
  // Individual column top spacing - HOMEPAGE (with banner)
  LEFT_SIDEBAR_TOP_PADDING_HOME: 25, // Top padding for left sidebar on homepage
  CENTER_CONTENT_TOP_PADDING_HOME: 15, // Top padding for center content on homepage
  RIGHT_SIDEBAR_TOP_PADDING_HOME: 175, // Top padding for right sidebar on homepage
  
  // Individual column top spacing - OTHER PAGES (with spacer)
  LEFT_SIDEBAR_TOP_PADDING_OTHER: 15, // Top padding for left sidebar on other pages
  CENTER_CONTENT_TOP_PADDING_OTHER: 55, // Top paddng for center content on other pages
  RIGHT_SIDEBAR_TOP_PADDING_OTHER: 175, // Top padding for right sidebar on other pages
  
  // Note: Sidebar alignment is now handled by CSS using calc() and CSS variables
  // See .sidebar-content in globals.css for the alignment logic
  // This ensures consistent spacing without manual pixel calculations
  
  // Page content spacing 
  PAGE_SECTION_MARGIN_BOTTOM: 14, // Margin between page sections (reduced from 20px)
  PAGE_SECTION_PADDING: 12, // Padding inside page sections (reduced from 15px)
  PAGE_TITLE_MARGIN_BOTTOM: 8, // Margin below page title (reduced from 10px)
  PAGE_SUBTITLE_MARGIN_BOTTOM: 7, // Margin below subtitle/description (reduced from 10px)
  PAGE_DISCLAIMER_MARGIN_BOTTOM: 10, // Margin below disclaimer text (reduced from 15px)
  
  // Post-it note / link item spacing
  POSTIT_PADDING: 8, // Padding inside post-it note items (reduced from 10px)
  POSTIT_MARGIN: 3, // Margin between post-it note items (reduced from 4px)
  POSTIT_GAP: 6, // Gap between post-it notes in grid/flex (reduced from 8px)
  POSTIT_LINK_MARGIN_BOTTOM: 3, // Margin below link text in post-it (reduced from 4px)
  
  // Link button spacing
  LINK_BUTTON_PADDING: '3px 6px', // Padding for link buttons
  LINK_BUTTON_MARGIN: '2px 0', // Margin for link buttons
  
  // Text spacing
  TEXT_MARGIN_BOTTOM: 4, // Standard margin below text elements (reduced from 5px)
  
  // Calculated values
  // Total space from sidebar top to first button (main page)
  SIDEBAR_TO_FIRST_BUTTON: 8 + 57 + 2, // padding + nav header + gap = 67px (updated for reduced spacing)
  
  // Total space from viewport top to first button (non-main pages)
  VIEWPORT_TO_FIRST_BUTTON: 18 + 108 + 5 + 8 + 57 + 2, // logo margin + logo height + gap + sidebar padding + nav header + gap = 198px (updated for closer logo)
  
  // Total space from viewport top to page title (non-main pages)
  VIEWPORT_TO_PAGE_TITLE: 18 + 108 + 5 + 15, // logo margin + logo height + gap + center content padding = 146px (updated for closer logo)
} as const;

// Typography constants
export const TYPOGRAPHY = {
  // Font families
  FONT_FAMILY_SERIF: "'Times New Roman', 'Times', serif",
  FONT_FAMILY_MONOSPACE: "'Courier New', monospace",
  
  // Base font size
  BASE_FONT_SIZE: 24, // Body text default (from globals.css) - increased 35% from 18px
  
  // Font sizes (in pixels) - increased 35% across the board for better legibility
  FONT_SIZE_XS: 9,   // Extra small (calendar day indicators, tiny labels) - was 10px
  FONT_SIZE_SM: 10,   // Small (webring badge, small labels) - was 11px
  FONT_SIZE_TINY: 14, // Tiny (disclaimers, fine print) - was 12px
  FONT_SIZE_XXS: 16,  // Extra extra small (calendar dates, small buttons) - was 13px
  FONT_SIZE_BASE: 17, // Base (buttons, links, standard text) - was 15px
  FONT_SIZE_MD: 21,   // Medium (subheadings, medium text) - was 17px
  FONT_SIZE_LG: 26,   // Large (section headers, sidebar headers) - was 19px
  FONT_SIZE_XL: 27,   // Extra large (page section titles, calendar header) - was 22px
  FONT_SIZE_XXL: 28, // Extra extra large (page titles, visitor counter) - was 26px
  FONT_SIZE_HUGE: 30, // Huge (main navigation header) - was 28px
  FONT_SIZE_DISPLAY: 43, // Display (large page titles) - was 32px
  
  // Font weights
  FONT_WEIGHT_NORMAL: 'normal',
  FONT_WEIGHT_BOLD: 'bold',
  FONT_WEIGHT_MEDIUM: 500,
  
  // Line heights
  LINE_HEIGHT_TIGHT: 1.2,
  LINE_HEIGHT_NORMAL: 1.4,
  LINE_HEIGHT_RELAXED: 1.6,
  
  // Letter spacing
  LETTER_SPACING_NORMAL: '0.5px',
} as const;

// Border constants
export const BORDERS = {
  // Border widths (in pixels)
  BORDER_WIDTH_THIN: 1,   // Thin borders (calendar cells, small elements)
  BORDER_WIDTH_MEDIUM: 2, // Medium borders (sections, standard elements)
  BORDER_WIDTH_THICK: 3,  // Thick borders (terminal, prominent elements)
  BORDER_WIDTH_EXTRA_THICK: 4, // Extra thick (banner, major elements)
  
  // Border styles
  BORDER_STYLE_SOLID: 'solid',
  BORDER_STYLE_DASHED: 'dashed',
  BORDER_STYLE_OUTSET: 'outset',
  BORDER_STYLE_INSET: 'inset',
  
  // Border radius (in pixels)
  BORDER_RADIUS_NONE: 0,
  BORDER_RADIUS_SM: 2,   // Small radius (error boxes, small elements)
  BORDER_RADIUS_MD: 4,   // Medium radius (terminal, standard elements)
  BORDER_RADIUS_LG: 6,   // Large radius (buttons, cards)
  BORDER_RADIUS_XL: 8,   // Extra large radius (large cards, modals)
  
  // Common border shorthand
  BORDER_THIN: '1px solid #000000',
  BORDER_MEDIUM: '2px solid #000000',
  BORDER_THICK: '3px solid #000000',
  BORDER_OUTSET: '4px outset #c0c0c0',
  BORDER_DASHED: '1px dashed #999',
} as const;

// Button constants
export const BUTTONS = {
  // Button padding
  BUTTON_PADDING_SM: '2px 6px',   // Small buttons (calendar nav, tiny buttons)
  BUTTON_PADDING_MD: '3px 6px',   // Medium buttons (link buttons, standard)
  BUTTON_PADDING_LG: '4px 8px',   // Large buttons (navigation buttons, prominent)
  BUTTON_PADDING_XL: '5px 10px',  // Extra large buttons (primary actions)
  
  // Button margins
  BUTTON_MARGIN_SM: '2px 0',      // Small margin (link buttons)
  BUTTON_MARGIN_MD: '4px 0',      // Medium margin (standard buttons)
  BUTTON_MARGIN_LG: '8px 0',      // Large margin (prominent buttons)
  
  // Button font sizes
  BUTTON_FONT_SIZE_SM: TYPOGRAPHY.FONT_SIZE_XXS, // 11px
  BUTTON_FONT_SIZE_MD: TYPOGRAPHY.FONT_SIZE_BASE, // 12px
  BUTTON_FONT_SIZE_LG: TYPOGRAPHY.FONT_SIZE_MD, // 14px
  
  // Button font weights
  BUTTON_FONT_WEIGHT: TYPOGRAPHY.FONT_WEIGHT_BOLD,
  
  // Button heights (approximate, for reference)
  BUTTON_HEIGHT_SM: 18, // Small button height
  BUTTON_HEIGHT_MD: 22, // Medium button height
  BUTTON_HEIGHT_LG: 28, // Large button height
} as const;

// Layout constants
export const LAYOUT = {
  // Container widths
  CONTAINER_MAX_WIDTH: 1200, // Maximum width of main container
  SIDEBAR_LEFT_WIDTH: 180,   // Left sidebar width
  SIDEBAR_RIGHT_WIDTH: 200,  // Right sidebar width
  
  // Z-index layers
  Z_INDEX_LOGO: 100,        // Logo layer
  Z_INDEX_MODAL: 1000,      // Modal/dialog layer
  Z_INDEX_DROPDOWN: 10,     // Dropdown menu layer
} as const;

// Shadow constants
export const SHADOWS = {
  SHADOW_NONE: 'none',
  SHADOW_SM: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  SHADOW_MD: '2px 2px 0 #999999, 4px 4px 0 rgba(0, 0, 0, 0.1)',
  SHADOW_LG: '2px 2px 4px rgba(0, 0, 0, 0.3), 4px 4px 8px rgba(0, 0, 0, 0.2)',
} as const;

