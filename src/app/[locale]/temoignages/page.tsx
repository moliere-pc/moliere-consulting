import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";
import { getPublishedTestimonials } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/page-hero";
import { TestimonialsMasonry } from "@/components/sections/testimonials-carousel";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { CtaBand } from "@/components/sections/cta-band";

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
    path: "/temoignages",
    title: locale === "en" ? "Testimonials" : "Témoignages clients",
    description:
      locale === "en"
        ? "Client reviews: China & Canada visas, studies abroad, China-Cameroon freight and website creation by MOLIÈRE CONSULTING."
        : "Les retours d'expérience de nos clients : visas Chine & Canada, études à l'étranger, fret Chine-Cameroun et création de sites web.",
  });
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [testimonials, waHref] = await Promise.all([
    getPublishedTestimonials(),
    whatsappUrl(undefined, locale),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t("nav.testimonials")}
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
        image="/images/seed/hero-home.jpg"
        imageAlt={t("testimonials.title")}
        whatsappHref={waHref}
        whatsappLabel={t("common.whatsapp")}
      />

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x">
          <TestimonialsMasonry>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} locale={locale} />
            ))}
          </TestimonialsMasonry>
        </div>
      </section>

      <CtaBand
        title={t("home.finalTitle")}
        subtitle={t("home.finalSubtitle")}
        buttonLabel={t("common.whatsapp")}
        whatsappHref={waHref}
      />
    </>
  );
}
