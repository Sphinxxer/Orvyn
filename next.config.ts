import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  devIndicators: false,
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/about", destination: "/#studio", permanent: true }
    ];
  }
};

export default nextConfig;
