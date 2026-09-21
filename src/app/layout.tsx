import "@/app/globals.css";

/**
 * Layout racine « fantôme » (pattern next-intl avec segment [locale]).
 *
 * Les balises <html>/<body> sont fournies par [locale]/layout.tsx pour les
 * routes localisées et par not-found.tsx pour la 404 globale. Ce layout ne
 * fait que transmettre les enfants, mais permet à Next d'émettre le CSS
 * global (Tailwind) pour TOUTES les sorties — sans lui, la 404 globale
 * était servie sans aucune classe Tailwind.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
