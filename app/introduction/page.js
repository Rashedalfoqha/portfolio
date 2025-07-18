'use client';

import Image from "next/image";
export default function Page() {
 const contact = [
     {
       image: "https://www.svgrepo.com/show/475654/github-color.svg",
       alt: "GitHub",
       link: "https://github.com/Rashedalfoqha"
     },
     {
       image: "https://www.svgrepo.com/show/217146/gmail.svg",
       alt: "Gmail",
       link: "mailto:rashedmohammadalfoqha@gmail.com"
     },
     {
       image: "https://www.svgrepo.com/show/452047/linkedin-1.svg",
       alt: "LinkedIn",
       link: "https://www.linkedin.com/in/rashed-alfoqha/"
     }
   ];
 
   return (
     <section id="about" className="py-20 bg-white">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
             About <span className="text-indigo-600">Me</span>
           </h2>
           <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
         </div>
 
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
             <p className="text-lg text-gray-700 leading-relaxed">
               Hello, I&apos;m Rashed, an experienced Full Stack Developer specializing in web development. 
               Equipped with expertise in both front-end and back-end technologies, I am fueled by a 
               passion for continuous learning and collaboration.
             </p>
             <p className="text-lg text-gray-700 leading-relaxed">
               My aim is to leverage my skills to deliver high-quality solutions while advancing my 
               professional development. I believe in creating applications that are not only functional 
               but also provide exceptional user experiences.
             </p>
             <p className="text-lg text-gray-700 leading-relaxed">
               When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source 
               projects, or mentoring aspiring developers.
             </p>
 
             <div className="flex space-x-4 pt-4">
               {contact.map((item, index) => (
                 <a
                   key={index}
                   href={item.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="p-3 bg-gray-100 rounded-full hover:bg-indigo-100 transition duration-300 hover:scale-110"
                 >
                   <Image
                     src={item.image}
                     alt={item.alt}
                     width={24}
                     height={24}
                     className="w-6 h-6"
                   />
                 </a>
               ))}
             </div>
           </div>
 
           <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-8 rounded-xl shadow-lg">
             <div className="grid grid-cols-2 gap-4">
               {[
                 'FullStack Development',
                 'FrontEnd Design',
                 'BackEnd Architecture',
                 'Database Management',
                 'API Development',
                 'Performance Optimization'
               ].map((skill) => (
                 <div key={skill} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                   <div className="flex items-center space-x-3">
                     <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                     <span className="text-gray-700 font-medium">{skill}</span>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 }
 