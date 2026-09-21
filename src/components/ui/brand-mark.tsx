import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Icône globe + avion MOLIERE (sans texte, sans dépendance i18n).
 * Utilisable partout, y compris hors du segment [locale]
 * (admin, page 404 globale) et sur fonds clairs ou sombres.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block", className)} aria-hidden>
      <Image
        src="/images/logo-mark.svg"
        alt=""
        width={40}
        height={40}
        unoptimized
        className="h-full w-full"
        priority
      />
    </span>
  );
}
