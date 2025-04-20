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
  
    const prevInput = input;
    const newInput = value;
    const updatedAccuracy: boolean[] = [];
  
    let newMistakes = 0;
  
    for (let i = 0; i < newInput.length; i++) {
      const correctChar = text[i];
      const typedChar = newInput[i];
      const wasPreviouslyWrong = charAccuracy[i] === false;
  
      const isCorrect = typedChar === correctChar;
      updatedAccuracy[i] = isCorrect;
  
      if (!isCorrect && (charAccuracy[i] === undefined || charAccuracy[i] === true)) {
        newMistakes += 1;
      }
  
      // If previously incorrect and now corrected
      if (isCorrect && wasPreviouslyWrong) {
        newMistakes -= 1;
      }
    }
  
    // If user deleted characters
    if (newInput.length < prevInput.length) {
      updatedAccuracy.splice(newInput.length);
    }
  
    setCharAccuracy(updatedAccuracy);
    setMistakes(prev => prev + newMistakes);
    setCurrentErrors(updatedAccuracy.filter(c => c === false).length);
  
    setIsTypingCorrect(newInput[newInput.length - 1] === text[newInput.length - 1]);
  
    if (newInput.length > text.length - 50 && !isFinished) {
      setTextChunks(prev => [...prev, markovChain.generateText(30)]);
    }
  
    setInput(newInput);
    setCurrentCharIndex(newInput.length);
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