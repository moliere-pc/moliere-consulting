import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import Link from "next/link";
import {
  LayoutDashboard,
  Boxes,
  ListChecks,
  GraduationCap,
  Newspaper,
  Quote,
  HelpCircle,
  BarChart3,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "./actions";
import { LogoMark } from "@/components/ui/brand-mark";
import NavLink from "@/components/admin/nav-link";
import "@/app/globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Administration · MOLIÈRE CONSULTING",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/poles", label: "Pôles", icon: Boxes },
  { href: "/admin/services", label: "Services", icon: ListChecks },
  { href: "/admin/courses", label: "Formations", icon: GraduationCap },
  { href: "/admin/posts", label: "Articles", icon: Newspaper },
  { href: "/admin/testimonials", label: "Témoignages", icon: Quote },
  { href: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { href: "/admin/stats", label: "Statistiques", icon: BarChart3 },
  { href: "/admin/media", label: "Médiathèque", icon: ImageIcon },
  { href: "/admin/settings", label: "Réglages", icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  // Page de connexion : habillage minimal, sans sidebar
  if (!user) {
    return (
      <html lang="fr" className={cn(sora.variable, manrope.variable)}>
        <body className="min-h-screen bg-ink-950 font-sans antialiased">{children}</body>
      </html>
    );
  }

  return (
    <html lang="fr" className={cn(sora.variable, manrope.variable)}>
      <body className="min-h-screen bg-ink-50 font-sans text-ink-900 antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-ink-950 text-white lg:flex">
            <div className="px-6 py-6">
              <Link href="/admin" prefetch={false} className="flex items-center gap-3">
                <LogoMark className="h-10 w-10" />
                <span className="font-display text-lg font-extrabold tracking-tight text-white">
                  Admin
                </span>
              </Link>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
              {NAV.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={<item.icon size={18} className="shrink-0 text-gold-400/80" />}
                  label={item.label}
                />
              ))}
            </nav>
            <div className="space-y-3 border-t border-white/10 p-4">
              <Link
                href="/fr"
                target="_blank"
                prefetch={false}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/65 transition-colors hover:bg-white/8 hover:text-white"
              >
                <ExternalLink size={18} className="shrink-0 text-gold-400/80" />
                Voir le site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/65 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <LogOut size={18} className="shrink-0" />
                  Déconnexion
                </button>
              </form>
              <p className="truncate px-3.5 text-xs text-white/35">{user.email}</p>
            </div>
          </aside>

          {/* Contenu */}
          <div className="min-w-0 flex-1 lg:pl-64">
            {/* Barre mobile compacte */}
            <div className="flex items-center gap-1 overflow-x-auto border-b border-ink-150 bg-white px-4 py-2.5 lg:hidden">
              {NAV.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={<item.icon size={15} className="shrink-0 text-gold-400/80" />}
                  label={item.label}
                  className="shrink-0 !gap-1.5 !rounded-lg !px-3 !py-2 !text-xs !font-semibold !text-ink-500 hover:!bg-cream hover:!text-ink-900"
                />
              ))}
            </div>

            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
