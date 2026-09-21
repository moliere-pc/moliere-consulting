"use client";

import { useActionState, useRef, useState } from "react";
import { Loader2, Save, CheckCircle2, UploadCloud, X } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";
import { saveSettingsAction, type SettingsState } from "./actions";
import { uploadFile, validateVideoFile } from "@/lib/video-client";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-shadow placeholder:text-ink-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  textarea,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-800">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue ?? ""}
          rows={3}
          placeholder={placeholder}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {hint && <span className="mt-1 block text-xs text-ink-400">{hint}</span>}
    </label>
  );
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-ink-150 bg-white p-6 sm:p-7">
      <h2 className="text-lg font-bold text-ink-950">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

const SOCIALS = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "youtube", label: "YouTube" },
];

function VideoSlot({
  name,
  defaultValue,
  index,
}: {
  name: string;
  defaultValue: string;
  index: number;
}) {
  const [path, setPath] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | null) {
    if (!file) return;
    const error = await validateVideoFile(file);
    if (error) {
      window.alert(error);
      return;
    }
    setBusy(true);
    try {
      setPath(await uploadFile(file));
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Échec de l'envoi");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-2xl border border-ink-150 bg-cream/50 p-3">
      <input type="hidden" name={name} value={path} />
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">
        Vidéo {index + 1}
      </p>
      {path ? (
        <div className="group relative">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={path}
            controls
            muted
            playsInline
            preload="none"
            className="aspect-video w-full rounded-xl bg-ink-950 object-cover"
          />
          <button
            type="button"
            onClick={() => setPath("")}
            title="Retirer cette vidéo"
            className="absolute -right-2 -top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-soft transition-colors hover:bg-brand-700"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-250 bg-white text-ink-400 transition-colors hover:border-brand-400 hover:text-brand-600 disabled:opacity-60"
        >
          {busy ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            <UploadCloud size={24} />
          )}
          <span className="text-xs font-semibold">
            {busy ? "Envoi en cours…" : "Choisir une vidéo"}
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/x-m4v"
        className="sr-only"
        onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState<SettingsState, FormData>(
    saveSettingsAction,
    {}
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-950">Réglages du site</h1>
          <p className="mt-1 text-sm text-ink-500">
            Coordonnées, WhatsApp et accroche de la page d'accueil.
          </p>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-card transition-all hover:brightness-110 disabled:opacity-60"
        >
          {pending ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
          Enregistrer les réglages
        </button>
      </div>

      {state.error && (
        <div
          role="alert"
          className="rounded-xl border border-brand-300 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700"
        >
          {state.error}
        </div>
      )}
      {state.ok && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
        >
          <CheckCircle2 size={17} />
          Réglages enregistrés.
        </div>
      )}

      <Card title="Contact & WhatsApp" description="Toutes les demandes du site pointent vers ce numéro.">
        <Field
          label="Numéro WhatsApp (international, sans +)"
          name="whatsappNumber"
          defaultValue={settings.whatsappNumber}
          placeholder="327696307969"
          hint="Ex : 327696307969"
        />
        <Field label="Téléphone affiché" name="phone" defaultValue={settings.phone} />
        <Field label="Adresse e-mail" name="email" type="email" defaultValue={settings.email} />
        <Field
          label="Lien du groupe d'information (optionnel)"
          name="infoGroupUrl"
          defaultValue={settings.infoGroupUrl}
          placeholder="https://chat.whatsapp.com/…"
        />
        <Field
          label="Message WhatsApp par défaut (FR)"
          name="whatsappDefaultFr"
          defaultValue={settings.whatsappDefaultFr}
          textarea
        />
        <Field
          label="Message WhatsApp par défaut (EN)"
          name="whatsappDefaultEn"
          defaultValue={settings.whatsappDefaultEn}
          textarea
        />
      </Card>

      <Card title="Localisation & horaires">
        <Field label="Villes (FR)" name="cityFr" defaultValue={settings.cityFr} />
        <Field label="Villes (EN)" name="cityEn" defaultValue={settings.cityEn} />
        <Field label="Adresse / bureaux (FR)" name="addressFr" defaultValue={settings.addressFr} />
        <Field label="Adresse / bureaux (EN)" name="addressEn" defaultValue={settings.addressEn} />
        <Field label="Horaires (FR)" name="hoursFr" defaultValue={settings.hoursFr} />
        <Field label="Horaires (EN)" name="hoursEn" defaultValue={settings.hoursEn} />
      </Card>

      <Card title="Réseaux sociaux" description="Laissez vide pour masquer un réseau.">
        {SOCIALS.map((social) => (
          <Field
            key={social.key}
            label={social.label}
            name={`socials.${social.key}`}
            defaultValue={settings.socials[social.key as keyof typeof settings.socials]}
            placeholder="https://…"
          />
        ))}
      </Card>

      <Card
        title="Vidéos de la page d'accueil"
        description="Jusqu'à 3 clips de 30 secondes maximum (MP4, WebM ou MOV — 60 Mo). Laissez un emplacement vide pour le masquer."
      >
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <VideoSlot
              key={i}
              index={i}
              name={`homeVideo${i}`}
              defaultValue={settings.homeVideos[i] ?? ""}
            />
          ))}
        </div>
      </Card>

      <Card title="Accroche page d'accueil — Français">
        <Field label="Badge" name="heroFr.badge" defaultValue={settings.heroFr.badge} />
        <Field label="Titre, ligne 1" name="heroFr.titleLine1" defaultValue={settings.heroFr.titleLine1} />
        <Field label="Titre, ligne 2" name="heroFr.titleLine2" defaultValue={settings.heroFr.titleLine2} />
        <Field label="Sous-titre" name="heroFr.subtitle" defaultValue={settings.heroFr.subtitle} textarea />
      </Card>

      <Card title="Homepage headline — English">
        <Field label="Badge" name="heroEn.badge" defaultValue={settings.heroEn.badge} />
        <Field label="Title, line 1" name="heroEn.titleLine1" defaultValue={settings.heroEn.titleLine1} />
        <Field label="Title, line 2" name="heroEn.titleLine2" defaultValue={settings.heroEn.titleLine2} />
        <Field label="Subtitle" name="heroEn.subtitle" defaultValue={settings.heroEn.subtitle} textarea />
      </Card>
    </form>
  );
}
