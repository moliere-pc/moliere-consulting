import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";
import { getPoles, getPublishedFaqs } from "@/lib/content";
import { localized } from "@/lib/localized";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/icon";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqPageJsonLd } from "@/components/seo/json-ld";

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
    path: "/faq",
    title: "FAQ",
    description: locale === "en"
      ? "Answers to the most frequent questions about visas, cargo and digital services."
      : "Les réponses aux questions fréquentes sur les visas, le cargo et les services digitaux.",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const poles = await getPoles(locale);
  const groups = await Promise.all(
    poles.map(async (pole) => ({
      pole,
      items: (await getPublishedFaqs({ poleSlug: pole.slug })).map((f) => ({
        q: localized(f, "question", locale),
        a: localized(f, "answer", locale),
      })),
    }))
  );
  const groupsWithItems = groups.filter((g) => g.items.length > 0);
  const waHref = await whatsappUrl(undefined, locale);

  return (
    <>
      <PageHero
        eyebrow={t("nav.faq")}
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
        image="/images/seed/pole-travel.jpg"
        imageAlt={t("faq.title")}
        whatsappHref={waHref}
        whatsappLabel={t("common.whatsapp")}
      />

      <FaqPageJsonLd items={groupsWithItems.flatMap((g) => g.items)} />

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-14">
          {groupsWithItems.map(({ pole, items }) => (
            <div key={pole.id}>
              <h2 className="flex items-center gap-3 text-2xl font-extrabold text-ink-950">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-card">
                  <Icon name={pole.icon} size={22} />
                </span>
                {localized(pole, "name", locale)}
              </h2>
              <div className="mt-6">
                <FaqAccordion items={items} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title={t("common.needHelp")}
        subtitle={t("contact.subtitle")}
        buttonLabel={t("common.whatsapp")}
        whatsappHref={waHref}
      />
    </>
  );
}
