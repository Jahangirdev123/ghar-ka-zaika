import type { NextConfig } from "next";
import withPWA from "next-pwa";

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  cacheStartUrl: true,
  fallbacks: {
    document: "/offline.html",
  },
  disable: process.env.NODE_ENV === "development",
});
const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default pwa(nextConfig);
