import React, { useEffect, useState } from "react";
import axios from "axios";

function About() {
  // 🔰 About section aur banner section ke liye state banayi
  const [aboutData, setAboutData] = useState({ title: "", para1: "", para2: "", image: "" });
  const [bannerData, setBannerData] = useState({ heading: "", description: "", image: "" });
  const [loading, setLoading] = useState(true);

  // 🚀 Component load hone par data fetch karo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannerRes, aboutRes] = await Promise.all([
          axios.get("http://localhost:5000/api/aboutbanner"),
          axios.get("http://localhost:5000/api/AboutpageAbout"),
        ]);

        // ✅ Data set kar rahe hain
        setBannerData(bannerRes.data || {});
        setAboutData(aboutRes.data || {});
        setLoading(false);
      } catch (err) {
        console.error("Error fetching about page data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ⏳ Jab tak data load ho raha ho
  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="bg-gray-100 font-sans">
      {/* 🔵 Banner Section */}
      <section
        className="relative bg-cover bg-center text-white flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 h-[40vh] sm:h-[50vh] md:h-[60vh]"
        style={{ backgroundImage: `url(${bannerData.image || '/img/about_banner.jpg'})` }}
      >
        {/* 🔲 Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* 🔠 Centered Text */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full w-full">
          <h1 className="text-3xl sm:text-4xl font-bold">{bannerData.heading || "Welcome to Our Website"}</h1>
          <p className="mt-4 text-sm max-w-6xl sm:text-base">{bannerData.description || "This is a default subtitle text."}</p>
        </div>
      </section>

      {/* ℹ️ About Section */}
      <section className="container py-12 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-12 mx-auto py-8 px-4 md:px-0 rounded-lg">
          {/* 📃 Text Content */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">About Us</h2>
            <p className="text-gray-600 mb-4">{aboutData.para1}</p>
            <p className="text-gray-600 mb-6">{aboutData.para2}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Read More
            </button>
          </div>

          {/* 🖼️ Image Content */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={aboutData.image || "/img/img_4.jpg"}
              alt="About Us"
              className="rounded shadow-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
