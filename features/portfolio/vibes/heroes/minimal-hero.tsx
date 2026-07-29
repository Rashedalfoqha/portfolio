import { useInteractiveCanvas, type CanvasPointer } from "./use-interactive-canvas";
import { HeroLinks } from "./hero-links";

function drawMinimal(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: CanvasPointer,
) {
  context.clearRect(0, 0, width, height);
  const cx = width / 2;
  const cy = height / 2;
  const t = time * 0.0003;
  const points = Array.from({ length: 10 }, (_, index) => {
    const angle = (index / 10) * Math.PI * 2 + t;
    const radius = Math.min(width, height) * (index % 2 ? 0.24 : 0.34);
    const z = Math.sin(angle * 2 + t) * 0.45 + 1.4;
    return {
      x: cx + (Math.cos(angle) * radius) / z + pointer.x * 34,
      y: cy + (Math.sin(angle) * radius) / z + pointer.y * 28,
    };
  });
  context.strokeStyle = "#101010";
  context.lineWidth = 1;
  for (let index = 0; index < points.length; index += 1) {
    const point = points[index];
    const next = points[(index + 3) % points.length];
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(next.x, next.y);
    context.stroke();
  }
  context.fillStyle = "#ff3b1f";
  for (const point of points) {
    context.beginPath();
    context.arc(point.x, point.y, 3 + pointer.energy * 2, 0, Math.PI * 2);
    context.fill();
  }
}

export function MinimalHero() {
  const canvasRef = useInteractiveCanvas(drawMinimal);
  return (
    <section className="vibe-hero minimal-hero" aria-labelledby="minimal-title">
      <div className="minimal-index"><span>PORTFOLIO</span><span>AMMAN / 2026</span></div>
      <div className="minimal-copy">
        <p className="vibe-kicker">RASHED ALFUQAHA — SOFTWARE ENGINEER</p>
        <h1 id="minimal-title">I DESIGN<br /><em>SYSTEMS</em><br />THAT BEHAVE.</h1>
        <div className="minimal-summary">
          <p>Clear interfaces. Reliable services. Products built end to end.</p>
          <HeroLinks />
        </div>
      </div>
      <figure className="minimal-mesh">
        <canvas ref={canvasRef} aria-label="Interactive geometric engineering mesh" />
        <figcaption><span>FIG. 01</span><span>STRUCTURE RESPONDS TO INPUT</span></figcaption>
      </figure>
    </section>
  );
}
