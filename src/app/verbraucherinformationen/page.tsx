import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/lib/business";

export const metadata: Metadata = {
  title: "Verbraucherinformationen",
  description:
    "Verbraucherinformationen zum Widerrufsrecht bei termingebundenen Veranstaltungsleistungen gemäß § 312g BGB.",
  alternates: { canonical: "/verbraucherinformationen" },
  robots: { index: true, follow: true },
};

export default function VerbraucherinformationenPage() {
  return (
    <LegalPage
      title="Verbraucherinformationen"
      intro="Wichtige Hinweise zum Widerrufsrecht bei termingebundenen Veranstaltungs- und Freizeitleistungen."
      lastUpdated="15. Juni 2026"
    >
      <h2>Kein Widerrufsrecht bei termingebundenen Leistungen</h2>
      <p>
        Gemäß <strong>§ 312g Abs. 2 Nr. 9 BGB</strong> besteht{" "}
        <strong>kein Widerrufsrecht</strong> bei Verträgen über Dienstleistungen
        im Zusammenhang mit Freizeitbetätigungen, wenn der Vertrag für die
        Erbringung einen spezifischen Termin oder Zeitraum vorsieht.
      </p>

      <h2>Betroffene Leistungen</h2>
      <p>Dies betrifft insbesondere:</p>
      <ul>
        <li>Hochzeiten</li>
        <li>Geburtstage</li>
        <li>Firmenveranstaltungen</li>
        <li>Konferenzen</li>
        <li>Tagungen</li>
        <li>Galas</li>
        <li>Catering</li>
        <li>Eventbuchungen</li>
        <li>Saalreservierungen</li>
      </ul>
      <p>
        Bei der Buchung einer solchen termingebundenen Leistung verzichten Sie
        somit von Gesetzes wegen auf ein Widerrufsrecht. Für die Stornierung
        gelten stattdessen die Regelungen unserer{" "}
        <a href="/agb">Allgemeinen Geschäftsbedingungen</a> (§ 7 Stornierung).
      </p>

      <h2>Ihr Kontakt</h2>
      <p>
        Bei Fragen zu Ihrer Buchung erreichen Sie uns unter{" "}
        {legal.phone} oder{" "}
        <a href={`mailto:${legal.email}`}>{legal.email}</a>.
      </p>
    </LegalPage>
  );
}
