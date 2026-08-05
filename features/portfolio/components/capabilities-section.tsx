import { capabilities } from "../data/portfolio-content";
import { SkillGroupIcon, TechIcon } from "./tech-icon";

export function CapabilitiesSection() {
  return (
    <section className="section capabilities" id="capabilities">
      <header className="section-heading">
        <p className="eyebrow">
          <span>CAPABILITIES</span>
          <span>THE WORKING TOOLKIT</span>
        </p>
        <h2>
          What I reach for
          <br />
          <em>when I build.</em>
        </h2>
        <p>
          The important stack is visible. The growing edge stays honestly
          labelled.
        </p>
      </header>
      <div className="capability-grid">
        {capabilities.map((group, index) => (
          <article key={group.name}>
            <div className="capability-top">
              <span>0{index + 1}</span>
              <i>
                <SkillGroupIcon kind={group.kind} />
              </i>
              <small>
                {index === capabilities.length - 1
                  ? "EMERGING"
                  : "WORKING STACK"}
              </small>
            </div>
            <h3>{group.name}</h3>
            <p>{group.note}</p>
            <div className="skill-tags" translate="no">
              {group.skills.map((skill) => (
                <span key={skill}>
                  <TechIcon name={skill} />
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="language-row">
        <span>LANGUAGES</span>
        <p>
          <strong>Arabic</strong> Native
        </p>
        <p>
          <strong>English</strong> Basic conversational · actively improving
        </p>
        <p>
          <strong>Turkish</strong> Professional working proficiency
        </p>
      </div>
    </section>
  );
}
