import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useVibe } from "../vibes/use-vibe";
import { VibeHero } from "../vibes/heroes/vibe-hero";
import { VibeLayout } from "../vibes/layouts/vibe-layout";
import { VibeSwitcher } from "../vibes/vibe-switcher";
import { WelcomeScreen } from "../vibes/welcome-screen";
import { CapabilitiesSection } from "./capabilities-section";
import { ContactSection } from "./contact-section";
import { ExperienceSection } from "./experience-section";
import { OriginSection } from "./origin-section";
import { ProcessSection } from "./process-section";
import { SiteHeader } from "./site-header";
import { WorkSection } from "./work-section";

const pageTransition = {
  initial: { opacity: 0, y: 12, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(6px)" },
};

export function PortfolioExperience() {
  const { currentVibe, openWelcome, vibe } = useVibe();
  const [scrolled, setScrolled] = useState(false);
  const scrollMarkerRef = useRef<HTMLSpanElement>(null);
  const vibeSwitchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const marker = scrollMarkerRef.current;
    if (!marker) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, [vibe]);

  return (
    <>
      <WelcomeScreen />
      <VibeSwitcher />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={vibe}
          className="vibe-transition"
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <VibeLayout vibe={vibe}>
            <main id="top" data-vibe={vibe}>
              <a className="skip-link" href="#work">
                Skip to selected work
              </a>
              <span
                className="scroll-marker"
                ref={scrollMarkerRef}
                aria-hidden="true"
              />
              <SiteHeader
                currentVibe={currentVibe}
                onOpenChooser={openWelcome}
                scrolled={scrolled}
                vibeSwitchRef={vibeSwitchRef}
              />
              <VibeHero vibe={vibe} />
              <WorkSection />
              <ExperienceSection />
              <ProcessSection />
              <CapabilitiesSection />
              <OriginSection />
              <ContactSection />
            </main>
          </VibeLayout>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
