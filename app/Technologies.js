'use client';

import Image from 'next/image';

export default function TechnologiesSection() {
  const techCategories = [
    {
      title: "Frontend",
      technologies: [
        { name: "React", icon: "https://www.svgrepo.com/show/452092/react.svg" },
        { name: "Next.js", icon: "https://www.svgrepo.com/show/368858/nextjs.svg" },
        { name: "Redux", icon: "https://www.svgrepo.com/show/354274/redux.svg" },
        { name: "Tailwind", icon: "https://www.svgrepo.com/show/374118/tailwind.svg" },
        { name: "Material UI", icon: "https://www.svgrepo.com/show/354048/material-ui.svg" },
        { name: "jQuery", icon: "https://www.svgrepo.com/show/353940/jquery.svg" },
      ]
    },
    {
      title: "Backend",
      technologies: [
        { name: "Node.js", icon: "https://www.svgrepo.com/show/452075/node-js.svg" },
        { name: "NestJS", icon: "https://i.ibb.co/1tvBHVL1/Nest-js.png" },
        { name: "Express", icon: "https://www.svgrepo.com/show/330398/express.svg" },
        { name: "Socket.io", icon: "https://www.svgrepo.com/show/342225/socket-io.svg" },
      ]
    },
    {
      title: "Databases",
      technologies: [
        { name: "MongoDB", icon: "https://www.svgrepo.com/show/331488/mongodb.svg" },
        { name: "PostgreSQL", icon: "https://www.svgrepo.com/show/303301/postgresql-logo.svg" },
        { name: "MySQL", icon: "https://i.ibb.co/DHvHrwC2/MySQL.png" },
        { name: "Firebase", icon: "https://www.svgrepo.com/show/373595/firebase.svg" },
      ]
    },
    {
      title: "Languages",
      technologies: [
        { name: "JavaScript", icon: "https://www.svgrepo.com/show/373703/js.svg" },
        { name: "TypeScript", icon: "https://www.svgrepo.com/show/374146/typescript-official.svg" },
        { name: "HTML5", icon: "https://www.svgrepo.com/show/373669/html.svg" },
        { name: "CSS3", icon: "https://www.svgrepo.com/show/452185/css-3.svg" },
      ]
    },
    {
      title: "Tools",
      technologies: [
        { name: "Git", icon: "https://www.svgrepo.com/show/452210/git.svg" },
        { name: "Postman", icon: "https://www.svgrepo.com/show/354202/postman-icon.svg" },
        { name: "Bootstrap", icon: "https://www.svgrepo.com/show/353498/bootstrap.svg" },
      ]
    }
  ];

  return (
    <section id="technologies" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-indigo-600">Tech Stack</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Technologies I&apos;ve been working with recently
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
        </div>
        
        <div className="space-y-12">
          {techCategories.map((category) => (
            <div key={category.title} className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">{category.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.technologies.map((tech) => (
                  <div 
                    key={tech.name}
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition duration-300 group"
                  >
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <Image 
                        src={tech.icon} 
                        alt={tech.name} 
                        width={32} 
                        height={32} 
                        className="object-contain group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
