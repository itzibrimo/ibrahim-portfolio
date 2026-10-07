import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable source maps in production for security
  productionBrowserSourceMaps: false,

  // Image optimization — local assets only; no remote wildcard (SSRF hardening)
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers — applied to all routes
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Download-Options", value: "noopen" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "media-src 'self' blob:",
              "connect-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // firebase-admin must not be bundled — it belongs on the Node server only
  serverExternalPackages: ["firebase-admin"],

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  // Compression
  compress: true,

  // Powered by header removal
  poweredByHeader: false,

  // Strict transport security (HSTS) - handled by middleware
};

export default nextConfig;