/**
 * Configuration des entités du back-office : champs de formulaire
 * (les champs bilingues sont dupliqués en Fr/En automatiquement)
 * et normalisation des lignes de liste.
 */

export type EntitySlug =
  | "poles"
  | "services"
  | "courses"
  | "posts"
  | "testimonials"
  | "faqs"
  | "stats";

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "checkbox"
  | "image"
  | "datetime"
  | "select"
  | "tags"
  | "steps";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  bilingual?: boolean;
  required?: boolean;
  span2?: boolean;
  hint?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
  optionsFrom?: "poles" | "services";
};

export type EntityDef = {
  slug: EntitySlug;
  singular: string;
  titleKey: string; // champ utilisé comme titre dans la liste
  hasOrder?: boolean;
  hasPublished?: boolean;
  fields: FieldDef[];
};

const COUNTRY_OPTIONS = [
  { value: "CHINA", label: "Chine" },
  { value: "CANADA", label: "Canada" },
];

const MOTIVE_OPTIONS = [
  { value: "STUDY", label: "Études & bourses" },
  { value: "WORK", label: "Travail" },
  { value: "VISITOR", label: "Visiteur / Tourisme" },
  { value: "BUSINESS", label: "Affaires" },
  { value: "IMMIGRATION", label: "Immigration" },
];

const CATEGORY_OPTIONS = [
  { value: "VOYAGE", label: "Voyages" },
  { value: "CARGO", label: "Cargo" },
  { value: "DIGITAL", label: "Digital" },
  { value: "OPPORTUNITIES", label: "Opportunités" },
];

const FORMAT_OPTIONS = [
  { value: "ONLINE", label: "En ligne" },
  { value: "INPERSON", label: "Présentiel" },
  { value: "HYBRID", label: "Hybride" },
];

const LEVEL_OPTIONS = [
  { value: "BEGINNER", label: "Débutant" },
  { value: "INTERMEDIATE", label: "Intermédiaire" },
  { value: "ADVANCED", label: "Avancé" },
];

export const ENTITIES: Record<EntitySlug, EntityDef> = {
  poles: {
    slug: "poles",
    singular: "Pôle",
    titleKey: "nameFr",
    hasOrder: true,
    hasPublished: true,
    fields: [
      { name: "slug", label: "Identifiant URL", type: "text", required: true, hint: "Ex : voyages, cargo, social-media (unique)" },
      { name: "icon", label: "Icône", type: "text", hint: "plane · ship · share · graduation · package…" },
      { name: "image", label: "Image principale", type: "image", span2: true },
      { name: "name", label: "Nom", type: "text", bilingual: true, required: true },
      { name: "tagline", label: "Accroche courte", type: "text", bilingual: true },
      { name: "short", label: "Résumé", type: "textarea", bilingual: true, required: true, span2: true },
      { name: "description", label: "Description", type: "textarea", bilingual: true, required: true, span2: true },
      { name: "content", label: "Contenu détaillé", type: "richtext", bilingual: true, span2: true },
    ],
  },

  services: {
    slug: "services",
    singular: "Service",
    titleKey: "titleFr",
    hasOrder: true,
    hasPublished: true,
    fields: [
      { name: "poleId", label: "Pôle", type: "select", required: true, optionsFrom: "poles" },
      { name: "slug", label: "Identifiant URL", type: "text", required: true, hint: "Ex : china-study, cargo-sea, social-ads (unique)" },
      { name: "country", label: "Pays (pôle Voyages uniquement)", type: "select", options: COUNTRY_OPTIONS },
      { name: "motive", label: "Motif (pôle Voyages uniquement)", type: "select", options: MOTIVE_OPTIONS },
      { name: "icon", label: "Icône", type: "text" },
      { name: "image", label: "Image", type: "image", span2: true },
      { name: "isHighlighted", label: "Service mis en avant", type: "checkbox", span2: true },
      { name: "title", label: "Titre", type: "text", bilingual: true, required: true },
      { name: "short", label: "Résumé court", type: "textarea", bilingual: true, required: true, span2: true },
      { name: "description", label: "Description détaillée", type: "richtext", bilingual: true, required: true, span2: true },
      { name: "bullets", label: "Points clés", type: "tags", bilingual: true, span2: true },
      { name: "steps", label: "Étapes du processus", type: "steps", bilingual: true, span2: true },
    ],
  },

  courses: {
    slug: "courses",
    singular: "Formation",
    titleKey: "titleFr",
    hasOrder: true,
    hasPublished: true,
    fields: [
      { name: "slug", label: "Identifiant URL", type: "text", required: true },
      { name: "image", label: "Image", type: "image", span2: true },
      { name: "videoUrl", label: "Lien vidéo", type: "text" },
      { name: "duration", label: "Durée", type: "text", placeholder: "Ex : 3 jours · 12 heures" },
      { name: "format", label: "Format", type: "select", options: FORMAT_OPTIONS },
      { name: "level", label: "Niveau", type: "select", options: LEVEL_OPTIONS },
      { name: "price", label: "Prix", type: "text", placeholder: "75 000 FCFA", hint: "Laisser vide = « sur demande »" },
      { name: "title", label: "Titre", type: "text", bilingual: true, required: true },
      { name: "excerpt", label: "Résumé", type: "textarea", bilingual: true, required: true, span2: true },
      { name: "content", label: "Programme détaillé", type: "richtext", bilingual: true, required: true, span2: true },
      { name: "instructor", label: "Formateur", type: "text", bilingual: true },
    ],
  },

  posts: {
    slug: "posts",
    singular: "Article",
    titleKey: "titleFr",
    hasOrder: true,
    hasPublished: true,
    fields: [
      { name: "slug", label: "Identifiant URL", type: "text", required: true },
      { name: "category", label: "Catégorie", type: "select", required: true, options: CATEGORY_OPTIONS },
      { name: "author", label: "Auteur" , type: "text" },
      { name: "publishedAt", label: "Date de publication", type: "datetime" },
      { name: "image", label: "Image de couverture", type: "image", span2: true },
      { name: "title", label: "Titre", type: "text", bilingual: true, required: true },
      { name: "excerpt", label: "Extrait", type: "textarea", bilingual: true, required: true, span2: true },
      { name: "content", label: "Contenu de l'article", type: "richtext", bilingual: true, required: true, span2: true },
    ],
  },

  testimonials: {
    slug: "testimonials",
    singular: "Témoignage",
    titleKey: "name",
    hasOrder: true,
    hasPublished: true,
    fields: [
      { name: "name", label: "Nom du client", type: "text", required: true },
      { name: "city", label: "Ville", type: "text", placeholder: "Douala · Yaoundé" },
      { name: "poleId", label: "Pôle concerné", type: "select", optionsFrom: "poles" },
      { name: "rating", label: "Note (1 à 5)", type: "number", min: 1, max: 5 },
      { name: "photo", label: "Photo", type: "image", span2: true },
      { name: "role", label: "Fonction / contexte", type: "text", bilingual: true, span2: true },
      { name: "quote", label: "Témoignage", type: "textarea", bilingual: true, required: true, span2: true },
    ],
  },

  faqs: {
    slug: "faqs",
    singular: "Question",
    titleKey: "questionFr",
    hasOrder: true,
    hasPublished: true,
    fields: [
      { name: "poleId", label: "Pôle", type: "select", optionsFrom: "poles", required: true },
      { name: "serviceId", label: "Service (optionnel)", type: "select", optionsFrom: "services", hint: "FAQ affichée sur la page du service si renseigné, sinon sur le pôle." },
      { name: "question", label: "Question", type: "text", bilingual: true, required: true, span2: true },
      { name: "answer", label: "Réponse", type: "textarea", bilingual: true, required: true, span2: true },
    ],
  },

  stats: {
    slug: "stats",
    singular: "Statistique",
    titleKey: "value",
    hasOrder: true,
    hasPublished: true,
    fields: [
      { name: "icon", label: "Icône", type: "text", hint: "users · plane · package · badge…" },
      { name: "value", label: "Valeur affichée", type: "text", required: true, placeholder: "150+ · 98%" },
      { name: "label", label: "Légende", type: "text", bilingual: true, required: true, span2: true },
    ],
  },
};

