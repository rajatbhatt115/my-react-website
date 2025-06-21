import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
     <footer className="bg-gray-800 text-white text-center py-6 px-4 sm:px-6">
      <div className="container mx-auto py-2 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold text-white mx-auto">
          MyTailwindWebsite
        </NavLink>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-24 justify-center items-center py-6 space-y-4 sm:space-y-0">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "hover:underline font-semibold"
              : "hover:underline font-normal"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "hover:underline font-semibold"
              : "hover:underline font-normal"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "hover:underline font-semibold"
              : "hover:underline font-normal"
          }
        >
          Contact Us
        </NavLink>
      </div>

      <hr className="border-t border-gray-600 mx-auto w-full mb-4" />

      <p className="pt-2 text-sm">© 2025 MyTailwindWebsite. Lorem Ipsum Is A Dummy Text.</p>
    </footer>
  )
}

export default Footer