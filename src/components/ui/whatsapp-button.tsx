"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function contextKey(pathname: string): string {
  const clean = pathname
    .split("?")[0]
    .replace(/^\/(fr|en)/, "")
    .replace(/\/+$/, "");
  switch (clean) {
    case "":
    case "/":
      return "home";
    case "/voyages":
      return "voyages";
    case "/cargo":
      return "cargo";
    case "/control-achat":
      return "controlPurchase";
    case "/social-media":
      return "social";
    case "/formations":
      return "formations";
    default:
      return "default";
  }
}

export function useWhatsAppLink(number: string) {
  const pathname = usePathname();
  const t = useTranslations("whatsapp.context");
  const key = contextKey(pathname);
  const message = t(key);
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  return { href, message, key };
}

export function WhatsAppFloat({ number }: { number: string }) {
  const t = useTranslations("whatsapp");
  const { href } = useWhatsAppLink(number);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("floatLabel")}
      className={cn(
        "group fixed bottom-24 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white lg:bottom-7 lg:right-7",
        "shadow-[0_16px_36px_-10px_rgba(37,211,102,0.75)] transition-transform duration-300 ease-smooth hover:scale-110"
      )}
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" aria-hidden />
      <WhatsAppIcon size={28} />
      <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
        <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
      </span>
      <span className="pointer-events-none absolute right-[105%] hidden whitespace-nowrap rounded-full bg-ink-950 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-card transition-all duration-300 group-hover:opacity-100 sm:block">
        {t("floatLabel")}
      </span>
    </a>
  );
}

export function WhatsAppMobileBar({ number }: { number: string }) {
  const t = useTranslations("whatsapp");
  const { href } = useWhatsAppLink(number);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2.5 border-t border-emerald-600/30 bg-whatsapp px-4 py-3 text-base font-bold text-white shadow-[0_-8px_24px_-8px_rgba(37,211,102,0.6)] active:bg-whatsapp-dark"
    >
      <WhatsAppIcon size={22} />
      {t("mobileBar")}
    </a>
  );
}

export function WhatsAppLinkButton({
  href,
  children,
  size = "md",
  className,
}: {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6",
    lg: "h-13 px-8 py-3.5 text-base sm:text-lg",
  } as const;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full bg-whatsapp font-semibold text-white",
        "shadow-[0_14px_30px_-12px_rgba(37,211,102,0.7)] transition-all duration-300 ease-smooth hover:bg-whatsapp-dark active:scale-[0.98]",
        sizes[size],
        className
      )}
    >
      <MessageCircle size={size === "sm" ? 16 : 20} />
      {children}
    </a>
  );
}
