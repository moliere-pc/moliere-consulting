/* Données structurées JSON-LD (Schema.org) */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu est produit côté serveur à partir des données de la base
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd({
  settings,
}: {
  settings: {
    email: string;
    phone: string;
    cityFr: string;
    socials: Partial<Record<string, string>>;
  };
}) {
  const sameAs = Object.values(settings.socials).filter(Boolean) as string[];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://moliereservice.com/#organization",
        name: "MOLIÈRE CONSULTING",
        url: "https://moliereservice.com",
        logo: "https://moliereservice.com/images/logo-mark.png",
        image: "https://moliereservice.com/images/seed/og-default.jpg",
        email: settings.email,
        telephone: settings.phone,
        description:
          "Cabinet conseil camerounais : voyages Chine et Canada (bourses, visas, travail, immigration), import-export Chine-Cameroun et agence digitale.",
        address: {
          "@type": "PostalAddress",
          addressLocality: settings.cityFr,
          addressCountry: "CM",
        },
        areaServed: ["CM", "CN", "CA"],
        foundingDate: "2023",
        sameAs,
      }}
    />
  );
}

export function FaqPageJsonLd({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  image?: string | null;
  datePublished: string;
  dateModified: string;
  author?: string | null;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: image ? [`https://moliereservice.com${image}`] : undefined,
        datePublished,
        dateModified,
        author: { "@type": "Organization", name: author || "MOLIÈRE CONSULTING" },
        publisher: {
          "@type": "Organization",
          name: "MOLIÈRE CONSULTING",
          logo: {
            "@type": "ImageObject",
            url: "https://moliereservice.com/images/seed/og-default.jpg",
          },
        },
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
  areaServed,
}: {
  name: string;
  description: string;
  url: string;
  areaServed: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `https://moliereservice.com${url}`,
        serviceType: "TravelAgency",
        areaServed: { "@type": "Country", name: areaServed },
        provider: {
          "@type": "ProfessionalService",
          name: "MOLIÈRE CONSULTING",
          url: "https://moliereservice.com",
        },
      }}
    />
  );
}
