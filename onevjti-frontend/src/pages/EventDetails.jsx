import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await api.get(`/events/${eventId}`);
        setEvent(eventRes.data.data);

        // 🔥 CHECK REGISTRATION STATUS
        const statusRes = await api.get(
          `/event-registrations/${eventId}/status`
        );

        setAlreadyRegistered(statusRes.data.data.registered);

      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/users/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, navigate]);

  const handleRegister = () => {
    if (alreadyRegistered) {
      alert("You are already registered for this event");
      return;
    }

    navigate(`/events/${eventId}/register`);
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen px-8 py-10 max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-6">{event.description}</p>

      <button
        onClick={handleRegister}
        disabled={alreadyRegistered}
        className={`px-6 py-3 rounded-lg text-white ${
          alreadyRegistered
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-violet-600 hover:bg-violet-700"
        }`}
      >
        {alreadyRegistered ? "Already Registered" : "Register"}
      </button>

    </div>
  );
};

export default EventDetails;
