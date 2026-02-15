import React, { useEffect, useState } from "react";
import Events from "../components/Events/EventCard";
import api from "../api/axios";
import EventCard from "../components/Events/EventCard";
import CommitteeCard from '../components/CommitteeCard';
const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/current-user");
        setUser(res.data.data);
      } catch (err) {
        setError("You are not logged in");
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
      <h1 className="text-4xl font-bold text-emerald-400">
        Welcome, {user.fullName} 👋
      </h1>
      <button onClick={() => navigate("/profile")} className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-400 transition-all">
        View/Edit My Profile
      </button>
      {/* Events Section */}
      <EventCard />
      <CommitteeCard />
    </div>
  );
};

export default Home;
