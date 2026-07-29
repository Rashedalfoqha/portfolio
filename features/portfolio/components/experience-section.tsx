export function ExperienceSection() {
  return (
    <section className="section experience" id="experience">
      <header className="section-heading compact">
        <p className="eyebrow">
          <span>EXPERIENCE</span>
          <span>THE WORK BEHIND THE WORK</span>
        </p>
        <h2>
          Software in
          <br />
          <em>production.</em>
        </h2>
        <p>
          Client details can stay private. The engineering scope can still be
          clear.
        </p>
      </header>
      <div className="timeline">
        <article>
          <time>JAN 2026 - PRESENT</time>
          <div>
            <span>SOFTWARE ENGINEER</span>
            <h3>
              GoldenTik <small>formerly CartBuzz</small>
            </h3>
          </div>
          <p>
            Contributing across a private multi-vendor e-commerce platform with
            Next.js, NestJS, TypeScript, SCSS, and Docker.
          </p>
        </article>
        <article>
          <time>MAY - DEC 2025</time>
          <div>
            <span>FREELANCE FULL-STACK DEVELOPER</span>
            <h3>Independent + Vero IT</h3>
          </div>
          <p>
            Delivered client web applications from requirements through
            deployment using React, Next.js, Node.js, PostgreSQL, and MongoDB.
          </p>
        </article>
        <article className="timeline-note">
          <time>400+ PRACTICAL HOURS</time>
          <div>
            <span>IMMERSIVE FULL-STACK DEVELOPMENT</span>
            <h3>MERAKI Academy</h3>
          </div>
          <p>
            Project-based engineering training from October 2023 to March 2024.
          </p>
        </article>
      </div>
    </section>
  );
}
