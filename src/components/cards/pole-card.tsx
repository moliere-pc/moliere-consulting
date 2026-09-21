import type { Pole } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/ui/icon";
import { SmartImage } from "@/components/ui/smart-image";
import { localized } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";

const ACCENTS: Record<string, string> = {
  voyages: "from-brand-700/85 to-ink-950/40",
  cargo: "from-gold-700/85 to-ink-950/40",
  "control-achat": "from-emerald-700/85 to-ink-950/40",
  "social-media": "from-ink-900/85 to-brand-900/40",
};

export function PoleCard({ pole, locale }: { pole: Pole; locale: Locale }) {
  return (
    <Link
      href={`/${pole.slug}` as never}
      prefetch={false}
      className="group relative block overflow-hidden rounded-3xl bg-ink-950 shadow-card"
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4]">
        <SmartImage
          src={pole.image}
          alt={localized(pole, "name", locale)}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 30vw"
          className="transition-transform duration-[900ms] ease-smooth group-hover:scale-110"
          priority
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${ACCENTS[pole.slug] ?? "from-ink-950/85 to-ink-950/20"}`}
        />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-gold-300 ring-1 ring-white/20 backdrop-blur transition-transform duration-500 ease-smooth group-hover:-translate-y-1.5">
            <Icon name={pole.icon} size={24} />
          </span>
          <h3 className="text-2xl font-bold text-white">
            {localized(pole, "name", locale)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/78">
            {localized(pole, "short", locale)}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-gold-300">
            {locale === "en" ? "Explore" : "Découvrir"}
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
