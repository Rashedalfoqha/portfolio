"use client";

import { useEffect, type RefObject } from "react";
import { animate, createScope, stagger } from "animejs";
import type { VibeId } from "../types";

export function useVibeEntranceMotion(
  root: RefObject<HTMLElement | null>,
  vibe: VibeId,
) {
  useEffect(() => {
    if (!root.current) return;

    const scope = createScope({
      root,
      mediaQueries: {
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
    }).add((self) => {
      if (self?.matches.reduceMotion) return;

      animate(".vibe-layout > .hero", {
        opacity: [0, 1],
        y: [24, 0],
        duration: 720,
        ease: "out(4)",
      });

      animate(".vibe-layout > .section, .vibe-layout > .signal-strip", {
        opacity: [0, 1],
        y: [18, 0],
        delay: stagger(45, { start: 120 }),
        duration: 560,
        ease: "out(3)",
      });
    });

    return () => scope.revert();
  }, [root, vibe]);
}
