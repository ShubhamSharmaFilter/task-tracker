import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffdfc] text-center p-4">
            <h1 className="text-6xl font-bold text-[#39160D]">404</h1>
            <p className="text-2xl text-gray-800 mt-4">Oops! Page not found</p>
            <p className="text-gray-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-[#4B49AC] text-[#d8c9ae] rounded-lg text-lg font-semibold hover:bg-[#494949] transition duration-200"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;