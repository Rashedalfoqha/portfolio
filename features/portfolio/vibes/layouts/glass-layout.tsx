import type { ReactNode } from "react";

export function GlassLayout({ children }: { children: ReactNode }) {
  return (
    <div className="vibe-layout glass-layout">
      <div className="glass-aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="glass-depth-grid" aria-hidden="true" />
      {children}
    </div>
  );
}
