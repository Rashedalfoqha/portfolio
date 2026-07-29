import { useState } from "react";

export function Artifact() {
  const [active, setActive] = useState<number[]>([0, 4, 8]);

  const toggle = (index: number) => {
    setActive((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  return (
    <div className="artifact-shell">
      <div className="artifact-meta">
        <span>INTERACTIVE ARTIFACT</span>
        <span>TRACE THE SYSTEM</span>
      </div>
      <div
        className="artifact"
        aria-label="Interactive geometric system. Activate cells to change the pattern."
      >
        {Array.from({ length: 12 }, (_, index) => (
          <button
            className={active.includes(index) ? "is-active" : ""}
            type="button"
            aria-label={`Pattern cell ${index + 1}`}
            aria-pressed={active.includes(index)}
            onClick={() => toggle(index)}
            key={index}
          >
            <i />
          </button>
        ))}
        <span className="artifact-core" aria-hidden="true">
          {"{ }"}
        </span>
      </div>
      <p>Pattern becomes component. Component becomes system.</p>
    </div>
  );
}
