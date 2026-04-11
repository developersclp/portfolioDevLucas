import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizado para deploy em Railway (standalone output)
  output: "standalone",

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
