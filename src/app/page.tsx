"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Spaces from "@/components/Spaces";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import CalendlySection from "@/components/Calendly";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
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
      <CalendlySection />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
