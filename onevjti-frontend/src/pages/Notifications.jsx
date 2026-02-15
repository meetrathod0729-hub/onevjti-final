import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Notifications = () => {

  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  const isAdmin =
    user && ["admin", "head", "core"].includes(user.role);

  const fetchFeed = async () => {
    try {
      const res = await api.get("/notifications");

      console.log("FULL RESPONSE:", res.data); 
      setFeed(res.data.data || []);
    } catch (err) {
      console.error("Error fetching feed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete notification?")) return;

    try {
      await api.delete(`/notifications/${id}`);

      // instant UI update
      setFeed(feed.filter((n) => n._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading your feed...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Smart Notifications
        </h1>

        {/* ADMIN CREATE BUTTON */}
        {isAdmin && (
          <button
            onClick={() => navigate("/notifications/create")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            + Add
          </button>
        )}

      </div>

      {feed.length === 0 ? (
        <p className="text-gray-500">
          Follow some committees to see updates here!
        </p>
      ) : (
        <div className="space-y-4">

          {feed.map((note) => (

            <div
              key={note._id}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500"
            >

              <div className="flex items-center gap-3 mb-2">

              {note.committee?.logo ? (
                  <img src={note.committee.logo} className="w-8 h-8 rounded-full" />
                  ) : ( <div className="w-8 h-8 rounded-full bg-purple-500" />)}

                <span className="font-bold text-sm uppercase">
                  {note.committee?.name || "committee update"}
                </span>

              </div>

              <p className="text-gray-600">
                {note.message}
              </p>

              <span className="text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>

              {/* ADMIN BUTTONS */}
              {isAdmin && (
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() =>
                      navigate(`/notifications/edit/${note._id}`)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Notifications;
