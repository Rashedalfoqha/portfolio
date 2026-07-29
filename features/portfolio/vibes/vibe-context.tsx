import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  normalizeVibeId,
  vibes,
  VIBE_STORAGE_KEY,
  vibeThemes,
} from "../data/portfolio-content";
import type { VibeId } from "../types";
import { VibeContext, type VibeContextValue } from "./vibe-context-base";

function readInitialVibe() {
  const requested = normalizeVibeId(
    new URLSearchParams(window.location.search).get("vibe"),
  );
  const saved = normalizeVibeId(window.localStorage.getItem(VIBE_STORAGE_KEY));
  return {
    vibe: requested ?? saved ?? "minimal",
    shouldWelcome: !requested && !saved,
  } satisfies { vibe: VibeId; shouldWelcome: boolean };
}

export function VibeProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(readInitialVibe);
  const [vibe, setVibe] = useState<VibeId>(initial.vibe);
  const [welcomeOpen, setWelcomeOpen] = useState(initial.shouldWelcome);

  useEffect(() => {
    const theme = vibeThemes[vibe];
    document.documentElement.dataset.vibe = vibe;
    document.documentElement.style.colorScheme = theme.scheme;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.append(meta);
    }
    meta.content = theme.color;
  }, [vibe]);

  const chooseVibe = useCallback((nextVibe: VibeId) => {
    setVibe(nextVibe);
    setWelcomeOpen(false);
    window.localStorage.setItem(VIBE_STORAGE_KEY, nextVibe);
    const url = new URL(window.location.href);
    url.searchParams.set("vibe", nextVibe);
    window.history.replaceState({}, "", url);
  }, []);

  const value = useMemo<VibeContextValue>(
    () => ({
      vibe,
      currentVibe: vibes.find((item) => item.id === vibe) ?? vibes[1],
      welcomeOpen,
      chooseVibe,
      openWelcome: () => setWelcomeOpen(true),
      closeWelcome: () => setWelcomeOpen(false),
    }),
    [chooseVibe, vibe, welcomeOpen],
  );

  return <VibeContext.Provider value={value}>{children}</VibeContext.Provider>;
}
