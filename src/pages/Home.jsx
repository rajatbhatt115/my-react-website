import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  // 🔽 States for sabhi sections ka data
  const [bannerData, setBannerData] = useState({}); // Banner section ka data
  const [aboutData, setAboutData] = useState({}); // About section ka data
  const [teamData, setTeamData] = useState([]); // Team members ka list
  const [faqData, setFaqData] = useState([]); // FAQs ka list
  const [openFAQ, setOpenFAQ] = useState(null); // Open FAQ ka index

  // 🔽 Team form ke liye states (Add/Edit form ke liye)
  const [editMember, setEditMember] = useState(null); // Agar edit kar rahe hain to selected member
  const [teamForm, setTeamForm] = useState({
    name: "",
    role: "",
    image: ""
  });

  // 🔽 FAQ toggle karne ke liye
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // 🔽 Page load par sabhi sections ka data fetch karna
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 4 APIs ko ek sath call kiya gaya hai
        const [bannerRes, aboutRes, teamRes, faqRes] = await Promise.all([
          axios.get("http://localhost:5000/api/banner"),
          axios.get("http://localhost:5000/api/about"),
          axios.get("http://localhost:5000/api/team"),
          axios.get("http://localhost:5000/api/faqs"),
        ]);
        // Response data ko state me set kar diya
        setBannerData(bannerRes.data);
        setAboutData(aboutRes.data);
        setTeamData(teamRes.data);
        setFaqData(faqRes.data);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchData();
  }, []);

  // 🔽 Team form ke input field change handle karna
  const handleTeamChange = (e) => {
    setTeamForm({ ...teamForm, [e.target.name]: e.target.value });
  };

  // 🔽 Team member submit karna (Add ya Update)
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMember) {
        // Edit kar rahe hain to PUT request bheji
        await axios.put(`http://localhost:5000/api/team/${editMember._id}`, teamForm);
      } else {
        // Naya member add kar rahe hain to POST request
        await axios.post("http://localhost:5000/api/team", teamForm);
      }
      // List refresh karne ke liye GET request
      const res = await axios.get("http://localhost:5000/api/team");
      setTeamData(res.data);
      // Form reset & editMember null
      setEditMember(null);
      setTeamForm({ name: "", role: "", image: "" });
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  // 🔽 Team member delete karna
  const deleteTeamMember = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/team/${id}`);
      const res = await axios.get("http://localhost:5000/api/team");
      setTeamData(res.data);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div>
      {/* ---------- BANNER SECTION ---------- */}
      {/* isme background image, heading & description show ho raha hai */}
      <section
        className="relative bg-cover bg-center text-white px-4 sm:px-6 md:px-8 lg:px-12 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]"
        style={{ backgroundImage: `url('${bannerData?.image || "/default.jpg"}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full px-4">
          <h1 className="text-3xl sm:text-4xl font-bold">{bannerData?.heading}</h1>
          <p className="mt-4 text-sm sm:text-base max-w-6xl mx-auto">{bannerData?.description}</p>
        </div>
      </section>

      {/* ---------- ABOUT SECTION ---------- */}
      {/* Company ke bare me text aur image show ho raha hai */}
      <section className="container py-12 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-y-8 md:gap-x-12 mx-auto py-8 px-4 md:px-0 rounded-lg">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">About Us</h2>
            <p className="text-gray-600 mb-4">{aboutData?.para1}</p>
            <p className="text-gray-600 mb-6">{aboutData?.para2}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Read More</button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src={aboutData?.image || "/img/default_about.jpg"} alt="About Us" className="rounded shadow-md" />
          </div>
        </div>
      </section>

      {/* ---------- TEAM SECTION ---------- */}
      {/* Team ke members ko list karna + edit/delete karna + add form */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamData.map((member, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded shadow text-center transform transition duration-300 hover:scale-105">
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "550px",
                    height: "350px",
                    objectFit: "cover",
                    margin: "0 auto 1rem",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                  }}
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                {/* Edit & Delete buttons */}
                {/* <button onClick={() => setEditMember(member)} className="mt-2 bg-yellow-500 text-white px-4 py-1 rounded mr-2">Edit</button>
                <button onClick={() => deleteTeamMember(member._id)} className="mt-2 bg-red-600 text-white px-4 py-1 rounded">Delete</button> */}
              </div>
            ))}
          </div>

          {/* ADD / EDIT FORM */}
          {/* <div className="mt-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">{editMember ? "Edit" : "Add"} Team Member</h3>
            <form onSubmit={handleTeamSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Name"
                value={teamForm.name}
                onChange={handleTeamChange}
                className="w-full p-2 border rounded"
              />
              <input
                name="role"
                placeholder="Role"
                value={teamForm.role}
                onChange={handleTeamChange}
                className="w-full p-2 border rounded"
              />
              <input
                name="image"
                placeholder="Image URL"
                value={teamForm.image}
                onChange={handleTeamChange}
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {editMember ? "Update" : "Add"} Member
              </button>
            </form>
          </div> */}
        </div>
      </section>

      {/* ---------- FAQ SECTION ---------- */}
      {/* Har ek FAQ item ko collapsible dikhaya gaya hai */}
      <section className="container py-12 mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">FAQs</h2>
        <div className="space-y-4 max-w-6xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4">
              <button onClick={() => toggleFAQ(index)} className="flex justify-between items-center w-full">
                <span className="font-semibold text-gray-700 text-left w-3/4">{faq.question}</span>
                <span className="text-2xl text-gray-700">{openFAQ === index ? "-" : "+"}</span>
              </button>
              {openFAQ === index && <div className="mt-2 text-gray-600">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
