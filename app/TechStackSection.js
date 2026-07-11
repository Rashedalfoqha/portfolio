'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiDesktopComputer, HiServer, HiDatabase, HiSparkles, HiTerminal } from 'react-icons/hi';
import { concepts, softSkills, techCategories, techData } from './portfolioData';

const iconMap = {
  desktop: <HiDesktopComputer size={18} />,
  server: <HiServer size={18} />,
  database: <HiDatabase size={18} />,
  sparkles: <HiSparkles size={18} />
};

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState('frontend');

  return (
    <section id="stack" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="mono text-color-accent text-[10px] tracking-[0.6em] uppercase mb-6 block font-bold">Technical Skillset</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-color-text">Tech Stack</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-6xl mx-auto">
          <div className="lg:col-span-4 space-y-3">
            {techCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`w-full p-6 rounded-2xl flex items-center gap-6 transition-all duration-500 border relative group overflow-hidden ${
                  activeTab === cat.id
                    ? 'bg-color-primary border-color-primary text-white shadow-2xl'
                    : 'bg-bg-surface/30 border-white/5 text-color-muted hover:border-white/10'
                }`}
                aria-label={`View ${cat.name} tech stack`}
              >
                <div className={`p-3 rounded-xl transition-colors ${activeTab === cat.id ? 'bg-white/10 text-white' : 'bg-white/5 text-color-primary group-hover:text-color-accent'}`}>
                  {iconMap[cat.icon]}
                </div>
                <div className="text-left">
                  <h4 className={`text-[11px] font-bold mono uppercase tracking-widest ${activeTab === cat.id ? 'text-white' : 'text-color-text'}`}>{cat.name}</h4>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {techData[activeTab].map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="portfolio-card p-6 border-white/5 group bg-bg-surface/20"
                  >
                    <div className="flex justify-between items-center gap-4 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <HiTerminal size={14} className="text-color-primary opacity-50 shrink-0" />
                        <h4 className="font-bold text-color-text mono uppercase tracking-widest text-[10px] truncate">{tech.name}</h4>
                      </div>
                      <span className="text-[9px] mono text-color-muted font-bold shrink-0">{tech.level}%</span>
                    </div>

                    <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level}%` }}
                        transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full ${activeTab === 'tools' ? 'bg-color-accent' : 'bg-color-primary'}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-12 border-t border-white/5 text-center"
        >
          <span className="mono text-[9px] text-color-muted uppercase tracking-[0.5em] block mb-8">Concepts and Strengths</span>
          <div className="flex flex-wrap justify-center gap-4">
            {[...concepts, ...softSkills].map((item) => (
              <div key={item} className="px-6 py-2 rounded-full glass border-white/5 text-[9px] font-bold text-color-accent mono uppercase tracking-widest">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
