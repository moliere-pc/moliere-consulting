"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser, destroySession } from "@/lib/auth";
import { ENTITIES, type EntitySlug } from "@/components/admin/entity-config";

type ModelDelegate = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (args: { data: any }) => Promise<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: (args: { where: { id: string }; data: any }) => Promise<unknown>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

const MODELS: Record<EntitySlug, ModelDelegate> = {
  poles: prisma.pole,
  services: prisma.service,
  courses: prisma.course,
  posts: prisma.post,
  testimonials: prisma.testimonial,
  faqs: prisma.faq,
  stats: prisma.stat,
};

const DATE_FIELDS = new Set(["publishedAt"]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function readValue(formData: FormData, key: string, type: string): any {
  if (type === "checkbox") return formData.get(key) === "on";
  if (type === "number") {
    const raw = formData.get(key);
    if (raw === null || raw === "") return 0;
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }
  if (type === "datetime") {
    const raw = String(formData.get(key) ?? "");
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? new Date() : d;
  }
  const raw = formData.get(key);
  let value = raw === null ? "" : String(raw);
  if (type === "tags" || type === "steps") {
    value = value.trim();
    if (!value) return "[]";
    try {
      JSON.parse(value);
      return value;
    } catch {
      return "[]";
    }
  }
  return value;
}

export async function saveEntity(formData: FormData) {
  await requireUser();

  const slug = String(formData.get("__entity")) as EntitySlug;
  const id = (formData.get("__id") as string) || null;
  const def = ENTITIES[slug];
  if (!def) throw new Error("Entité inconnue");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: Record<string, any> = {};

  if (def.hasOrder) data.order = readValue(formData, "order", "number");
  if (def.hasPublished) data.published = readValue(formData, "published", "checkbox");

  for (const field of def.fields) {
    const suffixes = field.bilingual ? ["Fr", "En"] : [""];
    for (const suffix of suffixes) {
      const key = field.name + suffix;
      let value = readValue(formData, key, field.type);

      if (field.type === "text" || field.type === "textarea" || field.type === "richtext" || field.type === "select" || field.type === "image") {
        value = String(value).trim();
        if (!value) value = null;
      }

      // Validation des champs obligatoires (version française fait foi)
      if (field.required && suffix === "Fr" && (value === null || value === "")) {
        throw new Error(`Le champ « ${field.label} » (FR) est obligatoire.`);
      }

      data[key] = value;
    }
  }

  // Cas particulier Service : pays/motif uniquement pour le pôle Voyages
  if (slug === "services" && data.poleId) {
    const pole = await prisma.pole.findUnique({
      where: { id: String(data.poleId) },
      select: { slug: true },
    });
    if (pole?.slug !== "voyages") {
      data.country = null;
      data.motive = null;
    }
  }

  const model = MODELS[slug] as ModelDelegate;
  if (id) {
    await model.update({ where: { id }, data });
  } else {
    await model.create({ data });
  }

  // Invalide le rendu statique public et les listes admin
  revalidatePath("/", "layout");
  redirect(`/admin/${slug}`);
}

export async function deleteEntity(formData: FormData) {
  await requireUser();

  const slug = String(formData.get("__entity")) as EntitySlug;
  const id = String(formData.get("id") ?? "");
  if (!ENTITIES[slug] || !id) return;

  await MODELS[slug].delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect(`/admin/${slug}`);
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
