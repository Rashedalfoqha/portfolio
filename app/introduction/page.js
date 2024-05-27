export default function Page() {
  const contact = [
    {
      image: "https://www.svgrepo.com/show/475654/github-color.svg",
      alt: "GitHub",
      link: "https://github.com",
    },
    {
      image: "https://www.svgrepo.com/show/217146/gmail.svg",
      alt: "Gmail",
      link: "mailto:your-email@gmail.com",
    },
    {
      image: "https://www.svgrepo.com/show/452047/linkedin-1.svg",
      alt: "LinkedIn",
      link: "https://linkedin.com",
    },
  ];

  return (
    <>
      <div className="flex min-h-screen justify-center items-center p-0 bg-slate-50 animate-fade animate-once animate-duration-[1500ms] animate-ease-in">
        <div className="flex flex-col items-center text-center space-y-10 md:space-y-28 px-4">
          <div className="relative md:left-56 w-full max-w-md md:max-w-none h-auto md:h-96">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
              Hello, I&apos;m Rashed Mohammad
            </h1>
            <div className="animated-text text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
  <div className="line">Full Stack</div>
  <div className="line">FrontEnd</div>
  <div className="line">BackEnd</div>
</div>
            <img
              src="https://i.ibb.co/r7fwh58/Whats-App-Image-2024-03-01-at-1-47-18-PM.png"
              alt="Profile Image"
              className="object-cover rounded-full mt-8 mx-auto md:absolute md:right-full md:bottom-16 w-40 h-40 md:w-[30vw] md:h-[30vw] lg:w-[400px] lg:h-[400px]"
            />
          </div>
        </div>
      </div>
      <div className="bg-indigo-200 w-full py-10 px-4 md:pl-10 md:pr-10 lg:pl-80 lg:pr-80 md:pb-28 md:pt-10 border-indigo-200">
        <h1 className="text-3xl md:text-5xl text-center font-extrabold mb-4 md:mb-8 lg:mb-12">
          Introduction
        </h1>
        <p className="text-base md:text-xl text-start mb-4 md:mb-8 lg:mb-12">
          Hello, I&apos;m Rashed, an experienced Full Stack Developer
          specializing in web development. Equipped with expertise in both
          front-end and back-end technologies, I am fueled by a passion for
          continuous learning and collaboration. My aim is to leverage my skills
          to deliver high-quality solutions while advancing my professional
          development.
        </p>

        <div className="flex justify-center md:justify-start space-x-4 mt-8">
          {contact.map((tech, index) => (
            <a
              href={tech.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={tech.image}
                alt={tech.alt}
                width={40}
                height={40}
                className="hover:scale-110 transition-transform w-10 h-10"
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
