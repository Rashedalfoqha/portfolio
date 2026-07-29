export type SchemaLanguage = "en";

const chapters = [
  ["experience", "Software experience", "Software Engineer at GoldenTik (formerly CartBuzz), freelance full-stack delivery, and intensive full-stack training."],
  ["work", "Selected work", "Seven software products spanning full-stack delivery, Figma developer tooling, and SVG package engineering."],
  ["method", "Engineering process", "A clear AI-augmented workflow: define, plan, build, and verify."],
  ["stack", "Technical skills", "Frontend, backend, data, delivery, AI workflow, and growing skills."],
  ["origin", "Design background", "How Islamic arts, ornamental architecture, and CAD support clear software design."],
  ["contact", "Contact", "Contact Rashed for remote software roles or clearly scoped freelance work."],
] as const;

const projectWorks = [
  ["EV Solution JO", "SoftwareApplication", "https://evsjo.com/home", "A web platform for DC and AC charging operations, live dashboards, reports, and analytics.", ["EV operations", "Dashboards", "Analytics"]],
  ["Booster Icon System", "SoftwareApplication", null, "A framework-agnostic SVG package and operations dashboard for validating, editing, searching, and packaging 25,396 SVG files.", ["SVG package", "Developer tooling", "SVGO", "TypeScript", "ESM", "CommonJS"]],
  ["Figma Design Intelligence Plugin", "SoftwareApplication", null, "A Figma plugin that captures design-system structure, Smart Animate relationships, prototype graphs, and motion metadata.", ["Figma Plugin API", "Design systems", "Smart Animate", "Developer tooling"]],
  ["Tickln", "SoftwareSourceCode", "https://github.com/Not2Null/NotNullBoards", "A real-time team workspace with contextual tickets, roles, permissions, and live events.", ["Team collaboration", "Socket.IO", "PostgreSQL"]],
  ["NotNull Social Space", "SoftwareSourceCode", "https://github.com/not6null/NotNull", "A responsive social platform for publishing, relationships, notifications, and live chat.", ["Social platform", "Live chat", "PostgreSQL"]],
  ["RA Job Search", "SoftwareSourceCode", "https://github.com/C9-Rashedalfoqha/RA-Job", "A job search product with listings, filters, profiles, and protected actions.", ["Job search", "JWT", "MongoDB"]],
  ["Course Management System", "SoftwareSourceCode", "https://github.com/Rashedalfoqha/managementCourses", "A role-based course platform with teacher and student workflows.", ["Course management", "RBAC", "PostgreSQL"]],
] as const;

export function createChapterParts(pageUrl: string, language: SchemaLanguage, personId: string) {
  return chapters.map(([id, name, description], index) => ({
    "@type": "WebPageElement",
    "@id": `${pageUrl}#${id}`,
    url: `${pageUrl}#${id}`,
    name,
    description,
    position: index + 1,
    inLanguage: language,
    ...(id === "contact" ? { about: { "@id": personId } } : {}),
  }));
}

export function createProjectList(pageUrl: string, language: SchemaLanguage) {
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#selected-projects`,
    name: "Selected software projects",
    numberOfItems: projectWorks.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    inLanguage: language,
    itemListElement: projectWorks.map(([name, type, url, description, keywords], index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": type,
        "@id": `${pageUrl}#project-${String(index + 1).padStart(2, "0")}`,
        name,
        url: url ?? `${pageUrl}#project-${String(index + 1).padStart(2, "0")}`,
        description,
        keywords,
        inLanguage: language,
        ...(type === "SoftwareApplication"
          ? name === "Figma Design Intelligence Plugin" || name === "Booster Icon System"
            ? { applicationCategory: "DeveloperApplication", operatingSystem: name === "Figma Design Intelligence Plugin" ? "Figma" : "Cross-platform" }
            : { applicationCategory: "BusinessApplication", operatingSystem: "Web" }
          : { codeRepository: url }),
      },
    })),
  };
}
