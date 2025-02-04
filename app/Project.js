"use client";
import Image from "next/image";
export default function Page() {
  const projects = [
    {
      name: "RA Job Search",
      des: `I independently developed a full-stack website aimed at assisting users in finding suitable job opportunities. The site was designed with a user-friendly interface to streamline the job search process for individuals of all backgrounds. Its goal is to simplify the job search experience and help users .`,
      image: "https://i.ibb.co/N2PhfDm/3.png",
      codeLink: "https://github.com/C9-Rashedalfoqha/RA-Job",
    },
    {
      name: "NotNull Social Space",
      des: `Team work full-stack site. NotNull Social Space is a social media platform that provides users with a space to connect, share, and engage with others. This platform aims to create a vibrant community where users can express themselves, share their experiences, and build meaningful connections.`,
      image: "https://i.ibb.co/LzyYCrM/2.png",
      codeLink: "https://github.com/not6null/NotNull",
    },
    {
      name: "Quiz Game",
      des: `The Quiz Game application is an interactive web application designed to test users&apos; knowledge on various topics. The application leverages HTML for creating the basic structure of the pages, CSS for styling and designing an attractive user interface, and jQuery for adding interactivity and smooth user experience.`,
      image: "https://i.ibb.co/54H1qYS/1.png",
      codeLink: "https://github.com/C9-Rashedalfoqha/MERAKI_Academy_Project_2",
    },
    {
      name: "Tickln",
      des: `Tickln is a powerful team collaboration tool designed to streamline task management and improve workflow efficiency. With its intuitive interface, teams can create, assign, and track tickets in real time, ensuring seamless communication and project organization. Built with modern technologies, Tickln offers real-time updates, notifications, and a user-friendly dashboard to enhance productivity. Whether you're managing a small project or coordinating a large team, Tickln keeps everything organized and accessible in one place.`,
      image: "https://i.ibb.co/Wk6R9kj/tickin-high-resolution-logo.png",

      codeLink: "https://github.com/Not2Null/NotNullBoards",
    },
    {
      name: "Course Management System",
      des: "The Course Management System is a comprehensive platform designed to streamline course creation, student enrollment, and progress tracking. Built with modern web technologies, it provides educators with an intuitive interface to manage courses efficiently while offering students a seamless learning experience. Key features include user authentication, real-time course updates, automated enrollment tracking, and a responsive design to ensure accessibility across devices.",
      image: "https://i.ibb.co/Q7qMw7zC/1.png",
      codeLink: "https://github.com/Not2Null/CourseManagementSystem",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-10">
        My Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col justify-between h-[400px] hover:scale-105 transition duration-300">
      <Image
        className="rounded-lg object-cover w-full h-40"
        src={project.image}
        alt={`${project.name} Logo`}
        width={400}
        height={200}
      />
      <div className="mt-3 flex-grow">
        <h2 className="text-xl font-bold mb-2">{project.name}</h2>
        <p className="text-gray-700 text-sm">
          {readMore ? project.des : `${project.des.substring(0, 100)}...`}
        </p>
        {project.des.length > 100 && (
          <button
            className="text-blue-500 text-sm mt-2"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <div className="mt-3">
        <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
          <span className="block text-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition">
            View Code
          </span>
        </a>
      </div>
    </div>
  );
}
