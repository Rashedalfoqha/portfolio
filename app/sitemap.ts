import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = "https://rashed-alfuqaha-portfolio.rashedalfoqha002.chatgpt.site";
  return [
    {
      url: home,
      lastModified: new Date("2026-07-21"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: home, "x-default": home } },
    },
  ];
}
