"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { SmartImage } from "@/components/ui/smart-image";
import { cn } from "@/lib/utils";

export type ServiceCardData = {
  slug?: string;
  icon?: string | null;
  image?: string | null;
  title: string;
  short: string;
  href?: string;
  active?: boolean;
  onSelect?: () => void;
  marker?: string;
};

export function ServiceCard({
  icon,
  image,
  title,
  short,
  href,
  active,
  onSelect,
  marker,
}: ServiceCardData) {
  const Wrapper: typeof motion.article = motion.article;
  const inner = (
    <>
      {image ? (
        <div className="relative h-40 overflow-hidden">
          <SmartImage
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 92vw, 280px"
            className="transition-transform duration-700 ease-smooth group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
          <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-brand-700 shadow-soft">
            <Icon name={icon} size={22} />
          </span>
        </div>
      ) : (
        <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
          <Icon name={icon} size={24} />
        </span>
      )}
      <div className={cn(image ? "p-5" : "p-2 pt-0")}>
        {marker && (
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-gold-600">
            {marker}
          </span>
        )}
        <h3 className="text-lg font-bold leading-snug text-ink-950">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{short}</p>
        {href && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </>
  );

  const classes = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-300 ease-smooth",
    active
      ? "border-brand-500 shadow-glow ring-2 ring-brand-500/30"
      : "border-ink-100 shadow-soft hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-card"
  );

  if (href) {
    return (
      <Wrapper
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href={href} className={classes}>
          {inner}
        </a>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 24 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <button type="button" onClick={onSelect} className={cn(classes, "w-full text-left")}>
        {inner}
      </button>
    </Wrapper>
  );
}
