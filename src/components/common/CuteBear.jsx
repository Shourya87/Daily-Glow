import { motion } from "framer-motion";

export default function CuteBear() {
  return (
    <motion.div
      className="absolute top-10 w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36"
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      {/* Glow Aura */}
      <div className="absolute inset-0 rounded-full bg-pink-300 blur-2xl opacity-40 animate-pulse"></div>

      {/* Face */}
      <div className="relative w-full h-full bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 
      rounded-full flex items-center justify-center shadow-2xl border-2 border-white">

        {/* Ears */}
        <div className="absolute -top-3 left-2 w-6 h-6 sm:w-7 sm:h-7 bg-pink-200 rounded-full shadow-md"></div>
        <div className="absolute -top-3 right-2 w-6 h-6 sm:w-7 sm:h-7 bg-pink-200 rounded-full shadow-md"></div>

        {/* Eyes (blink animation) */}
        <div className="flex gap-3">
          <motion.div
            className="w-2 h-2 bg-black rounded-full"
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 bg-black rounded-full"
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Nose */}
        <div className="absolute bottom-7 w-3 h-3 bg-black rounded-full"></div>

        {/* Smile */}
        <motion.div
          className="absolute bottom-4 w-6 h-3 border-b-2 border-black rounded-full"
          animate={{ scaleX: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Sparkle */}
        <div className="absolute -right-2 top-2 text-yellow-300 animate-ping">✨</div>
      </div>
    </motion.div>
  );
}