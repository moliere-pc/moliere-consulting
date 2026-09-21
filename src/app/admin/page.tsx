import Link from "next/link";
import {
  Boxes,
  ListChecks,
  GraduationCap,
  Newspaper,
  Quote,
  HelpCircle,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

const CARDS = [
  { slug: "poles", label: "Pôles", icon: Boxes, model: "pole" },
  { slug: "services", label: "Services", icon: ListChecks, model: "service" },
  { slug: "courses", label: "Formations", icon: GraduationCap, model: "course" },
  { slug: "posts", label: "Articles", icon: Newspaper, model: "post" },
  { slug: "testimonials", label: "Témoignages", icon: Quote, model: "testimonial" },
  { slug: "faqs", label: "Questions FAQ", icon: HelpCircle, model: "faq" },
  { slug: "stats", label: "Statistiques", icon: BarChart3, model: "stat" },
] as const;

export default async function AdminHome() {
  const counts = await Promise.all(
    CARDS.map(async (card) => ({
      ...card,
      total: await (prisma[card.model] as { count: () => Promise<number> }).count(),
    }))
  );
  const recentPosts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink-950">Tableau de bord</h1>
        <p className="mt-1 text-sm text-ink-500">
          Pilotez les contenus du site MOLIÈRE CONSULTING.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map((card) => (
          <Link
            key={card.slug}
            href={`/admin/${card.slug}`}
            prefetch={false}
            className="group flex items-center gap-4 rounded-2xl border border-ink-150 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <card.icon size={23} />
            </span>
            <span className="flex-1">
              <span className="block font-display text-2xl font-extrabold text-ink-950">
                {card.total}
              </span>
              <span className="text-sm font-medium text-ink-500">{card.label}</span>
            </span>
            <ArrowUpRight
              size={18}
              className="text-ink-300 transition-all group-hover:text-brand-600"
            />
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-ink-150 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-950">Derniers articles modifiés</h2>
          <Link
            href="/admin/posts"
            prefetch={false}
            className="text-sm font-bold text-brand-700 hover:underline"
          >
            Tout voir
          </Link>
        </div>
        <ul className="divide-y divide-ink-100">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/admin/posts/${post.id}`}
                prefetch={false}
                className="flex items-center gap-4 py-3.5 transition-colors hover:bg-cream/50"
              >
                <span className="flex-1 truncate text-sm font-semibold text-ink-800">
                  {post.titleFr}
                </span>
                <span
                  className={
                    "rounded-full px-2.5 py-1 text-[11px] font-bold " +
                    (post.published
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-ink-100 text-ink-500")
                  }
                >
                  {post.published ? "Publié" : "Masqué"}
                </span>
                <span className="text-xs text-ink-400">{formatDate(post.updatedAt, "fr")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
