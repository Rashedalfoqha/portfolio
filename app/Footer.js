'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronUp, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from './portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FaGithub size={20} />, href: profile.githubUrl, label: "GitHub" },
    { icon: <FaLinkedin size={20} />, href: profile.linkedinUrl, label: "LinkedIn" },
    { icon: <FaEnvelope size={20} />, href: `mailto:${profile.primaryEmail}`, label: "Email" }
  ];

  return (
    <footer className="bg-bg-base border-t border-white/5 py-16 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          
          <div className="flex items-center">
            <div>
              <p className="text-sm font-bold text-color-text tracking-tight">{profile.fullName}</p>
              <p className="text-[10px] mono text-color-muted uppercase tracking-[0.4em] mt-1 font-bold">&copy; {currentYear}</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-color-muted hover:text-color-accent transition-all p-2 glass rounded-lg border-white/5"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ y: -8 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-color-muted group-hover:border-color-primary group-hover:text-color-primary transition-all duration-500">
              <FaChevronUp size={20} />
            </div>
            <span className="text-[8px] mono uppercase tracking-[0.4em] text-color-muted font-black">To Origin</span>
          </motion.button>

        </div>
      </div>
    </footer>
  );
}
