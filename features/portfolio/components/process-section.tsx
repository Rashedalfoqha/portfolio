import { processSteps } from "../data/portfolio-content";

export function ProcessSection() {
  return (
    <section className="section process-section">
      <header className="section-heading compact">
        <p className="eyebrow">
          <span>ENGINEERING METHOD</span>
          <span>AI-AUGMENTED · HUMAN-REVIEWED</span>
        </p>
        <h2>
          AI helps.
          <br />
          <em>I decide.</em>
        </h2>
        <p>
          Codex, Claude, Cursor, and GLM speed up exploration and repetitive
          work. Architecture, review, testing, and the final call remain mine.
        </p>
      </header>
      <ol className="process-list">
        {processSteps.map(([number, title, description]) => (
          <li key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
