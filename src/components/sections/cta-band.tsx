import { Reveal } from "@/components/ui/reveal";
import { WhatsAppLinkButton } from "@/components/ui/whatsapp-button";
import { MessageCircle } from "lucide-react";

export function CtaBand({
  title,
  subtitle,
  buttonLabel,
  whatsappHref,
}: {
  title: string;
  subtitle: string;
  buttonLabel: string;
  whatsappHref: string;
}) {
  return (
    <section className="container-x py-16 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-gradient px-6 py-14 text-center shadow-card sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(600px 260px at 15% 0%, rgba(217,164,65,0.35), transparent 60%), radial-gradient(500px 260px at 100% 100%, rgba(255,255,255,0.12), transparent 60%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-gold-300 ring-1 ring-white/20">
              <MessageCircle size={28} />
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {subtitle}
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppLinkButton href={whatsappHref} size="lg">
                {buttonLabel}
              </WhatsAppLinkButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
