import { useInteractiveCanvas, type CanvasPointer } from "./use-interactive-canvas";
import { HeroLinks } from "./hero-links";

function pixelRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  context.fillStyle = color;
  context.fillRect(Math.round(x), Math.round(y), size, size);
}

function drawRetro(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: CanvasPointer,
) {
  context.imageSmoothingEnabled = false;
  context.fillStyle = "#111b3d";
  context.fillRect(0, 0, width, height);
  const grid = 12;
  const floor = height * 0.78;
  context.fillStyle = "#243060";
  for (let x = 0; x < width; x += grid * 2) {
    context.fillRect(x, floor, grid, height - floor);
  }
  const bounce = Math.round(Math.sin(time * 0.006) * 4);
  const x = width * 0.5 - 42 + pointer.x * 34;
  const y = floor - 132 + bounce + pointer.y * 10;
  const p = 12;
  [
    [2, 0, "#ffd4ad"], [3, 0, "#ffd4ad"], [4, 0, "#ffd4ad"],
    [1, 1, "#1d152d"], [2, 1, "#ffd4ad"], [3, 1, "#ffd4ad"], [4, 1, "#1d152d"],
    [1, 2, "#ffd4ad"], [2, 2, "#ffd4ad"], [3, 2, "#ffd4ad"], [4, 2, "#ffd4ad"],
    [1, 3, "#f04444"], [2, 3, "#f04444"], [3, 3, "#f04444"], [4, 3, "#f04444"],
    [0, 4, "#f04444"], [1, 4, "#f04444"], [2, 4, "#ffd84a"], [3, 4, "#ffd84a"], [4, 4, "#f04444"], [5, 4, "#f04444"],
    [1, 5, "#2ed3c6"], [2, 5, "#2ed3c6"], [3, 5, "#2ed3c6"], [4, 5, "#2ed3c6"],
    [1, 6, "#2ed3c6"], [4, 6, "#2ed3c6"],
  ].forEach(([dx, dy, color]) =>
    pixelRect(context, x + Number(dx) * p, y + Number(dy) * p, p, String(color)),
  );
  context.fillStyle = "#ffd84a";
  context.font = "12px 'JetBrains Mono Variable', monospace";
  context.textAlign = "center";
  context.fillText(pointer.energy > 0.25 ? "+10 CURIOSITY" : "RASHED LV. 26", width / 2, 34);
}

export function RetroHero() {
  const canvasRef = useInteractiveCanvas(drawRetro);
  return (
    <section className="vibe-hero retro-hero" aria-labelledby="retro-title">
      <div className="retro-hud">
        <span>PLAYER 01</span><b>RASHED</b><span>CLASS: FULL-STACK</span>
      </div>
      <div className="retro-copy">
        <p className="vibe-kicker">NEW QUEST UNLOCKED</p>
        <h1 id="retro-title">PRESS START.<br /><em>SHIP SOMETHING.</em></h1>
        <div className="retro-dialogue">
          <span aria-hidden="true">R</span>
          <p>I turn product problems into working interfaces, APIs, and systems. Ready?</p>
        </div>
        <HeroLinks label="Open quest log" />
      </div>
      <div className="retro-stage">
        <canvas ref={canvasRef} aria-label="Animated pixel engineer character" />
        <p>MOVE POINTER / PRESS TO POWER UP</p>
      </div>
    </section>
  );
}
