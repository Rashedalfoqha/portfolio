import Introduction from "./Introduction";
import Technologies from "./Technologies";
import Project from "./Project";
import Contact from "./Contact";
import { HeroSection } from "./HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Introduction />
      <Technologies />
      <Project />
      <Contact />
    </>
  );
}
