import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// ✅ Common Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// ✅ Admin Auth Pages
import AdminLogin from "./pages/AdminLogin"; // 🔰 Login Form
import AdminPanel from "./pages/AdminPanel"; // 🔰 Dashboard after login

// ✅ Admin Content Pages
import BannerAdmin from "./components/Admin/BannerAdmin";
import AboutAdmin from "./components/Admin/AboutAdmin";
import TeamAdmin from "./components/Admin/TeamAdmin";
import FAQAdmin from "./components/Admin/FAQAdmin";
import AboutpageAboutAdmin from "./components/Admin/AboutpageAboutAdmin";
import AboutpageBannerAdmin from "./components/Admin/AboutpageBannerAdmin";
import ContactBannerAdmin from "./components/Admin/ContactBannerAdmin";

// ✅ Protected Route for Admin
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ CSS
import "./App.css";



// ✅ LayoutWrapper me Navbar/Footer ka condition check hota hai
function LayoutWrapper() {
  const location = useLocation();

  // 🔰 Agar path "/admin" se shuru hota hai to Navbar/Footer hide karenge
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {!isAdminPath && <Navbar />} {/* ✅ Public pages me show hoga */}
      
      <main className="flex-grow">
        <Routes>
          {/* ✅ Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ✅ Admin Login Page (accessible to all) */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ✅ Protected Admin Dashboard and Sub Pages */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banner"
            element={
              <ProtectedRoute>
                <BannerAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/about"
            element={
              <ProtectedRoute>
                <AboutAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/team"
            element={
              <ProtectedRoute>
                <TeamAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/faq"
            element={
              <ProtectedRoute>
                <FAQAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/aboutpageabout"
            element={
              <ProtectedRoute>
                <AboutpageAboutAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/aboutbanner"
            element={
              <ProtectedRoute>
                <AboutpageBannerAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contactbanner"
            element={
              <ProtectedRoute>
                <ContactBannerAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isAdminPath && <Footer />} {/* ✅ Public pages me show hoga */}
    </div>
  );
}

// ✅ App me Router wrap kiya gaya hai
export default function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}
