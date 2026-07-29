import {
  archiveProjects,
  featuredProjects,
} from "../data/portfolio-content";
import { ProjectCard } from "./project-card";

export function WorkSection() {
  return (
    <section className="section work" id="work">
      <header className="section-heading">
        <p className="eyebrow">
          <span>SELECTED WORK</span>
          <span>PRODUCTS + TOOLS</span>
        </p>
        <h2>
          Built to solve.
          <br />
          <em>Selected to explain.</em>
        </h2>
        <p>
          Three builds that show how I think: from a live operations platform
          to tools that keep complex design systems usable.
        </p>
      </header>
      <div className="project-list">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            project={project}
            initiallyOpen={index === 0}
            key={project.name}
          />
        ))}
      </div>

      <div className="archive">
        <div className="archive-heading">
          <p className="eyebrow">PROJECT ARCHIVE</p>
          <p>Earlier product builds that developed the foundation.</p>
        </div>
        <div className="archive-list">
          {archiveProjects.map((project) => (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              key={project.name}
            >
              <span>{project.number}</span>
              <strong>{project.name}</strong>
              <small>{project.label}</small>
              <i translate="no">{project.tech.slice(0, 3).join(" · ")}</i>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
