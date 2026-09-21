"use client";

/**
 * Utilitaires côté navigateur pour les vidéos d'accueil (30 s max).
 */

export const MAX_VIDEO_DURATION = 30;

/**
 * Mesure la durée d'une vidéo via ses métadonnées.
 * Renvoie la durée en secondes, ou null si impossible à déterminer.
 */
export function getVideoDuration(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.preload = "metadata";
      const cleanup = () => URL.revokeObjectURL(url);
      video.onloadedmetadata = () => {
        const d = Number.isFinite(video.duration) ? video.duration : null;
        cleanup();
        resolve(d);
      };
      video.onerror = () => {
        cleanup();
        resolve(null);
      };
      video.src = url;
    } catch {
      resolve(null);
    }
  });
}

/**
 * Vérifie un fichier vidéo avant envoi : type, 30 s max.
 * Renvoie un message d'erreur explicite, ou null si tout est bon.
 */
export async function validateVideoFile(file: File): Promise<string | null> {
  const allowed = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"];
  if (!allowed.includes(file.type)) {
    return "Format vidéo non supporté (MP4, WebM ou MOV).";
  }
  if (file.size > 60 * 1024 * 1024) {
    return "Vidéo trop volumineuse (60 Mo maximum).";
  }
  const duration = await getVideoDuration(file);
  if (duration !== null && duration > MAX_VIDEO_DURATION + 0.5) {
    return `La vidéo dure ${Math.round(duration)} s : 30 secondes maximum.`;
  }
  return null;
}

/**
 * Téléverse un fichier vers la médiathèque. Renvoie le chemin public
 * ("/uploads/…") ou lève une erreur avec le message du serveur.
 */
export async function uploadFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/admin/api/upload", { method: "POST", body });
  const data = (await res.json().catch(() => null)) as { path?: string; error?: string } | null;
  if (!res.ok || !data?.path) {
    throw new Error(data?.error ?? "Échec du téléversement.");
  }
  return data.path;
}
