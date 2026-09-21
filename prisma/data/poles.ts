/**
 * Donnees de seed : 3 poles + leurs services (bilingue FR/EN).
 * bullets/steps sont des tableaux serialises en JSON par le seed.
 */

export type Step = { title: string; desc: string };

export type ServiceSeed = {
  slug: string;
  country?: "CHINA" | "CANADA";
  motive?: "STUDY" | "WORK" | "VISITOR" | "BUSINESS" | "IMMIGRATION";
  icon: string;
  image: string;
  order: number;
  highlighted?: boolean;
  titleFr: string;
  titleEn: string;
  shortFr: string;
  shortEn: string;
  descriptionFr: string;
  descriptionEn: string;
  bulletsFr: string[];
  bulletsEn: string[];
  stepsFr: Step[];
  stepsEn: Step[];
};

export type PoleSeed = {
  slug: string;
  icon: string;
  image: string;
  order: number;
  nameFr: string;
  nameEn: string;
  taglineFr: string;
  taglineEn: string;
  shortFr: string;
  shortEn: string;
  descriptionFr: string;
  descriptionEn: string;
  contentFr: string;
  contentEn: string;
  services: ServiceSeed[];
};

const img = (f: string) => `/images/seed/${f}`;

/* ------------------------------------------------------------------ */
/* Contenu partage : etapes bourses (8)                                */
/* ------------------------------------------------------------------ */

const scholarshipStepsFr: Step[] = [
  { title: "Prise de contact", desc: "Tu nous écris sur WhatsApp et un conseiller étudie ton projet et ton bulletin." },
  { title: "Évaluation du dossier", desc: "Analyse de tes notes (sur 20), ton âge, ton niveau d'anglais et de chinois." },
  { title: "Choix des bourses", desc: "Bourse totale, complète ou partielle : nous identifions les universités compatibles parmi plus de 150 partenaires." },
  { title: "Dépôt de garantie", desc: "Un dépôt remboursable de 500 000 FCRA garantit ta place et le sérieux de ta candidature." },
  { title: "Constitution du dossier", desc: "Traductions, lettres de motivation, passeport, photos, relevés : nous préparons l'intégralité du dossier." },
  { title: "Envoi aux universités", desc: "Nous soumettons ta candidature aux universités chinoises/canadiennes sélectionnées." },
  { title: "Lettre d'admission & JW202", desc: "Réception de ta lettre d'admission officielle et des documents consulaires." },
  { title: "Visa & départ", desc: "Demande de visa étudiant, briefing de départ et accueil par nos relais sur place." },
];

const scholarshipStepsEn: Step[] = [
  { title: "First contact", desc: "Message us on WhatsApp; an adviser reviews your project and school report." },
  { title: "Application assessment", desc: "We analyse your grades (out of 20), age, English and Chinese level." },
  { title: "Scholarship matching", desc: "Full, complete or partial scholarship: we match you with compatible universities among 150+ partners." },
  { title: "Refundable deposit", desc: "A refundable deposit of 500,000 FCFA secures your seat and the seriousness of your application." },
  { title: "File preparation", desc: "Translations, motivation letters, passport, photos, transcripts: we build the entire file." },
  { title: "Submission", desc: "We submit your application to the selected Chinese/Canadian universities." },
  { title: "Admission & JW202", desc: "You receive your official admission letter and consular documents." },
  { title: "Visa & departure", desc: "Student visa application, pre-departure briefing and welcome by our local partners." },
];

const scholarshipBulletsFr = [
  "Paiement des frais MOLIÈRE uniquement après l'obtention de ta bourse",
  "Plus de 150 universités partenaires en Chine et au Canada",
  "Dépôt de 500 000 FCFA entièrement remboursable",
  "Résultats d'admission publiés entre juillet et août",
  "Suivi jusqu'à ton installation sur place",
];
const scholarshipBulletsEn = [
  "MOLIÈRE fees paid only after your scholarship is granted",
  "150+ partner universities in China and Canada",
  "Fully refundable 500,000 FCFA deposit",
  "Admission results released between July and August",
  "Support until you are settled on campus",
];

const scholarshipDescriptionFr = `
<p>Étudier en Chine ou au Canada avec une bourse, c'est possible — et le coût n'a rien à voir avec l'Europe ou l'Amérique du Nord classique : frais de scolarité réduits, logement abordable et bourses qui couvrent jusqu'à la totalité du séjour.</p>
<p>MOLIÈRE CONSULTING sélectionne pour toi les meilleures universités (plus de 150 partenaires), monte ton dossier de A à Z et t'accompagne jusqu'au campus. <strong>Tu ne paies nos frais qu'après l'obtention effective de ta bourse.</strong></p>
<h3>Nos 3 niveaux de bourses</h3>
<ul>
  <li><strong>Bourse totale</strong> — moyenne à partir de 17/20 : frais de scolarité, logement et allocation mensuelle couverts.</li>
  <li><strong>Bourse complète</strong> — moyenne de 14 à 16/20 : scolarité et logement pris en charge.</li>
  <li><strong>Bourse partielle</strong> — moyenne de 10 à 13/20 : réduction forte des frais de scolarité.</li>
</ul>
<p>Un <strong>dépôt de garantie de 500 000 FCFA</strong>, entièrement remboursable, sécurise ton inscription. Les résultats d'admission sont publiés entre juillet et août, pour un départ à la rentrée universitaire.</p>
<h3>Pourquoi la Chine et le Canada plutôt que l'Europe ?</h3>
<ul>
  <li>Des budgets 2 à 3 fois inférieurs à une destination occidentale classique ;</li>
  <li>Des campus modernes et une reconnaissance internationale des diplômes ;</li>
  <li>Une expérience qui valorise fortement ton CV à ton retour au Cameroun ;</li>
  <li>Aucun frais de service MOLIÈRE si ta bourse n'est pas obtenue.</li>
</ul>`;

const scholarshipDescriptionEn = `
<p>Studying in China or Canada on a scholarship is within reach — and the cost is nothing like traditional Europe or North America: low tuition, affordable housing and scholarships covering up to the entire stay.</p>
<p>MOLIÈRE CONSULTING selects the best universities for you (150+ partners), builds your file from A to Z and supports you all the way to campus. <strong>You only pay our fees once your scholarship is actually granted.</strong></p>
<h3>Our 3 scholarship levels</h3>
<ul>
  <li><strong>Full scholarship</strong> — average 17/20 and above: tuition, accommodation and monthly stipend covered.</li>
  <li><strong>Complete scholarship</strong> — average 14 to 16/20: tuition and accommodation covered.</li>
  <li><strong>Partial scholarship</strong> — average 10 to 13/20: major tuition reduction.</li>
</ul>
<p>A <strong>fully refundable 500,000 FCFA deposit</strong> secures your application. Admission results are released between July and August, for a departure at the start of the academic year.</p>
<h3>Why China and Canada instead of Europe?</h3>
<ul>
  <li>Budgets 2 to 3 times lower than a classic Western destination;</li>
  <li>Modern campuses and internationally recognised degrees;</li>
  <li>An experience that strongly boosts your CV back in Cameroon;</li>
  <li>No MOLIÈRE service fee if your scholarship is not granted.</li>
</ul>`;

/* ------------------------------------------------------------------ */
/* Pôle 1 — Voyages                                                    */
/* ------------------------------------------------------------------ */

