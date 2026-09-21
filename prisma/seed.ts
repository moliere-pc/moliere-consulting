/**
 * Seed de la base MOLIÈRE CONSULTING.
 * Idempotent : recrée les donnees metier (poles, services, cours, articles,
 * temoignages, FAQ, stats) et conserve/compte admin + reglages.
 *
 * Usage : npm run db:seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { POLES } from "./data/poles";
import { COURSES } from "./data/learning";
import { POSTS, TESTIMONIALS, FAQS, STATS } from "./data/editorial";
import { DEFAULT_SETTINGS } from "../src/lib/default-settings";

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@moliereservice.com";
  const password = process.env.ADMIN_PASSWORD || "Moliere2026!";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("· Admin existant conserve :", email);
    return;
  }
  await prisma.user.create({
    data: { email, password: await bcrypt.hash(password, 12), name: "Administrateur" },
  });
  console.log("· Admin cree :", email);
}

async function seedSettings() {
  await prisma.setting.upsert({
    where: { key: "site" },
    create: { key: "site", value: JSON.stringify(DEFAULT_SETTINGS) },
    // Ne pas ecraser les reglages modifies depuis l'admin
    update: {},
  });
  console.log("· Reglages site initialises");
}

async function seedPoles() {
  for (const p of POLES) {
    await prisma.pole.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        icon: p.icon,
        image: p.image,
        order: p.order,
        published: true,
        nameFr: p.nameFr,
        nameEn: p.nameEn,
        taglineFr: p.taglineFr,
        taglineEn: p.taglineEn,
        shortFr: p.shortFr,
        shortEn: p.shortEn,
        descriptionFr: p.descriptionFr,
        descriptionEn: p.descriptionEn,
        contentFr: p.contentFr,
        contentEn: p.contentEn,
        services: {
          create: p.services.map((s) => ({
            slug: s.slug,
            country: s.country ?? null,
            motive: s.motive ?? null,
            icon: s.icon,
            image: s.image,
            order: s.order,
            published: true,
            isHighlighted: s.highlighted ?? false,
            titleFr: s.titleFr,
            titleEn: s.titleEn,
            shortFr: s.shortFr,
            shortEn: s.shortEn,
            descriptionFr: s.descriptionFr,
            descriptionEn: s.descriptionEn,
            bulletsFr: JSON.stringify(s.bulletsFr),
            bulletsEn: JSON.stringify(s.bulletsEn),
            stepsFr: JSON.stringify(s.stepsFr),
            stepsEn: JSON.stringify(s.stepsEn),
          })),
        },
      },
      update: {
        icon: p.icon,
        image: p.image,
        order: p.order,
        nameFr: p.nameFr,
        nameEn: p.nameEn,
        taglineFr: p.taglineFr,
        taglineEn: p.taglineEn,
        shortFr: p.shortFr,
        shortEn: p.shortEn,
        descriptionFr: p.descriptionFr,
        descriptionEn: p.descriptionEn,
        contentFr: p.contentFr,
        contentEn: p.contentEn,
      },
    });

    // Synchronise les services (update si existe, sinon creation)
    const pole = await prisma.pole.findUniqueOrThrow({ where: { slug: p.slug } });
    for (const s of p.services) {
      await prisma.service.upsert({
        where: { slug: s.slug },
        create: {
          poleId: pole.id,
          slug: s.slug,
          country: s.country ?? null,
          motive: s.motive ?? null,
          icon: s.icon,
          image: s.image,
          order: s.order,
          published: true,
          isHighlighted: s.highlighted ?? false,
          titleFr: s.titleFr,
          titleEn: s.titleEn,
          shortFr: s.shortFr,
          shortEn: s.shortEn,
          descriptionFr: s.descriptionFr,
          descriptionEn: s.descriptionEn,
          bulletsFr: JSON.stringify(s.bulletsFr),
          bulletsEn: JSON.stringify(s.bulletsEn),
          stepsFr: JSON.stringify(s.stepsFr),
          stepsEn: JSON.stringify(s.stepsEn),
        },
        update: {
          icon: s.icon,
          image: s.image,
          order: s.order,
          isHighlighted: s.highlighted ?? false,
          titleFr: s.titleFr,
          titleEn: s.titleEn,
          shortFr: s.shortFr,
          shortEn: s.shortEn,
          descriptionFr: s.descriptionFr,
          descriptionEn: s.descriptionEn,
          bulletsFr: JSON.stringify(s.bulletsFr),
          bulletsEn: JSON.stringify(s.bulletsEn),
          stepsFr: JSON.stringify(s.stepsFr),
          stepsEn: JSON.stringify(s.stepsEn),
        },
      });
    }
  }
  console.log(`· ${POLES.length} poles et ${POLES.reduce((n, p) => n + p.services.length, 0)} services synchronises`);
}

async function seedCourses() {
  for (const c of COURSES) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        image: c.image,
        duration: c.duration,
        format: c.format,
        level: c.level,
        price: c.price,
        order: c.order,
        published: true,
        titleFr: c.titleFr,
        titleEn: c.titleEn,
        excerptFr: c.excerptFr,
        excerptEn: c.excerptEn,
        contentFr: c.contentFr,
        contentEn: c.contentEn,
        instructorFr: c.instructorFr,
        instructorEn: c.instructorEn,
      },
      update: {
        image: c.image,
        duration: c.duration,
        format: c.format,
        level: c.level,
        price: c.price,
        order: c.order,
        titleFr: c.titleFr,
        titleEn: c.titleEn,
        excerptFr: c.excerptFr,
        excerptEn: c.excerptEn,
        contentFr: c.contentFr,
        contentEn: c.contentEn,
        instructorFr: c.instructorFr,
        instructorEn: c.instructorEn,
      },
    });
  }
  console.log(`· ${COURSES.length} formations synchronisees`);
}

async function seedPosts() {
  for (const p of POSTS) {
    const publishedAt = new Date(Date.now() - p.daysAgo * 24 * 60 * 60 * 1000);
    await prisma.post.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        category: p.category,
        image: p.image,
        author: p.author,
        published: true,
        publishedAt,
        titleFr: p.titleFr,
        titleEn: p.titleEn,
        excerptFr: p.excerptFr,
        excerptEn: p.excerptEn,
        contentFr: p.contentFr,
        contentEn: p.contentEn,
      },
      update: {
        category: p.category,
        image: p.image,
        author: p.author,
        titleFr: p.titleFr,
        titleEn: p.titleEn,
        excerptFr: p.excerptFr,
        excerptEn: p.excerptEn,
        contentFr: p.contentFr,
        contentEn: p.contentEn,
      },
    });
  }
  console.log(`· ${POSTS.length} articles synchronises`);
}

async function seedTestimonials() {
  const poleBySlug = new Map(
    (await prisma.pole.findMany({ select: { id: true, slug: true } })).map((p) => [p.slug, p.id])
  );
  // Les témoignages seed sont identifiés par nom+ville ; on les remplace.
  await prisma.testimonial.deleteMany({
    where: { name: { in: TESTIMONIALS.map((t) => t.name) } },
  });
  await prisma.testimonial.createMany({
    data: TESTIMONIALS.map((t) => ({
      name: t.name,
      city: t.city,
      roleFr: t.roleFr,
      roleEn: t.roleEn,
      rating: t.rating,
      order: t.order,
      published: true,
      poleId: t.poleSlug ? poleBySlug.get(t.poleSlug) ?? null : null,
      quoteFr: t.quoteFr,
      quoteEn: t.quoteEn,
    })),
  });
  console.log(`· ${TESTIMONIALS.length} temoignages crees`);
}

async function seedFaqs() {
  const poleBySlug = new Map(
    (await prisma.pole.findMany({ select: { id: true, slug: true } })).map((p) => [p.slug, p.id])
  );
  await prisma.faq.deleteMany({
    where: { questionFr: { in: FAQS.map((f) => f.questionFr) } },
  });
  await prisma.faq.createMany({
    data: FAQS.map((f) => ({
      order: f.order,
      published: true,
      poleId: f.poleSlug ? poleBySlug.get(f.poleSlug) ?? null : null,
      questionFr: f.questionFr,
      questionEn: f.questionEn,
      answerFr: f.answerFr,
      answerEn: f.answerEn,
    })),
  });
  console.log(`· ${FAQS.length} FAQ creees`);
}

async function seedStats() {
  await prisma.stat.deleteMany({ where: { labelFr: { in: STATS.map((s) => s.labelFr) } } });
  await prisma.stat.createMany({
    data: STATS.map((s) => ({
      icon: s.icon,
      value: s.value,
      labelFr: s.labelFr,
      labelEn: s.labelEn,
      order: s.order,
      published: true,
    })),
  });
  console.log(`· ${STATS.length} statistiques creees`);
}

async function main() {
  console.log("Seed MOLIÈRE CONSULTING…");
  await seedAdmin();
  await seedSettings();
  await seedPoles();
  await seedCourses();
  await seedPosts();
  await seedTestimonials();
  await seedFaqs();
  await seedStats();
  console.log("Seed termine ✓");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
