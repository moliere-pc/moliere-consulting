import type { Metadata } from "next";

/**
 * Helpers SEO centralisés.
 *
 * Toutes les URLs sont relatives et résolues par Next.js via `metadataBase`
 * (défini dans [locale]/layout.tsx sur https://moliereservice.com).
 */

export const SITE_URL = "https://moliereservice.com";
export const DEFAULT_OG_IMAGE = "/images/seed/og-default.jpg";

export const SEO_LOCALES = ["fr", "en"] as const;

/** Construit l'URL d'une page pour une locale donnée (`path` sans préfixe de locale). */
export function localePath(locale: string, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

/**
 * Canonical + hreflang (fr, en, x-default) pour une page publique.
 * `path` est le chemin SANS préfixe de locale : "" (accueil), "/voyages", "/blog/mon-article"…
 */
export function pageAlternates(locale: string, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      fr: localePath("fr", path),
      en: localePath("en", path),
      "x-default": localePath("fr", path),
    },
  };
}

type PageMetadataInput = {
  /** Locale courante ("fr" | "en"). */
  locale: string;
  /** Chemin sans préfixe de locale ("" pour l'accueil). */
  path: string;
  /** Titre de la page (le template "· MOLIÈRE CONSULTING" du layout s'applique). */
  title?: string;
  /** Meta description de la page. */
  description?: string;
  /** Image Open Graph spécifique (chemin public) ; sinon image par défaut. */
  image?: string | null;
  /** Type Open Graph ; "article" pour les contenus éditoriaux datés. */
  ogType?: "website" | "article";
  /** Date de publication ISO (og:type article). */
  publishedTime?: string;
  /** Date de dernière modification ISO (og:type article). */
  modifiedTime?: string;
};

/**
 * Métadonnées complètes d'une page publique :
 * title + description + canonical/hreflang + Open Graph + Twitter Card.
 * Les champs absents héritent du layout ([locale]/layout.tsx).
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const ogImage = image || DEFAULT_OG_IMAGE;
  const alternates = pageAlternates(locale, path);
  const ogImageEntry = {
    url: ogImage,
    width: 1200,
    height: 630,
    alt: title ?? "MOLIÈRE CONSULTING",
  };

  const openGraph: Metadata["openGraph"] =
    ogType === "article"
      ? {
          type: "article",
          url: alternates.canonical,
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          images: [ogImageEntry],
          locale: locale === "en" ? "en_EN" : "fr_FR",
          alternateLocale: locale === "en" ? "fr_FR" : "en_EN",
          ...(publishedTime && { publishedTime }),
          ...(modifiedTime && { modifiedTime }),
        }
      : {
          type: "website",
          url: alternates.canonical,
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          images: [ogImageEntry],
          locale: locale === "en" ? "en_EN" : "fr_FR",
          alternateLocale: locale === "en" ? "fr_FR" : "en_EN",
        };

  return {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    alternates,
    openGraph,
    twitter: {
      card: "summary_large_image",
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      images: [ogImage],
    },
  };
}
