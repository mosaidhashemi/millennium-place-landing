/**
 * Single Source of Truth für alle Geschäftsdaten von Millennium Place.
 *
 * Diese Datei speist sowohl die sichtbaren Komponenten (FAQ, SocialProof …)
 * als auch das strukturierte Schema.org-Markup (src/lib/schema.ts).
 * Dadurch bleiben Seiteninhalt und Markup immer konsistent — eine
 * Voraussetzung dafür, dass Google Rich Results (FAQ, Sterne) ausspielt.
 */

export const SITE_URL = "https://millenniumplace.de";

export const business = {
  name: "Millennium Place",
  legalName: "Millennium Place",
  slogan: "Premium Event & Dining Destination am Rhein",
  description:
    "Exklusive Premium-Eventlocation und Steakhouse im Rheingau. Hochzeiten, Firmenfeiern, Galas, Konferenzen und Live Events für bis zu 250 Gäste — mit Blick auf den Rhein in Lorch am Rhein.",
  url: SITE_URL,
  email: "info@millenniumplace.de",
  ogImage: "/images/interior-sunset.png",

  address: {
    street: "Kolpingstraße 5",
    locality: "Lorch am Rhein",
    postalCode: "65391",
    region: "Hessen",
    country: "DE",
  },
  geo: { latitude: 50.0438, longitude: 7.8039 },

  priceRange: "€€€",
  cuisines: ["Steakhouse", "International", "Rheingauer Küche"],
  maximumAttendeeCapacity: 250,
  languages: ["de", "en"],
  areaServed: ["Rheingau", "Rhein-Main-Gebiet", "Hessen", "Rheinland-Pfalz"],

  /** Voraussichtliche Eröffnung */
  openingDate: "2026",

  /** Externer Link zu den Google-Bewertungen */
  googleReviewsUrl:
    "https://www.google.com/maps/search/Millennium+Place+Lorch",

  /** Echte Google-Gesamtbewertung (Stand Juni 2026) */
  rating: { value: 4.7, count: 20, best: 5 },
} as const;

/**
 * Rechtlich verbindliche Betreiberdaten (Impressum, Datenschutz, AGB).
 * Achtung: Die im Impressum genannte Kontakt-E-Mail/Telefon muss erreichbar
 * sein — daher die direkte Inhaber-Adresse, nicht die Marketing-Adresse.
 */
export const legal = {
  owner: "Said Zorhab Faqiri",
  legalForm: "Einzelunternehmen",
  street: "Kolpingstraße 5",
  postalCode: "65391",
  locality: "Lorch am Rhein",
  phone: "+49 151 74313645",
  email: "zfaqiri@gmx.de",
  hostingProvider:
    "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (Server-Standorte in der EU)",
} as const;

/**
 * Veranstaltungsarten — gespiegelt als hasOfferCatalog im Schema und als
 * Grundlage für künftige Event-Landingpages.
 */
export const eventTypes = [
  "Hochzeiten",
  "Freie Trauungen",
  "Firmenveranstaltungen",
  "Weihnachtsfeiern",
  "Galas",
  "Geburtstage",
  "Kulturelle Events",
  "Konferenzen & Tagungen",
  "Private Feiern",
  "Live-Musik & Dinner Events",
] as const;

/** Häufige Fragen — Quelle für FAQ-Sektion UND FAQPage-Schema. */
export const faqs = [
  {
    question: "Wann eröffnet Millennium Place?",
    answer:
      "Die offizielle Eröffnung ist für 2026 geplant. Sie können bereits jetzt Ihr Event vormerken lassen und von exklusiven Eröffnungskonditionen profitieren.",
  },
  {
    question: "Wie viele Gäste passen in die Location?",
    answer:
      "Der Grand Ballroom fasst bis zu 250 Gäste, die Rheinterrasse bis zu 120 und unsere Private Dining Rooms bis zu 30 Gäste. Für individuelle Arrangements kontaktieren Sie uns gerne.",
  },
  {
    question: "Bieten Sie Full-Service Event-Planung an?",
    answer:
      "Ja, von der ersten Idee bis zum letzten Tanz begleiten wir Sie. Unser erfahrenes Team kümmert sich um Dekoration, Catering, Entertainment, Technik und alle Details.",
  },
  {
    question: "Kann man das Steakhouse auch ohne Event besuchen?",
    answer:
      "Selbstverständlich! Unser Steakhouse steht allen Gästen offen. Wir empfehlen eine Reservierung, besonders an Wochenenden und für die begehrten Terrassenplätze mit Rheinblick.",
  },
  {
    question: "Gibt es Parkmöglichkeiten?",
    answer:
      "Direkt am Millennium Place stehen ausreichend kostenlose Parkplätze zur Verfügung. Für größere Events organisieren wir gerne einen Shuttle-Service von Bahnhöfen oder Hotels.",
  },
  {
    question: "Sind individuelle Menüs möglich?",
    answer:
      "Unser Küchenchef erstellt auf Wunsch ein komplett individuelles Menü für Ihr Event. Alle Allergien und Ernährungsvorlieben werden selbstverständlich berücksichtigt.",
  },
] as const;

/** Echte Google-Rezensionen — Quelle für SocialProof UND Review-Schema. */
export const reviews = [
  {
    quote:
      "Gastfreundlichkeit schon ab der Eingangstür und wirklich leckeres Essen. Fajitas, Rumpsteak oder Putenschnitzel – wir waren mit allem sehr zufrieden und kommen gerne wieder! Super Einkehrmöglichkeit nach einer Wanderung auf dem Wispertrail.",
    author: "Marco",
    role: "Local Guide · Google",
    initials: "M",
    rating: 5,
  },
  {
    quote:
      "Sehr leckeres und toll angerichtetes Essen. Wir haben uns direkt wohlgefühlt, da das Ambiente sehr schön und gehoben ist. Der Service ist 1 A.",
    author: "tammi_mz",
    role: "Local Guide · Google",
    initials: "T",
    rating: 5,
  },
] as const;
