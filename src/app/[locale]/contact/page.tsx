import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { getSettings } from "@/lib/settings";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/whatsapp-button";
import { SocialIcons } from "@/components/layout/social-icons";
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
    path: "/contact",
    title: "Contact",
    description:
      locale === "en"
        ? "Contact MOLIÈRE CONSULTING in Douala: WhatsApp, phone and email for visa applications, scholarships, import-export and digital services."
        : "Contactez MOLIÈRE CONSULTING à Douala : WhatsApp, téléphone et email pour vos visas, bourses d'études, import-export et services digitaux.",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [settings, waHref] = await Promise.all([
    getSettings(),
    whatsappUrl(undefined, locale),
  ]);

  const displayNumber = `+${settings.whatsappNumber.replace(
    /(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})/,
    "$1 $2 $3 $4 $5"
  )}`;

  const details = [
    {
      icon: Mail,
      label: t("contact.emailUs"),
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      icon: Phone,
      label: t("contact.callUs"),
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: t("contact.visitUs"),
      value: locale === "en" ? settings.addressEn : settings.addressFr,
      href: null,
    },
    {
      icon: Clock,
      label: locale === "en" ? "Availability" : "Disponibilité",
      value: locale === "en" ? settings.hoursEn : settings.hoursFr,
      href: null,
    },
  ];

  return (
    <>
      <header className="bg-ink-950 pb-16 pt-36 text-center sm:pb-20 sm:pt-44">
        <div className="container-x">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            {t("contact.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            {t("contact.subtitle")}
          </p>
        </div>
      </header>

      <section className="bg-cream pb-24 pt-10">
        <div className="container-x">
          {/* Carte WhatsApp centrale */}
          <Reveal className="mx-auto -mt-24 max-w-3xl">
            <div className="overflow-hidden rounded-[2rem] bg-whatsapp shadow-[0_30px_60px_-25px_rgba(37,211,102,0.55)]">
              <div className="p-9 text-center sm:p-12">
                <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <WhatsAppIcon size={34} />
                </span>
                <h2 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
                  {displayNumber}
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85">
                  {t("contact.whatsappHint")}
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-14 items-center gap-2.5 rounded-full bg-white px-9 text-lg font-bold text-whatsapp shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <WhatsAppIcon size={22} />
                  {t("contact.openWhatsapp")}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Autres coordonnées */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((detail, i) => {
              const content = (
                <>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <detail.icon size={22} />
                  </span>
                  <span className="mt-4 block text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
                    {detail.label}
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold leading-snug text-ink-800">
                    {detail.value}
                  </span>
                </>
              );
              return detail.href ? (
                <a
                  key={i}
                  href={detail.href}
                  className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={i}
                  className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft"
                >
                  {content}
                </div>
              );
            })}
          </div>

          {/* Réseaux sociaux */}
          {Object.values(settings.socials).some(Boolean) && (
            <div className="mt-12 text-center">
              <SocialIcons links={settings.socials} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
