"use client";
import Image from "next/image";
export default function Page() {
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
    <>
      <div className="flex min-h-screen justify-center items-center p-0 bg-slate-50 animate-fade animate-once animate-duration-[1500ms] animate-ease-in">
        <div className="flex flex-col items-center text-center space-y-28">
          <div className="relative left-56 w-auto h-96 ml-3.5">
            <Image
              src="https://i.ibb.co/r7fwh58/Whats-App-Image-2024-03-01-at-1-47-18-PM.png"
              alt="Profile Image"
              className="absolute right-full bottom-20  object-cover rounded-full m-10 border-r-8 border-l-8 shadow-2xl"
              width={96}
              height={96}
            />

            <h1 className="text-4xl mr-32 ml-32 font-bold">
              Hello, I&apos;m Rashed Mohammad
            </h1>
            <div className="animated-text">
              <div className="line">Full Stack</div>
              <div className="line">FrontEnd</div>
              <div className="line">BackEnd</div>
              {/* <div class="line">Software Engineering</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-indigo-200 w-full pl-80 pb-28 pt-10 border-indigo-200 rounded-tr-full">
        <h1 className="text-start text-5xl p-4 pb-10 mb-16 font-extrabold">
          Introduction
        </h1>
        <p className="text-2xl w-1/2 text-start whitespace-normal">
          Hello, I&apos;m Rashed, an experienced Full Stack Developer
          specializing in web development. Equipped with expertise in both
          front-end and back-end technologies, I am fueled by a passion for
          continuous learning and collaboration. My aim is to leverage my skills
          to deliver high-quality solutions while advancing my professional
          development.
        </p>
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
    </>
  );
}
