import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventType: "technical",
    startDate: "",
    endDate: "",
    committee: ""
  });

  const [poster, setPoster] = useState(null);
  const [committees, setCommittees] = useState([]);
  // fetch committees for dropdown
useEffect(() => {
  const fetchCommittees = async () => {
    try {
      const res = await api.get("/committees");
      setCommittees(res.data.data || []);
    } catch (err) {
      console.error("Failed to load committees", err);
    }
  };

  fetchCommittees();
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (poster) {
        formData.append("poster", poster);
      }
        await api.post("/events",formData);
      alert("Event created successfully");

      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Event
        </h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        {/* Committee Selection */}
        <select
        name="committee"
        value={form.committee}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        required
        >
  <option value="">Select Committee</option>
  {committees.map((c) => (
    <option key={c._id} value={c._id}>
      {c.name}
    </option>
  ))}
</select>


        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Type */}
        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        >
          <option value="technical">Technical</option>
          <option value="cultural">Cultural</option>
          <option value="sports">Sports</option>
        </select>

        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        {/* End Date */}
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Poster */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPoster(e.target.files[0])}
          className="w-full mb-4"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Event
        </button>

      </form>
    </div>
  );
};

export default CreateEvent;
