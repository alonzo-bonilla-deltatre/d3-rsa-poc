/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    // Defaults to 50MB
    isrMemoryCacheSize: 0,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/manifest.json',
        destination: '/api/manifest',
      },
    ];
  }
}

module.exports = nextConfig