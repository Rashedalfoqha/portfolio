export type VibeId = "cyberpunk" | "minimal" | "glass" | "retro";

export type Vibe = {
  id: VibeId;
  number: string;
  name: string;
  mood: string;
  invitation: string;
  headline: [string, string];
  shortName: string;
  accent: string;
  colorScheme: "light" | "dark";
};

export type ProjectIconKey =
  | "operations"
  | "plugin"
  | "package"
  | "realtime"
  | "social"
  | "search"
  | "learning";

export type Project = {
  number: string;
  name: string;
  label: string;
  line: string;
  story: string;
  proof: string[];
  tech: string[];
  icon: ProjectIconKey;
  href?: string;
  linkLabel?: string;
};

export type Capability = {
  kind: string;
  name: string;
  note: string;
  skills: string[];
};

export type ProcessStep = readonly [
  number: string,
  title: string,
  description: string,
];
