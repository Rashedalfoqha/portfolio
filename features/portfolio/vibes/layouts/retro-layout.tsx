import type { ReactNode } from "react";

export function RetroLayout({ children }: { children: ReactNode }) {
  return (
    <div className="vibe-layout retro-layout">
      <div className="retro-marquee" aria-hidden="true">
        <span>★ RASHED&apos;S SOFTWARE QUEST ★ INSERT CURIOSITY ★</span>
        <span>★ RASHED&apos;S SOFTWARE QUEST ★ INSERT CURIOSITY ★</span>
      </div>
      <div className="retro-stars" aria-hidden="true" />
      {children}
    </div>
  );
}
