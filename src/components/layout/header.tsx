"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { LocaleSwitcher } from "./locale-switcher";
import { WhatsAppIcon, useWhatsAppLink } from "@/components/ui/whatsapp-button";
import { cn } from "@/lib/utils";

type NavItem = { href: `/${string}`; key: string };

const NAV: NavItem[] = [
  { href: "/", key: "home" },
  { href: "/voyages", key: "travel" },
  { href: "/cargo", key: "cargo" },
  { href: "/control-achat", key: "controlPurchase" },
  { href: "/social-media", key: "social" },
  { href: "/formations", key: "courses" },
  { href: "/blog", key: "blog" },
];

export function Header({ whatsappNumber }: { whatsappNumber: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { href: waHref } = useWhatsAppLink(whatsappNumber);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname, locale]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-smooth",
          scrolled
            ? "border-b border-ink-100 bg-white/95 py-2.5 shadow-soft sm:bg-white/85 sm:backdrop-blur-xl"
            : "border-b border-transparent bg-white/95 py-4 sm:bg-white/60 sm:backdrop-blur-md"
        )}
      >
        <div className="container-x flex items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                prefetch={false}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300",
                  isActive(item.href)
                    ? "text-brand-700"
                    : "text-ink-600 hover:text-ink-950"
                )}
              >
                {t(item.key)}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-600"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block">
              <LocaleSwitcher />
            </div>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-whatsapp px-3.5 text-sm font-semibold text-white shadow-[0_12px_26px_-12px_rgba(37,211,102,0.8)] transition-all duration-300 ease-smooth hover:bg-whatsapp-dark sm:px-4"
            >
              <WhatsAppIcon size={17} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white p-6 shadow-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-800"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      prefetch={false}
                      className={cn(
                        "block rounded-2xl px-4 py-3.5 text-lg font-bold transition-colors",
                        isActive(item.href)
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-800 hover:bg-ink-50"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2 flex flex-col gap-2"
                >
                  <Link
                    href="/a-propos"
                    prefetch={false}
                    className="rounded-2xl px-4 py-3 font-semibold text-ink-500 hover:bg-ink-50"
                  >
                    {t("about")}
                  </Link>
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="rounded-2xl px-4 py-3 font-semibold text-ink-500 hover:bg-ink-50"
                  >
                    {t("contact")}
                  </Link>
                </motion.div>
              </nav>

              <div className="mt-auto space-y-4">
                <LocaleSwitcher />
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2.5 rounded-full bg-whatsapp font-semibold text-white"
                >
                  <WhatsAppIcon size={20} />
                  WhatsApp
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
