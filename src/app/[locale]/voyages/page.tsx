import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { GraduationCap, ArrowRight, CalendarDays, Building2, BadgePercent } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import {
  COUNTRIES,
  COUNTRY_SLUG,
  MOTIVE_SLUG,
  getPoleBySlug,
  getTravelServices,
  getPublishedFaqs,
  type Country,
  type Motive,
} from "@/lib/content";
import { localized } from "@/lib/localized";
import { whatsappUrl } from "@/lib/whatsapp";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CountryMotives, type CountryGroup } from "@/components/sections/country-motives";
import type { ServiceCardData } from "@/components/cards/service-card";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";

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
    path: "/voyages",
    title: locale === "en" ? "Travel — China & Canada visas" : "Voyages — Chine & Canada",
    description: t("travel.heroSubtitle"),
  });
}

const FLAGS: Record<Country, string> = { CHINA: "🇨🇳", CANADA: "🇨🇦" };

export default async function TravelPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [pole, chinaServices, canadaServices, faqs] = await Promise.all([
    getPoleBySlug("voyages"),
    getTravelServices("CHINA"),
    getTravelServices("CANADA"),
    getPublishedFaqs({ poleSlug: "voyages" }),
  ]);

  if (!pole) return null;

  const waHref = await whatsappUrl(undefined, locale);

  const toCard = (country: Country) => (service: (typeof chinaServices)[number]): ServiceCardData => ({
    slug: service.slug,
    icon: service.icon,
    image: service.image,
    title: localized(service, "title", locale),
    short: localized(service, "short", locale),
    href: `/${locale}/voyages/${COUNTRY_SLUG[country]}/${MOTIVE_SLUG[service.motive as Motive]}`,
  });

  const groups: CountryGroup[] = COUNTRIES.map((country) => ({
    key: COUNTRY_SLUG[country],
    label: t(`travel.${COUNTRY_SLUG[country]}`),
    flag: FLAGS[country],
    services: (country === "CHINA" ? chinaServices : canadaServices).map(toCard(country)),
  }));

  const levels = [1, 2, 3].map((i) => ({
    name: t(`travel.level${i}Name`),
    cond: t(`travel.level${i}Cond`),
  }));

  const faqItems = faqs.map((f) => ({
    q: localized(f, "question", locale),
    a: localized(f, "answer", locale),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("travel.heroKicker")}
        title={t("travel.heroTitle")}
        subtitle={t("travel.heroSubtitle")}
        image={pole.image ?? "/images/backgrounds/pole-voyages.jpg"}
        imageAlt={localized(pole, "name", locale)}
        whatsappHref={waHref}
        whatsappLabel={t("common.whatsapp")}
      />

      {/* Bande bourses */}
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 320px at 12% 0%, rgba(217,164,65,0.18), transparent 60%), radial-gradient(600px 300px at 100% 100%, rgba(205,7,30,0.25), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="container-x relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-white/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
              <GraduationCap size={15} />
              {t("travel.scholarshipBadge")}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
              {t("travel.levelsTitle")}
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {levels.map((level, i) => (
              <Reveal
                as="article"
                key={i}
                delay={i}
                className={
                  "rounded-3xl border p-7 text-center " +
                  (i === 0
                    ? "border-gold-300/60 bg-gold-400/10"
                    : "border-white/10 bg-white/5")
                }
              >
                <span
                  className={
                    "mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl font-display text-lg font-extrabold " +
                    (i === 0 ? "bg-gold-gradient text-ink-950" : "bg-white/10 text-gold-300")
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{level.name}</h3>
                <p className="mt-1 text-sm font-semibold text-gold-300">{level.cond}</p>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-white/65">
            <span className="inline-flex items-center gap-2">
              <Building2 size={16} className="text-gold-400" />
              150+ {t("travel.partnerUniv")}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} className="text-gold-400" />
              {t("travel.resultsMonths")}
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgePercent size={16} className="text-gold-400" />
              500 000 FCFA
            </span>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href={"/voyages/china/study" as never}
              prefetch={false}
              className="inline-flex h-13 items-center gap-2 rounded-full bg-gold-gradient px-7 py-3 text-base font-bold text-ink-950 shadow-gold transition-all duration-300 hover:brightness-105"
            >
              🇨🇳 {locale === "en" ? "China scholarships" : "Bourses en Chine"}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={"/voyages/canada/study" as never}
              prefetch={false}
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/25 bg-white/8 px-7 py-3 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:border-gold-300/60"
            >
              🇨🇦 {locale === "en" ? "Canada scholarships" : "Bourses au Canada"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sélecteur destination + motifs */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("travel.selectMotive")}
            title={t("travel.selectCountry")}
            description={localized(pole, "description", locale)}
          />
          <div className="mt-14">
            <CountryMotives groups={groups} selectLabel={t("travel.selectCountry")} />
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
        title={locale === "en" ? "Your China or Canada project starts here" : "Votre projet Chine ou Canada commence ici"}
        subtitle={t("home.finalSubtitle")}
        buttonLabel={t("common.whatsapp")}
        whatsappHref={waHref}
      />
    </>
  );
}
