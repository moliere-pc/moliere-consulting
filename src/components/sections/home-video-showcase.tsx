import { Film } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * Zone vidéo de la page d'accueil.
 * Jusqu'à 3 clips (30 s max, gérés dans Réglages admin → vidéos d'accueil).
 * Rendu uniquement si au moins une vidéo est configurée.
 */
export function HomeVideoShowcase({
  kicker,
  title,
  subtitle,
  hint,
  videos,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  hint: string;
  videos: string[];
}) {
  if (videos.length === 0) return null;

  const single = videos.length === 1;
  const gridClass =
    videos.length === 2
      ? "mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2"
      : "mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 320px at 12% 0%, rgba(217,164,65,0.14), transparent 60%), radial-gradient(600px 300px at 100% 100%, rgba(32,84,163,0.22), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="container-x relative">
        <SectionHeading eyebrow={kicker} title={title} description={subtitle} light />

        {single ? (
          <Reveal className="mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <video
                src={videos[0]}
                controls
                playsInline
                preload="none"
                className="aspect-video w-full bg-black object-cover"
              />
            </div>
          </Reveal>
        ) : (
          <div className={gridClass}>
            {videos.map((src, i) => (
              <Reveal
                key={src}
                delay={i}
                className="overflow-hidden rounded-2xl bg-black shadow-card ring-1 ring-white/10"
              >
                <video
                  src={src}
                  controls
                  playsInline
                  preload="none"
                  className="aspect-video w-full object-cover"
                />
              </Reveal>
            ))}
          </div>
        )}

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
          <Film size={14} className="text-gold-400" />
          {hint}
        </p>
      </div>
    </section>
  );
}
