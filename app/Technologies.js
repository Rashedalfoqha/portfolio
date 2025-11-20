'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const techCategories = [
    {
      title: "Frontend",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      technologies: [
        { name: "React", icon: "https://www.svgrepo.com/show/452092/react.svg", proficiency: 90 },
        { name: "Next.js", icon: "https://www.svgrepo.com/show/368858/nextjs.svg", proficiency: 85 },
        { name: "Redux", icon: "https://www.svgrepo.com/show/354274/redux.svg", proficiency: 80 },
        { name: "Tailwind", icon: "https://www.svgrepo.com/show/374118/tailwind.svg", proficiency: 95 },
        { name: "Material UI", icon: "https://www.svgrepo.com/show/354048/material-ui.svg", proficiency: 75 },
        { name: "jQuery", icon: "https://www.svgrepo.com/show/353940/jquery.svg", proficiency: 70 },
      ]
    },
    {
      title: "Backend",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-500",
      technologies: [
        { name: "Node.js", icon: "https://www.svgrepo.com/show/452075/node-js.svg", proficiency: 88 },
        { name: "NestJS", icon: "https://i.ibb.co/1tvBHVL1/Nest-js.png", proficiency: 75 },
        { name: "Express", icon: "https://www.svgrepo.com/show/330398/express.svg", proficiency: 90 },
        { name: "Socket.io", icon: "https://www.svgrepo.com/show/342225/socket-io.svg", proficiency: 80 },
      ]
    },
    {
      title: "Databases",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      technologies: [
        { name: "MongoDB", icon: "https://www.svgrepo.com/show/331488/mongodb.svg", proficiency: 85 },
        { name: "PostgreSQL", icon: "https://www.svgrepo.com/show/303301/postgresql-logo.svg", proficiency: 80 },
        { name: "MySQL", icon: "https://i.ibb.co/DHvHrwC2/MySQL.png", proficiency: 75 },
        { name: "Firebase", icon: "https://www.svgrepo.com/show/373595/firebase.svg", proficiency: 70 },
      ]
    },
    {
      title: "Languages",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500",
      technologies: [
        { name: "JavaScript", icon: "https://www.svgrepo.com/show/373703/js.svg", proficiency: 95 },
        { name: "TypeScript", icon: "https://www.svgrepo.com/show/374146/typescript-official.svg", proficiency: 85 },
        { name: "HTML5", icon: "https://www.svgrepo.com/show/373669/html.svg", proficiency: 98 },
        { name: "CSS3", icon: "https://www.svgrepo.com/show/452185/css-3.svg", proficiency: 90 },
      ]
    },
    {
      title: "Tools",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: "from-gray-600 to-gray-800",
      technologies: [
        { name: "Git", icon: "https://www.svgrepo.com/show/452210/git.svg", proficiency: 88 },
        { name: "Postman", icon: "https://www.svgrepo.com/show/354202/postman-icon.svg", proficiency: 85 },
        { name: "Bootstrap", icon: "https://www.svgrepo.com/show/353498/bootstrap.svg", proficiency: 80 },
      ]
    }
  ];

  const allTechnologies = techCategories.flatMap(category => 
    category.technologies.map(tech => ({ ...tech, category: category.title }))
  );

  const filteredTechnologies = activeCategory === 'All' 
    ? allTechnologies 
    : allTechnologies.filter(tech => tech.category === activeCategory);

  return (
    <section id="technologies" className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
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
              Tech Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeCategory === 'All'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
            }`}
          >
            All Technologies
          </button>
          {techCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(category.title)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.title
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Technologies Grid */}
        {activeCategory === 'All' ? (
          // Show by categories
          <div className="space-y-8">
            {techCategories.map((category) => (
              <div key={category.title} className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${category.gradient} rounded-xl`}>
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{category.title}</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {category.technologies.map((tech) => (
                    <div 
                      key={tech.name}
                      className="group relative bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                      {/* Proficiency Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-xl overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${category.gradient} transition-all duration-1000 ease-out`}
                          style={{ width: `${tech.proficiency}%` }}
                        />
                      </div>
                      
                      <div className="flex flex-col items-center pt-2">
                        <div className="w-16 h-16 mb-3 flex items-center justify-center p-3 bg-gray-50 rounded-xl group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 transition-all duration-300">
                          <Image 
                            src={tech.icon} 
                            alt={tech.name} 
                            width={32} 
                            height={32} 
                            className="object-contain group-hover:scale-110 transition duration-300"
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-800 text-center mb-2">
                          {tech.name}
                        </span>
                        <div className="text-xs text-gray-500 font-medium">
                          {tech.proficiency}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show filtered technologies
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredTechnologies.map((tech) => {
              const category = techCategories.find(cat => cat.title === tech.category);
              return (
                <div 
                  key={`${tech.category}-${tech.name}`}
                  className="group relative bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Proficiency Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-2xl overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${category?.gradient} transition-all duration-1000 ease-out`}
                      style={{ width: `${tech.proficiency}%` }}
                    />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300">
                      <Image 
                        src={tech.icon} 
                        alt={tech.name} 
                        width={40} 
                        height={40} 
                        className="object-contain group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <span className="text-base font-bold text-gray-800 text-center mb-2">
                      {tech.name}
                    </span>
                    <div className="text-sm text-gray-600 font-medium">
                      {tech.proficiency}% Proficiency
                    </div>
                    <div className="mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {tech.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to build something amazing?
            </h3>
            <p className="text-gray-600 mb-6">
              Let&rsquo;s combine these technologies to create your next project
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Start a Project</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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