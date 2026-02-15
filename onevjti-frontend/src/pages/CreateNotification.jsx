import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateNotification = () => {

  const navigate = useNavigate();

  const [committees, setCommittees] = useState([]);

  const [form, setForm] = useState({
    message: "",
    type: "general",
    committee: "",
  });

  useEffect(() => {
    const fetchCommittees = async () => {
      const res = await api.get("/committees");
      setCommittees(res.data.data || []);
    };

    fetchCommittees();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/notifications", form);
      alert("Notification created");
      navigate("/users/notifications");
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Create Notification
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="general">General</option>
          <option value="event">Event</option>
          <option value="deadline">Deadline</option>
        </select>

        <select
          name="committee"
          value={form.committee}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Committee</option>
          {committees.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="w-full bg-purple-600 text-white py-2 rounded">
          Create
        </button>

      </form>
    </div>
  );
};

export default CreateNotification;
