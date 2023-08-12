/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog-api-backend.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;
