class MarkovChain {
  private chain: Map<string, string[]> = new Map();
  private startWords: string[] = [];

  constructor(texts: string[]) {
    this.train(texts);
  }

  private train(texts: string[]) {
    texts.forEach(text => {
      const words = text.toLowerCase().split(' ');
      this.startWords.push(words[0]);

      for (let i = 0; i < words.length - 1; i++) {
        const currentWord = words[i];
        const nextWord = words[i + 1];

        if (!this.chain.has(currentWord)) {
          this.chain.set(currentWord, []);
        }
        this.chain.get(currentWord)!.push(nextWord);
      }
    });
  }

  generateText(wordCount: number = 30): string {
    if (wordCount <= 0) return '';
    
    let currentWord = this.startWords[Math.floor(Math.random() * this.startWords.length)];
    const result = [currentWord];

    for (let i = 1; i < wordCount; i++) {
      const nextWords = this.chain.get(currentWord);
      if (!nextWords || nextWords.length === 0) {
        currentWord = this.startWords[Math.floor(Math.random() * this.startWords.length)];
      } else {
        currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
      }
      result.push(currentWord);
    }

    return result.join(' ');
  }
}

const sampleTexts = [
  "the quick brown fox jumps over the lazy dog while the cat sleeps peacefully in the sun",
  "coding is fun and challenging but practice makes perfect when learning new skills",
  "music fills the air with melody and rhythm as people dance to the beat of their hearts",
  // Add more sample texts for better generation
];

export const markovChain = new MarkovChain(sampleTexts);