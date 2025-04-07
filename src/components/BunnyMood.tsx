import { motion, AnimatePresence } from "framer-motion";

type BunnyMoodProps = {
  isTypingCorrect: boolean;
  isTimeRunningOut: boolean;
  timeLeft: number;
};

export function BunnyMood({ isTypingCorrect, timeLeft }: BunnyMoodProps) {
  const getBunnyMood = () => {
    if (timeLeft <= 5) return "panic";
    if (!isTypingCorrect) return "sad";
    return "happy";
  };

  const getDialogue = () => {
    if (timeLeft <= 5) return "Eek! Hurry hurry! 🏃‍♂️💨";
    if (!isTypingCorrect) return "Aww... you can do it! 💝";
    return "Yummy carrot! Keep going! 🥕✨";
  };

  const mood = getBunnyMood();

  return (
    <AnimatePresence mode="wait">
      <div className="mt-6 md:mt-0 md:fixed bottom-10 right-10 flex flex-col items-end gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="bg-white/80 dark:bg-black/10 backdrop-blur-sm px-4 py-2 rounded-2xl border-2 border-[#FFD1DC] dark:border-[#ff99b48f] relative"
        >
          <motion.p 
            className="text-[#FF6B95] text-lg font-medium whitespace-nowrap"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {getDialogue()}
          </motion.p>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/80 border-r-2 border-b-2 border-[#FFD1DC] transform rotate-45" />
        </motion.div>

        <motion.div
          key={mood}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="text-4xl text-[#FF99B4]"
        >
          {mood === "happy" && (
            <div className="relative">
              (｡◕‿◕｡)
              <motion.span
                className="absolute -right-8 top-0"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                🥕
              </motion.span>
            </div>
          )}
          {mood === "sad" && (
            <div className="relative">
              (｡•́︿•̀｡)
              <motion.span
                className="absolute -right-8 top-0"
                initial={{ y: 0 }}
                animate={{ y: 40 }}
                transition={{ duration: 0.5 }}
              >
                🥕
              </motion.span>
            </div>
          )}
          {mood === "panic" && (
            <motion.div
              animate={{ 
                rotate: [-5, 5, -5],
                scale: [1, 1.1, 1]
              }}
              transition={{ repeat: Infinity, duration: 0.3 }}
            >
              (⊙﹏⊙)
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}