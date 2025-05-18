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
  // Ensure video files are properly served
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
    ];
  },
}

export default nextConfig
