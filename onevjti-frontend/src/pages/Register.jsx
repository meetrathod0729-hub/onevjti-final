import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import api from "../api/axios";


const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !department || !year || !password) {
    return setError("All fields are required");
   }


   try {
    const res = await api.post("/users/register", {
      fullName: name,
      username,
      email,
      department,
      year,
      password,
    });

    setError("");
    setSuccess(true);
  } catch (err) {
    setError(
      err.response?.data?.message || "Registration failed"
    );
  }

    // 🔗 API call goes here later
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center overflow-hidden">
    
    <div className="absolute w-[500px] h-[500px] blur-3xl rounded-full" />

      <Card>
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-8 tracking-wide">
          User Registration
        </h1>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner" placeholder="Name" />
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner" placeholder="Username" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner" placeholder="Email" />
            <input value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner" placeholder="Department" />
            <input value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner" placeholder="Year" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full px-4 py-3 rounded-xl bg-zinc-50 shadow-inner" placeholder="Password" />

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
            border
            hover:bg-purple-300 hover:text-white
            active:scale-95
            transition-all
          "
            >
              Register
            </button>

            <Link
              to="/users/login"
              className="block text-center text-purple-300 hover:underline"
            >
              Already have an account? Log in
            </Link>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <p className="text-purple-400 text-lg font-semibold">
              🎉 Registration successful!
            </p>

            <button
              onClick={() => navigate("/users/login")}
              className="
                w-full py-3 rounded-xl
                bg-purple-600 text-black font-semibold
                hover:bg-purple-500
                hover:shadow-[0_10px_30px_rgba(16,185,129,0.5)]
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

export default Register;
