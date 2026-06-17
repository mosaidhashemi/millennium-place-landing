/**
 * Datengetriebene Event-Landingpages.
 *
 * Jede Eventseite (/events/[slug]) wird vollständig aus einem Eintrag dieser
 * Datei erzeugt — Inhalt, Metadaten, Pakete, FAQ und Schema. Eine neue
 * Eventseite ist damit nur ein weiterer Datensatz, kein neuer Code.
 *
 * Struktur jeder Seite (gemäß Konzept):
 * Hero → kurze Antwort → Zielgruppe → Vorteile → Ablauf → Ausstattung →
 * Beispielpakete → FAQ → interne Verlinkung → Anfrage-CTA.
 */

export type EventPackage = {
  name: string;
  price: string;
  description: string;
  includes: string[];
  featured?: boolean;
};

export type EventFaq = { question: string; answer: string };

export type EventImage = { publicId: string; alt: string };

export type EventContent = {
  slug: string;
  /** Kurzes Label für Navigation & interne Links */
  nav: string;
  /** H1 / Seitentitel */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Cloudinary public id für das Hero-Bild */
  heroImage: string;
  eyebrow: string;
  heroHeadline: string;
  heroSubline: string;
  /** KI-freundliche Kurzantwort direkt am Seitenanfang */
  intro: string;
  audience: { title: string; text: string };
  benefits: { title: string; text: string }[];
  process: { step: string; text: string }[];
  equipment: string[];
  /** Impressionen-Galerie (echte Cloudinary-Fotos) */
  gallery: EventImage[];
  packages: EventPackage[];
  faqs: EventFaq[];
  /** Interne Verlinkung zu verwandten Seiten/Sektionen */
  related: { label: string; href: string }[];
};

