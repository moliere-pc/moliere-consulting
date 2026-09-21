import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  eslint: {
    // Le lint manuel reste disponible via `npm run lint` ; le build s'appuie sur le typage strict.
    ignoreDuringBuilds: true,
  },
  // Compression gzip côté serveur (PageSpeed).
  compress: true,
  // Ne pas exposer l'en-tête X-Powered-By (sécurité).
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Durée minimale de cache des images optimisées (31 jours).
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        // En-têtes de sécurité sur tout le site.
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
      {
        // Médias statiques à noms uniques : cache immuable d'un an (PageSpeed).
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/uploads/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
