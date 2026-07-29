import type { RefObject } from "react";
import { profileLinks } from "@/shared/config/profile-links";
import type { Vibe } from "../types";

export function SiteHeader({
  currentVibe,
  onOpenChooser,
  scrolled,
  vibeSwitchRef,
}: {
  currentVibe: Vibe;
  onOpenChooser: () => void;
  scrolled: boolean;
  vibeSwitchRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="Rashed Alfuqaha, home">
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>
          RASHED
          <br />
          ALFUQAHA
        </span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#capabilities">Skills</a>
        <a href="#origin">Origin</a>
      </nav>
      <div className="header-actions">
        <button
          ref={vibeSwitchRef}
          className="vibe-switch"
          type="button"
          onClick={onOpenChooser}
        >
          <span>VIEW /</span> {currentVibe.number}
        </button>
        <a className="header-contact" href={profileLinks.email.href}>
          Send brief <span>↗</span>
        </a>
      </div>
    </header>
  );
}
