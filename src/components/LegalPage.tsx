import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Gemeinsamer Rahmen für alle Rechtsseiten im Corporate Design
 * (Schwarz/Gold/Weiß). Enthält den Hinweis zur erforderlichen Anwaltsprüfung.
 */
export default function LegalPage({
  title,
  intro,
  lastUpdated,
  children,
}: {
  title: string;
  intro?: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-midnight-950 text-gold-100 min-h-screen">
        {/* Header */}
        <header className="relative pt-36 pb-12 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <nav className="mb-5 text-sm text-midnight-400" aria-label="Breadcrumb">
              <a href="/" className="hover:text-gold-300 transition-colors">
                Start
              </a>
              <span className="mx-2 text-gold-400/60">/</span>
              <span className="text-gold-200">{title}</span>
            </nav>
            <h1 className="font-heading text-4xl md:text-5xl text-gold-100">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 text-midnight-300 font-light text-lg">{intro}</p>
            )}
            <p className="mt-3 text-midnight-500 text-sm">Stand: {lastUpdated}</p>
          </div>
        </header>

        {/* Inhalt */}
        <div className="px-6 pb-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 rounded-xl border border-gold-400/20 bg-gold-500/5 p-5 text-sm text-midnight-300 font-light">
              <strong className="text-gold-200">Hinweis:</strong> Dieser Text ist
              ein sorgfältig erstellter Entwurf und ersetzt keine
              Rechtsberatung. Bitte vor dem offiziellen Livegang durch einen
              Rechtsanwalt bzw. Datenschutzbeauftragten prüfen lassen.
            </div>
            <div className="legal-prose">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
