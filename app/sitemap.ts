import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/shared/config/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = getSiteUrl().href;
  return [
    {
      url: home,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: home, "x-default": home } },
    },
  ];
}
