import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext"
const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [committeeId, setCommitteeId] = useState("");
  const { user }=useAuth();

  const isAdmin=user && ["admin","head","core"].includes(user.role);
  
  const fetchAchievements = async () => {
    try {
      const committeeRes = await api.get("/committees");

      const committees = committeeRes.data.data;

      if (!committees?.length) return;

      const id = committees[0]._id;

      setCommitteeId(id);

      const res = await api.get(`/achievements/${id}`);

      setAchievements(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete achievement?")) return;

    try {
      await api.delete(`/achievements/${id}`);
      fetchAchievements();
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            🏆 Achievements
          </h1>

          {isAdmin && (
            <Link
            to="/achievements/create"
            className="bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            + Add
          </Link>
        )}

        </div>

        {achievements.length === 0 && (
          <p className="text-center text-gray-500">
            No achievements yet
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">

          {achievements.map((item) => (

            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow border"
            >

              <p className="text-sm text-gray-500">
                {new Date(item.contestDate).toDateString()}
              </p>

              <h2 className="text-xl font-semibold mt-1">
                {item.title}
              </h2>
              {/* Year + Department */}
              <p className="text-sm text-gray-500 mt-1">
              🎓 {item.year} | 🏫 {item.department}
              </p>
              <p className="mt-2 text-gray-600 text-sm">
                {item.description}
              </p>

              {item.winners && (
                <p className="mt-2 text-purple-600 font-medium">
                  🏅 {item.winners}
                </p>
              )}

              {/* Buttons */}
              {isAdmin && (<div className="flex gap-3 mt-4">

                <Link
                  to={`/achievements/edit/${item._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>

              </div>)}

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Achievements;
