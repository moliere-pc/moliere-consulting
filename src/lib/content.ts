import "server-only";
import { prisma } from "./prisma";
import type { Locale } from "@/i18n/routing";

export const COUNTRIES = ["CHINA", "CANADA"] as const;
export type Country = (typeof COUNTRIES)[number];

export const MOTIVES = ["STUDY", "WORK", "VISITOR", "BUSINESS", "IMMIGRATION"] as const;
export type Motive = (typeof MOTIVES)[number];

export const COUNTRY_SLUG: Record<Country, string> = {
  CHINA: "china",
  CANADA: "canada",
};
export const SLUG_COUNTRY: Record<string, Country> = {
  china: "CHINA",
  canada: "CANADA",
};
export const MOTIVE_SLUG: Record<Motive, string> = {
  STUDY: "study",
  WORK: "work",
  VISITOR: "visitor",
  BUSINESS: "business",
  IMMIGRATION: "immigration",
};
export const SLUG_MOTIVE: Record<string, Motive> = {
  study: "STUDY",
  work: "WORK",
  visitor: "VISITOR",
  business: "BUSINESS",
  immigration: "IMMIGRATION",
};

export async function getPoles(locale: Locale) {
  const poles = await prisma.pole.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { _count: { select: { services: true } } },
  });
  return poles;
}

export async function getAllPolesAdmin() {
  return prisma.pole.findMany({ orderBy: { order: "asc" } });
}

export async function getPoleBySlug(slug: string) {
  return prisma.pole.findFirst({
    where: { slug, published: true },
    include: {
      services: {
        where: { published: true },
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getPoleForAdmin(slug: string) {
  return prisma.pole.findUnique({ where: { slug }, include: { services: true } });
}

export async function getTravelServices(country: Country) {
  return prisma.service.findMany({
    where: { published: true, pole: { slug: "voyages" }, country },
    orderBy: { order: "asc" },
  });
}

export async function getTravelService(country: Country, motive: Motive) {
  return prisma.service.findFirst({
    where: {
      published: true,
      pole: { slug: "voyages" },
      country,
      motive,
    },
  });
}

export async function getServicesByPoleSlug(poleSlug: string) {
  return prisma.service.findMany({
    where: { published: true, pole: { slug: poleSlug } },
    orderBy: { order: "asc" },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug }, include: { pole: true } });
}

export async function getPublishedCourses() {
  return prisma.course.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getCourseBySlug(slug: string) {
  return prisma.course.findFirst({ where: { slug, published: true } });
}

export async function getPublishedPosts(category?: string) {
  return prisma.post.findMany({
    where: {
      published: true,
      ...(category && category !== "ALL" ? { category } : {}),
    },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({ where: { slug, published: true } });
}

export async function getPublishedTestimonials(poleId?: string) {
  return prisma.testimonial.findMany({
    where: {
      published: true,
      ...(poleId ? { poleId } : {}),
    },
    include: { pole: true },
    orderBy: { order: "asc" },
  });
}

export async function getPublishedFaqs(filter: { poleSlug?: string; serviceId?: string }) {
  return prisma.faq.findMany({
    where: {
      published: true,
      ...(filter.serviceId
        ? { serviceId: filter.serviceId }
        : filter.poleSlug
          ? { pole: { slug: filter.poleSlug }, serviceId: null }
          : {}),
    },
    orderBy: { order: "asc" },
  });
}

export async function getPublishedStats() {
  return prisma.stat.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}
