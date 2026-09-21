import { open, readFile, stat } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const MIME: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".m4v": "video/x-m4v",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

/**
 * Sert les médias uploadés depuis le disque (public/uploads).
 * Indispensable car un serveur `next start` ne sert pas les fichiers
 * ajoutés à public/ après son démarrage.
 *
 * Supporte les requêtes Range (HTTP 206) : nécessaire pour lire et
 * parcourir les vidéos sans les télécharger entièrement.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  const root = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(root, ...segments);

  // Garde-fou anti-remontée de répertoire
  if (!filePath.startsWith(root + path.sep)) {
    return new Response("Forbidden", { status: 403 });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] ?? "application/octet-stream";
  const immutable = { "Cache-Control": "public, max-age=31536000, immutable" };

  try {
    const { size } = await stat(filePath);
    const range = request.headers.get("range");

    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (match) {
        const start = match[1] ? parseInt(match[1], 10) : 0;
        const end = match[2] ? parseInt(match[2], 10) : size - 1;

        if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= size) {
          return new Response("Range Not Satisfiable", {
            status: 416,
            headers: { "Content-Range": `bytes */${size}` },
          });
        }

        const length = Math.min(end - start + 1, size - start);
        const buffer = Buffer.allocUnsafe(length);
        const file = await open(filePath, "r");
        try {
          await file.read(buffer, 0, length, start);
        } finally {
          await file.close();
        }

        return new Response(new Uint8Array(buffer), {
          status: 206,
          headers: {
            "Content-Type": contentType,
            "Content-Range": `bytes ${start}-${start + length - 1}/${size}`,
            "Content-Length": String(length),
            "Accept-Ranges": "bytes",
            ...immutable,
          },
        });
      }
    }

    const data = await readFile(filePath);
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(data.byteLength),
        "Accept-Ranges": "bytes",
        ...immutable,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
