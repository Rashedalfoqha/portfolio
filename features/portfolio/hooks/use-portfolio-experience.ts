"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  isVibeId,
  vibes,
  VIBE_STORAGE_KEY,
  vibeThemes,
} from "../data/portfolio-content";
import type { VibeId } from "../types";

export function usePortfolioExperience() {
  const [scrolled, setScrolled] = useState(false);
  const [vibe, setVibe] = useState<VibeId>("quiet");
  const [chooserOpen, setChooserOpen] = useState(false);
  const scrollMarkerRef = useRef<HTMLSpanElement>(null);
  const vibeSwitchRef = useRef<HTMLButtonElement>(null);
  const chooserWasOpenRef = useRef(false);

  useEffect(() => {
    const marker = scrollMarkerRef.current;
    if (!marker) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const requested = new URLSearchParams(window.location.search).get("vibe");
      const saved = window.localStorage.getItem(VIBE_STORAGE_KEY);
      if (isVibeId(requested)) {
        setVibe(requested);
        window.localStorage.setItem(VIBE_STORAGE_KEY, requested);
        return;
      }
      if (isVibeId(saved)) {
        setVibe(saved);
        return;
      }
      setChooserOpen(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const theme = vibeThemes[vibe];
    document.documentElement.style.colorScheme = theme.scheme;
    let themeMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.name = "theme-color";
      document.head.append(themeMeta);
    }
    themeMeta.content = theme.color;
  }, [vibe]);

  useEffect(() => {
    if (chooserOpen) {
      chooserWasOpenRef.current = true;
      return;
    }
    if (chooserWasOpenRef.current) {
      chooserWasOpenRef.current = false;
      vibeSwitchRef.current?.focus();
    }
  }, [chooserOpen]);

  const openChooser = useCallback(() => setChooserOpen(true), []);
  const closeChooser = useCallback(() => setChooserOpen(false), []);
  const chooseVibe = useCallback((nextVibe: VibeId) => {
    setVibe(nextVibe);
    setChooserOpen(false);
    window.localStorage.setItem(VIBE_STORAGE_KEY, nextVibe);
    const url = new URL(window.location.href);
    url.searchParams.set("vibe", nextVibe);
    window.history.replaceState({}, "", url);
  }, []);

  return {
    chooserOpen,
    chooseVibe,
    closeChooser,
    currentVibe: vibes.find((item) => item.id === vibe) ?? vibes[0],
    openChooser,
    scrolled,
    scrollMarkerRef,
    vibe,
    vibeSwitchRef,
  };
}
