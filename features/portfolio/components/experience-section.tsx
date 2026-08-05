export function ExperienceSection() {
  return (
    <section className="section experience" id="experience">
      <header className="section-heading compact">
        <p className="eyebrow">
          <span>EXPERIENCE</span>
          <span>THE WORK BEHIND THE WORK</span>
        </p>
        <h2>
          Software and client
          <br />
          <em>work.</em>
        </h2>
        <p>
          The client work stays private, but the role, stack, and delivery
          scope are clear.
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
            Contribute across front-end, API, and data-layer delivery for a
            private multi-vendor e-commerce platform using Next.js, NestJS,
            TypeScript, SCSS, Python where required, and Docker.
          </p>
        </article>
        <article>
          <time>MAY - DEC 2025</time>
          <div>
            <span>FREELANCE FULL-STACK DEVELOPER</span>
            <h3>Vero IT</h3>
          </div>
          <p>
            Built client applications, REST APIs, authentication flows,
            real-time features, and data models using React, Next.js, Node.js,
            Express.js, TypeScript, PostgreSQL, and MongoDB.
          </p>
        </article>
        <article>
          <time>JUL 2022 - OCT 2023</time>
          <div>
            <span>FREELANCE CAD DESIGNER</span>
            <h3>Independent</h3>
          </div>
          <p>
            Produced precise mosaic and architectural patterns and coordinated
            technical specifications with artisans and production teams.
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
