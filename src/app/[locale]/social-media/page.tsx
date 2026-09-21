import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight, GraduationCap } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { getPoleBySlug, getPublishedFaqs, getPublishedCourses } from "@/lib/content";
import { localized } from "@/lib/localized";
import { parseList } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { PoleServiceSection } from "@/components/sections/pole-service-section";
import { CourseCard } from "@/components/cards/course-card";
import { Icon } from "@/components/ui/icon";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  return pageMetadata({
    locale,
    path: "/social-media",
    title:
      locale === "en"
        ? "Social Media — Digital agency & training"
        : "Social Media — Agence digitale & formations",
    description: t("social.heroSubtitle"),
  });
}

export default async function SocialMediaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [pole, faqs, courses] = await Promise.all([
    getPoleBySlug("social-media"),
    getPublishedFaqs({ poleSlug: "social-media" }),
    getPublishedCourses(),
  ]);
  if (!pole) return null;

  const waHref = await whatsappUrl(undefined, locale);

  const formatLabels = {
    ONLINE: t("common.online"),
    INPERSON: t("common.inperson"),
    HYBRID: t("common.hybrid"),
  };
  const levelLabels = {
    BEGINNER: t("common.beginner"),
    INTERMEDIATE: t("common.intermediate"),
    ADVANCED: t("common.advanced"),
  };

  const faqItems = faqs.map((f) => ({
    q: localized(f, "question", locale),
    a: localized(f, "answer", locale),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("social.heroKicker")}
        title={t("social.heroTitle")}
        subtitle={t("social.heroSubtitle")}
        image={pole.image ?? "/images/backgrounds/pole-social.jpg"}
        imageAlt={localized(pole, "name", locale)}
        whatsappHref={waHref}
        whatsappLabel={t("common.whatsapp")}
      />

      {/* Intro */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div
            className="prose-content mx-auto max-w-4xl"
            dangerouslySetInnerHTML={{ __html: localized(pole, "content", locale) }}
          />
        </div>
      </section>

      {/* Sommaire des prestations */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("social.servicesKicker")}
            title={t("social.servicesTitle")}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pole.services.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon name={service.icon} size={24} />
                </span>
                <span className="text-sm font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
                  {localized(service, "title", locale)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Prestations détaillées */}
      {pole.services.map((service, i) => (
        <PoleServiceSection
          key={service.id}
          id={service.slug}
          index={i}
          image={service.image}
          imageAlt={localized(service, "title", locale)}
          icon={service.icon}
          title={localized(service, "title", locale)}
          html={localized(service, "description", locale)}
          bullets={parseList(locale === "en" ? service.bulletsEn : service.bulletsFr)}
          ctaLabel={t("common.whatsapp")}
          ctaHref={`https://wa.me/327696307969?text=${encodeURIComponent(
            t("social.ctaContext", { service: localized(service, "title", locale) })
          )}`}
        />
      ))}

      {/* Formations */}
      {courses.length > 0 && (
        <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 320px at 15% 0%, rgba(217,164,65,0.15), transparent 60%), radial-gradient(600px 300px at 100% 100%, rgba(205,7,30,0.22), transparent 60%)",
            }}
            aria-hidden
          />
          <div className="container-x relative">
            <SectionHeading
              eyebrow={t("social.coursesKicker")}
              title={t("social.coursesTitle")}
              description={t("social.coursesSubtitle")}
              light
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  locale={locale}
                  formatLabels={formatLabels}
                  levelLabels={levelLabels}
                  onDemand={t("common.onDemand")}
                  discover={t("common.learnMore")}
                />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href={"/formations" as never}
                prefetch={false}
                className="group inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-white/8 px-7 py-3.5 text-base font-bold text-gold-300 backdrop-blur transition-all duration-300 hover:border-gold-300 hover:bg-white/14"
              >
                <GraduationCap size={19} />
                {t("social.allCourses")}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="bg-white py-20 sm:py-28">
          <div className="container-x">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
              <SectionHeading
                eyebrow={t("common.faq")}
                title={t("faq.title")}
                description={t("faq.subtitle")}
                align="left"
                className="!mx-0"
              />
              <FaqAccordion items={faqItems} />
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={locale === "en" ? "Let's build your digital presence" : "Construisons votre présence digitale"}
        subtitle={t("home.finalSubtitle")}
        buttonLabel={t("common.whatsapp")}
        whatsappHref={waHref}
      />
    </>
  );
}
