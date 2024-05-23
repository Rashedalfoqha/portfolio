"use client";
import Image from "next/image";
export default function Page() {
  const technologies = [
    {
      image: "https://www.svgrepo.com/show/354274/redux.svg",
      alt: "redux",
      link: "https://redux-toolkit.js.org/"
    },
    {
      image: "https://www.svgrepo.com/show/368858/nextjs.svg",
      alt: "next js",
      link: "https://nextjs.org/"
    },
    {
      image: "https://www.svgrepo.com/show/452092/react.svg",
      alt: "react",
      link: "https://react.dev/learn/start-a-new-react-project"
    },
    {
      image: "https://www.svgrepo.com/show/331488/mongodb.svg",
      alt: "mongodb",
      link: "https://www.mongodb.com/"
    },
    {
      image: "https://www.svgrepo.com/show/303301/postgresql-logo.svg",
      alt: "postgresql",
      link: "https://www.elephantsql.com/"
    },
    {
      image: "https://www.svgrepo.com/show/452185/css-3.svg",
      alt: "css",
      link: "https://www.w3schools.com/css/css_intro.asp"
    },
    {
      image: "https://www.svgrepo.com/show/368858/nextjs.svg",
      alt: "html",
      link: "https://nextjs.org/"
    },
    {
      image: "https://www.svgrepo.com/show/373669/html.svg",
      alt: "html",
      link: "https://www.w3schools.com/html/"
    },
    {
      image: "https://www.svgrepo.com/show/452075/node-js.svg",
      alt: "nodeJs",
      link: "https://nodejs.org/en"
    },
    {
      image: "https://www.svgrepo.com/show/373703/js.svg",
      alt: "js",
      link: "https://www.javascript.com/"
    },
    {
      image: "https://www.svgrepo.com/show/452210/git.svg",
      alt: "git",
      link: "https://git-scm.com/"
    },
    {
      image: "https://www.svgrepo.com/show/353498/bootstrap.svg",
      alt: "bootstrap",
      link: "https://www.bootstrap.com"
    },
    {
      image: "https://www.svgrepo.com/show/374118/tailwind.svg",
      alt: "tailwind",
      link: "https://tailwindcss.com/"
    },
    {
      image: "https://www.svgrepo.com/show/353940/jquery.svg",
      alt: "jquery",
      link: "https://releases.jquery.com/"
    },
    {
      image: "https://www.svgrepo.com/show/354048/material-ui.svg",
      alt: "material-ui",
      link: "https://mui.com/"
    },
    {
      image: "https://www.svgrepo.com/show/354202/postman-icon.svg",
      alt: "postman",
      link: "https://www.postman.com/downloads/"
    },
    {
      image: "https://www.svgrepo.com/show/373595/firebase.svg",
      alt: "firebase",
      link: "https://firebase.google.com/"
    },
    {
      image: "https://www.svgrepo.com/show/374146/typescript-official.svg",
      alt: "typescript",
      link: "https://www.typescriptlang.org/"
    },
    {
      image: "https://www.svgrepo.com/show/342225/socket-io.svg",
      alt: "socket-io",
      link: "https://socket.io/"
    }
  ];

  return (
    <>
      <h1 className="text-start text-5xl p-2 pb-2 pt-14 mb-6 font-extrabold pl-80">
        Technologies
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center w-3/4 p-16">
          {technologies.map((elem, id) => (
            <div
              className="p-4 hover:transform hover:scale-110 transition duration-300 w-40 h-40"
              key={id}
            >
              <a href={elem.link}>
                <Image
                  src={elem.image}
                  alt={elem.alt}
                  width={128}
                  height={128}
                  className="p-2 w-32 h-32"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
