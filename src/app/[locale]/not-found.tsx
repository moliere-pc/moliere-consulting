"use client";

import { useTranslations } from "next-intl";
import { Home, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations();
  return (
    <section className="flex min-h-[70vh] items-center bg-cream px-6 py-32">
      <div className="mx-auto max-w-xl text-center">
        <span className="font-display text-8xl font-extrabold gradient-text-gold sm:text-9xl">
          404
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-ink-950 sm:text-4xl">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-500">
          {t("notFound.desc")}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            prefetch={false}
            className="inline-flex h-13 items-center gap-2 rounded-full bg-brand-gradient px-7 py-3 text-base font-semibold text-white shadow-card transition-all hover:brightness-110"
          >
            <Home size={18} />
            {t("common.backHome")}
          </Link>
          <a
            href="https://wa.me/327696307969"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center gap-2 rounded-full bg-whatsapp px-7 py-3 text-base font-semibold text-white transition-all hover:bg-whatsapp-dark"
          >
            <MessageCircle size={18} />
            {t("common.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
