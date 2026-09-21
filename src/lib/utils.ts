import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/i18n/routing";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[œæ]/g, (c) => (c === "œ" ? "oe" : "ae"))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 90);
}

export function pick<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  locale: Locale
) {
  const value = obj[`${field}${locale === "en" ? "En" : "Fr"}`];
  return (value ?? obj[`${field}Fr`] ?? "") as string;
}

export function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export type Step = { title: string; desc?: string };

export function parseSteps(
  fr: string | null | undefined,
  en: string | null | undefined,
  locale: Locale
): Step[] {
  const raw = parseList(locale === "en" ? en : fr);
  const fallback = parseList(locale === "en" ? fr : en);
  const source = raw.length ? raw : fallback;
  return source
    .map((item) => {
      if (typeof item === "string") return { title: item };
      if (item && typeof item === "object") {
        const o = item as Record<string, unknown>;
        return {
          title: String(o.title ?? ""),
          desc: o.desc ? String(o.desc) : undefined,
        };
      }
      return null;
    })
    .filter((s): s is Step => !!s && !!s.title);
}

export function formatDate(date: Date | string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function readingTime(content: string, locale: Locale) {
  const words = content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return locale === "en" ? `${minutes} min read` : `${minutes} min de lecture`;
}
