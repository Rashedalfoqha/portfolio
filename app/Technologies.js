'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const techCategories = [
    {
      title: "Frontend",
      technologies: [
        { name: "React", icon: "https://www.svgrepo.com/show/452092/react.svg" },
        { name: "Next.js", icon: "https://www.svgrepo.com/show/368858/nextjs.svg" },
        { name: "Redux", icon: "https://www.svgrepo.com/show/354274/redux.svg" },
        { name: "Tailwind", icon: "https://www.svgrepo.com/show/374118/tailwind.svg" },
        { name: "Material UI", icon: "https://www.svgrepo.com/show/354048/material-ui.svg" },
        { name: "SCSS", icon: "https://www.svgrepo.com/show/374067/scss.svg" },
      ]
    },
    {
      title: "Backend",
      technologies: [
        { name: "Node.js", icon: "https://www.svgrepo.com/show/452075/node-js.svg" },
        { name: "NestJS", icon: "https://i.ibb.co/1tvBHVL1/Nest-js.png" },
        { name: "Express", icon: "https://www.svgrepo.com/show/330398/express.svg" },
        { name: "Socket.io", icon: "https://www.svgrepo.com/show/342225/socket-io.svg" },
        { name: "REST APIs", icon: "https://www.svgrepo.com/show/349419/json.svg" },
        { name: "Nodemailer", icon: "https://www.svgrepo.com/show/473731/nodemailer.svg" },
      ]
    },
    {
      title: "Databases & Cloud",
      technologies: [
        { name: "MongoDB", icon: "https://www.svgrepo.com/show/331488/mongodb.svg" },
        { name: "PostgreSQL", icon: "https://www.svgrepo.com/show/303301/postgresql-logo.svg" },
        { name: "Redis", icon: "https://www.svgrepo.com/show/452093/redis.svg" },
        { name: "Supabase", icon: "https://www.svgrepo.com/show/354413/supabase-icon.svg" },
        { name: "Firebase", icon: "https://www.svgrepo.com/show/373595/firebase.svg" },
        { name: "Cloudinary", icon: "https://www.svgrepo.com/show/353566/cloudinary.svg" },
      ]
    },
    {
      title: "Tools & AI",
      technologies: [
        { name: "Git", icon: "https://www.svgrepo.com/show/452210/git.svg" },
        { name: "Docker", icon: "https://www.svgrepo.com/show/452192/docker.svg" },
        { name: "Vercel", icon: "https://www.svgrepo.com/show/361376/vercel.svg" },
        { name: "Claude AI", icon: "https://i.ibb.co/3ykCskzM/image.png" },
        { name: "Postman", icon: "https://www.svgrepo.com/show/354202/postman-icon.svg" },
        { name: "VS Code", icon: "https://www.svgrepo.com/show/374171/vscode.svg" },
      ]
    }
  ];

  const categories = ['All', ...techCategories.map(cat => cat.title)];

  const filteredTech = activeCategory === 'All' 
    ? techCategories.flatMap(cat => cat.technologies)
    : techCategories.find(cat => cat.title === activeCategory)?.technologies || [];

  return (
    <section id="technologies" className="section-container">
      <div className="text-center mb-[48px]">
        <h2 className="section-title">My Technologies</h2>
        <p className="text-body max-w-[600px] mx-auto">
          Tools and technologies I use to bring ideas to life
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-[16px] mb-[48px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-[24px] py-[8px] rounded-full text-[14px] font-semibold transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-[#6C3CE1] text-white shadow-lg' 
                : 'bg-white text-[#1A1A2E] border border-gray-200 hover:border-[#6C3CE1]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-[16px] justify-items-center">
        {filteredTech.map((tech, index) => (
          <div 
            key={index} 
            className="portfolio-card w-[80px] h-[80px] flex flex-col items-center justify-center p-[8px] gap-[4px]"
          >
            <div className="w-[32px] h-[32px] relative flex items-center justify-center">
              <Image 
                src={tech.icon} 
                alt={tech.name} 
                width={24} 
                height={24} 
                className="object-contain"
              />
            </div>
            <span className="text-[10px] font-bold text-[#1A1A2E] text-center line-clamp-1">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}