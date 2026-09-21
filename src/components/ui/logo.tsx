import { useId } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

// LogoMark vit dans un module sans dépendance i18n (admin, 404 globale).
export { LogoMark } from "./brand-mark";

/**
 * Logo complet (globe + "MOLIERE CONSULTING" + "Services").
 * `light` charge la variante à texte blanc pour les fonds sombres.
 *
 * SVG rendu EN INLINE volontairement : en <img> externe, Chromium fige
 * parfois la rasterisation du SVG dans une couche backdrop-filter
 * (header fixe translucide), d'où un texte rogné au rendu initial.
 */
export function Wordmark({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  // Plusieurs instances du logo par page (header + menu mobile + footer) :
  // IDs de gradients uniques pour éviter toute collision.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gold = `gold-${uid}`;
  const clip = `clip-${uid}`;

  const c = light
    ? {
        arc: "#7fb0e0",
        globe: "#0e2a47",
        grid: "#3f6488",
        land: "#5d93c6",
        title: "#ffffff",
        sub: "#a9c0d6",
      }
    : {
        arc: "#2054a3",
        globe: "#ffffff",
        grid: "#c6dbef",
        land: "#2054a3",
        title: "#1f3a5f",
        sub: "#6c8197",
      };

  return (
    <svg
      viewBox="0 0 400 120"
      width={400}
      height={120}
      role="img"
      aria-label="MOLIERE CONSULTING Services"
      className={cn("h-auto w-36 sm:w-40 lg:w-[176px]", className)}
      style={{ transform: "translateZ(0)" }}
    >
      <defs>
        <linearGradient id={gold} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#e8ac1f" />
          <stop offset="0.55" stopColor="#f6c735" />
          <stop offset="1" stopColor="#fbd24d" />
        </linearGradient>
        <clipPath id={clip}>
          <circle cx="60" cy="60" r="39" />
        </clipPath>
      </defs>

      {/* Globe mark */}
      <g transform="translate(6,12) scale(0.8)">
        <path
          d="M78 13 A48 48 0 0 1 102 30"
          fill="none"
          stroke={c.arc}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M20 92 A48 48 0 0 1 34 106"
          fill="none"
          stroke={c.arc}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <g transform="rotate(-20 60 60)">
          <ellipse
            cx="60"
            cy="60"
            rx="50"
            ry="18"
            fill="none"
            stroke={`url(#${gold})`}
            strokeWidth="3.4"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="50"
            ry="18"
            fill="none"
            stroke="#d99a17"
            strokeWidth="3.4"
            strokeDasharray="52 130"
            strokeDashoffset="-8"
            opacity="0.55"
          />
        </g>
        <circle cx="60" cy="60" r="39" fill={c.globe} />
        <g clipPath={`url(#${clip})`}>
          <g fill="none" stroke={c.grid} strokeWidth="1.3">
            <ellipse cx="60" cy="60" rx="39" ry="14" />
            <ellipse cx="60" cy="60" rx="39" ry="28" />
            <ellipse cx="60" cy="60" rx="14" ry="39" />
            <ellipse cx="60" cy="60" rx="28" ry="39" />
            <line x1="21" y1="60" x2="99" y2="60" />
          </g>
          <g fill={c.land}>
            <path d="M24 34c4-5 11-7 16-5 3 1 4 3 7 3 3 0 5 2 5 5-1 4-4 6-7 7-3 2-4 5-3 8 1 2 0 4-2 5-3 1-6-1-8-3-2-3-2-7-4-10-2-4-6-6-4-10z" />
            <path d="M45 66c4-1 8 1 9 5 1 4-1 8-2 11-1 4-3 8-7 8-3 0-5-3-5-6-1-4 1-8 1-11 0-3 1-6 4-7z" />
            <path d="M58 28c4-2 9-1 11 2 1 2 0 4-2 5-3 1-7 1-9-1-2-2-2-5 0-6z" />
            <path d="M57 44c5-2 12 0 14 5 2 5 0 10-1 14-1 5-1 11-6 14-3 2-8 1-10-3-2-5 1-9 1-14-1-6-3-14 2-16z" />
            <path d="M71 30c6-2 15 0 20 5 3 3 4 8 2 12-3 4-9 4-13 3-4-1-6-4-10-4-3 0-6-3-5-6 0-5 2-9 6-10z" />
            <path d="M74 50c3 0 6 2 6 5 0 2-2 4-4 4-3 0-5-2-5-4 0-3 1-5 3-5z" />
            <path d="M82 82c4-2 10-1 12 2 1 2 0 5-3 6-4 1-9 0-10-3-1-2 0-4 1-5z" />
          </g>
        </g>
        <circle
          cx="60"
          cy="60"
          r="39"
          fill="none"
          stroke={c.arc}
          strokeWidth="3.2"
        />
        <g transform="rotate(-20 60 60)">
          <path
            d="M11 66 A50 18 0 0 0 109 66"
            fill="none"
            stroke={`url(#${gold})`}
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <path
            d="M22 72 A50 18 0 0 0 86 74"
            fill="none"
            stroke={`url(#${gold})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>
        <g transform="translate(86 32) rotate(48) scale(0.92)">
          <path
            fill={`url(#${gold})`}
            d="M0 -16 C1.7 -15.4 2.3 -12.8 2.3 -9.4 L1.7 8.6 C1.6 11.2 1 12.8 0 13.2 C-1 12.8 -1.6 11.2 -1.7 8.6 L-2.3 -9.4 C-2.3 -12.8 -1.7 -15.4 0 -16 Z"
          />
          <path fill={`url(#${gold})`} d="M-1.4 -3.2 L-13.5 6.4 L-12.8 8.8 L-2.4 4.6 Z" />
          <path fill={`url(#${gold})`} d="M1.4 -3.2 L13.5 6.4 L12.8 8.8 L2.4 4.6 Z" />
          <path fill={`url(#${gold})`} d="M-1.2 7.6 L-6.2 12 L-5.8 13.6 L-1.4 10.4 Z" />
          <path fill={`url(#${gold})`} d="M1.2 7.6 L6.2 12 L5.8 13.6 L1.4 10.4 Z" />
        </g>
      </g>

      {/* Texte — PAS de textLength : écraser les glyphes en largeur refermait
          l'ouverture du G (rendu comme un O) à petite taille. font-size 20
          tient naturellement entre x=116 et x≈383. */}
      <text
        x="116"
        y="60"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="20"
        fontWeight="800"
        letterSpacing="0.5"
        fill={c.title}
      >
        MOLIERE CONSULTING
      </text>
      <text
        x="253"
        y="90"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="15"
        fontWeight="500"
        letterSpacing="8"
        fill={c.sub}
      >
        SERVICES
      </text>
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" prefetch={false} aria-label="MOLIERE CONSULTING — Accueil" className="shrink-0">
      <Wordmark light={light} />
    </Link>
  );
}
