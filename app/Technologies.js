export function TechnologiesSection() {
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
            Technologies I've been working with recently
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
                      <img 
                        src={tech.icon} 
                        alt={tech.name} 
                        className="h-8 w-8 object-contain group-hover:scale-110 transition duration-300"
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


// Hero Section Component

// Introduction Section


// Technologies Section


// Projects Section


// Contact Section
// export function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log('Form submitted:', formData);
//     alert('Thank you for your message! I will get back to you soon.');
//     setFormData({ name: '', email: '', message: '' });
//   };

//   return (
//     <section id="contact" className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//             Get In <span className="text-indigo-600">Touch</span>
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Have a project in mind or want to discuss potential opportunities?
//           </p>
//           <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           <div className="bg-white p-8 rounded-xl shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6">Send me a message</h3>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="5"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 ></textarea>
//               </div>
              
//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-300"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
          
//           <div className="space-y-8">
//             <div className="bg-white p-8 rounded-xl shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              
//               <div className="space-y-4">
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-full">
//                     <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500">Email</h4>
//                     <a 
//                       href="mailto:rashedmohammadalfoqha@gmail.com" 
//                       className="text-gray-700 hover:text-indigo-600"
//                     >
//                       rashedmohammadalfoqha@gmail.com
//                     </a>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-full">
//                     <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500">Phone</h4>
//                     <span className="text-gray-700">Available upon request</span>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-full">
//                     <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500">Location</h4>
//                     <span className="text-gray-700">Amman, Jordan</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white p-8 rounded-xl shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6">Connect With Me</h3>
//               <div className="flex space-x-4">
//                 <a 
//                   href="https://github.com/Rashedalfoqha" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="p-3 bg-gray-100 rounded-full hover:bg-indigo-100 transition duration-300 hover:scale-110"
//                 >
//                   <img src="https://www.svgrepo.com/show/475654/github-color.svg" alt="GitHub" className="w-6 h-6" />
//                 </a>
//                 <a 
//                   href="https://www.linkedin.com/in/rashed-alfoqha/" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="p-3 bg-gray-100 rounded-full hover:bg-indigo-100 transition duration-300 hover:scale-110"
//                 >
//                   <img src="https://www.svgrepo.com/show/452047/linkedin-1.svg" alt="LinkedIn" className="w-6 h-6" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
