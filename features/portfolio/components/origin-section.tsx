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
          Before software, I completed a Bachelor&apos;s Degree in Islamic Arts
          at WISE University and worked independently on CAD patterns for
          mosaics and architectural production. That trained my eye to see
          structure, repetition, spacing, and the small errors that break a
          system.
        </p>
        <p>
          I now apply the same attention to components, layouts, and
          implementation details. My art background helps me notice spacing,
          repetition, and visual inconsistencies while I build software.
        </p>
        <div className="origin-ledger">
          <span>ISLAMIC ARTS · WISE UNIVERSITY · 2019-2023</span>
          <span>FREELANCE CAD DESIGN · JUL 2022-OCT 2023</span>
        </div>
      </div>
    </section>
  );
}
