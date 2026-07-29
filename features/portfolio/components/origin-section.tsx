export function OriginSection() {
  return (
    <section className="section origin" id="origin">
      <div className="origin-pattern" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
          <i key={index} />
        ))}
        <span>
          pattern
          <br />→<br />
          system
        </span>
      </div>
      <div className="origin-copy">
        <p className="eyebrow">
          <span>THE ORIGIN</span>
          <span>DESIGN EYE · ENGINEERING MIND</span>
        </p>
        <h2>
          The medium changed.
          <br />
          <em>The precision stayed.</em>
        </h2>
        <p>
          Before software, I studied Islamic Arts and ornamental architecture
          and worked with CAD patterns. That trained my eye to see structure,
          repetition, spacing, and the small errors that break a system.
        </p>
        <p>
          Today the pattern is a component, the geometry is a layout, and the
          precision is careful implementation. The art background supports the
          engineering. It does not compete with it.
        </p>
        <div className="origin-ledger">
          <span>ISLAMIC ARTS · WISE UNIVERSITY · 2019-2023</span>
          <span>FREELANCE CAD DESIGN · 2022-2023</span>
        </div>
      </div>
    </section>
  );
}
