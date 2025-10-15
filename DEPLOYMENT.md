# Deployment Guide

## Quick Deploy to Vercel (Recommended)

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Next.js settings - just click "Deploy"

That's it! Your site will be live in minutes.

### Custom Domain

To use `mnretrotech.org`:
1. In your Vercel project settings, go to "Domains"
2. Add `mnretrotech.org`
3. Follow Vercel's instructions to update your DNS records

## Alternative Deployment Options

### Netlify

1. Push code to Git repository
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build command: `npm run build`
6. Publish directory: `.next`

### Self-Hosted (VPS/Server)

Requirements:
- Node.js 18+
- PM2 (recommended for process management)

```bash
# Clone the repository
git clone <your-repo-url>
cd mnrtc-website

# Install dependencies
npm install

# Build for production
npm run build

# Start the server (runs on port 3000 by default)
npm start

# Or use PM2 for production
npm install -g pm2
pm2 start npm --name "mnrtc-website" -- start
pm2 save
pm2 startup
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t mnrtc-website .
docker run -p 3000:3000 mnrtc-website
```

## Environment Variables

If you need environment variables (API keys, etc.), create a `.env.local` file:

```
# Example
NEXT_PUBLIC_SITE_URL=https://mnretrotech.org
```

Never commit `.env.local` to Git!

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test navigation between pages
- [ ] Check that external links work
- [ ] Test on mobile devices
- [ ] Verify blog posts are displaying
- [ ] Test contact links (email, Discord, etc.)
- [ ] Set up analytics (if desired)
- [ ] Submit sitemap to search engines

## Updating Content

### Adding Blog Posts

1. Create a new `.mdx` file in `content/blog/`
2. Include frontmatter with title, date, description, author, and tags
3. Commit and push changes
4. Vercel will automatically rebuild and deploy

### Updating Events

Currently, events are managed in `app/events/page.tsx`. To add dynamic events:
1. Create event files in `content/events/`
2. Update the events page to read from these files

## Performance Optimization

The site is already optimized, but for additional improvements:

- Enable Vercel's Image Optimization (automatic)
- Add a CDN (Vercel includes this)
- Enable gzip/brotli compression (automatic on Vercel)
- Monitor Core Web Vitals in Vercel Analytics

## Troubleshooting

### Build Fails

- Check Node.js version (needs 18+)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check for TypeScript errors: `npx tsc --noEmit`

### Images Not Loading

- Ensure images are in `public/images/`
- Check that paths start with `/images/` not `./images/`
- Verify image files were committed to Git

### Styles Not Applied

- Clear browser cache
- Check that Tailwind CSS is properly configured
- Verify `globals.css` is imported in `layout.tsx`

## Support

For deployment issues:
- Email: hello@mnretrotech.org
- Check Next.js docs: https://nextjs.org/docs
- Check Vercel docs: https://vercel.com/docs

