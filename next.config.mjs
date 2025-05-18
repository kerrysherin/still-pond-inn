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
}

export default nextConfig
