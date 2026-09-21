import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";
import { getPublishedPosts } from "@/lib/content";
import { localized } from "@/lib/localized";
import { whatsappUrl } from "@/lib/whatsapp";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { PostCard } from "@/components/cards/post-card";
import { CtaBand } from "@/components/sections/cta-band";
import { cn } from "@/lib/utils";

const CATEGORIES = ["ALL", "VOYAGE", "CARGO", "DIGITAL", "OPPORTUNITIES"] as const;
type Category = (typeof CATEGORIES)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/blog",
    title: locale === "en" ? "Blog — Advice & opportunities" : "Blog — Conseils & opportunités",
    description:
      locale === "en"
        ? "Practical advice and news on China & Canada visas, scholarships and import-export opportunities, from the MOLIÈRE CONSULTING team."
        : "Conseils pratiques et actualités des visas Chine & Canada, bourses d'études et opportunités d'import-export, par l'équipe MOLIÈRE CONSULTING.",
  });
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category: categoryParam } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations();

  const activeCategory: Category = CATEGORIES.includes(categoryParam as Category)
    ? (categoryParam as Category)
    : "ALL";

  const posts = await getPublishedPosts(
    activeCategory === "ALL" ? undefined : activeCategory
  );
  const waHref = await whatsappUrl(undefined, locale);

  return (
    <>
      <PageHero
        eyebrow={t("nav.blog")}
        title={t("blog.title")}
        subtitle={t("blog.subtitle")}
        image="/images/seed/blog-1.jpg"
        imageAlt={t("blog.title")}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          {/* Filtres catégories */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              const href = cat === "ALL" ? "/blog" : `/blog?category=${cat}`;
              return (
                <Link
                  key={cat}
                  href={href as never}
                  prefetch={false}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300",
                    active
                      ? "bg-brand-gradient text-white shadow-card"
                      : "border border-ink-150 bg-white text-ink-600 hover:border-gold-300 hover:text-brand-700"
                  )}
                >
                  {t(`blog.categories.${cat}`)}
                </Link>
              );
            })}
          </div>

          {/* Grille articles */}
          {posts.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  categoryLabel={t(`blog.categories.${post.category}`)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-ink-500">
              {locale === "en" ? "No article in this category yet." : "Aucun article dans cette catégorie pour le moment."}
            </p>
          )}
        </div>
      </section>

      <CtaBand
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        buttonLabel={t("common.whatsapp")}
        whatsappHref={waHref}
      />
    </>
  );
}
