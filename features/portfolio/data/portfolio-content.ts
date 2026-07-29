import type {
  Capability,
  ProcessStep,
  Project,
  Vibe,
  VibeId,
} from "../types";

export const VIBE_STORAGE_KEY = "rashed-portfolio-vibe";

export const vibes: Vibe[] = [
  {
    id: "quiet",
    number: "01",
    name: "Quiet Artifact",
    mood: "Editorial · Calm · Precise",
    invitation: "Give the work room to speak.",
    headline: ["I design systems", "that behave."],
  },
  {
    id: "system",
    number: "02",
    name: "System Override",
    mood: "Terminal · Direct · Technical",
    invitation: "Read the engineer through the system.",
    headline: ["Full-stack.", "No black boxes."],
  },
  {
    id: "geometry",
    number: "03",
    name: "Living Geometry",
    mood: "Pattern · Motion · Origin",
    invitation: "Follow the pattern into the product.",
    headline: ["From pattern", "to product."],
  },
  {
    id: "playground",
    number: "04",
    name: "Product Playground",
    mood: "Curious · Bold · Experimental",
    invitation: "Open the lab. Touch everything.",
    headline: ["Curiosity", "ships."],
  },
];

export const vibeThemes: Record<
  VibeId,
  { color: string; scheme: "light" | "dark" }
> = {
  quiet: { color: "#f4f0e7", scheme: "light" },
  system: { color: "#050806", scheme: "dark" },
  geometry: { color: "#e8dfd0", scheme: "light" },
  playground: { color: "#f7f1df", scheme: "light" },
};

export const featuredProjects: Project[] = [
  {
    number: "01",
    name: "EV Solution JO",
    label: "OPERATIONS PLATFORM",
    line: "One view for a moving network.",
    story:
      "A solo full-stack build for managing DC and AC charging operations. I shaped the interface, services, data, and live monitoring into one clear operating surface.",
    proof: [
      "Live station and session monitoring",
      "Usage and performance reporting",
      "End-to-end product delivery",
    ],
    tech: ["React", "Node.js", "MongoDB", "PostgreSQL"],
    icon: "operations",
    href: "https://evsjo.com/home",
    linkLabel: "Open live product",
  },
  {
    number: "02",
    name: "Booster Icon System",
    label: "DEVELOPER TOOLING",
    line: "25,396 files. One controlled pipeline.",
    story:
      "A framework-agnostic SVG package and local operations dashboard. It turns a large Figma-sourced library into safe direct imports while keeping validation and releases explicit.",
    proof: [
      "25,396 SVG files · 4,154 names · 7 styles",
      "Security, naming, parity, and runtime gates",
      "ESM, CommonJS, TypeScript, SVG, and .tgz outputs",
    ],
    tech: ["TypeScript", "Node.js", "Next.js", "SVG", "SVGO"],
    icon: "package",
    linkLabel: "Local build · release gated",
  },
  {
    number: "03",
    name: "Figma Design Intelligence",
    label: "FIGMA PLUGIN",
    line: "The design travels with its logic intact.",
    story:
      "A plugin that reads a Figma file as structured design intelligence instead of a flat screenshot, capturing its system, prototype graph, Smart Animate relationships, and motion metadata.",
    proof: [
      "Design-system structure extraction",
      "Prototype graph and Smart Animate capture",
      "Motion and interaction metadata",
    ],
    tech: ["Figma Plugin API", "TypeScript", "Design Systems", "Smart Animate"],
    icon: "plugin",
    linkLabel: "Private build · case study soon",
  },
];

export const archiveProjects: Project[] = [
  {
    number: "04",
    name: "Tickln",
    label: "REAL-TIME WORKSPACE",
    line: "Tasks and context in one live flow.",
    story:
      "Team collaboration with live task tracking, role-aware workflows, and real-time messaging.",
    proof: [],
    tech: ["Next.js", "React", "PostgreSQL", "Socket.IO"],
    icon: "realtime",
    href: "https://github.com/Not2Null/NotNullBoards",
  },
  {
    number: "05",
    name: "NotNull Social Space",
    label: "SOCIAL PLATFORM",
    line: "A responsive social product with live conversation.",
    story:
      "Authentication, posts, social relationships, notifications, and real-time chat.",
    proof: [],
    tech: ["React", "Express", "PostgreSQL", "Socket.IO", "Firebase"],
    icon: "social",
    href: "https://github.com/not6null/NotNull",
  },
  {
    number: "06",
    name: "RA Job Search",
    label: "SEARCH PRODUCT",
    line: "A shorter path from discovery to action.",
    story: "Skill matching, filters, job details, profiles, and protected actions.",
    proof: [],
    tech: ["React", "Express", "MongoDB", "JWT"],
    icon: "search",
    href: "https://github.com/C9-Rashedalfoqha/RA-Job",
  },
  {
    number: "07",
    name: "Course Management",
    label: "RBAC PLATFORM",
    line: "A different, clear flow for every role.",
    story:
      "Course creation, enrollment, authentication, and role-specific access for teachers and students.",
    proof: [],
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Firebase"],
    icon: "learning",
    href: "https://github.com/Rashedalfoqha/managementCourses",
  },
];

export const capabilities: Capability[] = [
  {
    kind: "frontend",
    name: "Product interfaces",
    note: "Responsive UI, state, and systems people can understand.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Redux",
      "SCSS",
      "Tailwind CSS",
      "Material UI",
    ],
  },
  {
    kind: "backend",
    name: "Services & realtime",
    note: "APIs, access control, and behavior behind the interface.",
    skills: [
      "Node.js",
      "NestJS",
      "Express.js",
      "REST APIs",
      "Socket.IO",
      "Authentication",
      "RBAC",
    ],
  },
  {
    kind: "data",
    name: "Data & delivery",
    note: "From the schema to the environment where the product runs.",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Docker",
      "Git",
      "GitHub",
      "Postman",
    ],
  },
  {
    kind: "tooling",
    name: "Developer systems",
    note: "Tools that make design and engineering work repeatable.",
    skills: [
      "Figma Plugin API",
      "Design Systems",
      "SVG pipelines",
      "Package architecture",
      "Build validation",
    ],
  },
  {
    kind: "growing",
    name: "Expanding layer",
    note: "Deliberately growing beyond the core stack.",
    skills: ["Python", "Microservices (emerging)"],
  },
];

export const processSteps: ProcessStep[] = [
  ["01", "Define", "Clarify the user need, constraints, and evidence of success."],
  [
    "02",
    "Plan",
    "Choose the simplest architecture and test the risky assumptions early.",
  ],
  [
    "03",
    "Build",
    "Move in readable increments across interface, service, and data.",
  ],
  [
    "04",
    "Verify",
    "Review the diff, test the behavior, and challenge AI-assisted output.",
  ],
];

export function isVibeId(value: string | null): value is VibeId {
  return vibes.some((vibe) => vibe.id === value);
}
