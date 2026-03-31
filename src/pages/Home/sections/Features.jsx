import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Mood Tracking",
    desc: "Understand your emotions daily with gentle check-ins 💭",
    icon: "💖",
  },
  {
    title: "Guided Journaling",
    desc: "Express your thoughts with calming prompts ✍️",
    icon: "🌸",
  },
  {
    title: "Relax & Heal",
    desc: "Breathing, music & mindfulness for your peace 🧘‍♀️",
    icon: "✨",
  },
];

export default function Features() {
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-transparent to-white/20">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-[Dancing_Script] font-bold 
        text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          Your Safe Space to Glow 🌷
        </h2>

        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Everything you need to understand your feelings & grow beautifully ✨
        </p>

        {/* Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 rounded-3xl backdrop-blur-xl bg-white/30 
              border border-white/40 shadow-lg shadow-pink-200/40"
            >
              <div className="text-4xl">{f.icon}</div>

              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {f.title}
              </h3>

              <p className="mt-2 text-gray-600 text-sm">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}