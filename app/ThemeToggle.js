'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaCompass } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isBlueprint = theme === 'light';

  return (
    <button
      onClick={() => setTheme(isBlueprint ? 'dark' : 'light')}
      className="relative w-12 h-12 flex items-center justify-center rounded-xl glass border-white/10 hover:border-color-accent transition-colors overflow-hidden group"
      aria-label="Toggle Theme Mode"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {isBlueprint ? (
            <div className="flex flex-col items-center">
              <FaCompass size={20} className="text-color-accent group-hover:scale-110 transition-transform" />
              <span className="text-[7px] mono uppercase tracking-tighter mt-1 opacity-50 font-bold">Blueprint</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FaMoon size={20} className="text-color-primary group-hover:scale-110 transition-transform" />
              <span className="text-[7px] mono uppercase tracking-tighter mt-1 opacity-50 font-bold">Night</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <motion.div 
        className="absolute inset-0 bg-color-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />
    </button>
  );
}
