'use client';
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutContent, skillSynthesis, stats } from './portfolioData';

function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value, 10);
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}</span>;
}

export default function AboutSection() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >
          <span className="mono text-color-accent text-[10px] tracking-[0.6em] uppercase mb-6 block font-bold">{aboutContent.eyebrow}</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-color-text">
            Where <span className="text-color-gold italic">{aboutContent.titleParts[0]}</span> Meets <br />
            <span className="text-color-accent">{aboutContent.titleParts[1]}</span> Meets <span className="text-color-primary">{aboutContent.titleParts[2]}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Column 1: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-[1px] bg-color-primary" />
              <h3 className="text-[11px] font-bold mono uppercase tracking-widest text-color-text">The Narrative</h3>
            </div>
            
            <div className="space-y-6 text-color-muted text-base leading-relaxed font-medium">
              {aboutContent.narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="portfolio-card p-8 flex flex-col justify-center items-center bg-bg-surface/20 border-white/5 relative"
              >
                <div className="text-3xl font-bold text-color-text mb-2 mono tracking-tighter">
                  <Counter value={stat.value} />
                </div>
                <span className="text-[8px] mono uppercase tracking-[0.2em] text-color-muted text-center font-black">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Column 3: Skill Synthesis */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-[11px] font-bold mono uppercase tracking-widest text-color-text">Skill Synthesis</h3>
            <div className="flex flex-wrap gap-2.5">
              {skillSynthesis.map((skill, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 rounded-md border text-[9px] font-bold mono uppercase tracking-widest cursor-default transition-all ${
                    skill.category === 'Frontend' ? 'border-color-primary/20 text-color-primary bg-color-primary/5' :
                    skill.category === 'Backend' ? 'border-color-accent/20 text-color-accent bg-color-accent/5' :
                    skill.category === 'Data' ? 'border-color-gold/20 text-color-gold bg-color-gold/5' :
                    skill.category === 'Tools' ? 'border-white/10 text-color-text bg-white/5' :
                    'border-color-gold/20 text-color-gold bg-color-gold/5'
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
