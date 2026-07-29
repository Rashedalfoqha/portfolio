"use client";

import { useEffect, useRef } from "react";
import { vibes } from "../data/portfolio-content";
import type { VibeId } from "../types";

export function VibeChooser({
  open,
  active,
  onChoose,
  onClose,
}: {
  open: boolean;
  active: VibeId;
  onChoose: (vibe: VibeId) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let focusFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, open]);

  return (
    <aside
      key={open ? "open" : "closed"}
      ref={dialogRef}
      className={`vibe-welcome ${open ? "is-visible" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vibe-welcome-title"
      aria-describedby="vibe-welcome-description"
      aria-hidden={!open}
      inert={!open}
    >
      <div className="welcome-top">
        <a
          className="brand welcome-brand"
          href="#top"
          aria-label="Rashed Alfuqaha"
        >
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>
            RASHED
            <br />
            ALFUQAHA
          </span>
        </a>
        <p>CHOOSE YOUR VIEW</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          autoFocus={open}
        >
          Continue with {active} →
        </button>
      </div>
      <div className="welcome-copy">
        <p className="eyebrow">ONE ENGINEER / FOUR SIGNALS</p>
        <h2 id="vibe-welcome-title">
          How do you want
          <br />
          to <em>meet me?</em>
        </h2>
        <p id="vibe-welcome-description">
          Same work. Same facts. Four completely different ways to experience
          the thinking behind them.
        </p>
      </div>
      <div className="vibe-options">
        {vibes.map((vibe) => (
          <button
            className={`vibe-option vibe-option-${vibe.id}`}
            type="button"
            onClick={() => onChoose(vibe.id)}
            aria-pressed={active === vibe.id}
            key={vibe.id}
          >
            <span className="vibe-preview" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <b>{vibe.number}</b>
            </span>
            <span className="vibe-option-copy">
              <small>
                {vibe.number} / {vibe.mood}
              </small>
              <strong>{vibe.name}</strong>
              <span>{vibe.invitation}</span>
            </span>
            <b className="vibe-enter">ENTER ↗</b>
          </button>
        ))}
      </div>
      <p className="welcome-foot">
        YOUR CHOICE IS REMEMBERED · SWITCH VIEWS ANYTIME
      </p>
    </aside>
  );
}
