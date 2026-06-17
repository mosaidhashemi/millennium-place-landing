"use client";

import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import ScrollReveal from "./ScrollReveal";
import { useConsent } from "./consent/ConsentProvider";

const highlights = [
  { icon: "🥩", title: "Dry-Aged Steaks", desc: "Premium-Cuts, 28 Tage gereift" },
  { icon: "🍷", title: "Rheingauer Weine", desc: "Erlesene Auswahl der Region" },
  { icon: "👨‍🍳", title: "Küchenchef-Menüs", desc: "Saisonale Kreationen auf höchstem Niveau" },
];

export default function Restaurant() {
  const { hasConsent } = useConsent();
  const showVideo = hasConsent("externalMedia");

  return (
    <section id="restaurant" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/20 to-midnight-950" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Gastronomie
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Kulinarik auf höchstem Niveau
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Unser Steakhouse verbindet internationale Spitzenküche mit den besten
            Weinen des Rheingaus.
          </p>
        </ScrollReveal>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {highlights.map((h, i) => (
            <ScrollReveal key={h.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl glass h-full"
              >
                <div className="w-16 h-16 rounded-xl glass flex items-center justify-center text-3xl shrink-0">
                  {h.icon}
                </div>
                <div>
                  <h3 className="font-heading text-xl text-gold-100 mb-2">
                    {h.title}
                  </h3>
                  <p className="text-midnight-300 font-light">{h.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* YouTube Hintergrundvideo — erst nach Einwilligung (Externe Medien);
          ohne Consent dient ein Cloudinary-Bild als Hintergrund */}
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 h-[55vh] md:h-[65vh] overflow-hidden mb-20">
        {showVideo ? (
          <iframe
            src="https://www.youtube-nocookie.com/embed/2bUnbZg4EDw?autoplay=1&mute=1&loop=1&playlist=2bUnbZg4EDw&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              border: "none",
              width: "max(100vw, calc(65vh * 16 / 9))",
              height: "max(65vh, calc(100vw * 9 / 16))",
            }}
            title="Millennium Place Restaurant Hintergrundvideo"
          />
        ) : (
          <CldImage
            src="Elegante_Restaurantatmosphäre_mit_luxuriösem_Design_i1qhta"
            alt="Elegante Restaurantatmosphäre bei Millennium Place"
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/70 via-midnight-950/40 to-midnight-950/70" />
        {/* Overlay-Inhalt */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <ScrollReveal className="text-center max-w-2xl">
            <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
              Erleben Sie es selbst
            </p>
            <h3 className="font-heading text-3xl md:text-5xl text-gold-100 mb-4">
              Genuss in Bewegung
            </h3>
            <p className="text-midnight-200 text-lg font-light">
              Ein Vorgeschmack auf die kulinarischen Erlebnisse bei Millennium Place.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Steak Video */}
        <ScrollReveal className="mb-20">
          <div className="relative rounded-2xl overflow-hidden glass aspect-video max-w-4xl mx-auto">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster={`https://res.cloudinary.com/djrfxgvny/video/upload/so_0/Built_up_Video_Restaurant_d04krj.jpg`}
            >
              <source
                src="https://res.cloudinary.com/djrfxgvny/video/upload/q_auto/Built_up_Video_Restaurant_d04krj.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </ScrollReveal>

        {/* Food Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {[
            { id: "steak_serviert_2026_yytk3m", alt: "Premium Steak" },
            { id: "Buffet_Millenium_1_rkfrjx", alt: "Exklusives Buffet" },
            { id: "Menu_Dinner_Fish_plate_g21svf", alt: "Fischgericht" },
            { id: "Elegante_Restaurantatmosphäre_mit_luxuriösem_Design_i1qhta", alt: "Restaurant Ambiente" },
          ].map((img, i) => (
            <ScrollReveal key={img.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden glass aspect-square"
              >
                <CldImage
                  src={img.id}
                  alt={img.alt}
                  width={400}
                  height={400}
                  crop="fill"
                  gravity="auto"
                  format="auto"
                  quality="auto"
                  loading="lazy"
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-gold-200 text-sm font-heading">
                  {img.alt}
                </span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
