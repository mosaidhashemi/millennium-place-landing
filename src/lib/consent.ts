/**
 * DSGVO/TDDDG-konformes Consent-Management (eigene Lösung für Next.js).
 *
 * Ersetzt WordPress-Plugins wie Complianz/Borlabs, die hier technisch nicht
 * einsetzbar sind. Kategorien, Speicherung und Protokollierung der Einwilligung
 * sowie das Gating externer Dienste (Google Maps, YouTube, Calendly) laufen
 * vollständig clientseitig.
 *
 * Grundsatz: Außer "notwendig" ist alles standardmäßig DEAKTIVIERT (Opt-in).
 * Externe Medien/Tracker werden erst nach aktiver Zustimmung geladen.
 */

export type ConsentCategory =
  | "necessary"
  | "statistics"
  | "marketing"
  | "externalMedia";

export type ConsentState = Record<ConsentCategory, boolean>;

/** Protokollierter Einwilligungs-Datensatz (clientseitig, dokumentierbar). */
export type ConsentRecord = {
  version: string;
  /** ISO-Zeitstempel der Einwilligung */
  timestamp: string;
  categories: ConsentState;
};

/** Bei Änderung der Kategorien-Definitionen erhöhen → erneuter Consent. */
export const CONSENT_VERSION = "1.0.0";

export const CONSENT_STORAGE_KEY = "mp-consent";

/** Event, mit dem der Footer-Link „Cookie-Einstellungen" das Banner öffnet. */
export const OPEN_CONSENT_EVENT = "mp:open-consent";

export const defaultConsent: ConsentState = {
  necessary: true,
  statistics: false,
  marketing: false,
  externalMedia: false,
};

export const allAccepted: ConsentState = {
  necessary: true,
  statistics: true,
  marketing: true,
  externalMedia: true,
};

export const categoryMeta: Record<
  ConsentCategory,
  { title: string; description: string; locked?: boolean }
> = {
  necessary: {
    title: "Notwendig",
    description:
      "Technisch erforderlich für den Betrieb der Website (z. B. Speicherung Ihrer Cookie-Einstellungen). Immer aktiv.",
    locked: true,
  },
  statistics: {
    title: "Statistik",
    description:
      "Anonymisierte Messung der Websitenutzung, um unser Angebot zu verbessern. Wird erst nach Ihrer Zustimmung geladen.",
  },
  marketing: {
    title: "Marketing",
    description:
      "Dienste zur Reichweitenmessung und für personalisierte Inhalte (z. B. Meta Pixel). Wird erst nach Ihrer Zustimmung geladen.",
  },
  externalMedia: {
    title: "Externe Medien",
    description:
      "Inhalte externer Anbieter wie Google Maps, YouTube-Videos und der Calendly-Terminbuchung. Beim Laden können Daten an diese Anbieter übertragen werden.",
  },
};

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    // Bei Versionswechsel erneut nachfragen.
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(categories: ConsentState): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: { ...categories, necessary: true },
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* localStorage nicht verfügbar — Consent gilt nur für die Sitzung */
  }
  return record;
}
