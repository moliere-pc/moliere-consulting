import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Clock, MonitorPlay, Building2, Blend, Users, Wallet } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { getPublishedCourses, getCourseBySlug } from "@/lib/content";
import { localized } from "@/lib/localized";
import { whatsappUrl } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CourseCard } from "@/components/cards/course-card";
import { CtaBand } from "@/components/sections/cta-band";

type Params = { locale: Locale; slug: string };

export async function generateStaticParams() {
  const courses = await getPublishedCourses();
  return locales.flatMap((locale) =>
    courses.map((course) => ({ locale, slug: course.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return pageMetadata({
    locale,
    path: `/formations/${course.slug}`,
    title: localized(course, "title", locale),
    description: localized(course, "excerpt", locale),
    image: course.image ?? null,
  });
}

const FORMAT_ICONS: Record<string, typeof MonitorPlay> = {
  ONLINE: MonitorPlay,
  INPERSON: Building2,
  HYBRID: Blend,
};

export default async function CourseDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const [course, allCourses] = await Promise.all([
    getCourseBySlug(slug),
    getPublishedCourses(),
  ]);
  if (!course) notFound();

  const title = localized(course, "title", locale);
  const formatLabels: Record<string, string> = {
    ONLINE: t("common.online"),
    INPERSON: t("common.inperson"),
    HYBRID: t("common.hybrid"),
  };
  const levelLabels: Record<string, string> = {
    BEGINNER: t("common.beginner"),
    INTERMEDIATE: t("common.intermediate"),
    ADVANCED: t("common.advanced"),
  };

  const signupMessage = t("social.signupContext", { course: title });
  const waHref = await whatsappUrl(signupMessage, locale);

  const meta: { icon: typeof Clock; label: string; value: string }[] = [];
  if (course.duration)
    meta.push({ icon: Clock, label: t("common.duration"), value: course.duration });
  if (course.format)
    meta.push({ icon: FORMAT_ICONS[course.format] ?? MonitorPlay, label: t("common.format"), value: formatLabels[course.format] ?? course.format });
  if (course.level)
    meta.push({ icon: Users, label: t("common.level"), value: levelLabels[course.level] ?? course.level });
  const instructor = localized(course, "instructor", locale);
  if (instructor)
    meta.push({ icon: Users, label: t("common.instructor"), value: instructor });

  const related = allCourses.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={t("social.coursesKicker")}
        title={title}
        subtitle={localized(course, "excerpt", locale)}
        image={course.image ?? "/images/seed/course-1.jpg"}
        imageAlt={title}
        whatsappHref={waHref}
        whatsappLabel={t("social.signup")}
      />

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.65fr_1fr]">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: localized(course, "content", locale) }}
          />

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
              <div className="bg-brand-gradient p-7 text-white">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                  {t("common.from")}
                </span>
                <p className="mt-1 font-display text-3xl font-extrabold text-gold-300">
                  {course.price ?? t("common.onDemand")}
                </p>
              </div>
              <div className="p-7">
                <ul className="space-y-4">
                  {meta.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <item.icon size={17} />
                      </span>
                      <span className="text-ink-500">{item.label}</span>
                      <span className="ml-auto font-bold text-ink-900">{item.value}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-base font-semibold text-white shadow-[0_14px_30px_-12px_rgba(37,211,102,0.7)] transition-all hover:bg-whatsapp-dark"
                >
                  <Wallet size={18} />
                  {t("social.signup")}
                </a>
                <p className="mt-3 text-center text-xs text-ink-400">
                  {t("travel.limitedSeats")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <div className="container-x">
            <SectionHeading eyebrow={t("social.relatedCourses")} title={t("social.allCourses")} />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {related.map((c) => (
                <CourseCard
                  key={c.id}
                  course={c}
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
      )}

      <CtaBand
        title={locale === "en" ? "Ready to sign up?" : "Prêt(e) à vous inscrire ?"}
        subtitle={signupMessage}
        buttonLabel={t("social.signup")}
        whatsappHref={waHref}
      />
    </>
  );
}
