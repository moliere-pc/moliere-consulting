import type { Metadata } from "next";
import { headers } from "next/headers";
import { Sora, Manrope } from "next/font/google";
import { LogoMark } from "@/components/ui/brand-mark";
import "@/app/globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = { title: "404 · MOLIÈRE CONSULTING", robots: { index: false } };

const COPY = {
  fr: {
    title: "Page introuvable",
    desc: "La page demandée n'existe pas ou a été déplacée. Revenez à l'accueil ou contactez-nous directement sur WhatsApp.",
    home: "Retour à l'accueil",
    whatsapp: "Discuter sur WhatsApp",
  },
  en: {
    title: "Page not found",
    desc: "The page you are looking for does not exist or has been moved. Go back home or contact us directly on WhatsApp.",
    home: "Back to home",
    whatsapp: "Chat on WhatsApp",
  },
} as const;

export default async function GlobalNotFound() {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const lang = pathname.startsWith("/en") ? "en" : "fr";
  const c = COPY[lang];

  return (
    <html lang={lang} className={`${sora.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-ink-950 font-sans text-white antialiased">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 340px at 12% 0%, rgba(217,164,65,0.18), transparent 60%), radial-gradient(620px 320px at 100% 100%, rgba(205,7,30,0.3), transparent 60%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-xl text-center">
            <p className="font-display text-8xl font-extrabold gradient-text-gold sm:text-9xl">404</p>
            <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {c.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/60">{c.desc}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href={`/${lang}`}
                className="inline-flex h-13 items-center gap-2 rounded-full bg-brand-gradient px-7 py-3 text-base font-semibold text-white shadow-card transition-all hover:brightness-110"
              >
                {c.home}
              </a>
              <a
                href="https://wa.me/327696307969"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-whatsapp px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-whatsapp-dark"
              >
                {c.whatsapp}
              </a>
            </div>
            <div className="mt-12 flex flex-col items-center gap-3">
              <LogoMark className="h-12 w-12" />
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/40">
                MOLIERE <span className="text-gold-400">CONSULTING</span>
              </p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
