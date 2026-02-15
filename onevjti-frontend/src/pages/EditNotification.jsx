import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const EditNotification = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    message: "",
    type: "general",
  });

  useEffect(() => {
    const fetchNotification = async () => {
      const res = await api.get("/notifications");

      const found = res.data.data.find(n => n._id === id);

      if (found) {
        setForm({
          message: found.message,
          type: found.type,
        });
      }
    };

    fetchNotification();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/notifications/${id}`, form);
      alert("Updated!");
      navigate("/users/notifications");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Edit Notification
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Update
        </button>

      </form>
    </div>
  );
};

export default EditNotification;
