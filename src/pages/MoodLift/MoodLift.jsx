import React, { useState } from "react";
import BreathingCircle from "./components/BreathingCircle";
import GuideText from "./components/GuideText";

export default function MoodLift() {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 overflow-hidden px-4"
    >
      {/* 🌊 Background Glow */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="text-center z-10 max-w-md w-full">

        {/* 💬 Title */}
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800">
          Take a deep breath 💖
        </h1>

        <p className="mt-3 text-gray-600">
          Relax your mind. You’re safe here ✨
        </p>

        {/* 🫁 Breathing Circle (Component use) */}
        <div className="mt-12 flex justify-center">
          <BreathingCircle active={active} />
        </div>

        {/* 💬 Guide Text */}
        <GuideText active={active} />

        {/* 🎛 Button */}
        <button
          onClick={() => setActive(!active)}
          className="mt-10 px-8 py-3 rounded-full 
          bg-gradient-to-r from-pink-400 to-purple-400 
          text-white shadow-md hover:scale-105 active:scale-95 transition"
        >
          {active ? "Stop 🌙" : "Start 🌸"}
        </button>
      </div>
    </div>
  );
}