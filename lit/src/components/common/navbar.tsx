import React from "react";
import logo from "../../LITLOGO.png";
const NavBar: React.FC = () => {
  return (
    <nav className="bg-black border-b-4 border-teal-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex">
            <img className="h-10 w-10" src={logo} alt="Logo" />

            <a
              href="/"
              className="nav-link text-white hover:text-teal-500 px-3 py-2 rounded-md text-30 font-medium"
            >
              LIT
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="/"
              className="nav-link text-white hover:text-teal-500 px-3 py-2 rounded-md text-25 font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="nav-link text-white hover:text-teal-500 px-3 py-2 rounded-md text-25 font-medium"
            >
              About
            </a>
            <a
              href="/contact"
              className="nav-link text-white hover:text-teal-500 px-3 py-2 rounded-md text-25 font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
