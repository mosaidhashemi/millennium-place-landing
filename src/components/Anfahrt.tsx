"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ConsentGate from "./consent/ConsentGate";

const directions = [
  { from: "Frankfurt", time: "ca. 1h 10min", route: "A66 → B42 Richtung Rüdesheim → Lorch" },
  { from: "Wiesbaden", time: "ca. 50 min", route: "B42 entlang des Rheins" },
  { from: "Koblenz", time: "ca. 45 min", route: "B42 rheinaufwärts" },
  { from: "Mainz", time: "ca. 55 min", route: "A60 → B42 Richtung Rheingau" },
];

export default function Anfahrt() {
  return (
    <section id="anfahrt" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/20 to-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Anfahrt
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            So finden Sie uns
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Millennium Place liegt im Herzen von Lorch am Rhein — direkt an der
            romantischen Rheinstraße.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px]">
              <ConsentGate
                category="externalMedia"
                title="Google Maps"
                description="Zum Schutz Ihrer Daten wird die Karte erst nach Ihrer Zustimmung geladen. Dabei werden Daten an Google übertragen."
                className="h-full"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2548.5!2d7.8039!3d50.0438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bdc53e8fba9a5d%3A0x422435029b0b770!2sLorch%2C%20Deutschland!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                  className="w-full h-full"
                  style={{ border: "none", filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Millennium Place Standort"
                />
              </ConsentGate>
            </div>
          </ScrollReveal>

          {/* Info + Directions */}
          <div className="space-y-8">
            {/* Address Card */}
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-2xl text-gold-100 mb-4">
                  Adresse
                </h3>
                <div className="space-y-3 text-midnight-300 font-light">
                  <p className="flex items-start gap-3">
                    <span className="text-gold-400 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </span>
                    Millennium Place<br />Lorch am Rhein<br />65391 Rheingau
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-gold-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </span>
                    info@millenniumplace.de
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Directions */}
            <ScrollReveal delay={0.2}>
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-2xl text-gold-100 mb-6">
                  Anfahrt von
                </h3>
                <div className="space-y-4">
                  {directions.map((d) => (
                    <motion.div
                      key={d.from}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between border-b border-midnight-800/30 pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="text-gold-200 font-medium">{d.from}</p>
                        <p className="text-midnight-400 text-sm font-light">{d.route}</p>
                      </div>
                      <span className="text-gold-400 text-sm font-medium whitespace-nowrap ml-4">
                        {d.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Parking */}
            <ScrollReveal delay={0.3}>
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <h3 className="font-heading text-xl text-gold-100">Parkplätze</h3>
                </div>
                <p className="text-midnight-300 font-light">
                  Kostenfreie Parkplätze direkt am Gebäude verfügbar.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
