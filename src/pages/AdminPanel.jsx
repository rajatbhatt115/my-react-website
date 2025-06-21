import React, { useState } from "react";
import Sidemenu from "../components/Sidemenu";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ default: open

  return (
    <div className="flex">
      {/* ✅ Sidebar Toggle */}
      <Sidemenu visible={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ✅ Main Area */}
      <div className={`flex-1 min-h-screen bg-gray-100 transition-all duration-300 ${sidebarOpen ? "ml-64" : ""}`}>
        {/* ✅ Topbar */}
        <div className="bg-white shadow-md p-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4"
          >
            <FaBars className="text-2xl" />
          </button>
          {/* <h1 className="text-xl font-bold">Admin Dashboard</h1> */}
        </div>

        {/* ✅ Dynamic page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
