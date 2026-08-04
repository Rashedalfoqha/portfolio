import type { VibeId } from "../types";

export function VibeAtmosphere({ vibe }: { vibe: VibeId }) {
  return (
    <div className={`vibe-atmosphere vibe-atmosphere-${vibe}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <b>
        {vibe === "system"
          ? "SIGNAL / LIGHT / LOGIC"
          : vibe === "geometry"
            ? "FORM FOLLOWS FUNCTION"
            : vibe === "quiet"
              ? "SELECTED WORK · 2026"
              : "LOOK CLOSER / MOVE / OPEN"}
      </b>
    </div>
  );
}

export function VibeStage({ vibe }: { vibe: VibeId }) {
  if (vibe === "system") {
    return (
      <div className="vibe-stage vibe-stage-aurora" aria-hidden="true">
        <div className="aurora-orb"><i /><i /><i /></div>
        <span>FULL-STACK / HUMAN-REVIEWED</span>
      </div>
    );
  }

  if (vibe === "geometry") {
    return (
      <div className="vibe-stage vibe-stage-deco" aria-hidden="true">
        <div className="deco-sun"><i /><i /><i /><i /><b>RA</b></div>
        <span>AMMAN · MMXXVI</span>
      </div>
    );
  }

  if (vibe === "playground") {
    return (
      <div className="vibe-stage vibe-stage-maximal" aria-hidden="true">
        <span className="max-sticker max-sticker-one">SHIP THE WEIRD IDEA</span>
        <span className="max-sticker max-sticker-two">FULL<br />STACK</span>
        <span className="max-sticker max-sticker-three">{`{ HUMAN > HYPE }`}</span>
      </div>
    );
  }

  return (
    <div className="vibe-stage vibe-stage-minimal" aria-hidden="true">
      <span>Rashed Alfuqaha</span>
      <i />
      <b>Software engineer · selected works</b>
    </div>
  );
}
