import { useInteractiveCanvas, type CanvasPointer } from "./use-interactive-canvas";
import { HeroLinks } from "./hero-links";

function drawGlass(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: CanvasPointer,
) {
  context.clearRect(0, 0, width, height);
  const cx = width * (0.5 + pointer.x * 0.08);
  const cy = height * (0.48 + pointer.y * 0.07);
  const radius = Math.min(width, height) * 0.29;
  const gradient = context.createRadialGradient(
    cx - radius * 0.35,
    cy - radius * 0.4,
    radius * 0.08,
    cx,
    cy,
    radius * 1.25,
  );
  gradient.addColorStop(0, "rgba(255,255,255,.96)");
  gradient.addColorStop(0.28, "rgba(113,246,192,.84)");
  gradient.addColorStop(0.62, "rgba(126,86,255,.74)");
  gradient.addColorStop(1, "rgba(25,16,76,.06)");
  context.fillStyle = gradient;
  context.shadowColor = "rgba(113,246,192,.4)";
  context.shadowBlur = 60;
  context.beginPath();
  const nodes = 48;
  for (let index = 0; index <= nodes; index += 1) {
    const angle = (index / nodes) * Math.PI * 2;
    const ripple =
      Math.sin(angle * 3 + time * 0.0014) * 0.055 +
      Math.cos(angle * 5 - time * 0.0009) * 0.035 +
      pointer.energy * Math.sin(angle * 7) * 0.08;
    const r = radius * (1 + ripple);
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  }
  context.closePath();
  context.fill();
  context.shadowBlur = 0;
  context.strokeStyle = "rgba(255,255,255,.56)";
  context.lineWidth = 1;
  context.stroke();
}

export function GlassHero() {
  const canvasRef = useInteractiveCanvas(drawGlass);
  return (
    <section className="vibe-hero glass-hero" aria-labelledby="glass-title">
      <div className="glass-copy">
        <p className="vibe-kicker">HUMAN-CENTERED SYSTEMS / AI-AUGMENTED BUILD</p>
        <h1 id="glass-title">Logic can feel<br /><em>alive.</em></h1>
        <p>
          Full-stack engineering shaped with a design eye: tactile interfaces,
          dependable services, and careful human review.
        </p>
        <HeroLinks label="Float into selected work" />
      </div>
      <div className="glass-orb">
        <canvas ref={canvasRef} aria-label="Interactive liquid engineering sphere" />
        <span className="glass-orbit glass-orbit-one">REACT</span>
        <span className="glass-orbit glass-orbit-two">NESTJS</span>
        <span className="glass-orbit glass-orbit-three">POSTGRES</span>
        <p>DRAG / PRESS / RIPPLE</p>
      </div>
      <div className="glass-signal"><b>AVAILABLE</b><span>Remote roles + focused freelance</span></div>
    </section>
  );
}
