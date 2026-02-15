import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EventRegister = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    department: "",
    year: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/event-registrations/${eventId}`, form);

      alert("Registered Successfully!");
      navigate(`/events/${eventId}`);

    } catch (err) {
      if (err.response?.status === 409) {
        alert("Already registered");
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6">Event Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="fullName"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="mobileNumber"
          placeholder="Mobile Number"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="department"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Department</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="ENTC">ENTC</option>
          <option value="EXTC">EXTC</option>
          <option value="EXTC">Electrical</option>
          <option value="EXTC">Mechanical</option>
          <option value="EXTC">Civil</option>
          <option value="EXTC">Textile</option>
          <option value="EXTC">Production</option>
        </select>

        <select
          name="year"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
        <input
          name="registrationId"
          placeholder="College Registration Id"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          Submit
        </button>

      </form>
    </div>
  );
};

export default EventRegister;
