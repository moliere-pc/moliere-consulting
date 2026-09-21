import { SmartImage } from "@/components/ui/smart-image";
import { WhatsAppLinkButton } from "@/components/ui/whatsapp-button";
import { Reveal } from "@/components/ui/reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  whatsappHref,
  whatsappLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  whatsappHref?: string;
  whatsappLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-ink-950 pt-24 sm:min-h-[620px]">
      <div className="absolute inset-0">
        <SmartImage
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="opacity-45"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,15,0.72) 0%, rgba(11,11,15,0.55) 45%, rgba(11,11,15,0.92) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-hero-radial opacity-70" />
      </div>

      <div className="container-x relative py-20">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-white/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300 backdrop-blur sm:text-sm">
            {eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">
              {subtitle}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {whatsappHref && whatsappLabel && (
              <WhatsAppLinkButton href={whatsappHref} size="lg">
                {whatsappLabel}
              </WhatsAppLinkButton>
            )}
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
