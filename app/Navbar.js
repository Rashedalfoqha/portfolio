"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white z-50 mx-auto py-4 pt-6">
      <ul className="flex justify-center space-x-60 font-semibold">
        <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-2xl pt-5">
          <a href="/introduction">Introduction</a>
        </li>
        <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-2xl pt-5">
          <a href="/technologies">Technologies</a>
        </li>
        <li>
          <a href="/">
            <Image
              src="https://i.ibb.co/BHJ4MRh/Untitled-1.png"
              alt="Home Logo"
              width={350}
              height={72}
            />
          </a>
        </li>
        <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-2xl pt-5">
          <a href="/project">Project</a>
        </li>
        <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-2xl pt-5">
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