const travelServices: ServiceSeed[] = [
  // CHINE
  {
    slug: "china-study",
    country: "CHINA",
    motive: "STUDY",
    icon: "graduation",
    image: img("study.jpg"),
    order: 1,
    highlighted: true,
    titleFr: "Bourses d'études en Chine",
    titleEn: "Study scholarships in China",
    shortFr: "Bourses totale, complète ou partielle dans plus de 150 universités chinoises. Paiement après obtention.",
    shortEn: "Full, complete or partial scholarships at 150+ Chinese universities. Payment only after admission.",
    descriptionFr: scholarshipDescriptionFr.replace(/Chine ou au Canada/g, "Chine").replace(/en Chine et au Canada/g, "en Chine"),
    descriptionEn: scholarshipDescriptionEn.replace(/China or Canada/g, "China").replace(/in China and Canada/g, "in China"),
    bulletsFr: scholarshipBulletsFr,
    bulletsEn: scholarshipBulletsEn,
    stepsFr: scholarshipStepsFr,
    stepsEn: scholarshipStepsEn,
  },
  {
    slug: "china-work",
    country: "CHINA",
    motive: "WORK",
    icon: "briefcase",
    image: img("work.jpg"),
    order: 2,
    titleFr: "Permis de travail Chine",
    titleEn: "China work permit",
    shortFr: "Décrochez un emploi et votre permis de travail en Chine grâce à nos partenaires employeurs.",
    shortEn: "Land a job and your Chinese work permit through our employer partners.",
    descriptionFr: `
<p>La Chine recrute chaque année des milliers de travailleurs étrangers : enseignement, industrie, hôtellerie, ingénierie, commerce international. MOLIÈRE CONSULTING vous met en relation avec des employeurs vérifiés et construit votre dossier de permis de travail (Z) en toute légalité.</p>
<p>Nous vérifions chaque offre, chaque contrat et chaque entreprise avant de vous engager : pas de fausses promesses, uniquement des postes réels et des démarches conformes.</p>
<ul>
<li>Mise en relation avec des employeurs agréés qui recrutent des profils camerounais ;</li>
<li>Vérification du contrat, du salaire et des conditions de travail ;</li>
<li>Obtention de la lettre d'invitation et du permis de travail ;</li>
<li>Visa Z, puis titre de séjour à l'arrivée ;</li>
<li>Briefing culturel et liaison avec nos relais en Chine.</li>
</ul>`,
    descriptionEn: `
<p>China hires thousands of foreign workers every year: teaching, industry, hospitality, engineering, international trade. MOLIÈRE CONSULTING connects you with verified employers and builds your legal work permit (Z) file.</p>
<p>We verify every offer, contract and company before you commit: no false promises, only real positions and fully compliant procedures.</p>
<ul>
<li>Connection with licensed employers recruiting Cameroonian profiles;</li>
<li>Verification of contract, salary and working conditions;</li>
<li>Invitation letter and work permit processing;</li>
<li>Z visa, then residence permit upon arrival;</li>
<li>Cultural briefing and contact with our partners in China.</li>
</ul>`,
    bulletsFr: [
      "Employeurs vérifiés et contrats légaux",
      "Accompagnement permis de travail + visa Z",
      "Secteurs variés : enseignement, industrie, commerce",
      "Suivi après votre arrivée en Chine",
    ],
    bulletsEn: [
      "Verified employers and legal contracts",
      "Work permit + Z visa support",
      "Varied sectors: teaching, industry, trade",
      "Follow-up after your arrival in China",
    ],
    stepsFr: [
      { title: "Profil & entretien", desc: "Évaluation de votre expérience et de votre niveau d'anglais." },
      { title: "Sélection d'employeurs", desc: "Nous vous proposons des postes vérifiés correspondant à votre profil." },
      { title: "Contrat", desc: "Négociation et validation du contrat de travail." },
      { title: "Permis & visa", desc: "Demande du permis de travail et du visa Z." },
      { title: "Départ", desc: "Billet, briefing et prise de poste en Chine." },
    ],
    stepsEn: [
      { title: "Profile & interview", desc: "Assessment of your experience and English level." },
      { title: "Employer matching", desc: "Verified positions matching your profile." },
      { title: "Contract", desc: "Negotiation and validation of the employment contract." },
      { title: "Permit & visa", desc: "Work permit and Z visa application." },
      { title: "Departure", desc: "Ticket, briefing and job start in China." },
    ],
  },
  {
    slug: "china-visitor",
    country: "CHINA",
    motive: "VISITOR",
    icon: "compass",
    image: img("visitor.jpg"),
    order: 3,
    titleFr: "Visa visiteur Chine",
    titleEn: "China visitor visa",
    shortFr: "Tourisme, visite familiale ou découverte : dossier visa L préparé et vérifié par nos experts.",
    shortEn: "Tourism, family visit or discovery: your L visa file prepared and checked by experts.",
    descriptionFr: `
<p>La Grande Muraille, Shanghai, Xi'an ou simplement rendre visite à un proche : le visa visiteur (L) ou visite familiale (S/Q) demande un dossier précis. MOLIÈRE CONSULTING le prépare pour vous et maximise vos chances d'acceptation.</p>
<ul>
<li>Vérification de votre situation et de votre motif de voyage ;</li>
<li>Préparation complète du dossier (lettre d'invitation, hébergement, billets, assurance) ;</li>
<li>Remplissage et vérification du formulaire de visa ;</li>
<li>Dépôt et suivi auprès du centre des visas ;</li>
<li>Conseils pour l'entretien consulaire.</li>
</ul>`,
    descriptionEn: `
<p>The Great Wall, Shanghai, Xi'an or simply visiting a relative: the visitor (L) or family visit (S/Q) visa requires a precise file. MOLIÈRE CONSULTING prepares it for you and maximises your chances of approval.</p>
<ul>
<li>Review of your situation and travel purpose;</li>
<li>Full file preparation (invitation letter, accommodation, tickets, insurance);</li>
<li>Visa form completion and checking;</li>
<li>Submission and tracking at the visa centre;</li>
<li>Guidance for the consular interview.</li>
</ul>`,
    bulletsFr: [
      "Visa tourisme L et visite familiale S/Q",
      "Dossier vérifié avant dépôt",
      "Délais et exigences expliqués clairement",
      "Aucun rendez-vous manqué : nous gérons le calendrier",
    ],
    bulletsEn: [
      "L tourism and S/Q family visit visas",
      "File checked before submission",
      "Clear explanation of delays and requirements",
      "No missed appointments: we manage the timeline",
    ],
    stepsFr: [
      { title: "Analyse", desc: "Étude de votre motif et de votre situation." },
      { title: "Constitution", desc: "Rassemblement et préparation de tous les documents." },
      { title: "Dépôt", desc: "Rendez-vous au centre des visas et prise d'empreintes." },
      { title: "Retrait", desc: "Récupération du passeport avec le visa." },
    ],
    stepsEn: [
      { title: "Analysis", desc: "Review of your purpose and situation." },
      { title: "Preparation", desc: "Gathering and preparing all documents." },
      { title: "Submission", desc: "Visa centre appointment and biometrics." },
      { title: "Collection", desc: "Passport returned with the visa." },
    ],
  },
  {
    slug: "china-business",
    country: "CHINA",
    motive: "BUSINESS",
    icon: "globe",
    image: img("business.jpg"),
    order: 4,
    titleFr: "Visa affaires & missions Chine",
    titleEn: "China business visa & trips",
    shortFr: "Voyages d'affaires, rencontres fournisseurs, salons : visa M et organisation de votre mission.",
    shortEn: "Business travel, supplier meetings, trade fairs: M visa and mission organisation.",
    descriptionFr: `
<p>Vous souhaitez rencontrer vos fournisseurs, visiter des usines ou participer à un salon comme la Foire de Canton ? MOLIÈRE CONSULTING obtient votre visa d'affaires (M) et peut organiser votre mission commerciale en Chine avec nos relais locaux.</p>
<ul>
<li>Lettre d'invitation d'une entreprise chinoise agréée ;</li>
<li>Visa M simple, double ou multi-entrées selon vos besoins ;</li>
<li>Option mission de sourcing : transport, interprète, visites d'usines (en lien avec Molière Cargo) ;</li>
<li>Préparation des documents commerciaux et planning de voyage ;</li>
<li>Suivi pendant toute la durée du séjour.</li>
</ul>`,
    descriptionEn: `
<p>Planning to meet suppliers, visit factories or attend a trade fair such as the Canton Fair? MOLIÈRE CONSULTING obtains your business visa (M) and can organise your commercial mission to China with our local partners.</p>
<ul>
<li>Invitation letter from a licensed Chinese company;</li>
<li>Single, double or multiple-entry M visa to fit your needs;</li>
<li>Optional sourcing mission: transport, interpreter, factory visits (with Molière Cargo);</li>
<li>Commercial documents and travel planning;</li>
<li>Support throughout your stay.</li>
</ul>`,
    bulletsFr: [
      "Visa d'affaires M multi-entrées possible",
      "Lettre d'invitation sécurisée",
      "Missions sourcing clé en main",
      "Interprètes et relais sur place",
    ],
    bulletsEn: [
      "Multiple-entry M business visa available",
      "Secured invitation letter",
      "Turnkey sourcing missions",
      "Interpreters and local partners on site",
    ],
    stepsFr: [
      { title: "Briefing", desc: "Objectifs et programme de votre voyage d'affaires." },
      { title: "Invitation", desc: "Obtention de la lettre d'invitation chinoise." },
      { title: "Visa M", desc: "Dépôt et suivi de la demande de visa." },
      { title: "Mission", desc: "Organisation optionnelle du voyage et des rendez-vous." },
    ],
    stepsEn: [
      { title: "Briefing", desc: "Goals and agenda of your business trip." },
      { title: "Invitation", desc: "Chinese invitation letter obtained." },
      { title: "M visa", desc: "Application submitted and tracked." },
      { title: "Mission", desc: "Optional travel and meeting organisation." },
    ],
  },
  {
    slug: "china-immigration",
    country: "CHINA",
    motive: "IMMIGRATION",
    icon: "file-check",
    image: img("immigration.jpg"),
    order: 5,
    titleFr: "Installation longue durée Chine",
    titleEn: "Long-term settlement in China",
    shortFr: "Regroupement, installation, titres de séjour : une stratégie claire pour vous installer durablement.",
    shortEn: "Family reunification, settlement, residence permits: a clear long-term strategy.",
    descriptionFr: `
<p>Vous avez un projet de vie en Chine — famille, affaires, études prolongées ? Nous étudions la voie la plus fiable vers un titre de séjour longue durée, en combinant si nécessaire les statuts étudiant, travail ou regroupement familial.</p>
<ul>
<li>Audit de votre situation et des voies d'installation possibles ;</li>
<li>Stratégie de visas séquentiels (étudiant puis travail, par exemple) ;</li>
<li>Regroupement familial et documents d'état civil ;</li>
<li>Titres de séjour et renouvellements ;</li>
<li>Conseil en installation : logement, banque, vie quotidienne.</li>
</ul>`,
    descriptionEn: `
<p>Planning a life in China — family, business, extended studies? We assess the most reliable route to a long-term residence permit, combining student, work or family reunification statuses where needed.</p>
<ul>
<li>Audit of your situation and possible settlement routes;</li>
<li>Sequential visa strategy (e.g. student then work);</li>
<li>Family reunification and civil status documents;</li>
<li>Residence permits and renewals;</li>
<li>Settlement advice: housing, banking, daily life.</li>
</ul>`,
    bulletsFr: [
      "Stratégie personnalisée de résidence",
      "Regroupement familial",
      "Renouvellements gérés dans les temps",
      "Conseil d'installation complet",
    ],
    bulletsEn: [
      "Personalised residence strategy",
      "Family reunification",
      "Renewals handled on time",
      "Complete settlement guidance",
    ],
    stepsFr: [
      { title: "Audit", desc: "Étude de votre projet de vie et de votre éligibilité." },
      { title: "Stratégie", desc: "Feuille de route visas et séjour sur 12–24 mois." },
      { title: "Démarches", desc: "Préparation et dépôt de chaque dossier au bon moment." },
      { title: "Installation", desc: "Accompagnement sur place pour les formalités." },
    ],
    stepsEn: [
      { title: "Audit", desc: "Review of your life project and eligibility." },
      { title: "Strategy", desc: "12–24 month visa and residence roadmap." },
      { title: "Procedures", desc: "Each file prepared and submitted at the right time." },
      { title: "Settlement", desc: "On-site support with formalities." },
    ],
  },

  // CANADA
  {
    slug: "canada-study",
    country: "CANADA",
    motive: "STUDY",
    icon: "graduation",
    image: img("study.jpg"),
    order: 6,
    highlighted: true,
    titleFr: "Bourses & études au Canada",
    titleEn: "Scholarships & studies in Canada",
    shortFr: "Admissions dans les universités canadiennes, bourses et permis d'études, de A à Z.",
    shortEn: "Admissions to Canadian universities, scholarships and study permits, from A to Z.",
    descriptionFr: scholarshipDescriptionFr.replace(/Chine ou au Canada/g, "Canada").replace(/en Chine et au Canada/g, "au Canada").replace(/la Chine et le Canada/gi, "le Canada").replace(/plutôt que l'Europe[^<]*/g, "une université canadienne, un investissement sûr pour votre avenir"),
    descriptionEn: scholarshipDescriptionEn.replace(/China or Canada/g, "Canada").replace(/in China and Canada/g, "in Canada").replace(/China and Canada/g, "Canada"),
    bulletsFr: [
      "Admission dans les collèges et universités canadiens",
      "Bourses totale, complète ou partielle selon ton dossier",
      "Permis d'études et lettre d'admission gérés",
      "Paiement après obtention pour les bourses éligibles",
      "Préparation au départ et accueil au Canada",
    ],
    bulletsEn: [
      "Admission to Canadian colleges and universities",
      "Full, complete or partial scholarships based on your file",
      "Study permit and admission letter handled",
      "Pay-after-admission for eligible scholarships",
      "Pre-departure prep and welcome in Canada",
    ],
    stepsFr: scholarshipStepsFr,
    stepsEn: scholarshipStepsEn,
  },
  {
    slug: "canada-work",
    country: "CANADA",
    motive: "WORK",
    icon: "briefcase",
    image: img("work.jpg"),
    order: 7,
    titleFr: "Permis de travail Canada",
    titleEn: "Canada work permit",
    shortFr: "Permis de travail fermé ou ouvert, EIMT et employeurs LMIA : votre dossier complet.",
    shortEn: "Closed or open work permits, LMIA and employers: your complete file.",
    descriptionFr: `
<p>Le Canada recherche activement des travailleurs qualifiés. MOLIÈRE CONSULTING vous accompagne dans la recherche d'un employeur et l'obtention de votre permis de travail fermé (avec EIMT) ou ouvert, ainsi que dans votre demande de résidence permanente à terme.</p>
<ul>
<li>Évaluation de votre profil métier et de votre éligibilité ;</li>
<li>Mise en relation avec des employeurs canadiens en recrutement ;</li>
<li>Étude d'impact sur le marché du travail (EIMT/LMIA) ;</li>
<li>Permis de travail et visas des accompagnants ;</li>
<li>Bascule vers la résidence permanente (Entrée express, PNP).</li>
</ul>`,
    descriptionEn: `
<p>Canada is actively seeking skilled workers. MOLIÈRE CONSULTING supports you in finding an employer and obtaining your closed (LMIA-based) or open work permit, and eventually your permanent residency.</p>
<ul>
<li>Assessment of your professional profile and eligibility;</li>
<li>Connection with recruiting Canadian employers;</li>
<li>Labour Market Impact Assessment (LMIA);</li>
<li>Work permit and dependant visas;</li>
<li>Pathway to permanent residency (Express Entry, PNP).</li>
</ul>`,
    bulletsFr: [
      "Employeurs canadiens vérifiés",
      "Permis fermé (EIMT) ou ouvert",
      "Dossier d'immigration rigoureux",
      "Vers la résidence permanente",
    ],
    bulletsEn: [
      "Verified Canadian employers",
      "Closed (LMIA) or open permits",
      "Rigorous immigration file",
      "Pathway to permanent residency",
    ],
    stepsFr: [
      { title: "Évaluation", desc: "Profil métier, langues, expérience." },
      { title: "Employeur", desc: "Mise en relation et offre d'emploi." },
      { title: "EIMT", desc: "Validation de l'étude d'impact par l'employeur." },
      { title: "Permis", desc: "Demande de permis de travail et visa." },
      { title: "Installation", desc: "Départ et démarrage de vie au Canada." },
    ],
    stepsEn: [
      { title: "Assessment", desc: "Professional profile, languages, experience." },
      { title: "Employer", desc: "Connection and job offer." },
      { title: "LMIA", desc: "Employer labour market assessment approved." },
      { title: "Permit", desc: "Work permit and visa application." },
      { title: "Settlement", desc: "Departure and new life in Canada." },
    ],
  },
  {
    slug: "canada-visitor",
    country: "CANADA",
    motive: "VISITOR",
    icon: "compass",
    image: img("visitor.jpg"),
    order: 8,
    titleFr: "Visa visiteur Canada",
    titleEn: "Canada visitor visa",
    shortFr: "Tourisme ou visite familiale : permis de visite et dossier solide pour convaincre l'agent.",
    shortEn: "Tourism or family visits: visitor record and a strong file to convince the officer.",
    descriptionFr: `
<p>Le visa de résidence temporaire (VRT) canadien est exigeant : l'agent doit être convaincu que vous respecterez les conditions du séjour. MOLIÈRE CONSULTING construit un dossier cohérent — attaches au Cameroun, finances, motif — qui met toutes les chances de votre côté.</p>
<ul>
<li>Analyse de votre profil et de vos attaches ;</li>
<li>Préparation du dossier en ligne (IRCC) ;</li>
<li>Lettre d'invitation et justificatifs de famille ;</li>
<li>Plan de voyage et assurance ;</li>
<li>Préparation à la biométrie et à l'entretien éventuel.</li>
</ul>`,
    descriptionEn: `
<p>Canada's temporary resident visa (TRV) is demanding: the officer must be convinced you will respect the conditions of your stay. MOLIÈRE CONSULTING builds a coherent file — ties to Cameroon, finances, purpose — that maximises your chances.</p>
<ul>
<li>Analysis of your profile and ties;</li>
<li>Online application preparation (IRCC);</li>
<li>Invitation letter and family evidence;</li>
<li>Travel plan and insurance;</li>
<li>Biometrics and possible interview preparation.</li>
</ul>`,
    bulletsFr: [
      "Dossier VRT solide et cohérent",
      "Justificatifs d'attaches au pays",
      "Suivi de la demande IRCC",
      "Conseils francs sur vos chances réelles",
    ],
    bulletsEn: [
      "Strong, coherent TRV file",
      "Evidence of home-country ties",
      "IRCC application tracking",
      "Honest advice on your real chances",
    ],
    stepsFr: [
      { title: "Diagnostic", desc: "Évaluation franche de votre profil." },
      { title: "Dossier", desc: "Création du compte IRCC et des justificatifs." },
      { title: "Biométrie", desc: "Rendez-vous au centre de collecte." },
      { title: "Décision", desc: "Suivi jusqu'à la réponse et le tampon du visa." },
    ],
    stepsEn: [
      { title: "Diagnostic", desc: "Honest assessment of your profile." },
      { title: "File", desc: "IRCC account and supporting documents." },
      { title: "Biometrics", desc: "Appointment at the collection centre." },
      { title: "Decision", desc: "Tracking until the response and visa stamp." },
    ],
  },
  {
    slug: "canada-business",
    country: "CANADA",
    motive: "BUSINESS",
    icon: "globe",
    image: img("business.jpg"),
    order: 9,
    titleFr: "Visa affaires Canada",
    titleEn: "Canada business visa",
    shortFr: "Conférences, négociations, création d'entreprise : voyagez au Canada avec le bon statut.",
    shortEn: "Conferences, negotiations, starting a business: travel to Canada with the right status.",
    descriptionFr: `
<p>Participer à un salon, rencontrer des partenaires ou lancer une activité au Canada ? Nous préparons votre demande de visa d'affaires et, si votre projet est de créer une société, nous vous orientons vers les permis dédiés aux entrepreneurs.</p>
<ul>
<li>Lettre d'invitation de l'entreprise ou de l'organisateur ;</li>
<li>Justificatifs commerciaux et financiers ;</li>
<li>Visa d'affaires temporaire ;</li>
<li>Orientation entrepreneuriat (permis de travail pour propriétaire, start-up) ;</li>
<li>Planning et suivi de la demande.</li>
</ul>`,
    descriptionEn: `
<p>Attending a trade show, meeting partners or launching a business in Canada? We prepare your business visa application and, if you plan to create a company, guide you towards entrepreneur-specific permits.</p>
<ul>
<li>Invitation letter from the company or organiser;</li>
<li>Commercial and financial evidence;</li>
<li>Temporary business visa;</li>
<li>Entrepreneurship guidance (owner–operator work permit, start-up);</li>
<li>Planning and application tracking.</li>
</ul>`,
    bulletsFr: [
      "Visa d'affaires temporaire",
      "Volet entrepreneur et start-up",
      "Documents commerciaux vérifiés",
      "Suivi jusqu'à la décision",
    ],
    bulletsEn: [
      "Temporary business visa",
      "Entrepreneur and start-up streams",
      "Commercial documents verified",
      "Tracked until the decision",
    ],
    stepsFr: [
      { title: "Cadrage", desc: "Nature de la mission et statut adapté." },
      { title: "Documents", desc: "Invitation et justificatifs réunis." },
      { title: "Demande", desc: "Soumission en ligne et biométrie." },
      { title: "Voyage", desc: "Briefing d'entrée au Canada." },
    ],
    stepsEn: [
      { title: "Scoping", desc: "Mission nature and adapted status." },
      { title: "Documents", desc: "Invitation and evidence gathered." },
      { title: "Application", desc: "Online submission and biometrics." },
      { title: "Travel", desc: "Canada entry briefing." },
    ],
  },
  {
    slug: "canada-immigration",
    country: "CANADA",
    motive: "IMMIGRATION",
    icon: "file-check",
    image: img("immigration.jpg"),
    order: 10,
    titleFr: "Immigration Canada",
    titleEn: "Immigration to Canada",
    shortFr: "Entrée express, PNP, regroupement familial : la voie directe vers la résidence permanente.",
    shortEn: "Express Entry, PNP, family sponsorship: the direct route to permanent residency.",
    descriptionFr: `
<p>Le Canada accueille chaque année des centaines de milliers d'immigrants qualifiés. MOLIÈRE CONSULTING vous guide vers le programme adapté — Entrée express, Programme des candidats des provinces (PNP), regroupement familial — et monte un dossier d'immigration sans approximation.</p>
<ul>
<li>Test d'éligibilité et calcul de votre score CRS ;</li>
<li>Stratégie Entrée express / PNP / permis d'études puis RP ;</li>
<li>Préparation des tests de langue (IELTS/TEF) et évaluations de diplômes (EDE) ;</li>
<li>Dossier de résidence permanente complet ;</li>
<li>Regroupement familial : conjoint et enfants inclus dans le projet.</li>
</ul>`,
    descriptionEn: `
<p>Canada welcomes hundreds of thousands of skilled immigrants every year. MOLIÈRE CONSULTING guides you to the right programme — Express Entry, Provincial Nominee Program (PNP), family sponsorship — and builds an immigration file with zero approximation.</p>
<ul>
<li>Eligibility check and CRS score calculation;</li>
<li>Express Entry / PNP / study-to-PR strategy;</li>
<li>Language tests (IELTS/TEF) and credential assessments (ECA) preparation;</li>
<li>Complete permanent residency file;</li>
<li>Family reunification: spouse and children included in the project.</li>
</ul>`,
    bulletsFr: [
      "Score CRS et stratégie sur mesure",
      "Entrée express et PNP",
      "Regroupement familial",
      "Préparation IELTS/TEF et EDE",
    ],
    bulletsEn: [
      "CRS score and tailored strategy",
      "Express Entry and PNP",
      "Family sponsorship",
      "IELTS/TEF and ECA preparation",
    ],
    stepsFr: [
      { title: "Éligibilité", desc: "Bilan complet et score CRS estimé." },
      { title: "Programme", desc: "Choix de la voie la plus rapide." },
      { title: "Préparation", desc: "Langue, diplômes, dossier de fond." },
      { title: "Soumission", desc: "Invitation, demande de RP et suivi médical." },
      { title: "Bienvenue", desc: "Visa de RP et installation au Canada." },
    ],
    stepsEn: [
      { title: "Eligibility", desc: "Full review and estimated CRS score." },
      { title: "Program", desc: "Choosing the fastest route." },
      { title: "Preparation", desc: "Language, credentials, substantive file." },
      { title: "Submission", desc: "Invitation, PR application and medical follow-up." },
      { title: "Welcome", desc: "PR visa and settlement in Canada." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Pôle 2 — Cargo                                                      */
/* ------------------------------------------------------------------ */

const cargoStepsFr: Step[] = [
  { title: "Commande & sourcing", desc: "Vous décrivez votre produit sur WhatsApp. Nous trouvons et vérifions le fournisseur en Chine." },
  { title: "Paiement fournisseur", desc: "Vous réglez la marchandise de manière sécurisée, nous contrôlons la production." },
  { title: "Contrôle qualité", desc: "Photos/vidéos et inspection avant expédition depuis l'usine." },
  { title: "Fret", desc: "Acheminement maritime ou aérien, formalités douanières export gérées par nos soins." },
  { title: "Arrivée & douane Cameroun", desc: "Dédouanement à Douala par nos transitaires partenaires." },
  { title: "Livraison", desc: "Récupération à notre dépôt ou livraison à votre adresse à Douala/Yaoundé." },
];
const cargoStepsEn: Step[] = [
  { title: "Order & sourcing", desc: "Describe your product on WhatsApp. We find and verify the supplier in China." },
  { title: "Supplier payment", desc: "You pay for the goods securely; we monitor production." },
  { title: "Quality control", desc: "Photos/videos and pre-shipment inspection at the factory." },
  { title: "Freight", desc: "Sea or air shipping, export customs formalities handled by us." },
  { title: "Arrival & Cameroon customs", desc: "Customs clearance in Douala by our partner brokers." },
  { title: "Delivery", desc: "Pickup at our warehouse or delivery to your address in Douala/Yaoundé." },
];

const cargoServices: ServiceSeed[] = [
  {
    slug: "cargo-sourcing",
    icon: "search",
    image: img("cargo-sourcing.jpg"),
    order: 1,
    highlighted: true,
    titleFr: "Sourcing & achat en Chine",
    titleEn: "Sourcing & purchasing in China",
    shortFr: "Trouvez le bon produit et le bon fournisseur : nous négocions et contrôlons avant expédition.",
    shortEn: "Find the right product and supplier: we negotiate and inspect before shipping.",
    descriptionFr: `
<p>Vous avez repéré un produit sur Alibaba, TikTok ou en boutique ? Notre équipe en Chine identifie le fabricant, vérifie sa fiabilité, négocie le prix et inspecte la qualité avant tout envoi.</p>
<ul>
<li>Recherche multi-fournisseurs et comparaison des prix réels d'usine ;</li>
<li>Vérification de l'entreprise (licence, usine, antécédents) ;</li>
<li>Négociation et échantillons ;</li>
<li>Contrôle qualité photo/vidéo avant paiement du solde ;</li>
<li>Regroupement de commandes auprès de plusieurs fournisseurs.</li>
</ul>`,
    descriptionEn: `
<p>Seen a product on Alibaba, TikTok or in a shop? Our team in China identifies the manufacturer, verifies reliability, negotiates the price and inspects quality before anything ships.</p>
<ul>
<li>Multi-supplier search and real factory price comparison;</li>
<li>Company verification (licence, factory, track record);</li>
<li>Negotiation and samples;</li>
<li>Photo/video quality control before balance payment;</li>
<li>Consolidation of orders from several suppliers.</li>
</ul>`,
    bulletsFr: [
      "Fournisseurs vérifiés, zéro arnaque",
      "Prix usine négociés",
      "Contrôle qualité avant expédition",
      "Un seul interlocuteur pour plusieurs fournisseurs",
    ],
    bulletsEn: [
      "Verified suppliers, zero scams",
      "Negotiated factory prices",
      "Quality control before shipping",
      "One contact for several suppliers",
    ],
    stepsFr: cargoStepsFr,
    stepsEn: cargoStepsEn,
  },
  {
    slug: "cargo-sea",
    icon: "ship",
    image: img("cargo-sea.jpg"),
    order: 2,
    titleFr: "Fret maritime (conteneur & groupage)",
    titleEn: "Sea freight (container & LCL)",
    shortFr: "Transport économique par bateau, conteneur complet ou groupage, jusqu'au port de Douala.",
    shortEn: "Economical transport by ship, full container or LCL, to the port of Douala.",
    descriptionFr: `
<p>Idéal pour les gros volumes : le fret maritime offre le meilleur coût par colis entre la Chine et le Cameroun. Nous proposons le conteneur complet (FCL) et le groupage (LCL) pour les petites quantités, avec un suivi à chaque escale.</p>
<ul>
<li>Groupage (LCL) : payez uniquement le volume réel de vos marchandises ;</li>
<li>Conteneur complet 20'/40' (FCL) pour les grosses commandes ;</li>
<li>Délais maîtrisés Chine → port de Douala ;</li>
<li>Assurance cargo optionnelle ;</li>
<li>Tracking et notifications WhatsApp à chaque étape.</li>
</ul>`,
    descriptionEn: `
<p>Ideal for large volumes: sea freight offers the best cost per package between China and Cameroon. We provide full containers (FCL) and groupage (LCL) for smaller quantities, with tracking at every port call.</p>
<ul>
<li>Groupage (LCL): pay only the actual volume of your goods;</li>
<li>Full 20'/40' container (FCL) for large orders;</li>
<li>Controlled China → port of Douala transit times;</li>
<li>Optional cargo insurance;</li>
<li>Tracking and WhatsApp notifications at every stage.</li>
</ul>`,
    bulletsFr: [
      "Solution la plus économique",
      "Groupage accessible aux petits commerçants",
      "Suivi des escales en temps réel",
      "Arrivée au port de Douala",
    ],
    bulletsEn: [
      "The most economical option",
      "Groupage accessible to small traders",
      "Real-time port-call tracking",
      "Arrival at the port of Douala",
    ],
    stepsFr: cargoStepsFr,
    stepsEn: cargoStepsEn,
  },
  {
    slug: "cargo-air",
    icon: "plane",
    image: img("cargo-air.jpg"),
    order: 3,
    titleFr: "Fret aérien express",
    titleEn: "Express air freight",
    shortFr: "Marchandises urgentes ou légères : livraison rapide Chine – Cameroun par avion.",
    shortEn: "Urgent or light goods: fast China – Cameroon delivery by plane.",
    descriptionFr: `
<p>Pour les produits urgents, légers ou à forte valeur (téléphones, accessoires, échantillons), le fret aérien livre en quelques jours. Nous consolidons vos petits colis pour réduire la facture.</p>
<ul>
<li>Délais express Chine → Cameroun ;</li>
<li>Idéal pour échantillons et produits high-tech ;</li>
<li>Consolidation des petits colis pour optimiser le tarif au kilo ;</li>
<li>Manutention soignée et emballage renforcé ;</li>
<li>Suivi WhatsApp du décollage à la livraison.</li>
</ul>`,
    descriptionEn: `
<p>For urgent, light or high-value goods (phones, accessories, samples), air freight delivers within days. We consolidate your small parcels to lower the bill.</p>
<ul>
<li>Express China → Cameroon transit times;</li>
<li>Ideal for samples and high-tech products;</li>
<li>Small-parcel consolidation to optimise the per-kilo rate;</li>
<li>Careful handling and reinforced packaging;</li>
<li>WhatsApp tracking from take-off to delivery.</li>
</ul>`,
    bulletsFr: [
      "Livraison en quelques jours",
      "Tarif au kilo optimisé",
      "Idéal produits légers et urgents",
      "Suivi complet du colis",
    ],
    bulletsEn: [
      "Delivery within days",
      "Optimised per-kilo rate",
      "Ideal for light, urgent goods",
      "Full parcel tracking",
    ],
    stepsFr: cargoStepsFr,
    stepsEn: cargoStepsEn,
  },
  {
    slug: "cargo-groupage",
    icon: "boxes",
    image: img("cargo-groupage.jpg"),
    order: 4,
    titleFr: "Groupage & entrepôt Chine",
    titleEn: "Consolidation & China warehouse",
    shortFr: "Vos achats chez plusieurs fournisseurs regroupés dans notre entrepôt chinois, un seul envoi.",
    shortEn: "Purchases from several suppliers consolidated in our Chinese warehouse, one shipment.",
    descriptionFr: `
<p>Commandez chez plusieurs fournisseurs sans multiplier les frais : toutes vos marchandises sont reçues, vérifiées, reconditionnées et expédiées en un seul colis depuis notre entrepôt en Chine.</p>
<ul>
<li>Réception gratuite de vos colis en entrepôt ;</li>
<li>Vérification quantité et état à la réception ;</li>
<li>Repackaging et protection des produits fragiles ;</li>
<li>Inventaire photo envoyé sur WhatsApp ;</li>
<li>Expédition unique vers le Cameroun.</li>
</ul>`,
    descriptionEn: `
<p>Order from several suppliers without multiplying fees: all your goods are received, checked, repacked and shipped as one parcel from our warehouse in China.</p>
<ul>
<li>Free receipt of your parcels at the warehouse;</li>
<li>Quantity and condition checks on arrival;</li>
<li>Repackaging and protection for fragile products;</li>
<li>Photo inventory sent on WhatsApp;</li>
<li>Single shipment to Cameroon.</li>
</ul>`,
    bulletsFr: [
      "Stockage gratuit en Chine",
      "Inventaire photo détaillé",
      "Emballage renforcé",
      "Une seule expédition, moins de frais",
    ],
    bulletsEn: [
      "Free storage in China",
      "Detailed photo inventory",
      "Reinforced packaging",
      "One shipment, lower fees",
    ],
    stepsFr: cargoStepsFr,
    stepsEn: cargoStepsEn,
  },
  {
    slug: "cargo-insurance",
    icon: "shield",
    image: img("cargo-sea.jpg"),
    order: 5,
    titleFr: "Assurance & sécurisation des marchandises",
    titleEn: "Cargo insurance & protection",
    shortFr: "Protégez votre investissement : assurance ad valorem et emballage sécurisé pour chaque envoi.",
    shortEn: "Protect your investment: ad valorem insurance and secure packaging for every shipment.",
    descriptionFr: `
<p>Un colis perdu ou endommagé peut ruiner une commande. Nous proposons une assurance marchandise calculée sur la valeur réelle de vos biens, ainsi qu'un emballage professionnel adapté aux longs trajets maritimes.</p>
<ul>
<li>Assurance ad valorem couvrant perte et avarie ;</li>
<li>Emballage renforcé, palettisation et films protecteurs ;</li>
<li>Produits fragiles et high-tech traités séparément ;</li>
<li>Constat et accompagnement en cas de sinistre ;</li>
<li>Transactions fournisseurs sécurisées en amont.</li>
</ul>`,
    descriptionEn: `
<p>A lost or damaged parcel can ruin an order. We offer cargo insurance calculated on the actual value of your goods, plus professional packaging adapted to long sea journeys.</p>
<ul>
<li>Ad valorem insurance covering loss and damage;</li>
<li>Reinforced packaging, palletising and protective films;</li>
<li>Fragile and high-tech products handled separately;</li>
<li>Claims reporting and support in case of incident;</li>
<li>Secured supplier transactions upstream.</li>
</ul>`,
    bulletsFr: [
      "Couverture perte et avarie",
      "Emballage adapté au long cours",
      "Gestion des sinistres accompagnée",
      "Paiements fournisseurs sécurisés",
    ],
    bulletsEn: [
      "Loss and damage coverage",
      "Long-haul packaging",
      "Supported claims handling",
      "Secured supplier payments",
    ],
    stepsFr: cargoStepsFr,
    stepsEn: cargoStepsEn,
  },
  {
    slug: "cargo-delivery",
    icon: "truck",
    image: img("cargo-groupage.jpg"),
    order: 6,
    titleFr: "Dédouanement & livraison Douala",
    titleEn: "Customs clearance & delivery in Douala",
    shortFr: "Réception à notre dépôt de Douala ou livraison porte à porte à Douala et Yaoundé.",
    shortEn: "Pickup at our Douala depot or door-to-door delivery in Douala and Yaoundé.",
    descriptionFr: `
<p>À l'arrivée, nos transitaires gèrent le dédouanement dans les règles. Vous récupérez vos marchandises à notre dépôt de Douala ou vous les recevez chez vous, à Douala comme à Yaoundé.</p>
<ul>
<li>Dédouanement complet par des transitaires agréés ;</li>
<li>Facturation transparente des droits et taxes ;</li>
<li>Réception au dépôt de Douala ;</li>
<li>Livraison porte à porte Douala / Yaoundé sur demande ;</li>
<li>Notification WhatsApp dès que votre colis est disponible.</li>
</ul>`,
    descriptionEn: `
<p>On arrival, our licensed brokers handle compliant customs clearance. You collect your goods at our Douala depot or receive them at your door, in Douala or Yaoundé.</p>
<ul>
<li>Full clearance by licensed customs brokers;</li>
<li>Transparent invoicing of duties and taxes;</li>
<li>Collection at the Douala depot;</li>
<li>Door-to-door delivery Douala / Yaoundé on request;</li>
<li>WhatsApp notification as soon as your parcel is available.</li>
</ul>`,
    bulletsFr: [
      "Transitaires agréés au port de Douala",
      "Droits de douane expliqués",
      "Dépôt accessible et sécurisé",
      "Livraison porte à porte",
    ],
    bulletsEn: [
      "Licensed brokers at the port of Douala",
      "Customs duties explained",
      "Accessible, secure depot",
      "Door-to-door delivery",
    ],
    stepsFr: cargoStepsFr,
    stepsEn: cargoStepsEn,
  },
];

/* ------------------------------------------------------------------ */
/* Pôle 3 — Social Media                                               */
/* ------------------------------------------------------------------ */

const socialServices: ServiceSeed[] = [
  {
    slug: "social-networks",
    icon: "share",
    image: img("social-networks.jpg"),
    order: 1,
    highlighted: true,
    titleFr: "Gestion de réseaux sociaux",
    titleEn: "Social media management",
    shortFr: "Facebook, Instagram, TikTok : des communautés animées et professionnelles au quotidien.",
    shortEn: "Facebook, Instagram, TikTok: professional, active communities every day.",
    descriptionFr: `
<p>Une marque qui n'est pas visible sur les réseaux n'existe pas pour ses clients. Nous gérons vos pages de A à Z : ligne éditoriale, publications, stories, réponse aux messages et croissance de votre communauté.</p>
<ul>
<li>Stratégie de présence par réseau (Facebook, Instagram, TikTok, WhatsApp Business) ;</li>
<li>Calendrier éditorial mensuel et publications régulières ;</li>
<li>Community management : réponses aux commentaires et messages ;</li>
<li>Modération et e-réputation ;</li>
<li>Rapports mensuels de performance.</li>
</ul>`,
    descriptionEn: `
<p>A brand invisible on social networks simply doesn't exist for its customers. We manage your pages from A to Z: editorial line, posts, stories, message replies and community growth.</p>
<ul>
<li>Presence strategy per network (Facebook, Instagram, TikTok, WhatsApp Business);</li>
<li>Monthly editorial calendar and regular posting;</li>
<li>Community management: replies to comments and messages;</li>
<li>Moderation and online reputation;</li>
<li>Monthly performance reports.</li>
</ul>`,
    bulletsFr: [
      "Pages animées chaque semaine",
      "Ligne éditoriale cohérente",
      "Réponse rapide à vos clients",
      "Rapports mensuels clairs",
    ],
    bulletsEn: [
      "Weekly active pages",
      "Consistent editorial line",
      "Fast replies to your customers",
      "Clear monthly reports",
    ],
    stepsFr: [
      { title: "Audit", desc: "Analyse de votre marque et de vos concurrents." },
      { title: "Stratégie", desc: "Positionnement, ton et calendrier éditorial." },
      { title: "Production", desc: "Visuels, légendes et publications." },
      { title: "Animation", desc: "Réponses, stories et croissance de communauté." },
      { title: "Bilan", desc: "Statistiques et optimisation chaque mois." },
    ],
    stepsEn: [
      { title: "Audit", desc: "Analysis of your brand and competitors." },
      { title: "Strategy", desc: "Positioning, tone and editorial calendar." },
      { title: "Production", desc: "Visuals, captions and posts." },
      { title: "Engagement", desc: "Replies, stories and community growth." },
      { title: "Review", desc: "Monthly statistics and optimisation." },
    ],
  },
  {
    slug: "social-content",
    icon: "video",
    image: img("social-content.jpg"),
    order: 2,
    titleFr: "Création de contenu photo & vidéo",
    titleEn: "Photo & video content creation",
    shortFr: "Vidéos TikTok/Reels, shootings et montages qui font défiler, regarder et acheter.",
    shortEn: "TikTok/Reels videos, shoots and edits that make people scroll, watch and buy.",
    descriptionFr: `
<p>Le contenu est le carburant du digital. Notre équipe crée des photos et vidées professionnelles adaptées à chaque réseau : reels, vidéos TikTok, spots publicitaires, photos produits et couvertures d'événements.</p>
<ul>
<li>Tournage vidéo (téléphone professionnel et matériel dédié) ;</li>
<li>Montage dynamique, sous-titres et habillage ;</li>
<li>Shooting photo produits et équipe ;</li>
<li>Formats adaptés : 9:16, carré, paysage ;</li>
<li>Banque de contenu prête à programmer.</li>
</ul>`,
    descriptionEn: `
<p>Content is the fuel of digital. Our team creates professional photos and videos tailored to each network: reels, TikTok videos, ad spots, product photos and event coverage.</p>
<ul>
<li>Video shooting (professional phone and dedicated gear);</li>
<li>Dynamic editing, subtitles and branding;</li>
<li>Product and team photo shoots;</li>
<li>Tailored formats: 9:16, square, landscape;</li>
<li>Content bank ready to schedule.</li>
</ul>`,
    bulletsFr: [
      "Vidéos verticales performantes",
      "Photos produits professionnelles",
      "Montage et sous-titrage inclus",
      "Contenu livré prêt à publier",
    ],
    bulletsEn: [
      "High-performing vertical videos",
      "Professional product photos",
      "Editing and subtitles included",
      "Ready-to-publish deliverables",
    ],
    stepsFr: [
      { title: "Brief", desc: "Objectifs et univers de la marque." },
      { title: "Scénario", desc: "Idées, storyboards et planning de tournage." },
      { title: "Tournage", desc: "Captations photo/vidéo sur site." },
      { title: "Montage", desc: "Coupe, habillage et validation." },
    ],
    stepsEn: [
      { title: "Brief", desc: "Goals and brand universe." },
      { title: "Script", desc: "Ideas, storyboards and shooting plan." },
      { title: "Shoot", desc: "Photo/video capture on site." },
      { title: "Editing", desc: "Cut, branding and validation." },
    ],
  },
  {
    slug: "social-ads",
    icon: "megaphone",
    image: img("social-ads.jpg"),
    order: 3,
    titleFr: "Publicité digitale (Meta & TikTok Ads)",
    titleEn: "Digital advertising (Meta & TikTok Ads)",
    shortFr: "Des campagnes ciblées qui génèrent des prospects et des ventes mesurables.",
    shortEn: "Targeted campaigns generating measurable leads and sales.",
    descriptionFr: `
<p>Booster une publication ne suffit pas : il faut cibler les bonnes personnes avec le bon message. Nous concevons et pilotons vos campagnes Facebook, Instagram et TikTok Ads autour d'objectifs concrets (messages WhatsApp, ventes, notoriété).</p>
<ul>
<li>Définition des objectifs et des audiences cibles ;</li>
<li>Création des visuels et textes publicitaires ;</li>
<li>Installation et configuration du Pixel/SDK ;</li>
<li>Pilotage quotidien du budget et des enchères ;</li>
<li>Analyse du retour sur dépenses publicitaires (ROAS).</li>
</ul>`,
    descriptionEn: `
<p>Boosting a post is not enough: you must target the right people with the right message. We design and run your Facebook, Instagram and TikTok Ads campaigns around concrete goals (WhatsApp messages, sales, awareness).</p>
<ul>
<li>Goal and target audience definition;</li>
<li>Ad visuals and copy creation;</li>
<li>Pixel/SDK installation and configuration;</li>
<li>Daily budget and bid management;</li>
<li>Return on ad spend (ROAS) analysis.</li>
</ul>`,
    bulletsFr: [
      "Campagnes orientées résultats",
      "Ciblage précis des clients locaux",
      "Budget maîtrisé et optimisé",
      "Rapports de rentabilité transparents",
    ],
    bulletsEn: [
      "Results-driven campaigns",
      "Precise local customer targeting",
      "Controlled, optimised budget",
      "Transparent profitability reports",
    ],
    stepsFr: [
      { title: "Objectif", desc: "Définition du résultat attendu et du budget." },
      { title: "Ciblage", desc: "Audiences et zones géographiques." },
      { title: "Création", desc: "Visuels et accroches publicitaires." },
      { title: "Pilotage", desc: "Lancement, tests A/B et optimisations." },
    ],
    stepsEn: [
      { title: "Goal", desc: "Expected result and budget defined." },
      { title: "Targeting", desc: "Audiences and geographic areas." },
      { title: "Creation", desc: "Ad visuals and hooks." },
      { title: "Management", desc: "Launch, A/B tests and optimisation." },
    ],
  },
  {
    slug: "social-websites",
    icon: "monitor",
    image: img("social-websites.jpg"),
    order: 4,
    titleFr: "Sites web & boutiques en ligne",
    titleEn: "Websites & online stores",
    shortFr: "Sites vitrines et e-commerce rapides, élégants et adaptés aux mobiles et à la 3G.",
    shortEn: "Fast, elegant showcase sites and e-shops, mobile and 3G friendly.",
    descriptionFr: `
<p>Votre site est votre bureau ouvert 24h/24. Nous créons des sites vitrines et des boutiques en ligne modernes, optimisés pour les téléphones et les connexions camerounaises, avec paiement Mobile Money et demande de devis WhatsApp.</p>
<ul>
<li>Sites vitrines, institutionnels et e-commerce ;</li>
<li>Design premium, responsive et rapide (optimisé 3G/4G) ;</li>
<li>Intégration WhatsApp, Mobile Money et cartes ;</li>
<li>Référencement local (Google Maps, Google Business) ;</li>
<li>Formation pour que vous gardiez la main sur votre contenu.</li>
</ul>`,
    descriptionEn: `
<p>Your website is your office open 24/7. We build modern showcase sites and online stores, optimised for phones and Cameroonian connections, with Mobile Money payment and WhatsApp quote requests.</p>
<ul>
<li>Showcase, institutional and e-commerce sites;</li>
<li>Premium, responsive, fast design (3G/4G optimised);</li>
<li>WhatsApp, Mobile Money and map integration;</li>
<li>Local SEO (Google Maps, Google Business);</li>
<li>Training so you stay in control of your content.</li>
</ul>`,
    bulletsFr: [
      "Design premium et mobile-first",
      "Rapide même en 3G",
      "Mobile Money et WhatsApp intégrés",
      "Autonomie de gestion après livraison",
    ],
    bulletsEn: [
      "Premium mobile-first design",
      "Fast even on 3G",
      "Integrated Mobile Money and WhatsApp",
      "Self-management after delivery",
    ],
    stepsFr: [
      { title: "Brief & maquette", desc: "Arborescence et identité visuelle du site." },
      { title: "Développement", desc: "Intégration, contenus et fonctionnalités." },
      { title: "Mise en ligne", desc: "Nom de domaine, hébergement et référencement." },
      { title: "Formation", desc: "Vous gérez vous-même vos modifications." },
    ],
    stepsEn: [
      { title: "Brief & mockup", desc: "Sitemap and visual identity." },
      { title: "Development", desc: "Integration, content and features." },
      { title: "Launch", desc: "Domain, hosting and SEO." },
      { title: "Training", desc: "You manage your own updates." },
    ],
  },
  {
    slug: "social-branding",
    icon: "palette",
    image: img("social-branding.jpg"),
    order: 5,
    titleFr: "Identité de marque & design graphique",
    titleEn: "Brand identity & graphic design",
    shortFr: "Logo, charte graphique et supports qui rendent votre entreprise crédible et mémorable.",
    shortEn: "Logo, visual identity and materials that make your business credible and memorable.",
    descriptionFr: `
<p>Une identité forte rassure les clients et vous différencie. Nous créons votre logo et votre charte graphique complète, puis déclinons votre marque sur tous les supports : cartes de visite, flyers, emballages, habillages réseaux.</p>
<ul>
<li>Création de logo et charte graphique (couleurs, typographies, usages) ;</li>
<li>Cartes de visite, flyers, affiches, menus, roll-up ;</li>
<li>Design d'emballages et étiquettes produits ;</li>
<li>Habillages complets des réseaux sociaux ;</li>
<li>Fichiers sources fournis pour vos futures impressions.</li>
</ul>`,
    descriptionEn: `
<p>A strong identity reassures customers and sets you apart. We create your logo and complete brand guidelines, then apply your brand to every material: business cards, flyers, packaging, social media kits.</p>
<ul>
<li>Logo and brand guidelines (colours, typography, usage);</li>
<li>Business cards, flyers, posters, menus, roll-ups;</li>
<li>Packaging design and product labels;</li>
<li>Complete social media kits;</li>
<li>Source files provided for your future prints.</li>
</ul>`,
    bulletsFr: [
      "Logo professionnel et déclinaisons",
      "Charte graphique complète",
      "Supports prêts à imprimer",
      "Cohérence sur tous vos canaux",
    ],
    bulletsEn: [
      "Professional logo and variations",
      "Complete brand guidelines",
      "Print-ready materials",
      "Consistency across all channels",
    ],
    stepsFr: [
      { title: "Découverte", desc: "Valeurs, cible et style de la marque." },
      { title: "Conception", desc: "Plusieurs pistes de logo présentées." },
      { title: "Déclinaisons", desc: "Charte et supports graphiques." },
      { title: "Livraison", desc: "Fichiers sources et guide d'usage." },
    ],
    stepsEn: [
      { title: "Discovery", desc: "Brand values, audience and style." },
      { title: "Design", desc: "Several logo directions presented." },
      { title: "Applications", desc: "Guidelines and graphic materials." },
      { title: "Delivery", desc: "Source files and usage guide." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Pôle 4 — Contrôle Achat                                             */
/* ------------------------------------------------------------------ */

const controlStepsFr: Step[] = [
  { title: "Votre brief", desc: "Sur WhatsApp, vous indiquez le produit, la quantité, votre budget et votre ville. Nous étudions la faisabilité." },
  { title: "Recherche & options", desc: "Nous identifions des fournisseurs fiables et vous présentons les options avec prix, photos et délais." },
  { title: "Négociation & achat", desc: "Nous négocions les conditions et passons la commande uniquement après votre accord et un paiement maîtrisé." },
  { title: "Contrôle qualité & quantité", desc: "Inspection physique, comptage, photos et vidéos : vous validez la marchandise avant son départ." },
  { title: "Expédition", desc: "Nous organisons le fret maritime ou aérien et vous transmettons le suivi du colis." },
  { title: "Réception & suivi", desc: "Votre marchandise arrive au Cameroun ; nous restons disponibles jusqu'à la remise complète." },
];
const controlStepsEn: Step[] = [
  { title: "Your brief", desc: "On WhatsApp you tell us the product, quantity, budget and your city. We assess feasibility." },
  { title: "Sourcing & options", desc: "We identify reliable suppliers and present options with prices, photos and lead times." },
  { title: "Negotiation & purchase", desc: "We negotiate the terms and place the order only after your approval and a secured payment." },
  { title: "Quality & quantity control", desc: "Physical inspection, counting, photos and videos: you validate the goods before they leave." },
  { title: "Shipping", desc: "We organise sea or air freight and send you the parcel tracking." },
  { title: "Reception & follow-up", desc: "Your goods arrive in Cameroon; we stay available until complete handover." },
];

const controlPurchaseServices: ServiceSeed[] = [
  {
    slug: "purchase-sourcing",
    icon: "search",
    image: img("control-sourcing.jpg"),
    order: 1,
    highlighted: true,
    titleFr: "Recherche & accompagnement d'achat",
    titleEn: "Sourcing & purchasing support",
    shortFr: "Vous décrivez le produit, nous identifions des fournisseurs fiables et le meilleur rapport qualité-prix.",
    shortEn: "You describe the product, we identify reliable suppliers and the best value for money.",
    descriptionFr: `
<p>Vous avez repéré un produit sur Alibaba, TikTok, en boutique ou sur photo ? Notre équipe sur place devient vos yeux et vos mains : nous identifions les fabricants et fournisseurs fiables, comparons les offres et vous guidons vers le meilleur rapport qualité-prix.</p>
<ul>
<li>Recherche multi-fournisseurs et comparaison des offres réelles ;</li>
<li>Vérification de l'entreprise (licence, usine, antécédents) ;</li>
<li>Échantillons et photos avant commande ;</li>
<li>Conseil franc sur la qualité et les prix du marché ;</li>
<li>Regroupement possible auprès de plusieurs fournisseurs.</li>
</ul>`,
    descriptionEn: `
<p>Seen a product on Alibaba, TikTok, in a shop or from a photo? Our on-site team becomes your eyes and hands: we identify reliable manufacturers and suppliers, compare offers and guide you towards the best value for money.</p>
<ul>
<li>Multi-supplier search and comparison of real offers;</li>
<li>Company verification (licence, factory, track record);</li>
<li>Samples and photos before ordering;</li>
<li>Honest advice on quality and market prices;</li>
<li>Consolidation across several suppliers available.</li>
</ul>`,
    bulletsFr: [
      "Fournisseurs vérifiés, zéro arnaque",
      "Comparatif des offres et des prix",
      "Échantillons et photos avant commande",
      "Un interlocuteur dédié du brief à la réception",
    ],
    bulletsEn: [
      "Verified suppliers, zero scams",
      "Offer and price comparison",
      "Samples and photos before ordering",
      "A dedicated adviser from brief to delivery",
    ],
    stepsFr: controlStepsFr,
    stepsEn: controlStepsEn,
  },
  {
    slug: "purchase-negotiation",
    icon: "tags",
    image: img("control-negotiation.jpg"),
    order: 2,
    titleFr: "Négociation des prix",
    titleEn: "Price negotiation",
    shortFr: "Notre équipe négocie en votre nom tarifs, modalités de paiement et délais, sans rogner votre marge.",
    shortEn: "Our team negotiates prices, payment terms and lead times on your behalf, without hurting your margin.",
    descriptionFr: `
<p>Sans présence locale et sans comparaison, un acheteur distant paie souvent 20 à 50 % trop cher. Nous négocions pour vous les tarifs de gros, les modalités de paiement et les délais, dans la langue et la culture du fournisseur.</p>
<ul>
<li>Négociation des prix unitaires et des quantités ;</li>
<li>Modalités de paiement maîtrisées (acompte / solde) ;</li>
<li>Négociation des délais de production et de livraison ;</li>
<li>Aucun versement aveugle : le solde après validation ;</li>
<li>Traçabilité de chaque accord par écrit.</li>
</ul>`,
    descriptionEn: `
<p>Without local presence and comparison, a remote buyer often pays 20 to 50% too much. We negotiate wholesale prices, payment terms and lead times for you, in the supplier's language and culture.</p>
<ul>
<li>Unit price and quantity negotiation;</li>
<li>Controlled payment terms (deposit / balance);</li>
<li>Production and delivery lead-time negotiation;</li>
<li>No blind payments: balance due only after validation;</li>
<li>Every agreement documented in writing.</li>
</ul>`,
    bulletsFr: [
      "Prix de gros négociés pour vous",
      "Paiements encadrés étape par étape",
      "Délais de production clarifiés",
      "Accords tracés par écrit",
    ],
    bulletsEn: [
      "Wholesale prices negotiated for you",
      "Payments secured step by step",
      "Clear production lead times",
      "Agreements tracked in writing",
    ],
    stepsFr: controlStepsFr,
    stepsEn: controlStepsEn,
  },
  {
    slug: "purchase-quality",
    icon: "clipboard-check",
    image: img("control-quality.jpg"),
    order: 3,
    titleFr: "Contrôle qualité",
    titleEn: "Quality control",
    shortFr: "Avant tout envoi, nous inspectons les produits : conformité, matière, fonctionnement, finitions et emballage.",
    shortEn: "Before anything ships, we inspect the products: conformity, material, functioning, finishes and packaging.",
    descriptionFr: `
<p>Les échantillons magnifiques cachent parfois une production décevante. Avant tout envoi, nous inspectons physiquement vos produits et vous envoyons des preuves : conformité à l'échantillon, matière, fonctionnement, finitions et emballage.</p>
<ul>
<li>Contrôle de conformité à l'échantillon validé ;</li>
<li>Vérification matière, couleurs, dimensions et finitions ;</li>
<li>Test de fonctionnement des appareils et équipements ;</li>
<li>Contrôle de l'emballage et de la protection ;</li>
<li>Photos et vidéos réelles, vous validez sur preuves.</li>
</ul>`,
    descriptionEn: `
<p>Beautiful samples sometimes hide disappointing production. Before anything ships, we physically inspect your products and send you evidence: conformity with the sample, material, functioning, finishes and packaging.</p>
<ul>
<li>Conformity check against the approved sample;</li>
<li>Material, colours, dimensions and finishes verification;</li>
<li>Functioning tests for devices and equipment;</li>
<li>Packaging and protection check;</li>
<li>Real photos and videos — you validate on evidence.</li>
</ul>`,
    bulletsFr: [
      "Inspection physique avant expédition",
      "Conformité à l'échantillon validé",
      "Photos et vidéos réelles de la marchandise",
      "Rien ne part sans votre validation",
    ],
    bulletsEn: [
      "Physical inspection before shipping",
      "Conformity with the approved sample",
      "Real photos and videos of the goods",
      "Nothing ships without your validation",
    ],
    stepsFr: controlStepsFr,
    stepsEn: controlStepsEn,
  },
  {
    slug: "purchase-quantity",
    icon: "package-check",
    image: img("control-quantity.jpg"),
    order: 4,
    titleFr: "Contrôle quantité",
    titleEn: "Quantity control",
    shortFr: "Nous comptons les unités, colis et références et vérifions les tailles pour que la réception égale la commande payée.",
    shortEn: "We count units, parcels and references and check sizes so the goods received equal the order paid for.",
    descriptionFr: `
<p>Colis manquants, unités en moins, références ou tailles incorrectes : sans comptage au départ, l'écart n'est découvert qu'à la réception. Nous comptons tout avant expédition et bloquons les manquants à la source.</p>
<ul>
<li>Comptage exact des unités et des colis commandés ;</li>
<li>Vérification des références, modèles et assortiments ;</li>
<li>Contrôle des tailles, pointures et dimensions ;</li>
<li>Inventaire photo détaillé avant mise en caisse ;</li>
<li>Rapport de quantité transmis avant votre validation.</li>
</ul>`,
    descriptionEn: `
<p>Missing parcels, units short, wrong references or sizes: without counting at departure, the discrepancy is only discovered on arrival. We count everything before shipping and stop shortages at the source.</p>
<ul>
<li>Exact counting of ordered units and parcels;</li>
<li>References, models and assortments verification;</li>
<li>Sizes and dimensions check;</li>
<li>Detailed photo inventory before packing;</li>
<li>Quantity report sent before your validation.</li>
</ul>`,
    bulletsFr: [
      "Zéro colis manquant : tout est compté",
      "Références et tailles vérifiées",
      "Inventaire photo avant expédition",
      "La réception égale la commande payée",
    ],
    bulletsEn: [
      "No missing parcels: everything is counted",
      "References and sizes verified",
      "Photo inventory before shipping",
      "Goods received equal the order paid for",
    ],
    stepsFr: controlStepsFr,
    stepsEn: controlStepsEn,
  },
  {
    slug: "purchase-shipping",
    icon: "truck",
    image: img("control-shipping.jpg"),
    order: 5,
    titleFr: "Expédition vers votre pays",
    titleEn: "Shipping to your country",
    shortFr: "Fret maritime ou aérien organisé pour vous, suivi du colis et marchandise livrée jusqu'au Cameroun.",
    shortEn: "Sea or air freight organised for you, parcel tracking and goods delivered to Cameroon.",
    descriptionFr: `
<p>Une fois validée, votre marchandise est expédiée vers votre pays. Nous organisons le fret maritime ou aérien, gérons les formalités export et vous transmettons le suivi du colis jusqu'à la réception au Cameroun.</p>
<ul>
<li>Fret maritime économique ou aérien express ;</li>
<li>Formalités export et documents organisés ;</li>
<li>Suivi du colis transmis à chaque étape ;</li>
<li>Arrivée au Cameroun et remise complète ;</li>
<li>Un seul interlocuteur, de l'usine à votre ville.</li>
</ul>`,
    descriptionEn: `
<p>Once validated, your goods are shipped to your country. We organise sea or air freight, handle export formalities and send you parcel tracking until arrival in Cameroon.</p>
<ul>
<li>Economical sea freight or express air freight;</li>
<li>Export formalities and documents organised;</li>
<li>Parcel tracking shared at every stage;</li>
<li>Arrival in Cameroon and complete handover;</li>
<li>One contact, from the factory to your city.</li>
</ul>`,
    bulletsFr: [
      "Maritime ou aérien selon votre urgence",
      "Documents et formalités gérés",
      "Suivi WhatsApp du départ à la réception",
      "Livraison jusqu'au Cameroun",
    ],
    bulletsEn: [
      "Sea or air depending on your urgency",
      "Documents and formalities handled",
      "WhatsApp tracking from departure to arrival",
      "Delivery all the way to Cameroon",
    ],
    stepsFr: controlStepsFr,
    stepsEn: controlStepsEn,
  },
];

/* ------------------------------------------------------------------ */
/* Pôles complets                                                      */
/* ------------------------------------------------------------------ */

export const POLES: PoleSeed[] = [
  {
    slug: "voyages",
    icon: "plane",
    image: "/images/backgrounds/pole-voyages.jpg",
    order: 1,
    nameFr: "MOLIÈRE Voyages",
    nameEn: "MOLIÈRE Travel",
    taglineFr: "Chine & Canada",
    taglineEn: "China & Canada",
    shortFr:
      "Bourses d'études, travail, visas visiteur et affaires, immigration : toutes vos démarches vers la Chine et le Canada, construites et défendues par notre équipe.",
    shortEn:
      "Study scholarships, work, visitor and business visas, immigration: all your procedures to China and Canada, built and defended by our team.",
    descriptionFr:
      "Depuis 2023, MOLIÈRE CONSULTING accompagne les Camerounais dans leurs projets de mobilité vers la Chine et le Canada. Notre force : une connaissance réelle des deux pays, des dossiers rigoureux et un engagement clair — tu ne paies les bourses qu'après l'obtention.",
    descriptionEn:
      "Since 2023, MOLIÈRE CONSULTING has supported Cameroonians in their mobility projects to China and Canada. Our strength: real knowledge of both countries, rigorous files and a clear commitment — scholarship fees are paid only after admission.",
    contentFr: `
<p>Le pôle Voyages de MOLIÈRE CONSULTING couvre les deux destinations qui changent des vies : la <strong>Chine</strong>, avec ses bourses généreuses et son économie dynamique, et le <strong>Canada</strong>, référence mondiale pour les études et l'immigration qualifiée.</p>
<p>Nous traitons les cinq motifs de voyage : <strong>études et bourses, travail, visiteur/tourisme, affaires et immigration</strong>. Pour chaque motif et chaque pays, vous avez un conseiller dédié qui connaît les exigences consulaires et les pièges à éviter.</p>
<h3>Notre promesse</h3>
<ul>
<li>Un diagnostic honnête avant toute dépense ;</li>
<li>Des dossiers complets, vérifiés et soumis dans les délais ;</li>
<li>Pour les bourses : un dépôt de 500 000 FCFA remboursable et des frais payés uniquement après l'obtention ;</li>
<li>Une réponse WhatsApp rapide et un suivi jusqu'à votre installation.</li>
</ul>`,
    contentEn: `
<p>The Travel division of MOLIÈRE CONSULTING covers the two life-changing destinations: <strong>China</strong>, with generous scholarships and a dynamic economy, and <strong>Canada</strong>, a global benchmark for studies and skilled immigration.</p>
<p>We handle all five travel motives: <strong>studies and scholarships, work, visitor/tourism, business and immigration</strong>. For every motive and country, you get a dedicated adviser who knows the consular requirements and the pitfalls to avoid.</p>
<h3>Our promise</h3>
<ul>
<li>An honest assessment before any expense;</li>
<li>Complete, verified files submitted on time;</li>
<li>For scholarships: a refundable 500,000 FCFA deposit and fees paid only after admission;</li>
<li>Fast WhatsApp replies and support until you are settled.</li>
</ul>`,
    services: travelServices,
  },
  {
    slug: "cargo",
    icon: "ship",
    image: "/images/backgrounds/pole-cargo.jpg",
    order: 2,
    nameFr: "Molière Cargo",
    nameEn: "Molière Cargo",
    taglineFr: "Import-Export Chine ↔ Cameroun",
    taglineEn: "Import-Export China ↔ Cameroon",
    shortFr:
      "Sourcing en Chine, fret maritime et aérien, groupage, assurance et livraison à Douala : vos marchandises entre de bonnes mains.",
    shortEn:
      "Sourcing in China, sea and air freight, consolidation, insurance and delivery in Douala: your goods in safe hands.",
    descriptionFr:
      "Molière Cargo est le pont logistique entre les usines chinoises et les commerçants camerounais. Nous trouvons vos produits, contrôlons la qualité, expédions par mer ou air et livrons à Douala après dédouanement.",
    descriptionEn:
      "Molière Cargo is the logistics bridge between Chinese factories and Cameroonian traders. We find your products, inspect quality, ship by sea or air and deliver in Douala after customs clearance.",
    contentFr: `
<p>Commander en Chine depuis le Cameroun devrait être aussi simple qu'un message WhatsApp. Avec <strong>Molière Cargo</strong>, c'est le cas : vous choisissez vos produits, nous gérons tout le reste, de l'usine jusqu'au dépôt de Douala.</p>
<h3>Une chaîne complète et transparente</h3>
<ul>
<li><strong>Sourcing</strong> : fournisseurs vérifiés et prix usine négociés ;</li>
<li><strong>Contrôle qualité</strong> : inspection avant expédition ;</li>
<li><strong>Fret</strong> : maritime économique ou aérien express ;</li>
<li><strong>Groupage</strong> : entrepôt en Chine pour regrouper vos commandes ;</li>
<li><strong>Douane & livraison</strong> : dédouanement à Douala et remise au client.</li>
</ul>
<p>Chaque étape est documentée et partagée sur WhatsApp : photos, vidéos, tracking. Vous savez toujours où se trouve votre marchandise.</p>`,
    contentEn: `
<p>Ordering from China in Cameroon should be as simple as a WhatsApp message. With <strong>Molière Cargo</strong>, it is: you choose your products, we manage everything else, from the factory to the Douala depot.</p>
<h3>A complete, transparent chain</h3>
<ul>
<li><strong>Sourcing</strong>: verified suppliers and negotiated factory prices;</li>
<li><strong>Quality control</strong>: pre-shipment inspection;</li>
<li><strong>Freight</strong>: economical sea or express air;</li>
<li><strong>Consolidation</strong>: warehouse in China to group your orders;</li>
<li><strong>Customs & delivery</strong>: clearance in Douala and handover.</li>
</ul>
<p>Every step is documented and shared on WhatsApp: photos, videos, tracking. You always know where your goods are.</p>`,
    services: cargoServices,
  },
  {
    slug: "control-achat",
    icon: "clipboard-check",
    image: "/images/backgrounds/pole-control.jpg",
    order: 3,
    nameFr: "MOLIÈRE Contrôle Achat",
    nameEn: "MOLIÈRE Purchase Control",
    taglineFr: "Sourcing, contrôle & expédition",
    taglineEn: "Sourcing, inspection & shipping",
    shortFr:
      "Recherche de fournisseurs, négociation, contrôle qualité et quantité, puis expédition jusqu'au Cameroun : vos achats à l'étranger sécurisés, de A à Z.",
    shortEn:
      "Supplier sourcing, negotiation, quality and quantity control, then shipping to Cameroon: your overseas purchases secured, from A to Z.",
    descriptionFr:
      "MOLIÈRE Contrôle Achat est votre bureau d'achat à l'étranger : nous trouvons les fournisseurs, négocions les prix, contrôlons la qualité et les quantités sur place, puis expédions votre marchandise jusqu'au Cameroun.",
    descriptionEn:
      "MOLIÈRE Purchase Control is your overseas buying office: we find suppliers, negotiate prices, inspect quality and quantities on site, then ship your goods to Cameroon.",
    contentFr: `
<p>Commander des marchandises à l'étranger quand on est au Cameroun reste un parcours risqué : fournisseurs injoignables après paiement, échantillons magnifiques mais production décevante, quantités manquantes, prix gonflés ou colis qui n'arrivent jamais.</p>
<p>Avec <strong>Contrôle Achat</strong>, notre équipe devient vos yeux et vos mains sur place. De la recherche du fournisseur jusqu'à l'expédition vers votre ville, chaque étape est vérifiée, documentée et traitée comme si c'était notre propre argent.</p>
<h3>Une chaîne d'achat complète et transparente</h3>
<ul>
<li><strong>Recherche & accompagnement</strong> : fournisseurs fiables et meilleur rapport qualité-prix ;</li>
<li><strong>Négociation</strong> : tarifs de gros, modalités de paiement et délais maîtrisés ;</li>
<li><strong>Contrôle qualité</strong> : inspection physique avant tout envoi ;</li>
<li><strong>Contrôle quantité</strong> : comptage exact des unités, colis et références ;</li>
<li><strong>Expédition</strong> : fret maritime ou aérien jusqu'au Cameroun, avec suivi.</li>
</ul>
<p>Chaque étape est documentée : photos, vidéos et comptes rendus. Tant que vous n'avez pas validé la marchandise sur preuves, rien n'est expédié.</p>`,
    contentEn: `
<p>Ordering goods from abroad while in Cameroon remains risky: unreachable suppliers after payment, beautiful samples but disappointing production, missing quantities, inflated prices or parcels that never arrive.</p>
<p>With <strong>Purchase Control</strong>, our team becomes your eyes and hands on site. From the supplier search to shipping to your city, every step is verified, documented and treated as if it were our own money.</p>
<h3>A complete, transparent buying chain</h3>
<ul>
<li><strong>Sourcing & support</strong>: reliable suppliers and the best value for money;</li>
<li><strong>Negotiation</strong>: wholesale prices, payment terms and controlled lead times;</li>
<li><strong>Quality control</strong>: physical inspection before anything ships;</li>
<li><strong>Quantity control</strong>: exact counting of units, parcels and references;</li>
<li><strong>Shipping</strong>: sea or air freight to Cameroon, with tracking.</li>
</ul>
<p>Every step is documented: photos, videos and reports. Until you validate the goods on evidence, nothing is shipped.</p>`,
    services: controlPurchaseServices,
  },
  {
    slug: "social-media",
    icon: "share",
    image: "/images/backgrounds/pole-social.jpg",
    order: 4,
    nameFr: "MOLIÈRE Social Media",
    nameEn: "MOLIÈRE Social Media",
    taglineFr: "Agence digitale & formations",
    taglineEn: "Digital agency & training",
    shortFr:
      "Réseaux sociaux, contenu, publicité, sites web et identité de marque : nous aidons les entreprises à transmettre leurs idées et produits sur le digital, avec des formations pratiques.",
    shortEn:
      "Social networks, content, advertising, websites and brand identity: we help businesses transmit their ideas and products online, with hands-on training.",
    descriptionFr:
      "MOLIÈRE Social Media aide les entreprises et entrepreneurs à se digitaliser : gestion de réseaux, création de contenu, campagnes publicitaires, sites web et branding, complétés par un catalogue de formations.",
    descriptionEn:
      "MOLIÈRE Social Media helps businesses and entrepreneurs go digital: social media management, content creation, ad campaigns, websites and branding, complemented by a training catalogue.",
    contentFr: `
<p>Transmettre un savoir, une idée, un produit : tout passe aujourd'hui par le digital. <strong>MOLIÈRE Social Media</strong> met cette puissance à la portée des entreprises camerounaises, avec une équipe jeune, créative et orientée résultats.</p>
<h3>Deux manières de travailler ensemble</h3>
<ul>
<li><strong>Nous faisons pour vous</strong> : gestion de réseaux, contenu photo/vidéo, publicité Meta et TikTok, sites web et identité de marque ;</li>
<li><strong>Nous vous formons</strong> : des cours pratiques en marketing digital, création de contenu et vente en ligne, avec suivi personnalisé.</li>
</ul>
<p>Toutes nos prestations sont reliées à WhatsApp : vos campagnes génèrent des messages entrants, et chaque formation se transforme en résultats mesurables.</p>`,
    contentEn: `
<p>Transmitting knowledge, an idea, a product: everything now happens online. <strong>MOLIÈRE Social Media</strong> puts this power within reach of Cameroonian businesses, with a young, creative, results-driven team.</p>
<h3>Two ways to work with us</h3>
<ul>
<li><strong>We do it for you</strong>: social media management, photo/video content, Meta and TikTok ads, websites and brand identity;</li>
<li><strong>We train you</strong>: hands-on courses in digital marketing, content creation and online selling, with personal coaching.</li>
</ul>
<p>All our services are linked to WhatsApp: your campaigns generate inbound messages, and every training turns into measurable results.</p>`,
    services: socialServices,
  },
];
