import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AmbientSound() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  // 🎧 autoplay on load
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.4;
      audio.loop = true;

      audio.play().catch(() => {
        // autoplay blocked → user interaction needed
      });
    }
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (muted) {
      audio.muted = false;
      audio.play().catch(() => {});
    } else {
      audio.muted = true;
    }

    setMuted(!muted);
  };

  return (
    <>
      {/* 🎧 Floating Button */}
      <motion.button
        onClick={toggleSound}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 
        w-14 h-14 rounded-full 
        bg-white/30 backdrop-blur-xl 
        border border-white/20 
        shadow-xl flex items-center justify-center 
        text-xl"
      >
        {muted ? "🔇" : "🔊"}
      </motion.button>

      {/* 🎶 Background Sound */}
      <audio
        ref={audioRef}
        src="/music/ambient.mp3" // 👈 apna song yaha daal
      />
    </>
  );
}