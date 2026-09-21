import type { SocialLinks } from "@/lib/settings";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M16.5 3c.32 1.42 1.1 2.66 2.5 3.2v2.72c-1.08.13-2.1-.13-3-.68v5.5c0 3.62-2.9 6.4-6.4 6.2A6.26 6.26 0 014 13.9c.28-3.3 3.1-5.8 6.5-5.55v2.9c-.5-.15-1.02-.2-1.55-.1-1.55.27-2.6 1.66-2.35 3.25.23 1.42 1.5 2.43 2.93 2.29 1.5-.15 2.6-1.42 2.6-2.9V3h4.37z" />
    </svg>
  );
}

export function SocialIcons({
  links,
  light = false,
}: {
  links: SocialLinks;
  light?: boolean;
}) {
  const items = [
    { url: links.facebook, label: "Facebook", Icon: Facebook },
    { url: links.instagram, label: "Instagram", Icon: Instagram },
    { url: links.tiktok, label: "TikTok", Icon: TikTokIcon },
    { url: links.linkedin, label: "LinkedIn", Icon: Linkedin },
    { url: links.youtube, label: "YouTube", Icon: Youtube },
  ].filter((i) => !!i.url);

  if (!items.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {items.map(({ url, label, Icon }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ease-smooth hover:-translate-y-0.5 ${
            light
              ? "border-white/20 text-white/80 hover:border-gold-300 hover:bg-gold-400 hover:text-ink-950"
              : "border-ink-200 text-ink-500 hover:border-brand-300 hover:bg-brand-600 hover:text-white"
          }`}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
