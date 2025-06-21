import React, { useState, useEffect } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [bannerData, setBannerData] = useState({ heading: "", description: "", image: "" });

  // 🔽 Fetch banner data from backend on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/contactbanner")
      .then((res) => setBannerData(res.data || {}))
      .catch((err) => console.error("Error fetching banner:", err));
  }, []);

  // 🔽 Update form data on input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔽 Submit contact form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contact", formData); // adjust endpoint as per your backend
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* ✅ Banner Section */}
      <section
        className="relative bg-cover bg-center text-white flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 h-[40vh] sm:h-[50vh] md:h-[60vh]"
        style={{ backgroundImage: `url(${bannerData.image || '/img/img_contact_banner.jpg'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full w-full">
          <h1 className="text-3xl sm:text-4xl font-bold">{bannerData.heading || "Welcome to Our Website"}</h1>
          <p className="mt-4 text-sm max-w-6xl sm:text-base">{bannerData.description || "Lorem ipsum is a dummy text."}</p>
        </div>
      </section>

      {/* ✅ Contact Form Section */}
      <section className="container mx-auto md:w-1/2 px-4 py-12">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Thank you for contacting us. We'll get back to you soon!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 relative" autoComplete="off">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-3 pr-12 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-3 pr-12 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
