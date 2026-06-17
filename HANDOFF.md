# Millennium Place — Projekt-Handoff

> Vollständiger Code + Kontext zum Weiterarbeiten in einem anderen Chat.
> Stand: 17. Juni 2026

## 1. Was ist das?

Premium-Website (Onepage + Unterseiten) für **Millennium Place** — exklusive
Eventlocation & Steakhouse in Lorch am Rhein (Rheingau), Eröffnung 2026.
Live unter **https://millenniumplace.de**.

## 2. Tech-Stack

- **Next.js 14.2** (App Router, TypeScript)
- **Tailwind CSS 3.4** + **framer-motion** (Animationen)
- **next-cloudinary** (Bilder/Videos, Cloud: `djrfxgvny`)
- Fonts lokal via `next/font` (Instrument Serif + Barlow)
- Kontaktformular: **Web3Forms** (Key in `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`)
- Terminbuchung: **Calendly** (consent-gated)
- Deployment: **Vercel** (Domain millenniumplace.de), Build: `npm run build`
- Env nötig: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djrfxgvny`,
  `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

## 3. Designsystem

- Farben: Schwarz/Midnight (`midnight-950 #0d1114`), Gold (`gold-400 #c9a84c`,
  `gold-100 #f5ebd4`), Creme. Definiert in `tailwind.config.ts`.
- Utilities in `globals.css`: `.glass`, `.gold-gradient`, `.legal-prose`.
- Headings: `font-heading` (Serif). Body: `font-body`.

## 4. Architektur / Besonderheiten

- **Single Source of Truth** `src/lib/business.ts`: Geschäftsdaten, FAQ, echte
  Google-Reviews (4,7★/20), `legal`-Objekt (Betreiberdaten fürs Impressum).
- **Schema.org** `src/lib/schema.ts`: `buildJsonLd()` (Graph für Startseite) +
  `buildEventJsonLd()` (pro Eventseite). Eingebunden in `layout.tsx` / Eventseite.
- **Datengetriebene Event-Landingpages** `src/lib/events.ts` → dynamische Route
  `app/events/[slug]/page.tsx` (SSG) + `components/EventLanding.tsx`.
  Neue Eventseite = neuer Eintrag in `events.ts`. Aktuell: hochzeiten,
  firmenveranstaltungen.
- **Eigenes Cookie-Consent** (DSGVO/TDDDG, KEIN WordPress-Plugin):
  `src/lib/consent.ts` + `components/consent/{ConsentProvider,ConsentGate,CookieSettingsLink}.tsx`.
  Kategorien: necessary/statistics/marketing/externalMedia. Maps/YouTube/Calendly
  laden erst nach Zustimmung.
- **Rechtsseiten**: `/impressum`, `/datenschutz`, `/agb`,
  `/verbraucherinformationen` über `components/LegalPage.tsx`.
  ⚠️ Entwürfe — Anwaltsprüfung vor Livegang nötig.
- **Security-Header** (HSTS etc.) in `next.config.mjs`.

## 5. Offene Punkte / TODO

- [ ] Rechtstexte anwaltlich prüfen lassen (Hinweisbox auf jeder Seite).
- [ ] Hosting in `legal.hostingProvider` ist Vercel — bei STRATO-Umzug anpassen.
- [ ] USt-ID im Impressum (Platzhalter) ergänzen.
- [ ] Weitere Eventseiten (Galas, Konferenzen, Geburtstage … → events.ts).
- [ ] Stadt-SEO-Seiten (Frankfurt, Wiesbaden …), Content-Hub/Blog.
- [ ] Mehrstufiges Lead-Formular, ggf. GA4/Meta Pixel (consent-gated).
- [ ] PageSpeed-Insights-Lauf nach Livegang.

## 6. Dateistruktur

```
.eslintrc.json
next.config.mjs
package.json
postcss.config.mjs
public/llms.txt
src/app/agb/page.tsx
src/app/datenschutz/page.tsx
src/app/events/[slug]/page.tsx
src/app/globals.css
src/app/impressum/page.tsx
src/app/layout.tsx
src/app/page.tsx
src/app/robots.ts
src/app/sitemap.ts
src/app/verbraucherinformationen/page.tsx
src/components/Anfahrt.tsx
src/components/Calendly.tsx
src/components/Contact.tsx
src/components/EventLanding.tsx
src/components/FAQ.tsx
src/components/Features.tsx
src/components/Footer.tsx
src/components/Gallery.tsx
src/components/Hero.tsx
src/components/LegalPage.tsx
src/components/Navbar.tsx
src/components/Pricing.tsx
src/components/Restaurant.tsx
src/components/ScrollReveal.tsx
src/components/SocialProof.tsx
src/components/Spaces.tsx
src/components/consent/ConsentGate.tsx
src/components/consent/ConsentProvider.tsx
src/components/consent/CookieSettingsLink.tsx
src/lib/business.ts
src/lib/consent.ts
src/lib/events.ts
src/lib/schema.ts
tailwind.config.ts
tsconfig.json
```

---

# 7. Quellcode (alle Dateien)


### `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "react/no-unescaped-entities": "off"
  }
}

```

### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */

// Sicherheits-Header (gelten für alle Routen). HSTS erzwingt HTTPS im Browser.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=(), browsing-topics=()",
  },
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

```

### `package.json`

```json
{
  "name": "landing-page",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^12.40.0",
    "next": "14.2.35",
    "next-cloudinary": "^6.17.5",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.35",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```

### `postcss.config.mjs`

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

### `public/llms.txt`

```text
# Millennium Place

> Exklusive Premium-Eventlocation und Steakhouse im Rheingau, in Lorch am Rhein (Hessen). Hochzeiten, Firmenfeiern, Galas, Konferenzen und Live Events für bis zu 250 Gäste — mit Blick auf den Rhein. Eröffnung 2026.

Millennium Place ist eine erstklassige Erlebnisdestination am Rhein, die Eventlocation und Fine-Dining-Steakhouse verbindet. Die Location richtet sich an Privatkunden, Unternehmen, Eventplaner sowie internationale und kulturell diverse Gäste, die einen luxuriösen, persönlichen Premium-Service suchen.

## Standort & Kontakt

- **Adresse:** Lorch am Rhein, 65391, Hessen, Deutschland (Rheingau)
- **Geo:** 50.0438, 7.8039
- **E-Mail:** info@millenniumplace.de
- **Website:** https://millenniumplace.de
- **Sprachen:** Deutsch, Englisch
- **Eröffnung:** 2026 (Vormerkungen mit Eröffnungskonditionen bereits möglich)
- **Google-Bewertung:** 4,7 ★ aus 20 Bewertungen

## Räumlichkeiten & Kapazität

- **Grand Ballroom:** bis zu 250 Gäste
- **Rheinterrasse:** bis zu 120 Gäste (mit Rheinblick)
- **Private Dining Rooms:** bis zu 30 Gäste
- Kostenlose Parkplätze direkt am Gebäude; Shuttle-Service auf Anfrage
- Barrierefreier Zugang

## Veranstaltungsarten

- Hochzeiten & freie Trauungen
- Firmenveranstaltungen & Konferenzen/Tagungen
- Weihnachtsfeiern
- Galas
- Geburtstage & private Feiern
- Kulturelle Events
- Live-Musik & Dinner Events

## Gastronomie

Steakhouse mit internationaler und Rheingauer Küche, Preisniveau €€€. Das Restaurant ist auch ohne Event für alle Gäste geöffnet (Reservierung empfohlen). Individuelle Menüs und Berücksichtigung von Allergien/Ernährungsvorlieben möglich.

## Service

Full-Service Event-Planung von der ersten Idee bis zum letzten Tanz: Dekoration, Catering, Entertainment, Technik und alle Details aus einer Hand.

## Anfahrt (Richtwerte)

- Frankfurt: ca. 1h 10min
- Wiesbaden: ca. 50 min
- Koblenz: ca. 45 min
- Mainz: ca. 55 min

## Anfragen

Event-Anfragen und Reservierungen über die Website (https://millenniumplace.de) oder per E-Mail an info@millenniumplace.de.

```

### `src/app/agb/page.tsx`

```tsx
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

```

### `src/app/datenschutz/page.tsx`

```tsx
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

```

### `src/app/events/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventLanding from "@/components/EventLanding";
import { eventSlugs, getEvent } from "@/lib/events";
import { buildEventJsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return eventSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const event = getEvent(params.slug);
  if (!event) return {};

  const path = `/events/${event.slug}`;
  return {
    title: event.metaTitle,
    description: event.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: event.metaTitle,
      description: event.metaDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: event.metaTitle,
      description: event.metaDescription,
    },
  };
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = getEvent(params.slug);
  if (!event) notFound();

  const jsonLd = buildEventJsonLd(event);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <EventLanding event={event} />
      <Footer />
    </>
  );
}

```

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #0d1114;
    --foreground: #f4f6f7;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    color: var(--foreground);
    background: var(--background);
  }

  ::selection {
    background-color: rgba(201, 168, 76, 0.3);
    color: #f5ebd4;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .gold-gradient {
    background: linear-gradient(135deg, #c9a84c 0%, #e8d5a3 50%, #c9a84c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass {
    background: rgba(26, 31, 36, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(201, 168, 76, 0.1);
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

/* Rechtstexte (Impressum, Datenschutz, AGB, Verbraucherinfos) */
.legal-prose {
  color: #a1b5be; /* midnight-300 */
  font-weight: 300;
  line-height: 1.75;
}
.legal-prose h2 {
  font-family: var(--font-heading), serif;
  color: #f5ebd4; /* gold-100 */
  font-size: 1.6rem;
  line-height: 1.2;
  margin-top: 2.75rem;
  margin-bottom: 1rem;
}
.legal-prose h3 {
  color: #e8d5a3; /* gold-200 */
  font-weight: 500;
  font-size: 1.1rem;
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
}
.legal-prose p {
  margin-bottom: 1rem;
}
.legal-prose a {
  color: #c9a84c; /* gold-400 */
  text-decoration: underline;
}
.legal-prose a:hover {
  color: #d4ba6e;
}
.legal-prose ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.legal-prose ol {
  list-style: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.legal-prose li {
  margin-bottom: 0.4rem;
}
.legal-prose strong {
  color: #f5ebd4;
  font-weight: 600;
}
.legal-prose table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.5rem;
}
.legal-prose th,
.legal-prose td {
  border: 1px solid rgba(201, 168, 76, 0.15);
  padding: 0.6rem 0.9rem;
  text-align: left;
}
.legal-prose th {
  color: #e8d5a3;
  font-weight: 500;
}

```

### `src/app/impressum/page.tsx`

```tsx
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business, legal } from "@/lib/business";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von Millennium Place.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" lastUpdated="15. Juni 2026">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {legal.owner}
        <br />
        {business.name}
        <br />
        {legal.street}
        <br />
        {legal.postalCode} {legal.locality}
      </p>

      <h3>Rechtsform</h3>
      <p>{legal.legalForm}</p>

      <h2>Kontakt</h2>
      <p>
        Telefon: {legal.phone}
        <br />
        E-Mail: <a href={`mailto:${legal.email}`}>{legal.email}</a>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        <em>
          [Umsatzsteuer-ID ergänzen, sofern vorhanden — andernfalls Hinweis auf
          Kleinunternehmerregelung gemäß § 19 UStG durch den Betreiber prüfen
          lassen.]
        </em>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {legal.owner}
        <br />
        {legal.street}, {legal.postalCode} {legal.locality}
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
        10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </p>
    </LegalPage>
  );
}

```

