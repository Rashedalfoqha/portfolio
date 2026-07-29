import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap:
      "https://rashed-alfuqaha-portfolio.rashedalfoqha002.chatgpt.site/sitemap.xml",
  };
}
