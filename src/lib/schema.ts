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
