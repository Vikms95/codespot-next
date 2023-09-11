/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog-api-backend.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;
