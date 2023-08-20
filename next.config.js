/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    svcPlugins: [['next-superjson-pligun', {}]],
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
