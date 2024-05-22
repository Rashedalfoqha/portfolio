export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white z-50 mx-auto py-4 pt-6">
      <ul className="flex justify-center space-x-60 font-semibold">
        <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-2xl pt-5">
          <a href="/Introduction">Introduction</a>
        </li>
        <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-2xl pt-5">
          <a href="Technologies">Technologies</a>
        </li>
        <li>
          <a href="/">
            <img
              src="https://i.ibb.co/BHJ4MRh/Untitled-1.png"
              className="w-72"
            />
          </a>{" "}
        </li>
        <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-2xl pt-5">
          <a href="/Project">Project</a>
        </li>
        <li className="cursor-pointer hover:text-teal-600 transform hover:scale-110 transition duration-300 text-2xl pt-5 ">
          <a href="/Contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
