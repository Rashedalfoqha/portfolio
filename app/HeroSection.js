'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight } from 'react-icons/fa';
import { profile, roleLoop } from './portfolioData';

export default function HeroSection() {
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = isDeleting ? 50 : 150;

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentRole = roleLoop[roleIndex];
      if (!isDeleting) {
        setRoleText(currentRole.substring(0, roleText.length + 1));
        if (roleText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setRoleText(currentRole.substring(0, roleText.length - 1));
        if (roleText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roleLoop.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-color-gold/10 mb-12"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] mono uppercase tracking-[0.4em] text-color-text font-bold">{profile.availability}</span>
        </motion.div>

        {/* Elegant Name Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-7xl md:text-[10rem] font-bold leading-[0.85] tracking-tightest text-color-text">
            {profile.firstName} <br />
            <span className="text-gradient block mt-4">{profile.lastName}</span>
          </h1>
        </motion.div>

        {/* Typewriter Role */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-10 mb-12 flex items-center justify-center gap-4"
        >
          <div className="w-8 h-[1px] bg-color-primary/30" />
          <p className="text-lg md:text-2xl mono text-color-muted uppercase tracking-[0.4em] font-medium typewriter-cursor">
            {roleText}
          </p>
          <div className="w-8 h-[1px] bg-color-primary/30" />
        </motion.div>

        {/* Short Bio */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-color-muted text-base md:text-lg max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
        >
          {profile.heroSummary}
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          <a href="#projects" className="group px-12 py-5 bg-color-primary text-white rounded-xl font-bold mono text-[11px] uppercase tracking-widest flex items-center gap-4 hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] transition-all transform hover:scale-[1.02]">
            View Projects
            <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href={profile.cvHref} download className="px-12 py-5 border border-white/10 text-color-text rounded-xl font-bold mono text-[11px] uppercase tracking-widest flex items-center gap-4 hover:bg-white/5 transition-all" aria-label="Download CV">
            Download CV <FaDownload size={14} />
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex items-center justify-center gap-10"
        >
          {[
            { icon: <FaGithub size={22} />, href: profile.githubUrl, label: "GitHub" },
            { icon: <FaLinkedin size={22} />, href: profile.linkedinUrl, label: "LinkedIn" },
            { icon: <FaEnvelope size={22} />, href: `mailto:${profile.primaryEmail}`, label: "Email" }
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-color-muted hover:text-color-accent transition-all transform hover:-translate-y-1"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Decorative Grid Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-bg-base to-transparent pointer-events-none" />
    </section>
  );
}
