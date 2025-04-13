import { useState, useEffect } from 'react';
import { markovChain } from '../utils/textGenerator';
import { calculateAccuracy, calculateRawWPM, calculateWPM } from '@/utils/calculations';

export function useTypingGame(selectedTime: number) {
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [textChunks, setTextChunks] = useState<string[]>([markovChain.generateText(30)]);
  const [input, setInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTypingCorrect, setIsTypingCorrect] = useState(true);
  const [errorHistory, setErrorHistory] = useState<number[]>([]);
  const [rawWpmHistory, setRawWpmHistory] = useState<number[]>([]);
  const [currentErrors, setCurrentErrors] = useState(0);

  const text = textChunks.join(' ');

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime === 0) {
            setIsFinished(true);
          }
          return newTime;
        });

        // Update stats immediately after time changes
        const currentWPM = calculateWPM(input, selectedTime - (timeLeft - 1));
        const rawWPM = calculateRawWPM(input.length, selectedTime - (timeLeft - 1));
        setWpmHistory(prev => [...prev, currentWPM]);
        setRawWpmHistory(prev => [...prev, rawWPM]);
        setErrorHistory(prev => [...prev, currentErrors]);
        setCurrentErrors(0);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isStarted, timeLeft]);

  // Add new state to track character accuracy
  const [charAccuracy, setCharAccuracy] = useState<boolean[]>([]);

  const handleInput = (value: string) => {
    if (!isStarted) setIsStarted(true);
    
    if (value.length > input.length) {
      // Handle multiple characters being added
      const newChars = value.slice(input.length);
      const startIndex = input.length;
      
      [...newChars].forEach((char, idx) => {
        const isCorrect = char === text[startIndex + idx];
        setCharAccuracy(prev => [...prev, isCorrect]);
        if (!isCorrect) {
          setMistakes(prev => prev + 1);
          setCurrentErrors(prev => prev + 1);
        }
      });
      
      setIsTypingCorrect(value[value.length - 1] === text[value.length - 1]);
    }
    
    if (value.length > text.length - 50 && !isFinished) {
      setTextChunks(prev => [...prev, markovChain.generateText(30)]);
    }
    
    setInput(value);
    setCurrentCharIndex(value.length);
  };

   // Update timeLeft when selectedTime changes
   useEffect(() => {
    setTimeLeft(selectedTime);
  }, [selectedTime]);

  const reset = () => {
    setTextChunks([markovChain.generateText(30)]);
    setInput('');
    setTimeLeft(selectedTime);
    setIsStarted(false);
    setIsFinished(false);
    setWpmHistory([]);
    setCurrentCharIndex(0);
    setMistakes(0);
    setIsTypingCorrect(true);
    setCharAccuracy([]); // Reset character accuracy tracking
  };

  return {
    timeLeft,
    text,
    input,
    isStarted,
    isFinished,
    wpmHistory,
    rawWpmHistory,
    errorHistory,
    currentCharIndex,
    isTypingCorrect,
    mistakes,
    handleInput,
    reset,
    stats: {
      wpm: calculateWPM(input, selectedTime - timeLeft),
      accuracy: calculateAccuracy(input.length, mistakes)
    },
    charAccuracy,
  };
}