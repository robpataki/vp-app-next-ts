/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images-nonprod.victorianplumbing.co.uk'],
  },
};

module.exports = nextConfig;
