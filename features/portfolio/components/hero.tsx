import type { Vibe, VibeId } from "../types";
import { Artifact } from "./artifact";

const primaryStack = ["TypeScript", "Next.js", "NestJS", "PostgreSQL"];

const avatarByVibe: Record<
  VibeId,
  { src: string; width: number; height: number; label: string }
> = {
  system: {
    src: "/rashed-avatar-aurora.png",
    width: 1122,
    height: 1402,
    label: "Aurora",
  },
  geometry: {
    src: "/rashed-avatar-art-deco.png",
    width: 1122,
    height: 1402,
    label: "Art Deco",
  },
  quiet: {
    src: "/rashed-avatar-minimal.png",
    width: 1254,
    height: 1254,
    label: "Minimal",
  },
  playground: {
    src: "/rashed-avatar-maximal.png",
    width: 1086,
    height: 1448,
    label: "Maximal",
  },
};

export function Hero({ currentVibe }: { currentVibe: Vibe }) {
  const avatar = avatarByVibe[currentVibe.id];

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
            I&apos;m Rashed, a full-stack software engineer building
            maintainable web applications across responsive interfaces,
            APIs, real-time workflows, and relational and document databases.
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
          <figure className="portrait-frame portrait-frame-cutout">
            <div className="portrait-bar">
              <i />
              <i />
              <i />
              <span>~/rashed/portrait.png</span>
            </div>
            {/* A native image keeps the portfolio portable across local and edge runtimes. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar.src}
              alt={`${avatar.label} 3D avatar of Rashed Alfuqaha`}
              width={avatar.width}
              height={avatar.height}
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
          Building a private multi-vendor commerce platform at GoldenTik,
          formerly CartBuzz
        </p>
        <p>
          <span>TOOLING</span>
          Building a validated icon-package pipeline and Figma design tooling
        </p>
        <p>
          <span>AVAILABILITY</span>
          Open to remote roles and focused freelance collaborations
        </p>
      </section>
    </>
  );
}
