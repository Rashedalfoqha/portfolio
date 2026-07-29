import { createContext } from "react";
import type { Vibe, VibeId } from "../types";

export type VibeContextValue = {
  vibe: VibeId;
  currentVibe: Vibe;
  welcomeOpen: boolean;
  chooseVibe: (vibe: VibeId) => void;
  openWelcome: () => void;
  closeWelcome: () => void;
};

export const VibeContext = createContext<VibeContextValue | null>(null);
