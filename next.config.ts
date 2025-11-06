import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Removed 'output: export' to enable API routes and server-side rendering for dashboard
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mnrtc-website' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/mnrtc-website' : '',
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
