import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center p-24">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="relative left-56 w-auto h-80 ml-3.5">
          <img
            src="https://i.ibb.co/r7fwh58/Whats-App-Image-2024-03-01-at-1-47-18-PM.png"
            alt="Profile Image"
            className="absolute right-full bottom-20  w-96 h-96 object-cover  rounded-full shadow-text-2xl   "
          />

          <h1 className="text-4xl font-serif  font-extrabold mr-32 ml-32 ">
            Hello, I'm Rashed Alfoqha
          </h1>
          <div className="flex overflow-hidden w-96 ">
          
          </div>
        </div>
        <p className="text-2xl w-1/2 text-start  ">
          Hello, I'm Rashed, an experienced Full Stack Developer specializing in
          web development. Equipped with expertise in both front-end and
          back-end technologies, I am fueled by a passion for continuous
          learning and collaboration. My aim is to leverage my skills to deliver
          high-quality solutions while advancing my professional development.
        </p>
      </div>
    </div>
  );
}
