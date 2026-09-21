import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Users, MousePointerClick, LifeBuoy } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { getPublishedCourses } from "@/lib/content";
import { whatsappUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CourseCard } from "@/components/cards/course-card";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/formations",
    title:
      locale === "en" ? "Training — Digital courses in Douala & Yaoundé" : "Formations — Cours digital à Douala & Yaoundé",
    description:
      locale === "en"
        ? "Hands-on digital training: social media, video content, WhatsApp e-commerce and graphic design."
        : "Formations digitales pratiques : réseaux sociaux, contenu vidéo, e-commerce WhatsApp et graphisme.",
  });
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const courses = await getPublishedCourses();
  const waHref = await whatsappUrl(undefined, locale);

  const formatLabels = {
    ONLINE: t("common.online"),
    INPERSON: t("common.inperson"),
    HYBRID: t("common.hybrid"),
  };
  const levelLabels = {
    BEGINNER: t("common.beginner"),
    INTERMEDIATE: t("common.intermediate"),
    ADVANCED: t("common.advanced"),
  };

  const pillars = [
    { icon: Users, labelFr: "Des formateurs praticiens", labelEn: "Practitioner trainers" },
    { icon: MousePointerClick, labelFr: "Pratique sur vos propres projets", labelEn: "Practice on your own projects" },
    { icon: LifeBuoy, labelFr: "Un suivi personnel après la formation", labelEn: "Personal follow-up after the course" },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("social.coursesKicker")}
        title={t("social.coursesTitle")}
        subtitle={t("social.coursesSubtitle")}
        image="/images/backgrounds/formations.jpg"
        imageAlt={t("social.coursesTitle")}
        whatsappHref={waHref}
        whatsappLabel={t("common.whatsapp")}
      />

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x">
          <div className="mx-auto mb-14 grid max-w-4xl gap-4 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal
                key={i}
                delay={i}
                className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white px-5 py-4 shadow-soft"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                  <p.icon size={20} />
                </span>
                <span className="text-sm font-bold text-ink-800">
                  {locale === "en" ? p.labelEn : p.labelFr}
                </span>
              </Reveal>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                locale={locale}
                formatLabels={formatLabels}
                levelLabels={levelLabels}
                onDemand={t("common.onDemand")}
                discover={t("common.learnMore")}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={
          locale === "en"
            ? "A question about a course?"
            : "Une question sur une formation ?"
        }
        subtitle={t("home.finalSubtitle")}
        buttonLabel={t("common.whatsapp")}
        whatsappHref={waHref}
      />
    </>
  );
}
