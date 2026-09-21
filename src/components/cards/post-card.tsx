import type { Post } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SmartImage } from "@/components/ui/smart-image";
import { localized } from "@/lib/localized";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";

export function PostCard({
  post,
  locale,
  categoryLabel,
}: {
  post: Post;
  locale: Locale;
  categoryLabel: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}` as never}
      prefetch={false}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-card"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <SmartImage
          src={post.image}
          alt={localized(post, "title", locale)}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className="transition-transform duration-[800ms] ease-smooth group-hover:scale-108"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-brand-700 shadow-soft backdrop-blur">
          {categoryLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold text-ink-400">
          {formatDate(post.publishedAt, locale)}
        </span>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink-950 transition-colors group-hover:text-brand-700">
          {localized(post, "title", locale)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
          {localized(post, "excerpt", locale)}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
