import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const clientDirectory = new URL("../dist/client/", import.meta.url);
const outputDirectory = new URL("../netlify-dist/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
const productionUrl = "https://rashedalfouqaha.netlify.app";

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request(`${productionUrl}/`, { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}`);
}

const html = await response.text();
for (const expected of ["Rashed Alfuqaha", "GoldenTik", "Basic conversational", "Vero IT"]) {
  if (!html.includes(expected)) throw new Error(`Static HTML is missing: ${expected}`);
}
if (html.includes("GraphQL")) throw new Error("Static HTML contains unverified GraphQL experience");

await Promise.all([
  writeFile(new URL("index.html", outputDirectory), html, "utf8"),
  writeFile(new URL("404.html", outputDirectory), html, "utf8"),
  writeFile(
    new URL("robots.txt", outputDirectory),
    `User-agent: *\nAllow: /\nSitemap: ${productionUrl}/sitemap.xml\n`,
    "utf8",
  ),
  writeFile(
    new URL("sitemap.xml", outputDirectory),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${productionUrl}/</loc></url></urlset>\n`,
    "utf8",
  ),
]);

console.log(`Exported verified portfolio to ${new URL("netlify-dist/", root).pathname}`);
