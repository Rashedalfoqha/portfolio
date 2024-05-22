import Introduction from "./introduction/page";
import Technologies from "./technologies/page";
import Project from "./project/page";
import Contact from "./contact/page";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen justify-center items-center p-0  bg-slate-50 animate-fade animate-once animate-duration-[1500ms] animate-ease-in">
        <div className="flex flex-col items-center text-center space-y-28 ">
          <div className="relative left-56 w-auto h-96 ml-3.5">
            <img
              src="https://i.ibb.co/r7fwh58/Whats-App-Image-2024-03-01-at-1-47-18-PM.png bg"
              alt="Profile Image"
              className="absolute right-full bottom-20  w-96 h-96 object-cover  rounded-full m-10 border-r-8 border-l-8 shadow-2xl"
            />

            <h1 className="text-4xl mr-32 ml-32 font-bold ">
              Hello, I'm Rashed Alfoqha
            </h1>
            <div class="animated-text">
              <div class="line">Full Stack</div>
              <div class="line">FrontEnd</div>
              <div class="line">BackEnd</div>
              <div class="line">Software Engineering</div>
            </div>
          </div>
        </div>
      </div>
      <Introduction />
      <Technologies />
      <Project />
      <Contact />
    </>
  );
}
