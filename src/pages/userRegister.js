import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../config/config";
import { BiError } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userType: "user",
    role: "developer",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    for (const field in form) {
      if (!form[field]) {
        return setError(`Please enter ${field}`);
      }
    }

    try {
      setLoading(true);
      const response = await axios.post(`${apiurl}/api/auth/register`, form);

      if (response.data.success) {
        navigate("/"); // Redirect to login on success
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row shadow-lg border border-[#E0DED9] rounded-2xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-white">
          <div className="flex justify-center mb-6">
            <img src="/task-tracker-blue.png" className="h-20" alt="Logo" />
          </div>

          <h2 className="text-2xl font-bold text-[#2F2E41] text-center">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Sign up to start managing your tasks
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-1/2 px-4 py-3 bg-[#EDEDED] border border-[#ccc] rounded-md"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-1/2 px-4 py-3 bg-[#EDEDED] border border-[#ccc] rounded-md"
              />
            </div>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-[#EDEDED] border border-[#ccc] rounded-md"
            />

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-3 bg-[#EDEDED] border border-[#ccc] rounded-md"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 bg-[#EDEDED] border border-[#ccc] rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {error && (
              <div className="text-[#E63946] text-sm flex items-center gap-2">
                <BiError /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#4B49AC] text-white font-medium rounded-md hover:bg-[#3c3c50] transition"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4"><Link className="text-[#4B49AC]" to="/">Back To Login</Link></p>
        </div>

        <div className="hidden md:block md:w-1/2 bg-[#f0edea]">
          <img
            src="/tt.jpg"
            alt="Task Tracker Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UserRegister;