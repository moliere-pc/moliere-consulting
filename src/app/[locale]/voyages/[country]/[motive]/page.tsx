import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  CheckCircle2,
  Building2,
  CalendarDays,
  BadgePercent,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import {
  COUNTRIES,
  MOTIVES,
  COUNTRY_SLUG,
  MOTIVE_SLUG,
  SLUG_COUNTRY,
  SLUG_MOTIVE,
  getTravelService,
  getTravelServices,
  getPublishedFaqs,
  type Country,
  type Motive,
} from "@/lib/content";
import { localized } from "@/lib/localized";
import { parseList, parseSteps } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { StepsTimeline } from "@/components/sections/steps-timeline";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { FaqPageJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";

type Params = { locale: Locale; country: string; motive: string };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    COUNTRIES.flatMap((country) =>
      MOTIVES.map((motive) => ({
        locale,
        country: COUNTRY_SLUG[country],
        motive: MOTIVE_SLUG[motive],
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, country: countrySlug, motive: motiveSlug } = await params;
  const country = SLUG_COUNTRY[countrySlug];
  const motive = SLUG_MOTIVE[motiveSlug];
  if (!country || !motive) return {};
  const service = await getTravelService(country, motive);
  if (!service) return {};
  return pageMetadata({
    locale,
    path: `/voyages/${COUNTRY_SLUG[country]}/${MOTIVE_SLUG[motive]}`,
    title: localized(service, "title", locale),
    description: localized(service, "short", locale),
    image: service.image ?? null,
  });
}

export default async function TravelServicePage({ params }: { params: Promise<Params> }) {
  const { locale, country: countrySlug, motive: motiveSlug } = await params;
  setRequestLocale(locale);

  const country = SLUG_COUNTRY[countrySlug];
  const motive = SLUG_MOTIVE[motiveSlug];
  if (!country || !motive) notFound();

  const t = await getTranslations();
  const service = await getTravelService(country, motive);
  if (!service) notFound();

  const [siblings, faqs] = await Promise.all([
    getTravelServices(country),
    getPublishedFaqs({ poleSlug: "voyages" }),
  ]);

  const countryLabel = t(`travel.${COUNTRY_SLUG[country]}`);
  const motiveLabel = t(`travel.motives.${motive}`);
  const contextMessage = t("travel.ctaContext", { motive: motiveLabel, country: countryLabel });
  const waHref = await whatsappUrl(contextMessage, locale);

  const bullets = parseList(locale === "en" ? service.bulletsEn : service.bulletsFr);
  const steps = parseSteps(service.stepsFr, service.stepsEn, locale);
  const description = localized(service, "description", locale);
  const isStudy = motive === "STUDY";

  const otherMotives = siblings.filter((s) => s.slug !== service.slug);
  const faqItems = faqs.map((f) => ({
    q: localized(f, "question", locale),
    a: localized(f, "answer", locale),
  }));

  const studyFacts: { icon: LucideIcon; value: string; label: string }[] = [
    {
      icon: Building2,
      value: "150+",
      label: locale === "en" ? "partner universities" : "universités partenaires",
    },
    {
      icon: BadgePercent,
      value: "500 000",
      label:
        locale === "en"
          ? "FCFA fully refundable deposit"
          : "FCFA de dépôt, entièrement remboursable",
    },
    {
      icon: Wallet,
      value: locale === "en" ? "After" : "Après",
      label:
        locale === "en"
          ? "our fees are paid only once the scholarship is granted"
          : "nos frais ne sont payés qu'après l'obtention de la bourse",
    },
    {
      icon: CalendarDays,
      value: locale === "en" ? "Jul – Aug" : "Juil – Août",
      label: locale === "en" ? "admission results published" : "publication des résultats d'admission",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${t("travel.heroKicker")} · ${countryLabel}`}
        title={localized(service, "title", locale)}
        subtitle={localized(service, "short", locale)}
        image={service.image ?? "/images/seed/pole-travel.jpg"}
        imageAlt={localized(service, "title", locale)}
        whatsappHref={waHref}
        whatsappLabel={t("common.whatsapp")}
      >
        {isStudy && (
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-gold-400/15 px-4 py-2 text-xs font-bold text-gold-200 backdrop-blur sm:text-sm">
            {t("travel.scholarshipBadge")}
          </span>
        )}
      </PageHero>

      {/* Faits clés bourses */}
      {isStudy && (
        <section className="bg-ink-950 py-14 sm:py-16">
          <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studyFacts.map((fact, i) => (
              <Reveal key={i} delay={i} className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-gold-300 ring-1 ring-white/15">
                  <fact.icon size={22} />
                </span>
                <span>
                  <span className="block font-display text-2xl font-extrabold gradient-text-gold">
                    {fact.value}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-white/60">
                    {fact.label}
                  </span>
                </span>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Contenu + sidebar */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.65fr_1fr]">
          <div>
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="mt-10">
              <Link
                href={"/voyages" as never}
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-bold text-ink-500 transition-colors hover:text-brand-700"
              >
                <ArrowLeft size={16} />
                {locale === "en" ? "All travel services" : "Tous les services voyages"}
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-card">
              <h2 className="text-lg font-bold text-ink-950">
                {locale === "en" ? "Key points" : "Points clés"}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink-600">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-600" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-base font-semibold text-white shadow-[0_14px_30px_-12px_rgba(37,211,102,0.7)] transition-all hover:bg-whatsapp-dark"
              >
                {t("common.whatsapp")}
              </a>
              <p className="mt-3 text-center text-xs text-ink-400">
                {locale === "en"
                  ? "Reply within the hour, 7 days a week"
                  : "Réponse dans l'heure, 7j/7"}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Étapes */}
      {steps.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <div className="container-x">
            <SectionHeading
              eyebrow={t("common.steps")}
              title={
                isStudy
                  ? t("travel.processTitle")
                  : locale === "en"
                    ? "How we support you"
                    : "Comment nous vous accompagnons"
              }
            />
            <div className="mt-14">
              <StepsTimeline steps={steps} />
            </div>
          </div>
        </section>
      )}

      {/* Autres motifs du même pays */}
      {otherMotives.length > 0 && (
        <section className="bg-cream py-20 sm:py-24">
          <div className="container-x">
            <SectionHeading
              eyebrow={countryLabel}
              title={
                locale === "en"
                  ? `Other projects in ${countryLabel}`
                  : `Autres projets au ${countryLabel === "Chine" ? "la Chine" : "Canada"}`
              }
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {otherMotives.map((s) => (
                <Link
                  key={s.slug}
                  href={
                    `/voyages/${COUNTRY_SLUG[country]}/${MOTIVE_SLUG[s.motive as Motive]}` as never
                  }
                  prefetch={false}
                  className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-card"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-snug text-ink-950">
                    {localized(s, "title", locale)}
                  </h3>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                    {t("common.learnMore")}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <div className="container-x">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
              <SectionHeading
                eyebrow={t("common.faq")}
                title={t("faq.title")}
                align="left"
                className="!mx-0"
              />
              <FaqAccordion items={faqItems} />
            </div>
          </div>
        </section>
      )}

      <FaqPageJsonLd items={faqItems} />
      <ServiceJsonLd
        name={localized(service, "title", locale)}
        description={localized(service, "short", locale)}
        url={`/${locale}/voyages/${countrySlug}/${motiveSlug}`}
        areaServed={country === "CHINA" ? "China" : "Canada"}
      />

      <CtaBand
        title={locale === "en" ? "Discuss your project now" : "Parlons de votre projet"}
        subtitle={contextMessage}
        buttonLabel={t("common.whatsapp")}
        whatsappHref={waHref}
      />
    </>
  );
}
