import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="!bg-transparent !p-0 !border-none !ring-none !focus-none!outline-none!hover:bg-transparent!hover:text-transparent!active:bg-transparent!active:text-transparent!transition-none!duration-0!ease-linear"
    >
      <div className="relative">
        {theme === 'light' ? (
          <div className="flex items-center gap-2">
            {/* <span className="text-[#FF6B95]">(｡◕‿◕｡)</span> */}
            <motion.span
              className="text-yellow-400"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ☀️
            </motion.span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* <span className="text-[#FF6B95]">(ᴗ˳ᴗ)</span> */}
            <motion.span
              className="text-blue-400"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🌙
            </motion.span>
          </div>
        )}
      </div>
    </button>
  );
}