"use client";
import Image from "next/image";
export default function page() {
  const contact = [
    {
      image: "https://www.svgrepo.com/show/475654/github-color.svg",
      alt: "GitHub",
      link: "https://github.com"
    },
    {
      image: "https://www.svgrepo.com/show/217146/gmail.svg",
      alt: "Gmail",
      link: "mailto:your-email@gmail.com"
    },
    {
      image: "https://www.svgrepo.com/show/452047/linkedin-1.svg",
      alt: "LinkedIn",
      link: "https://linkedin.com"
    }
  ];
  return (
    <div className="bg-indigo-200 w-full pl-80 pb-28 pt-10 border-indigo-200 rounded-tr-full">
      <h1 className="text-start text-5xl p-4 pb-10 mb-16 font-extrabold">
        Introduction
      </h1>
      <p className="text-2xl w-1/2 text-start whitespace-normal ">
        Hello, I'm Rashed, an experienced Full Stack Developer specializing in
        web development. Equipped with expertise in both front-end and back-end
        technologies, I am fueled by a passion for continuous learning and
        collaboration. My aim is to leverage my skills to deliver high-quality
        solutions while advancing my professional development.
      </p>{" "}
      <div className="flex space-x-4 mt-8">
        {contact.map((tech, index) => (
          <a
            href={tech.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={tech.image}
              alt={tech.alt}
              width={50}
              height={50}
              className="hover:scale-110 transition-transform animate-spin"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
