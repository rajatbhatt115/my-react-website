import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // token hata do
    navigate("/admin");                    // login page par bhej do
  };

  return (
    <div className="p-4 flex flex-col items-center">
      {/* <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1> */}
      
      {/* ✅ Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
