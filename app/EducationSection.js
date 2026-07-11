'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaLanguage, FaStar } from 'react-icons/fa';
import { education, languages } from './portfolioData';

const iconMap = {
  code: <FaCode size={32} />,
  graduation: <FaGraduationCap size={32} />
};

const toneClasses = {
  primary: {
    bg: 'bg-color-primary/10',
    text: 'text-color-primary'
  },
  gold: {
    bg: 'bg-color-gold/10',
    text: 'text-color-gold'
  }
};

export default function EducationSection() {
  return (
    <section id="education" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="mono text-color-gold text-[10px] tracking-[0.6em] uppercase mb-6 block font-bold">Academic Foundation</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-color-text">Education</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, i) => {
            const tone = toneClasses[edu.tone] || toneClasses.primary;

            return (
              <motion.div
                key={`${edu.school}-${edu.period}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="portfolio-card p-12 bg-bg-surface/20 border-white/5 relative group flex flex-col justify-between"
              >
                <div className="flex flex-col gap-8">
                  <div className={`w-16 h-16 rounded-2xl ${tone.bg} flex items-center justify-center ${tone.text}`}>
                    {iconMap[edu.icon]}
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-color-text mb-2 tracking-tight">{edu.title}</h3>
                    <p className={`text-sm mono ${tone.text} uppercase tracking-[0.2em] font-bold`}>{edu.school}</p>
                    <p className="text-[10px] mono text-color-muted mt-1 uppercase font-bold">{edu.period}</p>
                  </div>

                  <p className="text-color-muted leading-relaxed font-medium text-base">
                    {edu.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-8 mt-8 border-t border-white/5">
                  <FaStar className={`${tone.text} opacity-50`} size={14} />
                  <span className="text-[9px] mono uppercase tracking-widest text-color-text font-black">{edu.credential}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto mt-10 portfolio-card p-8 bg-bg-surface/20 border-white/5"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-color-accent/10 flex items-center justify-center text-color-accent">
                <FaLanguage size={26} />
              </div>
              <div>
                <p className="text-[10px] mono uppercase tracking-[0.3em] text-color-muted font-bold">Languages</p>
                <h3 className="text-2xl font-bold text-color-text">Communication Range</h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {languages.map((language) => (
                <div key={language.name} className="px-4 py-3 rounded-xl border border-white/10 bg-white/5">
                  <p className="text-sm font-bold text-color-text">{language.name}</p>
                  <p className="text-[9px] mono uppercase tracking-widest text-color-muted mt-1">{language.proficiency}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
