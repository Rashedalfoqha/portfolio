'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaCalendarAlt, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { projects } from './portfolioData';

function TiltCard({ project }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="project-card relative group p-8 md:p-12 bg-bg-surface/30 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-color-primary/30 transition-colors duration-500"
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8" style={{ transform: "translateZ(40px)" }}>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.badges.map((badge) => (
                <span key={badge} className="px-3 py-1 bg-color-accent/10 border border-color-accent/20 text-[9px] mono font-bold uppercase tracking-widest text-color-accent rounded-md">
                  {badge}
                </span>
              ))}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-color-text group-hover:text-color-accent transition-colors">
              {project.name}
            </h3>
            {project.subtitle ? (
              <p className="text-[10px] mono text-color-muted uppercase tracking-[0.3em] mt-2 font-bold">{project.subtitle}</p>
            ) : null}
            {project.period ? (
              <p className="inline-flex items-center gap-2 text-[10px] mono text-color-muted uppercase tracking-[0.2em] mt-4 font-bold">
                <FaCalendarAlt size={12} className="text-color-primary" />
                {project.period}
              </p>
            ) : null}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name}`}
            className="p-3 bg-white/5 rounded-xl text-color-text hover:text-color-accent hover:bg-white/10 transition-all shrink-0"
          >
            {project.linkType === "live" ? <FaExternalLinkAlt size={18} /> : <FaGithub size={18} />}
          </a>
        </div>

        <p className="text-color-muted text-sm md:text-base leading-relaxed mb-10 font-medium line-clamp-4" style={{ transform: "translateZ(20px)" }}>
          {project.description}
        </p>

        <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap gap-2" style={{ transform: "translateZ(30px)" }}>
          {project.stack.map((tag) => (
            <span key={tag} className="text-[9px] mono px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-color-muted uppercase font-bold tracking-widest">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-color-primary/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-color-primary/20 transition-colors" />
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="mono text-color-accent text-[10px] tracking-[0.6em] uppercase mb-6 block font-bold">Featured Work</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-color-text">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={i === 0 ? 'lg:col-span-2' : ''}
            >
              <TiltCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
