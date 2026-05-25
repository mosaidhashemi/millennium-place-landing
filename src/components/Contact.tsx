"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
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
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass rounded-2xl p-8 md:p-12 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-midnight-300 mb-2 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Ihr vollständiger Name"
                  className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-midnight-300 mb-2 font-medium"
                >
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="ihre@email.de"
                  className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="event"
                  className="block text-sm text-midnight-300 mb-2 font-medium"
                >
                  Art des Events
                </label>
                <select
                  id="event"
                  className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all appearance-none"
                >
                  <option value="">Bitte wählen</option>
                  <option value="hochzeit">Hochzeit</option>
                  <option value="firmenfeier">Firmenfeier</option>
                  <option value="gala">Gala</option>
                  <option value="konferenz">Konferenz</option>
                  <option value="privat">Privates Dinner</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm text-midnight-300 mb-2 font-medium"
                >
                  Gästeanzahl
                </label>
                <input
                  type="number"
                  id="guests"
                  placeholder="Geschätzte Anzahl"
                  className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-midnight-300 mb-2 font-medium"
              >
                Ihre Nachricht
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Erzählen Sie uns von Ihrem Event..."
                className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/25 text-lg"
            >
              Anfrage absenden
            </motion.button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
