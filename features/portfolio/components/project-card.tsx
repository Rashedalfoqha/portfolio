import { useState } from "react";
import type { Project } from "../types";
import { ProjectIcon, TechIcon } from "./tech-icon";

export function ProjectCard({
  project,
  initiallyOpen = false,
}: {
  project: Project;
  initiallyOpen?: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <article className={`project-card ${open ? "is-open" : ""}`}>
      <button
        className="project-summary"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="project-number">{project.number}</span>
        <span className="project-icon">
          <ProjectIcon kind={project.icon} />
        </span>
        <span className="project-name">
          <small>{project.label}</small>
          <strong>{project.name}</strong>
        </span>
        <span className="project-line">{project.line}</span>
        <span className="project-toggle" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <div className="project-detail">
        <div className="project-detail-inner">
          <p className="project-story">{project.story}</p>
          <ul>
            {project.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="tag-row" translate="no">
            {project.tech.map((tech) => (
              <span key={tech}>
                <TechIcon name={tech} />
                {tech}
              </span>
            ))}
          </div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.linkLabel} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="private-label">{project.linkLabel}</span>
          )}
        </div>
      </div>
    </article>
  );
}
