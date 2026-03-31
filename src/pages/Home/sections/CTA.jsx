import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center relative">

        {/* Glow Background */}
        <div className="absolute inset-0 bg-pink-300/30 blur-3xl rounded-full"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative backdrop-blur-xl bg-white/30 border border-white/40 
          rounded-3xl p-10 shadow-xl"
        >
          <div className="flex text-3xl md:text-5xl font-[Dancing_Script] justify-center gap-2"><h2 className="text-3xl md:text-5xl font-[Dancing_Script] font-bold 
          text-transparent bg-clip-text pb-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            Start Your Glow Journey Today 
          </h2><span>✨</span>
          </div>

          <p className="mt-4 text-gray-700 max-w-lg mx-auto">
            Take a moment for yourself. Reflect, heal, and grow into your best self 💖
          </p>

          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-3 rounded-full 
            bg-gradient-to-r from-pink-400 to-purple-400 text-white 
            shadow-lg shadow-pink-300/40 text-lg"
          >
            Get Started 🌸
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}