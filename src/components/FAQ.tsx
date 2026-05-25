"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    question: "Wann eröffnet Millennium Place?",
    answer:
      "Die offizielle Eröffnung ist für 2026 geplant. Sie können bereits jetzt Ihr Event vormerken lassen und von exklusiven Eröffnungskonditionen profitieren.",
  },
  {
    question: "Wie viele Gäste passen in die Location?",
    answer:
      "Der Grand Ballroom fasst bis zu 250 Gäste, die Rheinterrasse bis zu 120 und unsere Private Dining Rooms bis zu 30 Gäste. Für individuelle Arrangements kontaktieren Sie uns gerne.",
  },
  {
    question: "Bieten Sie Full-Service Event-Planung an?",
    answer:
      "Ja, von der ersten Idee bis zum letzten Tanz begleiten wir Sie. Unser erfahrenes Team kümmert sich um Dekoration, Catering, Entertainment, Technik und alle Details.",
  },
  {
    question: "Kann man das Steakhouse auch ohne Event besuchen?",
    answer:
      "Selbstverständlich! Unser Steakhouse steht allen Gästen offen. Wir empfehlen eine Reservierung, besonders an Wochenenden und für die begehrten Terrassenplätze mit Rheinblick.",
  },
  {
    question: "Gibt es Parkmöglichkeiten?",
    answer:
      "Direkt am Millennium Place stehen ausreichend kostenlose Parkplätze zur Verfügung. Für größere Events organisieren wir gerne einen Shuttle-Service von Bahnhöfen oder Hotels.",
  },
  {
    question: "Sind individuelle Menüs möglich?",
    answer:
      "Unser Küchenchef erstellt auf Wunsch ein komplett individuelles Menü für Ihr Event. Alle Allergien und Ernährungsvorlieben werden selbstverständlich berücksichtigt.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.06}>
      <motion.div
        className={`border-b border-midnight-800/50 ${
          open ? "border-gold-400/20" : ""
        }`}
      >
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
      </motion.div>
    </ScrollReveal>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Häufige Fragen
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-gold-100">
            Fragen & Antworten
          </h2>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
