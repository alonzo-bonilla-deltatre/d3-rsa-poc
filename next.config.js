const tracer = require('dd-trace').init();
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // Defaults to 50MB
    isrMemoryCacheSize: 0,
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
