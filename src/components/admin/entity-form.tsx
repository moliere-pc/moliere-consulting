"use client";

import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { ENTITIES, type EntitySlug, type FieldDef } from "./entity-config";
import {
  FieldShell,
  TextField,
  TextAreaField,
  NumberField,
  SelectField,
  CheckboxField,
  DateTimeField,
  TagsField,
  StepsField,
  ImageField,
} from "./fields";
import { RichTextEditor } from "./rich-text-editor";

type OptionGroup = {
  poles: { value: string; label: string }[];
  services: { value: string; label: string }[];
};

export function EntityForm({
  entity,
  id,
  initial,
  options,
  saveAction,
  deleteAction,
}: {
  entity: EntitySlug;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial?: Record<string, any> | null;
  options: OptionGroup;
  saveAction: (formData: FormData) => void | Promise<void>;
  deleteAction?: (formData: FormData) => void | Promise<void>;
}) {
  const def = ENTITIES[entity];

  function resolveOptions(field: FieldDef) {
    if (field.options) return field.options;
    if (field.optionsFrom === "poles") return options.poles;
    if (field.optionsFrom === "services") return options.services;
    return [];
  }

  function renderField(field: FieldDef, suffix: "" | "Fr" | "En", lang?: "FR" | "EN") {
    const key = field.name + suffix;
    const value = initial ? initial[key] : undefined;
    const label = field.label;

    if (field.type === "checkbox") {
      return (
        <div key={key} className={field.span2 ? "sm:col-span-2" : undefined}>
          <CheckboxField name={key} label={label} defaultChecked={Boolean(value)} />
        </div>
      );
    }

    let control: React.ReactNode;
    switch (field.type) {
      case "textarea":
        control = <TextAreaField name={key} defaultValue={value} required={field.required} />;
        break;
      case "richtext":
        control = <RichTextEditor name={key} defaultValue={value ?? ""} />;
        break;
      case "number":
        control = <NumberField name={key} defaultValue={value} min={field.min} max={field.max} />;
        break;
      case "select":
        control = (
          <SelectField
            name={key}
            defaultValue={value}
            options={resolveOptions(field)}
            required={field.required}
          />
        );
        break;
      case "datetime":
        control = <DateTimeField name={key} defaultValue={value} />;
        break;
      case "tags":
        control = <TagsField name={key} defaultValue={value} placeholder="Ajouter un point…" />;
        break;
      case "steps":
        control = <StepsField name={key} defaultValue={value} />;
        break;
      case "image":
        control = <ImageField name={key} defaultValue={value} />;
        break;
      default:
        control = (
          <TextField
            name={key}
            defaultValue={value}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }

    return (
      <FieldShell
        key={key}
        label={label}
        hint={field.hint}
        required={field.required}
        lang={lang}
        span2={field.span2}
      >
        {control}
      </FieldShell>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href={`/admin/${entity}`}
            prefetch={false}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-400 transition-colors hover:text-brand-700"
          >
            <ArrowLeft size={16} />
            Retour à la liste
          </Link>
          <h1 className="mt-2 text-2xl font-extrabold text-ink-950">
            {id ? `Modifier : ${def.singular.toLowerCase()}` : `Nouveau : ${def.singular.toLowerCase()}`}
          </h1>
        </div>
        {id && deleteAction && (
          <form
            action={deleteAction}
            onSubmit={(e) => {
              if (!window.confirm("Supprimer définitivement cet élément ?")) e.preventDefault();
            }}
          >
            <input type="hidden" name="__entity" value={entity} />
            <input type="hidden" name="id" value={id} />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              <Trash2 size={16} />
              Supprimer
            </button>
          </form>
        )}
      </div>

      <form action={saveAction} className="space-y-8">
        <input type="hidden" name="__entity" value={entity} />
        {id && <input type="hidden" name="__id" value={id} />}

        {/* Ligne commune : ordre + publication */}
        <div className="grid gap-4 rounded-2xl border border-ink-150 bg-white p-5 sm:grid-cols-[180px_1fr] sm:items-center">
          {def.hasOrder && (
            <FieldShell label="Ordre d'affichage">
              <NumberField name="order" defaultValue={initial?.order ?? 0} />
            </FieldShell>
          )}
          {def.hasPublished && (
            <CheckboxField
              name="published"
              label="Publié (visible sur le site)"
              defaultChecked={initial ? Boolean(initial.published) : true}
            />
          )}
        </div>

        <div className="grid gap-5 rounded-2xl border border-ink-150 bg-white p-5 sm:grid-cols-2 sm:p-7">
          {def.fields.map((field) =>
            field.bilingual ? (
              <div key={field.name} className={field.span2 ? "contents" : "contents"}>
                {renderField(field, "Fr", "FR")}
                {renderField(field, "En", "EN")}
              </div>
            ) : (
              renderField(field, "")
            )
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href={`/admin/${entity}`}
            prefetch={false}
            className="rounded-xl px-5 py-3 text-sm font-semibold text-ink-500 transition-colors hover:bg-ink-50"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-card transition-all hover:brightness-110"
          >
            <Save size={17} />
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
