"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import ScrollReveal from "./ScrollReveal";

// Replace this URL with your own Calendly link once your account is set up:
// e.g. https://calendly.com/millennium-place/besichtigung
const CALENDLY_URL =
  "https://calendly.com/mosaidhashemi/vorort-termin?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0d1114&text_color=f4f6f7&primary_color=c9a84c";

export default function CalendlySection() {
  const widgetRef = useRef<HTMLDivElement>(null);

  // Re-init widget if Calendly script was already loaded (e.g. hot reload)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { Calendly?: { initInlineWidget: (opts: object) => void } }).Calendly &&
      widgetRef.current
    ) {
      (window as unknown as { Calendly: { initInlineWidget: (opts: object) => void } }).Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: widgetRef.current,
      });
    }
  }, []);

  return (
    <section id="termin" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-midnight-950" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Direkte Buchung
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Besichtigung vereinbaren
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Wählen Sie direkt einen Termin für Ihre persönliche Führung durch
            Millennium Place. Kostenlos und unverbindlich.
          </p>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal delay={0.1} className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { icon: "✓", text: "Kostenlos & unverbindlich" },
            { icon: "✓", text: "Antwort in 24h" },
            { icon: "✓", text: "Persönliche Beratung" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-sm text-midnight-300 font-light"
            >
              <span className="text-gold-400 font-semibold">{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </ScrollReveal>

        {/* Calendly inline widget */}
        <ScrollReveal delay={0.15}>
          <div className="rounded-2xl overflow-hidden glass">
            <div
              ref={widgetRef}
              className="calendly-inline-widget w-full"
              data-url={CALENDLY_URL}
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Calendly widget script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
