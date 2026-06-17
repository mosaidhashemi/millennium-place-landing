"use client";

import type { ConsentCategory } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

/**
 * Rendert externe Inhalte (Maps, YouTube, Calendly) erst nach Einwilligung.
 * Vorher erscheint ein gebrandeter Platzhalter mit Hinweis und Lade-Button.
 */
export default function ConsentGate({
  category,
  title,
  description,
  children,
  className = "",
}: {
  category: ConsentCategory;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { hasConsent, openSettings } = useConsent();

  if (hasConsent(category)) return <>{children}</>;

  return (
    <div
      className={`relative flex flex-col items-center justify-center text-center gap-4 p-8 glass rounded-2xl ${className}`}
    >
      <svg
        className="w-10 h-10 text-gold-400/70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
      <h3 className="font-heading text-xl text-gold-100">{title}</h3>
      <p className="text-midnight-300 font-light text-sm max-w-md">
        {description ??
          "Zum Schutz Ihrer Daten wird dieser Inhalt erst nach Ihrer Zustimmung geladen."}
      </p>
      <button
        onClick={openSettings}
        className="mt-1 px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-midnight-950 text-sm font-semibold rounded-full transition-colors"
      >
        Inhalt laden &amp; zustimmen
      </button>
      <a
        href="/datenschutz"
        className="text-xs text-midnight-400 hover:text-gold-300 underline transition-colors"
      >
        Mehr in der Datenschutzerklärung
      </a>
    </div>
  );
}
