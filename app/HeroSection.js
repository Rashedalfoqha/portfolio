'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const roles = ["Full Stack Developer", "JavaScript Specialist", "React & Node.js Developer"];
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Rashedalfoqha",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      gradient: "from-purple-400 to-pink-400"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rashed-alfoqha/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      gradient: "from-blue-400 to-cyan-400"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              MERAKI Academy Graduate • Seeking Opportunities
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Hello, I&apos;m <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Rashed</span> Alfugaha
            </h1>
            
            {/* Animated Role Text */}
            <div className="h-20 flex items-center justify-center lg:justify-start">
              <div className="relative inline-block overflow-hidden h-12">
                {roles.map((role, index) => (
                  <div 
                    key={role}
                    className={`text-2xl md:text-3xl lg:text-4xl font-semibold transition-all duration-500 transform ${
                      index === currentRole 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8 absolute'
                    }`}
                  >
                    <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Full Stack Developer skilled in building scalable web applications using 
              <span className="font-semibold text-indigo-600"> JavaScript, TypeScript, React.js, Node.js, MongoDB, and PostgreSQL</span>. 
              Recently completed 400+ hours at MERAKI Academy. Passionate about clean code, REST APIs, and delivering high-quality software solutions.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">5+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">400+</div>
                <div className="text-sm text-gray-600">Coding Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">4</div>
                <div className="text-sm text-gray-600">Tech Stacks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">3</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Hire Me</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>View Projects</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>rashedmohammadalfoqha@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+962 799 641 651</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <span className="text-sm text-gray-500 font-medium">Connect with me:</span>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={link.name}
                  >
                    <div className={`text-gray-600 group-hover:bg-gradient-to-br ${link.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Image Content */}
          <div className={`relative flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-8 border-white shadow-2xl group">
                <Image
                  src="https://i.ibb.co/r7fwh58/Whats-App-Image-2024-03-01-at-1-47-18-PM.png"
                  alt="Rashed Alfugaha - Full Stack Developer"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Floating Tech Badges */}
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/20">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></span>
                  Core Technologies
                </h3>
                <div className="flex flex-wrap gap-1">
                  {['React.js', 'Node.js', 'MongoDB', 'PostgreSQL'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium rounded-lg border border-indigo-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education Badge */}
              <div className="absolute -top-2 -left-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-xl shadow-lg">
                <div className="text-xs font-semibold">MERAKI</div>
                <div className="text-[10px] opacity-90">Graduate</div>
              </div>

              {/* Location Badge */}
              <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-xl shadow-lg">
                <div className="text-xs font-semibold">Amman</div>
                <div className="text-[10px] opacity-90">Jordan</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors duration-300"
          aria-label="Scroll to about section"
        >
          <span className="text-sm font-medium">View My Work</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-indigo-600 transition-colors duration-300">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse hover:bg-indigo-600 transition-colors duration-300"></div>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}