import "server-only";
import { getSettings } from "./settings";
import type { Locale } from "@/i18n/routing";

export async function whatsappUrl(message?: string, locale: Locale = "fr") {
  const settings = await getSettings();
  const text =
    message?.trim() ||
    (locale === "en" ? settings.whatsappDefaultEn : settings.whatsappDefaultFr);
  return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
