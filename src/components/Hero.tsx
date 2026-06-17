"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useConsent } from "./consent/ConsentProvider";

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const { hasConsent } = useConsent();
  const showVideo = hasConsent("externalMedia");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fallback image shown until video is ready */}
      <Image
        src="/images/interior-sunset.png"
        alt="Millennium Place — Interior mit Rheinblick bei Sonnenuntergang"
        fill
        priority
        className={`object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
        sizes="100vw"
        quality={85}
      />

      {/* YouTube-Hintergrundvideo — erst nach Einwilligung (Externe Medien),
          cookiefreie youtube-nocookie-Domain */}
      {showVideo && (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.youtube-nocookie.com/embed/YKa5tnA8G88?autoplay=1&mute=1&loop=1&playlist=YKa5tnA8G88&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=0&disablekb=1"
            allow="autoplay; encrypted-media"
            onLoad={() => setVideoReady(true)}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
            style={{
              border: "none",
              pointerEvents: "none",
              width: "177.78vh",
              height: "56.25vw",
              minWidth: "100vw",
              minHeight: "100vh",
            }}
            title="Millennium Place Hero Video"
          />
        </div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/65 via-midnight-950/40 to-midnight-950 z-10" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-gold-400 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6">
            Premium Event & Dining Destination
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold-100 leading-[1.1] mb-6"
        >
          Wo der Rhein
          <br />
          <span className="italic gold-gradient">Geschichte schreibt</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-midnight-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Exklusive Eventlocation und Steakhouse im Herzen des Rheingaus.
          Hochzeiten, Galas, Firmenfeiern — mit Blick auf den Rhein.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#termin"
            className="group px-8 py-4 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/30 text-base"
          >
            Termin buchen
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#erlebnis"
            className="px-8 py-4 border border-gold-400/30 hover:border-gold-400/60 text-gold-200 hover:text-gold-100 rounded-full transition-all duration-300 font-medium text-base"
          >
            Entdecken
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gold-400/40 rounded-full flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
