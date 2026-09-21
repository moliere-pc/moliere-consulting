"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, Trash2, Copy, Check, Film } from "lucide-react";
import { uploadFile, validateVideoFile } from "@/lib/video-client";

type MediaItem = { id: string; path: string; size: number; kind: string; createdAt: string };

function formatSize(bytes: number) {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
  return `${Math.round(bytes / 1024)} Ko`;
}

export function MediaGrid({
  items,
  deleteAction,
}: {
  items: MediaItem[];
  deleteAction: (formData: FormData) => void | Promise<void>;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [total, setTotal] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setTotal(files.length);
    setUploading(0);
    for (const file of Array.from(files)) {
      const isVideo = file.type.startsWith("video/");
      if (isVideo) {
        const error = await validateVideoFile(file);
        if (error) {
          window.alert(`${file.name} : ${error}`);
          continue;
        }
      }
      try {
        await uploadFile(file);
        setUploading((n) => n + 1);
      } catch (err) {
        window.alert(`${file.name} : ${err instanceof Error ? err.message : "Échec de l'envoi"}`);
      }
    }
    setTotal(0);
    setUploading(0);
    router.refresh();
  }

  async function copyPath(p: string) {
    await navigator.clipboard.writeText(p);
    setCopied(p);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-950">Médiathèque</h1>
          <p className="mt-1 text-sm text-ink-500">
            Images optimisées (WebP, 2000 px) et vidéos d&apos;accueil (30 s max, 60 Mo).
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm,video/quicktime,video/x-m4v"
          className="sr-only"
          onChange={(e) => void handleFiles(e.target.files)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={total > 0}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-card transition-all hover:brightness-110 disabled:opacity-60"
        >
          {total > 0 ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Envoi {uploading}/{total}
            </>
          ) : (
            <>
              <UploadCloud size={17} />
              Téléverser images / vidéos
            </>
          )}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-250 bg-white py-20 text-center">
          <UploadCloud size={36} className="mx-auto text-ink-300" />
          <p className="mt-3 text-sm text-ink-400">Aucun média pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            const isVideo = item.kind === "VIDEO";
            return (
              <figure
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-ink-150 bg-white shadow-soft"
              >
                <div className="relative aspect-[4/3] bg-ink-950">
                  {isVideo ? (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                      <video
                        src={item.path}
                        muted
                        playsInline
                        preload="none"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-ink-950/75 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-300 backdrop-blur">
                        <Film size={11} />
                        30 s
                      </span>
                    </>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.path}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <form
                    action={deleteAction}
                    onSubmit={(e) => {
                      if (
                        !window.confirm(
                          isVideo ? "Supprimer cette vidéo ?" : "Supprimer cette image ?"
                        )
                      )
                        e.preventDefault();
                    }}
                    className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      title="Supprimer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/75 text-white backdrop-blur transition-colors hover:bg-brand-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </form>
                </div>
                <figcaption className="space-y-2 p-3">
                  <button
                    type="button"
                    onClick={() => void copyPath(item.path)}
                    title="Copier le chemin"
                    className="flex w-full items-center gap-1.5 truncate rounded-lg bg-cream px-2.5 py-1.5 text-left text-[11px] font-semibold text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {copied === item.path ? (
                      <Check size={13} className="shrink-0 text-emerald-600" />
                    ) : (
                      <Copy size={13} className="shrink-0" />
                    )}
                    <span className="truncate">{item.path}</span>
                  </button>
                  <span className="block text-[11px] text-ink-400">{formatSize(item.size)}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}
    </div>
  );
}
