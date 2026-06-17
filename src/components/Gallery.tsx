"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface GalerieBild {
  publicId: string;
  alt: string;
  kategorie: string;
}

const bilder: GalerieBild[] = [
  // ── Saal ──
  { publicId: "Saal_Millennium_mxbpw9", alt: "Festsaal mit goldener Bühne", kategorie: "Saal" },
  { publicId: "Multi_Foto_rb4npu", alt: "Millennium Place Eingangsbereich", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.15_1_gc0sek", alt: "Saal mit goldenem Rahmen", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.17_hzymzl", alt: "Eleganter Innenbereich", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.16_indpqb", alt: "Millennium Place Logo-Wand", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.22_1_ppemou", alt: "Foyer mit Dekor", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_3_vctx2k", alt: "Heller Festsaal", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.23_1_dk9nir", alt: "Festliche Bestuhlung", kategorie: "Saal" },

  // ── Restaurant ──
  { publicId: "Elegante_Restaurantatmosphäre_mit_luxuriösem_Design_i1qhta", alt: "Elegantes Restaurant", kategorie: "Restaurant" },
  { publicId: "Buffet_Millenium_1_rkfrjx", alt: "Exklusives Buffet", kategorie: "Restaurant" },
  { publicId: "Menu_Dinner_Fish_plate_fytvtf", alt: "Dinner mit Fischgericht", kategorie: "Restaurant" },
  { publicId: "steak_serviert_2026_yytk3m", alt: "Premium Steak", kategorie: "Restaurant" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.32_1_p07cio", alt: "Serviertes Steak", kategorie: "Restaurant" },
  { publicId: "buffet_2026_wupazw", alt: "Buffet Auswahl", kategorie: "Restaurant" },

  // ── Events ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_2_zqz0lo", alt: "Karnevalsfeier", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_3_zijfe0", alt: "Bühnenbeleuchtung", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.33_1_b08gcv", alt: "Abendveranstaltung", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.33_rg01gc", alt: "Bühnenshow", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_1_nq68gp", alt: "Farbige Bühne", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_br4hrq", alt: "Event mit rotem Licht", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.22_zhrqit", alt: "Festliche Veranstaltung", kategorie: "Events" },

  // ── Dekoration ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.22_2_ntwkte", alt: "Tischdekoration", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.28_lcmu9h", alt: "Festtafel mit Rosen", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_1_c12yi6", alt: "Blumengedeck", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_2_lavrks", alt: "Gedeckte Festtafel", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_nbrnxv", alt: "Weiße Dekoration", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.32_fvgqmx", alt: "Tischordnung", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.34_lrmexr", alt: "Blumenarrangement", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_1_a6dsdu", alt: "Hochzeitsdekoration", kategorie: "Dekoration" },

  // ── Außen ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.15_2_csljfh", alt: "Außenansicht", kategorie: "Außen" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.15_wty99y", alt: "Historisches Gebäude", kategorie: "Außen" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.16_1_kzd4km", alt: "Gebäude bei Nacht", kategorie: "Außen" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.34_1_mub4b1", alt: "Beleuchtetes Gebäude", kategorie: "Außen" },

  // ── Kegelbahn ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_4_fouaad", alt: "Bowling Wandkunst", kategorie: "Kegelbahn" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_5_z58ry5", alt: "Kegelbahn Wandmalerei", kategorie: "Kegelbahn" },

  // ── Konferenz ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.17_3_z6k3mg", alt: "Konferenz & Meeting", kategorie: "Konferenz" },
  { publicId: "konferenz_2026_sitzung_wl8p1w", alt: "Konferenzsaal", kategorie: "Konferenz" },
  { publicId: "konferenz_2026_xwg1bq", alt: "Tagungsraum", kategorie: "Konferenz" },
];

const kategorien = ["Alle", ...Array.from(new Set(bilder.map((b) => b.kategorie)))];
const CARD_WIDTH = 420;
const GAP = 24;

export default function Gallery() {
  const [aktiv, setAktiv] = useState("Alle");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const gefiltert =
    aktiv === "Alle" ? bilder : bilder.filter((b) => b.kategorie === aktiv);

  const maxIndex = Math.max(0, gefiltert.length - 1);

  useEffect(() => {
    setSliderIndex(0);
  }, [aktiv]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold && sliderIndex < maxIndex) {
      setSliderIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (info.offset.x > threshold && sliderIndex > 0) {
      setSliderIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const prev = () => setSliderIndex((i) => Math.max(0, i - 1));
  const next = () => setSliderIndex((i) => Math.min(maxIndex, i + 1));

  // Lightbox
  const currentLightboxIndex = lightbox
    ? gefiltert.findIndex((b) => b.publicId === lightbox)
    : -1;

  const navigateLightbox = useCallback(
    (dir: -1 | 1) => {
      if (currentLightboxIndex < 0) return;
      const n = currentLightboxIndex + dir;
      if (n >= 0 && n < gefiltert.length) setLightbox(gefiltert[n].publicId);
    },
    [currentLightboxIndex, gefiltert]
  );

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, navigateLightbox]);

  return (
    <section id="galerie" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Galerie
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Impressionen
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Einblicke in Millennium Place — Ihr exklusiver Veranstaltungsort im
            Rheingau.
          </p>
        </ScrollReveal>

        {/* Filter-Tabs */}
        <ScrollReveal delay={0.1} className="flex flex-wrap justify-center gap-3 mb-12">
          {kategorien.map((k) => (
            <button
              key={k}
              onClick={() => setAktiv(k)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wider uppercase border transition-all duration-300 ${
                aktiv === k
                  ? "bg-gold-500 border-gold-500 text-midnight-950"
                  : "border-midnight-700/50 text-midnight-300 hover:border-gold-400/50 hover:text-gold-300"
              }`}
            >
              {k}
            </button>
          ))}
        </ScrollReveal>
      </div>

      {/* Slider */}
      <div className="relative z-10">
        {/* Navigation Arrows */}
        {sliderIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 transition-all"
            aria-label="Vorheriges Bild"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {sliderIndex < maxIndex && (
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 transition-all"
            aria-label="Nächstes Bild"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Slider Track */}
        <div ref={constraintsRef} className="overflow-hidden px-6 md:px-16">
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            animate={{ x: -(sliderIndex * (CARD_WIDTH + GAP)) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: -(maxIndex * (CARD_WIDTH + GAP)), right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            {gefiltert.map((bild) => (
              <motion.div
                key={bild.publicId}
                className="group relative rounded-2xl overflow-hidden glass cursor-pointer shrink-0"
                style={{ width: CARD_WIDTH }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(bild.publicId)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <CldImage
                    src={bild.publicId}
                    alt={bild.alt}
                    width={800}
                    height={600}
                    crop="fill"
                    gravity="auto"
                    format="auto"
                    quality="auto"
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    sizes="420px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-gold-400 text-xs font-medium tracking-wider uppercase block mb-1">
                      {bild.kategorie}
                    </span>
                    <span className="text-gold-100 font-heading text-lg">
                      {bild.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1.5 mt-8 px-6">
          {gefiltert.length <= 20 ? (
            gefiltert.map((_, i) => (
              <button
                key={i}
                onClick={() => setSliderIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === sliderIndex
                    ? "w-8 bg-gold-400"
                    : "w-1.5 bg-midnight-700 hover:bg-midnight-500"
                }`}
                aria-label={`Bild ${i + 1}`}
              />
            ))
          ) : (
            <span className="text-midnight-500 text-sm">
              {sliderIndex + 1} / {gefiltert.length}
            </span>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-midnight-950/95 backdrop-blur-sm flex items-center justify-center cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-midnight-400 hover:text-gold-100 text-3xl font-light transition-colors z-10"
              aria-label="Schließen"
            >
              ✕
            </button>

            {currentLightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-midnight-400 hover:text-gold-100 text-5xl transition-colors z-10"
                aria-label="Vorheriges Bild"
              >
                ‹
              </button>
            )}

            {currentLightboxIndex < gefiltert.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-midnight-400 hover:text-gold-100 text-5xl transition-colors z-10"
                aria-label="Nächstes Bild"
              >
                ›
              </button>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="cursor-default"
            >
              <CldImage
                src={lightbox}
                alt="Vollbild"
                width={1600}
                height={1200}
                crop="fit"
                format="auto"
                quality="auto"
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-midnight-500 text-sm font-light">
              {currentLightboxIndex + 1} / {gefiltert.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
