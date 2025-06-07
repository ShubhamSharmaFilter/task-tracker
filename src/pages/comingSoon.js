import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ComingSoon = () => {
  const launchDate = new Date("2025-05-30T23:59:59");
  
  const calculateTimeLeft = () => {
    const difference = +launchDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-purple-300 text-gray-900 text-center p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold mb-4">
        Coming Soon
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
        className="text-xl mb-8">
        We're launching something amazing on April 30, 2025!
      </motion.p>
      <div className="flex space-x-6 text-3xl">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div 
            key={unit}
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 1, duration: 0.5 }}
            className="p-5 bg-white shadow-lg rounded-xl text-gray-900">
            <span className="block text-5xl font-bold">{value}</span>
            {unit.charAt(0).toUpperCase() + unit.slice(1)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;