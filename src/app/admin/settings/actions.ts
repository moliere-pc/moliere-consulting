"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { clearSettingsCache } from "@/lib/settings";

const urlField = z
  .string()
  .trim()
  .refine((v) => v === "" || /^https?:\/\/.+/.test(v), "URL invalide (https://…)");

const videoField = z
  .string()
  .trim()
  .refine(
    (v) => v === "" || v.startsWith("/uploads/"),
    "Chemin vidéo invalide : rechargez la vidéo via la médiathèque."
  );

const schema = z.object({
  whatsappNumber: z
    .string()
    .trim()
    .regex(/^\d{8,16}$/, "Numéro au format international, sans + ni espaces (ex : 327696307969)"),
  phone: z.string().trim().min(3, "Téléphone requis"),
  email: z.string().trim().email("E-mail invalide"),
  infoGroupUrl: urlField,
  cityFr: z.string().trim().min(1),
  cityEn: z.string().trim().min(1),
  addressFr: z.string().trim().min(1),
  addressEn: z.string().trim().min(1),
  hoursFr: z.string().trim().min(1),
  hoursEn: z.string().trim().min(1),
  whatsappDefaultFr: z.string().trim().min(1),
  whatsappDefaultEn: z.string().trim().min(1),
  "socials.facebook": urlField,
  "socials.instagram": urlField,
  "socials.tiktok": urlField,
  "socials.linkedin": urlField,
  "socials.youtube": urlField,
  homeVideo0: videoField,
  homeVideo1: videoField,
  homeVideo2: videoField,
  "heroFr.badge": z.string().trim().min(1),
  "heroFr.titleLine1": z.string().trim().min(1),
  "heroFr.titleLine2": z.string().trim().min(1),
  "heroFr.subtitle": z.string().trim().min(1),
  "heroEn.badge": z.string().trim().min(1),
  "heroEn.titleLine1": z.string().trim().min(1),
  "heroEn.titleLine2": z.string().trim().min(1),
  "heroEn.subtitle": z.string().trim().min(1),
});

export type SettingsState = { ok?: boolean; error?: string };

export async function saveSettingsAction(
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  await requireUser();

  const raw: Record<string, string> = {};
  formData.forEach((value, key) => {
    raw[key] = String(value);
  });

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Vérifiez les champs." };
  }
  const d = parsed.data;

  const settings = {
    whatsappNumber: d.whatsappNumber,
    phone: d.phone,
    email: d.email,
    infoGroupUrl: d.infoGroupUrl,
    cityFr: d.cityFr,
    cityEn: d.cityEn,
    addressFr: d.addressFr,
    addressEn: d.addressEn,
    hoursFr: d.hoursFr,
    hoursEn: d.hoursEn,
    whatsappDefaultFr: d.whatsappDefaultFr,
    whatsappDefaultEn: d.whatsappDefaultEn,
    socials: {
      facebook: d["socials.facebook"] || undefined,
      instagram: d["socials.instagram"] || undefined,
      tiktok: d["socials.tiktok"] || undefined,
      linkedin: d["socials.linkedin"] || undefined,
      youtube: d["socials.youtube"] || undefined,
    },
    homeVideos: [d.homeVideo0, d.homeVideo1, d.homeVideo2].filter(Boolean).slice(0, 3),
    heroFr: {
      badge: d["heroFr.badge"],
      titleLine1: d["heroFr.titleLine1"],
      titleLine2: d["heroFr.titleLine2"],
      subtitle: d["heroFr.subtitle"],
    },
    heroEn: {
      badge: d["heroEn.badge"],
      titleLine1: d["heroEn.titleLine1"],
      titleLine2: d["heroEn.titleLine2"],
      subtitle: d["heroEn.subtitle"],
    },
  };

  await prisma.setting.upsert({
    where: { key: "site" },
    create: { key: "site", value: JSON.stringify(settings) },
    update: { value: JSON.stringify(settings) },
  });

  clearSettingsCache();
  revalidatePath("/", "layout");
  return { ok: true };
}
