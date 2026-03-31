import { motion } from "framer-motion";

export default function BreathingCircle({ active }) {
  return (
    <motion.div
      animate={{
        scale: active ? [1, 1.6, 1] : 1,
      }}
      transition={{
        duration: 6,
        repeat: active ? Infinity : 0,
        ease: "easeInOut",
      }}
      className="w-48 h-48 rounded-full 
      bg-gradient-to-r from-pink-300 to-purple-300 
      shadow-2xl flex items-center justify-center"
    >
      <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-xl" />
    </motion.div>
  );
}