export const events: EventContent[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "hochzeiten",
    nav: "Hochzeiten",
    title: "Hochzeit am Rhein",
    metaTitle: "Hochzeitslocation am Rhein | Heiraten im Rheingau",
    metaDescription:
      "Heiraten mit Rheinblick: Millennium Place ist Ihre exklusive Hochzeitslocation im Rheingau für bis zu 250 Gäste. Freie Trauung, Festsaal, Fine Dining & Full-Service Hochzeitsplanung. Jetzt Termin anfragen.",
    heroImage: "WhatsApp_Image_2026-05-30_at_21.29.28_lcmu9h",
    eyebrow: "Hochzeiten",
    heroHeadline: "Der schönste Tag — am Ufer des Rheins",
    heroSubline:
      "Eine Hochzeitslocation, die Eleganz, Rheinblick und erstklassige Gastronomie vereint. Für die intime Trauung wie für die große Feier mit 250 Gästen.",
    intro:
      "Millennium Place ist eine exklusive Hochzeitslocation im Rheingau, in Lorch am Rhein. Sie feiern mit bis zu 250 Gästen im Grand Ballroom, lassen sich auf der Rheinterrasse frei trauen und genießen ein individuell komponiertes Menü aus unserer Steakhouse-Küche. Von der Planung bis zum letzten Tanz begleitet Sie ein persönliches Team.",
    audience: {
      title: "Für Paare, die das Besondere suchen",
      text: "Ob romantische Trauung zu zweit mit engsten Vertrauten oder rauschende Hochzeit mit Familie und Freunden aus aller Welt — bei uns wird Ihr Tag zu einem Erlebnis, an das sich alle ein Leben lang erinnern. Wir heißen Paare jeder Herkunft, Kultur und Tradition herzlich willkommen und gestalten Ihre Feier so individuell wie Ihre Liebesgeschichte.",
    },
    benefits: [
      {
        title: "Trauung mit Rheinblick",
        text: "Freie Trauung auf der Rheinterrasse — mit dem Fluss und den Weinbergen des Rheingaus als natürlicher Kulisse.",
      },
      {
        title: "Ein Ort, alles dabei",
        text: "Trauung, Sektempfang, Dinner und Party an einem Ort. Keine Wege, keine Logistik — nur Ihr Tag.",
      },
      {
        title: "Fine-Dining-Küche",
        text: "Mehrgang-Menüs, Flying Buffets und Spätsnacks aus unserer Steakhouse-Küche, individuell auf Sie abgestimmt.",
      },
      {
        title: "Full-Service-Planung",
        text: "Floristik, Dekoration, Technik, Entertainment und Ablaufkoordination — ein Ansprechpartner für alles.",
      },
    ],
    process: [
      {
        step: "Kennenlernen",
        text: "Wir besichtigen gemeinsam die Location, lernen Ihre Vorstellungen kennen und prüfen Ihren Wunschtermin.",
      },
      {
        step: "Konzept & Menü",
        text: "Wir gestalten Ablauf, Bestuhlung, Dekoration und ein Menü, das zu Ihnen und Ihren Gästen passt.",
      },
      {
        step: "Feinschliff",
        text: "Zeitplan, Sitzordnung, Technik und alle Details werden in einem Abstimmungstermin festgelegt.",
      },
      {
        step: "Ihr großer Tag",
        text: "Unser Team kümmert sich um jeden Moment — Sie genießen Ihre Hochzeit von der ersten bis zur letzten Minute.",
      },
    ],
    equipment: [
      "Grand Ballroom für bis zu 250 Gäste",
      "Rheinterrasse für freie Trauungen (bis 120 Gäste)",
      "Private Dining Rooms für intime Feiern (bis 30 Gäste)",
      "Profi-Ton- und Lichttechnik inkl. Bühne",
      "Tanzfläche & Flügel auf Wunsch",
      "Brautzimmer / Rückzugsraum",
      "Kostenfreie Parkplätze & Shuttle-Service auf Anfrage",
      "Barrierefreier Zugang",
    ],
    gallery: [
      { publicId: "Saal_Millennium_mxbpw9", alt: "Festsaal mit goldener Bühne für die Hochzeitsfeier" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_2_lavrks", alt: "Festlich gedeckte Hochzeitstafel" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.34_lrmexr", alt: "Florales Tischarrangement" },
      { publicId: "Menu_Dinner_Fish_plate_fytvtf", alt: "Fein angerichteter Menügang" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_1_a6dsdu", alt: "Elegante Hochzeitsdekoration" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.16_1_kzd4km", alt: "Millennium Place bei Nacht beleuchtet" },
    ],
    packages: [
      {
        name: "Intime Trauung",
        price: "ab 5.000 €",
        description: "Für kleine Hochzeiten im Private Dining Room.",
        includes: [
          "Bis 30 Gäste",
          "Freie Trauung oder Empfang",
          "3-Gang-Menü oder Buffet",
          "Aperitif & Tischdekoration",
          "Persönliche Betreuung",
        ],
      },
      {
        name: "Rheingau-Hochzeit",
        price: "ab 12.000 €",
        description: "Die klassische Feier im Grand Ballroom.",
        includes: [
          "Bis 120 Gäste",
          "Freie Trauung auf der Rheinterrasse",
          "Sektempfang & 4-Gang-Menü",
          "Floristik & Dekoration",
          "Ton-, Licht- & Bühnentechnik",
          "Ablaufkoordination am Tag",
        ],
        featured: true,
      },
      {
        name: "Luxus-Hochzeit",
        price: "auf Anfrage",
        description: "Die große Feier — kompromisslos exklusiv.",
        includes: [
          "Bis 250 Gäste",
          "Exklusive Anmietung der gesamten Location",
          "Mehrgang-Galadinner & Premium-Getränke",
          "Live-Musik / Band & DJ",
          "Individuelles Dekorationskonzept",
          "Persönlicher Hochzeitsplaner",
        ],
      },
    ],
    faqs: [
      {
        question: "Wie viele Gäste können bei einer Hochzeit feiern?",
        answer:
          "Im Grand Ballroom feiern Sie mit bis zu 250 Gästen, auf der Rheinterrasse mit bis zu 120 und in den Private Dining Rooms mit bis zu 30 Gästen.",
      },
      {
        question: "Sind freie Trauungen direkt vor Ort möglich?",
        answer:
          "Ja. Freie Trauungen finden bei schönem Wetter auf der Rheinterrasse mit Blick auf den Rhein statt, alternativ stimmungsvoll im Innenbereich. Gerne empfehlen wir erfahrene Trauredner.",
      },
      {
        question: "Können wir das Menü individuell gestalten?",
        answer:
          "Unser Küchenchef komponiert Ihr Hochzeitsmenü ganz nach Ihren Wünschen. Allergien, kulturelle und religiöse Speisevorschriften sowie vegetarische und vegane Wünsche berücksichtigen wir selbstverständlich.",
      },
      {
        question: "Wie früh sollten wir unseren Termin reservieren?",
        answer:
          "Für Hochzeiten in der Hauptsaison (Mai bis September) empfehlen wir eine Reservierung 12 bis 18 Monate im Voraus. Da Millennium Place 2026 eröffnet, sichern Sie sich jetzt die besten Termine zu Eröffnungskonditionen.",
      },
    ],
    related: [
      { label: "Firmenveranstaltungen", href: "/events/firmenveranstaltungen" },
      { label: "Galerie ansehen", href: "/#galerie" },
      { label: "Pakete & Preise", href: "/#preise" },
      { label: "Event anfragen", href: "/#kontakt" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "firmenveranstaltungen",
    nav: "Firmenevents",
    title: "Firmenveranstaltungen im Rheingau",
    metaTitle: "Firmenevents & Tagungen im Rheingau | Eventlocation am Rhein",
    metaDescription:
      "Firmenfeiern, Galas, Konferenzen & Tagungen mit Niveau: Millennium Place ist Ihre Premium-Eventlocation im Rheingau für bis zu 250 Personen — moderne Technik, Catering & Full-Service. Jetzt anfragen.",
    heroImage: "Saal_Millennium_mxbpw9",
    eyebrow: "Business Events",
    heroHeadline: "Geschäftliche Anlässe, die in Erinnerung bleiben",
    heroSubline:
      "Von der Konferenz über die Produktpräsentation bis zur glanzvollen Firmengala — eine Location, die Professionalität und Premium-Ambiente verbindet.",
    intro:
      "Millennium Place ist eine Premium-Eventlocation im Rheingau für Firmenveranstaltungen jeder Art: Tagungen, Konferenzen, Kundenevents, Mitarbeiterfeiern, Galas und Weihnachtsfeiern für bis zu 250 Personen. Moderne Veranstaltungstechnik, exzellentes Catering und ein erfahrenes Team sorgen für einen reibungslosen Ablauf — mit dem Rhein als außergewöhnlicher Kulisse.",
    audience: {
      title: "Für Unternehmen mit Anspruch",
      text: "Ob mittelständisches Unternehmen, Konzern, Verband oder Agentur — wir schaffen den passenden Rahmen für Ihre Botschaft. Eine repräsentative Location abseits des Konferenzhotel-Alltags, die Ihre Gäste, Kunden und Mitarbeitenden beeindruckt und Ihre Marke wirken lässt.",
    },
    benefits: [
      {
        title: "Repräsentatives Ambiente",
        text: "Eine Location, die Eindruck macht — für Kundenevents, Jubiläen und Präsentationen, die Ihre Marke unterstreichen.",
      },
      {
        title: "Tagungstechnik inklusive",
        text: "Beamer, Großbild, professionelle Tontechnik, Bühne und schnelles WLAN — technisch bestens ausgestattet.",
      },
      {
        title: "Flexible Raumkonzepte",
        text: "Vom Konferenz-Setup für 50 bis zur Gala für 250 Personen — Bestuhlung und Räume passen sich Ihrem Format an.",
      },
      {
        title: "Catering & Service",
        text: "Business-Lunch, Flying Buffet oder festliches Galadinner aus unserer Steakhouse-Küche — inkl. Servicepersonal.",
      },
    ],
    process: [
      {
        step: "Briefing",
        text: "Wir klären Ziel, Format, Teilnehmerzahl und Termin Ihrer Veranstaltung.",
      },
      {
        step: "Raum- & Technikkonzept",
        text: "Wir planen Bestuhlung, Technik, Ablauf und Catering passend zu Ihrem Anlass.",
      },
      {
        step: "Koordination",
        text: "Zeitplan, Referenten, Dienstleister und Logistik werden abgestimmt und vorbereitet.",
      },
      {
        step: "Durchführung",
        text: "Ein fester Ansprechpartner sorgt am Veranstaltungstag für einen reibungslosen Ablauf.",
      },
    ],
    equipment: [
      "Grand Ballroom für bis zu 250 Personen",
      "Flexible Bestuhlung (Reihen, Bankett, Konferenz, Empfang)",
      "Beamer, Großbild & professionelle Tontechnik",
      "Bühne & Rednerpult mit Mikrofonanlage",
      "Schnelles WLAN für alle Gäste",
      "Tageslicht & Rheinblick",
      "Garderobe & Empfangsbereich",
      "Kostenfreie Parkplätze & Shuttle-Service auf Anfrage",
    ],
    gallery: [
      { publicId: "konferenz_2026_sitzung_wl8p1w", alt: "Konferenzsaal mit Tagungsbestuhlung" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.17_3_z6k3mg", alt: "Meeting- und Tagungssituation" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.33_1_b08gcv", alt: "Festliche Abendveranstaltung" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_3_zijfe0", alt: "Bühne mit professioneller Beleuchtung" },
      { publicId: "Buffet_Millenium_1_rkfrjx", alt: "Exklusives Catering-Buffet" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_br4hrq", alt: "Stimmungsvolle Gala-Beleuchtung" },
    ],
    packages: [
      {
        name: "Tagung & Konferenz",
        price: "ab 5.000 €",
        description: "Der professionelle Rahmen für Ihr Meeting.",
        includes: [
          "Halbtags oder ganztags",
          "Konferenzbestuhlung & Technik",
          "Tagungsgetränke & Pausensnacks",
          "Business-Lunch",
          "Persönliche Betreuung",
        ],
      },
      {
        name: "Firmenfeier & Gala",
        price: "ab 15.000 €",
        description: "Glanzvolle Abende für Team und Kunden.",
        includes: [
          "Bis 250 Personen",
          "Sektempfang & Galadinner",
          "Bühne, Licht- & Tontechnik",
          "DJ oder Live-Musik",
          "Dekorationskonzept",
          "Ablaufkoordination am Abend",
        ],
        featured: true,
      },
      {
        name: "Weihnachtsfeier",
        price: "auf Anfrage",
        description: "Der festliche Jahresabschluss am Rhein.",
        includes: [
          "Individuelle Gruppengröße",
          "Festliches Menü oder Buffet",
          "Winterliche Dekoration",
          "Unterhaltungsprogramm auf Wunsch",
          "Getränkepauschalen verfügbar",
        ],
      },
    ],
    faqs: [
      {
        question: "Für wie viele Personen ist die Location geeignet?",
        answer:
          "Für Tagungen ab etwa 20 Personen bis zu Galas und Firmenfeiern mit 250 Gästen. Die Bestuhlung passen wir flexibel an Ihr Format an.",
      },
      {
        question: "Welche Veranstaltungstechnik steht zur Verfügung?",
        answer:
          "Beamer und Großbild, professionelle Tontechnik, Bühne mit Rednerpult und Mikrofonanlage sowie schnelles WLAN. Spezielle Technikwünsche organisieren wir auf Anfrage.",
      },
      {
        question: "Bieten Sie Catering für Geschäftsveranstaltungen an?",
        answer:
          "Ja, von Business-Lunch und Pausensnacks über Flying Buffets bis zum festlichen Galadinner aus unserer Steakhouse-Küche — inklusive Servicepersonal und Getränkepauschalen.",
      },
      {
        question: "Sind Weihnachtsfeiern und Jahresabschlüsse möglich?",
        answer:
          "Sehr gerne. Für die Weihnachtszeit bieten wir festliche Menüs, winterliche Dekoration und Unterhaltungsprogramme. Beliebte Termine im Dezember sollten frühzeitig reserviert werden.",
      },
    ],
    related: [
      { label: "Hochzeiten", href: "/events/hochzeiten" },
      { label: "Galerie ansehen", href: "/#galerie" },
      { label: "Pakete & Preise", href: "/#preise" },
      { label: "Event anfragen", href: "/#kontakt" },
    ],
  },
];

export const eventSlugs = events.map((e) => e.slug);

export function getEvent(slug: string): EventContent | undefined {
  return events.find((e) => e.slug === slug);
}
