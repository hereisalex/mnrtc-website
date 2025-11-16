# Spacing Quick Reference Guide

## 🎯 Most Common Adjustments

### Adjust Top Spacing for Each Column Independently

**File:** `lib/spacing.ts`

```typescript
export const SPACING = {
  // ... other constants ...
  
  // Individual column top spacing - HOMEPAGE (with banner)
  LEFT_SIDEBAR_TOP_PADDING_HOME: 15,    // ← Left sidebar on homepage
  CENTER_CONTENT_TOP_PADDING_HOME: 15,  // ← Center content on homepage
  RIGHT_SIDEBAR_TOP_PADDING_HOME: 15,   // ← Right sidebar on homepage
  
  // Individual column top spacing - OTHER PAGES (with spacer)
  LEFT_SIDEBAR_TOP_PADDING_OTHER: 15,   // ← Left sidebar on other pages
  CENTER_CONTENT_TOP_PADDING_OTHER: 15, // ← Center content on other pages
  RIGHT_SIDEBAR_TOP_PADDING_OTHER: 15,  // ← Right sidebar on other pages
}
```

**Example:** To move the left sidebar down by 10px on homepage only:
```typescript
LEFT_SIDEBAR_TOP_PADDING_HOME: 25,  // Changed from 15 to 25
LEFT_SIDEBAR_TOP_PADDING_OTHER: 15, // Unchanged
```

---

## 📐 All Adjustable Spacing Values

### In `lib/spacing.ts`:

| Constant | Default | Description |
|----------|---------|-------------|
| `VIEWPORT_TOP_MARGIN` | 18px | Space from browser top to entire layout |
| **Homepage Top Spacing** | | |
| `LEFT_SIDEBAR_TOP_PADDING_HOME` | 15px | **Left sidebar top spacing (homepage)** |
| `CENTER_CONTENT_TOP_PADDING_HOME` | 15px | **Center content top spacing (homepage)** |
| `RIGHT_SIDEBAR_TOP_PADDING_HOME` | 15px | **Right sidebar top spacing (homepage)** |
| **Other Pages Top Spacing** | | |
| `LEFT_SIDEBAR_TOP_PADDING_OTHER` | 15px | **Left sidebar top spacing (other pages)** |
| `CENTER_CONTENT_TOP_PADDING_OTHER` | 15px | **Center content top spacing (other pages)** |
| `RIGHT_SIDEBAR_TOP_PADDING_OTHER` | 15px | **Right sidebar top spacing (other pages)** |
| **Other Spacing** | | |
| `CENTER_CONTENT_PADDING` | 15px | Left, right, bottom padding of center |
| `SIDEBAR_SECTION_GAP` | 10px | Horizontal gap between columns |
| `LAYOUT.SIDEBAR_LEFT_WIDTH` | 180px | Width of left sidebar |
| `LAYOUT.SIDEBAR_RIGHT_WIDTH` | 200px | Width of right sidebar |
| `LAYOUT.CONTAINER_MAX_WIDTH` | 1200px | Max width of entire layout |

---

## 🔄 How Changes Flow

```
lib/spacing.ts (TypeScript constants)
         ↓
app/(public)/layout.tsx (Sets CSS variables)
         ↓
app/globals.css (Uses CSS variables)
         ↓
Browser renders with updated spacing
```

---

## 📝 Common Scenarios

### Scenario 1: Align all three columns at the same height on homepage
Set all three homepage values to the same:
```typescript
LEFT_SIDEBAR_TOP_PADDING_HOME: 20,
CENTER_CONTENT_TOP_PADDING_HOME: 20,
RIGHT_SIDEBAR_TOP_PADDING_HOME: 20,
```

### Scenario 2: Different alignment for homepage vs other pages
```typescript
// Homepage - sidebars start lower
LEFT_SIDEBAR_TOP_PADDING_HOME: 30,
CENTER_CONTENT_TOP_PADDING_HOME: 15,
RIGHT_SIDEBAR_TOP_PADDING_HOME: 30,

// Other pages - all aligned
LEFT_SIDEBAR_TOP_PADDING_OTHER: 20,
CENTER_CONTENT_TOP_PADDING_OTHER: 20,
RIGHT_SIDEBAR_TOP_PADDING_OTHER: 20,
```

### Scenario 3: Stagger the three columns on all pages
```typescript
// Homepage
LEFT_SIDEBAR_TOP_PADDING_HOME: 10,
CENTER_CONTENT_TOP_PADDING_HOME: 20,
RIGHT_SIDEBAR_TOP_PADDING_HOME: 30,

// Other pages (same stagger pattern)
LEFT_SIDEBAR_TOP_PADDING_OTHER: 10,
CENTER_CONTENT_TOP_PADDING_OTHER: 20,
RIGHT_SIDEBAR_TOP_PADDING_OTHER: 30,
```

---

## ⚠️ Important Notes

1. **All values are in pixels** - Don't include "px" in spacing.ts, it's added automatically
2. **Changes require dev server restart** - After editing spacing.ts, restart `npm run dev`
3. **CSS variables are set dynamically** - The layout component passes TypeScript constants to CSS
4. **Single source of truth** - Always edit spacing.ts, never hardcode values in CSS

---

## 🐛 Troubleshooting

**Problem:** Changes to spacing.ts don't appear
- **Solution:** Restart the dev server (`npm run dev`)

**Problem:** Columns not aligned as expected
- **Solution:** Check that all three `*_TOP_PADDING` values are set correctly

**Problem:** Spacing different on homepage vs other pages
- **Solution:** This is intentional - homepage has banner, other pages have spacer

---

## 📚 Related Files

- `lib/spacing.ts` - **Edit this to change spacing**
- `app/(public)/layout.tsx` - Passes constants to CSS
- `app/globals.css` - Uses CSS variables
- `LAYOUT_SYSTEM.md` - Detailed documentation

