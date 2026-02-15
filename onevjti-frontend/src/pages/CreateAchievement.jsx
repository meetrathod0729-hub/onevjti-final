import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateAchievement = () => {

  const navigate = useNavigate();

  const [committeeId, setCommitteeId] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contestDate: "",
    winners: "",
    year: "",
    department: "",
  });

  useEffect(() => {
    const fetchCommittee = async () => {
      const res = await api.get("/committees");
      setCommitteeId(res.data.data[0]._id);
    };

    fetchCommittee();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/achievements/${committeeId}`, formData);

      navigate("/achievements");
    } catch (err) {
      alert("Creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Create Achievement
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            name="contestDate"
            value={formData.contestDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="winners"
            placeholder="Winners"
            value={formData.winners}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {/* Year */}
<select
  name="year"
  required
  value={formData.year}
  onChange={handleChange}
  className="w-full border p-2 rounded"
>
  <option value="">Select Year</option>
  <option value="1st Year">1st Year</option>
  <option value="2nd Year">2nd Year</option>
  <option value="3rd Year">3rd Year</option>
  <option value="4th Year">4th Year</option>
</select>

{/* Department */}
<select
  name="department"
  required
  value={formData.department}
  onChange={handleChange}
  className="w-full border p-2 rounded"
>
  <option value="">Select Department</option>
  <option value="CS">CS</option>
  <option value="IT">IT</option>
  <option value="ENTC">ENTC</option>
  <option value="EXTC">EXTC</option>
  <option value="EXTC">ELECTRICAL</option>
  <option value="EXTC">MECHANICAL</option>
  <option value="EXTC">CIVIL</option>
  <option value="EXTC">TEXTILE</option>
  <option value="EXTC">PRODUCTION</option>
</select>


          <div className="flex gap-4">

            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>

            <button
              type="button"
              onClick={() => navigate("/achievements")}
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

export default CreateAchievement;
