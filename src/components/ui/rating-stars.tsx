import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  className,
  size = 16,
}: {
  rating: number;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating}/5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < rating ? "fill-gold-400 text-gold-400" : "fill-ink-100 text-ink-100"
          )}
        />
      ))}
    </span>
  );
}
