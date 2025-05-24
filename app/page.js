import { ContactSection } from "./Contact";
import { HeroSection } from "./HeroSection";
import { IntroductionSection } from "./Introduction";
import { ProjectsSection } from "./Project";
import { TechnologiesSection } from "./Technologies";
export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <TechnologiesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
