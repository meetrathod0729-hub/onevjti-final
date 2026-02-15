import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios';
import DashboardUserSearch from './DashboardUserSearch';
const Header = () => {
  // Safe destructuring with an empty object fallback
  const auth = useAuth();
  const user = auth?.user;
  const setUser = auth?.setUser;

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // 1. Call the backend to clear cookies and DB token
      await api.post("/users/logout");

      // 2. Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // 3. Update global state so the UI changes immediately
      if (setUser) setUser(null);

      // 4. Redirect
      navigate("/users/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if the server call fails, clear local state as a fallback
      if (setUser) setUser(null);
      navigate("/users/login");
    }
  };

  return (
    <header className='text-black px-8 py-4 flex items-center justify-between border-b bg-white'>
      <h1 className='text-xl font-bold cursor-pointer' onClick={() => navigate("/")}>
        OneVJTI
      </h1>

      <nav className="flex gap-8 text-lg font-medium items-center">
         {user && <DashboardUserSearch />}
        <Link to="/" className="hover:text-purple-500">Home</Link>

        {/* If context isn't ready yet, we show nothing or a small loader */}
        {!auth ? null : !user ? (
          <>
            <Link to="/users/register" className="hover:text-purple-500">Register</Link>
            <Link to="/users/login" className="hover:text-purple-500">Login</Link>
          </>
        ) : (
          <>
            {/* MINIMAL UPDATE: Notifications Link */}
            <Link to="/users/notifications" className="relative hover:text-purple-500">
              Notifications
              <span className="absolute -top-1 -right-2 h-2 w-2 bg-red-500 rounded-full"></span>
            </Link>
            <Link to="/users/profile" className="flex items-center gap-2 hover:text-purple-500">
              {/* Optional: Show small avatar in header if it exists */}
              {user.avatar && (
                <img src={user.avatar} alt="pfp" className="w-8 h-8 rounded-full border" />
              )}
              Profile
            </Link>

            <Link to="/users/committee/members" className="relative hover:text-purple-500">
              Committee members
              <span className="absolute -top-1 -right-2 h-2 w-2 bg-red-500 rounded-full"></span>
            </Link>

    

            <button
              onClick={handleLogout}
              className="px-4 py-1 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header