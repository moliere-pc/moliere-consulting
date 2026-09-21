import "server-only";
import { prisma } from "./prisma";
import { DEFAULT_SETTINGS, type SiteSettings } from "./default-settings";

export { DEFAULT_SETTINGS };
export type { SiteSettings, SocialLinks } from "./default-settings";

let cache: { data: SiteSettings; at: number } | null = null;
const TTL = 15_000;

export async function getSettings(): Promise<SiteSettings> {
  if (cache && Date.now() - cache.at < TTL) return cache.data;
  const row = await prisma.setting.findUnique({ where: { key: "site" } });
  if (!row) {
    cache = { data: DEFAULT_SETTINGS, at: Date.now() };
    return DEFAULT_SETTINGS;
  }
  try {
    const parsed = JSON.parse(row.value) as Partial<SiteSettings>;
    const data: SiteSettings = {
      ...DEFAULT_SETTINGS,
      ...parsed,
      socials: { ...DEFAULT_SETTINGS.socials, ...(parsed.socials ?? {}) },
      homeVideos:
        Array.isArray(parsed.homeVideos)
          ? parsed.homeVideos
              .filter((v): v is string => typeof v === "string" && v.startsWith("/uploads/"))
              .slice(0, 3)
          : DEFAULT_SETTINGS.homeVideos,
      heroFr: { ...DEFAULT_SETTINGS.heroFr, ...(parsed.heroFr ?? {}) },
      heroEn: { ...DEFAULT_SETTINGS.heroEn, ...(parsed.heroEn ?? {}) },
    };
    cache = { data, at: Date.now() };
    return data;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function clearSettingsCache() {
  cache = null;
}
