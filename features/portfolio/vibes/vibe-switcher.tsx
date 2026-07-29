import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { vibes } from "../data/portfolio-content";
import { useVibe } from "./use-vibe";

export function VibeSwitcher() {
  const { chooseVibe, currentVibe, openWelcome, vibe } = useVibe();
  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="floating-vibe-switcher" ref={switcherRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="switcher-menu"
            role="menu"
            aria-label="Choose portfolio vibe"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 25 }}
          >
            {vibes.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitemradio"
                aria-checked={vibe === item.id}
                onClick={() => {
                  chooseVibe(item.id);
                  setOpen(false);
                }}
              >
                <i style={{ background: item.accent }} />
                <span>{item.shortName}</span>
                <small>{item.number}</small>
              </button>
            ))}
            <button type="button" className="switcher-all" onClick={openWelcome}>
              View all systems
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="switcher-trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="switcher-pulse" style={{ background: currentVibe.accent }} />
        <span>{currentVibe.shortName}</span>
        <b>{open ? "×" : "+"}</b>
      </button>
    </div>
  );
}
