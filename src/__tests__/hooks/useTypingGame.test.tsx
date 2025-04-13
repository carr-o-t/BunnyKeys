import { renderHook, act } from '@testing-library/react';
import { useTypingGame } from '@/hooks/useTypingGame';

describe('useTypingGame Hook', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    // Initial State Tests
    describe('Initial State', () => {
        it('should initialize with correct default values', () => {
            const { result } = renderHook(() => useTypingGame(30));

            expect(result.current.timeLeft).toBe(30);
            expect(result.current.input).toBe('');
            expect(result.current.isStarted).toBe(false);
            expect(result.current.isFinished).toBe(false);
            expect(result.current.mistakes).toBe(0);
            expect(result.current.stats.wpm).toBe(0);
            expect(result.current.stats.accuracy).toBe(100);
        });

        it('should update timeLeft when selectedTime changes', () => {
            const { result, rerender } = renderHook(
                (props) => useTypingGame(props),
                { initialProps: 30 }
            );

            rerender(60);
            expect(result.current.timeLeft).toBe(60);
        });
    });

    // Typing Behavior Tests
    describe('Typing Behavior', () => {
        it('should start game on first input', () => {
            const { result } = renderHook(() => useTypingGame(30));

            act(() => {
                result.current.handleInput('t');
            });

            expect(result.current.isStarted).toBe(true);
            expect(result.current.input).toBe('t');
        });

        it('should track correct typing accurately', () => {
            const { result } = renderHook(() => useTypingGame(30));
            const firstChar = result.current.text[0];

            act(() => {
                result.current.handleInput(firstChar);
            });

            expect(result.current.isTypingCorrect).toBe(true);
            expect(result.current.charAccuracy[0]).toBe(true);
            expect(result.current.mistakes).toBe(0);
        });

        it('should track incorrect typing accurately', () => {
            const { result } = renderHook(() => useTypingGame(30));
            const wrongChar = result.current.text[0] === 'a' ? 'b' : 'a';

            act(() => {
                result.current.handleInput(wrongChar);
            });

            expect(result.current.isTypingCorrect).toBe(false);
            expect(result.current.charAccuracy[0]).toBe(false);
            expect(result.current.mistakes).toBe(1);
        });
    });

    // Timer Tests
    describe('Timer Behavior', () => {
        it('should countdown when game is started', () => {
            const { result } = renderHook(() => useTypingGame(30));

            // First trigger the game start by providing input
            act(() => {
                result.current.handleInput('t');
            });

            // Then advance timers
            act(() => {
                jest.advanceTimersByTime(1000); // advance by 1 second
            });

            expect(result.current.timeLeft).toBe(29);
        });

        it('should finish game when time runs out', () => {
            const { result } = renderHook(() => useTypingGame(30));

            // First trigger the game start by providing input
            act(() => {
                result.current.handleInput('t');
            });

            // Then advance timers
            act(() => {
                jest.advanceTimersByTime(30000); // advance by 1 second
            });

            expect(result.current.isFinished).toBe(true);
        });
    });

    // Stats Calculation Tests
    describe('Statistics Calculation', () => {
        it('should calculate WPM correctly', () => {
            const { result } = renderHook(() => useTypingGame(15));

            act(() => {
                result.current.handleInput('test ');
            });
            act(() => {
                jest.advanceTimersByTime(5000);
            });

            expect(result.current.stats.wpm).toBe(12);
        });

        it('should maintain accuracy history', () => {
            const { result } = renderHook(() => useTypingGame(30));

            act(() => {
                const correctChar = result.current.text[0];
                result.current.handleInput(correctChar);
            });

            act(() => {
                jest.advanceTimersByTime(1000);
            });

            expect(result.current.errorHistory).toHaveLength(1);
            expect(result.current.wpmHistory).toHaveLength(1);
        });
    });

    // Reset Functionality Tests
    describe('Reset Functionality', () => {
        it('should reset all states correctly', () => {
            const { result } = renderHook(() => useTypingGame(30));

            act(() => {
                result.current.handleInput('test');
                result.current.reset();
            });

            expect(result.current.input).toBe('');
            expect(result.current.isStarted).toBe(false);
            expect(result.current.isFinished).toBe(false);
            expect(result.current.mistakes).toBe(0);
            expect(result.current.charAccuracy).toHaveLength(0);
        });
    });

    // Edge Cases
    describe('Edge Cases', () => {
        it('should handle rapid typing correctly', () => {
            const { result } = renderHook(() => useTypingGame(30));

            act(() => {
                const text = result.current.text.substring(0, 5);
                result.current.handleInput(text);
            });

            expect(result.current.charAccuracy).toHaveLength(5);
        });

        it('should handle backspace correctly', () => {
            const { result } = renderHook(() => useTypingGame(30));

            act(() => {
                result.current.handleInput('test');
                result.current.handleInput('tes');
            });

            expect(result.current.input).toBe('tes');
            expect(result.current.currentCharIndex).toBe(3);
        });
    });
});