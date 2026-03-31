import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import CuteBear from "../../../components/common/CuteBear";

export default function Hero() {
  const moods = [
    { id: 1, icon: "/moods/happy.png" },
    { id: 2, icon: "/moods/neutral.png" },
    { id: 3, icon: "/moods/sad.png" },
    { id: 4, icon: "/moods/sleep.png" },
    { id: 5, icon: "/moods/calm.png" },
  ];

  const [selected, setSelected] = useState(null);

  // 💥 Ripple effect
  const createRipple = (e) => {
    const button = e.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start 
    overflow-hidden bg-linear-to-br gap-20 from-pink-200 via-purple-200 to-indigo-200 px-4 pt-16 backdrop-blur-lg bg-white/20 border border-white/30"
    >
      {/* 🐻 Bear */}
      <div className="mb-6 justify-center flex md:pb-4">
        <CuteBear />
      </div>

      {/* 🌈 Blobs */}
      <motion.div
        className="absolute w-60 h-60 md:w-100 md:h-80 bg-pink-300 rounded-full blur-3xl opacity-30 top-10 left-5"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-72 h-72 md:w-96 md:h-96 bg-purple-300 rounded-full blur-3xl opacity-30 bottom-10 right-5"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* 💖 Content */}
      <div
        className="relative z-10 text-center w-full max-w-3xl 
      backdrop-blur-xl bg-white/30 rounded-3xl p-6 md:py-8 px-8 shadow-xl "
      >
        <div className="flex gap-2 justify-center text-3xl sm:text-3xl md:text-6xl">
          <h1
            className="text-[26px] inline sm:text-4xl font-extrabold md:text-6xl font-[Dancing_Script] text-transparent 
            bg-clip-text bg-linear-to-r p-2 font-extrabold from-pink-500 via-purple-500 to-indigo-500"
          >
            How are you feeling today?
          </h1>
          💖
        </div>

        <p className="mt-2 text-sm md:text-base text-gray-600">
          Your safe little space to relax, reflect & glow ✨
        </p>

        <motion.button
          className="mt-4 w-[70%] md:w-auto px-6 py-3 rounded-full 
          bg-linear-to-r from-pink-400 to-purple-400 text-white shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          Start Your Journey 🌸
        </motion.button>

        {/* 😊 Mood */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {moods.map((mood, i) => (
            <motion.div
              key={mood.id}
              onClick={() => setSelected(i)}
              whileHover={{ scale: 1.25, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full 
              bg-white/40 backdrop-blur-md cursor-pointer shadow-lg 
              shadow-pink-300/30 transition
              ${
                selected === i
                  ? "ring-2 ring-pink-400 bg-white/60 scale-110"
                  : ""
              }`}
            >
              <img
                src={mood.icon}
                alt="mood"
                className="w-5 h-5 md:w-7 md:h-7 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
