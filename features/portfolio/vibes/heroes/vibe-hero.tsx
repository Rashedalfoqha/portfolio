import type { VibeId } from "../../types";
import { CyberHero } from "./cyber-hero";
import { GlassHero } from "./glass-hero";
import { MinimalHero } from "./minimal-hero";
import { RetroHero } from "./retro-hero";

const heroes: Record<VibeId, () => React.JSX.Element> = {
  cyberpunk: CyberHero,
  minimal: MinimalHero,
  glass: GlassHero,
  retro: RetroHero,
};

export function VibeHero({ vibe }: { vibe: VibeId }) {
  const Hero = heroes[vibe];
  return <Hero />;
}
