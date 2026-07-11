'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundSystem() {
  const { scrollYProgress } = useScroll();

  const ambientColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['#D97706', '#D97706', '#06B6D4', '#7C3AED']
  );

  const scrollModulation = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Layer 1: Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 opacity-[0.08] blur-[120px]"
        style={{ backgroundColor: ambientColor }}
      />
      
      {/* Layer 2: Islamic Pattern (Corner Accents) */}
      {/* Top Right */}
      <motion.div 
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] opacity-[0.03] grayscale brightness-[2] blur-[1px]"
        style={{ 
          y: parallaxY,
          backgroundImage: "url('/islmic pattren.svg')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* Bottom Left */}
      <motion.div 
        className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] opacity-[0.03] grayscale brightness-[2] blur-[1px]"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ['0%', '-15%']),
          backgroundImage: "url('/islmic pattren.svg')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* Layer 3: Subtle CAD Grid */}
      <motion.div 
        className="absolute inset-0 cad-grid opacity-[0.04]"
        style={{ opacity: `calc(0.04 * ${scrollModulation})` }}
      />

      {/* Cinematic Film Grain */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="cinematic-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cinematic-noise)" />
        </svg>
      </div>
    </div>
  );
}
