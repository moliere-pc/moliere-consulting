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
import { WhatsAppLinkButton } from "@/components/ui/whatsapp-button";
import { Reveal } from "@/components/ui/reveal";
import {
  ShieldAlert,
  PackageX,
  CircleDollarSign,
  Camera,
  Wallet,
  MessagesSquare,
  Eye,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

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
    path: "/control-achat",
    title:
      locale === "en"
        ? "Purchase Control — Sourcing, Quality Inspection & Shipping | MOLIÈRE"
        : "Contrôle Achat — Sourcing, contrôle qualité, quantité & expédition | MOLIÈRE",
    description: t("controlPurchase.heroSubtitle"),
  });
}

const RISK_ICONS: LucideIcon[] = [ShieldAlert, PackageX, CircleDollarSign];
const GUARANTEE_ICONS: LucideIcon[] = [Camera, Wallet, MessagesSquare, Eye];

export default async function ControlPurchasePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const pole = await getPoleBySlug("control-achat");
  if (!pole) return null;

  const faqs = await getPublishedFaqs({ poleSlug: "control-achat" });

  const waHref = await whatsappUrl(t("controlPurchase.ctaContext"), locale);

  const services = pole.services;

  const processSteps = parseSteps(
    services.find((s) => s.slug === "purchase-sourcing")?.stepsFr,
    services.find((s) => s.slug === "purchase-sourcing")?.stepsEn,
    locale
  );

  const risks = Array.from({ length: 3 }, (_, i) => ({
    title: t(`controlPurchase.risk${i + 1}Title`),
    desc: t(`controlPurchase.risk${i + 1}Desc`),
  }));

  const checks = Array.from({ length: 4 }, (_, i) =>
    t(`controlPurchase.check${i + 1}`)
  );

  const guarantees = Array.from({ length: 4 }, (_, i) => ({
    title: t(`controlPurchase.w${i + 1}Title`),
    desc: t(`controlPurchase.w${i + 1}Desc`),
  }));

  const faqItems = faqs.map((f) => ({
    q: localized(f, "question", locale),
    a: localized(f, "answer", locale),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("controlPurchase.heroKicker")}
        title={t("controlPurchase.heroTitle")}
        subtitle={t("controlPurchase.heroSubtitle")}
        image={pole.image ?? "/images/backgrounds/pole-control.jpg"}
        imageAlt={localized(pole, "name", locale)}
        whatsappHref={waHref}
        whatsappLabel={t("common.requestQuote")}
      />

      {/* Intro (contenu du pôle) + encart devis */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-ink-950 sm:text-4xl">
              {t("controlPurchase.introTitle")}
            </h2>
            <div
              className="prose-content mt-6"
              dangerouslySetInnerHTML={{ __html: localized(pole, "content", locale) }}
            />
          </div>
          <div className="rounded-[2rem] bg-brand-gradient p-8 text-white shadow-card sm:p-10">
            <h3 className="text-2xl font-extrabold text-white">
              {t("controlPurchase.quoteTitle")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              {t("controlPurchase.quoteSubtitle")}
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

      {/* Les risques de l'achat à distance */}
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 320px at 85% 0%, rgba(205,7,30,0.18), transparent 60%), radial-gradient(600px 300px at 0% 100%, rgba(217,164,65,0.10), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="container-x relative">
          <SectionHeading
            eyebrow={t("controlPurchase.risksKicker")}
            title={t("controlPurchase.risksTitle")}
            light
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {risks.map((risk, i) => {
              const RiskIcon = RISK_ICONS[i];
              return (
                <Reveal
                  as="article"
                  key={i}
                  delay={i}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300/40"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-300 ring-1 ring-red-400/25">
                    <RiskIcon size={24} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {risk.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {risk.desc}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sommaire des prestations */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("controlPurchase.servicesKicker")}
            title={t("controlPurchase.servicesTitle")}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
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

      {/* Prestations détaillées (gérées dans l'admin) */}
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

      {/* Inspection avant expédition */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-ink-100 bg-gradient-to-br from-white to-cream p-7 shadow-card sm:p-9">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-50"
                aria-hidden
              />
              <div className="relative flex items-center gap-3 border-b border-ink-100 pb-5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                  <Icon name="clipboard-check" size={22} />
                </span>
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold-700">
                    {t("controlPurchase.checkReportTag")}
                  </p>
                  <p className="text-base font-extrabold text-ink-950">
                    {t("controlPurchase.checkReportTitle")}
                  </p>
                </div>
              </div>

              <ul className="relative mt-6 space-y-4">
                {checks.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle2 size={15} />
                    </span>
                    <span className="text-sm font-medium leading-snug text-ink-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pointer-events-none absolute bottom-7 right-7 flex h-24 w-24 rotate-[-10deg] items-center justify-center rounded-full border-[3px] border-green-500/70 px-2 text-center text-[0.72rem] font-black uppercase leading-tight tracking-wider text-green-600">
                {t("controlPurchase.checkStamp")}
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <span className="eyebrow">{t("controlPurchase.checkKicker")}</span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink-950 sm:text-4xl">
              {t("controlPurchase.checkTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">
              {t("controlPurchase.checkP")}
            </p>
            <div className="mt-8">
              <WhatsAppLinkButton href={waHref} size="lg">
                {t("common.requestQuote")}
              </WhatsAppLinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Processus en 6 étapes */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("controlPurchase.processKicker")}
            title={t("controlPurchase.processTitle")}
            light
          />
          <div className="mt-14">
            <StepsTimeline steps={processSteps} variant="dark" />
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={t("controlPurchase.whyKicker")}
            title={t("controlPurchase.whyTitle")}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((item, i) => {
              const GIcon = GUARANTEE_ICONS[i];
              return (
                <Reveal
                  as="article"
                  key={i}
                  delay={i}
                  className="rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-card"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                    <GIcon size={24} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {item.desc}
                  </p>
                </Reveal>
              );
            })}
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
                title={t("controlPurchase.faqTitle")}
                description={t("controlPurchase.faqSubtitle")}
                align="left"
                className="!mx-0"
              />
              <FaqAccordion items={faqItems} />
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={t("controlPurchase.finalTitle")}
        subtitle={t("controlPurchase.finalSubtitle")}
        buttonLabel={t("common.requestQuote")}
        whatsappHref={waHref}
      />
    </>
  );
}
