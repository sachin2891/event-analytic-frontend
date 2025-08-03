// src/pages/HomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow py-4 px-8 flex items-center justify-between">
        {/* Logo or app name */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-700 tracking-wide">
            Analytichog
          </span>
          🐗
        </div>
      </header>

      {/* Main section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-blue-700">Analytichog</span>
        </h1>
        <p className="max-w-xl text-lg text-gray-600 mb-8">
          Powerful, real-time event analytics—visualize your funnels, retention,
          and live user activity with ease.
        </p>

        <div className="mt-12">
          <h1
            className="
    text-4xl font-extrabold text-gray-900 mb-6 text-center 
    transition-colors duration-300 hover:drop-shadow-lg cursor-pointer
  "
            onClick={() => navigate("/dashboard")}
          >
            Explore your funnel and retention
            <br />
            with graph and chart
          </h1>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold px-8 py-3 rounded shadow transition"
            onClick={() => navigate("/active-events")}
          >
            Explore
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
