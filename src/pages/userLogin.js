import React, { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../config/config";
import { BiError } from "react-icons/bi";
import { setCookie } from "../config/webStorage.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loginloading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email) return setError("Please enter email address");
    if (!password) return setError("Please enter password");
    try {
      setLoginLoading(true);
      const response = await axios.post(`${apiurl}/api/auth/login`, {
        email: email,
        password,
      });
      if (!response.data.success) {
        setError(response.data.message);
      } else {
        const token = rememberMe ? response.data.token : response.data.token;
        setCookie("tttoken", token, rememberMe ? 2505600 : 25200);
        navigate("/dashboard");
        toast.success(`${response.data.message}`);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      toast.success(`${error.data.message}`);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row shadow-lg border border-[#E0DED9] rounded-2xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-white">
          <div className="flex justify-center mb-6">
            <img
              src="/task-tracker-blue.png"
              className="h-20"
              alt="Suwasthi Logo"
            />
          </div>

          <h2 className="text-2xl font-bold text-[#2F2E41] text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Login to manage your tasks
          </p>

          <form onSubmit={loginHandler} className="space-y-5">
            <div>
              <label className="block text-sm text-[#444] font-medium">
                Employee ID
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 bg-[#EDEDED] border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
            </div>

            <div>
              <label className="block text-sm text-[#444] font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-[#EDEDED] border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-[#E63946] text-sm flex items-center gap-2">
                <BiError /> {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox rounded border-gray-300"
                />
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              disabled={loginloading}
              className="w-full py-3 bg-[#4B49AC] text-white font-medium rounded-md hover:bg-[#3c3c50] transition"
            >
              {loginloading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <div>
          <p className="text-center mt-4"><Link className="text-[#4B49AC]" to="/register">Create Your Acoount</Link></p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 bg-[#f0edea]">
          <img
            src="tt.jpg"
            alt="Payroll Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
