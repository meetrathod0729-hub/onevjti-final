import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

function EventCard({
  _id,
  title,
  description,
  registrationLink,
  location,
  eventType,
  startDate,
  endDate,
  poster,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin =
    user && ["admin", "head", "core"].includes(user.role);

  if (!title) return null;

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ✅ DELETE EVENT
  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this event?")) return;

    try {
      await api.delete(`/events/${_id}`);
      window.location.reload(); // Fast refresh
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div
      onClick={() => navigate(`/events/${_id}`)}
      className="bg-white p-4 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
    >
      {/* Poster */}
      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
        <img
          src={poster || "https://placehold.co/600x400?text=Event+Poster"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>

        <span
          className={`text-xs px-3 py-1 rounded-full text-white
            ${
              eventType?.toLowerCase() === "technical"
                ? "bg-violet-600"
                : eventType?.toLowerCase() === "cultural"
                ? "bg-pink-500"
                : "bg-emerald-500"
            }
          `}
        >
          {eventType}
        </span>
      </div>

      {/* Description */}
      <p className="my-2 text-gray-600 text-lg">{description}</p>

      {/* Location & Dates */}
      <div className="flex justify-between text-lg text-black">
        <span>📍 {location}</span>
        <span>📅 {formatDate(startDate)}</span>
      </div>

      {/* Buttons */}
      {/* Buttons */}
<div className="mt-4">

{/* If Admin → Left + Right layout */}
{isAdmin ? (

  <div className="flex justify-between items-center">

    {/* Register */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/events/${_id}`);
      }}
      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
    >
      Register
    </button>

    {/* Admin Controls */}
    <div className="flex gap-2">

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/events/edit/${_id}`);
        }}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        Delete
      </button>

    </div>

  </div>

) : (

  /* If Normal User → Center */
  <div className="flex justify-center">

    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/events/${_id}`);
      }}
      className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
    >
      Register
    </button>

  </div>

)}

</div>

    </div>
  );
}

export default EventCard;
