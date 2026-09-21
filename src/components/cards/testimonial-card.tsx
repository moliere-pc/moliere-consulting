import type { Testimonial } from "@prisma/client";
import { Quote } from "lucide-react";
import { RatingStars } from "@/components/ui/rating-stars";
import { localized } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";

export function TestimonialCard({
  testimonial,
  locale,
}: {
  testimonial: Testimonial;
  locale: Locale;
}) {
  const initials = testimonial.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 shadow-soft">
      <Quote size={30} className="text-brand-200" fill="currentColor" />
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-700">
        “{localized(testimonial, "quote", locale)}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white">
          {initials}
        </span>
        <span>
          <span className="block text-sm font-bold text-ink-950">
            {testimonial.name}
          </span>
          <span className="block text-xs text-ink-400">
            {[localized(testimonial, "role", locale), testimonial.city]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </span>
        <RatingStars rating={testimonial.rating} className="ml-auto" size={14} />
      </figcaption>
    </figure>
  );
}
