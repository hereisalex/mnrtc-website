# Minnesota Retro Technology Club Website

A Mac OS 9-styled website for the Minnesota Retro Technology Club, built with Next.js 14.

## Features

- 🎨 Authentic Mac OS 9 aesthetic with custom UI components
- 📝 MDX-powered blog system
- 📅 Events calendar with upcoming meetings
- 🔗 Community resources and links
- 📱 Responsive design
- ♿ Accessible navigation
- 🚀 Optimized for performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX for blog posts
- **Icons**: React Icons
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment

Create a `.env.local` file with the following to enable persistent guestbook and visitor counter via Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Without these, the guestbook and counter will fall back to local-only behavior.

## Project Structure

```
mnrtc-website/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blog/              # Blog listing and posts
│   ├── events/            # Events calendar
│   ├── proposal/          # Club proposal
│   ├── resources/         # Community resources
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            
│   └── mac-ui/            # Mac OS 9 UI components
│       ├── MacWindow.tsx
│       ├── MacButton.tsx
│       ├── MacCard.tsx
│       ├── MacDialog.tsx
│       ├── MacCollapsible.tsx
│       └── MenuBar.tsx
├── content/
│   ├── blog/              # Blog posts (MDX)
│   └── events/            # Event data
├── lib/                   # Utility functions
│   └── blog.ts           # Blog post utilities
├── public/
│   └── images/           # Static images and logos
└── tailwind.config.ts    # Tailwind configuration
```

## Adding Content

### Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2025-10-15"
description: "A brief description"
author: "Your Name"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Events

Events are currently managed in `app/events/page.tsx`. For dynamic events, add JSON or MDX files to `content/events/`.

## Customization

### Colors

Mac OS 9 colors are defined in `app/globals.css` and `tailwind.config.ts`. Modify the CSS variables to adjust the color scheme.

### Fonts

The design uses Chicago font for headings and Geneva for body text. Add font files to `public/fonts/` or update the font-family declarations in `globals.css`.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- Any platform supporting Node.js

## Contributing

This is a community project! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

© 2025 Minnesota Retro Technology Club

## Contact

- Email: hello@mnretrotech.org
- Discord: https://discord.gg/hF9wh6gPcP
- Mailing List: https://groups.io/g/mnretrotech

---

Built with ❤️ for the retro computing community
