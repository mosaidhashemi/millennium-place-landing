"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

type Status = "idle" | "loading" | "success" | "error";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMsg(
        "Formular noch nicht konfiguriert. Bitte kontaktieren Sie uns direkt per E-Mail."
      );
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "Neue Event-Anfrage über millenniumplace.de");
    formData.append("from_name", "Millennium Place Website");

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Etwas ist schiefgelaufen. Bitte erneut versuchen.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.");
    }
  }

  return (
    <section id="kontakt" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-midnight-950" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Kontakt
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Lassen Sie uns Ihr Event planen
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Erzählen Sie uns von Ihrer Vision. Wir melden uns innerhalb von 24
            Stunden bei Ihnen.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass rounded-2xl p-10 md:p-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold-500/15 border border-gold-400/30 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl text-gold-100 mb-3">
                  Vielen Dank!
                </h3>
                <p className="text-midnight-300 font-light max-w-md mx-auto">
                  Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb
                  von 24 Stunden bei Ihnen.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
                >
                  Weitere Anfrage senden
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl p-8 md:p-12 space-y-6"
              >
                {/* Honeypot Spam-Schutz */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-midnight-300 mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Ihr vollständiger Name"
                      className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-midnight-300 mb-2 font-medium">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="ihre@email.de"
                      className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="event" className="block text-sm text-midnight-300 mb-2 font-medium">
                      Art des Events
                    </label>
                    <select
                      id="event"
                      name="event_type"
                      className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all appearance-none"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="Hochzeit">Hochzeit</option>
                      <option value="Firmenfeier">Firmenfeier</option>
                      <option value="Gala">Gala</option>
                      <option value="Konferenz">Konferenz</option>
                      <option value="Privates Dinner">Privates Dinner</option>
                      <option value="Sonstiges">Sonstiges</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm text-midnight-300 mb-2 font-medium">
                      Gästeanzahl
                    </label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      min={1}
                      placeholder="Geschätzte Anzahl"
                      className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-midnight-300 mb-2 font-medium">
                    Ihre Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Erzählen Sie uns von Ihrem Event..."
                    className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all resize-none"
                  />
                </div>

                {/* Pflicht-Einwilligungen (DSGVO / BGB) */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 text-sm text-midnight-300 font-light cursor-pointer">
                    <input
                      type="checkbox"
                      name="datenschutz_akzeptiert"
                      required
                      value="ja"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
                    />
                    <span>
                      Ich habe die{" "}
                      <a href="/datenschutz" target="_blank" className="text-gold-400 hover:text-gold-300 underline">
                        Datenschutzerklärung
                      </a>{" "}
                      gelesen und stimme der Verarbeitung meiner Daten zur
                      Bearbeitung der Anfrage zu.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-midnight-300 font-light cursor-pointer">
                    <input
                      type="checkbox"
                      name="agb_akzeptiert"
                      required
                      value="ja"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
                    />
                    <span>
                      Ich akzeptiere die{" "}
                      <a href="/agb" target="_blank" className="text-gold-400 hover:text-gold-300 underline">
                        Allgemeinen Geschäftsbedingungen
                      </a>
                      .
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-midnight-300 font-light cursor-pointer">
                    <input
                      type="checkbox"
                      name="widerruf_zur_kenntnis"
                      required
                      value="ja"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
                    />
                    <span>
                      Mir ist bekannt, dass für termingebundene
                      Veranstaltungsleistungen kein gesetzliches Widerrufsrecht
                      besteht (§ 312g Abs. 2 Nr. 9 BGB).
                    </span>
                  </label>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">{errorMsg}</p>
                )}

                <motion.button
                  whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/25 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Wird gesendet…" : "Anfrage absenden"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
