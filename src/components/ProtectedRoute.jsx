import React from "react";
import { Navigate } from "react-router-dom";

// ✅ Agar localStorage me token mila to children render karenge
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin" />;
}

export default ProtectedRoute;
