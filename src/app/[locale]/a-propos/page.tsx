import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { HeartHandshake, Eye, MapPin } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { getPublishedStats } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatsBand } from "@/components/sections/stats-band";
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
  return pageMetadata({
    locale,
    path: "/a-propos",
    title: locale === "en" ? "About us" : "À propos",
    description:
      locale === "en"
        ? "The story, mission and team of MOLIÈRE CONSULTING, a Cameroonian consulting firm serving students, travellers and entrepreneurs."
        : "L'histoire, la mission et l'équipe de MOLIÈRE CONSULTING, cabinet conseil camerounais au service des étudiants, voyageurs et entrepreneurs.",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [stats, waHref] = await Promise.all([
    getPublishedStats(),
    whatsappUrl(undefined, locale),
  ]);

  const values = [
    { icon: HeartHandshake, title: t("about.v1Title"), desc: t("about.v1Desc") },
    { icon: Eye, title: t("about.v2Title"), desc: t("about.v2Desc") },
    { icon: MapPin, title: t("about.v3Title"), desc: t("about.v3Desc") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("nav.about")}
        title={t("about.title")}
        subtitle={t("about.subtitle")}
        image="/images/seed/about-team.jpg"
        imageAlt={t("about.teamTitle")}
        whatsappHref={waHref}
        whatsappLabel={t("common.whatsapp")}
      />

      {/* Histoire */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow={t("about.storyTitle")} title={t("about.teamTitle")} align="left" className="!mx-0" />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
            <p>{t("about.storyBody1")}</p>
            <p>{t("about.storyBody2")}</p>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow={t("about.valuesTitle")} title={t("home.whyTitle")} />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal
                as="article"
                key={i}
                delay={i}
                className="rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-soft"
              >
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-ink-950 shadow-gold">
                  <value.icon size={26} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink-950">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{value.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <StatsBand stats={stats} locale={locale} />

      <CtaBand
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        buttonLabel={t("common.whatsapp")}
        whatsappHref={waHref}
      />
    </>
  );
}
