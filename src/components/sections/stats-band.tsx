import type { Stat } from "@prisma/client";
import { localized } from "@/lib/localized";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import type { Locale } from "@/i18n/routing";

export function StatsBand({ stats, locale }: { stats: Stat[]; locale: Locale }) {
  if (!stats.length) return null;
  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 300px at 50% 0%, rgba(205,7,30,0.22), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="container-x relative">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.id} delay={i} className="text-center">
              <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-gold-300 ring-1 ring-white/15">
                <Icon name={stat.icon} size={24} />
              </span>
              <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                <span className="gradient-text-gold">{stat.value}</span>
              </div>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-white/55">
                {localized(stat, "label", locale)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
