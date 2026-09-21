import { CheckCircle2 } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppLinkButton } from "@/components/ui/whatsapp-button";
import { cn } from "@/lib/utils";

export function PoleServiceSection({
  id,
  index,
  image,
  imageAlt,
  icon,
  title,
  html,
  bullets,
  ctaLabel,
  ctaHref,
}: {
  id: string;
  index: number;
  image: string | null;
  imageAlt: string;
  icon?: string | null;
  title: string;
  html: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const reversed = index % 2 === 1;
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 sm:py-24", index % 2 === 1 ? "bg-cream" : "bg-white")}
    >
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn(reversed && "lg:order-2")}>
          <div className="relative overflow-hidden rounded-[2rem] shadow-card">
            <div className="relative aspect-[4/3]">
              <SmartImage
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 92vw, 45vw"
                className="transition-transform duration-[1100ms] ease-smooth hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
            </div>
            <span className="absolute left-6 top-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/92 text-brand-700 shadow-card backdrop-blur">
              <Icon name={icon} size={28} />
            </span>
            <span className="absolute bottom-6 right-6 font-display text-6xl font-extrabold text-white/25">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <Reveal delay={1} className={cn(reversed && "lg:order-1")}>
          <h2 className="text-3xl font-extrabold leading-tight text-ink-950 sm:text-4xl">
            {title}
          </h2>
          <div
            className="prose-content mt-6 [&_p]:text-[0.975rem] [&_li]:text-[0.95rem]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {bullets.length > 0 && (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-ink-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-600" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8">
            <WhatsAppLinkButton href={ctaHref} size="lg">
              {ctaLabel}
            </WhatsAppLinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
