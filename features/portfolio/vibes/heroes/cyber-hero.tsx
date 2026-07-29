import { useInteractiveCanvas, type CanvasPointer } from "./use-interactive-canvas";
import { HeroLinks } from "./hero-links";

const glyphs = "01{}<>/\\[]NODEAPI";

function drawCyber(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: CanvasPointer,
) {
  context.fillStyle = "#04070a";
  context.fillRect(0, 0, width, height);
  const columns = Math.max(14, Math.floor(width / 24));
  context.font = "12px 'JetBrains Mono Variable', monospace";
  context.textAlign = "center";
  for (let column = 0; column < columns; column += 1) {
    const x = ((column + 0.5) / columns) * width;
    const speed = 0.028 + (column % 5) * 0.006;
    for (let row = 0; row < 16; row += 1) {
      const y = (row * 34 + time * speed + column * 19) % (height + 80) - 40;
      const proximity = Math.max(
        0,
        1 -
          Math.hypot(
            x - width * (0.5 + pointer.x * 0.26),
            y - height * (0.5 + pointer.y * 0.2),
          ) /
            180,
      );
      context.fillStyle = `rgba(${proximity ? "60,255,205" : "57,255,156"},${0.09 + proximity * 0.7})`;
      context.fillText(glyphs[(column * 7 + row * 3) % glyphs.length], x, y);
    }
  }
  const cx = width * (0.5 + pointer.x * 0.045);
  const cy = height * (0.48 + pointer.y * 0.035);
  context.strokeStyle = "#55f8ff";
  context.lineWidth = 1.5;
  context.shadowColor = "#39ff9c";
  context.shadowBlur = 18 + pointer.energy * 24;
  context.strokeRect(cx - 92, cy - 118, 184, 236);
  context.beginPath();
  context.arc(cx, cy - 42, 42, 0, Math.PI * 2);
  context.moveTo(cx - 58, cy + 82);
  context.quadraticCurveTo(cx, cy + 15, cx + 58, cy + 82);
  context.stroke();
  context.shadowBlur = 0;
  context.fillStyle = "#39ff9c";
  context.font = "11px 'JetBrains Mono Variable', monospace";
  context.fillText("RASHED::ENGINEER", cx, cy + 106);
}

export function CyberHero() {
  const canvasRef = useInteractiveCanvas(drawCyber);
  return (
    <section className="vibe-hero cyber-hero" aria-labelledby="cyber-title">
      <div className="cyber-copy">
        <p className="vibe-kicker">rashed@portfolio:~$ ./inspect --full-stack</p>
        <h1 id="cyber-title"><span>FULL-STACK.</span><strong>NO BLACK BOXES.</strong></h1>
        <p>
          I build interfaces, services, real-time systems, and developer tools.
          Every layer stays inspectable.
        </p>
        <HeroLinks label="run ./selected-work" />
        <div className="cyber-command" aria-label="Primary stack">
          <span>[stack]</span> TypeScript · React · NestJS · PostgreSQL
        </div>
      </div>
      <div className="crt-shell">
        <div className="crt-bar"><span>avatar.runtime</span><b>LIVE</b></div>
        <canvas ref={canvasRef} aria-label="Reactive terminal portrait visualization" />
        <div className="crt-scanlines" aria-hidden="true" />
        <p>&gt; pointer input changes the signal_</p>
      </div>
    </section>
  );
}
