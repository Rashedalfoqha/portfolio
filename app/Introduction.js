'use client';
import Image from 'next/image';

export default function IntroductionSection() {
  const contact = [
    {
      image: "https://www.svgrepo.com/show/475654/github-color.svg",
      alt: "GitHub",
      link: "https://github.com/Rashedalfoqha",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      image: "https://www.svgrepo.com/show/217146/gmail.svg",
      alt: "Gmail",
      link: "mailto:rashedmohammadalfoqha@gmail.com",
      gradient: "from-red-400 to-orange-400"
    },
    {
      image: "https://www.svgrepo.com/show/452047/linkedin-1.svg",
      alt: "LinkedIn",
      link: "https://www.linkedin.com/in/rashed-alfoqha/",
      gradient: "from-blue-400 to-cyan-400"
    }
  ];

  const skills = [
    {
      title: 'Full-Stack Development',
      description: 'JavaScript, TypeScript, React, Node.js, Express',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Frontend Technologies',
      description: 'Next.js, Redux, TailwindCSS, Material UI',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Backend & Databases',
      description: 'REST APIs, MongoDB, PostgreSQL, Socket.IO',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    },
    {
      title: 'Tools & Platforms',
      description: 'Git, GitHub, Firebase, Postman, VS Code',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const projects = [
    { number: '5+', label: 'Full-Stack Projects' },
    { number: '400+', label: 'Coding Hours' },
    { number: '100%', label: 'Bootcamp Completed' },
    { number: '25%', label: 'Efficiency Improved' }
  ];

  return (
    <section id="about" className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
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
              Full-Stack Developer
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            MERAKI Academy Graduate | JavaScript & TypeScript Specialist
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">My Journey</h3>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  I&rsquo;m <span className="font-semibold text-indigo-600">Rashed Alfugaha</span>, a dedicated Full-Stack Developer with a recent intensive training from <span className="font-semibold">MERAKI Academy</span>. I specialize in building scalable web applications using modern technologies like <span className="font-semibold">JavaScript, TypeScript, React.js, Node.js, and both SQL & NoSQL databases</span>.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  During my bootcamp, I completed <span className="font-semibold">400+ hours of hands-on coding</span> and developed multiple full-stack projects including EV charging management systems, team collaboration tools, and social platforms. I&rsquo;m passionate about creating efficient, user-focused solutions with clean, maintainable code.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  With a background in <span className="font-semibold">Islamic Arts</span> and experience in <span className="font-semibold">CAD design</span>, I bring a unique perspective to UI/UX design, combining technical precision with aesthetic sensibility.
                </p>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 font-medium">
                        <span className="font-bold">Currently:</span> Seeking full-time opportunities as a Full-Stack Developer where I can contribute to innovative projects and continue growing my technical expertise.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Links */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-600">Connect with me:</span>
                <div className="flex gap-3">
                  {contact.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-3 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={24}
                        height={24}
                        className="w-6 h-6 relative z-10"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 text-center hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {project.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium mt-1">{project.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Education */}
          <div className="space-y-6">
            {/* Technical Skills */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-2xl text-white">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Technical Skills
              </h3>
              <p className="text-indigo-100 mb-6">Modern full-stack development technologies</p>
              
              <div className="grid grid-cols-1 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.title}
                    className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                        <div className="text-white">
                          {skill.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{skill.title}</h4>
                        <p className="text-indigo-100 text-sm">{skill.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Education & Certification
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-800">Immersive Full-Stack Web Development Bootcamp</h4>
                  <p className="text-gray-600 text-sm">MERAKI Academy • Oct 2023 – Mar 2024</p>
                  <p className="text-gray-700 text-sm mt-1">400+ hours of intensive hands-on coding and project development</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800">Bachelor of Islamic Arts</h4>
                  <p className="text-gray-600 text-sm">WISE University • Jul 2019 – Jul 2023</p>
                  <p className="text-gray-700 text-sm mt-1">Specialized in Islamic architecture and decorative arts</p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Arabic (Native)', 'English (Proficient)', 'Turkish (Proficient)'].map((language, index) => (
                  <span key={index} className="px-3 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg">
                    {language}
                  </span>
                ))}
              </div>
            </div>
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