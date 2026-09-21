import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import {
  BadgeCheck,
  ShieldCheck,
  Globe2,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import {
  getPoles,
  getPublishedPosts,
  getPublishedStats,
  getPublishedTestimonials,
} from "@/lib/content";
import { getSettings } from "@/lib/settings";
import { whatsappUrl } from "@/lib/whatsapp";
import { HomeHero } from "@/components/sections/home-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PoleCard } from "@/components/cards/pole-card";
import { StatsBand } from "@/components/sections/stats-band";
import { HomeVideoShowcase } from "@/components/sections/home-video-showcase";
import { StepsTimeline } from "@/components/sections/steps-timeline";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { PostCard } from "@/components/cards/post-card";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Accueil : titre/description/OG hérités du layout ; canonical + hreflang spécifiés ici.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, "") };
}

const WHY_ICONS: LucideIcon[] = [BadgeCheck, ShieldCheck, Globe2, MessagesSquare];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, settings, poles, stats, posts, testimonials] = await Promise.all([
    getTranslations(),
    getSettings(),
    getPoles(locale),
    getPublishedStats(),
    getPublishedPosts(),
    getPublishedTestimonials(),
  ]);

  const waHref = await whatsappUrl(undefined, locale);
  const hero = locale === "en" ? settings.heroEn : settings.heroFr;

  const processSteps = Array.from({ length: 4 }, (_, i) => ({
    title: t(`home.step${i + 1}Title`),
    desc: t(`home.step${i + 1}Desc`),
  }));

  const whyPoints = Array.from({ length: 4 }, (_, i) => ({
    title: t(`home.why${i + 1}Title`),
    desc: t(`home.why${i + 1}Desc`),
  }));

  const latestPosts = posts.slice(0, 3);
  const categoryLabels: Record<string, string> = {
    VOYAGE: t("blog.categories.VOYAGE"),
    CARGO: t("blog.categories.CARGO"),
    DIGITAL: t("blog.categories.DIGITAL"),
    OPPORTUNITIES: t("blog.categories.OPPORTUNITIES"),
  };

  return (
    <>
      <HomeHero
        badge={hero.badge}
        titleLine1={hero.titleLine1}
        titleLine2={hero.titleLine2}
        subtitle={hero.subtitle}
        primaryLabel={t("home.ctaPrimary")}
        secondaryLabel={t("home.ctaSecondary")}
        whatsappHref={waHref}
        image="/images/backgrounds/hero.jpg"
        trust1={t("home.trust1")}
        trust2={t("home.trust2")}
        trust3={t("home.trust3")}
      />

      {/* Pôles */}
      <section id="poles" className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("home.polesKicker")}
            title={t("home.polesTitle")}
            description={t("home.polesSubtitle")}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {poles.map((pole) => (
              <PoleCard key={pole.id} pole={pole} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <StatsBand stats={stats} locale={locale} />

      {/* Vidéos d'accueil (30 s max, configurables dans l'admin) */}
      <HomeVideoShowcase
        kicker={t("home.videoKicker")}
        title={t("home.videoTitle")}
        subtitle={t("home.videoSubtitle")}
        hint={t("home.videoHint")}
        videos={settings.homeVideos}
      />

      {/* Process */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("home.processKicker")}
            title={t("home.processTitle")}
          />
          <div className="mt-14">
            <StepsTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Pourquoi MOLIÈRE */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={t("home.whyKicker")} title={t("home.whyTitle")} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyPoints.map((point, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <Reveal
                  as="article"
                  key={i}
                  delay={i}
                  className="rounded-3xl border border-ink-100 bg-cream/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:bg-white hover:shadow-card"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-950">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{point.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      {testimonials.length > 0 && (
        <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 320px at 85% 0%, rgba(217,164,65,0.14), transparent 60%), radial-gradient(600px 300px at 0% 100%, rgba(205,7,30,0.18), transparent 60%)",
            }}
            aria-hidden
          />
          <div className="container-x relative">
            <SectionHeading
              eyebrow={t("home.testimonialsKicker")}
              title={t("home.testimonialsTitle")}
              light
            />
            <div className="mt-14">
              <TestimonialsCarousel testimonials={testimonials} locale={locale} />
            </div>
            <div className="mt-10 text-center">
              <Link
                href={"/temoignages" as never}
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-bold text-gold-300 transition-all hover:gap-3"
              >
                {locale === "en" ? "See all testimonials" : "Voir tous les témoignages"}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blog */}
      {latestPosts.length > 0 && (
        <section className="bg-cream py-20 sm:py-28">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow={t("home.blogKicker")}
                title={t("home.blogTitle")}
                align="left"
                className="!mx-0"
              />
              <Link
                href={"/blog" as never}
                prefetch={false}
                className="group inline-flex items-center gap-2 text-sm font-bold text-brand-700"
              >
                {locale === "en" ? "All articles" : "Tous les articles"}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  categoryLabel={categoryLabels[post.category] ?? post.category}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={t("home.finalTitle")}
        subtitle={t("home.finalSubtitle")}
        buttonLabel={t("home.ctaPrimary")}
        whatsappHref={waHref}
      />
    </>
  );
}
