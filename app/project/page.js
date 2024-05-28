"use client";
import Image from "next/image";
export default function Page() {
  const projects = [
    {
      name: "RA Job Search",
      des: `I independently developed a full-stack website aimed at assisting users in finding suitable job opportunities. The site was designed with a user-friendly interface to streamline the job search process for individuals of all backgrounds. Its goal is to simplify the job search experience and help users .`,
      image: "https://i.ibb.co/N2PhfDm/3.png",
      deployLink: "https://1obsearch.netlify.app/",
      codeLink: "https://github.com/C9-Rashedalfoqha/RA-Job",
    },
    {
      name: "NotNull Social Space",
      des: `Team work full-stack site. NotNull Social Space is a social media platform that provides users with a space to connect, share, and engage with others. This platform aims to create a vibrant community where users can express themselves, share their experiences, and build meaningful connections.`,
      image: "https://i.ibb.co/LzyYCrM/2.png",
      deployLink: "https://main--notnullsocailspace.netlify.app/",
      codeLink: "https://github.com/not6null/NotNull",
    },
    {
      name: "Quiz Game",
      des: `The Quiz Game application is an interactive web application designed to test users&apos; knowledge on various topics. The application leverages HTML for creating the basic structure of the pages, CSS for styling and designing an attractive user interface, and jQuery for adding interactivity and smooth user experience.`,
      image: "https://i.ibb.co/54H1qYS/1.png",
      deployLink: "https://projectonequizgmae.netlify.app/",
      codeLink: "https://github.com/C9-Rashedalfoqha/MERAKI_Academy_Project_2",
    },
  ];

  return (
    <div className="bg-gray-100">
      <h1 className="text-center text-4xl md:text-5xl p-2 pb-2 pt-14 mb-6 font-extrabold">
        My Project
      </h1>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-wrap">
        {projects.map((project, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4 hover:scale-125 transition duration-500"
          >
            <Image
              className="w-full"
              src={project.image}
              alt={`${project.name} Logo`}
              width={400}
              height={300}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{project.name}</div>
              <p className="text-gray-700 text-base">{project.des}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <a href={project.deployLink}>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:scale-110 transition duration-300">
                  Deploy Link
                </span>
              </a>
              <a href={project.codeLink}>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:scale-110 transition duration-300">
                  Code GitHub
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