### `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Instrument_Serif, Barlow } from "next/font/google";
import "./globals.css";
import { buildJsonLd } from "@/lib/schema";
import ConsentProvider from "@/components/consent/ConsentProvider";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://millenniumplace.de";
const ogImage = "/images/interior-sunset.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Millennium Place — Premium Event & Dining Destination am Rhein",
    template: "%s | Millennium Place",
  },
  description:
    "Exklusive Premium-Eventlocation & Steakhouse im Rheingau. Hochzeiten, Firmenfeiern, Galas, Konferenzen & Live Events für bis zu 250 Gäste — mit Rheinblick in Lorch am Rhein. Ab 2026.",
  keywords: [
    "Eventlocation Rheingau",
    "Hochzeitslocation am Rhein",
    "Premium Eventlocation",
    "Steakhouse Rheingau",
    "Hochzeit Lorch am Rhein",
    "Firmenfeier Rheingau",
    "Gala Location Rhein",
    "Konferenzräume Rheingau",
    "Eventlocation Lorch am Rhein",
    "Restaurant Lorch am Rhein",
    "Veranstaltungsort Rheingau",
  ],
  authors: [{ name: "Millennium Place" }],
  creator: "Millennium Place",
  publisher: "Millennium Place",
  applicationName: "Millennium Place",
  category: "Event Venue & Restaurant",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: "Millennium Place — Premium Event & Dining Destination am Rhein",
    description:
      "Luxus, Rheinblick und erstklassige Gastronomie. Eventlocation & Steakhouse für bis zu 250 Gäste — ab 2026 im Herzen des Rheingaus.",
    url: siteUrl,
    siteName: "Millennium Place",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: ogImage,
        width: 1536,
        height: 1024,
        alt: "Millennium Place — Interior mit Rheinblick bei Sonnenuntergang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Millennium Place — Premium Event & Dining Destination am Rhein",
    description:
      "Eventlocation & Steakhouse mit Rheinblick im Rheingau. Hochzeiten, Galas, Firmenfeiern — ab 2026 in Lorch am Rhein.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

const jsonLd = buildJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        {/* Calendly-CSS wird erst nach Einwilligung in der Calendly-Komponente
            geladen — keine Datenübertragung vor Consent. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${barlow.variable} font-body antialiased`}
      >
        <ConsentProvider>{children}</ConsentProvider>
      </body>
    </html>
  );
}

```

### `src/app/page.tsx`

```tsx
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

```

### `src/app/robots.ts`

```ts
import type { MetadataRoute } from "next";

const siteUrl = "https://millenniumplace.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

```

### `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";
import { eventSlugs } from "@/lib/events";

const siteUrl = "https://millenniumplace.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...eventSlugs.map((slug) => ({
      url: `${siteUrl}/events/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

```

### `src/app/verbraucherinformationen/page.tsx`

```tsx
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

```

### `src/components/Anfahrt.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ConsentGate from "./consent/ConsentGate";

const directions = [
  { from: "Frankfurt", time: "ca. 1h 10min", route: "A66 → B42 Richtung Rüdesheim → Lorch" },
  { from: "Wiesbaden", time: "ca. 50 min", route: "B42 entlang des Rheins" },
  { from: "Koblenz", time: "ca. 45 min", route: "B42 rheinaufwärts" },
  { from: "Mainz", time: "ca. 55 min", route: "A60 → B42 Richtung Rheingau" },
];

export default function Anfahrt() {
  return (
    <section id="anfahrt" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/20 to-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Anfahrt
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            So finden Sie uns
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Millennium Place liegt im Herzen von Lorch am Rhein — direkt an der
            romantischen Rheinstraße.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px]">
              <ConsentGate
                category="externalMedia"
                title="Google Maps"
                description="Zum Schutz Ihrer Daten wird die Karte erst nach Ihrer Zustimmung geladen. Dabei werden Daten an Google übertragen."
                className="h-full"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2548.5!2d7.8039!3d50.0438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bdc53e8fba9a5d%3A0x422435029b0b770!2sLorch%2C%20Deutschland!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                  className="w-full h-full"
                  style={{ border: "none", filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Millennium Place Standort"
                />
              </ConsentGate>
            </div>
          </ScrollReveal>

          {/* Info + Directions */}
          <div className="space-y-8">
            {/* Address Card */}
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-2xl text-gold-100 mb-4">
                  Adresse
                </h3>
                <div className="space-y-3 text-midnight-300 font-light">
                  <p className="flex items-start gap-3">
                    <span className="text-gold-400 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </span>
                    Millennium Place<br />Lorch am Rhein<br />65391 Rheingau
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-gold-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </span>
                    info@millenniumplace.de
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Directions */}
            <ScrollReveal delay={0.2}>
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-2xl text-gold-100 mb-6">
                  Anfahrt von
                </h3>
                <div className="space-y-4">
                  {directions.map((d) => (
                    <motion.div
                      key={d.from}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between border-b border-midnight-800/30 pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="text-gold-200 font-medium">{d.from}</p>
                        <p className="text-midnight-400 text-sm font-light">{d.route}</p>
                      </div>
                      <span className="text-gold-400 text-sm font-medium whitespace-nowrap ml-4">
                        {d.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Parking */}
            <ScrollReveal delay={0.3}>
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <h3 className="font-heading text-xl text-gold-100">Parkplätze</h3>
                </div>
                <p className="text-midnight-300 font-light">
                  Kostenfreie Parkplätze direkt am Gebäude verfügbar.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

```

### `src/components/Calendly.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import ScrollReveal from "./ScrollReveal";
import ConsentGate from "./consent/ConsentGate";
import { useConsent } from "./consent/ConsentProvider";

// Replace this URL with your own Calendly link once your account is set up:
// e.g. https://calendly.com/millennium-place/besichtigung
const CALENDLY_URL =
  "https://calendly.com/mosaidhashemi/vorort-termin?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0d1114&text_color=f4f6f7&primary_color=c9a84c";

export default function CalendlySection() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const { hasConsent } = useConsent();
  const showCalendly = hasConsent("externalMedia");

  // Re-init widget if Calendly script was already loaded (e.g. hot reload)
  useEffect(() => {
    if (
      showCalendly &&
      typeof window !== "undefined" &&
      (window as unknown as { Calendly?: { initInlineWidget: (opts: object) => void } }).Calendly &&
      widgetRef.current
    ) {
      (window as unknown as { Calendly: { initInlineWidget: (opts: object) => void } }).Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: widgetRef.current,
      });
    }
  }, [showCalendly]);

  return (
    <section id="termin" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-midnight-950" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Direkte Buchung
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Besichtigung vereinbaren
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Wählen Sie direkt einen Termin für Ihre persönliche Führung durch
            Millennium Place. Kostenlos und unverbindlich.
          </p>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal delay={0.1} className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { icon: "✓", text: "Kostenlos & unverbindlich" },
            { icon: "✓", text: "Antwort in 24h" },
            { icon: "✓", text: "Persönliche Beratung" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-sm text-midnight-300 font-light"
            >
              <span className="text-gold-400 font-semibold">{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </ScrollReveal>

        {/* Calendly inline widget — erst nach Einwilligung (Externe Medien) */}
        <ScrollReveal delay={0.15}>
          {showCalendly ? (
            <div className="rounded-2xl overflow-hidden glass">
              <div
                ref={widgetRef}
                className="calendly-inline-widget w-full"
                data-url={CALENDLY_URL}
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>
          ) : (
            <ConsentGate
              category="externalMedia"
              title="Terminbuchung (Calendly)"
              description="Zum Schutz Ihrer Daten wird die Online-Terminbuchung erst nach Ihrer Zustimmung geladen. Dabei werden Daten an Calendly übertragen. Alternativ erreichen Sie uns telefonisch oder per E-Mail."
              className="min-h-[400px]"
            >
              <span />
            </ConsentGate>
          )}
        </ScrollReveal>
      </div>

      {/* Calendly CSS + Script — nur nach Einwilligung */}
      {showCalendly && (
        <>
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://assets.calendly.com/assets/external/widget.css"
            rel="stylesheet"
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </>
      )}
    </section>
  );
}

```

### `src/components/Contact.tsx`

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

type Status = "idle" | "loading" | "success" | "error";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMsg(
        "Formular noch nicht konfiguriert. Bitte kontaktieren Sie uns direkt per E-Mail."
      );
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "Neue Event-Anfrage über millenniumplace.de");
    formData.append("from_name", "Millennium Place Website");

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Etwas ist schiefgelaufen. Bitte erneut versuchen.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.");
    }
  }

  return (
    <section id="kontakt" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-midnight-950" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Kontakt
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Lassen Sie uns Ihr Event planen
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Erzählen Sie uns von Ihrer Vision. Wir melden uns innerhalb von 24
            Stunden bei Ihnen.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass rounded-2xl p-10 md:p-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold-500/15 border border-gold-400/30 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl text-gold-100 mb-3">
                  Vielen Dank!
                </h3>
                <p className="text-midnight-300 font-light max-w-md mx-auto">
                  Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb
                  von 24 Stunden bei Ihnen.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
                >
                  Weitere Anfrage senden
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl p-8 md:p-12 space-y-6"
              >
                {/* Honeypot Spam-Schutz */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-midnight-300 mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Ihr vollständiger Name"
                      className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-midnight-300 mb-2 font-medium">
                      E-Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="ihre@email.de"
                      className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="event" className="block text-sm text-midnight-300 mb-2 font-medium">
                      Art des Events
                    </label>
                    <select
                      id="event"
                      name="event_type"
                      className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all appearance-none"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="Hochzeit">Hochzeit</option>
                      <option value="Firmenfeier">Firmenfeier</option>
                      <option value="Gala">Gala</option>
                      <option value="Konferenz">Konferenz</option>
                      <option value="Privates Dinner">Privates Dinner</option>
                      <option value="Sonstiges">Sonstiges</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm text-midnight-300 mb-2 font-medium">
                      Gästeanzahl
                    </label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      min={1}
                      placeholder="Geschätzte Anzahl"
                      className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-midnight-300 mb-2 font-medium">
                    Ihre Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Erzählen Sie uns von Ihrem Event..."
                    className="w-full bg-midnight-900/50 border border-midnight-700/50 rounded-xl px-4 py-3 text-gold-100 placeholder:text-midnight-600 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-all resize-none"
                  />
                </div>

                {/* Pflicht-Einwilligungen (DSGVO / BGB) */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 text-sm text-midnight-300 font-light cursor-pointer">
                    <input
                      type="checkbox"
                      name="datenschutz_akzeptiert"
                      required
                      value="ja"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
                    />
                    <span>
                      Ich habe die{" "}
                      <a href="/datenschutz" target="_blank" className="text-gold-400 hover:text-gold-300 underline">
                        Datenschutzerklärung
                      </a>{" "}
                      gelesen und stimme der Verarbeitung meiner Daten zur
                      Bearbeitung der Anfrage zu.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-midnight-300 font-light cursor-pointer">
                    <input
                      type="checkbox"
                      name="agb_akzeptiert"
                      required
                      value="ja"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
                    />
                    <span>
                      Ich akzeptiere die{" "}
                      <a href="/agb" target="_blank" className="text-gold-400 hover:text-gold-300 underline">
                        Allgemeinen Geschäftsbedingungen
                      </a>
                      .
                    </span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-midnight-300 font-light cursor-pointer">
                    <input
                      type="checkbox"
                      name="widerruf_zur_kenntnis"
                      required
                      value="ja"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-gold-500"
                    />
                    <span>
                      Mir ist bekannt, dass für termingebundene
                      Veranstaltungsleistungen kein gesetzliches Widerrufsrecht
                      besteht (§ 312g Abs. 2 Nr. 9 BGB).
                    </span>
                  </label>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">{errorMsg}</p>
                )}

                <motion.button
                  whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/25 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Wird gesendet…" : "Anfrage absenden"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}

```

### `src/components/EventLanding.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CldImage } from "next-cloudinary";
import ScrollReveal from "./ScrollReveal";
import type { EventContent, EventFaq } from "@/lib/events";

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
      {children}
    </p>
  );
}

