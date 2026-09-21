"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

export function LocaleSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    router.replace(pathname, { locale: next, scroll: false });
  }

  return (
    <div
      role="group"
      aria-label="Langue / Language"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border p-1",
        light
          ? "border-white/25 bg-white/10 backdrop-blur"
          : "border-ink-200 bg-white/70 backdrop-blur"
      )}
    >
      {LOCALES.map((l) => {
        const active = l.code === locale;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => switchTo(l.code)}
            aria-pressed={active}
            className={cn(
              "h-7 w-9 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ease-smooth",
              active
                ? "bg-brand-600 text-white shadow"
                : light
                  ? "text-white/80 hover:bg-white/10"
                  : "text-ink-500 hover:bg-ink-100"
            )}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
