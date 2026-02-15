import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventType: "",
    startDate: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);

        setForm({
          title: res.data.data.title,
          description: res.data.data.description,
          location: res.data.data.location,
          eventType: res.data.data.eventType,
          startDate: res.data.data.startDate.slice(0, 10),
        });

      } catch {
        alert("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update Event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/events/${id}`, form);

      alert("Event Updated!");
      navigate("/");

    } catch {
      alert("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />

        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Type</option>
          <option value="technical">Technical</option>
          <option value="cultural">Cultural</option>
          <option value="sports">Sports</option>
        </select>

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          Update Event
        </button>

      </form>
    </div>
  );
};

export default EditEvent;
