"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { business, reviews as testimonials } from "@/lib/business";

const GOOGLE_REVIEWS_URL = business.googleReviewsUrl;

const stats = [
  { value: "250+", label: "Gästekapazität" },
  { value: "4,7★", label: "Google-Bewertung" },
  { value: "2026", label: "Grand Opening" },
  { value: "∞", label: "Rheinblick" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={i < count ? "w-4 h-4 text-gold-400" : "w-4 h-4 text-midnight-700"}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

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
            Bewertungen
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-gold-100">
            Was unsere Gäste sagen
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 0.12}>
              <motion.blockquote
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-2xl glass flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <span className="text-gold-400 font-heading text-lg">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-gold-300 font-medium">{t.author}</p>
                    <p className="text-midnight-500 text-sm">{t.role}</p>
                  </div>
                </div>
                <Stars count={t.rating} />
                <p className="text-midnight-200 font-light leading-relaxed flex-1 italic mt-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </motion.blockquote>
            </ScrollReveal>
          ))}

          {/* Google-Gesamtbewertung */}
          <ScrollReveal delay={0.24}>
            <motion.a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl glass flex flex-col items-center justify-center text-center h-full group"
            >
              <svg className="w-9 h-9 mb-4" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <p className="font-heading text-5xl text-gold-100 mb-1">4,7</p>
              <div className="mb-3">
                <Stars count={5} />
              </div>
              <p className="text-midnight-300 font-light text-sm mb-4">
                aus 20 Google-Bewertungen
              </p>
              <span className="text-gold-400 group-hover:text-gold-300 text-sm font-medium transition-colors inline-flex items-center gap-1">
                Alle Bewertungen ansehen
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </motion.a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
