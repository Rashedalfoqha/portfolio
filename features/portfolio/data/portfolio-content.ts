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
    id: "system",
    number: "01",
    name: "Aurora Field",
    mood: "Luminous · Organic · Immersive",
    invitation: "Explore the work through light, depth, and fluid movement.",
    headline: ["Full-stack software,", "built carefully."],
  },
  {
    id: "geometry",
    number: "02",
    name: "Machine Moderne",
    mood: "Art Deco · Geometric · Precise",
    invitation: "A structured view shaped by geometry and precise spacing.",
    headline: ["Clear systems.", "Reliable delivery."],
  },
  {
    id: "quiet",
    number: "03",
    name: "Clear Space",
    mood: "Minimal · Editorial · Exact",
    invitation: "A quiet view focused on the work and its technical scope.",
    headline: ["Software that", "holds up."],
  },
  {
    id: "playground",
    number: "04",
    name: "Beautiful Noise",
    mood: "Maximal · Layered · Restless",
    invitation: "A louder view with layered type, color, and movement.",
    headline: ["Interfaces, APIs,", "and everything between."],
  },
];

export const vibeThemes: Record<
  VibeId,
  { color: string; scheme: "light" | "dark" }
> = {
  system: { color: "#071217", scheme: "dark" },
  geometry: { color: "#11100f", scheme: "dark" },
  quiet: { color: "#f4f3ef", scheme: "light" },
  playground: { color: "#f4ff42", scheme: "light" },
};

export const featuredProjects: Project[] = [
  {
    number: "01",
    name: "EV Solution JO",
    label: "OPERATIONS PLATFORM",
    line: "Monitoring and reporting for EV charging operations.",
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
    line: "A controlled pipeline for 25,396 SVG files.",
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
    line: "Extracting structure, prototypes, and motion from Figma.",
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
    line: "Live task tracking and team communication.",
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
    line: "Posts, relationships, notifications, and live chat.",
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
    line: "Job search with skill matching and practical filters.",
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
    line: "Course and enrollment flows with role-based access.",
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
    note: "Responsive interfaces, application state, and reusable UI systems.",
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
    note: "APIs, access control, and real-time application behavior.",
    skills: [
      "Node.js",
      "NestJS",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Socket.IO",
      "Authentication",
      "RBAC",
    ],
  },
  {
    kind: "data",
    name: "Data & delivery",
    note: "Databases, local environments, source control, and API delivery.",
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
    note: "Plugins and build pipelines with explicit validation steps.",
    skills: [
      "Figma Plugin API",
      "Design Systems",
      "SVG pipelines",
      "Icon package architecture",
      "Build validation",
    ],
  },
  {
    kind: "growing",
    name: "Expanding layer",
    note: "Skills I am developing alongside the core JavaScript stack.",
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
