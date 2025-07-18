'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
export default function HeroSection() {
  const roles = ["FullStack Developer", "FrontEnd Specialist", "BackEnd Engineer"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [ roles.length ]);

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Hello, I&apos;m <span className="text-indigo-600">Rashed</span> Mohammad
            </h1>
            
            <div className="h-16">
              <div className="inline-block overflow-hidden">
                {roles.map((role, index) => (
                  <div 
                    key={role}
                    className={`text-2xl md:text-3xl font-semibold text-gray-700 transition-all duration-500 ${index === currentRole ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'}`}
                  >
                    {role}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4 justify-center md:justify-start">
              <a 
                href="/contact" 
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
              >
                Contact Me
              </a>
              <a 
                href="/projects" 
                className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-300"
              >
                View Projects
              </a>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-xl">
              <Image
                src="https://i.ibb.co/r7fwh58/Whats-App-Image-2024-03-01-at-1-47-18-PM.png"
                alt="Rashed Mohammad"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-right-8 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex space-x-2">
                {['HTML', 'CSS', 'JS', 'React'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-indigo-400"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
