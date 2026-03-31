import React from "react";
import DailyGlowText from "../../assets/images/DailyGlow-Text.png";
import DailyGlowLogo from "../../assets/images/DailyGlow-Logo.png";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Navbar */}
      <div
        className="fixed top-0 left-0 w-full h-16 z-50 
        bg-[linear-gradient(90deg,#fbcfe8,#e9d5ff,#f6dceb)] 
        backdrop-blur-xl border-b border-white/20 
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        px-4 flex items-center justify-between"
      >
        {/* Left */}
        <div className="w-[30%] flex items-center">
          <img src={DailyGlowText} alt="Daily Glow" className="h-7 object-contain" />
        </div>

        {/* Center */}
        <div className="w-[40%] flex justify-center">
          <img src={DailyGlowLogo} alt="Logo" className="h-8 object-contain" />
        </div>

        {/* Right */}
        <div className="w-[30%] flex justify-end items-center">
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col justify-center items-center w-11 h-11 rounded-2xl 
            bg-white/20 backdrop-blur-md border border-white/30 
            shadow-md hover:shadow-lg transition duration-300"
          >
            <span className={`block h-0.5 w-6 bg-[#f9b2da] transition-all duration-300`} />
            <span className={`block h-0.5 w-6 bg-[#dcbcfd] my-1 transition-all duration-300`} />
            <span className={`block h-0.5 w-6 bg-[#f9b2da] transition-all duration-300`} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-60 
        bg-white/70 backdrop-blur-xl border-l border-white/30
        shadow-2xl px-6 pt-20
        transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl 
          bg-white/30 backdrop-blur-md border border-white/40
          flex items-center justify-center text-pink-400 text-xl shadow-md"
        >
          ✕
        </button>

        {/* Menu */}
        <nav className="flex flex-col gap-6 text-gray-700 font-semibold text-lg items-center">
          <a href="#" className="hover:text-pink-500 transition">Home</a>
          <a href="#" className="hover:text-pink-500 transition">Mood</a>
          <a href="#" className="hover:text-pink-500 transition">Journal</a>
          <a href="#" className="hover:text-pink-500 transition">Guides</a>

          <button className="mt-10 px-6 py-3 bg-linear-to-r from-pink-400 to-purple-400 
          text-white rounded-2xl shadow-lg hover:scale-105 transition">
            Get Started
          </button>
        </nav>
      </div>
    </>
  );
}