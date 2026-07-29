import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Quiet Artifact portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  const html = await response.text();
  assert.match(html, /<html lang="en" dir="ltr">/);
  assert.match(html, /I design systems/);
  assert.match(html, /<em>that behave\./);
  assert.match(html, /SOFTWARE ENGINEER/);
  assert.match(html, /AMMAN → REMOTE/);
  assert.match(html, /Interactive geometric system/);
  assert.equal((html.match(/Pattern cell /g) ?? []).length, 12);
  assert.match(html, /~\/rashed\/portrait\.webp/);
  assert.match(html, /How do you want/);
  assert.match(html, /<em>meet me\?/);
  for (const vibe of ["Quiet Artifact", "System Override", "Living Geometry", "Product Playground"]) {
    assert.match(html, new RegExp(vibe));
  }
  assert.equal((html.match(/class="vibe-option vibe-option-/g) ?? []).length, 4);
  assert.match(html, /class="vibe-atmosphere vibe-atmosphere-quiet"/);
  assert.match(html, /data-vibe="quiet"/);
  assert.doesNotMatch(html, /FIELD NOTE|hero-foot/);
});

test("renders seven truthful projects with three detailed case studies", async () => {
  const html = await (await render()).text();
  for (const project of [
    "EV Solution JO",
    "Booster Icon System",
    "Figma Design Intelligence",
    "Tickln",
    "NotNull Social Space",
    "RA Job Search",
    "Course Management",
  ]) assert.match(html, new RegExp(project));
  assert.equal((html.match(/class="project-card is-open"|class="project-card "/g) ?? []).length, 3);
  assert.match(html, /25,396 SVG files · 4,154 names · 7 styles/);
  assert.match(html, /Smart Animate/);
  assert.match(html, /solo full-stack build/i);
  assert.doesNotMatch(html, /React Native/i);
});

test("keeps the AI workflow human-owned", async () => {
  const html = await (await render()).text();
  assert.match(html, /AI helps\./);
  assert.match(html, /I decide\./);
  assert.match(html, /Architecture, review, testing, and the final call remain mine/);
  for (const step of ["Define", "Plan", "Build", "Verify"]) assert.match(html, new RegExp(`<h3>${step}<\\/h3>`));
  for (const tool of ["Codex", "Claude", "Cursor", "GLM"]) assert.match(html, new RegExp(tool));
});

test("renders verified experience, skills, and origin without private data", async () => {
  const html = await (await render()).text();
  assert.match(html, /GoldenTik/);
  assert.match(html, /formerly CartBuzz/);
  assert.match(html, /JAN 2026 - PRESENT/);
  assert.match(html, /Next\.js, NestJS, TypeScript, SCSS, and Docker/);
  assert.match(html, /Independent \+ Vero IT/);
  assert.match(html, /MERAKI Academy/);
  assert.match(html, /Islamic Arts and ornamental architecture/);
  for (const skill of ["TypeScript", "Socket.IO", "PostgreSQL", "Figma Plugin API", "Python", "Microservices (emerging)"]) {
    assert.match(html, new RegExp(skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const language of ["Arabic", "English", "Turkish"]) assert.match(html, new RegExp(language));
  assert.doesNotMatch(html, /0771709080|\+962\s?771709080/);
});

test("ships accurate metadata and structured data", async () => {
  const html = await (await render()).text();
  assert.match(html, /<title>Rashed Alfuqaha - Full-Stack Software Engineer<\/title>/);
  assert.match(html, /og-four-signals\.png/);
  assert.match(html, /#eeeae2/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
  const profile = schemas.find((schema) => schema["@type"] === "ProfilePage");
  assert.equal(profile.inLanguage, "en");
  assert.equal(profile.hasPart.at(-1).numberOfItems, 7);
});

test("includes responsive spacing, clear mono details, and motion safeguards", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /--mono: "JetBrains Mono Variable"/);
  assert.match(css, /--page: min\(1320px/);
  assert.match(css, /\.project-detail \{ display: grid; grid-template-rows: 0fr/);
  assert.match(css, /\.capability-grid/);
  assert.match(css, /\.artifact button\.is-active/);
  assert.match(css, /main\[data-vibe="system"\]/);
  assert.match(css, /main\[data-vibe="geometry"\]/);
  assert.match(css, /main\[data-vibe="playground"\]/);
  assert.match(css, /main\[data-vibe="system"\] \.site-header/);
  assert.match(css, /main\[data-vibe="geometry"\] \.project-list/);
  assert.match(css, /main\[data-vibe="playground"\] \.timeline/);
  assert.match(css, /\.vibe-atmosphere-system/);
  for (const family of ["Fraunces Variable", "JetBrains Mono Variable", "Unbounded Variable", "Bricolage Grotesque Variable"]) {
    assert.match(css, new RegExp(family));
  }
  assert.match(css, /@keyframes system-scan/);
  assert.match(css, /@keyframes geometry-spin/);
  assert.match(css, /@keyframes playground-float/);
  assert.match(css, /\.vibe-welcome\.is-visible/);
  assert.match(css, /overscroll-behavior: contain/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /prefers-reduced-motion/);
});
