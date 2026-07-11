'use client';
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaCalendarAlt, FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa';
import { experiences } from './portfolioData';

export default function ExperienceSection() {
  const { scrollYProgress } = useScroll();

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <span className="mono text-color-primary text-[10px] tracking-[0.6em] uppercase mb-6 block font-bold">Professional Timeline</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-color-text">Experience</h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] transform -translate-x-1/2 hidden md:block">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line
                x1="0" y1="0" x2="0" y2="100%"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="8 8"
                className="opacity-10"
              />
              <motion.line
                x1="0" y1="0" x2="0" y2="100%"
                stroke="url(#experience-gradient)"
                strokeWidth="1"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="experience-gradient" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-24">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}-${exp.period}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="absolute left-[-28px] md:left-1/2 top-10 md:top-1/2 w-3 h-3 rounded-full border border-color-primary/30 bg-bg-base z-20 transform -translate-x-1/2 hidden md:block" />

                <div className="w-full md:w-[45%]">
                  <div className="portfolio-card p-10 group relative overflow-hidden bg-bg-surface/30 backdrop-blur-xl border-white/5 hover:border-color-primary/20 transition-all duration-500">
                    <div className="absolute top-4 right-6 text-7xl font-black opacity-[0.02] mono pointer-events-none group-hover:opacity-[0.05] transition-opacity text-color-text">
                      {exp.badge}
                    </div>

                    <div className="flex flex-col gap-8 relative z-10">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] mono text-color-muted uppercase tracking-[0.2em] font-bold mb-4">
                          <span className="inline-flex items-center gap-2">
                            <FaCalendarAlt size={12} className="text-color-primary" />
                            {exp.period}
                          </span>
                          {exp.location ? (
                            <span className="inline-flex items-center gap-2">
                              <FaMapMarkerAlt size={12} className="text-color-accent" />
                              {exp.location}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="text-2xl font-bold text-color-text leading-tight mb-2">{exp.role}</h3>
                        <p className="text-[11px] mono font-bold text-color-accent uppercase tracking-[0.3em]">{exp.company}</p>
                      </div>

                      <ul className="space-y-4">
                        {exp.achievements.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-4 text-[13px] md:text-sm text-color-muted leading-relaxed group/item">
                            <FaChevronRight size={10} className="mt-1.5 text-color-primary group-hover/item:translate-x-1 transition-transform shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                        {exp.stack.map((tag) => (
                          <span key={tag} className="text-[9px] mono px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-color-muted uppercase font-bold tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
