"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 bg-white z-50 mx-auto py-4 pt-6">
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-20">
        <a href="/">
          <img
            src="https://i.ibb.co/BHJ4MRh/Untitled-1.png"
            alt="Home Logo"
            className="w-32 h-auto md:w-36 lg:w-40 xl:w-44"
          />
        </a>
        <div className="md:hidden">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <ul className={`flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10 lg:space-x-20 xl:space-x-40 font-semibold md:flex ${isOpen ? "flex" : "hidden"} md:flex`}>
          <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-xl md:text-2xl pt-5 md:pt-0">
            <a href="/introduction">Introduction</a>
          </li>
          <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-xl md:text-2xl pt-5 md:pt-0">
            <a href="/technologies">Technologies</a>
          </li>
          <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-xl md:text-2xl pt-5 md:pt-0">
            <a href="/project">Project</a>
          </li>
          <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-xl md:text-2xl pt-5 md:pt-0">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
