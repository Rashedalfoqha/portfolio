"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
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
  const activeVibe = vibes.find((vibe) => vibe.id === active) ?? vibes[0];
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

  useEffect(() => {
    if (!open || !dialogRef.current) return;

    const scope = createScope({
      root: dialogRef,
      mediaQueries: {
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
    }).add((self) => {
      if (self?.matches.reduceMotion) return;

      animate(".welcome-copy > *, .vibe-option, .welcome-foot", {
        opacity: [0, 1],
        y: [16, 0],
        delay: stagger(55),
        duration: 520,
        ease: "out(3)",
      });
    });

    return () => scope.revert();
  }, [open]);

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
        <p>PORTFOLIO MODES</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          autoFocus={open}
        >
          Continue with {activeVibe.name}
        </button>
      </div>
      <div className="welcome-copy">
        <p className="eyebrow">SAME WORK. FOUR WAYS IN.</p>
        <h2 id="vibe-welcome-title">
          Choose the way
          <br />
          you want to <em>look.</em>
        </h2>
        <p id="vibe-welcome-description">
          Each mode changes the pace, hierarchy, and motion. The engineering
          work stays exactly the same.
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
                {vibe.mood}
              </small>
              <strong>{vibe.name}</strong>
              <span>{vibe.invitation}</span>
            </span>
            <b className="vibe-enter">OPEN</b>
          </button>
        ))}
      </div>
      <p className="welcome-foot">
        YOUR CHOICE IS REMEMBERED. SWITCH MODES ANYTIME.
      </p>
    </aside>
  );
}
