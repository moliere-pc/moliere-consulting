import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ENTITIES, toListRow, type EntitySlug } from "./entity-config";
import { ResourceList } from "./resource-list";
import { EntityForm } from "./entity-form";
import { saveEntity, deleteEntity } from "@/app/admin/actions";

/* eslint-disable @typescript-eslint/no-explicit-any */
const DELEGATES: Record<EntitySlug, any> = {
  poles: prisma.pole,
  services: prisma.service,
  courses: prisma.course,
  posts: prisma.post,
  testimonials: prisma.testimonial,
  faqs: prisma.faq,
  stats: prisma.stat,
};

export async function EntityListPage({ slug }: { slug: EntitySlug }) {
  const rows = await DELEGATES[slug].findMany({ orderBy: { order: "asc" } });
  return (
    <ResourceList
      entity={slug}
      singular={ENTITIES[slug].singular}
      rows={rows.map((r: any) => toListRow(slug, r))}
    />
  );
}

export async function EntityEditPage({ slug, id }: { slug: EntitySlug; id: string }) {
  const [poles, services] = await Promise.all([
    prisma.pole.findMany({ orderBy: { order: "asc" }, select: { id: true, nameFr: true } }),
    prisma.service.findMany({
      orderBy: { order: "asc" },
      select: { id: true, titleFr: true, pole: { select: { nameFr: true } } },
    }),
  ]);

  let initial: Record<string, any> | null = null;
  if (id !== "new") {
    initial = await DELEGATES[slug].findUnique({ where: { id } });
    if (!initial) notFound();
  }

  return (
    <EntityForm
      entity={slug}
      id={id === "new" ? undefined : id}
      initial={initial}
      options={{
        poles: poles.map((p) => ({ value: p.id, label: p.nameFr })),
        services: services.map((s) => ({
          value: s.id,
          label: s.pole ? `${s.pole.nameFr} — ${s.titleFr}` : s.titleFr,
        })),
      }}
      saveAction={saveEntity}
      deleteAction={deleteEntity}
    />
  );
}
