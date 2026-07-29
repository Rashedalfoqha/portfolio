import { copyFile, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const projectRoot = process.cwd();
const clientDirectory = path.join(projectRoot, "dist", "client");
const outputDirectory = path.join(projectRoot, "netlify-dist");
const appIconPath = path.join(projectRoot, "app", "icon.svg");
const workerUrl = pathToFileURL(
  path.join(projectRoot, "dist", "server", "index.js"),
);
workerUrl.searchParams.set("netlify-export", Date.now().toString());

const { default: worker } = await import(workerUrl.href);

const assetsBinding = {
  fetch: async () => new Response("Not found", { status: 404 }),
};

async function render(pathname) {
  return worker.fetch(
    new Request(`https://portfolio.local${pathname}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: assetsBinding },
    {
      passThroughOnException() {},
      waitUntil() {},
    },
  );
}

async function writeRenderedPage(pathname, outputName, expectedStatus) {
  const response = await render(pathname);
  if (response.status !== expectedStatus) {
    throw new Error(
      `Expected ${pathname} to return ${expectedStatus}, received ${response.status}.`,
    );
  }
  const html = await response.text();
  if (!html.includes("<!DOCTYPE html>")) {
    throw new Error(`${pathname} did not render a complete HTML document.`);
  }
  await writeFile(path.join(outputDirectory, outputName), html, "utf8");
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
await copyFile(appIconPath, path.join(outputDirectory, "icon.svg"));
await writeRenderedPage("/", "index.html", 200);
await writeRenderedPage("/__netlify-not-found__", "404.html", 404);

for (const [pathname, outputName] of [
  ["/robots.txt", "robots.txt"],
  ["/sitemap.xml", "sitemap.xml"],
  ["/manifest.webmanifest", "manifest.webmanifest"],
]) {
  const response = await render(pathname);
  if (!response.ok) {
    throw new Error(
      `Expected ${pathname} to succeed, received ${response.status}.`,
    );
  }
  await writeFile(
    path.join(outputDirectory, outputName),
    new Uint8Array(await response.arrayBuffer()),
  );
}

console.log("Netlify static export created in netlify-dist.");
process.exit(0);
