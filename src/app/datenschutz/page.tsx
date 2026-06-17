import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business, legal } from "@/lib/business";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten auf millenniumplace.de gemäß DSGVO.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Sie gemäß DSGVO über die Verarbeitung Ihrer Daten."
      lastUpdated="15. Juni 2026"
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        {legal.owner} ({business.name})
        <br />
        {legal.street}, {legal.postalCode} {legal.locality}
        <br />
        Telefon: {legal.phone}
        <br />
        E-Mail: <a href={`mailto:${legal.email}`}>{legal.email}</a>
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird bei einem externen Dienstleister gehostet:{" "}
        {legal.hostingProvider}. Der Anbieter verarbeitet in unserem Auftrag
        u. a. Zugriffsdaten (siehe Server-Logfiles). Grundlage ist unser
        berechtigtes Interesse an einer sicheren und effizienten Bereitstellung
        unseres Angebots (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Anbieter besteht
        ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO).
      </p>

      <h2>3. Server-Logfiles</h2>
      <p>
        Beim Aufruf der Website werden automatisch Informationen erfasst, die Ihr
        Browser übermittelt (Browsertyp/-version, Betriebssystem, Referrer-URL,
        Uhrzeit der Anfrage, gekürzte IP-Adresse). Diese Daten dienen der
        technischen Bereitstellung und Sicherheit und werden nicht mit anderen
        Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO.
      </p>

      <h2>4. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung.
        Eine verschlüsselte Verbindung erkennen Sie an „https://" in der
        Adresszeile Ihres Browsers.
      </p>

      <h2>5. Cookies &amp; Einwilligungsverwaltung</h2>
      <p>
        Wir verwenden technisch notwendige Cookies sowie — nur mit Ihrer
        Einwilligung — Cookies und Dienste für Statistik, Marketing und externe
        Medien. Beim ersten Besuch erhalten Sie einen Cookie-Banner, über den Sie
        einzelne Kategorien aktivieren oder ablehnen. Ihre Auswahl wird
        gespeichert und kann jederzeit über den Link „Cookie-Einstellungen" im
        Footer geändert oder widerrufen werden. Rechtsgrundlage für nicht
        notwendige Cookies ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO,
        § 25 Abs. 1 TDDDG); für notwendige Cookies § 25 Abs. 2 TDDDG.
      </p>

      <h2>6. Kontakt- und Anfrageformular</h2>
      <p>
        Wenn Sie uns über das Formular kontaktieren, werden die von Ihnen
        eingegebenen Daten (Name, E-Mail, Eventangaben, Nachricht) zur Bearbeitung
        Ihrer Anfrage verarbeitet. Der Versand erfolgt über den Dienst Web3Forms
        (Backstrike LLC) als Auftragsverarbeiter. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. lit. f DSGVO. Die
        Daten verbleiben bei uns, bis der Zweck der Speicherung entfällt oder Sie
        uns zur Löschung auffordern; gesetzliche Aufbewahrungsfristen bleiben
        unberührt.
      </p>

      <h2>7. Online-Terminbuchung (Calendly)</h2>
      <p>
        Zur Vereinbarung von Besichtigungsterminen setzen wir Calendly (Calendly
        LLC, USA) ein. Der Dienst wird erst nach Ihrer ausdrücklichen Einwilligung
        (Kategorie „Externe Medien") geladen. Dabei können Daten an Calendly
        übertragen werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Sie
        können den Termin alternativ telefonisch oder per E-Mail vereinbaren.
      </p>

      <h2>8. Google Maps</h2>
      <p>
        Zur Darstellung unseres Standorts nutzen wir Google Maps (Google Ireland
        Ltd.). Die Karte wird erst nach Ihrer Einwilligung (Kategorie „Externe
        Medien") geladen; vorher sehen Sie einen Platzhalter. Beim Laden werden
        Daten — ggf. auch in die USA — an Google übertragen. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. a DSGVO.
      </p>

      <h2>9. YouTube (erweiterter Datenschutzmodus)</h2>
      <p>
        Wir binden Videos von YouTube (Google Ireland Ltd.) im erweiterten
        Datenschutzmodus (youtube-nocookie.com) ein. Die Einbindung erfolgt erst
        nach Ihrer Einwilligung (Kategorie „Externe Medien"). Beim Abspielen
        können Daten an Google übertragen werden. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. a DSGVO.
      </p>

      <h2>10. Bild-Auslieferung (Cloudinary)</h2>
      <p>
        Bilder und Videos werden über den Dienst Cloudinary als
        Auftragsverarbeiter ausgeliefert und optimiert. Dabei wird Ihre
        IP-Adresse technisch verarbeitet, um die Inhalte bereitzustellen.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2>11. Schriftarten</h2>
      <p>
        Schriftarten werden lokal von unserem Server ausgeliefert. Es erfolgt
        keine Verbindung zu Servern von Drittanbietern (z. B. Google Fonts).
      </p>

      <h2>12. Ihre Rechte als betroffene Person</h2>
      <p>Ihnen stehen jederzeit folgende Rechte zu:</p>
      <ul>
        <li>Auskunft über Ihre verarbeiteten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO) und Einschränkung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>
          Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7
          Abs. 3 DSGVO)
        </li>
        <li>
          Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO), z. B. dem
          Hessischen Beauftragten für Datenschutz und Informationsfreiheit
        </li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an{" "}
        <a href={`mailto:${legal.email}`}>{legal.email}</a>.
      </p>

      <h2>13. Aktualität</h2>
      <p>
        Diese Datenschutzerklärung wird angepasst, sobald sich die
        Datenverarbeitung oder die Rechtslage ändert.
      </p>
    </LegalPage>
  );
}
