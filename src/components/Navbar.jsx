import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
     const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
     <nav className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto py-4 flex items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyTailwindWebsite
        </Link>

        {/* Hamburger button (mobile only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle Menu"
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
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              // If open show cross, else hamburger lines
            ></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {/* NavLink adds "active" styling automatically */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-semibold text-blue-600" : "text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "font-semibold text-blue-600" : "text-gray-700 hover:text-blue-600"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "font-semibold text-blue-600" : "text-gray-700 hover:text-blue-600"
            }
          >
            Contact
          </NavLink>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-gray-700 hover:text-blue-600 text-end"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-gray-700 hover:text-blue-600 text-end"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-gray-700 hover:text-blue-600 text-end"
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar