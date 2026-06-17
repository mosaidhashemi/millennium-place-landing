"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CldImage } from "next-cloudinary";
import ScrollReveal from "./ScrollReveal";
import type { EventContent, EventFaq } from "@/lib/events";

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
      {children}
    </p>
  );
}

function FaqRow({ faq, index }: { faq: EventFaq; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <ScrollReveal delay={index * 0.06}>
      <div className={`border-b border-midnight-800/50 ${open ? "border-gold-400/20" : ""}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left group"
          aria-expanded={open}
        >
          <span className="text-lg text-gold-100 font-medium group-hover:text-gold-300 transition-colors pr-4">
            {faq.question}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gold-400 text-2xl shrink-0 leading-none"
          >
            +
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-midnight-300 font-light leading-relaxed max-w-3xl">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export default function EventLanding({ event }: { event: EventContent }) {
  return (
    <main className="bg-midnight-950 text-gold-100">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <CldImage
            src={event.heroImage}
            alt={event.heroHeadline}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/70 to-midnight-950/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-20 pt-32">
          <nav className="mb-6 text-sm text-midnight-300" aria-label="Breadcrumb">
            <a href="/" className="hover:text-gold-300 transition-colors">
              Start
            </a>
            <span className="mx-2 text-gold-400/60">/</span>
            <span className="text-gold-200">{event.title}</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionEyebrow>{event.eyebrow}</SectionEyebrow>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-gold-100 max-w-4xl leading-[1.05] text-balance">
              {event.heroHeadline}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-midnight-200 font-light max-w-2xl">
              {event.heroSubline}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/#kontakt"
                className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25"
              >
                Event anfragen
              </a>
              <a
                href="/#galerie"
                className="px-8 py-3.5 border border-gold-400/40 hover:border-gold-300 text-gold-100 font-medium rounded-full transition-colors duration-300"
              >
                Galerie ansehen
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Intro (Kurzantwort) ──────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-gold-100 leading-snug text-balance">
              {event.intro}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Zielgruppe ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl text-gold-100 mb-6">
              {event.audience.title}
            </h2>
            <p className="text-midnight-300 text-lg font-light leading-relaxed">
              {event.audience.text}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Vorteile ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center mb-14">
            <SectionEyebrow>Ihre Vorteile</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              Warum Millennium Place
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {event.benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-8 h-full">
                  <div className="h-10 w-10 rounded-full border border-gold-400/40 flex items-center justify-center mb-5">
                    <span className="font-heading text-gold-400">{i + 1}</span>
                  </div>
                  <h3 className="font-heading text-xl text-gold-100 mb-3">{b.title}</h3>
                  <p className="text-midnight-300 font-light leading-relaxed">{b.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ablauf ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <ScrollReveal className="text-center mb-14">
            <SectionEyebrow>Ablauf</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              In vier Schritten zu Ihrem Event
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {event.process.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 0.08}>
                <div className="text-center">
                  <p className="font-heading text-5xl gold-gradient mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-heading text-xl text-gold-100 mb-2">{p.step}</h3>
                  <p className="text-midnight-300 font-light text-sm leading-relaxed">{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ausstattung ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="text-center mb-14">
            <SectionEyebrow>Ausstattung</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              Alles, was Ihr Event braucht
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
            {event.equipment.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.04}>
                <div className="flex items-start gap-3 py-2 border-b border-midnight-800/40">
                  <svg
                    className="w-5 h-5 text-gold-400 mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-midnight-200 font-light">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impressionen (Galerie) ───────────────────────────── */}
      {event.gallery.length > 0 && (
        <section className="py-16 md:py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <ScrollReveal className="text-center mb-14">
              <SectionEyebrow>Impressionen</SectionEyebrow>
              <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
                Einblicke in Millennium Place
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {event.gallery.map((img, i) => (
                <ScrollReveal key={img.publicId} delay={(i % 3) * 0.08}>
                  <div
                    className={`relative overflow-hidden rounded-2xl glass group ${
                      i === 0 ? "col-span-2 lg:col-span-2 aspect-[16/10]" : "aspect-square"
                    }`}
                  >
                    <CldImage
                      src={img.publicId}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="text-center mt-10">
              <a
                href="/#galerie"
                className="text-sm text-gold-300 hover:text-gold-200 transition-colors tracking-wide uppercase"
              >
                Gesamte Galerie ansehen →
              </a>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Pakete ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <ScrollReveal className="text-center mb-14">
            <SectionEyebrow>Beispielpakete</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              Pakete für jeden Anlass
            </h2>
            <p className="text-midnight-400 mt-4 font-light max-w-2xl mx-auto">
              Alle Pakete sind individuell anpassbar. Gerne erstellen wir Ihnen ein
              maßgeschneidertes Angebot.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {event.packages.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.1}>
                <div
                  className={`rounded-2xl p-8 h-full flex flex-col ${
                    p.featured
                      ? "bg-gold-500/10 border border-gold-400/40"
                      : "glass"
                  }`}
                >
                  {p.featured && (
                    <span className="self-start mb-4 text-xs font-semibold tracking-wider uppercase text-midnight-950 bg-gold-400 rounded-full px-3 py-1">
                      Beliebt
                    </span>
                  )}
                  <h3 className="font-heading text-2xl text-gold-100">{p.name}</h3>
                  <p className="text-gold-300 font-heading text-xl mt-1">{p.price}</p>
                  <p className="text-midnight-400 font-light text-sm mt-3 mb-6">
                    {p.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-midnight-200 font-light text-sm">
                        <span className="text-gold-400 mt-0.5">✓</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/#kontakt"
                    className={`mt-auto text-center py-3 rounded-full font-semibold transition-all duration-300 ${
                      p.featured
                        ? "bg-gold-500 hover:bg-gold-400 text-midnight-950"
                        : "border border-gold-400/40 hover:border-gold-300 text-gold-100"
                    }`}
                  >
                    Anfragen
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <SectionEyebrow>Häufige Fragen</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              Fragen & Antworten
            </h2>
          </ScrollReveal>
          <div>
            {event.faqs.map((faq, i) => (
              <FaqRow key={faq.question} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + interne Links ──────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100 mb-6">
              Lassen Sie uns Ihr Event planen
            </h2>
            <p className="text-midnight-300 font-light text-lg max-w-2xl mx-auto mb-10">
              Senden Sie uns unverbindlich Ihre Anfrage — wir melden uns persönlich
              und gestalten gemeinsam Ihren besonderen Tag am Rhein.
            </p>
            <a
              href="/#kontakt"
              className="inline-block px-10 py-4 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25"
            >
              Jetzt Event anfragen
            </a>
          </ScrollReveal>

          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            {event.related.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-midnight-400 hover:text-gold-300 transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
