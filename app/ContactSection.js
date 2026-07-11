'use client';
import React, { useState } from 'react';
import { motion as fm, AnimatePresence as Ap } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSpinner, FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from './portfolioData';

export default function ContactSection() {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden section-engineering">
      <div className="container mx-auto px-6 relative z-10">
        
        <fm.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="mono text-color-accent text-xs tracking-[0.6em] uppercase mb-6 block font-bold">Get In Touch</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-color-text">Contact</h2>
        </fm.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Info Side */}
          <fm.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h3 className="text-4xl font-bold tracking-tight text-color-text">Let&apos;s Build Something <span className="text-color-accent italic">Precise</span></h3>
              <p className="text-color-muted text-lg leading-relaxed max-w-md font-medium">
                Whether you need a full-stack product, API, dashboard, or production-ready web application, I&apos;m ready to translate your vision into scalable code.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: <FaEnvelope />, label: "Email", value: profile.primaryEmail, href: `mailto:${profile.primaryEmail}` },
                { icon: <FaPhone />, label: "Phone", value: profile.phoneDisplay, href: profile.phoneHref },
                { icon: <FaMapMarkerAlt />, label: "Location", value: profile.location, href: "#" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-bg-surface border border-white/5 flex items-center justify-center text-color-accent group-hover:border-color-accent transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] mono uppercase tracking-widest text-color-muted font-bold">{item.label}</p>
                    <a href={item.href} className="text-lg font-bold text-color-text hover:text-color-accent transition-colors">
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-8">
              {[
                { icon: <FaGithub size={24} />, href: profile.githubUrl, label: "GitHub" },
                { icon: <FaLinkedin size={24} />, href: profile.linkedinUrl, label: "LinkedIn" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-color-muted hover:text-color-primary hover:border-color-primary transition-all border border-white/5">
                  {social.icon}
                </a>
              ))}
            </div>
          </fm.div>

          {/* Form Side */}
          <fm.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="portfolio-card p-10 md:p-12 space-y-8 bg-bg-surface/50 border-white/5 relative overflow-hidden">
               <Ap mode="wait">
                 {status === 'success' ? (
                   <fm.div
                     key="success"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="absolute inset-0 z-20 bg-bg-surface flex flex-col items-center justify-center text-center p-10"
                   >
                     <FaCheckCircle size={64} className="text-green-500 mb-6" />
                     <h3 className="text-3xl font-bold text-color-text mb-4">Transmission Received</h3>
                     <p className="text-color-muted font-medium">Your message has been logged into the system. I will respond within 24 hours.</p>
                     <button 
                       onClick={() => setStatus('idle')}
                       className="mt-10 px-8 py-3 glass border-white/10 rounded-xl text-sm font-bold mono uppercase tracking-widest hover:border-color-primary transition-all"
                     >
                       Send Another
                     </button>
                   </fm.div>
                 ) : null}
               </Ap>

               <div className="space-y-2">
                 <label htmlFor="name" className="text-[10px] mono uppercase tracking-[0.3em] text-color-muted font-bold pl-1">Identification</label>
                 <input 
                   id="name"
                   type="text" 
                   required
                   placeholder="YOUR NAME"
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-color-text focus:outline-none focus:border-color-accent transition-all mono text-sm"
                 />
               </div>

               <div className="space-y-2">
                 <label htmlFor="email" className="text-[10px] mono uppercase tracking-[0.3em] text-color-muted font-bold pl-1">Access Protocol</label>
                 <input 
                   id="email"
                   type="email" 
                   required
                   placeholder="YOUR_EMAIL@DOMAIN.COM"
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-color-text focus:outline-none focus:border-color-accent transition-all mono text-sm"
                 />
               </div>

               <div className="space-y-2">
                 <label htmlFor="message" className="text-[10px] mono uppercase tracking-[0.3em] text-color-muted font-bold pl-1">Message Payload</label>
                 <textarea 
                   id="message"
                   required
                   rows="5"
                   placeholder="ENTER PROJECT SPECIFICATIONS..."
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-color-text focus:outline-none focus:border-color-accent transition-all mono text-sm resize-none"
                 ></textarea>
               </div>

               <button 
                 type="submit" 
                 disabled={status === 'loading'}
                 className="w-full btn-hire-me group py-1"
               >
                 <span className="btn-hire-me-inner flex items-center justify-center gap-3 py-5">
                   {status === 'loading' ? (
                     <FaSpinner className="animate-spin" size={18} />
                   ) : (
                     <>TRANSMIT DATA <FaPaperPlane size={14} /></>
                   )}
                 </span>
               </button>
            </form>
          </fm.div>

        </div>
      </div>
    </section>
  );
}
