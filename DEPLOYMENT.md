# GitHub Pages Deployment Guide

This guide will help you deploy the Minnesota Retro Technology Club website to GitHub Pages.

## Prerequisites

- GitHub repository: `hereisalex/mnrtc-website`
- GitHub Pages enabled on your repository

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to the `main` branch

### 2. Repository Settings

Make sure your repository has the following settings:
- **Repository visibility**: Public (required for GitHub Pages)
- **Pages source**: GitHub Actions

### 3. Automatic Deployment

The site will automatically deploy when you:
- Push commits to the `main` branch
- Merge pull requests to `main`
- Manually trigger the workflow from the Actions tab

## Manual Deployment

If you need to deploy manually:

```bash
# Install dependencies
npm install

# Build the site
npm run build

# The static files will be generated in the `out/` directory
```

## Site URL

Once deployed, your site will be available at:
`https://hereisalex.github.io/mnrtc-website/`

## Configuration Details

- **Static Export**: Configured for static site generation
- **Image Optimization**: Disabled for static export compatibility
- **Trailing Slashes**: Enabled for better GitHub Pages compatibility
- **Output Directory**: `out/`

## Troubleshooting

### Build Fails
- Check that all dependencies are properly installed
- Ensure all image files are present in the `public/images/` directory
- Verify that all external links are accessible

### Pages Not Loading
- Check the Actions tab for deployment logs
- Verify GitHub Pages is enabled in repository settings
- Ensure the repository is public

### Styling Issues
- Clear browser cache
- Check that CSS files are properly generated in the `out/` directory

## Local Testing

To test the static export locally:

```bash
# Build and export
npm run build

# Serve the static files (install serve globally first)
npx serve out
```

## Support

For issues with deployment, check:
1. GitHub Actions workflow logs
2. Repository settings
3. This deployment guide

The site features a retro GeoCities aesthetic with moveable and resizable windows, perfect for showcasing the Minnesota Retro Technology Club!