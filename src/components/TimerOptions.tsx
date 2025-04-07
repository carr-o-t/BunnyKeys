import { motion } from "framer-motion";

type TimerOptionsProps = {
  selectedTime: number;
  onTimeSelect: (time: number) => void;
};

export function TimerOptions({ selectedTime, onTimeSelect }: TimerOptionsProps) {
  const timeOptions = [15, 30, 60, 120];

  return (
    <div className="flex gap-4 justify-center mb-8">
      {timeOptions.map((time) => (
        <motion.button
          key={time}
          onClick={() => onTimeSelect(time)}
          className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors !bg-transparent  !border-2  !ring-none !focus-none!outline-none
            ${selectedTime === time 
              ? 'text-[#FF6B95] !border-[#FF6B95] !font-bold bg-[#FF6B95]' 
              : 'text-[#646669] !border-[#ff99b48f] hover:text-[#FF6B95]'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {time}
        </motion.button>
      ))}
    </div>
  );
}