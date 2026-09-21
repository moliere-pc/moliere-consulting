import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";
import { getPoleBySlug, getPublishedFaqs } from "@/lib/content";
import { localized } from "@/lib/localized";
import { parseList, parseSteps } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { StepsTimeline } from "@/components/sections/steps-timeline";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { PoleServiceSection } from "@/components/sections/pole-service-section";
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
    path: "/cargo",
    title: locale === "en" ? "Molière Cargo — Import China ↔ Cameroon" : "Molière Cargo — Import-Export Chine ↔ Cameroun",
    description: t("cargo.heroSubtitle"),
  });
}

export default async function CargoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const pole = await getPoleBySlug("cargo");
  if (!pole) return null;

  const faqs = await getPublishedFaqs({ poleSlug: "cargo" });

  const quoteMessage = t("cargo.ctaContext");
  const waHref = await whatsappUrl(quoteMessage, locale);

  const services = pole.services;
  const processSteps = parseSteps(
    services.find((s) => s.slug === "cargo-sourcing")?.stepsFr,
    services.find((s) => s.slug === "cargo-sourcing")?.stepsEn,
    locale
  );

  const faqItems = faqs.map((f) => ({
    q: localized(f, "question", locale),
    a: localized(f, "answer", locale),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("cargo.heroKicker")}
        title={t("cargo.heroTitle")}
        subtitle={t("cargo.heroSubtitle")}
        image={pole.image ?? "/images/backgrounds/pole-cargo.jpg"}
        imageAlt={localized(pole, "name", locale)}
        whatsappHref={waHref}
        whatsappLabel={t("common.requestQuote")}
      />

      {/* Intro */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: localized(pole, "content", locale) }}
          />
          <div className="rounded-[2rem] bg-brand-gradient p-8 text-white shadow-card sm:p-10">
            <h2 className="text-2xl font-extrabold text-white">
              {t("cargo.quoteTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              {t("cargo.quoteSubtitle")}
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-13 items-center gap-2 rounded-full bg-gold-gradient px-7 py-3 text-base font-bold text-ink-950 shadow-gold transition-all hover:brightness-105"
            >
              {t("common.requestQuote")}
            </a>
          </div>
        </div>
      </section>

      {/* Sommaire des services */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("cargo.servicesKicker")}
            title={t("cargo.servicesTitle")}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-700">
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

      {/* Sections services détaillées */}
      {services.map((service, i) => (
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
          ctaLabel={t("common.requestQuote")}
          ctaHref={waHref}
        />
      ))}

      {/* Process */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("cargo.processKicker")}
            title={t("cargo.processTitle")}
            light
          />
          <div className="mt-14">
            <StepsTimeline steps={processSteps} variant="dark" />
          </div>
        </div>
      </section>

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
        title={t("cargo.quoteTitle")}
        subtitle={t("cargo.quoteSubtitle")}
        buttonLabel={t("common.requestQuote")}
        whatsappHref={waHref}
      />
    </>
  );
}
