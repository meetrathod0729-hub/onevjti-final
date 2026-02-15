import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateGallery = () => {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    category: "general",
    eventId: "",
  });

  /* Load events */
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await api.get("/events");
      setEvents(res.data.data || []);
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Select image");
      return;
    }

    try {
      const data = new FormData();

      data.append("image", file);
      data.append("title", formData.title);
      data.append("caption", formData.caption);
      data.append("category", formData.category);

      await api.post(
        `/gallery/${formData.eventId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/gallery");

    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Upload Gallery Image
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="title"
            placeholder="Title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="caption"
            placeholder="Caption"
            required
            value={formData.caption}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Event */}
          <select
            name="eventId"
            required
            value={formData.eventId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Event</option>

            {events.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="general">General</option>
            <option value="tech">Tech</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="workshop">Workshop</option>
          </select>

          <div className="flex gap-4">

            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Upload
            </button>

            <button
              type="button"
              onClick={() => navigate("/gallery")}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateGallery;
