import { useContext } from "react";
import { VibeContext } from "./vibe-context-base";

export function useVibe() {
  const context = useContext(VibeContext);
  if (!context) {
    throw new Error("useVibe must be used inside VibeProvider.");
  }
  return context;
}
