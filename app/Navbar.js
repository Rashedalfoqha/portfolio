'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';
import { navLinks, profile } from './portfolioData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto px-6">
        <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between border-white/5 transition-all duration-300 ${scrolled ? 'bg-bg-surface/80 shadow-2xl' : 'bg-transparent border-transparent'}`}>
          
          <a href="#home" className="flex items-center group shrink-0">
            <span className="text-sm font-bold tracking-tight text-color-text group-hover:text-color-accent transition-colors">{profile.fullName}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-[10px] font-bold mono uppercase tracking-[0.2em] text-color-muted hover:text-color-text transition-colors group"
              >
                {link.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-[1px] bg-color-accent transition-all group-hover:w-full"
                />
              </a>
            ))}
            
            <div className="flex items-center gap-6 pl-6 border-l border-white/10">
              <ThemeToggle />
              <a href="#contact" className="btn-hire-me group" aria-label="Hire Rashed Alfuqaha">
                <span className="btn-hire-me-inner px-6 py-2.5 text-[10px] mono uppercase font-bold tracking-widest group-hover:bg-transparent group-hover:text-white transition-all">
                  Hire Me
                </span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-4">
            <ThemeToggle />
            <button 
              className="text-color-text p-2 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[999] bg-bg-base/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-bold tracking-tighter hover:text-color-accent transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setIsOpen(false)}
              className="btn-hire-me mt-6"
              aria-label="Hire Rashed Alfuqaha"
            >
              <span className="btn-hire-me-inner px-12 py-5 text-xl">Hire Me</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
