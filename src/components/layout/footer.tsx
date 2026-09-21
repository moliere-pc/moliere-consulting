import { Link } from "@/i18n/navigation";
import { MapPin, Mail, Phone } from "lucide-react";
import { Wordmark } from "@/components/ui/logo";
import { SocialIcons } from "./social-icons";
import { WhatsAppIcon } from "@/components/ui/whatsapp-button";
import type { SiteSettings } from "@/lib/settings";
import type { Locale } from "@/i18n/routing";

export function Footer({
  settings,
  locale,
}: {
  settings: SiteSettings;
  locale: Locale;
}) {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink-950 text-white/70">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(800px 300px at 90% 0%, rgba(205,7,30,0.25), transparent 60%), radial-gradient(600px 300px at 0% 100%, rgba(217,164,65,0.12), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <Wordmark light />
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            {locale === "en"
              ? "Travel, purchase control, cargo and digital: your ambitions without borders, from Cameroon."
              : "Voyages, contrôle d'achat, cargo et digital : vos ambitions sans frontières depuis le Cameroun."}
          </p>
          <SocialIcons links={settings.socials} light />
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-300">
            {locale === "en" ? "Our divisions" : "Nos pôles"}
          </h3>
          <ul className="mt-5 space-y-3 text-sm font-medium">
            <li>
              <Link href="/voyages" prefetch={false} className="transition-colors hover:text-white">
                {locale === "en" ? "Travel — China & Canada" : "Voyages — Chine & Canada"}
              </Link>
            </li>
            <li>
              <Link href="/cargo" prefetch={false} className="transition-colors hover:text-white">
                Molière Cargo
              </Link>
            </li>
            <li>
              <Link href="/control-achat" prefetch={false} className="transition-colors hover:text-white">
                {locale === "en" ? "Purchase Control" : "Contrôle Achat"}
              </Link>
            </li>
            <li>
              <Link href="/social-media" prefetch={false} className="transition-colors hover:text-white">
                Social Media
              </Link>
            </li>
            <li>
              <Link href="/formations" prefetch={false} className="transition-colors hover:text-white">
                {locale === "en" ? "Training courses" : "Formations"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-300">
            {locale === "en" ? "Company" : "Entreprise"}
          </h3>
          <ul className="mt-5 space-y-3 text-sm font-medium">
            <li>
              <Link href="/a-propos" prefetch={false} className="transition-colors hover:text-white">
                {locale === "en" ? "About" : "À propos"}
              </Link>
            </li>
            <li>
              <Link href="/temoignages" prefetch={false} className="transition-colors hover:text-white">
                {locale === "en" ? "Testimonials" : "Témoignages"}
              </Link>
            </li>
            <li>
              <Link href="/blog" prefetch={false} className="transition-colors hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/faq" prefetch={false} className="transition-colors hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" prefetch={false} className="transition-colors hover:text-white">
                {locale === "en" ? "Contact" : "Contact"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-300">
            {locale === "en" ? "Contact" : "Contact"}
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-400" />
              <span>{locale === "en" ? settings.cityEn : settings.cityFr}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-gold-400" />
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-gold-400" />
              <a href={`mailto:${settings.email}`} className="break-all hover:text-white">
                {settings.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
              >
                <WhatsAppIcon size={16} />
                +{settings.whatsappNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")}
              </a>
            </li>
          </ul>
          <p className="mt-5 text-xs text-white/45">
            {locale === "en" ? settings.hoursEn : settings.hoursFr}
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} MOLIÈRE CONSULTING.{" "}
            {locale === "en" ? "All rights reserved." : "Tous droits réservés."}
          </p>
          <p>Douala · Yaoundé — Cameroun 🇨🇲</p>
        </div>
      </div>
    </footer>
  );
}
