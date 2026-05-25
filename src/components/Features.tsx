"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    title: "Eventlocation",
    description:
      "Bis zu 250 Gäste in einzigartiger Atmosphäre. Hochzeiten, Galas, Firmenfeiern und Konferenzen — alles mit Rheinblick.",
    highlight: "Bis zu 250 Gäste",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    title: "Steakhouse & Küche",
    description:
      "Premium Dry-Aged Steaks, internationale Küche und erlesene Weine aus dem Rheingau. Kulinarik auf höchstem Niveau.",
    highlight: "Dry-Aged Premium",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    title: "Live Entertainment",
    description:
      "Von Jazz-Abenden bis DJ-Nights, Live-Bands und exklusive Shows. Entertainment das Ihren Abend unvergesslich macht.",
    highlight: "Live Musik & Shows",
  },
];

export default function Features() {
  return (
    <section id="erlebnis" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/50 to-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Das Erlebnis
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Drei Welten, ein Ort
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Millennium Place vereint erstklassige Events, exquisite Gastronomie
            und mitreißendes Entertainment unter einem Dach.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-8 lg:p-10 rounded-2xl glass hover:border-gold-400/30 transition-colors duration-500 h-full"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="text-gold-400 mb-6 group-hover:text-gold-300 transition-colors">
                  {feature.icon}
                </div>

                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full mb-4">
                  {feature.highlight}
                </span>

                <h3 className="font-heading text-2xl lg:text-3xl text-gold-100 mb-4">
                  {feature.title}
                </h3>

                <p className="text-midnight-300 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
