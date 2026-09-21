import type { Course } from "@prisma/client";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SmartImage } from "@/components/ui/smart-image";
import { localized } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";

function formatLabel(value: string | null | undefined, map: Record<string, string>) {
  if (!value) return null;
  return map[value] ?? value;
}

export function CourseCard({
  course,
  locale,
  formatLabels,
  levelLabels,
  onDemand,
  discover,
}: {
  course: Course;
  locale: Locale;
  formatLabels: Record<string, string>;
  levelLabels: Record<string, string>;
  onDemand: string;
  discover: string;
}) {
  return (
    <Link
      href={`/formations/${course.slug}` as never}
      prefetch={false}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={course.image}
          alt={localized(course, "title", locale)}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className="transition-transform duration-[800ms] ease-smooth group-hover:scale-108"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {course.format && (
            <span className="rounded-full bg-ink-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {formatLabel(course.format, formatLabels)}
            </span>
          )}
          {course.level && (
            <span className="rounded-full bg-brand-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {formatLabel(course.level, levelLabels)}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-ink-950">
          {localized(course, "title", locale)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
          {localized(course, "excerpt", locale)}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
          <span className="text-sm font-bold text-brand-700">
            {course.price ? course.price : onDemand}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-400 transition-all duration-300 group-hover:gap-2.5 group-hover:text-brand-700">
            {discover}
            <ArrowRight size={15} />
          </span>
        </div>
        {course.duration && (
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-400">
            <Clock size={13} />
            {course.duration}
          </span>
        )}
      </div>
    </Link>
  );
}
