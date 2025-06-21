import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactMessagesAdmin() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/contact")
      .then(res => setMessages(res.data))
      .catch(err => console.error("Error loading messages:", err));
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg._id}>
                <td className="border px-4 py-2">{msg.name}</td>
                <td className="border px-4 py-2">{msg.email}</td>
                <td className="border px-4 py-2">{msg.message}</td>
                <td className="border px-4 py-2">{new Date(msg.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ContactMessagesAdmin;
