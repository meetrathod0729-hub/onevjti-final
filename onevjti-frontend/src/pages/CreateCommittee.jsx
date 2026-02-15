import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateCommittee = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    headUserId: "",
  });

  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.headUserId) {
      return alert("All fields required");
    }
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      if (logo) {
        formData.append("logo", logo);
      }
      await api.post("/committees", formData);
  
      alert("Committee created successfully!");
      navigate("/"); 
    } catch (err) {
      console.error("Create Committee Error:", err);
      alert(err.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Committee
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Committee Name"
          value={form.name}
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

        {/* Head User ID */}
        <input
          type="text"
          name="headUserId"
          placeholder="Head User ID"
          value={form.headUserId}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        {/* Logo */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          className="w-full mb-4"
        />

        {/* Submit */}
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Committee"}
        </button>

      </form>
    </div>
  );
};

export default CreateCommittee;
