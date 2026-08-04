import type { Vibe, VibeId } from "../types";
import { CapabilitiesSection } from "./capabilities-section";
import { ContactSection } from "./contact-section";
import { ExperienceSection } from "./experience-section";
import { Hero } from "./hero";
import { OriginSection } from "./origin-section";
import { ProcessSection } from "./process-section";
import { WorkSection } from "./work-section";

function AuroraLayout({ vibe }: { vibe: Vibe }) {
  return <div className="vibe-layout vibe-layout-aurora"><Hero currentVibe={vibe} /><WorkSection /><ProcessSection /><ExperienceSection /><CapabilitiesSection /><OriginSection /><ContactSection /></div>;
}

function DecoLayout({ vibe }: { vibe: Vibe }) {
  return <div className="vibe-layout vibe-layout-deco"><Hero currentVibe={vibe} /><OriginSection /><ExperienceSection /><WorkSection /><CapabilitiesSection /><ProcessSection /><ContactSection /></div>;
}

function MinimalLayout({ vibe }: { vibe: Vibe }) {
  return <div className="vibe-layout vibe-layout-minimal"><Hero currentVibe={vibe} /><ExperienceSection /><WorkSection /><CapabilitiesSection /><OriginSection /><ProcessSection /><ContactSection /></div>;
}

function MaximalLayout({ vibe }: { vibe: Vibe }) {
  return <div className="vibe-layout vibe-layout-maximal"><Hero currentVibe={vibe} /><WorkSection /><CapabilitiesSection /><OriginSection /><ProcessSection /><ExperienceSection /><ContactSection /></div>;
}

export function VibePortfolioLayout({ id, vibe }: { id: VibeId; vibe: Vibe }) {
  if (id === "geometry") return <DecoLayout vibe={vibe} />;
  if (id === "quiet") return <MinimalLayout vibe={vibe} />;
  if (id === "playground") return <MaximalLayout vibe={vibe} />;
  return <AuroraLayout vibe={vibe} />;
}
