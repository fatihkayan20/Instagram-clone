/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "instagram.fadb2-2.fna.fbcdn.net",
      "cdn.pixabay.com",
      "firebasestorage.googleapis.com",
      "instagram.fadb2-1.fna.fbcdn.net",
    ],
  },
};

module.exports = nextConfig;
