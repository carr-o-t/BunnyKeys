import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { useTypingGame } from '../hooks/useTypingGame';
import { BunnyMood } from './BunnyMood';
import { Doodles } from './Doodles';
import { ResultView } from './ResultView';
import { TimerOptions } from './TimerOptions';

export function TypingTest() {
  const [selectedTime, setSelectedTime] = useState(30);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    timeLeft,
    text,
    input,
    isFinished,
    isStarted,
    wpmHistory,
    rawWpmHistory,
    errorHistory,
    currentCharIndex,
    isTypingCorrect,
    handleInput,
    reset,
    stats,
    charAccuracy,
  } = useTypingGame(selectedTime);

  const handleTimeSelect = (time: number) => {
    if (!isStarted) {
      setSelectedTime(time);
      reset(); // Reset the game state with new time
    }
  };

  const handleRefresh = () => {
    reset();
    if (inputRef.current) inputRef.current.focus();
  };


  if (isFinished) {
    return (
      <div className="w-full max-w-[1200px] mx-auto">
        <ResultView 
          wpm={stats.wpm} 
          accuracy={stats.accuracy} 
          wpmHistory={wpmHistory}
          rawWpmHistory={rawWpmHistory}
          errorHistory={errorHistory}
        />
        <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-2 !bg-transparent text-[#FF6B95] rounded-full hover:bg-[#FFD1DC] 
                       transition-colors duration-200 flex items-center gap-2 border-2 !border-[#FF6B95]"
            onClick={handleRefresh}
          >
            <span>Try Again</span>
            <span>🥕</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Doodles />
      <TimerOptions selectedTime={selectedTime} onTimeSelect={handleTimeSelect} isStarted={isStarted} />
      <div 
        className="w-full max-w-[1200px] px-4 bg-white/50 dark:bg-black/10 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-[#FFD1DC] dark:border-[#ff99b48f]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="mb-4 text-[#FF6B95] flex items-center gap-2">
          <span className="text-xl">{timeLeft}s</span>
          <span className="text-sm">🐰 hop faster!</span>
        </div>
     
        <div className="relative mb-8">
          <div className="text-sm md:text-2xl leading-relaxed font-mono">
            {text.split('').map((char, index) => (
              <span
                key={index}
                className={`${
                  index === currentCharIndex ? 'border-none' : ''
                } ${
                  index < currentCharIndex
                    ? charAccuracy[index]
                      ? 'text-[#FF6B95]'
                      : 'bg-[#FFE8EF] text-[#FF4D7D] dark:text-[#ff99b48f] relative after:content-["❌"] after:absolute after:-top-4 after:left-0 after:text-sm after:animate-bounce'
                    : 'text-[#FFB6C1] dark:text-[#ffb6c170]'
                }`}
              >
               {isFocused && <span className={cn(index === currentCharIndex && "border-l-2 border-[#FF99B4] animate-[blink_1s_ease-in-out_infinite]")}></span>}
                {char}
              </span>
            ))}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-default"
            autoFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        
      </div>
      <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-2 !bg-transparent text-[#FF6B95] rounded-full
                       transition-colors duration-200 flex items-center gap-2 border-2 !border-[#FF6B95]"
            onClick={handleRefresh}
          >
            <span>Restart Test</span>
            <span>🥕</span>
          </button>
        </div>
      <BunnyMood 
        isTypingCorrect={isTypingCorrect}
        isTimeRunningOut={timeLeft <= selectedTime * 0.15}
        timeLeft={timeLeft}
      />
    </>
  );
}