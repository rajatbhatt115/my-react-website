// ✅ BannerAdmin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function BannerAdmin() {
  const [bannerData, setBannerData] = useState({ heading: "", description: "", image: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/aboutbanner")
      .then((res) => {
        if (res.data) setBannerData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading banner:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setBannerData({ ...bannerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/aboutbanner", bannerData);
      alert("Banner updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">About Banner Admin</h2>
      {bannerData.image && <img src={bannerData.image} alt="Preview" className="w-full h-48 object-cover rounded mb-4" />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="heading" value={bannerData.heading} onChange={handleChange} placeholder="Heading" className="w-full p-2 border rounded" />
        <textarea name="description" value={bannerData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input name="image" value={bannerData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Banner</button>
      </form>
    </div>
  );
}

export default BannerAdmin;