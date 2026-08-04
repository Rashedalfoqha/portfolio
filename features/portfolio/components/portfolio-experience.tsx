"use client";

import { useRef } from "react";
import { usePortfolioExperience } from "../hooks/use-portfolio-experience";
import { useVibeEntranceMotion } from "../hooks/use-vibe-entrance-motion";
import { SiteHeader } from "./site-header";
import { VibePortfolioLayout } from "./vibe-portfolio-layout";
import { VibeChooser } from "./vibe-chooser";
import { VibeAtmosphere, VibeStage } from "./vibe-layer";

export function PortfolioExperience() {
  const mainRef = useRef<HTMLElement>(null);
  const {
    chooserOpen,
    chooseVibe,
    closeChooser,
    currentVibe,
    openChooser,
    scrolled,
    scrollMarkerRef,
    vibe,
    vibeSwitchRef,
  } = usePortfolioExperience();
  useVibeEntranceMotion(mainRef, vibe);

  return (
    <main ref={mainRef} id="top" data-vibe={vibe}>
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <VibeChooser
        open={chooserOpen}
        active={vibe}
        onChoose={chooseVibe}
        onClose={closeChooser}
      />
      <VibeAtmosphere vibe={vibe} />
      <VibeStage vibe={vibe} />
      <span
        className="scroll-marker"
        ref={scrollMarkerRef}
        aria-hidden="true"
      />

      <SiteHeader
        currentVibe={currentVibe}
        onOpenChooser={openChooser}
        scrolled={scrolled}
        vibeSwitchRef={vibeSwitchRef}
      />
      <VibePortfolioLayout id={vibe} vibe={currentVibe} />
    </main>
  );
}
