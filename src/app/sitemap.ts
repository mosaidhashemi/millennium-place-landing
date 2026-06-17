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
