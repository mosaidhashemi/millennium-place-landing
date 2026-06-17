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
