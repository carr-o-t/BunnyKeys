import { useEffect, useRef, useState } from 'react';
import { markovChain } from '../utils/textGenerator';
import { BunnyMood } from './BunnyMood';
import { Doodles } from './Doodles';
import { ResultView } from './ResultView';
import { TimerOptions } from './TimerOptions';
import { cn } from '@/lib/utils';

export function TypingTest() {
  const [selectedTime, setSelectedTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [textChunks, setTextChunks] = useState<string[]>([markovChain.generateText(30)]);
  const [input, setInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTypingCorrect, setIsTypingCorrect] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  
  const [errorHistory, setErrorHistory] = useState<number[]>([]);
  const [rawWpmHistory, setRawWpmHistory] = useState<number[]>([]);
  const [currentErrors, setCurrentErrors] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const text = textChunks.join(' ');

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        const currentWPM = calculateWPM();
        const rawWPM = calculateRawWPM();
        setWpmHistory(prev => [...prev, currentWPM]);
        setRawWpmHistory(prev => [...prev, rawWPM]);
        setErrorHistory(prev => [...prev, currentErrors]);
        setCurrentErrors(0); // Reset errors for next second
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsFinished(true);
    }
  }, [isStarted, timeLeft]);

  const handleTimeSelect = (time: number) => {
    if (!isStarted) {
      setSelectedTime(time);
      setTimeLeft(time);
    }
  };

  const calculateWPM = () => {
    const wordsTyped = input.trim().split(' ').length;
    const minutes = (selectedTime - timeLeft) / 60;
    return Math.round(wordsTyped / minutes) || 0;
  };

  const calculateRawWPM = () => {
    const totalChars = input.length;
    const minutes = (selectedTime - timeLeft) / 60;
    // Standard: 5 characters = 1 word
    return Math.round((totalChars / 5) / minutes) || 0;
  };


  const calculateAccuracy = () => {
    if (input.length === 0) return 100;
    return Math.round(((input.length - mistakes) / input.length) * 100);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isStarted) setIsStarted(true);
    
    if (value.length > input.length) {
      const isCorrect = value[value.length - 1] === text[value.length - 1];
      setIsTypingCorrect(isCorrect);
      if (!isCorrect) {
        setMistakes(prev => prev + 1);
        setCurrentErrors(prev => prev + 1); // Track errors per second
      }
    }
    
    if (value.length > text.length - 50 && !isFinished) {
      setTextChunks(prev => [...prev, markovChain.generateText(30)]);
    }
    
    setInput(value);
    setCurrentCharIndex(value.length);
  };

  const handleRefresh = () => {
    setTextChunks([markovChain.generateText(30)]);
    setInput('');
    setTimeLeft(selectedTime);
    setIsStarted(false);
    setIsFinished(false);
    setWpmHistory([]);
    setCurrentCharIndex(0);
    setMistakes(0);
    setIsTypingCorrect(true);
    if (inputRef.current) inputRef.current.focus();
  };

  if (isFinished) {
    return (
      <div className="w-full max-w-[1200px] mx-auto">
        <ResultView 
          wpm={calculateWPM()} 
          accuracy={calculateAccuracy()} 
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
      <TimerOptions selectedTime={selectedTime} onTimeSelect={handleTimeSelect} />
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
                    ? input[index] === char
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
            onChange={handleInput}
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