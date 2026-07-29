import { useEffect, useRef } from "react";

export type CanvasPointer = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  energy: number;
};

type DrawFrame = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: CanvasPointer,
) => void;

export function useInteractiveCanvas(drawFrame: DrawFrame) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const pointer: CanvasPointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      energy: 0,
    };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 1;
    let height = 1;
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.energy = Math.min(1, pointer.energy + 0.16);
    };
    const onPointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };
    const onPointerDown = () => {
      pointer.energy = 1;
    };
    const render = (time: number) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.065;
      pointer.y += (pointer.targetY - pointer.y) * 0.065;
      pointer.energy *= 0.975;
      drawFrame(context, width, height, reducedMotion ? 0 : time, pointer);
      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);
    resize();
    render(0);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [drawFrame]);

  return canvasRef;
}
