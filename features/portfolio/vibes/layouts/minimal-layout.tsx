import type { ReactNode } from "react";

export function MinimalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="vibe-layout minimal-layout">
      <div className="minimal-rail" aria-hidden="true">
        <span>RA / 26</span>
        <i />
        <span>ENGINEERING AS STRUCTURE</span>
      </div>
      {children}
    </div>
  );
}
