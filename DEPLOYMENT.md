# Vercel Deployment Guide

This guide will help you deploy the MNRTC website to Vercel with full support for server-side rendering and the dashboard.

## Option 1: Vercel GitHub Integration (Recommended - Easiest)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add New Project"
   - Select your `mnrtc-website` repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the following:
     - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to `master`

## Option 2: GitHub Actions (Advanced)

If you prefer using GitHub Actions, you'll need to:

1. **Get Vercel Credentials**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel login`
   - Run `vercel link` in your project directory
   - This creates `.vercel` directory with project info

2. **Add GitHub Secrets**
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VERCEL_TOKEN` - Get from [vercel.com/account/tokens](https://vercel.com/account/tokens)
     - `VERCEL_ORG_ID` - Found in `.vercel/project.json` after linking
     - `VERCEL_PROJECT_ID` - Found in `.vercel/project.json` after linking

3. **Deploy**
   - Push to `master` branch
   - The workflow will automatically deploy to Vercel

## Features Enabled

✅ **Server-Side Rendering** - Dashboard pages work fully
✅ **API Routes** - All API endpoints functional
✅ **Static Generation** - Public pages are pre-rendered for performance
✅ **Dynamic Routes** - Blog posts and dashboard routes work correctly

## Custom Domain (Optional)

1. In Vercel project settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

- **Build fails**: Check that all environment variables are set in Vercel
- **Dashboard not working**: Ensure Supabase environment variables are configured
- **API routes 404**: Make sure you're not using `output: 'export'` in `next.config.ts`
