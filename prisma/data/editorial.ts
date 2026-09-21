/** Contenu éditorial : articles, témoignages, FAQ, statistiques (bilingue). */

const img = (f: string) => `/images/seed/${f}`;

/* ---------------------------------- Posts --------------------------------- */

export type PostSeed = {
  slug: string;
  category: "VOYAGE" | "CARGO" | "DIGITAL" | "OPPORTUNITIES";
  image: string;
  author: string;
  daysAgo: number;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  contentFr: string;
  contentEn: string;
};

export const POSTS: PostSeed[] = [
  {
    slug: "bourses-chine-2026-comment-ca-marche",
    category: "VOYAGE",
    image: img("blog-1.jpg"),
    author: "MOLIÈRE Voyages",
    daysAgo: 8,
    titleFr: "Bourses d'études en Chine 2026 : comment ça marche vraiment",
    titleEn: "China scholarships 2026: how it really works",
    excerptFr:
      "Qui peut postuler, combien ça coûte, quand tombent les résultats ? On répond aux questions que tous les étudiants nous posent.",
    excerptEn:
      "Who can apply, how much it costs, when results come out? We answer the questions every student asks us.",
    contentFr: `
<p>Chaque année, des centaines d'étudiants camerounais nous écrivent sur WhatsApp avec les mêmes questions sur les bourses chinoises. Voici les réponses claires.</p>
<h3>Qui peut postuler ?</h3>
<p>Tout étudiant ayant au moins 10/20 de moyenne, un passeport en cours de validité et une vraie motivation. Les seuils de 10-13/20 donnent accès aux bourses partielles, 14-16/20 aux bourses complètes et 17/20 et plus aux bourses totales.</p>
<h3>Combien ça coûte ?</h3>
<p>Un dépôt de garantie de <strong>500 000 FCFA, entièrement remboursable</strong>, est demandé pour sécuriser la place. Les frais d'accompagnement MOLIÈRE ne sont payés qu'<strong>après l'obtention effective de la bourse</strong>. Pas de résultat = pas de frais.</p>
<h3>Quelles sont les étapes ?</h3>
<p>Huit étapes : contact, évaluation, choix des universités (plus de 150 partenaires), dépôt, constitution du dossier, envoi, lettre d'admission puis visa et départ. Tout est détaillé sur la page Bourses d'études.</p>
<h3>Quand connaît-on les résultats ?</h3>
<p>Les lettres d'admission sont publiées entre <strong>juillet et août</strong>, pour un départ à la rentrée universitaire de septembre/octobre.</p>
<h3>Pourquoi la Chine plutôt que l'Europe ?</h3>
<p>Coût de la vie deux à trois fois inférieur, campus modernes, bourses couvrant jusqu'à la totalité du séjour et diplômes internationalement reconnus. À la clé, un profil rare et très valorisé sur le marché camerounais.</p>
<p>Une question sur votre moyenne ou votre dossier ? <strong>Écrivez-nous sur WhatsApp</strong>, un conseiller répond personnellement.</p>`,
    contentEn: `
<p>Every year, hundreds of Cameroonian students message us on WhatsApp with the same questions about Chinese scholarships. Here are the clear answers.</p>
<h3>Who can apply?</h3>
<p>Any student with at least a 10/20 average, a valid passport and genuine motivation. The 10-13/20 range unlocks partial scholarships, 14-16/20 complete scholarships and 17/20+ full scholarships.</p>
<h3>How much does it cost?</h3>
<p>A <strong>fully refundable 500,000 FCFA deposit</strong> secures the seat. MOLIÈRE service fees are paid only <strong>after the scholarship is actually granted</strong>. No result = no fee.</p>
<h3>What are the steps?</h3>
<p>Eight steps: contact, assessment, university selection (150+ partners), deposit, file preparation, submission, admission letter, then visa and departure. Everything is detailed on the study scholarships page.</p>
<h3>When are results released?</h3>
<p>Admission letters are published between <strong>July and August</strong>, for a departure at the September/October academic start.</p>
<h3>Why China instead of Europe?</h3>
<p>Two to three times lower cost of living, modern campuses, scholarships covering up to the entire stay and internationally recognised degrees. The outcome is a rare profile highly valued on the Cameroonian market.</p>
<p>Questions about your grades or file? <strong>Message us on WhatsApp</strong>, an adviser replies personally.</p>`,
  },
  {
    slug: "importer-chine-cameroun-sans-se-tromper",
    category: "CARGO",
    image: img("blog-2.jpg"),
    author: "Molière Cargo",
    daysAgo: 21,
    titleFr: "Importer de Chine au Cameroun sans se tromper : le guide du débutant",
    titleEn: "Importing from China to Cameroon without mistakes: beginner guide",
    excerptFr:
      "Choix du fournisseur, contrôle qualité, fret mer ou air, douane à Douala : les 6 étapes d'un premier import réussi.",
    excerptEn:
      "Supplier choice, quality control, sea or air freight, Douala customs: the 6 steps of a successful first import.",
    contentFr: `
<p>Beaucoup de commerçants camerounais rêvent d'importer directement de Chine mais craignent les arnaques, les retards et les surprises douanières. Avec un peu de méthode, l'import est accessible même pour un premier conteneur de groupage.</p>
<h3>1. Choisir un produit qui se vend déjà</h3>
<p>Commencez par des produits que vous connaissez et dont vous maîtrisez la revente locale. Évitez l'effet de mode non vérifié.</p>
<h3>2. Vérifier le fournisseur</h3>
<p>Un prix bas ne suffit pas : licence commerciale, ancienneté, avis, photos d'usine. Notre équipe en Chine effectue cette vérification pour chaque commande Molière Cargo.</p>
<h3>3. Contrôler avant expédition</h3>
<p>Exigez des photos et vidéos de la production. Le contrôle qualité avant embarquement évite 90 % des litiges.</p>
<h3>4. Choisir mer ou air</h3>
<p>Le maritime (groupage LCL ou conteneur) est imbattable pour les volumes. L'aérien convient aux produits urgents, légers et à forte marge.</p>
<h3>5. Prévoir la douane</h3>
<p>Les droits et taxes au port de Douala dépendent de la nomenclature du produit. Un transitaire agréé — comme nos partenaires — évite surfacturations et blocages.</p>
<h3>6. Assurer et suivre</h3>
<p>Assurance ad valorem, tracking et notifications WhatsApp : vous savez où est votre cargaison à tout moment.</p>
<p>Prêt à passer votre première commande ? Décrivez votre produit sur WhatsApp, nous vous renvoyons un devis clair et sans engagement.</p>`,
    contentEn: `
<p>Many Cameroonian traders dream of importing directly from China but fear scams, delays and customs surprises. With a bit of method, importing is accessible even for a first groupage container.</p>
<h3>1. Pick a product that already sells</h3>
<p>Start with products you know and whose local resale you master. Avoid unverified fads.</p>
<h3>2. Verify the supplier</h3>
<p>A low price is not enough: business licence, history, reviews, factory photos. Our team in China runs this check for every Molière Cargo order.</p>
<h3>3. Inspect before shipping</h3>
<p>Demand production photos and videos. Pre-shipment quality control avoids 90% of disputes.</p>
<h3>4. Choose sea or air</h3>
<p>Sea freight (LCL groupage or container) is unbeatable for volume. Air suits urgent, light, high-margin goods.</p>
<h3>5. Plan for customs</h3>
<p>Duties and taxes at the port of Douala depend on the product nomenclature. A licensed broker — like our partners — avoids overbilling and blocks.</p>
<h3>6. Insure and track</h3>
<p>Ad valorem insurance, tracking and WhatsApp notifications: you know where your cargo is at all times.</p>
<p>Ready to place your first order? Describe your product on WhatsApp and we'll send a clear, no-obligation quote.</p>`,
  },
  {
    slug: "vendre-sur-whatsapp-au-cameroun",
    category: "DIGITAL",
    image: img("blog-3.jpg"),
    author: "MOLIÈRE Social Media",
    daysAgo: 35,
    titleFr: "Vendre sur WhatsApp au Cameroun : la méthode en 5 réflexes",
    titleEn: "Selling on WhatsApp in Cameroon: the 5-reflex method",
    excerptFr:
      "Statut professionnel, réponse rapide, catalogue à jour, paiement Mobile Money : transformez votre WhatsApp en machine à vendre.",
    excerptEn:
      "Business profile, fast replies, updated catalogue, Mobile Money: turn WhatsApp into a selling machine.",
    contentFr: `
<p>Au Cameroun, WhatsApp est la première application commerciale. Bien utilisée, elle remplace une boutique entière. Voici les 5 réflexes qui font la différence.</p>
<h3>1. Passer en compte WhatsApp Business</h3>
<p>Gratuit, il affiche votre nom commercial, vos horaires, votre adresse et un catalogue de produits avec photos et prix.</p>
<h3>3. Répondre vite (ou paraître répondre)</h3>
<p>Un client qui attend 2 heures passe au suivant. Messages d'accueil et d'absence programmés, réponses rapides pour les questions fréquentes.</p>
<h3>3. Soigner son catalogue</h3>
<p>Photos nettes, prix affichés, descriptions courtes. Un catalogue à jour évite dix allers-retours par client.</p>
<h3>4. Encaisser sans friction</h3>
<p>Numéro Mobile Money dédié, confirmation de paiement en capture d'écran, politique claire de livraison et de retour.</p>
<h3>5. Nourrir le statut chaque jour</h3>
<p>Le statut WhatsApp est vu par quasiment tout votre carnet : un produit du jour, une preuve de livraison, un témoignage client. Régularité bat quantité.</p>
<p>Vous voulez aller plus loin avec la publicité qui envoie des prospects directement dans votre WhatsApp ? Découvrez notre formation en marketing digital ou confiez-nous vos campagnes.</p>`,
    contentEn: `
<p>In Cameroon, WhatsApp is the number one business app. Used well, it replaces an entire shop. Here are the 5 reflexes that make the difference.</p>
<h3>1. Switch to a WhatsApp Business account</h3>
<p>Free, it displays your business name, hours, address and a product catalogue with photos and prices.</p>
<h3>2. Reply fast (or seem to)</h3>
<p>A customer waiting 2 hours moves on. Programmed welcome and away messages, quick replies for frequent questions.</p>
<h3>3. Polish your catalogue</h3>
<p>Clear photos, displayed prices, short descriptions. An up-to-date catalogue saves ten back-and-forth messages per customer.</p>
<h3>4. Collect payment without friction</h3>
<p>Dedicated Mobile Money number, screenshot payment confirmation, clear delivery and return policy.</p>
<h3>5. Feed the status every day</h3>
<p>The WhatsApp status is seen by almost your entire contact list: product of the day, proof of delivery, a customer testimonial. Consistency beats quantity.</p>
<p>Want to go further with ads that send prospects straight into your WhatsApp? Check out our digital marketing training or let us run your campaigns.</p>`,
  },
  {
    slug: "travailler-au-canada-depuis-le-cameroun",
    category: "OPPORTUNITIES",
    image: img("canada.jpg"),
    author: "MOLIÈRE Voyages",
    daysAgo: 48,
    titleFr: "Travailler au Canada depuis le Cameroun : les voies les plus réalistes en 2026",
    titleEn: "Working in Canada from Cameroon: the most realistic routes in 2026",
    excerptFr:
      "Permis fermé avec EIMT, permis ouvert, Entrée express : quelle stratégie selon votre profil et votre budget ?",
    excerptEn:
      "Closed LMIA permit, open permit, Express Entry: which strategy fits your profile and budget?",
    contentFr: `
<p>Le Canada reste l'une des destinations les plus accueillantes pour les travailleurs africains qualifiés, mais les règles sont strictes. Voici les trois voies réalistes, classées par situation.</p>
<h3>1. Le permis de travail fermé avec EIMT (LMIA)</h3>
<p>La voie la plus directe : un employeur canadien vous fait une offre et obtient une étude d'impact positif. Vous recevez un permis lié à cet employeur. C'est ici que MOLIÈRE intervient : mise en relation avec des employeurs en recrutement et montage du dossier complet.</p>
<h3>2. Le permis d'études puis travail post-diplôme</h3>
<p>Étudier au Canada ouvre un permis de travail post-diplôme jusqu'à 3 ans, puis la résidence permanente. Un investissement d'études qui reste l'un des chemins les plus sûrs.</p>
<h3>3. Entrée express (résidence permanente directe)</h3>
<p>Réservée aux profils à fort capital humain : âge, diplôme, expérience, anglais/français (IELTS/TEF). Un bon score CRS peut vous mener directement à la RP sans employeur préalable.</p>
<h3>Les pièges à éviter</h3>
<ul>
<li>Les « facilitateurs » qui promettent un visa de travail sans employeur : c'est impossible ;</li>
<li>Les fausses offres d'emploi payantes ;</li>
<li>Négliger les tests de langue, qui font basculer les scores.</li>
</ul>
<p>Faites évaluer votre profil gratuitement sur WhatsApp : nous vous disons honnêtement quelle voie vous correspond.</p>`,
    contentEn: `
<p>Canada remains one of the most welcoming destinations for skilled African workers, but rules are strict. Here are the three realistic routes, sorted by situation.</p>
<h3>1. Closed work permit with LMIA</h3>
<p>The most direct route: a Canadian employer makes you an offer and obtains a positive labour market impact assessment. You receive a permit tied to that employer. This is where MOLIÈRE steps in: connection with recruiting employers and complete file preparation.</p>
<h3>2. Study permit then post-graduation work permit</h3>
<p>Studying in Canada opens a post-graduation work permit of up to 3 years, then permanent residency. An education investment that remains one of the safest paths.</p>
<h3>3. Express Entry (direct permanent residency)</h3>
<p>Reserved for high human-capital profiles: age, degree, experience, English/French (IELTS/TEF). A strong CRS score can take you straight to PR without a prior employer.</p>
<h3>Pitfalls to avoid</h3>
<ul>
<li>"Facilitators" promising a work visa without an employer: impossible;</li>
<li>Fake paid job offers;</li>
<li>Neglecting language tests, which tip the scores.</li>
</ul>
<p>Get your profile assessed for free on WhatsApp: we honestly tell you which route fits you.</p>`,
  },
];

