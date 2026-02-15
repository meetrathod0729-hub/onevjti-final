import React, { useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';

const ForgotPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      return setError("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      // Note: Ensure this endpoint matches your backend route
      await api.post("/users/reset-password", {
        email,
        password: newPassword,
      });

      setError("");
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center overflow-hidden">
      {/* Background Glow - Matched to Login */}
      <div className="absolute w-[500px] h-[500px] blur-3xl rounded-full opacity-50" />
      
      <Card>
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-8 tracking-wide">
          Reset Password
        </h1>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
            />

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="
                w-full mt-2 py-3 rounded-xl
                bg-purple-400 text-white font-semibold
                border border-transparent
                hover:bg-purple-300
                active:scale-95
                transition-all
              "
            >
              Submit
            </button>
            
            {/* Back to Login Link styled like the 'Register' link in Login.jsx */}
            <button 
              type="button"
              onClick={() => navigate("/users/login")}
              className="block w-full text-center text-purple-300 hover:underline text-sm mt-4"
            >
              Back to Login
            </button>
          </form>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center space-y-6">
            <div className="flex justify-center">
                <span className="text-5xl">🎉</span>
            </div>
            <p className="text-purple-400 text-lg font-semibold">
              New password set successfully
            </p>
            <button
              onClick={() => navigate("/users/login")}
              className="
                w-full py-3 rounded-xl
                bg-purple-400 text-white font-semibold
                hover:bg-purple-300
                active:scale-95
                transition-all
              "
            >
              Go to Login
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPass;