"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Spaces from "@/components/Spaces";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import Restaurant from "@/components/Restaurant";
import Gallery from "@/components/Gallery";
import CalendlySection from "@/components/Calendly";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Anfahrt from "@/components/Anfahrt";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Spaces />
      <SocialProof />
      <Pricing />
      <Restaurant />
      <Gallery />
      <CalendlySection />
      <FAQ />
      <Contact />
      <Anfahrt />
      <Footer />
    </main>
  );
}
