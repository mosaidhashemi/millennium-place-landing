"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/consent";

/**
 * Footer-Link „Cookie-Einstellungen" — öffnet den Consent-Dialog über ein
 * Window-Event, damit der (server-gerenderte) Footer entkoppelt bleibt.
 */
export default function CookieSettingsLink({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      Cookie-Einstellungen
    </button>
  );
}
