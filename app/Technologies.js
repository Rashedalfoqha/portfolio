"use client";
import Image from "next/image";
export default function Page() {
  const technologies = [
    {
      image: "https://www.svgrepo.com/show/354274/redux.svg",
      alt: "redux",
      link: "https://redux-toolkit.js.org/",
    },
    {
      image: "https://i.ibb.co/1tvBHVL1/Nest-js.png",
      alt: "Nest-js",
      link: "https://nestjs.com/",
    },
    {
      image: "https://i.ibb.co/DHvHrwC2/MySQL.png",
      alt: "MySql",
      link: "https://www.mysql.com/",
    },

    {
      image: "https://www.svgrepo.com/show/368858/nextjs.svg",
      alt: "next js",
      link: "https://nextjs.org/",
    },
    {
      image: "https://www.svgrepo.com/show/452092/react.svg",
      alt: "react",
      link: "https://react.dev/learn/start-a-new-react-project",
    },
    {
      image: "https://www.svgrepo.com/show/331488/mongodb.svg",
      alt: "mongodb",
      link: "https://www.mongodb.com/",
    },
    {
      image: "https://www.svgrepo.com/show/303301/postgresql-logo.svg",
      alt: "postgresql",
      link: "https://www.elephantsql.com/",
    },
    {
      image: "https://www.svgrepo.com/show/452185/css-3.svg",
      alt: "css",
      link: "https://www.w3schools.com/css/css_intro.asp",
    },
    {
      image: "https://www.svgrepo.com/show/368858/nextjs.svg",
      alt: "html",
      link: "https://nextjs.org/",
    },
    {
      image: "https://www.svgrepo.com/show/373669/html.svg",
      alt: "html",
      link: "https://www.w3schools.com/html/",
    },
    {
      image: "https://www.svgrepo.com/show/452075/node-js.svg",
      alt: "nodeJs",
      link: "https://nodejs.org/en",
    },
    {
      image: "https://www.svgrepo.com/show/373703/js.svg",
      alt: "js",
      link: "https://www.javascript.com/",
    },
    {
      image: "https://www.svgrepo.com/show/452210/git.svg",
      alt: "git",
      link: "https://git-scm.com/",
    },
    {
      image: "https://www.svgrepo.com/show/353498/bootstrap.svg",
      alt: "bootstrap",
      link: "https://www.bootstrap.com",
    },
    {
      image: "https://www.svgrepo.com/show/374118/tailwind.svg",
      alt: "tailwind",
      link: "https://tailwindcss.com/",
    },
    {
      image: "https://www.svgrepo.com/show/353940/jquery.svg",
      alt: "jquery",
      link: "https://releases.jquery.com/",
    },
    {
      image: "https://www.svgrepo.com/show/354048/material-ui.svg",
      alt: "material-ui",
      link: "https://mui.com/",
    },
    {
      image: "https://www.svgrepo.com/show/354202/postman-icon.svg",
      alt: "postman",
      link: "https://www.postman.com/downloads/",
    },
    {
      image: "https://www.svgrepo.com/show/373595/firebase.svg",
      alt: "firebase",
      link: "https://firebase.google.com/",
    },
    {
      image: "https://www.svgrepo.com/show/374146/typescript-official.svg",
      alt: "typescript",
      link: "https://www.typescriptlang.org/",
    },
    {
      image: "https://www.svgrepo.com/show/342225/socket-io.svg",
      alt: "socket-io",
      link: "https://socket.io/",
    },
  ];

  return (
    <>
      <h1 className="text-center text-4xl md:text-5xl p-2 pb-2 pt-14 mb-6 font-extrabold">
        Technologies
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center w-full sm:w-3/4 p-4 md:p-16">
          {technologies.map((elem, id) => {
            return (
              <div
                key={id}
                className="p-2 md:p-4 hover:transform hover:scale-110 transition duration-300 w-20 h-20 md:w-40 md:h-40"
              >
                <a href={elem.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={elem.image}
                    alt={elem.alt}
                    className="p-2 w-full h-auto object-contain"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