/* ------------------------------- Testimonials ----------------------------- */

export type TestimonialSeed = {
  name: string;
  city: string;
  roleFr: string;
  roleEn: string;
  rating: number;
  order: number;
  poleSlug?: "voyages" | "cargo" | "social-media";
  quoteFr: string;
  quoteEn: string;
};

export const TESTIMONIALS: TestimonialSeed[] = [
  {
    name: "Arnaud M.",
    city: "Yaoundé",
    roleFr: "Étudiant en bourse complète, Wuhan",
    roleEn: "Complete scholarship student, Wuhan",
    rating: 5,
    order: 1,
    poleSlug: "voyages",
    quoteFr:
      "J'avais 15/20 et je n'y croyais pas trop. MOLIÈRE a monté tout le dossier, et aujourd'hui j'étudie en Chine avec scolarité et logement payés. Le dépôt m'a été remboursé comme promis.",
    quoteEn:
      "I had a 15/20 average and didn't really believe it. MOLIÈRE built the entire file, and today I study in China with tuition and housing covered. The deposit was refunded as promised.",
  },
  {
    name: "Christelle T.",
    city: "Douala",
    roleFr: "Commerçante, mode & accessoires",
    roleEn: "Fashion & accessories trader",
    rating: 5,
    order: 2,
    poleSlug: "cargo",
    quoteFr:
      "Mon premier groupage est arrivé à Douala sans problème. Photos à l'usine, suivi sur WhatsApp et dédouanement géré. Je recommande à tous les petits commerçants.",
    quoteEn:
      "My first groupage shipment arrived in Douala without a hitch. Factory photos, WhatsApp tracking and customs handled. I recommend them to every small trader.",
  },
  {
    name: "Dylan E.",
    city: "Bafoussam",
    roleFr: "Fondateur, marque de streetwear",
    roleEn: "Founder, streetwear brand",
    rating: 5,
    order: 3,
    poleSlug: "social-media",
    quoteFr:
      "L'équipe Social Media a refait mon identité et gère mes pages. Mes commandes WhatsApp ont doublé en trois mois. Des jeunes sérieux et créatifs.",
    quoteEn:
      "The Social Media team rebuilt my identity and runs my pages. My WhatsApp orders doubled in three months. Serious, creative young people.",
  },
  {
    name: "Grâce A.",
    city: "Douala",
    roleFr: "Permis d'études, Canada",
    roleEn: "Canadian study permit holder",
    rating: 5,
    order: 4,
    poleSlug: "voyages",
    quoteFr:
      "Le dossier canadien est exigeant, mais chaque document a été vérifié. Quand mon permis a été accepté, j'ai pleuré de joie. Merci pour l'honnêteté dès le premier appel.",
    quoteEn:
      "The Canadian file is demanding, but every document was checked. When my permit was approved I cried with joy. Thank you for being honest from the very first call.",
  },
  {
    name: "Ibrahim S.",
    city: "Garoua",
    roleFr: "Importateur électronique",
    roleEn: "Electronics importer",
    rating: 5,
    order: 5,
    poleSlug: "cargo",
    quoteFr:
      "Le sourcing a trouvé mon produit 18% moins cher qu'avec mon ancien intermédiaire, et le contrôle qualité m'a évité un carton défectueux. Professionnalisme total.",
    quoteEn:
      "Sourcing found my product 18% cheaper than my previous middleman, and quality control saved me from a defective batch. Total professionalism.",
  },
  {
    name: "Lætitia N.",
    city: "Yaoundé",
    roleFr: "Participante formation vente en ligne",
    roleEn: "Online selling course graduate",
    rating: 5,
    order: 6,
    poleSlug: "social-media",
    quoteFr:
      "La formation e-commerce m'a appris à vendre via WhatsApp et Mobile Money. J'ai remboursé les frais de formation avec mes deux premières semaines de ventes.",
    quoteEn:
      "The e-commerce course taught me to sell through WhatsApp and Mobile Money. I covered the training fee with my first two weeks of sales.",
  },
  {
    name: "Patrick O.",
    city: "Douala",
    roleFr: "Visa affaires Chine, Foire de Canton",
    roleEn: "China business visa, Canton Fair",
    rating: 5,
    order: 7,
    poleSlug: "voyages",
    quoteFr:
      "Lettre d'invitation, visa multi-entrées, interprète sur place : tout était prêt pour ma première Foire de Canton. Aujourd'hui je traite directement avec mes fournisseurs.",
    quoteEn:
      "Invitation letter, multiple-entry visa, interpreter on site: everything was ready for my first Canton Fair. Today I deal directly with my suppliers.",
  },
  {
    name: "Vanessa K.",
    city: "Kribi",
    roleFr: "Salon de beauté",
    roleEn: "Beauty salon owner",
    rating: 5,
    order: 8,
    poleSlug: "social-media",
    quoteFr:
      "Mes vidéos TikTok sont passées de 200 vues à plus de 30 000. L'équipe a compris mon univers et les clients arrivent maintenant seuls. Un travail bien fait.",
    quoteEn:
      "My TikTok videos went from 200 views to over 30,000. The team understood my style, and customers now come on their own. A job well done.",
  },
];

