/** @type {import('next').NextConfig} */
const nextConfig = {};
const path = require("path");
module.exports = nextConfig;

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
