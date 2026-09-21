import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import type { ListRow } from "./entity-config";

export function ResourceList({
  entity,
  singular,
  rows,
  publishedKey,
}: {
  entity: string;
  singular: string;
  rows: ListRow[];
  publishedKey?: boolean;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-ink-950">{entity}</h1>
        <Link
          href={`/admin/${entity}/new`}
          prefetch={false}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-card transition-all hover:brightness-110"
        >
          <Plus size={17} />
          Nouveau
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-150 bg-white">
        {rows.length === 0 ? (
          <p className="px-6 py-14 text-center text-sm text-ink-400">
            Aucun {singular.toLowerCase()} pour le moment.
          </p>
        ) : (
          <ul className="divide-y divide-ink-100">
            {rows.map((row) => (
              <li key={row.id}>
                <Link
                  href={`/admin/${entity}/${row.id}`}
                  prefetch={false}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-cream/60"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink-900">{row.title}</p>
                    {row.subtitle && (
                      <p className="mt-0.5 truncate text-xs text-ink-400">{row.subtitle}</p>
                    )}
                  </div>
                  {row.badges.length > 0 && (
                    <span className="hidden gap-1.5 sm:flex">
                      {row.badges.map((badge, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-gold-50 px-2.5 py-1 text-[11px] font-bold text-gold-700"
                        >
                          {badge}
                        </span>
                      ))}
                    </span>
                  )}
                  {row.published !== undefined && (
                    <span
                      title={row.published ? "Publié" : "Masqué"}
                      className={row.published ? "text-emerald-500" : "text-ink-300"}
                    >
                      {row.published ? <Eye size={17} /> : <EyeOff size={17} />}
                    </span>
                  )}
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    <Pencil size={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
