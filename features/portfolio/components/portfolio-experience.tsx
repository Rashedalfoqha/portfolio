"use client";

import { usePortfolioExperience } from "../hooks/use-portfolio-experience";
import { CapabilitiesSection } from "./capabilities-section";
import { ContactSection } from "./contact-section";
import { ExperienceSection } from "./experience-section";
import { Hero } from "./hero";
import { OriginSection } from "./origin-section";
import { ProcessSection } from "./process-section";
import { SiteHeader } from "./site-header";
import { VibeChooser } from "./vibe-chooser";
import { VibeAtmosphere, VibeStage } from "./vibe-layer";
import { WorkSection } from "./work-section";

export function PortfolioExperience() {
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

  return (
    <main id="top" data-vibe={vibe}>
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
      <Hero currentVibe={currentVibe} />
      <WorkSection />
      <ExperienceSection />
      <ProcessSection />
      <CapabilitiesSection />
      <OriginSection />
      <ContactSection />
    </main>
  );
}
