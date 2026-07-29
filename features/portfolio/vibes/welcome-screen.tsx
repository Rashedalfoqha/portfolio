import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { vibes } from "../data/portfolio-content";
import { useVibe } from "./use-vibe";

export function WelcomeScreen() {
  const { chooseVibe, closeWelcome, currentVibe, welcomeOpen } = useVibe();
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!welcomeOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeWelcome();
        return;
      }
      if (event.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href]",
      );
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeWelcome, welcomeOpen]);

  return (
    <AnimatePresence>
      {welcomeOpen && (
        <motion.aside
          ref={dialogRef}
          className="vibe-hub"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vibe-hub-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <motion.div
            className="vibe-hub-inner"
            initial={{ y: 28, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 16, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <header>
              <a href="#top" className="hub-brand">RASHED / ALFUQAHA</a>
              <p>ONE ENGINEER · FOUR OPERATING SYSTEMS</p>
              <button ref={closeRef} type="button" onClick={closeWelcome}>
                Continue with {currentVibe.shortName} <span>↘</span>
              </button>
            </header>
            <div className="hub-intro">
              <p>CHOOSE HOW THE PORTFOLIO BEHAVES</p>
              <h2 id="vibe-hub-title">Same evidence.<br /><em>Different physics.</em></h2>
            </div>
            <div className="hub-options">
              {vibes.map((vibe, index) => (
                <motion.button
                  key={vibe.id}
                  className={`hub-option hub-option-${vibe.id}`}
                  type="button"
                  onClick={() => chooseVibe(vibe.id)}
                  aria-label={`Enter ${vibe.name}: ${vibe.mood}`}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.055 }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.985 }}
                >
                  <span className="hub-option-visual" aria-hidden="true">
                    <i /><i /><i /><b>{vibe.number}</b>
                  </span>
                  <span className="hub-option-copy">
                    <small>{vibe.mood}</small>
                    <strong>{vibe.name}</strong>
                    <span>{vibe.invitation}</span>
                  </span>
                  <b className="hub-enter">ENTER ↗</b>
                </motion.button>
              ))}
            </div>
            <footer>YOUR CHOICE IS SAVED LOCALLY · SWITCH ANYTIME</footer>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
