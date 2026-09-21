import type { Locale } from "@/i18n/routing";

/**
 * Sélecteur de champ bilingue (nameFr / nameEn) avec repli sur le français.
 * Fonction pure, utilisable côté client comme côté serveur.
 */
export function localized<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  locale: Locale
): string {
  const value = obj[`${field}${locale === "en" ? "En" : "Fr"}`];
  return (value ?? obj[`${field}Fr`] ?? "") as string;
}
