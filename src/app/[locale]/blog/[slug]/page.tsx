import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { getPublishedPosts, getPostBySlug } from "@/lib/content";
import { localized } from "@/lib/localized";
import { formatDate, readingTime } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";
import { Link } from "@/i18n/navigation";
import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostCard } from "@/components/cards/post-card";
import { CtaBand } from "@/components/sections/cta-band";
import { ArticleJsonLd } from "@/components/seo/json-ld";

type Params = { locale: Locale; slug: string };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: localized(post, "title", locale),
    description: localized(post, "excerpt", locale),
    image: post.image ?? null,
    ogType: "article",
    publishedTime: post.publishedAt.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getPublishedPosts(),
  ]);
  if (!post || !post.published) notFound();

  const waHref = await whatsappUrl(undefined, locale);
  const content = localized(post, "content", locale);
  const related = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      {/* En-tête éditorial */}
      <header className="bg-ink-950 pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div className="container-x">
          <Link
            href={"/blog" as never}
            prefetch={false}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition-colors hover:text-gold-300"
          >
            <ArrowLeft size={16} />
            {t("nav.blog")}
          </Link>
          <span className="mt-6 inline-block rounded-full bg-brand-600 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
            {t(`blog.categories.${post.category}`)}
          </span>
          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {localized(post, "title", locale)}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={15} />
              {formatDate(post.publishedAt, locale)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={15} />
              {readingTime(content, locale)}
            </span>
            {post.author && (
              <span className="inline-flex items-center gap-2">
                <User size={15} />
                {post.author}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Image pleine largeur */}
      <div className="relative h-[38vh] min-h-[280px] w-full">
        <SmartImage
          src={post.image}
          alt={localized(post, "title", locale)}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent" />
      </div>

      {/* Contenu */}
      <article className="bg-cream pb-20 pt-10 sm:pb-24">
        <ArticleJsonLd
          title={localized(post, "title", locale)}
          description={localized(post, "excerpt", locale)}
          image={post.image}
          datePublished={post.publishedAt.toISOString()}
          dateModified={post.updatedAt.toISOString()}
          author={post.author}
        />
        <div className="container-x">
          <div
            className="prose-content mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>

      {/* Articles liés */}
      {related.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <div className="container-x">
            <SectionHeading eyebrow={t("blog.related")} title={t("blog.title")} />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <PostCard
                  key={p.id}
                  post={p}
                  locale={locale}
                  categoryLabel={t(`blog.categories.${p.category}`)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={t("home.finalTitle")}
        subtitle={t("home.finalSubtitle")}
        buttonLabel={t("common.whatsapp")}
        whatsappHref={waHref}
      />
    </>
  );
}
