"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const plans = [
  {
    name: "Intimate",
    subtitle: "Private Dining & Meetings",
    price: "ab 2.500",
    unit: "€",
    features: [
      "Bis zu 30 Gäste",
      "Private Dining Room",
      "3-Gänge-Menü inklusive",
      "Persönlicher Ansprechpartner",
      "Getränkepauschale optional",
    ],
    cta: "Anfragen",
    highlighted: false,
  },
  {
    name: "Signature",
    subtitle: "Hochzeiten & Galas",
    price: "ab 8.500",
    unit: "€",
    features: [
      "Bis zu 150 Gäste",
      "Grand Ballroom + Terrasse",
      "5-Gänge-Menü & Bar",
      "Dekor & Blumenarrangements",
      "DJ oder Live-Band",
      "Bridal Suite inklusive",
    ],
    cta: "Anfragen",
    highlighted: true,
  },
  {
    name: "Grand",
    subtitle: "Firmenfeiern & Konferenzen",
    price: "ab 15.000",
    unit: "€",
    features: [
      "Bis zu 250 Gäste",
      "Gesamte Location exklusiv",
      "Full-Service Catering",
      "Event-Planung & Koordination",
      "Technik & Entertainment",
      "Shuttle-Service optional",
    ],
    cta: "Anfragen",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="preise" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Pakete & Preise
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Ihr perfektes Paket
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Jedes Event ist einzigartig. Unsere Pakete sind der Startpunkt —
            individuelle Anpassungen jederzeit möglich.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`relative p-8 lg:p-10 rounded-2xl h-full flex flex-col ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-gold-500/10 to-midnight-900/60 border border-gold-400/30 shadow-xl shadow-gold-500/10"
                    : "glass"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-wider uppercase text-midnight-950 bg-gold-400 px-4 py-1 rounded-full">
                    Beliebteste Wahl
                  </span>
                )}

                <div className="mb-8">
                  <h3 className="font-heading text-2xl text-gold-100 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-midnight-400 text-sm">{plan.subtitle}</p>
                </div>

                <div className="mb-8">
                  <span className="font-heading text-4xl lg:text-5xl text-gold-100">
                    {plan.price}
                  </span>
                  <span className="text-midnight-400 text-lg ml-1">
                    {plan.unit}
                  </span>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-midnight-200 font-light"
                    >
                      <svg
                        className="w-5 h-5 text-gold-400 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#kontakt"
                  className={`block text-center py-3.5 rounded-full font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gold-500 hover:bg-gold-400 text-midnight-950 hover:shadow-lg hover:shadow-gold-500/25"
                      : "border border-gold-400/30 hover:border-gold-400/60 text-gold-200 hover:text-gold-100"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
