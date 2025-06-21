import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminPanel from "./pages/AdminPanel";
import BannerAdmin from "./components/Admin/BannerAdmin";
import AboutAdmin from "./components/Admin/AboutAdmin";
import TeamAdmin from "./components/Admin/TeamAdmin";
import FAQAdmin from "./components/Admin/FAQAdmin";
import AboutpageAboutAdmin from "./components/Admin/AboutpageAboutAdmin"
import AboutpageBannerAdmin from "./components/Admin/AboutpageBannerAdmin"
import "./App.css";

import ContactBannerAdmin from "./components/Admin/ContactBannerAdmin";

// 🔽 Yeh wrapper banaya gaya hai jisse aap route ke hisaab se Navbar/Footer dikha sakte ho
function LayoutWrapper() {
  const location = useLocation();

  // Agar path /admin se shuru hota hai, to Navbar/Footer nahi dikhenge
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {!isAdminPath && <Navbar />} {/* Admin ke liye hide */}
      <main className="flex-grow">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/banner" element={<BannerAdmin />} />
          <Route path="/admin/about" element={<AboutAdmin />} />
          <Route path="/admin/team" element={<TeamAdmin />} />
          <Route path="/admin/faq" element={<FAQAdmin />} />
          <Route path="/admin/aboutpageabout" element={<AboutpageAboutAdmin />} />
          <Route path="/admin/aboutbanner" element={<AboutpageBannerAdmin />} /> 
          <Route path="/admin/contactbanner" element={<ContactBannerAdmin />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />} {/* Admin ke liye hide */}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}
