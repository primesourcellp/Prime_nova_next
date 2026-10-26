import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export /products/index.html so it can sit beside /products/[code].
  // Without this, Apache sees the products directory and returns 403.
  trailingSlash: true,
  // Static export cannot serve a product code that was not known when the
  // dev server started. Production builds still export every catalog product.
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
