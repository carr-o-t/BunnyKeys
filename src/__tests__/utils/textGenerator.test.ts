import { markovChain } from '../../utils/textGenerator';

describe('MarkovChain Text Generator', () => {
  describe('Text Generation', () => {
    it('should generate text with default word count', () => {
      const generatedText = markovChain.generateText();
      const wordCount = generatedText.split(' ').length;
      
      expect(wordCount).toBe(0); // Default word count
      expect(typeof generatedText).toBe('string');
      expect(generatedText.length).toBeGreaterThan(0);
    });

    it('should generate text with custom word count', () => {
      const customWordCount = 15;
      const generatedText = markovChain.generateText(customWordCount);
      const wordCount = generatedText.split(' ').length;
      
      expect(wordCount).toBe(customWordCount);
    });

    it('should generate different texts on consecutive calls', () => {
      const text1 = markovChain.generateText();
      const text2 = markovChain.generateText();
      
      expect(text1).not.toBe(text2);
    });

    it('should generate text containing only lowercase words', () => {
      const generatedText = markovChain.generateText();
      expect(generatedText).toBe(generatedText.toLowerCase());
    });
  });

  describe('Text Content', () => {
    it('should generate text using words from sample texts', () => {
      const generatedText = markovChain.generateText();
      const words = generatedText.split(' ');
      
      // Check if generated words exist in the training vocabulary
      const commonWords = ['the', 'quick', 'brown', 'fox', 'coding', 'music'];
      const hasCommonWords = commonWords.some(word => words.includes(word));
      
      expect(hasCommonWords).toBe(true);
    });

    it('should maintain word relationships from training data', () => {
      // Generate multiple texts to increase chance of finding patterns
      const texts = Array.from({ length: 10 }, () => markovChain.generateText());
      
      // Check for common word pairs from training data
      const commonPairs = [
        ['quick', 'brown'],
        ['brown', 'fox'],
        ['is', 'fun'],
        ['the', 'lazy']
      ];
      
      const hasCommonPairs = texts.some(text => {
        return commonPairs.some(([word1, word2]) => {
          return text.includes(`${word1} ${word2}`);
        });
      });
      
      expect(hasCommonPairs).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero word count', () => {
      const generatedText = markovChain.generateText(0);
      expect(generatedText).toBe('');
    });

    it('should handle very large word counts', () => {
      const largeCount = 1000;
      const generatedText = markovChain.generateText(largeCount);
      const wordCount = generatedText.split(' ').length;
      
      expect(wordCount).toBe(largeCount);
      expect(typeof generatedText).toBe('string');
    });

    it('should generate valid text even with repeated words in training data', () => {
      const generatedText = markovChain.generateText();
      const words = generatedText.split(' ');
      
      // Check if text is properly space-separated
      expect(words.every(word => word.length > 0)).toBe(true);
      expect(generatedText.match(/\s{2,}/g)).toBeNull(); // No multiple spaces
    });
  });

  describe('Performance', () => {
    it('should generate text quickly for normal word counts', () => {
      const startTime = performance.now();
      markovChain.generateText(100);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Should take less than 100ms
    });
  });
});