'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const projects = [
    {
      name: "EV Solution JO",
      description: "A comprehensive system for managing DC and AC electric vehicle charging solutions with admin dashboard, real-time updates, and analytics. Improved operational efficiency by 25% through optimized workflows.",
      image: "https://i.ibb.co/39bLssPm/image.png",
      codeLink: "https://front-end-for-dc-charge-iota.vercel.app/",
      demoLink: "https://front-end-for-dc-charge-iota.vercel.app/",
      tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      category: "Full Stack",
      featured: true
    },
    {
      name: "TickIn",
      description: "A powerful team collaboration tool with real-time task tracking and communication. Integrated Socket.IO for live updates, enhancing team productivity and project management efficiency.",
      image: "https://i.ibb.co/Wk6R9kj/tickin-high-resolution-logo.png",
      codeLink: "https://github.com/Not2Null/NotNullBoards",
      demoLink: "#",
      tags: ["React", "Redux", "Socket.io", "Node.js", "MongoDB"],
      category: "Full Stack",
      featured: true
    },
    {
      name: "NotNull Social Space",
      description: "A social networking platform with authentication, posts, real-time chat, and responsive UI. Designed for seamless multi-device experience with modern social features.",
      image: "https://i.ibb.co/LzyYCrM/2.png",
      codeLink: "https://github.com/not6null/NotNull",
      demoLink: "#",
      tags: ["Next.js", "NestJS", "PostgreSQL", "Socket.IO", "Firebase"],
      category: "Full Stack",
      featured: true
    },
    {
      name: "RA Job Search",
      description: "A full-stack job search platform with advanced filtering and skill-based matching algorithms. Optimized database queries and APIs for improved performance and user experience.",
      image: "https://i.ibb.co/N2PhfDm/3.png",
      codeLink: "https://github.com/C9-Rashedalfoqha/RA-Job",
      demoLink: "#",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      category: "Full Stack"
    },
    {
      name: "Course Management System",
      description: "Comprehensive platform for course creation, student enrollment, and progress tracking. Implemented secure authentication with role-based access control (RBAC).",
      image: "https://i.ibb.co/Q7qMw7zC/1.png",
      codeLink: "https://github.com/Not2Null/CourseManagementSystem",
      demoLink: "#",
      tags: ["TypeScript", "NestJS", "MySQL", "React"],
      category: "Full Stack"
    },
    {
      name: "Quiz Game",
      description: "Interactive web application testing users&rsquo; knowledge on various topics. Features smooth animations and real-time scoring with Firebase integration.",
      image: "https://i.ibb.co/54H1qYS/1.png",
      codeLink: "https://github.com/C9-Rashedalfoqha/MERAKI_Academy_Project_2",
      demoLink: "#",
      tags: ["JavaScript", "jQuery", "Firebase", "HTML5", "CSS3"],
      category: "Frontend"
    }
  ];

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              My Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Featured <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of my recent full-stack applications and contributions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                project.featured ? 'ring-2 ring-indigo-500/20' : ''
              }`}
            >
              {/* Project Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-sm font-semibold text-center hover:bg-white transition-colors duration-200"
                    >
                      Code
                    </a>
                    {project.demoLink !== '#' && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold text-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium rounded-lg border border-indigo-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 group/code"
                  >
                    <svg className="w-4 h-4 group-hover/code:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="font-semibold">Code</span>
                  </a>
                  
                  {project.demoLink !== '#' && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 group/demo"
                    >
                      <svg className="w-4 h-4 group-hover/demo:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="font-semibold">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Interested in collaborating?
            </h3>
            <p className="text-gray-600 mb-6">
              I&rsquo;m always open to discussing new opportunities and interesting projects.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Let&rsquo;s Work Together</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
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