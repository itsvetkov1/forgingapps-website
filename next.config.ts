import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    remotePatterns: [
      {        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    const rootPaths = ['about', 'ai-consulting', 'services', 'privacy', 'terms', 'blog', 'contact', 'demo'];
    return rootPaths.map(path => ({
      source: `/${path}`,
      destination: `/en/${path}`,
      permanent: true,
    }));
  },
};

export default nextConfig;