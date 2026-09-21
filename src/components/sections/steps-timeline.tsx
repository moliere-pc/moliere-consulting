import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type StepItem = { title: string; desc?: string };

export function StepsTimeline({
  steps,
  variant = "light",
  highlightIndex,
}: {
  steps: StepItem[];
  variant?: "light" | "dark";
  highlightIndex?: number;
}) {
  return (
    <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => {
        const highlighted = highlightIndex === i;
        return (
          <Reveal as="li" key={i} delay={i} className="relative">
            <div
              className={cn(
                "flex h-full flex-col rounded-3xl border p-6 transition-all duration-300",
                variant === "dark"
                  ? "border-white/10 bg-white/5 hover:border-gold-300/40"
                  : "border-ink-100 bg-white shadow-soft hover:-translate-y-1 hover:shadow-card",
                highlighted &&
                  (variant === "dark"
                    ? "border-gold-300/60 bg-gold-400/10"
                    : "border-gold-300 bg-gold-50")
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-2xl font-display text-lg font-extrabold",
                    variant === "dark"
                      ? "bg-gold-gradient text-ink-950"
                      : "bg-brand-gradient text-white"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                className={cn(
                  "mt-4 text-base font-bold leading-snug",
                  variant === "dark" ? "text-white" : "text-ink-950"
                )}
              >
                {step.title}
              </h3>
              {step.desc && (
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    variant === "dark" ? "text-white/65" : "text-ink-500"
                  )}
                >
                  {step.desc}
                </p>
              )}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
