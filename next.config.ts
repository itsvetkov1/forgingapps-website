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
    return [
      {
        source: '/demo/veloura-support',
        destination: '/en/demo/veloura-support',
        permanent: true,
      },
      {
        source: '/demo/veloura-shop',
        destination: '/en/demo/veloura-shop',
        permanent: true,
      },
      {
        source: '/demo/veloura-shop/:path*',
        destination: '/en/demo/veloura-shop/:path*',
        permanent: true,
      },
      ...rootPaths.map(path => ({
        source: `/${path}`,
        destination: `/en/${path}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;