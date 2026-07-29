import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const outputDirectory = new URL("../dist/", import.meta.url);

async function readOutputAssets(extension) {
  const assetDirectory = new URL("assets/", outputDirectory);
  const names = (await readdir(assetDirectory)).filter((name) =>
    name.endsWith(extension),
  );
  return Promise.all(
    names.map((name) => readFile(new URL(name, assetDirectory), "utf8")),
  ).then((files) => files.join("\n"));
}

test("builds a Vite document with accurate portfolio metadata", async () => {
  const html = await readFile(new URL("index.html", outputDirectory), "utf8");
  assert.match(html, /<html lang="en" dir="ltr">/);
  assert.match(
    html,
    /<title>Rashed Alfuqaha - Full-Stack Software Engineer<\/title>/,
  );
  assert.match(html, /og-four-signals\.png/);
  assert.match(html, /manifest\.webmanifest/);
  assert.doesNotMatch(html, /portfolio\.example/);
  assert.match(html, /type="module"/);
});

test("preserves the complete portfolio content in the production bundle", async () => {
  const javascript = await readOutputAssets(".js");
  for (const text of [
    "Full-stack.",
    "No black boxes.",
    "I design systems",
    "Logic can feel",
    "Press start.",
    "SOFTWARE ENGINEER",
    "Tech Terminal",
    "Swiss Signal",
    "Liquid Interface",
    "Arcade Quest",
    "Reactive terminal portrait visualization",
    "Interactive geometric engineering mesh",
    "Interactive liquid engineering sphere",
    "Animated pixel engineer character",
    "GoldenTik",
    "formerly CartBuzz",
    "EV Solution JO",
    "Booster Icon System",
    "Figma Design Intelligence",
    "Tickln",
    "NotNull Social Space",
    "RA Job Search",
    "Course Management",
    "AI helps.",
    "I decide.",
    "Architecture, review, testing, and the final call remain mine",
    "Islamic Arts and ornamental architecture",
  ]) {
    assert.match(javascript, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(javascript, /0771709080|\+962\s?771709080/);
});

test("preserves all four visual systems and motion safeguards", async () => {
  const css = await readOutputAssets(".css");
  assert.match(css, /JetBrains Mono Variable/);
  assert.match(css, /Outfit Variable/);
  assert.match(css, /Silkscreen/);
  assert.match(css, /data-vibe=cyberpunk/);
  assert.match(css, /data-vibe=minimal/);
  assert.match(css, /data-vibe=glass/);
  assert.match(css, /data-vibe=retro/);
  assert.match(css, /cyber-hero/);
  assert.match(css, /minimal-hero/);
  assert.match(css, /glass-hero/);
  assert.match(css, /retro-hero/);
  assert.match(css, /prefers-reduced-motion/);
});

test("emits Netlify-ready fallback and crawler files", async () => {
  for (const name of [
    "404.html",
    "robots.txt",
    "sitemap.xml",
    "manifest.webmanifest",
    "rashed-mark.svg",
  ]) {
    const file = new URL(name, outputDirectory);
    assert.equal(path.extname(file.pathname).length > 0, true);
    assert.ok((await readFile(file)).byteLength > 0);
  }
});
