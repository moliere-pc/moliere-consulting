import type { Metadata, Viewport } from "next";
import { Sora, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/i18n/routing";
import { getSettings } from "@/lib/settings";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat, WhatsAppMobileBar } from "@/components/ui/whatsapp-button";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import "@/app/globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#CD071E",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    metadataBase: new URL("https://moliereservice.com"),
    title: {
      default: messages.meta.defaultTitle,
      template: "%s · MOLIÈRE CONSULTING",
    },
    description: messages.meta.defaultDescription,
    applicationName: "MOLIÈRE CONSULTING",
    // Balise de vérification Google Search Console (GOOGLE_SITE_VERIFICATION dans .env)
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
    }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      siteName: "MOLIÈRE CONSULTING",
      title: messages.meta.defaultTitle,
      description: messages.meta.defaultDescription,
      locale: locale === "en" ? "en_EN" : "fr_FR",
      alternateLocale: locale === "en" ? "fr_FR" : "en_EN",
      images: [{ url: "/images/seed/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.defaultTitle,
      description: messages.meta.defaultDescription,
      images: ["/images/seed/og-default.jpg"],
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const settings = await getSettings();
  const waNumber = settings.whatsappNumber;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(sora.variable, manrope.variable, "min-h-screen bg-white")}>
        <OrganizationJsonLd settings={settings} />
        <NextIntlClientProvider messages={messages}>
          <Header whatsappNumber={waNumber} />
          <main id="main" className="pb-20 lg:pb-0">{children}</main>
          <Footer settings={settings} locale={locale as Locale} />
          <WhatsAppFloat number={waNumber} />
          <WhatsAppMobileBar number={waNumber} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