/* ----------------------------------- FAQ ---------------------------------- */

export type FaqSeed = {
  poleSlug?: "voyages" | "cargo" | "control-achat" | "social-media";
  order: number;
  questionFr: string;
  questionEn: string;
  answerFr: string;
  answerEn: string;
};

export const FAQS: FaqSeed[] = [
  {
    poleSlug: "voyages",
    order: 1,
    questionFr: "Quelles sont les conditions pour obtenir une bourse en Chine ?",
    questionEn: "What are the requirements for a scholarship in China?",
    answerFr:
      "Une moyenne d'au moins 10/20 (partielle), 14/20 (complète) ou 17/20 (totale), un passeport valide et un dossier complet préparé avec nos conseillers. L'âge, le niveau d'anglais et le choix des universités sont aussi étudiés.",
    answerEn:
      "An average of at least 10/20 (partial), 14/20 (complete) or 17/20 (full), a valid passport and a complete file prepared with our advisers. Age, English level and university choices are also assessed.",
  },
  {
    poleSlug: "voyages",
    order: 2,
    questionFr: "Le dépôt de 500 000 FCFA est-il vraiment remboursable ?",
    questionEn: "Is the 500,000 FCFA deposit really refundable?",
    answerFr:
      "Oui, totalement. Il garantit votre place et le sérieux de votre candidature. Si votre bourse n'est pas obtenue, il vous est restitué selon les conditions signées dans votre contrat.",
    answerEn:
      "Yes, fully. It secures your seat and the seriousness of your application. If your scholarship is not granted, it is returned under the terms signed in your contract.",
  },
  {
    poleSlug: "voyages",
    order: 3,
    questionFr: "Quand dois-je payer les frais d'accompagnement ?",
    questionEn: "When do I pay the service fee?",
    answerFr:
      "Pour les bourses, uniquement après réception de votre lettre d'admission officielle. Notre intérêt est donc strictement le même que le vôtre : que vous réussissiez.",
    answerEn:
      "For scholarships, only after you receive your official admission letter. Our interest is therefore exactly the same as yours: your success.",
  },
  {
    poleSlug: "voyages",
    order: 4,
    questionFr: "Combien de temps prend une demande de visa ?",
    questionEn: "How long does a visa application take?",
    answerFr:
      "Un visa visiteur ou affaires prend généralement 2 à 4 semaines une fois le dossier complet. Les bourses suivent le calendrier universitaire, avec des résultats entre juillet et août.",
    answerEn:
      "A visitor or business visa generally takes 2 to 4 weeks once the file is complete. Scholarships follow the academic calendar, with results between July and August.",
  },
  {
    poleSlug: "voyages",
    order: 5,
    questionFr: "Garantissez-vous l'obtention du visa ?",
    questionEn: "Do you guarantee the visa will be granted?",
    answerFr:
      "Aucun organisme sérieux ne peut garantir une décision consulaire, qui appartient aux autorités. En revanche, nous garantissons un dossier complet, honnête et optimisé, et nous vous disons la vérité sur vos chances dès le premier échange.",
    answerEn:
      "No serious agency can guarantee a consular decision, which belongs to the authorities. We do guarantee a complete, honest, optimised file, and we tell you the truth about your chances from the very first exchange.",
  },
  {
    poleSlug: "cargo",
    order: 1,
    questionFr: "Quelle est la différence entre fret maritime et fret aérien ?",
    questionEn: "What is the difference between sea and air freight?",
    answerFr:
      "Le maritime est économique mais plus long (idéal pour les gros volumes et le groupage). L'aérien est express, en quelques jours, et réservé aux marchandises légères ou urgentes. Nous vous conseillons le bon choix à chaque devis.",
    answerEn:
      "Sea freight is economical but slower (ideal for large volumes and groupage). Air freight is express, within days, for light or urgent goods. We advise the right choice with every quote.",
  },
  {
    poleSlug: "cargo",
    order: 2,
    questionFr: "Comment vérifiez-vous que le fournisseur chinois est fiable ?",
    questionEn: "How do you verify that the Chinese supplier is reliable?",
    answerFr:
      "Notre équipe en Chine vérifie la licence commerciale, l'historique de l'entreprise et visite l'usine quand c'est nécessaire. Un contrôle qualité photo/vidéo est réalisé avant l'expédition.",
    answerEn:
      "Our team in China verifies the business licence, company history and visits the factory when needed. A photo/video quality check is carried out before shipping.",
  },
  {
    poleSlug: "cargo",
    order: 3,
    questionFr: "Dois-je commander un conteneur entier ?",
    questionEn: "Do I have to order a full container?",
    answerFr:
      "Non. Le groupage (LCL) vous permet d'expédier de petits volumes en ne payant que la place utilisée, avec regroupement dans notre entrepôt chinois.",
    answerEn:
      "No. Groupage (LCL) lets you ship small volumes paying only for the space used, with consolidation in our Chinese warehouse.",
  },
  {
    poleSlug: "cargo",
    order: 4,
    questionFr: "Comment se passe le dédouanement à Douala ?",
    questionEn: "How does customs clearance work in Douala?",
    answerFr:
      "Nos transitaires agréés traitent l'intégralité des formalités. Les droits et taxes vous sont annoncés de façon transparente, puis vous récupérez vos marchandises au dépôt ou en livraison.",
    answerEn:
      "Our licensed brokers handle all formalities. Duties and taxes are communicated transparently, then you collect your goods at the depot or by delivery.",
  },
  {
    poleSlug: "cargo",
    order: 5,
    questionFr: "Ma marchandise est-elle assurée pendant le transport ?",
    questionEn: "Is my cargo insured during transport?",
    answerFr:
      "Une assurance ad valorem optionnelle couvre la perte et l'avarie selon la valeur déclarée. Nous la recommandons systématiquement pour les envois à forte valeur.",
    answerEn:
      "Optional ad valorem insurance covers loss and damage based on the declared value. We systematically recommend it for high-value shipments.",
  },
  {
    poleSlug: "social-media",
    order: 1,
    questionFr: "Pourquoi déléguer mes réseaux plutôt que de publier moi-même ?",
    questionEn: "Why outsource my social media instead of posting myself?",
    answerFr:
      "Publier est facile ; publier avec une stratégie, une régularité et des messages qui vendent demande du temps et un savoir-faire. Vous vous concentrez sur votre cœur de métier, nous gérons votre visibilité.",
    answerEn:
      "Posting is easy; posting with a strategy, consistency and messages that sell takes time and skill. You focus on your core business, we handle your visibility.",
  },
  {
    poleSlug: "social-media",
    order: 2,
    questionFr: "Combien de temps avant de voir des résultats ?",
    questionEn: "How long before I see results?",
    answerFr:
      "Les publicités peuvent générer des messages dès la première semaine. Une communauté et une notoriété solides se construisent généralement sur 2 à 3 mois de travail régulier.",
    answerEn:
      "Ads can generate messages from the very first week. A solid community and reputation are generally built over 2 to 3 months of consistent work.",
  },
  {
    poleSlug: "social-media",
    order: 3,
    questionFr: "Les formations ont-elles lieu en ligne ou en présentiel ?",
    questionEn: "Are the trainings online or in person?",
    answerFr:
      "Les deux, selon les formations : en ligne, en présentiel à Douala/Yaoundé ou en format hybride. Le détail est indiqué sur chaque fiche formation.",
    answerEn:
      "Both, depending on the course: online, in person in Douala/Yaoundé or hybrid. Details are shown on each course page.",
  },
  {
    poleSlug: "social-media",
    order: 4,
    questionFr: "Pouvez-vous créer un site qui accepte le Mobile Money ?",
    questionEn: "Can you build a website that accepts Mobile Money?",
    answerFr:
      "Oui. Nos sites intègrent les demandes WhatsApp, les passerelles de paiement Mobile Money et la gestion des commandes, adaptées au marché camerounais.",
    answerEn:
      "Yes. Our sites integrate WhatsApp requests, Mobile Money payment gateways and order management, adapted to the Cameroonian market.",
  },
  {
    poleSlug: "control-achat",
    order: 1,
    questionFr: "Quels types de produits pouvez-vous contrôler ?",
    questionEn: "What kinds of products can you inspect?",
    answerFr:
      "La plupart des marchandises importées : textiles et chaussures, électronique et accessoires, équipements professionnels, articles de maison, cosmétiques, etc. Les produits interdits ou réglementés sont exclus : nous le confirmons dès l'étude de votre demande.",
    answerEn:
      "Most imported goods: textiles and footwear, electronics and accessories, professional equipment, household items, cosmetics, etc. Prohibited or regulated products are excluded: we confirm this when reviewing your request.",
  },
  {
    poleSlug: "control-achat",
    order: 2,
    questionFr: "Dois-je déjà connaître un fournisseur ?",
    questionEn: "Do I need to already know a supplier?",
    answerFr:
      "Non. Si vous avez un fournisseur, nous le vérifions et traitons avec lui. Si vous n'en avez pas, nous le trouvons pour vous parmi des sources fiables.",
    answerEn:
      "No. If you have a supplier, we verify them and deal with them. If not, we find one for you from reliable sources.",
  },
  {
    poleSlug: "control-achat",
    order: 3,
    questionFr: "Comment sont calculés vos frais ?",
    questionEn: "How are your fees calculated?",
    answerFr:
      "Nos frais dépendent du type de produit, de la quantité et du niveau de contrôle demandé. Vous recevez un détail clair avant tout engagement : prix d'achat, frais de service et expédition séparés.",
    answerEn:
      "Our fees depend on the product type, the quantity and the level of inspection required. You receive a clear breakdown before any commitment: purchase price, service fee and shipping listed separately.",
  },
  {
    poleSlug: "control-achat",
    order: 4,
    questionFr: "Que se passe-t-il si la marchandise n'est pas conforme ?",
    questionEn: "What happens if the goods are non-compliant?",
    answerFr:
      "Le contrôle ayant lieu avant expédition, nous bloquons la commande et négocions la correction, le remplacement ou l'avoir avec le fournisseur. Vous ne validez le départ que lorsque tout est conforme.",
    answerEn:
      "Since the inspection happens before shipping, we hold the order and negotiate correction, replacement or a refund voucher with the supplier. You only approve departure once everything is compliant.",
  },
];

/* ---------------------------------- Stats --------------------------------- */

export type StatSeed = {
  icon: string;
  value: string;
  labelFr: string;
  labelEn: string;
  order: number;
};

export const STATS: StatSeed[] = [
  { icon: "users", value: "300+", labelFr: "clients accompagnés depuis 2023", labelEn: "clients supported since 2023", order: 1 },
  { icon: "graduation", value: "150+", labelFr: "universités partenaires", labelEn: "partner universities", order: 2 },
  { icon: "boxes", value: "12 t", labelFr: "de marchandises expédiées par an", labelEn: "tons of goods shipped per year", order: 3 },
  { icon: "badge", value: "98%", labelFr: "de clients satisfaits", labelEn: "satisfied clients", order: 4 },
  { icon: "globe", value: "2", labelFr: "destinations majeures : Chine & Canada", labelEn: "major destinations: China & Canada", order: 5 },
  { icon: "sparkles", value: "24/7", labelFr: "réponse sur WhatsApp", labelEn: "WhatsApp response", order: 6 },
];
