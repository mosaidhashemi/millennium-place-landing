import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business, legal } from "@/lib/business";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description:
    "Allgemeine Geschäftsbedingungen von Millennium Place für Veranstaltungen, Reservierungen und Catering.",
  alternates: { canonical: "/agb" },
  robots: { index: true, follow: true },
};

export default function AgbPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen"
      intro="AGB für Veranstaltungen, Saalreservierungen, Catering und gastronomische Leistungen von Millennium Place."
      lastUpdated="15. Juni 2026"
    >
      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge
        über die Durchführung von Veranstaltungen, die Überlassung von Räumen,
        Catering- sowie gastronomische Leistungen von {business.name}. Abweichende
        Bedingungen des Kunden werden nicht anerkannt, es sei denn, ihrer Geltung
        wird ausdrücklich in Textform zugestimmt.
      </p>

      <h2>§ 2 Vertragspartner</h2>
      <p>
        Vertragspartner des Kunden ist:
        <br />
        {legal.owner} ({business.name}), {legal.legalForm}
        <br />
        {legal.street}, {legal.postalCode} {legal.locality}
        <br />
        Telefon: {legal.phone} · E-Mail:{" "}
        <a href={`mailto:${legal.email}`}>{legal.email}</a>
        <br />
        (nachfolgend „Millennium Place").
      </p>

      <h2>§ 3 Leistungen von Millennium Place</h2>
      <p>
        Millennium Place erbringt Leistungen in den Bereichen Eventlocation,
        Restaurant/Steakhouse und Catering. Art und Umfang der Leistungen ergeben
        sich aus dem jeweiligen Angebot bzw. der Buchungsbestätigung und etwaigen
        Anlagen.
      </p>

      <h2>§ 4 Anfrage und Vertragsschluss</h2>
      <p>
        Angebote von Millennium Place sind freibleibend. Anfragen des Kunden
        stellen noch keine verbindliche Buchung dar. Der Vertrag kommt erst durch
        die Bestätigung der Buchung durch Millennium Place (auch per E-Mail)
        zustande.
      </p>

      <h2>§ 5 Veranstaltungsbuchungen</h2>
      <p>
        Für Veranstaltungen (z. B. Hochzeiten, Firmenfeiern, Galas, Konferenzen,
        private Feiern) gelten der vereinbarte Termin, die Räumlichkeiten und der
        bestätigte Leistungsumfang als verbindlich. Nachträgliche Änderungen
        bedürfen der Abstimmung und Bestätigung in Textform.
      </p>

      <h2>§ 6 Reservierungen Restaurant</h2>
      <p>
        Tischreservierungen im Restaurant werden mit der Bestätigung durch
        Millennium Place verbindlich. Bei Nichterscheinen ohne rechtzeitige
        Absage kann für reservierte Tische ein angemessenes Ausfallentgelt
        berechnet werden.
      </p>

      <h2>§ 7 Catering-Leistungen</h2>
      <p>
        Catering-Leistungen richten sich nach dem vereinbarten Menü, der
        Personenzahl und dem Leistungsort. Speisen und Getränke werden
        grundsätzlich ausschließlich durch Millennium Place gestellt; Abweichungen
        bedürfen der vorherigen Zustimmung.
      </p>

      <h2>§ 8 Preise und Zahlungsbedingungen</h2>
      <p>
        Es gelten die vereinbarten Preise inkl. der jeweils gültigen
        gesetzlichen Umsatzsteuer. Rechnungen sind, sofern nicht anders
        vereinbart, ohne Abzug zu den in der Rechnung genannten Fristen zu
        zahlen.
      </p>

      <h2>§ 9 Anzahlungen</h2>
      <p>
        Mit verbindlicher Buchung einer Veranstaltung wird eine Anzahlung in Höhe
        von <strong>30 %</strong> des voraussichtlichen Gesamtpreises fällig. Die
        Anzahlung wird auf den Endbetrag angerechnet.
      </p>

      <h2>§ 10 Rücktritt und Stornierung</h2>
      <p>
        Tritt der Kunde von einer verbindlichen Buchung zurück, werden folgende
        Stornogebühren – bezogen auf den vereinbarten Gesamtpreis – fällig:
      </p>
      <table>
        <thead>
          <tr>
            <th>Zeitpunkt der Stornierung</th>
            <th>Stornogebühr</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bis 90 Tage vor der Veranstaltung</td>
            <td>50 %</td>
          </tr>
          <tr>
            <td>89 bis 30 Tage vor der Veranstaltung</td>
            <td>75 %</td>
          </tr>
          <tr>
            <td>weniger als 30 Tage vor der Veranstaltung</td>
            <td>100 %</td>
          </tr>
        </tbody>
      </table>
      <p>
        Bereits geleistete Anzahlungen werden angerechnet. Dem Kunden bleibt
        ausdrücklich der Nachweis vorbehalten, dass Millennium Place kein oder ein
        wesentlich geringerer Schaden entstanden ist. Millennium Place bleibt
        vorbehalten, einen höheren tatsächlichen Schaden nachzuweisen.
        Stornierungen bedürfen der Textform.
      </p>

      <h2>§ 11 Widerrufsrecht / Ausschluss des Widerrufsrechts</h2>
      <p>
        Bei Verträgen über Dienstleistungen im Zusammenhang mit
        Freizeitbetätigungen, die für die Erbringung einen spezifischen Termin
        oder Zeitraum vorsehen, besteht gemäß{" "}
        <strong>§ 312g Abs. 2 Nr. 9 BGB kein gesetzliches Widerrufsrecht</strong>.
        Dies betrifft insbesondere Veranstaltungs- und Cateringbuchungen mit
        festem Termin. Weitere Hinweise finden Sie in unseren{" "}
        <a href="/verbraucherinformationen">Verbraucherinformationen</a>.
      </p>

      <h2>§ 12 Änderungen der Teilnehmerzahl</h2>
      <p>
        Die endgültige Teilnehmerzahl ist spätestens zu dem in der
        Buchungsbestätigung genannten Zeitpunkt verbindlich mitzuteilen.
        Erhöhungen bedürfen der Zustimmung von Millennium Place; Reduzierungen
        nach der verbindlichen Mitteilung berechtigen nicht zur Minderung des
        vereinbarten Preises.
      </p>

      <h2>§ 13 Pflichten des Kunden</h2>
      <p>
        Der Kunde stellt die für die Planung erforderlichen Angaben rechtzeitig
        bereit, teilt relevante Allergien und Unverträglichkeiten vorab mit und
        sorgt dafür, dass seine Gäste die Hausordnung sowie die Bestimmungen des
        Jugendschutzgesetzes (insbesondere das Verbot der Abgabe von Alkohol an
        Minderjährige) einhalten.
      </p>

      <h2>§ 14 Haftung des Kunden</h2>
      <p>
        Der Kunde haftet für Schäden an Gebäude, Inventar und Ausstattung, die
        durch ihn, seine Gäste, Mitarbeiter oder beauftragte Dritte verursacht
        werden. Mitgebrachte Dekoration ist nach Abstimmung zulässig, muss
        brandschutzrechtliche Vorgaben einhalten und nach der Veranstaltung
        vollständig entfernt werden.
      </p>

      <h2>§ 15 Haftung von Millennium Place</h2>
      <p>
        Millennium Place haftet für Vorsatz und grobe Fahrlässigkeit nach den
        gesetzlichen Bestimmungen. Bei leichter Fahrlässigkeit wird nur bei
        Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht) und
        begrenzt auf den vertragstypischen, vorhersehbaren Schaden gehaftet. Die
        Haftung für Schäden aus der Verletzung des Lebens, des Körpers oder der
        Gesundheit bleibt unberührt.
      </p>

      <h2>§ 16 Höhere Gewalt</h2>
      <p>
        Bei Ereignissen höherer Gewalt (z. B. behördliche Anordnungen,
        Naturkatastrophen) sind beide Parteien von der Leistungspflicht befreit,
        soweit die Erfüllung unmöglich wird. Bereits erbrachte Leistungen sind zu
        vergüten.
      </p>

      <h2>§ 17 Bild- und Videoaufnahmen</h2>
      <p>
        Im Rahmen von Veranstaltungen können durch Millennium Place oder
        beauftragte Dritte Bild- und Videoaufnahmen erstellt werden. Eine
        Veröffentlichung zu Werbezwecken erfolgt nur mit Einwilligung der
        abgebildeten Personen. Der Kunde informiert seine Gäste über etwaige
        Aufnahmen; ein Widerspruch ist jederzeit möglich.
      </p>

      <h2>§ 18 Datenschutz</h2>
      <p>
        Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>

      <h2>§ 19 Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Millennium Place ist nicht verpflichtet und nicht bereit, an einem
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>

      <h2>§ 20 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne
        Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die
        Wirksamkeit der übrigen Bestimmungen unberührt. Änderungen und
        Ergänzungen bedürfen der Textform.
      </p>
    </LegalPage>
  );
}
