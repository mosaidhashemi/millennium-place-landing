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
