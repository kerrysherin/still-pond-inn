/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['l.icdbcdn.com', 'sjc.microlink.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'l.icdbcdn.com',
        pathname: '/oh/**',
      },
      {
        protocol: 'https',
        hostname: 'sjc.microlink.io',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Add proper handling for video files
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
      {
        source: '/videos/:path*.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'image/png',
          },
        ],
      },
    ];
  },
}

export default nextConfig
