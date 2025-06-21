import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactMessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/contact")
      .then((res) => {
        console.log("✅ Contact messages fetched:", res.data);
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching messages:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📬 Contact Messages</h2>

      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id}>
                  <td className="border px-4 py-2">{msg.name}</td>
                  <td className="border px-4 py-2">{msg.email}</td>
                  <td className="border px-4 py-2 whitespace-pre-wrap">{msg.message}</td>
                  <td className="border px-4 py-2">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ContactMessagesAdmin;
