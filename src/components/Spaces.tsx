"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import ScrollReveal from "./ScrollReveal";

interface Space {
  title: string;
  description: string;
  capacity: string;
  image?: string;
  cldImage?: string;
  video?: string;
  poster?: string;
}

const spaces: Space[] = [
  {
    title: "Grand Ballroom",
    description: "250 Gäste, Panorama-Rheinblick, modulare Bühne",
    capacity: "bis 250",
    video:
      "https://res.cloudinary.com/djrfxgvny/video/upload/q_auto/f_auto/v1781379151/kling_20260613_Image_to_Video_the_camera_1354_0_eiqypi.mp4",
    poster:
      "https://res.cloudinary.com/djrfxgvny/video/upload/so_0,q_auto,f_jpg/v1781379151/kling_20260613_Image_to_Video_the_camera_1354_0_eiqypi.jpg",
  },
  {
    title: "Rheinterrasse",
    description: "Outdoor-Events mit direktem Blick auf den Rhein",
    capacity: "bis 120",
    video:
      "https://res.cloudinary.com/djrfxgvny/video/upload/q_auto/f_auto/v1781300151/kling_20260613_Image_to_Video_the_camera_1367_0_onmku6.mp4",
    poster:
      "https://res.cloudinary.com/djrfxgvny/video/upload/so_0,q_auto,f_jpg/v1781300151/kling_20260613_Image_to_Video_the_camera_1367_0_onmku6.jpg",
  },
  {
    title: "Private Dining",
    description: "Exklusive Räume für intime Abendessen und Meetings",
    capacity: "bis 30",
    video:
      "https://res.cloudinary.com/djrfxgvny/video/upload/q_auto/f_auto/v1781300147/kling_20260613_Image_to_Video_Luxury_Mil_1308_0_i5d3ih.mp4",
    poster:
      "https://res.cloudinary.com/djrfxgvny/video/upload/so_0,q_auto,f_jpg/v1781300147/kling_20260613_Image_to_Video_Luxury_Mil_1308_0_i5d3ih.jpg",
  },
];

export default function Spaces() {
  return (
    <section id="raeume" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Unsere Räume
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Raum für jeden Anlass
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Vom intimen Dinner bis zur großen Gala — jeder Raum erzählt seine
            eigene Geschichte.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {spaces.map((space, i) => (
            <ScrollReveal key={space.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl overflow-hidden glass"
              >
                <div className="relative h-64 overflow-hidden">
                  {space.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={space.poster}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    >
                      <source src={space.video} type="video/mp4" />
                    </video>
                  ) : space.cldImage ? (
                    <CldImage
                      src={space.cldImage}
                      alt={space.title}
                      fill
                      crop="fill"
                      gravity="auto"
                      format="auto"
                      quality="auto"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <Image
                      src={space.image!}
                      alt={space.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 text-xs font-semibold tracking-wider uppercase text-gold-300 bg-midnight-950/60 backdrop-blur-sm px-3 py-1 rounded-full border border-gold-400/20">
                    {space.capacity}
                  </span>
                </div>

                <div className="p-6 lg:p-8">
                  <h3 className="font-heading text-2xl text-gold-100 mb-2">
                    {space.title}
                  </h3>
                  <p className="text-midnight-300 font-light">
                    {space.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
