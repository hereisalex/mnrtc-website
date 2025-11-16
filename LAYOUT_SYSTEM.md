# Layout System Documentation

## Overview

The layout system now properly uses constants from `lib/spacing.ts` through CSS custom properties. This ensures consistency and makes it easy to adjust spacing globally.

## Architecture

### 1. Spacing Constants (`lib/spacing.ts`)
- Defines all spacing, typography, layout, and design tokens
- Single source of truth for all measurements
- Exported as TypeScript constants

### 2. CSS Custom Properties (`app/globals.css`)
- CSS variables defined in `:root`
- Set dynamically from TypeScript constants in layout component
- Used throughout CSS for consistent spacing

### 3. Layout Component (`app/(public)/layout.tsx`)
- Imports spacing constants
- Sets CSS custom properties inline
- Manages page-specific logic (homepage vs other pages)

## Key CSS Variables

```css
:root {
  --viewport-top-margin: 18px;        /* Top margin of entire layout */
  --center-content-padding: 15px;     /* Padding inside center column (left, right, bottom) */
  --sidebar-left-width: 180px;        /* Left sidebar width */
  --sidebar-right-width: 200px;       /* Right sidebar width */
  --sidebar-horizontal-gap: 10px;     /* Gap between sidebars and center */
  --sidebar-section-gap: 10px;        /* Gap between sections in sidebar */
  --container-max-width: 1200px;      /* Max width of entire layout */
  
  /* Independent top spacing for each column */
  --left-sidebar-top-padding: 15px;   /* Top padding for left sidebar */
  --center-content-top-padding: 15px; /* Top padding for center content */
  --right-sidebar-top-padding: 15px;  /* Top padding for right sidebar */
}
```

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ <table class="retro-layout">                                │
│ ┌─────────────┬───────────────────────┬──────────────────┐ │
│ │ Left        │ Center Content        │ Right            │ │
│ │ Sidebar     │                       │ Sidebar          │ │
│ │ (180px)     │ (flexible width)      │ (200px)          │ │
│ │             │                       │                  │ │
│ │ padding:    │ padding: 15px all     │ padding:         │ │
│ │ 15px 10px   │                       │ 15px 0 0 10px    │ │
│ │ 0 0         │                       │                  │ │
│ └─────────────┴───────────────────────┴──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Sidebar Alignment

### Problem Solved
Sidebars need to align with the top of the center content area, and maintain the same position across all pages.

### Solution
1. **Sidebar cells** have top padding equal to `--center-content-padding` (15px)
2. **Center content** has padding of 15px on all sides
3. Both start at the same vertical position
4. **Sidebar content wrapper** (`.sidebar-content`) has no top padding, ensuring content starts at the same level

### Page Variations
- **Homepage**: Banner is inside center content, sidebars align with top of banner
- **Other pages**: Spacer div (168px) is inside center content, sidebars align with top of content area

## How to Adjust Spacing

### ⭐ To change top spacing for individual columns (MOST IMPORTANT):
1. Open `lib/spacing.ts`
2. Adjust these values independently:
   
   **For Homepage (with banner):**
   - `SPACING.LEFT_SIDEBAR_TOP_PADDING_HOME` - Controls left sidebar top spacing
   - `SPACING.CENTER_CONTENT_TOP_PADDING_HOME` - Controls center content top spacing
   - `SPACING.RIGHT_SIDEBAR_TOP_PADDING_HOME` - Controls right sidebar top spacing
   
   **For Other Pages (About, Blog, etc.):**
   - `SPACING.LEFT_SIDEBAR_TOP_PADDING_OTHER` - Controls left sidebar top spacing
   - `SPACING.CENTER_CONTENT_TOP_PADDING_OTHER` - Controls center content top spacing
   - `SPACING.RIGHT_SIDEBAR_TOP_PADDING_OTHER` - Controls right sidebar top spacing

3. Changes apply immediately via CSS custom properties

### To change sidebar width:
1. Update `LAYOUT.SIDEBAR_LEFT_WIDTH` or `LAYOUT.SIDEBAR_RIGHT_WIDTH` in `lib/spacing.ts`
2. CSS automatically updates via custom properties

### To change gap between columns:
1. Update `SPACING.SIDEBAR_SECTION_GAP` in `lib/spacing.ts`
2. Used for `--sidebar-horizontal-gap` variable

### To change content padding:
1. Update `SPACING.CENTER_CONTENT_PADDING` in `lib/spacing.ts`
2. Affects left, right, and bottom padding of center content

## Responsive Behavior

Mobile breakpoints (defined in `app/globals.css`):
- `@media (max-width: 768px)`: Sidebars stack vertically
- `@media (max-width: 480px)`: Further spacing adjustments
- `@media (max-width: 320px)`: Minimum width optimizations

## Best Practices

1. **Always use spacing constants**: Import from `lib/spacing.ts` instead of hardcoding values
2. **Use CSS variables in stylesheets**: Reference `var(--variable-name)` in CSS
3. **Set variables in layout component**: Pass TypeScript constants to CSS via inline styles
4. **Document changes**: Update this file when making layout modifications

## Common Issues & Solutions

### Issue: Sidebars not aligned with content
**Solution**: Ensure sidebar padding-top matches center-content padding

### Issue: Different alignment on homepage vs other pages
**Solution**: Sidebars should align with top of center content area (not with content inside it)

### Issue: Hardcoded values in CSS
**Solution**: Replace with CSS custom properties that reference spacing constants

## Files to Check

When making layout changes, review these files:
- `lib/spacing.ts` - Source of truth for all measurements
- `app/globals.css` - CSS custom properties and layout styles
- `app/(public)/layout.tsx` - Layout component that sets CSS variables
- `components/RetroSidebar.tsx` - Left sidebar content
- `components/InfoSidebar.tsx` - Right sidebar content

