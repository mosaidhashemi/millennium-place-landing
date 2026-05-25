"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "250+", label: "Gästekapazität" },
  { value: "5★", label: "Premium-Standard" },
  { value: "2026", label: "Grand Opening" },
  { value: "∞", label: "Rheinblick" },
];

const testimonials = [
  {
    quote:
      "Die Kombination aus erstklassiger Location und Rheinblick macht Millennium Place einzigartig im gesamten Rheingau.",
    author: "Weinbau Vereinigung Rheingau",
    role: "Partner",
  },
  {
    quote:
      "Endlich eine Location, die Kulinarik, Events und Atmosphäre auf diesem Niveau zusammenbringt.",
    author: "Rheingau Tourismus",
    role: "Kooperation",
  },
  {
    quote:
      "Wir freuen uns auf eine Location, die den Rheingau international auf die Karte bringt.",
    author: "Stadt Lorch am Rhein",
    role: "Gemeinde",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-midnight-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 md:mb-28">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-heading text-4xl md:text-5xl lg:text-6xl gold-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-midnight-400 text-sm tracking-wider uppercase font-medium">
                  {stat.label}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mb-12">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Stimmen & Partner
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-gold-100">
            Was unsere Partner sagen
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 0.12}>
              <motion.blockquote
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-2xl glass h-full flex flex-col"
              >
                <svg
                  className="w-8 h-8 text-gold-500/30 mb-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-midnight-200 font-light leading-relaxed mb-6 flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer>
                  <p className="text-gold-300 font-medium">{t.author}</p>
                  <p className="text-midnight-500 text-sm">{t.role}</p>
                </footer>
              </motion.blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