/* ---------- Normalisation des lignes de liste ---------- */

const COUNTRY_LABELS: Record<string, string> = { CHINA: "Chine", CANADA: "Canada" };
const MOTIVE_LABELS: Record<string, string> = {
  STUDY: "Études",
  WORK: "Travail",
  VISITOR: "Visiteur",
  BUSINESS: "Affaires",
  IMMIGRATION: "Immigration",
};
const CATEGORY_LABELS: Record<string, string> = {
  VOYAGE: "Voyages",
  CARGO: "Cargo",
  DIGITAL: "Digital",
  OPPORTUNITIES: "Opportunités",
};

export type ListRow = {
  id: string;
  title: string;
  subtitle?: string;
  badges: string[];
  published?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toListRowRaw(slug: EntitySlug, row: any): Omit<ListRow, "published"> {
  switch (slug) {
    case "poles":
      return {
        id: row.id,
        title: row.nameFr,
        subtitle: row.slug,
        badges: [],
      };
    case "services": {
      const badges: string[] = [];
      if (row.country) badges.push(COUNTRY_LABELS[row.country] ?? row.country);
      if (row.motive) badges.push(MOTIVE_LABELS[row.motive] ?? row.motive);
      return { id: row.id, title: row.titleFr, subtitle: row.slug, badges };
    }
    case "courses":
      return { id: row.id, title: row.titleFr, subtitle: row.price ?? "Sur demande", badges: [] };
    case "posts":
      return {
        id: row.id,
        title: row.titleFr,
        subtitle: row.slug,
        badges: [CATEGORY_LABELS[row.category] ?? row.category],
      };
    case "testimonials":
      return {
        id: row.id,
        title: row.name,
        subtitle: [row.city, `${"★".repeat(row.rating ?? 5)}`].filter(Boolean).join(" · "),
        badges: [],
      };
    case "faqs":
      return { id: row.id, title: row.questionFr, subtitle: row.answerFr?.slice(0, 90), badges: [] };
    case "stats":
      return { id: row.id, title: row.value, subtitle: row.labelFr, badges: [] };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toListRow(slug: EntitySlug, row: any): ListRow {
  return {
    ...toListRowRaw(slug, row),
    published: typeof row.published === "boolean" ? row.published : undefined,
  };
}
