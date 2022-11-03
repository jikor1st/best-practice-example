/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // **for svg
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // **for redirects
  // async redirects() {
  //   return [];
  // },
  // **for images domain
  // images: {
  //   domains: [],
  // },
};

module.exports = nextConfig;
