import type { ReactNode } from "react";

export function CyberLayout({ children }: { children: ReactNode }) {
  return (
    <div className="vibe-layout cyber-layout">
      <div className="cyber-grid" aria-hidden="true" />
      <div className="cyber-status" aria-hidden="true">
        <span>SYS.RASHED</span>
        <span>UPLINK / AMMAN</span>
        <span className="is-live">ONLINE</span>
      </div>
      {children}
    </div>
  );
}
