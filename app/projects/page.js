'use client';

import Image from 'next/image';

export default function ProjectsSection() {
  const projects = [
    {
      name: "RA Job Search",
      description: "I independently developed a full-stack website aimed at assisting users in finding suitable job opportunities. The site was designed with a user-friendly interface to streamline the job search process for individuals of all backgrounds.",
      image: "https://i.ibb.co/N2PhfDm/3.png",
      codeLink: "https://github.com/C9-Rashedalfoqha/RA-Job",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      name: "NotNull Social Space",
      description: "Team work full-stack site. NotNull Social Space is a social media platform that provides users with a space to connect, share, and engage with others. This platform aims to create a vibrant community where users can express themselves.",
      image: "https://i.ibb.co/LzyYCrM/2.png",
      codeLink: "https://github.com/not6null/NotNull",
      tags: ["Next.js", "NestJS", "PostgreSQL"]
    },
    {
      name: "Quiz Game",
      description: "The Quiz Game application is an interactive web application designed to test users' knowledge on various topics. The application leverages HTML, CSS, and jQuery for interactivity and smooth user experience.",
      image: "https://i.ibb.co/54H1qYS/1.png",
      codeLink: "https://github.com/C9-Rashedalfoqha/MERAKI_Academy_Project_2",
      tags: ["JavaScript", "jQuery", "Firebase"]
    },
    {
      name: "Tickln",
      description: "Tickln is a powerful team collaboration tool designed to streamline task management and improve workflow efficiency. With its intuitive interface, teams can create, assign, and track tickets in real time.",
      image: "https://i.ibb.co/Wk6R9kj/tickin-high-resolution-logo.png",
      codeLink: "https://github.com/Not2Null/NotNullBoards",
      tags: ["React", "Redux", "Socket.io"]
    },
    {
      name: "Course Management System",
      description: "The Course Management System is a comprehensive platform designed to streamline course creation, student enrollment, and progress tracking. Built with modern web technologies.",
      image: "https://i.ibb.co/Q7qMw7zC/1.png",
      codeLink: "https://github.com/Not2Null/CourseManagementSystem",
      tags: ["TypeScript", "NestJS", "MySQL"]
    },{
      name: "EV Solution JO",
      description: "This project provides a comprehensive system for managing and showcasing DC and AC electric vehicle (EV) charging solutions. The repository includes a full-stack application with both client-facing and admin dashboard interfaces, built primarily with JavaScript.",
      image: "https://i.ibb.co/PvyfYYVG/image.png",
      codeLink: "https://front-end-for-dc-charge-iota.vercel.app/",
      image:"https://i.ibb.co/39bLssPm/image.png",
      tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"]
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-indigo-600">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Some of my recent work and contributions
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative w-full h-48">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  View Code
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
