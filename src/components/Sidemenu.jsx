import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaImages,
  FaUserTie,
  FaQuestion,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { MdOutlineInfo, MdContactPage, MdEmail } from "react-icons/md";

export default function Sidemenu({ visible, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const linkClass = (path) =>
    `block py-2 px-4 rounded hover:bg-gray-700 ${
      location.pathname === path ? "bg-gray-700" : ""
    }`;

  return (
    <>
      {/* 🔲 Overlay (visible only if sidebar is open) */}
     {visible && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    onClick={onClose}
  />
)}

      {/* ✅ Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 z-50 transform transition-transform duration-300 ease-in-out
        ${visible ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-2xl font-bold mb-6">🛠 Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin/banner" className={linkClass("/admin/banner")}>
            <FaImages className="inline mr-2" /> Banner
          </Link>
          <Link to="/admin/about" className={linkClass("/admin/about")}>
            <MdOutlineInfo className="inline mr-2" /> About
          </Link>
          <Link to="/admin/team" className={linkClass("/admin/team")}>
            <FaUserTie className="inline mr-2" /> Team
          </Link>
          <Link to="/admin/faq" className={linkClass("/admin/faq")}>
            <FaQuestion className="inline mr-2" /> FAQ
          </Link>
          <Link to="/admin/aboutpageabout" className={linkClass("/admin/aboutpageabout")}>
            <FaHome className="inline mr-2" /> About Page Text
          </Link>
          <Link to="/admin/aboutbanner" className={linkClass("/admin/aboutbanner")}>
            <FaImages className="inline mr-2" /> About Banner
          </Link>
          <Link to="/admin/contactbanner" className={linkClass("/admin/contactbanner")}>
            <MdContactPage className="inline mr-2" /> Contact Banner
          </Link>
          <Link to="/admin/contactform" className={linkClass("/admin/contactform")}>
            <MdEmail className="inline mr-2" /> Contact Messages
          </Link>

          <button
            onClick={handleLogout}
            className="mt-6 w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </nav>
      </div>
    </>
  );
}
