import type { Vibe } from "../types";
import { Artifact } from "./artifact";

const primaryStack = ["TypeScript", "Next.js", "NestJS", "PostgreSQL"];

export function Hero({ currentVibe }: { currentVibe: Vibe }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>SOFTWARE ENGINEER</span>
            <span>AMMAN → REMOTE</span>
          </p>
          <h1>
            {currentVibe.headline[0]}
            <br />
            <em>{currentVibe.headline[1]}</em>
          </h1>
          <p className="hero-lede">
            I&apos;m Rashed, a full-stack software engineer building clear
            interfaces, reliable services, real-time systems, and developer
            tools.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              Inspect selected work <span>↓</span>
            </a>
            <a
              className="button button-quiet"
              href="/Rashed_Mohammad_Alfuqaha_CV_EN_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open CV <span>↗</span>
            </a>
          </div>
          <div
            className="hero-code"
            aria-label="Primary engineering stack"
            translate="no"
          >
            <span>const stack =</span>
            {primaryStack.map((tech) => (
              <code key={tech}>{tech}</code>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <Artifact />
          <figure className="portrait-frame">
            <div className="portrait-bar">
              <i />
              <i />
              <i />
              <span>~/rashed/portrait.webp</span>
            </div>
            {/* A native image keeps the portfolio portable across local and edge runtimes. */}
            <img
              src="/rashed-photo.webp"
              alt="Rashed Alfuqaha in Amman, Jordan"
              width={600}
              height={800}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <figcaption>
              <span>RASHED</span>
              <span>AMMAN / JORDAN</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="signal-strip" aria-label="Current professional focus">
        <p>
          <span>PRODUCT</span>
          Building a private multi-vendor commerce product at GoldenTik
        </p>
        <p>
          <span>TOOLING</span>
          Creating developer tools for design intelligence and SVG delivery
        </p>
        <p>
          <span>AVAILABILITY</span>
          Open to remote roles and focused freelance collaborations
        </p>
      </section>
    </>
  );
}
