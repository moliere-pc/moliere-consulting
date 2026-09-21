import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type SmartImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string | null | undefined;
  alt: string;
  fallback?: string;
};

/**
 * Affiche une image applicative (chemins /images ou /uploads) via next/image.
 * Les images distantes (http) sont egalement prises en charge.
 */
export function SmartImage({
  src,
  alt,
  className,
  fallback = "/images/seed/fallback.jpg",
  fill,
  width,
  height,
  ...props
}: SmartImageProps) {
  const source = src || fallback;
  return (
    <Image
      src={source}
      alt={alt}
      className={cn("object-cover", className)}
      fill={fill}
      width={fill ? undefined : width ?? 800}
      height={fill ? undefined : height ?? 600}
      sizes={
        props.sizes ??
        "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 33vw"
      }
      {...props}
    />
  );
}
