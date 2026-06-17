"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  type ConsentCategory,
  type ConsentState,
  allAccepted,
  categoryMeta,
  defaultConsent,
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
} from "@/lib/consent";

type ConsentContextValue = {
  consent: ConsentState;
  /** true, sobald der Nutzer eine Entscheidung getroffen hat */
  decided: boolean;
  hasConsent: (category: ConsentCategory) => boolean;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    // Außerhalb des Providers (z. B. SSR-Fallback): nichts ist freigegeben.
    return {
      consent: defaultConsent,
      decided: false,
      hasConsent: () => false,
      openSettings: () => {},
    } satisfies ConsentContextValue;
  }
  return ctx;
}

const ORDER: ConsentCategory[] = [
  "necessary",
  "statistics",
  "marketing",
  "externalMedia",
];

export default function ConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [decided, setDecided] = useState(true); // bis localStorage gelesen ist: nichts anzeigen
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(defaultConsent);

  // Gespeicherte Einwilligung beim Start laden.
  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored.categories);
      setDecided(true);
    } else {
      setDecided(false);
      setBannerOpen(true);
    }
  }, []);

  // Footer-Link „Cookie-Einstellungen" öffnet den Dialog.
  useEffect(() => {
    const open = () => {
      setDraft(consent);
      setSettingsOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, [consent]);

  const persist = useCallback((state: ConsentState) => {
    writeConsent(state);
    setConsent(state);
    setDecided(true);
    setBannerOpen(false);
    setSettingsOpen(false);
  }, []);

  const value: ConsentContextValue = {
    consent,
    decided,
    hasConsent: (c) => consent[c],
    openSettings: () => {
      setDraft(consent);
      setSettingsOpen(true);
    },
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}

      {/* ── Consent-Banner ─────────────────────────────────── */}
      <AnimatePresence>
        {bannerOpen && !settingsOpen && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Cookie-Hinweis"
            aria-live="polite"
            className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-gold-400/20 bg-midnight-950/95 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-black/50">
              <h2 className="font-heading text-xl md:text-2xl text-gold-100 mb-2">
                Datenschutz &amp; Cookies
              </h2>
              <p className="text-midnight-300 font-light text-sm leading-relaxed mb-6">
                Wir verwenden Cookies und ähnliche Technologien. Notwendige sind
                für den Betrieb der Website erforderlich. Andere helfen uns, das
                Angebot zu verbessern oder externe Inhalte (Karte, Videos,
                Terminbuchung) anzuzeigen. Sie entscheiden selbst — Ihre Auswahl
                können Sie jederzeit im Footer unter „Cookie-Einstellungen"
                widerrufen. Details in unserer{" "}
                <a href="/datenschutz" className="text-gold-400 hover:text-gold-300 underline">
                  Datenschutzerklärung
                </a>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => persist(allAccepted)}
                  className="order-1 sm:order-3 flex-1 py-3 px-6 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-colors"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={() => persist(defaultConsent)}
                  className="order-2 flex-1 py-3 px-6 border border-gold-400/30 hover:border-gold-300 text-gold-100 font-medium rounded-full transition-colors"
                >
                  Alle ablehnen
                </button>
                <button
                  onClick={() => {
                    setDraft(consent);
                    setSettingsOpen(true);
                  }}
                  className="order-3 sm:order-1 flex-1 py-3 px-6 text-midnight-300 hover:text-gold-300 font-medium rounded-full transition-colors"
                >
                  Einstellungen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Einstellungs-Dialog ────────────────────────────── */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSettingsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Cookie-Einstellungen"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-gold-400/20 bg-midnight-950 p-6 md:p-8 shadow-2xl"
            >
              <h2 className="font-heading text-2xl text-gold-100 mb-1">
                Cookie-Einstellungen
              </h2>
              <p className="text-midnight-400 font-light text-sm mb-6">
                Wählen Sie, welche Kategorien Sie zulassen möchten.
              </p>

              <div className="space-y-4 mb-8">
                {ORDER.map((cat) => {
                  const meta = categoryMeta[cat];
                  const active = meta.locked ? true : draft[cat];
                  return (
                    <label
                      key={cat}
                      className={`flex items-start gap-4 rounded-xl border p-4 transition-colors ${
                        active
                          ? "border-gold-400/30 bg-gold-500/5"
                          : "border-midnight-800/60"
                      } ${meta.locked ? "opacity-90" : "cursor-pointer"}`}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        disabled={meta.locked}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, [cat]: e.target.checked }))
                        }
                        className="mt-1 h-5 w-5 shrink-0 accent-gold-500"
                      />
                      <span>
                        <span className="block text-gold-100 font-medium">
                          {meta.title}
                          {meta.locked && (
                            <span className="ml-2 text-xs text-gold-400/70 uppercase tracking-wider">
                              immer aktiv
                            </span>
                          )}
                        </span>
                        <span className="block text-midnight-400 font-light text-sm mt-1 leading-relaxed">
                          {meta.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => persist(draft)}
                  className="flex-1 py-3 px-6 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-colors"
                >
                  Auswahl speichern
                </button>
                <button
                  onClick={() => persist(allAccepted)}
                  className="flex-1 py-3 px-6 border border-gold-400/30 hover:border-gold-300 text-gold-100 font-medium rounded-full transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConsentContext.Provider>
  );
}
