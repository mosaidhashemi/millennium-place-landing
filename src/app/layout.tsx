import type { Metadata } from "next";
import { Instrument_Serif, Barlow } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Millennium Place — Premium Event & Dining Destination am Rhein",
  description:
    "Ihre exklusive Premium-Eventlocation im Rheingau. Hochzeiten, Firmenfeiern, Galas, Live Events, Steakhouse & internationale Küche — ab 2026 in Lorch am Rhein.",
  keywords:
    "Eventlocation Rheingau, Hochzeitslocation am Rhein, Premium Eventlocation, Steakhouse Rheingau",
  openGraph: {
    title: "Millennium Place — Premium Event & Dining Destination am Rhein",
    description:
      "Luxus, Natur, Rheinblick und erstklassige Gastronomie. Ab 2026 im Herzen des Rheingaus.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${barlow.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
