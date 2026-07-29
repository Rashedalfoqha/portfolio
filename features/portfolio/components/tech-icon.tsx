import type { IconType } from "react-icons";
import {
  LuBlocks,
  LuBot,
  LuBrainCircuit,
  LuBraces,
  LuCloudCog,
  LuCodeXml,
  LuDatabase,
  LuFlaskConical,
  LuGauge,
  LuKeyRound,
  LuLockKeyhole,
  LuMonitorSmartphone,
  LuMousePointer2,
  LuNetwork,
  LuPackageCheck,
  LuPackageOpen,
  LuPalette,
  LuPanelsTopLeft,
  LuPlugZap,
  LuRadioTower,
  LuScanSearch,
  LuServerCog,
  LuShieldCheck,
  LuSparkles,
  LuWorkflow,
} from "react-icons/lu";
import {
  SiClaude,
  SiBootstrap,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiJavascript,
  SiHtml5,
  SiJquery,
  SiMongodb,
  SiMui,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedux,
  SiSass,
  SiSocketdotio,
  SiSvgo,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import type { ProjectIconKey } from "../types";

const technologyIcons: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  SCSS: SiSass,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Redux: SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "Material UI": SiMui,
  Bootstrap: SiBootstrap,
  jQuery: SiJquery,
  "Responsive UI": LuMonitorSmartphone,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  Express: SiExpress,
  NestJS: SiNestjs,
  "REST APIs": LuPlugZap,
  "Socket.IO": SiSocketdotio,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,
  Docker: SiDocker,
  Linux: LuServerCog,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  "VS Code": VscCode,
  Authentication: LuKeyRound,
  RBAC: LuLockKeyhole,
  "Real-Time Systems": LuRadioTower,
  "API Development": LuPlugZap,
  "Database Design": LuDatabase,
  SaaS: LuCloudCog,
  "Figma Plugin API": SiFigma,
  "Design Systems": LuPalette,
  "Smart Animate": LuSparkles,
  "SVG pipelines": LuWorkflow,
  SVG: LuCodeXml,
  SVGO: SiSvgo,
  "Package architecture": LuPackageOpen,
  "ESM / CommonJS": LuBraces,
  "Generated TypeScript types": SiTypescript,
  "Build validation": LuShieldCheck,
  Claude: SiClaude,
  Codex: SiOpenai,
  Cursor: LuMousePointer2,
  GLM: LuBrainCircuit,
  Python: SiPython,
  Microservices: LuNetwork,
  "Microservices (emerging)": LuNetwork,
  JWT: LuKeyRound,
};

const groupIcons: Record<string, IconType> = {
  frontend: LuPanelsTopLeft,
  backend: LuServerCog,
  data: LuDatabase,
  devops: LuCloudCog,
  systems: LuBlocks,
  tooling: LuPackageCheck,
  ai: LuBot,
  growing: LuFlaskConical,
};

const projectIcons: Record<ProjectIconKey, IconType> = {
  operations: LuGauge,
  plugin: LuPlugZap,
  package: LuPackageOpen,
  realtime: LuRadioTower,
  social: LuNetwork,
  search: LuScanSearch,
  learning: LuBlocks,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = technologyIcons[name] ?? LuCodeXml;
  return <Icon className={className} aria-hidden="true" focusable="false" />;
}

export function SkillGroupIcon({ kind }: { kind: string }) {
  const Icon = groupIcons[kind] ?? LuCodeXml;
  return <Icon aria-hidden="true" focusable="false" />;
}

export function ProjectIcon({ kind }: { kind: ProjectIconKey }) {
  const Icon = projectIcons[kind];
  return <Icon aria-hidden="true" focusable="false" />;
}
