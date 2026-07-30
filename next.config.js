const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'via.placeholder.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;