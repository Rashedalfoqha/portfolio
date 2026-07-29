import type { VibeId } from "../types";

export function VibeAtmosphere({ vibe }: { vibe: VibeId }) {
  return (
    <div
      className={`vibe-atmosphere vibe-atmosphere-${vibe}`}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
      <span />
      {vibe !== "quiet" && (
        <b>
          {vibe === "system"
            ? "./rashed --inspect"
            : vibe === "geometry"
              ? "8 × 8"
              : "TRY / MOVE / OPEN"}
        </b>
      )}
    </div>
  );
}

export function VibeStage({ vibe }: { vibe: VibeId }) {
  if (vibe === "system") {
    return (
      <div className="vibe-stage vibe-stage-system" aria-hidden="true">
        <div className="system-readout">
          <span>rashed@portfolio:~$ inspect --full-stack</span>
          <span>[ok] interface layer</span>
          <span>[ok] service layer</span>
          <span>[ok] human review</span>
          <i />
        </div>
        <div className="system-scan" />
      </div>
    );
  }

  if (vibe === "geometry") {
    return (
      <div className="vibe-stage vibe-stage-geometry" aria-hidden="true">
        <div className="geometry-orbit">
          <i />
          <i />
          <i />
          <b>pattern / system</b>
        </div>
        <span className="geometry-axis">ART → LOGIC → PRODUCT</span>
      </div>
    );
  }

  if (vibe === "playground") {
    return (
      <div className="vibe-stage vibe-stage-playground" aria-hidden="true">
        <span className="play-sticker play-sticker-one">SHIP IT</span>
        <span className="play-sticker play-sticker-two">WHY?</span>
        <span className="play-sticker play-sticker-three">{"{ TRY }"}</span>
      </div>
    );
  }

  return (
    <div className="vibe-stage vibe-stage-quiet" aria-hidden="true">
      <span>Rashed Alfuqaha</span>
      <i />
      <b>Selected works · 2026</b>
    </div>
  );
}
