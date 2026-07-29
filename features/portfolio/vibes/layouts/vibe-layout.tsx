import type { ReactNode } from "react";
import type { VibeId } from "../../types";
import { CyberLayout } from "./cyber-layout";
import { GlassLayout } from "./glass-layout";
import { MinimalLayout } from "./minimal-layout";
import { RetroLayout } from "./retro-layout";

const layouts: Record<VibeId, ({ children }: { children: ReactNode }) => React.JSX.Element> = {
  cyberpunk: CyberLayout,
  minimal: MinimalLayout,
  glass: GlassLayout,
  retro: RetroLayout,
};

export function VibeLayout({
  vibe,
  children,
}: {
  vibe: VibeId;
  children: ReactNode;
}) {
  const Layout = layouts[vibe];
  return <Layout>{children}</Layout>;
}
