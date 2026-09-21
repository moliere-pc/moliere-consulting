import { NextResponse, type NextRequest } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";
import { mp4Faststart } from "@/lib/mp4-faststart";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8 Mo
const MAX_VIDEO_SIZE = 60 * 1024 * 1024; // 60 Mo (≈ 30 s depuis un mobile)
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"];
const VIDEO_EXT: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
  "video/x-m4v": "m4v",
};

export async function POST(request: NextRequest) {
  // Le middleware ne couvre pas /api : on vérifie la session ici.
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifyToken(token);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let file: File | null = null;
  try {
    const form = await request.formData();
    const entry = form.get("file");
    file = entry instanceof File ? entry : null;
  } catch {
    return NextResponse.json({ error: "Formulaire invalide" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  const isVideo = VIDEO_TYPES.includes(file.type);
  const isImage = IMAGE_TYPES.includes(file.type);

  if (!isImage && !isVideo) {
    return NextResponse.json(
      { error: "Format non autorisé (JPG, PNG, WebP, AVIF, MP4, WebM, MOV)" },
      { status: 400 }
    );
  }
  if (isImage && file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Image trop volumineuse (8 Mo max.)" }, { status: 400 });
  }
  if (isVideo && file.size > MAX_VIDEO_SIZE) {
    return NextResponse.json(
      { error: "Vidéo trop volumineuse (60 Mo max. — durée recommandée : 30 s)" },
      { status: 400 }
    );
  }

  try {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const id = crypto.randomUUID();
    const publicDir = path.join(process.cwd(), "public", "uploads", year, month);
    await mkdir(publicDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());

    if (isVideo) {
      // Les vidéos ne sont pas transcodées (la durée ≤ 30 s est vérifiée
      // dans le navigateur avant l'envoi). Pour les conteneurs MP4/MOV/M4V,
      // on déplace simplement les métadonnées (`moov`) en tête du fichier :
      // la lecture démarre immédiatement, sans aller-retour de requêtes Range
      // (indispensable pour les vidéos filmées sur mobile).
      const ext = VIDEO_EXT[file.type] ?? "mp4";
      const filename = `${id}.${ext}`;
      const finalBuffer =
        ext === "webm" ? buffer : mp4Faststart(buffer).buffer;
      await writeFile(path.join(publicDir, filename), finalBuffer);
      const publicPath = `/uploads/${year}/${month}/${filename}`;
      await prisma.media.create({
        data: {
          filename,
          path: publicPath,
          mime: file.type === "video/quicktime" ? "video/quicktime" : `video/${ext}`,
          size: finalBuffer.byteLength,
          kind: "VIDEO",
        },
      });
      return NextResponse.json({ path: publicPath, kind: "VIDEO" });
    }

    const optimized = await sharp(buffer, { failOn: "none" })
      .rotate() // respecte l'orientation EXIF
      .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toBuffer();

    const filename = `${id}.webp`;
    await writeFile(path.join(publicDir, filename), optimized);

    const publicPath = `/uploads/${year}/${month}/${filename}`;
    await prisma.media.create({
      data: {
        filename,
        path: publicPath,
        mime: "image/webp",
        size: optimized.byteLength,
        kind: "IMAGE",
      },
    });

    return NextResponse.json({ path: publicPath, kind: "IMAGE" });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Traitement du fichier impossible" }, { status: 500 });
  }
}
