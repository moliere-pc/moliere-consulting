"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Globe2, Sparkles } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { WhatsAppLinkButton } from "@/components/ui/whatsapp-button";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero({
  badge,
  titleLine1,
  titleLine2,
  subtitle,
  primaryLabel,
  secondaryLabel,
  whatsappHref,
  image,
  trust1,
  trust2,
  trust3,
}: {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
  whatsappHref: string;
  image: string;
  trust1: string;
  trust2: string;
  trust3: string;
}) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-ken-burns">
          <SmartImage
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="opacity-55"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(11,11,15,0.92) 0%, rgba(11,11,15,0.72) 42%, rgba(11,11,15,0.35) 100%), linear-gradient(0deg, rgba(11,11,15,0.75) 0%, transparent 55%)",
          }}
        />
        <div className="absolute inset-0 bg-hero-radial opacity-80" />
      </div>

      <div className="container-x relative pb-24 pt-32 sm:pt-36">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-300 backdrop-blur sm:text-sm"
        >
          <Sparkles size={15} />
          {badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="mt-6 max-w-4xl text-[2.6rem] font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          {titleLine1}
          <br />
          <span className="gradient-text-gold">{titleLine2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <WhatsAppLinkButton href={whatsappHref} size="lg">
            {primaryLabel}
          </WhatsAppLinkButton>
          <a
            href="#poles"
            className="group inline-flex h-13 items-center gap-2.5 rounded-full border border-white/25 bg-white/8 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-all duration-300 ease-smooth hover:border-gold-300/60 hover:bg-white/14 sm:text-lg"
          >
            {secondaryLabel}
            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-white/65"
        >
          <li className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-gold-400" />
            {trust1}
          </li>
          <li className="inline-flex items-center gap-2">
            <Globe2 size={16} className="text-gold-400" />
            {trust2}
          </li>
          <li className="inline-flex items-center gap-2">
            <Sparkles size={16} className="text-gold-400" />
            {trust3}
          </li>
        </motion.ul>
      </div>

      <motion.a
        href="#poles"
        aria-label="Défiler vers le bas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/55 sm:flex"
      >
        <span className="h-10 w-6 rounded-full border-2 border-white/30 p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="block h-2 w-2 rounded-full bg-gold-300"
          />
        </span>
      </motion.a>
    </section>
  );
}
