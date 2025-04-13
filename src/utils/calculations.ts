export const calculateWPM = (input: string, elapsedTimeInSeconds: number) => {
  if (elapsedTimeInSeconds === 0) return 0;
  const wordsTyped = input.trim().split(' ').length;
  const minutes = elapsedTimeInSeconds / 60;
  return Math.round(wordsTyped / minutes) || 0;
};

export const calculateRawWPM = (totalChars: number, elapsedTimeInSeconds: number) => {
  const minutes = elapsedTimeInSeconds / 60;
  return Math.round((totalChars / 5) / minutes) || 0;
};

export const calculateAccuracy = (totalChars: number, mistakes: number) => {
  if (totalChars === 0) return 100;
  return Math.round(((totalChars - mistakes) / totalChars) * 100);
};