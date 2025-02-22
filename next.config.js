/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 0, // disable default in-memory caching
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 768, 1024, 1280, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 0, // https://nextjs.org/docs/app/api-reference/components/image#minimumcachettl
    // unoptimized: true, // Disable Next.js image cache (avoid storing images in /_next/image?url=)
    // Add your Cloudinary CDN domain and all other images provider domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-product.deltatre.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
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
        source: '/healthz/live',
        destination: '/api/healthz/live',
      },
      {
        source: '/healthz/ready',
        destination: '/api/healthz/ready',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemaps/sitemap',
      },
      {
        source: '/sitemap-index.xml',
        destination: '/api/sitemaps/sitemap-index',
      },
      {
        source: '/sitemap-:sitemapName.xml',
        destination: '/api/sitemaps/sitemap-entity?sitemapName=:sitemapName',
      },
    ];
  },
  generateBuildId: async () => process.env.VERSION ?? `build-${new Date().getTime()}`,
};

module.exports = nextConfig;