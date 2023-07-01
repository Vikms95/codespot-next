/** @type {import('next').NextConfig} */
const nextConfig = {
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
