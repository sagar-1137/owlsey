import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the live dev cache isolated from production builds. Running
  // `npm run build` while `next dev` is open must not invalidate HMR.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  allowedDevOrigins: ['127.0.0.1'],
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
