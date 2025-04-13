import { BunnyMood } from '@/components/BunnyMood';
import { render, screen } from '@testing-library/react';

describe('BunnyMood Component', () => {
  // Happy Path Tests
  describe('Happy State', () => {
    it('should display happy bunny and correct message when typing correctly', () => {
      render(<BunnyMood isTypingCorrect={true} timeLeft={30} isTimeRunningOut={false} />);
      
      expect(screen.getByText('(｡◕‿◕｡)')).toBeInTheDocument();
      expect(screen.getByText('Yummy carrot! Keep going! 🥕✨')).toBeInTheDocument();
      expect(screen.getByText('🥕')).toBeInTheDocument();
    });
  });

  // Sad Path Tests
  describe('Sad State', () => {
    it('should display sad bunny and encouragement message when typing incorrectly', () => {
      render(<BunnyMood isTypingCorrect={false} timeLeft={30} isTimeRunningOut={false} />);
      
      expect(screen.getByText('(｡•́︿•̀｡)')).toBeInTheDocument();
      expect(screen.getByText('Aww... you can do it! 💝')).toBeInTheDocument();
      expect(screen.getByText('🥕')).toBeInTheDocument();
    });
  });

  // Panic State Tests
  describe('Panic State', () => {
    it('should display panic bunny and hurry message when time is running out', () => {
      render(<BunnyMood isTypingCorrect={true} timeLeft={5} isTimeRunningOut={true} />);
      
      expect(screen.getByText('(⊙﹏⊙)')).toBeInTheDocument();
      expect(screen.getByText('Eek! Hurry hurry! 🏃‍♂️💨')).toBeInTheDocument();
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should prioritize panic state over sad state when both conditions are true', () => {
      render(<BunnyMood isTypingCorrect={false} timeLeft={3} isTimeRunningOut={true} />);
      
      expect(screen.getByText('(⊙﹏⊙)')).toBeInTheDocument();
      expect(screen.getByText('Eek! Hurry hurry! 🏃‍♂️💨')).toBeInTheDocument();
    });

    it('should handle exactly 5 seconds remaining as panic state', () => {
      render(<BunnyMood isTypingCorrect={true} timeLeft={5} isTimeRunningOut={true} />);
      
      expect(screen.getByText('(⊙﹏⊙)')).toBeInTheDocument();
      expect(screen.getByText('Eek! Hurry hurry! 🏃‍♂️💨')).toBeInTheDocument();
    });
  });

  // Animation Tests
  describe('Animation Presence', () => {
    it('should render with AnimatePresence wrapper', () => {
      const { container } = render(
        <BunnyMood isTypingCorrect={true} timeLeft={30} isTimeRunningOut={false} />
      );
      
      expect(container.firstChild).toHaveClass('mt-6');
    });
  });
});