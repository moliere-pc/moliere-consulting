import type { MetadataRoute } from "next";
import {
  getPoles,
  getPublishedPosts,
  getPublishedCourses,
  getTravelServices,
  COUNTRIES,
  COUNTRY_SLUG,
  MOTIVE_SLUG,
} from "@/lib/content";

const BASE = "https://moliereservice.com";
const LOCALES = ["fr", "en"] as const;

const STATIC_PATHS: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/voyages", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cargo", priority: 0.9, changeFrequency: "weekly" },
  { path: "/control-achat", priority: 0.9, changeFrequency: "weekly" },
  { path: "/social-media", priority: 0.9, changeFrequency: "weekly" },
  { path: "/formations", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/temoignages", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/a-propos", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Pages statiques (2 langues, hreflang sur chaque entrée)
  for (const { path, priority, changeFrequency } of STATIC_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            fr: `${BASE}/fr${path}`,
            en: `${BASE}/en${path}`,
            "x-default": `${BASE}/fr${path}`,
          },
        },
      });
    }
  }

  // Services voyage (2 langues par service)
  for (const country of COUNTRIES) {
    const services = await getTravelServices(country);
    for (const service of services) {
      if (!service.motive) continue;
      const motiveSlug = MOTIVE_SLUG[service.motive as keyof typeof MOTIVE_SLUG];
      for (const locale of LOCALES) {
        const url = `${BASE}/${locale}/voyages/${COUNTRY_SLUG[country]}/${motiveSlug}`;
        entries.push({
          url,
          lastModified: service.updatedAt ?? now,
          changeFrequency: "monthly",
          priority: 0.8,
          alternates: {
            languages: {
              fr: `${BASE}/fr/voyages/${COUNTRY_SLUG[country]}/${motiveSlug}`,
              en: `${BASE}/en/voyages/${COUNTRY_SLUG[country]}/${motiveSlug}`,
              "x-default": `${BASE}/fr/voyages/${COUNTRY_SLUG[country]}/${motiveSlug}`,
            },
          },
        });
      }
    }
  }

  const [courses, posts] = await Promise.all([getPublishedCourses(), getPublishedPosts()]);

  for (const course of courses) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE}/${locale}/formations/${course.slug}`,
        lastModified: course.updatedAt ?? now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            fr: `${BASE}/fr/formations/${course.slug}`,
            en: `${BASE}/en/formations/${course.slug}`,
            "x-default": `${BASE}/fr/formations/${course.slug}`,
          },
        },
      });
    }
  }

  for (const post of posts) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: {
          languages: {
            fr: `${BASE}/fr/blog/${post.slug}`,
            en: `${BASE}/en/blog/${post.slug}`,
            "x-default": `${BASE}/fr/blog/${post.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
