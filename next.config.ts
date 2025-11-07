import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Removed 'output: export' to enable API routes and server-side rendering for dashboard
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
  },
  // Only use basePath/assetPrefix for GitHub Pages, not for Vercel
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/mnrtc-website' : '',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/mnrtc-website' : '',
  // Fix workspace root detection
  turbopack: {
    root: process.cwd(),
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
