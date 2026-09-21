"use server";

import { unlink } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function deleteMedia(formData: FormData) {
  await requireUser();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const media = await prisma.media.findUnique({ where: { id } });
  if (media) {
    // Suppression du fichier physique, limitée au dossier public/uploads
    if (media.path.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", media.path);
      const root = path.join(process.cwd(), "public", "uploads");
      if (filePath.startsWith(root)) {
        await unlink(filePath).catch(() => {});
      }
    }
    await prisma.media.delete({ where: { id } });
  }
  revalidatePath("/admin/media");
}
