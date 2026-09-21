"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@prisma/client";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import type { Locale } from "@/i18n/routing";

const GAP = 24; // gap-6

/**
 * Carrousel de témoignages basé sur le scroll-snap CSS natif :
 * swipe tactile fluide sur mobile (défilement à momentum du navigateur),
 * flèches et points de navigation synchronisés sur toutes les tailles d'écran.
 */
export function TestimonialsCarousel({
  testimonials,
  locale,
}: {
  testimonials: Testimonial[];
  locale: Locale;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const stepSize = useCallback((el: HTMLDivElement) => {
    // Structure : conteneur scrollable > piste flex > cartes.
    const track = el.firstElementChild as HTMLElement | null;
    const card = track?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + GAP : el.clientWidth;
  }, []);

  const syncFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const step = stepSize(el);
    const max = Math.max(0, Math.round((el.scrollWidth - el.clientWidth) / step));
    setMaxIndex(max);
    setIndex(Math.min(max, Math.round(el.scrollLeft / step)));
  }, [stepSize]);

  useEffect(() => {
    syncFromScroll();
    window.addEventListener("resize", syncFromScroll);
    return () => {
      window.removeEventListener("resize", syncFromScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [syncFromScroll, testimonials.length]);

  const handleScroll = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(syncFromScroll);
  };

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(maxIndex, i));
    el.scrollTo({ left: clamped * stepSize(el), behavior: "smooth" });
  };

  if (!testimonials.length) return null;

  return (
    <div>
      {/* Piste scrollable : swipe natif sur mobile, débordement aux bords de l'écran */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-hide -mx-5 snap-x snap-mandatory overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
      >
        <div className="flex gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="w-[88%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <TestimonialCard testimonial={t} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollTo(index - 1)}
          disabled={index === 0}
          aria-label="Précédent"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-800 transition-all hover:border-brand-300 hover:text-brand-700 disabled:opacity-40"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Témoignage ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-brand-600" : "w-2 bg-ink-200 hover:bg-ink-300"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollTo(index + 1)}
          disabled={index === maxIndex}
          aria-label="Suivant"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-800 transition-all hover:border-brand-300 hover:text-brand-700 disabled:opacity-40"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export function TestimonialsMasonry({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
