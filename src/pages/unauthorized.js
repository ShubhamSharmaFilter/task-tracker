import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
        <p className="mt-3 text-gray-600">
          You do not have permission to access this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;