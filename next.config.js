const tracer = require('dd-trace').init();
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: false,
    // Defaults to 50MB
    isrMemoryCacheSize: 0,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  images: {
    domains: [
      "via.placeholder.com",
      "images.unsplash.com",
      "res.cloudinary.com"
    ]
  }
}

module.exports = nextConfig
