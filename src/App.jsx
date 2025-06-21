import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// ✅ Common Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// ✅ Admin Auth
import AdminLogin from "./pages/AdminLogin"; // 🔐 Login Page
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Admin Layout
import AdminPanel from "./pages/AdminPanel";

// ✅ Admin Pages (Nested Inside Admin Layout)
import BannerAdmin from "./components/Admin/BannerAdmin";
import AboutAdmin from "./components/Admin/AboutAdmin";
import TeamAdmin from "./components/Admin/TeamAdmin";
import FAQAdmin from "./components/Admin/FAQAdmin";
import AboutpageAboutAdmin from "./components/Admin/AboutpageAboutAdmin";
import AboutpageBannerAdmin from "./components/Admin/AboutpageBannerAdmin";
import ContactBannerAdmin from "./components/Admin/ContactBannerAdmin";
import ContactMessagesAdmin from "./components/Admin/ContactMessagesAdmin";

// ✅ CSS
import "./App.css";

// 🔁 LayoutWrapper for handling public routes with Navbar/Footer
function LayoutWrapper() {
  const location = useLocation();

  // ✅ Check kar rahe hain agar path /admin se shuru hota hai to navbar/footer na dikhaye
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Show Navbar only for public pages */}
      {!isAdminPath && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* ✅ Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ✅ Admin Login Page - Always accessible */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ✅ Protected Admin Area - Nested Layout */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            {/* ✅ All child pages rendered inside <Outlet /> in AdminPanel.jsx */}
            <Route path="banner" element={<BannerAdmin />} />
            <Route path="about" element={<AboutAdmin />} />
            <Route path="team" element={<TeamAdmin />} />
            <Route path="faq" element={<FAQAdmin />} />
            <Route path="aboutpageabout" element={<AboutpageAboutAdmin />} />
            <Route path="aboutbanner" element={<AboutpageBannerAdmin />} />
            <Route path="contactbanner" element={<ContactBannerAdmin />} />
           <Route path="contactform" element={<ContactMessagesAdmin />} />
          </Route>
        </Routes>
      </main>

      {/* ✅ Footer only for public pages */}
      {!isAdminPath && <Footer />}
    </div>
  );
}

// ✅ Main App component with Router
export default function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}
