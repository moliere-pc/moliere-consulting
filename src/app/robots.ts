import type { MetadataRoute } from "next";

const BASE = "https://moliereservice.com";

/**
 * robots.txt :
 * - tout est autorisé par défaut (contenu public indexable) ;
 * - /admin (et ses sous-routes, dont /admin/api) ainsi que /api sont interdits ;
 * - les URLs de prefetch React Server Components (?_rsc=…) sont exclues ;
 * - le sitemap est déclaré pour la Search Console ;
 * - les consignes destinées aux IA génératives sont dans /llms.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/*?_rsc="],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
