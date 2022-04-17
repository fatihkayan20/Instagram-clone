/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["scontent.cdninstagram.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
