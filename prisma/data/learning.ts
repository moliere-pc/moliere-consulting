/** Formations MOLIÈRE Social Media (bilingue). */

const img = (f: string) => `/images/seed/${f}`;

export type CourseSeed = {
  slug: string;
  image: string;
  duration: string;
  format: "ONLINE" | "INPERSON" | "HYBRID";
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  price: string;
  order: number;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  instructorFr: string;
  instructorEn: string;
  contentFr: string;
  contentEn: string;
};

export const COURSES: CourseSeed[] = [
  {
    slug: "marketing-digital-reseaux-sociaux",
    image: img("course-3.jpg"),
    duration: "6 semaines · 2 séances/semaine",
    format: "HYBRID",
    level: "BEGINNER",
    price: "75 000 FCFA",
    order: 1,
    titleFr: "Marketing digital & réseaux sociaux",
    titleEn: "Digital marketing & social media",
    excerptFr:
      "Maîtrisez Facebook, Instagram et TikTok de A à Z : stratégie, publication, community management et premiers résultats concrets.",
    excerptEn:
      "Master Facebook, Instagram and TikTok from A to Z: strategy, posting, community management and your first real results.",
    instructorFr: "Équipe Social Media MOLIÈRE",
    instructorEn: "MOLIÈRE Social Media team",
    contentFr: `
<p>Une formation pensée pour les entrepreneurs, commerçants et salariés qui veulent utiliser les réseaux sociaux comme un vrai canal de vente — pas seulement pour publier des photos.</p>
<h3>Objectifs</h3>
<ul>
<li>Construire une stratégie de contenu claire pour votre activité ;</li>
<li>Paramétrer des pages professionnelles qui convertissent ;</li>
<li>Écrire des publications qui engagent et vendent ;</li>
<li>Répondre aux clients et gérer une communauté ;</li>
<li>Lancer votre première publicité sans jeter l'argent par la fenêtre.</li>
</ul>
<h3>Programme</h3>
<ol>
<li>Écosystème des réseaux au Cameroun et comportements clients</li>
<li>Positionnement, cible et tunnel de vente social</li>
<li>Création et optimisation des pages</li>
<li>Atelier de contenu : visuels simples avec téléphone</li>
<li>Stories, reels et TikTok : les formats qui marchent</li>
<li>Introduction à la publicité Meta/TikTok</li>
<li>Community management et WhatsApp Business</li>
<li>Projet de fin de formation : stratégie complète de votre marque</li>
</ol>
<h3>Prérequis</h3>
<p>Aucun ! Avoir un smartphone et une activité (ou un projet) à promouvoir suffit.</p>`,
    contentEn: `
<p>A course designed for entrepreneurs, traders and employees who want to use social media as a real sales channel — not just to post photos.</p>
<h3>Objectives</h3>
<ul>
<li>Build a clear content strategy for your business;</li>
<li>Set up professional pages that convert;</li>
<li>Write posts that engage and sell;</li>
<li>Reply to customers and manage a community;</li>
<li>Launch your first ad without wasting money.</li>
</ul>
<h3>Program</h3>
<ol>
<li>Social media ecosystem in Cameroon and customer behaviour</li>
<li>Positioning, audience and social sales funnel</li>
<li>Page creation and optimisation</li>
<li>Content workshop: simple visuals with a phone</li>
<li>Stories, reels and TikTok: formats that work</li>
<li>Introduction to Meta/TikTok advertising</li>
<li>Community management and WhatsApp Business</li>
<li>Final project: your brand's complete strategy</li>
</ol>
<h3>Prerequisites</h3>
<p>None! A smartphone and a business (or project) to promote are enough.</p>`,
  },
  {
    slug: "creation-contenu-video-smartphone",
    image: img("course-2.jpg"),
    duration: "4 semaines · pratique intensive",
    format: "INPERSON",
    level: "BEGINNER",
    price: "60 000 FCFA",
    order: 2,
    titleFr: "Création de contenu vidéo avec smartphone",
    titleEn: "Smartphone video content creation",
    excerptFr:
      "Tournez et montez des vidéos professionnelles (TikTok, Reels, pubs) sans matériel coûteux, uniquement avec votre téléphone.",
    excerptEn:
      "Shoot and edit professional videos (TikTok, Reels, ads) with no expensive gear — just your phone.",
    instructorFr: "Vidéastes MOLIÈRE",
    instructorEn: "MOLIÈRE videographers",
    contentFr: `
<p>Les meilleures vidéos qui font vendre en Afrique sont souvent tournées au téléphone. Apprenez à capturer, éclairer, monter et sous-titrer comme un pro avec ce que vous avez déjà en poche.</p>
<h3>Objectifs</h3>
<ul>
<li>Maîtriser les réglages caméra du smartphone ;</li>
<li>Composer, cadrer et éclairer sans matériel cher ;</li>
<li>Réaliser des vidéos qui retiennent l'attention en 3 secondes ;</li>
<li>Monter avec les applications mobiles professionnelles ;</li>
<li>Publier des reels/TikTok optimisés pour la portée.</li>
</ul>
<h3>Programme</h3>
<ol>
<li>Anatomie d'une vidéo qui marche (hook, rythme, CTA)</li>
<li>Techniques de tournage au smartphone</li>
<li>Lumière et son avec les moyens du bord</li>
<li>Mise en scène produit et face caméra</li>
<li>Montage sur CapCut : coupe, transitions, sous-titres</li>
<li>Habillage, musiques et tendances</li>
<li>Atelier : 3 vidéos terminées pour votre marque</li>
</ol>
<h3>Prérequis</h3>
<p>Un smartphone récent (Android ou iPhone), aucun logiciel payant requis.</p>`,
    contentEn: `
<p>The best selling videos in Africa are often shot on a phone. Learn to capture, light, edit and subtitle like a pro with what you already have in your pocket.</p>
<h3>Objectives</h3>
<ul>
<li>Master smartphone camera settings;</li>
<li>Compose, frame and light without expensive gear;</li>
<li>Make videos that hold attention in 3 seconds;</li>
<li>Edit with professional mobile apps;</li>
<li>Publish reach-optimised reels/TikTok videos.</li>
</ul>
<h3>Program</h3>
<ol>
<li>Anatomy of a successful video (hook, rhythm, CTA)</li>
<li>Smartphone shooting techniques</li>
<li>Lighting and sound with everyday means</li>
<li>Product and talking-head staging</li>
<li>CapCut editing: cuts, transitions, subtitles</li>
<li>Branding, music and trends</li>
<li>Workshop: 3 finished videos for your brand</li>
</ol>
<h3>Prerequisites</h3>
<p>A recent smartphone (Android or iPhone); no paid software needed.</p>`,
  },
  {
    slug: "e-commerce-whatsapp-mobile-money",
    image: img("course-4.jpg"),
    duration: "5 semaines · 2 séances/semaine",
    format: "HYBRID",
    level: "INTERMEDIATE",
    price: "85 000 FCFA",
    order: 3,
    titleFr: "E-commerce & vente en ligne (WhatsApp + Mobile Money)",
    titleEn: "E-commerce & online selling (WhatsApp + Mobile Money)",
    excerptFr:
      "Lancez une boutique qui vend vraiment au Cameroun : sourcing, catalogue en ligne, vente WhatsApp et encaissement Mobile Money.",
    excerptEn:
      "Launch a shop that actually sells in Cameroon: sourcing, online catalogue, WhatsApp sales and Mobile Money checkout.",
    instructorFr: "Équipe MOLIÈRE Cargo & Social Media",
    instructorEn: "MOLIÈRE Cargo & Social Media team",
    contentFr: `
<p>Au Cameroun, l'e-commerce qui réussit passe par WhatsApp, les réseaux sociaux et le Mobile Money — pas par des sites compliqués. Cette formation vous donne un système de vente complet, de l'approvisionnement à la livraison.</p>
<h3>Objectifs</h3>
<ul>
<li>Choisir des produits gagnants et trouver des fournisseurs fiables (Chine incluse) ;</li>
<li>Créer un catalogue et une vitrine en ligne ;</li>
<li>Vendre et conclure dans la discussion WhatsApp ;</li>
<li>Encaisser via Mobile Money et gérer les livraisons ;</li>
<li>Suivre vos marges et faire grossir votre chiffre d'affaires.</li>
</ul>
<h3>Programme</h3>
<ol>
<li>Modèles de e-commerce adaptés au Cameroun</li>
<li>Sourcing local et import depuis la Chine (avec Molière Cargo)</li>
<li>Calcul des coûts, marges et prix de vente</li>
<li>WhatsApp Business : catalogue, étiquettes, automatisations</li>
<li>Boutiques Facebook/Instagram et mini-sites</li>
<li>Photos produits et descriptions qui vendent</li>
<li>Publicité ciblée pour générer des commandes</li>
<li>Mobile Money, logistique du dernier kilomètre et service client</li>
</ol>
<h3>Prérequis</h3>
<p>Avoir suivi le module marketing digital ou une première expérience de vente en ligne.</p>`,
    contentEn: `
<p>In Cameroon, successful e-commerce runs on WhatsApp, social media and Mobile Money — not complicated websites. This course gives you a complete selling system, from sourcing to delivery.</p>
<h3>Objectives</h3>
<ul>
<li>Choose winning products and reliable suppliers (China included);</li>
<li>Create an online catalogue and storefront;</li>
<li>Sell and close inside the WhatsApp chat;</li>
<li>Collect payments via Mobile Money and manage deliveries;</li>
<li>Track margins and grow your revenue.</li>
</ul>
<h3>Program</h3>
<ol>
<li>E-commerce models adapted to Cameroon</li>
<li>Local sourcing and imports from China (with Molière Cargo)</li>
<li>Costs, margins and sale-price calculation</li>
<li>WhatsApp Business: catalogue, labels, automations</li>
<li>Facebook/Instagram shops and mini-sites</li>
<li>Product photos and descriptions that sell</li>
<li>Targeted ads to generate orders</li>
<li>Mobile Money, last-mile logistics and customer service</li>
</ol>
<h3>Prerequisites</h3>
<p>Completion of the digital marketing module or first online selling experience.</p>`,
  },
  {
    slug: "graphisme-canva-identite-visuelle",
    image: img("course-1.jpg"),
    duration: "3 semaines · ateliers pratiques",
    format: "ONLINE",
    level: "BEGINNER",
    price: "45 000 FCFA",
    order: 4,
    titleFr: "Graphisme & identité visuelle avec Canva",
    titleEn: "Graphic design & visual identity with Canva",
    excerptFr:
      "Créez vous-même vos logos, flyers et visuels réseaux avec des méthodes de designer, sans abonnement coûteux.",
    excerptEn:
      "Create your own logos, flyers and social visuals with designer methods, without expensive subscriptions.",
    instructorFr: "Designers MOLIÈRE",
    instructorEn: "MOLIÈRE designers",
    contentFr: `
<p>Inutile de payer un graphiste pour chaque visuel : apprenez à créer des supports professionnels vous-même, avec les codes et les raccourcis des agences.</p>
<h3>Objectifs</h3>
<ul>
<li>Maîtriser les principes visuels (couleurs, typographies, hiérarchie) ;</li>
<li>Créer un logo simple et une identité cohérente ;</li>
<li>Produire flyers, affiches et visuels réseaux en série ;</li>
<li>Utiliser Canva efficacement et sans fautes de goût ;</li>
<li>Préparer des fichiers prêts à imprimer.</li>
</ul>
<h3>Programme</h3>
<ol>
<li>Bases du design : équilibre, contraste, alignement</li>
<li>Psychologie des couleurs et identité de marque</li>
<li>Typographie et hiérarchie de l'information</li>
<li>Atelier logo et charte graphique</li>
<li>Flyers, affiches et supports imprimés</li>
<li>Visuels réseaux et templates réutilisables</li>
<li>Projet : kit visuel complet de votre entreprise</li>
</ol>
<h3>Prérequis</h3>
<p>Aucun. La formation se déroule sur ordinateur ou tablette avec Canva (version gratuite).</p>`,
    contentEn: `
<p>No need to pay a designer for every visual: learn to create professional materials yourself, using agency-grade rules and shortcuts.</p>
<h3>Objectives</h3>
<ul>
<li>Master visual principles (colours, typography, hierarchy);</li>
<li>Create a simple logo and a coherent identity;</li>
<li>Produce flyers, posters and social visuals in batches;</li>
<li>Use Canva effectively and tastefully;</li>
<li>Prepare print-ready files.</li>
</ul>
<h3>Program</h3>
<ol>
<li>Design basics: balance, contrast, alignment</li>
<li>Colour psychology and brand identity</li>
<li>Typography and information hierarchy</li>
<li>Logo and brand guidelines workshop</li>
<li>Flyers, posters and print materials</li>
<li>Social visuals and reusable templates</li>
<li>Project: your company's complete visual kit</li>
</ol>
<h3>Prerequisites</h3>
<p>None. The course runs on a computer or tablet with Canva (free plan).</p>`,
  },
];
