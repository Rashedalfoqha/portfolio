import { copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputDirectory = path.join(root, "dist");
const fallbackSiteUrl =
  "https://rashed-alfuqaha-portfolio.rashedalfoqha002.chatgpt.site";
const siteUrl = new URL(
  process.env.URL ?? process.env.VITE_SITE_URL ?? fallbackSiteUrl,
);
siteUrl.pathname = "/";
siteUrl.search = "";
siteUrl.hash = "";

await copyFile(
  path.join(outputDirectory, "index.html"),
  path.join(outputDirectory, "404.html"),
);

await writeFile(
  path.join(outputDirectory, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", siteUrl).href}\n`,
  "utf8",
);

await writeFile(
  path.join(outputDirectory, "sitemap.xml"),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <url>",
    `    <loc>${siteUrl.href}</loc>`,
    "    <lastmod>2026-07-29</lastmod>",
    "    <changefreq>monthly</changefreq>",
    "    <priority>1.0</priority>",
    "  </url>",
    "</urlset>",
    "",
  ].join("\n"),
  "utf8",
);
