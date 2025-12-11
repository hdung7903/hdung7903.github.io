/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '',
  assetPrefix: '',
  // Modern JavaScript - target ES2020+ browsers (reduce legacy JS)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize package imports for better code splitting
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Note: Headers don't work with static export
  // Cache headers should be configured at the server/CDN level (Cloudflare, etc.)
};

module.exports = nextConfig;
