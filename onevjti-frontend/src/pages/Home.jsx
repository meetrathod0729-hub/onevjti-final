import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import EventCard from "../components/Events/EventCard";
import CommitteeCard from "../components/CommitteeCard";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [committees, setCommittees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdmin =
    user && ["admin", "head", "core"].includes(user.role);

  /* ================= FETCH ================= */

  useEffect(() => {

    const fetchData = async () => {

      try {

        const [eventsRes, committeesRes] = await Promise.all([
          api.get("/events"),
          api.get("/committees"),
        ]);

        setEvents(eventsRes.data.data || []);
        setCommittees(committeesRes.data.data || []);

      } catch (err) {

        setError("Failed to load data");

      } finally {

        setLoading(false);
      }
    };

    fetchData();

  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen px-8 py-10 space-y-20">

      {/* ================= EVENTS ================= */}
      <section>

        {isAdmin && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("/events/create")}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              + Create Event
            </button>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8 text-center">
          Upcoming Events
        </h1>

        {events.length === 0 ? (

          <p className="text-center text-gray-400">
            No events available
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {events.map((event) => (
              <EventCard
                key={event._id}
                _id={event._id}
                title={event.title}
                description={event.description}
                registrationLink={event.registrationLink}
                location={event.location}
                eventType={event.eventType}
                startDate={event.startDate}
                endDate={event.endDate}
                poster={event.poster}
              />
            ))}

          </div>
        )}

      </section>

      {/* ================= COMMITTEES ================= */}
      <section>

        {isAdmin && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("/committees/create")}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              + Create Committee
            </button>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8 text-center">
          Committees
        </h1>

        {committees.length === 0 ? (

          <p className="text-center text-gray-400">
            No committees available
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {committees.map((committee) => (
              <CommitteeCard
                key={committee._id}
                committee={committee}
              />
            ))}

          </div>
        )}

      </section>

      {/* ================= GALLERY + ACHIEVEMENTS ================= */}
      <section className="space-y-8">

        <h1 className="text-3xl font-bold text-center">
          Explore Campus Highlights
        </h1>

        <p className="text-gray-600 text-center max-w-xl mx-auto">
          Discover memories, achievements, and moments that define OneVJTI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* ================= GALLERY CARD ================= */}
          <div className="border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">

            <h2 className="text-2xl font-semibold mb-3">
              📸 Gallery & Highlights
            </h2>

            <p className="text-gray-600 mb-5">
              Relive the best moments from events and campus life.
            </p>

            <Link
              to="/gallery"
              className="px-5 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              View
            </Link>

          </div>

          {/* ================= ACHIEVEMENTS CARD ================= */}
          <div className="border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">

            <h2 className="text-2xl font-semibold mb-3">
              🏆 Achievements
            </h2>

            <p className="text-gray-600 mb-5">
              Explore contest winners and club accomplishments.
            </p>

            <Link
              to="/achievements"
              className="inline-block px-5 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              View
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;
