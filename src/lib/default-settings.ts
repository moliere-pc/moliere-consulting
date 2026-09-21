/**
 * Réglages par défaut du site, partagés entre l'app Next et le script de seed.
 * Aucune dépendance serveur/Next dans ce fichier.
 */

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
  youtube?: string;
};

export type SiteSettings = {
  whatsappNumber: string;
  whatsappDefaultFr: string;
  whatsappDefaultEn: string;
  phone: string;
  email: string;
  cityFr: string;
  cityEn: string;
  addressFr: string;
  addressEn: string;
  socials: SocialLinks;
  infoGroupUrl: string;
  hoursFr: string;
  hoursEn: string;
  logoPath: string | null;
  /** Jusqu'à 3 vidéos d'accueil (30 s max), chemins /uploads/… */
  homeVideos: string[];
  heroFr: { badge: string; titleLine1: string; titleLine2: string; subtitle: string };
  heroEn: { badge: string; titleLine1: string; titleLine2: string; subtitle: string };
};

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: "327696307969",
  whatsappDefaultFr:
    "Bonjour MOLIÈRE CONSULTING, je souhaite obtenir des informations sur vos services.",
  whatsappDefaultEn:
    "Hello MOLIÈRE CONSULTING, I would like information about your services.",
  phone: "+237 678 90 54 56",
  email: "contact@moliereservice.com",
  cityFr: "Douala & Yaoundé, Cameroun",
  cityEn: "Douala & Yaoundé, Cameroon",
  addressFr: "Bureaux à Douala et Yaoundé",
  addressEn: "Offices in Douala and Yaoundé",
  socials: {},
  infoGroupUrl: "",
  hoursFr: "Réponse WhatsApp : 7j/7, 8h – 20h (heure de Douala)",
  hoursEn: "WhatsApp replies: 7 days a week, 8am – 8pm (Douala time)",
  logoPath: null,
  homeVideos: [],
  heroFr: {
    badge: "Entreprise camerounaise · Depuis 2023",
    titleLine1: "Vos ambitions,",
    titleLine2: "sans frontières.",
    subtitle:
      "MOLIÈRE CONSULTING ouvre les portes de la Chine et du Canada, transporte vos marchandises entre l'Asie et le Cameroun, et propulse votre marque dans le monde digital.",
  },
  heroEn: {
    badge: "Cameroonian company · Since 2023",
    titleLine1: "Your ambitions,",
    titleLine2: "without borders.",
    subtitle:
      "MOLIÈRE CONSULTING opens the doors to China and Canada, ships your goods between Asia and Cameroon, and launches your brand into the digital world.",
  },
};
