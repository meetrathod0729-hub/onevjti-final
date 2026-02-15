import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const EditCommittee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", description: "" });
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const res = await api.get("/committees");
        // Ensure we find the committee by the ID from the URL params
        const committee = res.data.data.find((c) => c._id === id);

        if (!committee) {
          alert("Committee not found");
          navigate("/users/committees");
          return;
        }
        setForm({ name: committee.name, description: committee.description });
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCommittee();
  }, [id, navigate]);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      
      if (logo) {
        formData.append("logo", logo); // Ensure key matches upload.single("logo")
      }

      await api.patch(`/committees/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Committee updated successfully!");
      navigate("/users/committees");
    } catch (err) {
      console.error("Update error:", err.response?.data);
      alert(err.response?.data?.message || "Update failed. Check console.");
    }
  };
  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Committee</h2>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 mb-4 rounded"
          placeholder="Committee Name"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 mb-4 rounded h-32"
          placeholder="Description"
          required
        />
        <input
          type="file"
          onChange={(e) => setLogo(e.target.files[0])}
          className="w-full mb-6"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Committee
        </button>
      </form>
    </div>
  );
};

export default EditCommittee;