function FaqRow({ faq, index }: { faq: EventFaq; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <ScrollReveal delay={index * 0.06}>
      <div className={`border-b border-midnight-800/50 ${open ? "border-gold-400/20" : ""}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left group"
          aria-expanded={open}
        >
          <span className="text-lg text-gold-100 font-medium group-hover:text-gold-300 transition-colors pr-4">
            {faq.question}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gold-400 text-2xl shrink-0 leading-none"
          >
            +
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-midnight-300 font-light leading-relaxed max-w-3xl">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export default function EventLanding({ event }: { event: EventContent }) {
  return (
    <main className="bg-midnight-950 text-gold-100">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <CldImage
            src={event.heroImage}
            alt={event.heroHeadline}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/70 to-midnight-950/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pb-20 pt-32">
          <nav className="mb-6 text-sm text-midnight-300" aria-label="Breadcrumb">
            <a href="/" className="hover:text-gold-300 transition-colors">
              Start
            </a>
            <span className="mx-2 text-gold-400/60">/</span>
            <span className="text-gold-200">{event.title}</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionEyebrow>{event.eyebrow}</SectionEyebrow>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-gold-100 max-w-4xl leading-[1.05] text-balance">
              {event.heroHeadline}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-midnight-200 font-light max-w-2xl">
              {event.heroSubline}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/#kontakt"
                className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25"
              >
                Event anfragen
              </a>
              <a
                href="/#galerie"
                className="px-8 py-3.5 border border-gold-400/40 hover:border-gold-300 text-gold-100 font-medium rounded-full transition-colors duration-300"
              >
                Galerie ansehen
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Intro (Kurzantwort) ──────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-gold-100 leading-snug text-balance">
              {event.intro}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Zielgruppe ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl text-gold-100 mb-6">
              {event.audience.title}
            </h2>
            <p className="text-midnight-300 text-lg font-light leading-relaxed">
              {event.audience.text}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Vorteile ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="text-center mb-14">
            <SectionEyebrow>Ihre Vorteile</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              Warum Millennium Place
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {event.benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-8 h-full">
                  <div className="h-10 w-10 rounded-full border border-gold-400/40 flex items-center justify-center mb-5">
                    <span className="font-heading text-gold-400">{i + 1}</span>
                  </div>
                  <h3 className="font-heading text-xl text-gold-100 mb-3">{b.title}</h3>
                  <p className="text-midnight-300 font-light leading-relaxed">{b.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ablauf ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <ScrollReveal className="text-center mb-14">
            <SectionEyebrow>Ablauf</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              In vier Schritten zu Ihrem Event
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {event.process.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 0.08}>
                <div className="text-center">
                  <p className="font-heading text-5xl gold-gradient mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-heading text-xl text-gold-100 mb-2">{p.step}</h3>
                  <p className="text-midnight-300 font-light text-sm leading-relaxed">{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ausstattung ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="text-center mb-14">
            <SectionEyebrow>Ausstattung</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              Alles, was Ihr Event braucht
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
            {event.equipment.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.04}>
                <div className="flex items-start gap-3 py-2 border-b border-midnight-800/40">
                  <svg
                    className="w-5 h-5 text-gold-400 mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-midnight-200 font-light">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impressionen (Galerie) ───────────────────────────── */}
      {event.gallery.length > 0 && (
        <section className="py-16 md:py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <ScrollReveal className="text-center mb-14">
              <SectionEyebrow>Impressionen</SectionEyebrow>
              <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
                Einblicke in Millennium Place
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {event.gallery.map((img, i) => (
                <ScrollReveal key={img.publicId} delay={(i % 3) * 0.08}>
                  <div
                    className={`relative overflow-hidden rounded-2xl glass group ${
                      i === 0 ? "col-span-2 lg:col-span-2 aspect-[16/10]" : "aspect-square"
                    }`}
                  >
                    <CldImage
                      src={img.publicId}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="text-center mt-10">
              <a
                href="/#galerie"
                className="text-sm text-gold-300 hover:text-gold-200 transition-colors tracking-wide uppercase"
              >
                Gesamte Galerie ansehen →
              </a>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Pakete ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <ScrollReveal className="text-center mb-14">
            <SectionEyebrow>Beispielpakete</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              Pakete für jeden Anlass
            </h2>
            <p className="text-midnight-400 mt-4 font-light max-w-2xl mx-auto">
              Alle Pakete sind individuell anpassbar. Gerne erstellen wir Ihnen ein
              maßgeschneidertes Angebot.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {event.packages.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.1}>
                <div
                  className={`rounded-2xl p-8 h-full flex flex-col ${
                    p.featured
                      ? "bg-gold-500/10 border border-gold-400/40"
                      : "glass"
                  }`}
                >
                  {p.featured && (
                    <span className="self-start mb-4 text-xs font-semibold tracking-wider uppercase text-midnight-950 bg-gold-400 rounded-full px-3 py-1">
                      Beliebt
                    </span>
                  )}
                  <h3 className="font-heading text-2xl text-gold-100">{p.name}</h3>
                  <p className="text-gold-300 font-heading text-xl mt-1">{p.price}</p>
                  <p className="text-midnight-400 font-light text-sm mt-3 mb-6">
                    {p.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-midnight-200 font-light text-sm">
                        <span className="text-gold-400 mt-0.5">✓</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/#kontakt"
                    className={`mt-auto text-center py-3 rounded-full font-semibold transition-all duration-300 ${
                      p.featured
                        ? "bg-gold-500 hover:bg-gold-400 text-midnight-950"
                        : "border border-gold-400/40 hover:border-gold-300 text-gold-100"
                    }`}
                  >
                    Anfragen
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <SectionEyebrow>Häufige Fragen</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100">
              Fragen & Antworten
            </h2>
          </ScrollReveal>
          <div>
            {event.faqs.map((faq, i) => (
              <FaqRow key={faq.question} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + interne Links ──────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-5xl text-gold-100 mb-6">
              Lassen Sie uns Ihr Event planen
            </h2>
            <p className="text-midnight-300 font-light text-lg max-w-2xl mx-auto mb-10">
              Senden Sie uns unverbindlich Ihre Anfrage — wir melden uns persönlich
              und gestalten gemeinsam Ihren besonderen Tag am Rhein.
            </p>
            <a
              href="/#kontakt"
              className="inline-block px-10 py-4 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25"
            >
              Jetzt Event anfragen
            </a>
          </ScrollReveal>

          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            {event.related.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-midnight-400 hover:text-gold-300 transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

```

### `src/components/FAQ.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { faqs } from "@/lib/business";

function FAQItem({ faq, index }: { faq: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.06}>
      <motion.div
        className={`border-b border-midnight-800/50 ${
          open ? "border-gold-400/20" : ""
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left group"
          aria-expanded={open}
        >
          <span className="text-lg text-gold-100 font-medium group-hover:text-gold-300 transition-colors pr-4">
            {faq.question}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gold-400 text-2xl shrink-0 leading-none"
          >
            +
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-midnight-300 font-light leading-relaxed max-w-3xl">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollReveal>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Häufige Fragen
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-gold-100">
            Fragen & Antworten
          </h2>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

```

### `src/components/Features.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
    title: "Eventlocation",
    description:
      "Bis zu 250 Gäste in einzigartiger Atmosphäre. Hochzeiten, Galas, Firmenfeiern und Konferenzen — alles mit Rheinblick.",
    highlight: "Bis zu 250 Gäste",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    title: "Steakhouse & Küche",
    description:
      "Premium Dry-Aged Steaks, internationale Küche und erlesene Weine aus dem Rheingau. Kulinarik auf höchstem Niveau.",
    highlight: "Dry-Aged Premium",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    title: "Live Entertainment",
    description:
      "Von Jazz-Abenden bis DJ-Nights, Live-Bands und exklusive Shows. Entertainment das Ihren Abend unvergesslich macht.",
    highlight: "Live Musik & Shows",
  },
];

export default function Features() {
  return (
    <section id="erlebnis" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/50 to-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Das Erlebnis
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Drei Welten, ein Ort
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Millennium Place vereint erstklassige Events, exquisite Gastronomie
            und mitreißendes Entertainment unter einem Dach.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-8 lg:p-10 rounded-2xl glass hover:border-gold-400/30 transition-colors duration-500 h-full"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="text-gold-400 mb-6 group-hover:text-gold-300 transition-colors">
                  {feature.icon}
                </div>

                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full mb-4">
                  {feature.highlight}
                </span>

                <h3 className="font-heading text-2xl lg:text-3xl text-gold-100 mb-4">
                  {feature.title}
                </h3>

                <p className="text-midnight-300 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

```

### `src/components/Footer.tsx`

```tsx
import ScrollReveal from "./ScrollReveal";
import CookieSettingsLink from "./consent/CookieSettingsLink";

const footerLinks = {
  "Millennium Place": [
    { label: "Über uns", href: "#" },
    { label: "Karriere", href: "#" },
    { label: "Presse", href: "#" },
    { label: "Partner werden", href: "#" },
  ],
  Events: [
    { label: "Hochzeiten", href: "/events/hochzeiten" },
    { label: "Firmenveranstaltungen", href: "/events/firmenveranstaltungen" },
    { label: "Steakhouse", href: "/#restaurant" },
    { label: "Räume", href: "/#raeume" },
  ],
  Service: [
    { label: "Event anfragen", href: "/#kontakt" },
    { label: "Pakete & Preise", href: "/#preise" },
    { label: "FAQ", href: "/#faq" },
    { label: "Galerie", href: "/#galerie" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 px-6 border-t border-midnight-800/30">
      <div className="absolute inset-0 bg-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full border border-gold-400/50 flex items-center justify-center">
                  <span className="font-heading text-gold-400 text-xl">M</span>
                </div>
                <span className="font-heading text-xl text-gold-100">
                  Millennium Place
                </span>
              </div>
              <p className="text-midnight-400 font-light text-sm leading-relaxed mb-6">
                Premium Event & Dining Destination
                <br />
                Lorch am Rhein, Rheingau
                <br />
                Ab 2026
              </p>
              <div className="flex gap-4">
                {["Instagram", "LinkedIn", "Facebook"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-midnight-500 hover:text-gold-400 transition-colors text-sm"
                    aria-label={social}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {Object.entries(footerLinks).map(([title, links], i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div>
                <h4 className="text-gold-300 font-medium text-sm tracking-wider uppercase mb-6">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-midnight-400 hover:text-gold-200 transition-colors text-sm font-light"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="border-t border-midnight-800/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-midnight-600 text-xs">
            &copy; 2026 Millennium Place. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a
              href="/impressum"
              className="text-midnight-500 hover:text-gold-300 text-xs transition-colors"
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="text-midnight-500 hover:text-gold-300 text-xs transition-colors"
            >
              Datenschutz
            </a>
            <a
              href="/agb"
              className="text-midnight-500 hover:text-gold-300 text-xs transition-colors"
            >
              AGB
            </a>
            <a
              href="/verbraucherinformationen"
              className="text-midnight-500 hover:text-gold-300 text-xs transition-colors"
            >
              Verbraucherinformationen
            </a>
            <CookieSettingsLink className="text-midnight-500 hover:text-gold-300 text-xs transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}

```

### `src/components/Gallery.tsx`

```tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface GalerieBild {
  publicId: string;
  alt: string;
  kategorie: string;
}

const bilder: GalerieBild[] = [
  // ── Saal ──
  { publicId: "Saal_Millennium_mxbpw9", alt: "Festsaal mit goldener Bühne", kategorie: "Saal" },
  { publicId: "Multi_Foto_rb4npu", alt: "Millennium Place Eingangsbereich", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.15_1_gc0sek", alt: "Saal mit goldenem Rahmen", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.17_hzymzl", alt: "Eleganter Innenbereich", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.16_indpqb", alt: "Millennium Place Logo-Wand", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.22_1_ppemou", alt: "Foyer mit Dekor", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_3_vctx2k", alt: "Heller Festsaal", kategorie: "Saal" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.23_1_dk9nir", alt: "Festliche Bestuhlung", kategorie: "Saal" },

  // ── Restaurant ──
  { publicId: "Elegante_Restaurantatmosphäre_mit_luxuriösem_Design_i1qhta", alt: "Elegantes Restaurant", kategorie: "Restaurant" },
  { publicId: "Buffet_Millenium_1_rkfrjx", alt: "Exklusives Buffet", kategorie: "Restaurant" },
  { publicId: "Menu_Dinner_Fish_plate_fytvtf", alt: "Dinner mit Fischgericht", kategorie: "Restaurant" },
  { publicId: "steak_serviert_2026_yytk3m", alt: "Premium Steak", kategorie: "Restaurant" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.32_1_p07cio", alt: "Serviertes Steak", kategorie: "Restaurant" },
  { publicId: "buffet_2026_wupazw", alt: "Buffet Auswahl", kategorie: "Restaurant" },

  // ── Events ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_2_zqz0lo", alt: "Karnevalsfeier", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_3_zijfe0", alt: "Bühnenbeleuchtung", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.33_1_b08gcv", alt: "Abendveranstaltung", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.33_rg01gc", alt: "Bühnenshow", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_1_nq68gp", alt: "Farbige Bühne", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_br4hrq", alt: "Event mit rotem Licht", kategorie: "Events" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.22_zhrqit", alt: "Festliche Veranstaltung", kategorie: "Events" },

  // ── Dekoration ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.22_2_ntwkte", alt: "Tischdekoration", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.28_lcmu9h", alt: "Festtafel mit Rosen", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_1_c12yi6", alt: "Blumengedeck", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_2_lavrks", alt: "Gedeckte Festtafel", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_nbrnxv", alt: "Weiße Dekoration", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.32_fvgqmx", alt: "Tischordnung", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.34_lrmexr", alt: "Blumenarrangement", kategorie: "Dekoration" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_1_a6dsdu", alt: "Hochzeitsdekoration", kategorie: "Dekoration" },

  // ── Außen ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.15_2_csljfh", alt: "Außenansicht", kategorie: "Außen" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.15_wty99y", alt: "Historisches Gebäude", kategorie: "Außen" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.16_1_kzd4km", alt: "Gebäude bei Nacht", kategorie: "Außen" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.34_1_mub4b1", alt: "Beleuchtetes Gebäude", kategorie: "Außen" },

  // ── Kegelbahn ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_4_fouaad", alt: "Bowling Wandkunst", kategorie: "Kegelbahn" },
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_5_z58ry5", alt: "Kegelbahn Wandmalerei", kategorie: "Kegelbahn" },

  // ── Konferenz ──
  { publicId: "WhatsApp_Image_2026-05-30_at_21.29.17_3_z6k3mg", alt: "Konferenz & Meeting", kategorie: "Konferenz" },
  { publicId: "konferenz_2026_sitzung_wl8p1w", alt: "Konferenzsaal", kategorie: "Konferenz" },
  { publicId: "konferenz_2026_xwg1bq", alt: "Tagungsraum", kategorie: "Konferenz" },
];

const kategorien = ["Alle", ...Array.from(new Set(bilder.map((b) => b.kategorie)))];
const CARD_WIDTH = 420;
const GAP = 24;

export default function Gallery() {
  const [aktiv, setAktiv] = useState("Alle");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const gefiltert =
    aktiv === "Alle" ? bilder : bilder.filter((b) => b.kategorie === aktiv);

  const maxIndex = Math.max(0, gefiltert.length - 1);

  useEffect(() => {
    setSliderIndex(0);
  }, [aktiv]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold && sliderIndex < maxIndex) {
      setSliderIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (info.offset.x > threshold && sliderIndex > 0) {
      setSliderIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const prev = () => setSliderIndex((i) => Math.max(0, i - 1));
  const next = () => setSliderIndex((i) => Math.min(maxIndex, i + 1));

  // Lightbox
  const currentLightboxIndex = lightbox
    ? gefiltert.findIndex((b) => b.publicId === lightbox)
    : -1;

  const navigateLightbox = useCallback(
    (dir: -1 | 1) => {
      if (currentLightboxIndex < 0) return;
      const n = currentLightboxIndex + dir;
      if (n >= 0 && n < gefiltert.length) setLightbox(gefiltert[n].publicId);
    },
    [currentLightboxIndex, gefiltert]
  );

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, navigateLightbox]);

  return (
    <section id="galerie" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/30 to-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Galerie
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Impressionen
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Einblicke in Millennium Place — Ihr exklusiver Veranstaltungsort im
            Rheingau.
          </p>
        </ScrollReveal>

        {/* Filter-Tabs */}
        <ScrollReveal delay={0.1} className="flex flex-wrap justify-center gap-3 mb-12">
          {kategorien.map((k) => (
            <button
              key={k}
              onClick={() => setAktiv(k)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wider uppercase border transition-all duration-300 ${
                aktiv === k
                  ? "bg-gold-500 border-gold-500 text-midnight-950"
                  : "border-midnight-700/50 text-midnight-300 hover:border-gold-400/50 hover:text-gold-300"
              }`}
            >
              {k}
            </button>
          ))}
        </ScrollReveal>
      </div>

      {/* Slider */}
      <div className="relative z-10">
        {/* Navigation Arrows */}
        {sliderIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 transition-all"
            aria-label="Vorheriges Bild"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {sliderIndex < maxIndex && (
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 transition-all"
            aria-label="Nächstes Bild"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Slider Track */}
        <div ref={constraintsRef} className="overflow-hidden px-6 md:px-16">
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            animate={{ x: -(sliderIndex * (CARD_WIDTH + GAP)) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: -(maxIndex * (CARD_WIDTH + GAP)), right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            {gefiltert.map((bild) => (
              <motion.div
                key={bild.publicId}
                className="group relative rounded-2xl overflow-hidden glass cursor-pointer shrink-0"
                style={{ width: CARD_WIDTH }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightbox(bild.publicId)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <CldImage
                    src={bild.publicId}
                    alt={bild.alt}
                    width={800}
                    height={600}
                    crop="fill"
                    gravity="auto"
                    format="auto"
                    quality="auto"
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    sizes="420px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-gold-400 text-xs font-medium tracking-wider uppercase block mb-1">
                      {bild.kategorie}
                    </span>
                    <span className="text-gold-100 font-heading text-lg">
                      {bild.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1.5 mt-8 px-6">
          {gefiltert.length <= 20 ? (
            gefiltert.map((_, i) => (
              <button
                key={i}
                onClick={() => setSliderIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === sliderIndex
                    ? "w-8 bg-gold-400"
                    : "w-1.5 bg-midnight-700 hover:bg-midnight-500"
                }`}
                aria-label={`Bild ${i + 1}`}
              />
            ))
          ) : (
            <span className="text-midnight-500 text-sm">
              {sliderIndex + 1} / {gefiltert.length}
            </span>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-midnight-950/95 backdrop-blur-sm flex items-center justify-center cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-midnight-400 hover:text-gold-100 text-3xl font-light transition-colors z-10"
              aria-label="Schließen"
            >
              ✕
            </button>

            {currentLightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-midnight-400 hover:text-gold-100 text-5xl transition-colors z-10"
                aria-label="Vorheriges Bild"
              >
                ‹
              </button>
            )}

            {currentLightboxIndex < gefiltert.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-midnight-400 hover:text-gold-100 text-5xl transition-colors z-10"
                aria-label="Nächstes Bild"
              >
                ›
              </button>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="cursor-default"
            >
              <CldImage
                src={lightbox}
                alt="Vollbild"
                width={1600}
                height={1200}
                crop="fit"
                format="auto"
                quality="auto"
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-midnight-500 text-sm font-light">
              {currentLightboxIndex + 1} / {gefiltert.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

```

### `src/components/Hero.tsx`

```tsx
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

```

### `src/components/LegalPage.tsx`

```tsx
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

```

### `src/components/Navbar.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Erlebnis", href: "/#erlebnis" },
  { label: "Hochzeiten", href: "/events/hochzeiten" },
  { label: "Firmenevents", href: "/events/firmenveranstaltungen" },
  { label: "Räume", href: "/#raeume" },
  { label: "Galerie", href: "/#galerie" },
  { label: "Anfahrt", href: "/#anfahrt" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-full border border-gold-400/50 flex items-center justify-center group-hover:border-gold-300 transition-colors">
              <span className="font-heading text-gold-400 text-xl">M</span>
            </div>
            <span className="font-heading text-xl tracking-wide text-gold-100">
              Millennium Place
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-midnight-200 hover:text-gold-300 transition-colors duration-300 tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#kontakt"
              className="ml-4 px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-midnight-950 text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/25"
            >
              Anfrage senden
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label="Menü"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-gold-300 transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gold-300 transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gold-300 transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 top-20 bg-midnight-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-2xl font-heading text-gold-100 hover:text-gold-300 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/#kontakt"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              className="mt-4 px-8 py-3 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full text-lg"
            >
              Anfrage senden
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

```

### `src/components/Pricing.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const plans = [
  {
    name: "Intimate",
    subtitle: "Private Dining & Meetings",
    price: "ab 2.500",
    unit: "€",
    features: [
      "Bis zu 30 Gäste",
      "Private Dining Room",
      "3-Gänge-Menü inklusive",
      "Persönlicher Ansprechpartner",
      "Getränkepauschale optional",
    ],
    cta: "Anfragen",
    highlighted: false,
  },
  {
    name: "Signature",
    subtitle: "Hochzeiten & Galas",
    price: "ab 8.500",
    unit: "€",
    features: [
      "Bis zu 150 Gäste",
      "Grand Ballroom + Terrasse",
      "5-Gänge-Menü & Bar",
      "Dekor & Blumenarrangements",
      "DJ oder Live-Band",
      "Bridal Suite inklusive",
    ],
    cta: "Anfragen",
    highlighted: true,
  },
  {
    name: "Grand",
    subtitle: "Firmenfeiern & Konferenzen",
    price: "ab 15.000",
    unit: "€",
    features: [
      "Bis zu 250 Gäste",
      "Gesamte Location exklusiv",
      "Full-Service Catering",
      "Event-Planung & Koordination",
      "Technik & Entertainment",
      "Shuttle-Service optional",
    ],
    cta: "Anfragen",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="preise" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Pakete & Preise
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Ihr perfektes Paket
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Jedes Event ist einzigartig. Unsere Pakete sind der Startpunkt —
            individuelle Anpassungen jederzeit möglich.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`relative p-8 lg:p-10 rounded-2xl h-full flex flex-col ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-gold-500/10 to-midnight-900/60 border border-gold-400/30 shadow-xl shadow-gold-500/10"
                    : "glass"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-wider uppercase text-midnight-950 bg-gold-400 px-4 py-1 rounded-full">
                    Beliebteste Wahl
                  </span>
                )}

                <div className="mb-8">
                  <h3 className="font-heading text-2xl text-gold-100 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-midnight-400 text-sm">{plan.subtitle}</p>
                </div>

                <div className="mb-8">
                  <span className="font-heading text-4xl lg:text-5xl text-gold-100">
                    {plan.price}
                  </span>
                  <span className="text-midnight-400 text-lg ml-1">
                    {plan.unit}
                  </span>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-midnight-200 font-light"
                    >
                      <svg
                        className="w-5 h-5 text-gold-400 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#kontakt"
                  className={`block text-center py-3.5 rounded-full font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gold-500 hover:bg-gold-400 text-midnight-950 hover:shadow-lg hover:shadow-gold-500/25"
                      : "border border-gold-400/30 hover:border-gold-400/60 text-gold-200 hover:text-gold-100"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

```

### `src/components/Restaurant.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import ScrollReveal from "./ScrollReveal";
import { useConsent } from "./consent/ConsentProvider";

const highlights = [
  { icon: "🥩", title: "Dry-Aged Steaks", desc: "Premium-Cuts, 28 Tage gereift" },
  { icon: "🍷", title: "Rheingauer Weine", desc: "Erlesene Auswahl der Region" },
  { icon: "👨‍🍳", title: "Küchenchef-Menüs", desc: "Saisonale Kreationen auf höchstem Niveau" },
];

export default function Restaurant() {
  const { hasConsent } = useConsent();
  const showVideo = hasConsent("externalMedia");

  return (
    <section id="restaurant" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/20 to-midnight-950" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Gastronomie
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold-100 mb-6">
            Kulinarik auf höchstem Niveau
          </h2>
          <p className="text-midnight-300 text-lg max-w-2xl mx-auto font-light">
            Unser Steakhouse verbindet internationale Spitzenküche mit den besten
            Weinen des Rheingaus.
          </p>
        </ScrollReveal>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {highlights.map((h, i) => (
            <ScrollReveal key={h.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl glass h-full"
              >
                <div className="w-16 h-16 rounded-xl glass flex items-center justify-center text-3xl shrink-0">
                  {h.icon}
                </div>
                <div>
                  <h3 className="font-heading text-xl text-gold-100 mb-2">
                    {h.title}
                  </h3>
                  <p className="text-midnight-300 font-light">{h.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* YouTube Hintergrundvideo — erst nach Einwilligung (Externe Medien);
          ohne Consent dient ein Cloudinary-Bild als Hintergrund */}
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 h-[55vh] md:h-[65vh] overflow-hidden mb-20">
        {showVideo ? (
          <iframe
            src="https://www.youtube-nocookie.com/embed/2bUnbZg4EDw?autoplay=1&mute=1&loop=1&playlist=2bUnbZg4EDw&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              border: "none",
              width: "max(100vw, calc(65vh * 16 / 9))",
              height: "max(65vh, calc(100vw * 9 / 16))",
            }}
            title="Millennium Place Restaurant Hintergrundvideo"
          />
        ) : (
          <CldImage
            src="Elegante_Restaurantatmosphäre_mit_luxuriösem_Design_i1qhta"
            alt="Elegante Restaurantatmosphäre bei Millennium Place"
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/70 via-midnight-950/40 to-midnight-950/70" />
        {/* Overlay-Inhalt */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <ScrollReveal className="text-center max-w-2xl">
            <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
              Erleben Sie es selbst
            </p>
            <h3 className="font-heading text-3xl md:text-5xl text-gold-100 mb-4">
              Genuss in Bewegung
            </h3>
            <p className="text-midnight-200 text-lg font-light">
              Ein Vorgeschmack auf die kulinarischen Erlebnisse bei Millennium Place.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Steak Video */}
        <ScrollReveal className="mb-20">
          <div className="relative rounded-2xl overflow-hidden glass aspect-video max-w-4xl mx-auto">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster={`https://res.cloudinary.com/djrfxgvny/video/upload/so_0/Built_up_Video_Restaurant_d04krj.jpg`}
            >
              <source
                src="https://res.cloudinary.com/djrfxgvny/video/upload/q_auto/Built_up_Video_Restaurant_d04krj.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </ScrollReveal>

        {/* Food Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {[
            { id: "steak_serviert_2026_yytk3m", alt: "Premium Steak" },
            { id: "Buffet_Millenium_1_rkfrjx", alt: "Exklusives Buffet" },
            { id: "Menu_Dinner_Fish_plate_g21svf", alt: "Fischgericht" },
            { id: "Elegante_Restaurantatmosphäre_mit_luxuriösem_Design_i1qhta", alt: "Restaurant Ambiente" },
          ].map((img, i) => (
            <ScrollReveal key={img.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden glass aspect-square"
              >
                <CldImage
                  src={img.id}
                  alt={img.alt}
                  width={400}
                  height={400}
                  crop="fill"
                  gravity="auto"
                  format="auto"
                  quality="auto"
                  loading="lazy"
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-gold-200 text-sm font-heading">
                  {img.alt}
                </span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

```

### `src/components/ScrollReveal.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

```

### `src/components/SocialProof.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { business, reviews as testimonials } from "@/lib/business";

const GOOGLE_REVIEWS_URL = business.googleReviewsUrl;

const stats = [
  { value: "250+", label: "Gästekapazität" },
  { value: "4,7★", label: "Google-Bewertung" },
  { value: "2026", label: "Grand Opening" },
  { value: "∞", label: "Rheinblick" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={i < count ? "w-4 h-4 text-gold-400" : "w-4 h-4 text-midnight-700"}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-midnight-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 md:mb-28">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-heading text-4xl md:text-5xl lg:text-6xl gold-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-midnight-400 text-sm tracking-wider uppercase font-medium">
                  {stat.label}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mb-12">
          <p className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Bewertungen
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-gold-100">
            Was unsere Gäste sagen
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 0.12}>
              <motion.blockquote
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-2xl glass flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <span className="text-gold-400 font-heading text-lg">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-gold-300 font-medium">{t.author}</p>
                    <p className="text-midnight-500 text-sm">{t.role}</p>
                  </div>
                </div>
                <Stars count={t.rating} />
                <p className="text-midnight-200 font-light leading-relaxed flex-1 italic mt-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </motion.blockquote>
            </ScrollReveal>
          ))}

          {/* Google-Gesamtbewertung */}
          <ScrollReveal delay={0.24}>
            <motion.a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl glass flex flex-col items-center justify-center text-center h-full group"
            >
              <svg className="w-9 h-9 mb-4" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <p className="font-heading text-5xl text-gold-100 mb-1">4,7</p>
              <div className="mb-3">
                <Stars count={5} />
              </div>
              <p className="text-midnight-300 font-light text-sm mb-4">
                aus 20 Google-Bewertungen
              </p>
              <span className="text-gold-400 group-hover:text-gold-300 text-sm font-medium transition-colors inline-flex items-center gap-1">
                Alle Bewertungen ansehen
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </motion.a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

```

### `src/components/Spaces.tsx`

```tsx
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

```

### `src/components/consent/ConsentGate.tsx`

```tsx
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

```

### `src/components/consent/ConsentProvider.tsx`

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  type ConsentCategory,
  type ConsentState,
  allAccepted,
  categoryMeta,
  defaultConsent,
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
} from "@/lib/consent";

type ConsentContextValue = {
  consent: ConsentState;
  /** true, sobald der Nutzer eine Entscheidung getroffen hat */
  decided: boolean;
  hasConsent: (category: ConsentCategory) => boolean;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    // Außerhalb des Providers (z. B. SSR-Fallback): nichts ist freigegeben.
    return {
      consent: defaultConsent,
      decided: false,
      hasConsent: () => false,
      openSettings: () => {},
    } satisfies ConsentContextValue;
  }
  return ctx;
}

const ORDER: ConsentCategory[] = [
  "necessary",
  "statistics",
  "marketing",
  "externalMedia",
];

export default function ConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [decided, setDecided] = useState(true); // bis localStorage gelesen ist: nichts anzeigen
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(defaultConsent);

  // Gespeicherte Einwilligung beim Start laden.
  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored.categories);
      setDecided(true);
    } else {
      setDecided(false);
      setBannerOpen(true);
    }
  }, []);

  // Footer-Link „Cookie-Einstellungen" öffnet den Dialog.
  useEffect(() => {
    const open = () => {
      setDraft(consent);
      setSettingsOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, [consent]);

  const persist = useCallback((state: ConsentState) => {
    writeConsent(state);
    setConsent(state);
    setDecided(true);
    setBannerOpen(false);
    setSettingsOpen(false);
  }, []);

  const value: ConsentContextValue = {
    consent,
    decided,
    hasConsent: (c) => consent[c],
    openSettings: () => {
      setDraft(consent);
      setSettingsOpen(true);
    },
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}

      {/* ── Consent-Banner ─────────────────────────────────── */}
      <AnimatePresence>
        {bannerOpen && !settingsOpen && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Cookie-Hinweis"
            aria-live="polite"
            className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-gold-400/20 bg-midnight-950/95 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-black/50">
              <h2 className="font-heading text-xl md:text-2xl text-gold-100 mb-2">
                Datenschutz &amp; Cookies
              </h2>
              <p className="text-midnight-300 font-light text-sm leading-relaxed mb-6">
                Wir verwenden Cookies und ähnliche Technologien. Notwendige sind
                für den Betrieb der Website erforderlich. Andere helfen uns, das
                Angebot zu verbessern oder externe Inhalte (Karte, Videos,
                Terminbuchung) anzuzeigen. Sie entscheiden selbst — Ihre Auswahl
                können Sie jederzeit im Footer unter „Cookie-Einstellungen"
                widerrufen. Details in unserer{" "}
                <a href="/datenschutz" className="text-gold-400 hover:text-gold-300 underline">
                  Datenschutzerklärung
                </a>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => persist(allAccepted)}
                  className="order-1 sm:order-3 flex-1 py-3 px-6 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-colors"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={() => persist(defaultConsent)}
                  className="order-2 flex-1 py-3 px-6 border border-gold-400/30 hover:border-gold-300 text-gold-100 font-medium rounded-full transition-colors"
                >
                  Alle ablehnen
                </button>
                <button
                  onClick={() => {
                    setDraft(consent);
                    setSettingsOpen(true);
                  }}
                  className="order-3 sm:order-1 flex-1 py-3 px-6 text-midnight-300 hover:text-gold-300 font-medium rounded-full transition-colors"
                >
                  Einstellungen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Einstellungs-Dialog ────────────────────────────── */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSettingsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Cookie-Einstellungen"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-gold-400/20 bg-midnight-950 p-6 md:p-8 shadow-2xl"
            >
              <h2 className="font-heading text-2xl text-gold-100 mb-1">
                Cookie-Einstellungen
              </h2>
              <p className="text-midnight-400 font-light text-sm mb-6">
                Wählen Sie, welche Kategorien Sie zulassen möchten.
              </p>

              <div className="space-y-4 mb-8">
                {ORDER.map((cat) => {
                  const meta = categoryMeta[cat];
                  const active = meta.locked ? true : draft[cat];
                  return (
                    <label
                      key={cat}
                      className={`flex items-start gap-4 rounded-xl border p-4 transition-colors ${
                        active
                          ? "border-gold-400/30 bg-gold-500/5"
                          : "border-midnight-800/60"
                      } ${meta.locked ? "opacity-90" : "cursor-pointer"}`}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        disabled={meta.locked}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, [cat]: e.target.checked }))
                        }
                        className="mt-1 h-5 w-5 shrink-0 accent-gold-500"
                      />
                      <span>
                        <span className="block text-gold-100 font-medium">
                          {meta.title}
                          {meta.locked && (
                            <span className="ml-2 text-xs text-gold-400/70 uppercase tracking-wider">
                              immer aktiv
                            </span>
                          )}
                        </span>
                        <span className="block text-midnight-400 font-light text-sm mt-1 leading-relaxed">
                          {meta.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => persist(draft)}
                  className="flex-1 py-3 px-6 bg-gold-500 hover:bg-gold-400 text-midnight-950 font-semibold rounded-full transition-colors"
                >
                  Auswahl speichern
                </button>
                <button
                  onClick={() => persist(allAccepted)}
                  className="flex-1 py-3 px-6 border border-gold-400/30 hover:border-gold-300 text-gold-100 font-medium rounded-full transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConsentContext.Provider>
  );
}

```

### `src/components/consent/CookieSettingsLink.tsx`

```tsx
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

```

### `src/lib/business.ts`

```ts
/**
 * Single Source of Truth für alle Geschäftsdaten von Millennium Place.
 *
 * Diese Datei speist sowohl die sichtbaren Komponenten (FAQ, SocialProof …)
 * als auch das strukturierte Schema.org-Markup (src/lib/schema.ts).
 * Dadurch bleiben Seiteninhalt und Markup immer konsistent — eine
 * Voraussetzung dafür, dass Google Rich Results (FAQ, Sterne) ausspielt.
 */

export const SITE_URL = "https://millenniumplace.de";

export const business = {
  name: "Millennium Place",
  legalName: "Millennium Place",
  slogan: "Premium Event & Dining Destination am Rhein",
  description:
    "Exklusive Premium-Eventlocation und Steakhouse im Rheingau. Hochzeiten, Firmenfeiern, Galas, Konferenzen und Live Events für bis zu 250 Gäste — mit Blick auf den Rhein in Lorch am Rhein.",
  url: SITE_URL,
  email: "info@millenniumplace.de",
  ogImage: "/images/interior-sunset.png",

  address: {
    street: "Kolpingstraße 5",
    locality: "Lorch am Rhein",
    postalCode: "65391",
    region: "Hessen",
    country: "DE",
  },
  geo: { latitude: 50.0438, longitude: 7.8039 },

  priceRange: "€€€",
  cuisines: ["Steakhouse", "International", "Rheingauer Küche"],
  maximumAttendeeCapacity: 250,
  languages: ["de", "en"],
  areaServed: ["Rheingau", "Rhein-Main-Gebiet", "Hessen", "Rheinland-Pfalz"],

  /** Voraussichtliche Eröffnung */
  openingDate: "2026",

  /** Externer Link zu den Google-Bewertungen */
  googleReviewsUrl:
    "https://www.google.com/maps/search/Millennium+Place+Lorch",

  /** Echte Google-Gesamtbewertung (Stand Juni 2026) */
  rating: { value: 4.7, count: 20, best: 5 },
} as const;

/**
 * Rechtlich verbindliche Betreiberdaten (Impressum, Datenschutz, AGB).
 * Achtung: Die im Impressum genannte Kontakt-E-Mail/Telefon muss erreichbar
 * sein — daher die direkte Inhaber-Adresse, nicht die Marketing-Adresse.
 */
export const legal = {
  owner: "Said Zorhab Faqiri",
  legalForm: "Einzelunternehmen",
  street: "Kolpingstraße 5",
  postalCode: "65391",
  locality: "Lorch am Rhein",
  phone: "+49 151 74313645",
  email: "zfaqiri@gmx.de",
  hostingProvider:
    "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (Server-Standorte in der EU)",
} as const;

/**
 * Veranstaltungsarten — gespiegelt als hasOfferCatalog im Schema und als
 * Grundlage für künftige Event-Landingpages.
 */
export const eventTypes = [
  "Hochzeiten",
  "Freie Trauungen",
  "Firmenveranstaltungen",
  "Weihnachtsfeiern",
  "Galas",
  "Geburtstage",
  "Kulturelle Events",
  "Konferenzen & Tagungen",
  "Private Feiern",
  "Live-Musik & Dinner Events",
] as const;

/** Häufige Fragen — Quelle für FAQ-Sektion UND FAQPage-Schema. */
export const faqs = [
  {
    question: "Wann eröffnet Millennium Place?",
    answer:
      "Die offizielle Eröffnung ist für 2026 geplant. Sie können bereits jetzt Ihr Event vormerken lassen und von exklusiven Eröffnungskonditionen profitieren.",
  },
  {
    question: "Wie viele Gäste passen in die Location?",
    answer:
      "Der Grand Ballroom fasst bis zu 250 Gäste, die Rheinterrasse bis zu 120 und unsere Private Dining Rooms bis zu 30 Gäste. Für individuelle Arrangements kontaktieren Sie uns gerne.",
  },
  {
    question: "Bieten Sie Full-Service Event-Planung an?",
    answer:
      "Ja, von der ersten Idee bis zum letzten Tanz begleiten wir Sie. Unser erfahrenes Team kümmert sich um Dekoration, Catering, Entertainment, Technik und alle Details.",
  },
  {
    question: "Kann man das Steakhouse auch ohne Event besuchen?",
    answer:
      "Selbstverständlich! Unser Steakhouse steht allen Gästen offen. Wir empfehlen eine Reservierung, besonders an Wochenenden und für die begehrten Terrassenplätze mit Rheinblick.",
  },
  {
    question: "Gibt es Parkmöglichkeiten?",
    answer:
      "Direkt am Millennium Place stehen ausreichend kostenlose Parkplätze zur Verfügung. Für größere Events organisieren wir gerne einen Shuttle-Service von Bahnhöfen oder Hotels.",
  },
  {
    question: "Sind individuelle Menüs möglich?",
    answer:
      "Unser Küchenchef erstellt auf Wunsch ein komplett individuelles Menü für Ihr Event. Alle Allergien und Ernährungsvorlieben werden selbstverständlich berücksichtigt.",
  },
] as const;

/** Echte Google-Rezensionen — Quelle für SocialProof UND Review-Schema. */
export const reviews = [
  {
    quote:
      "Gastfreundlichkeit schon ab der Eingangstür und wirklich leckeres Essen. Fajitas, Rumpsteak oder Putenschnitzel – wir waren mit allem sehr zufrieden und kommen gerne wieder! Super Einkehrmöglichkeit nach einer Wanderung auf dem Wispertrail.",
    author: "Marco",
    role: "Local Guide · Google",
    initials: "M",
    rating: 5,
  },
  {
    quote:
      "Sehr leckeres und toll angerichtetes Essen. Wir haben uns direkt wohlgefühlt, da das Ambiente sehr schön und gehoben ist. Der Service ist 1 A.",
    author: "tammi_mz",
    role: "Local Guide · Google",
    initials: "T",
    rating: 5,
  },
] as const;

```

### `src/lib/consent.ts`

```ts
/**
 * DSGVO/TDDDG-konformes Consent-Management (eigene Lösung für Next.js).
 *
 * Ersetzt WordPress-Plugins wie Complianz/Borlabs, die hier technisch nicht
 * einsetzbar sind. Kategorien, Speicherung und Protokollierung der Einwilligung
 * sowie das Gating externer Dienste (Google Maps, YouTube, Calendly) laufen
 * vollständig clientseitig.
 *
 * Grundsatz: Außer "notwendig" ist alles standardmäßig DEAKTIVIERT (Opt-in).
 * Externe Medien/Tracker werden erst nach aktiver Zustimmung geladen.
 */

export type ConsentCategory =
  | "necessary"
  | "statistics"
  | "marketing"
  | "externalMedia";

export type ConsentState = Record<ConsentCategory, boolean>;

/** Protokollierter Einwilligungs-Datensatz (clientseitig, dokumentierbar). */
export type ConsentRecord = {
  version: string;
  /** ISO-Zeitstempel der Einwilligung */
  timestamp: string;
  categories: ConsentState;
};

/** Bei Änderung der Kategorien-Definitionen erhöhen → erneuter Consent. */
export const CONSENT_VERSION = "1.0.0";

export const CONSENT_STORAGE_KEY = "mp-consent";

/** Event, mit dem der Footer-Link „Cookie-Einstellungen" das Banner öffnet. */
export const OPEN_CONSENT_EVENT = "mp:open-consent";

export const defaultConsent: ConsentState = {
  necessary: true,
  statistics: false,
  marketing: false,
  externalMedia: false,
};

export const allAccepted: ConsentState = {
  necessary: true,
  statistics: true,
  marketing: true,
  externalMedia: true,
};

export const categoryMeta: Record<
  ConsentCategory,
  { title: string; description: string; locked?: boolean }
> = {
  necessary: {
    title: "Notwendig",
    description:
      "Technisch erforderlich für den Betrieb der Website (z. B. Speicherung Ihrer Cookie-Einstellungen). Immer aktiv.",
    locked: true,
  },
  statistics: {
    title: "Statistik",
    description:
      "Anonymisierte Messung der Websitenutzung, um unser Angebot zu verbessern. Wird erst nach Ihrer Zustimmung geladen.",
  },
  marketing: {
    title: "Marketing",
    description:
      "Dienste zur Reichweitenmessung und für personalisierte Inhalte (z. B. Meta Pixel). Wird erst nach Ihrer Zustimmung geladen.",
  },
  externalMedia: {
    title: "Externe Medien",
    description:
      "Inhalte externer Anbieter wie Google Maps, YouTube-Videos und der Calendly-Terminbuchung. Beim Laden können Daten an diese Anbieter übertragen werden.",
  },
};

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    // Bei Versionswechsel erneut nachfragen.
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(categories: ConsentState): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: { ...categories, necessary: true },
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* localStorage nicht verfügbar — Consent gilt nur für die Sitzung */
  }
  return record;
}

```

### `src/lib/events.ts`

```ts
/**
 * Datengetriebene Event-Landingpages.
 *
 * Jede Eventseite (/events/[slug]) wird vollständig aus einem Eintrag dieser
 * Datei erzeugt — Inhalt, Metadaten, Pakete, FAQ und Schema. Eine neue
 * Eventseite ist damit nur ein weiterer Datensatz, kein neuer Code.
 *
 * Struktur jeder Seite (gemäß Konzept):
 * Hero → kurze Antwort → Zielgruppe → Vorteile → Ablauf → Ausstattung →
 * Beispielpakete → FAQ → interne Verlinkung → Anfrage-CTA.
 */

export type EventPackage = {
  name: string;
  price: string;
  description: string;
  includes: string[];
  featured?: boolean;
};

export type EventFaq = { question: string; answer: string };

export type EventImage = { publicId: string; alt: string };

export type EventContent = {
  slug: string;
  /** Kurzes Label für Navigation & interne Links */
  nav: string;
  /** H1 / Seitentitel */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Cloudinary public id für das Hero-Bild */
  heroImage: string;
  eyebrow: string;
  heroHeadline: string;
  heroSubline: string;
  /** KI-freundliche Kurzantwort direkt am Seitenanfang */
  intro: string;
  audience: { title: string; text: string };
  benefits: { title: string; text: string }[];
  process: { step: string; text: string }[];
  equipment: string[];
  /** Impressionen-Galerie (echte Cloudinary-Fotos) */
  gallery: EventImage[];
  packages: EventPackage[];
  faqs: EventFaq[];
  /** Interne Verlinkung zu verwandten Seiten/Sektionen */
  related: { label: string; href: string }[];
};

export const events: EventContent[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "hochzeiten",
    nav: "Hochzeiten",
    title: "Hochzeit am Rhein",
    metaTitle: "Hochzeitslocation am Rhein | Heiraten im Rheingau",
    metaDescription:
      "Heiraten mit Rheinblick: Millennium Place ist Ihre exklusive Hochzeitslocation im Rheingau für bis zu 250 Gäste. Freie Trauung, Festsaal, Fine Dining & Full-Service Hochzeitsplanung. Jetzt Termin anfragen.",
    heroImage: "WhatsApp_Image_2026-05-30_at_21.29.28_lcmu9h",
    eyebrow: "Hochzeiten",
    heroHeadline: "Der schönste Tag — am Ufer des Rheins",
    heroSubline:
      "Eine Hochzeitslocation, die Eleganz, Rheinblick und erstklassige Gastronomie vereint. Für die intime Trauung wie für die große Feier mit 250 Gästen.",
    intro:
      "Millennium Place ist eine exklusive Hochzeitslocation im Rheingau, in Lorch am Rhein. Sie feiern mit bis zu 250 Gästen im Grand Ballroom, lassen sich auf der Rheinterrasse frei trauen und genießen ein individuell komponiertes Menü aus unserer Steakhouse-Küche. Von der Planung bis zum letzten Tanz begleitet Sie ein persönliches Team.",
    audience: {
      title: "Für Paare, die das Besondere suchen",
      text: "Ob romantische Trauung zu zweit mit engsten Vertrauten oder rauschende Hochzeit mit Familie und Freunden aus aller Welt — bei uns wird Ihr Tag zu einem Erlebnis, an das sich alle ein Leben lang erinnern. Wir heißen Paare jeder Herkunft, Kultur und Tradition herzlich willkommen und gestalten Ihre Feier so individuell wie Ihre Liebesgeschichte.",
    },
    benefits: [
      {
        title: "Trauung mit Rheinblick",
        text: "Freie Trauung auf der Rheinterrasse — mit dem Fluss und den Weinbergen des Rheingaus als natürlicher Kulisse.",
      },
      {
        title: "Ein Ort, alles dabei",
        text: "Trauung, Sektempfang, Dinner und Party an einem Ort. Keine Wege, keine Logistik — nur Ihr Tag.",
      },
      {
        title: "Fine-Dining-Küche",
        text: "Mehrgang-Menüs, Flying Buffets und Spätsnacks aus unserer Steakhouse-Küche, individuell auf Sie abgestimmt.",
      },
      {
        title: "Full-Service-Planung",
        text: "Floristik, Dekoration, Technik, Entertainment und Ablaufkoordination — ein Ansprechpartner für alles.",
      },
    ],
    process: [
      {
        step: "Kennenlernen",
        text: "Wir besichtigen gemeinsam die Location, lernen Ihre Vorstellungen kennen und prüfen Ihren Wunschtermin.",
      },
      {
        step: "Konzept & Menü",
        text: "Wir gestalten Ablauf, Bestuhlung, Dekoration und ein Menü, das zu Ihnen und Ihren Gästen passt.",
      },
      {
        step: "Feinschliff",
        text: "Zeitplan, Sitzordnung, Technik und alle Details werden in einem Abstimmungstermin festgelegt.",
      },
      {
        step: "Ihr großer Tag",
        text: "Unser Team kümmert sich um jeden Moment — Sie genießen Ihre Hochzeit von der ersten bis zur letzten Minute.",
      },
    ],
    equipment: [
      "Grand Ballroom für bis zu 250 Gäste",
      "Rheinterrasse für freie Trauungen (bis 120 Gäste)",
      "Private Dining Rooms für intime Feiern (bis 30 Gäste)",
      "Profi-Ton- und Lichttechnik inkl. Bühne",
      "Tanzfläche & Flügel auf Wunsch",
      "Brautzimmer / Rückzugsraum",
      "Kostenfreie Parkplätze & Shuttle-Service auf Anfrage",
      "Barrierefreier Zugang",
    ],
    gallery: [
      { publicId: "Saal_Millennium_mxbpw9", alt: "Festsaal mit goldener Bühne für die Hochzeitsfeier" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.29_2_lavrks", alt: "Festlich gedeckte Hochzeitstafel" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.34_lrmexr", alt: "Florales Tischarrangement" },
      { publicId: "Menu_Dinner_Fish_plate_fytvtf", alt: "Fein angerichteter Menügang" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_1_a6dsdu", alt: "Elegante Hochzeitsdekoration" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.16_1_kzd4km", alt: "Millennium Place bei Nacht beleuchtet" },
    ],
    packages: [
      {
        name: "Intime Trauung",
        price: "ab 5.000 €",
        description: "Für kleine Hochzeiten im Private Dining Room.",
        includes: [
          "Bis 30 Gäste",
          "Freie Trauung oder Empfang",
          "3-Gang-Menü oder Buffet",
          "Aperitif & Tischdekoration",
          "Persönliche Betreuung",
        ],
      },
      {
        name: "Rheingau-Hochzeit",
        price: "ab 12.000 €",
        description: "Die klassische Feier im Grand Ballroom.",
        includes: [
          "Bis 120 Gäste",
          "Freie Trauung auf der Rheinterrasse",
          "Sektempfang & 4-Gang-Menü",
          "Floristik & Dekoration",
          "Ton-, Licht- & Bühnentechnik",
          "Ablaufkoordination am Tag",
        ],
        featured: true,
      },
      {
        name: "Luxus-Hochzeit",
        price: "auf Anfrage",
        description: "Die große Feier — kompromisslos exklusiv.",
        includes: [
          "Bis 250 Gäste",
          "Exklusive Anmietung der gesamten Location",
          "Mehrgang-Galadinner & Premium-Getränke",
          "Live-Musik / Band & DJ",
          "Individuelles Dekorationskonzept",
          "Persönlicher Hochzeitsplaner",
        ],
      },
    ],
    faqs: [
      {
        question: "Wie viele Gäste können bei einer Hochzeit feiern?",
        answer:
          "Im Grand Ballroom feiern Sie mit bis zu 250 Gästen, auf der Rheinterrasse mit bis zu 120 und in den Private Dining Rooms mit bis zu 30 Gästen.",
      },
      {
        question: "Sind freie Trauungen direkt vor Ort möglich?",
        answer:
          "Ja. Freie Trauungen finden bei schönem Wetter auf der Rheinterrasse mit Blick auf den Rhein statt, alternativ stimmungsvoll im Innenbereich. Gerne empfehlen wir erfahrene Trauredner.",
      },
      {
        question: "Können wir das Menü individuell gestalten?",
        answer:
          "Unser Küchenchef komponiert Ihr Hochzeitsmenü ganz nach Ihren Wünschen. Allergien, kulturelle und religiöse Speisevorschriften sowie vegetarische und vegane Wünsche berücksichtigen wir selbstverständlich.",
      },
      {
        question: "Wie früh sollten wir unseren Termin reservieren?",
        answer:
          "Für Hochzeiten in der Hauptsaison (Mai bis September) empfehlen wir eine Reservierung 12 bis 18 Monate im Voraus. Da Millennium Place 2026 eröffnet, sichern Sie sich jetzt die besten Termine zu Eröffnungskonditionen.",
      },
    ],
    related: [
      { label: "Firmenveranstaltungen", href: "/events/firmenveranstaltungen" },
      { label: "Galerie ansehen", href: "/#galerie" },
      { label: "Pakete & Preise", href: "/#preise" },
      { label: "Event anfragen", href: "/#kontakt" },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "firmenveranstaltungen",
    nav: "Firmenevents",
    title: "Firmenveranstaltungen im Rheingau",
    metaTitle: "Firmenevents & Tagungen im Rheingau | Eventlocation am Rhein",
    metaDescription:
      "Firmenfeiern, Galas, Konferenzen & Tagungen mit Niveau: Millennium Place ist Ihre Premium-Eventlocation im Rheingau für bis zu 250 Personen — moderne Technik, Catering & Full-Service. Jetzt anfragen.",
    heroImage: "Saal_Millennium_mxbpw9",
    eyebrow: "Business Events",
    heroHeadline: "Geschäftliche Anlässe, die in Erinnerung bleiben",
    heroSubline:
      "Von der Konferenz über die Produktpräsentation bis zur glanzvollen Firmengala — eine Location, die Professionalität und Premium-Ambiente verbindet.",
    intro:
      "Millennium Place ist eine Premium-Eventlocation im Rheingau für Firmenveranstaltungen jeder Art: Tagungen, Konferenzen, Kundenevents, Mitarbeiterfeiern, Galas und Weihnachtsfeiern für bis zu 250 Personen. Moderne Veranstaltungstechnik, exzellentes Catering und ein erfahrenes Team sorgen für einen reibungslosen Ablauf — mit dem Rhein als außergewöhnlicher Kulisse.",
    audience: {
      title: "Für Unternehmen mit Anspruch",
      text: "Ob mittelständisches Unternehmen, Konzern, Verband oder Agentur — wir schaffen den passenden Rahmen für Ihre Botschaft. Eine repräsentative Location abseits des Konferenzhotel-Alltags, die Ihre Gäste, Kunden und Mitarbeitenden beeindruckt und Ihre Marke wirken lässt.",
    },
    benefits: [
      {
        title: "Repräsentatives Ambiente",
        text: "Eine Location, die Eindruck macht — für Kundenevents, Jubiläen und Präsentationen, die Ihre Marke unterstreichen.",
      },
      {
        title: "Tagungstechnik inklusive",
        text: "Beamer, Großbild, professionelle Tontechnik, Bühne und schnelles WLAN — technisch bestens ausgestattet.",
      },
      {
        title: "Flexible Raumkonzepte",
        text: "Vom Konferenz-Setup für 50 bis zur Gala für 250 Personen — Bestuhlung und Räume passen sich Ihrem Format an.",
      },
      {
        title: "Catering & Service",
        text: "Business-Lunch, Flying Buffet oder festliches Galadinner aus unserer Steakhouse-Küche — inkl. Servicepersonal.",
      },
    ],
    process: [
      {
        step: "Briefing",
        text: "Wir klären Ziel, Format, Teilnehmerzahl und Termin Ihrer Veranstaltung.",
      },
      {
        step: "Raum- & Technikkonzept",
        text: "Wir planen Bestuhlung, Technik, Ablauf und Catering passend zu Ihrem Anlass.",
      },
      {
        step: "Koordination",
        text: "Zeitplan, Referenten, Dienstleister und Logistik werden abgestimmt und vorbereitet.",
      },
      {
        step: "Durchführung",
        text: "Ein fester Ansprechpartner sorgt am Veranstaltungstag für einen reibungslosen Ablauf.",
      },
    ],
    equipment: [
      "Grand Ballroom für bis zu 250 Personen",
      "Flexible Bestuhlung (Reihen, Bankett, Konferenz, Empfang)",
      "Beamer, Großbild & professionelle Tontechnik",
      "Bühne & Rednerpult mit Mikrofonanlage",
      "Schnelles WLAN für alle Gäste",
      "Tageslicht & Rheinblick",
      "Garderobe & Empfangsbereich",
      "Kostenfreie Parkplätze & Shuttle-Service auf Anfrage",
    ],
    gallery: [
      { publicId: "konferenz_2026_sitzung_wl8p1w", alt: "Konferenzsaal mit Tagungsbestuhlung" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.17_3_z6k3mg", alt: "Meeting- und Tagungssituation" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.33_1_b08gcv", alt: "Festliche Abendveranstaltung" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.18_3_zijfe0", alt: "Bühne mit professioneller Beleuchtung" },
      { publicId: "Buffet_Millenium_1_rkfrjx", alt: "Exklusives Catering-Buffet" },
      { publicId: "WhatsApp_Image_2026-05-30_at_21.29.35_br4hrq", alt: "Stimmungsvolle Gala-Beleuchtung" },
    ],
    packages: [
      {
        name: "Tagung & Konferenz",
        price: "ab 5.000 €",
        description: "Der professionelle Rahmen für Ihr Meeting.",
        includes: [
          "Halbtags oder ganztags",
          "Konferenzbestuhlung & Technik",
          "Tagungsgetränke & Pausensnacks",
          "Business-Lunch",
          "Persönliche Betreuung",
        ],
      },
      {
        name: "Firmenfeier & Gala",
        price: "ab 15.000 €",
        description: "Glanzvolle Abende für Team und Kunden.",
        includes: [
          "Bis 250 Personen",
          "Sektempfang & Galadinner",
          "Bühne, Licht- & Tontechnik",
          "DJ oder Live-Musik",
          "Dekorationskonzept",
          "Ablaufkoordination am Abend",
        ],
        featured: true,
      },
      {
        name: "Weihnachtsfeier",
        price: "auf Anfrage",
        description: "Der festliche Jahresabschluss am Rhein.",
        includes: [
          "Individuelle Gruppengröße",
          "Festliches Menü oder Buffet",
          "Winterliche Dekoration",
          "Unterhaltungsprogramm auf Wunsch",
          "Getränkepauschalen verfügbar",
        ],
      },
    ],
    faqs: [
      {
        question: "Für wie viele Personen ist die Location geeignet?",
        answer:
          "Für Tagungen ab etwa 20 Personen bis zu Galas und Firmenfeiern mit 250 Gästen. Die Bestuhlung passen wir flexibel an Ihr Format an.",
      },
      {
        question: "Welche Veranstaltungstechnik steht zur Verfügung?",
        answer:
          "Beamer und Großbild, professionelle Tontechnik, Bühne mit Rednerpult und Mikrofonanlage sowie schnelles WLAN. Spezielle Technikwünsche organisieren wir auf Anfrage.",
      },
      {
        question: "Bieten Sie Catering für Geschäftsveranstaltungen an?",
        answer:
          "Ja, von Business-Lunch und Pausensnacks über Flying Buffets bis zum festlichen Galadinner aus unserer Steakhouse-Küche — inklusive Servicepersonal und Getränkepauschalen.",
      },
      {
        question: "Sind Weihnachtsfeiern und Jahresabschlüsse möglich?",
        answer:
          "Sehr gerne. Für die Weihnachtszeit bieten wir festliche Menüs, winterliche Dekoration und Unterhaltungsprogramme. Beliebte Termine im Dezember sollten frühzeitig reserviert werden.",
      },
    ],
    related: [
      { label: "Hochzeiten", href: "/events/hochzeiten" },
      { label: "Galerie ansehen", href: "/#galerie" },
      { label: "Pakete & Preise", href: "/#preise" },
      { label: "Event anfragen", href: "/#kontakt" },
    ],
  },
];

export const eventSlugs = events.map((e) => e.slug);

export function getEvent(slug: string): EventContent | undefined {
  return events.find((e) => e.slug === slug);
}

```

### `src/lib/schema.ts`

```ts
/**
 * Baut das vollständige Schema.org-Markup als verknüpften @graph.
 *
 * Statt mehrerer isolierter JSON-LD-Blöcke verwenden wir einen @graph mit
 * @id-Referenzen. So versteht Google (und LLMs wie ChatGPT/Perplexity), dass
 * Organization, WebSite, Venue, Restaurant und FAQ zur selben Entität gehören.
 */

import { business, eventTypes, faqs, legal, reviews, SITE_URL } from "./business";
import type { EventContent } from "./events";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const VENUE_ID = `${SITE_URL}/#venue`;
const PLACE_ID = `${SITE_URL}/#place`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: business.address.street,
  addressLocality: business.address.locality,
  postalCode: business.address.postalCode,
  addressRegion: business.address.region,
  addressCountry: business.address.country,
};

const geoCoordinates = {
  "@type": "GeoCoordinates",
  latitude: business.geo.latitude,
  longitude: business.geo.longitude,
};

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // ── Organisation ────────────────────────────────────────────────
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: business.name,
        legalName: business.legalName,
        url: SITE_URL,
        slogan: business.slogan,
        description: business.description,
        email: business.email,
        logo: `${SITE_URL}${business.ogImage}`,
        image: `${SITE_URL}${business.ogImage}`,
        address: postalAddress,
        areaServed: business.areaServed,
        knowsLanguage: business.languages,
        telephone: legal.phone,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Reservierungen & Event-Anfragen",
          email: business.email,
          telephone: legal.phone,
          availableLanguage: business.languages,
          areaServed: "DE",
        },
      },

      // ── Website ─────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: business.name,
        inLanguage: "de-DE",
        publisher: { "@id": ORG_ID },
      },

      // ── Eventlocation & Restaurant (LocalBusiness) ──────────────────
      {
        "@type": ["EventVenue", "Restaurant", "LocalBusiness"],
        "@id": VENUE_ID,
        name: business.name,
        description: business.description,
        url: SITE_URL,
        image: `${SITE_URL}${business.ogImage}`,
        email: business.email,
        telephone: legal.phone,
        parentOrganization: { "@id": ORG_ID },
        address: postalAddress,
        geo: geoCoordinates,
        hasMap: business.googleReviewsUrl,
        servesCuisine: business.cuisines,
        priceRange: business.priceRange,
        currenciesAccepted: "EUR",
        areaServed: business.areaServed,
        knowsLanguage: business.languages,
        maximumAttendeeCapacity: business.maximumAttendeeCapacity,
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Rheinblick", value: true },
          { "@type": "LocationFeatureSpecification", name: "Kostenlose Parkplätze", value: true },
          { "@type": "LocationFeatureSpecification", name: "Rheinterrasse", value: true },
          { "@type": "LocationFeatureSpecification", name: "Grand Ballroom", value: true },
          { "@type": "LocationFeatureSpecification", name: "Private Dining Rooms", value: true },
          { "@type": "LocationFeatureSpecification", name: "Full-Service Event-Planung", value: true },
          { "@type": "LocationFeatureSpecification", name: "Barrierefreier Zugang", value: true },
        ],
        // Voraussichtliches Eröffnungsdatum
        foundingDate: business.openingDate,
        // Veranstaltungsangebot
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Veranstaltungsarten",
          itemListElement: eventTypes.map((type) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: type },
          })),
        },
        // Echte Google-Gesamtbewertung
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: business.rating.value,
          reviewCount: business.rating.count,
          bestRating: business.rating.best,
          worstRating: 1,
        },
        // Einzelne, verifizierte Rezensionen
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: r.quote,
        })),
      },

      // ── Ort ─────────────────────────────────────────────────────────
      {
        "@type": "Place",
        "@id": PLACE_ID,
        name: `${business.name} — ${business.address.locality}`,
        address: postalAddress,
        geo: geoCoordinates,
      },

      // ── FAQ ─────────────────────────────────────────────────────────
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

/**
 * Baut das Schema für eine einzelne Event-Landingpage:
 * BreadcrumbList + Service (verknüpft mit der Venue) + FAQPage.
 */
const CLOUDINARY_BASE =
  "https://res.cloudinary.com/djrfxgvny/image/upload";

export function buildEventJsonLd(event: EventContent) {
  const pageUrl = `${SITE_URL}/events/${event.slug}`;
  const images = [event.heroImage, ...event.gallery.map((g) => g.publicId)].map(
    (id) => `${CLOUDINARY_BASE}/${id}`,
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Start", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: event.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        name: event.title,
        serviceType: event.nav,
        description: event.metaDescription,
        url: pageUrl,
        image: images,
        provider: { "@id": VENUE_ID },
        areaServed: business.areaServed,
        availableLanguage: business.languages,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${event.title} — Pakete`,
          itemListElement: event.packages.map((p) => ({
            "@type": "Offer",
            name: p.name,
            description: p.description,
            priceCurrency: "EUR",
            itemOffered: { "@type": "Service", name: p.name },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: event.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

```

### `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        gold: {
          50: "#fdf8ef",
          100: "#f5ebd4",
          200: "#e8d5a3",
          300: "#d4ba6e",
          400: "#c9a84c",
          500: "#b8942e",
          600: "#a07a24",
          700: "#86631f",
          800: "#6e4f1e",
          900: "#5a3f1c",
        },
        midnight: {
          50: "#f4f6f7",
          100: "#e2e8eb",
          200: "#c8d4d9",
          300: "#a1b5be",
          400: "#738e9b",
          500: "#587380",
          600: "#4b606d",
          700: "#41515b",
          800: "#3a464e",
          900: "#1a1f24",
          950: "#0d1114",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```
