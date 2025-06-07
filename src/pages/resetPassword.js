import { useState } from "react";
import axios from "axios";
import { apiurl } from "../config/config";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(new URLSearchParams(window.location.search).get("token"));
  let navigate = useNavigate();
  
  const sendResetLink = async () => {
    try {
      const res = await axios.post(`${apiurl}/api/user/sendResetPasswordLink`, { email });
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link");
      setMessage("");
    }
  };
  
  const resetPassword = async () => {
    try {
      const res = await axios.post(`${apiurl}/api/user/resetPassword`, { token, newPassword });
      setMessage(res.data.message);
      setError("");
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
      setMessage("");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-96 p-6 bg-white rounded-2xl shadow-xl">
        {!token ? (
          <>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Forgot Password?</h2>
            <input
              type="email"
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.button whileHover={{ scale: 1.05 }} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all" onClick={sendResetLink}>
              Send Reset Link
            </motion.button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Reset Your Password</h2>
            <input
              type="password"
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <motion.button whileHover={{ scale: 1.05 }} className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all" onClick={resetPassword}>
              Reset Password
            </motion.button>
          </>
        )}
        {message && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 mt-4 text-center">{message}</motion.p>}
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 mt-4 text-center">{error}</motion.p>}
      </motion.div>
    </div>
  );
}