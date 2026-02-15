import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    year: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        department: user.department || "",
        year: user.year || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsUpdating(true);

    try {
      const res = await api.patch("/users/update-account", formData);
      setUser(res.data.data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    if (!avatarFile) return;

    setMessage("");
    setError("");
    setIsUpdating(true);

    const form = new FormData();
    form.append("avatar", avatarFile); // MUST MATCH multer.single("avatar")

    try {
      const res = await api.patch("/users/avatar", form);
      setUser(res.data.data);
      setMessage("Avatar updated successfully!");
      setAvatarFile(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Avatar update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">Please login</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl border p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">My Profile</h1>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={
              user.avatar
                ? `${user.avatar}?t=${Date.now()}`
                : `https://ui-avatars.com/api/?name=${user.fullName}`
            }
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover"
          />

          <form onSubmit={handleAvatarUpload} className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />
            <button
              type="submit"
              disabled={!avatarFile || isUpdating}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              {isUpdating ? "Uploading..." : "Update Photo"}
            </button>
          </form>
        </div>

        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Account Form */}
        <form onSubmit={handleUpdateAccount} className="space-y-3">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full border p-2 rounded"
          />
          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            className="w-full border p-2 rounded"
          />
          <button className="w-full bg-black text-white py-2 rounded">
            Save Changes
          </button>
        </form>

        <button onClick={() => navigate("/")}>← Back</button>
      </div>
    </div>
  );
};

export default Profile;