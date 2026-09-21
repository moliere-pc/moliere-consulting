import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className={cn("eyebrow", light && "text-gold-300")}>{eyebrow}</span>
      )}
      <h2
        className={cn(
          "mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12]",
          light ? "text-white" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            light ? "text-white/75" : "text-ink-500"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
