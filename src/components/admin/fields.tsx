"use client";

import {
  useRef,
  useState,
  type HTMLInputTypeAttribute,
} from "react";
import {
  Plus,
  X,
  UploadCloud,
  Check,
  Loader2,
  GripVertical,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Coquille de champ ---------- */

export function FieldShell({
  label,
  hint,
  required,
  lang,
  children,
  span2,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  lang?: "FR" | "EN";
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <label className={cn("block", span2 && "sm:col-span-2")}>
      <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink-800">
        {label}
        {required && <span className="text-brand-600">*</span>}
        {lang && (
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide",
              lang === "FR" ? "bg-brand-50 text-brand-700" : "bg-gold-50 text-gold-700"
            )}
          >
            {lang}
          </span>
        )}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-400">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-shadow placeholder:text-ink-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

export function TextField({
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue ?? ""}
      placeholder={placeholder}
      required={required}
      className={inputClass}
    />
  );
}

export function TextAreaField({
  name,
  defaultValue,
  rows = 4,
  required,
}: {
  name: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
}) {
  return (
    <textarea
      name={name}
      defaultValue={defaultValue ?? ""}
      rows={rows}
      required={required}
      className={cn(inputClass, "resize-y")}
    />
  );
}

export function NumberField({
  name,
  defaultValue,
  min,
  max,
}: {
  name: string;
  defaultValue?: number | null;
  min?: number;
  max?: number;
}) {
  return (
    <input
      name={name}
      type="number"
      min={min}
      max={max}
      defaultValue={defaultValue ?? 0}
      className={inputClass}
    />
  );
}

export function DateTimeField({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | Date | null;
}) {
  const value = defaultValue
    ? new Date(defaultValue).toISOString().slice(0, 16)
    : new Date().toISOString().slice(0, 16);
  return <input name={name} type="datetime-local" defaultValue={value} className={inputClass} />;
}

export function SelectField({
  name,
  defaultValue,
  options,
  required,
}: {
  name: string;
  defaultValue?: string | null;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue ?? ""}
      required={required}
      className={cn(inputClass, "bg-white")}
    >
      <option value="">—</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4.5 w-4.5 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-400"
      />
      <span className="text-sm font-semibold text-ink-800">{label}</span>
    </label>
  );
}

/* ---------- Liste de points (bullets) ---------- */

export function TagsField({
  name,
  defaultValue,
  placeholder,
}: {
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
}) {
  const [items, setItems] = useState<string[]>(() => {
    if (!defaultValue) return [];
    try {
      const parsed = JSON.parse(defaultValue);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      return [];
    }
  });
  const [draft, setDraft] = useState("");

  function add() {
    const v = draft.trim();
    if (v && !items.includes(v)) setItems([...items, v]);
    setDraft("");
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className={inputClass}
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-700"
          aria-label="Ajouter"
        >
          <Plus size={18} />
        </button>
      </div>
      {items.length > 0 && (
        <ul className="mt-3 space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-lg border border-ink-150 bg-cream px-3 py-2 text-sm text-ink-700"
            >
              <span className="text-ink-300">
                <GripVertical size={15} />
              </span>
              <span className="flex-1">{item}</span>
              <button
                type="button"
                onClick={() => setItems(items.filter((_, j) => j !== i))}
                className="text-ink-300 transition-colors hover:text-brand-600"
                aria-label="Supprimer"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Étapes [{title, desc}] ---------- */

export function StepsField({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [steps, setSteps] = useState<{ title: string; desc: string }[]>(() => {
    if (!defaultValue) return [];
    try {
      const parsed = JSON.parse(defaultValue);
      return Array.isArray(parsed)
        ? parsed
            .map((s) =>
              s && typeof s === "object"
                ? { title: String(s.title ?? ""), desc: String(s.desc ?? "") }
                : { title: String(s), desc: "" }
            )
            .filter((s: { title: string }) => s.title)
        : [];
    } catch {
      return [];
    }
  });

  function update(i: number, key: "title" | "desc", value: string) {
    setSteps(steps.map((s, j) => (j === i ? { ...s, [key]: value } : s)));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(steps)} />
      {steps.map((step, i) => (
        <div key={i} className="flex gap-2 rounded-xl border border-ink-150 bg-cream p-2.5">
          <span className="mt-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-gradient font-display text-xs font-bold text-white">
            {i + 1}
          </span>
          <div className="flex-1 space-y-2">
            <input
              value={step.title}
              onChange={(e) => update(i, "title", e.target.value)}
              placeholder="Titre de l'étape"
              className={inputClass}
            />
            <input
              value={step.desc}
              onChange={(e) => update(i, "desc", e.target.value)}
              placeholder="Description (optionnel)"
              className={inputClass}
            />
          </div>
          <button
            type="button"
            onClick={() => setSteps(steps.filter((_, j) => j !== i))}
            className="self-start text-ink-300 transition-colors hover:text-brand-600"
            aria-label="Supprimer l'étape"
          >
            <Trash2 size={17} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setSteps([...steps, { title: "", desc: "" }])}
        className="inline-flex items-center gap-2 rounded-xl border border-dashed border-ink-250 px-4 py-2.5 text-sm font-semibold text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-700"
      >
        <Plus size={16} />
        Ajouter une étape
      </button>
    </div>
  );
}

/* ---------- Upload d'image ---------- */

export function ImageField({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [path, setPath] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">(
    defaultValue ? "done" : "idle"
  );
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setStatus("uploading");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/admin/api/upload", { method: "POST", body });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { path: string };
      setPath(data.path);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={path} />
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-ink-200 bg-cream">
          {path ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={path} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center text-ink-300">
              <UploadCloud size={24} />
            </span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={status === "uploading"}
            className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-400 hover:text-brand-700 disabled:opacity-60"
          >
            {status === "uploading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Envoi…
              </>
            ) : (
              <>
                <UploadCloud size={16} />
                {path ? "Changer l'image" : "Téléverser une image"}
              </>
            )}
          </button>
          {path && (
            <button
              type="button"
              onClick={() => {
                setPath("");
                setStatus("idle");
              }}
              className="ml-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink-400 hover:text-brand-600"
            >
              <X size={14} />
              Retirer
            </button>
          )}
          {status === "done" && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <Check size={14} /> Image enregistrée
            </p>
          )}
          {status === "error" && (
            <p className="text-xs font-medium text-brand-600">
              Échec de l'envoi. Réessayez ou collez un chemin d'image.
            </p>
          )}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/images/… ou /uploads/…"
              className={cn(inputClass, "text-xs")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
