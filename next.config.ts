import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.shopvnb.com',
      },
      {
        protocol: 'https',
        hostname: 'thethaodonga.com',
      },
      {
        protocol: 'https',
        hostname: 'us.yonex.com',
      },
      {
        protocol: 'https',
        hostname: '**.britannica.com',
      },
      {
        protocol: 'https',
        hostname: 'www.racquetpoint.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
};

export default nextConfig;
