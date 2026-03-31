import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MoodPage() {
  const navigate = useNavigate();

  const actions = [
    {
      label: "✍️ Write Journal",
      color: "from-pink-400 to-pink-500",
      action: () => navigate("/reflection"),
    },
    {
      label: "🎧 Relax Music",
      color: "from-purple-400 to-purple-500",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      label: "🧘 Breathing Exercise",
      color: "from-indigo-400 to-indigo-500",
      action: () => navigate("/moodlift"),
    },
  ];

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 overflow-hidden"
    >
      {/* 🌈 Floating Glow */}
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      <motion.div
        className="bg-white/30 backdrop-blur-2xl border border-white/20 
        rounded-3xl p-8 shadow-2xl text-center max-w-md w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 💖 Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          You're feeling calm today 🌿
        </h2>

        <p className="mt-3 text-gray-600">
          Let’s make this moment even better ✨
        </p>

        {/* 🎯 Actions */}
        <div className="mt-8 flex flex-col gap-4">
          {actions.map((item, index) => (
            <motion.button
              key={index}
              onClick={item.action}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 rounded-full text-white font-medium shadow-md 
              bg-gradient-to-r ${item.color}`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 text-sm text-gray-600 underline"
        >
          ← Go back
        </button>
      </motion.div>
    </div>
  );
}