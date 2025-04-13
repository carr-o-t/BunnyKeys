import { getSpeedAchievement } from '../../utils/speedAchievements';

describe('Speed Achievements', () => {
  describe('Achievement Categories', () => {
    it('should return Sleepy Bunny for WPM < 20', () => {
      const achievement = getSpeedAchievement(15);
      expect(achievement).toEqual({
        title: "Sleepy Bunny",
        message: "Taking it easy, hop by hop! 🌸",
        illustration: "/illustrations/sleepy-bunny.svg", //comment
      });
    });

    it('should return Garden Hopper for WPM between 20 and 39', () => {
      const achievement = getSpeedAchievement(35);
      expect(achievement).toEqual({
        title: "Garden Hopper",
        message: "Bouncing through the carrot patch! Keep going!",
        illustration: "/illustrations/garden-bunny.svg",
      });
    });

    it('should return Swift Rabbit for WPM between 40 and 59', () => {
      const achievement = getSpeedAchievement(45);
      expect(achievement).toEqual({
        title: "Swift Rabbit",
        message: "Zooming through the meadow! Amazing speed!",
        illustration: "/illustrations/swift-bunny.svg",
      });
    });

    it('should return Rocket Bunny for WPM between 60 and 79', () => {
      const achievement = getSpeedAchievement(75);
      expect(achievement).toEqual({
        title: "Rocket Bunny",
        message: "Incredible! You're faster than a jumping jackrabbit!",
        illustration: "/illustrations/rocket-bunny.svg",
      });
    });

    it('should return Super Sonic Bunny for WPM >= 80', () => {
      const achievement = getSpeedAchievement(100);
      expect(achievement).toEqual({
        title: "Super Sonic Bunny",
        message: "Phenomenal! You're typing at the speed of light!",
        illustration: "/illustrations/supersonic-bunny.svg",
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero WPM', () => {
      const achievement = getSpeedAchievement(0);
      expect(achievement.title).toBe("Sleepy Bunny");
    });

    it('should handle negative WPM', () => {
      const achievement = getSpeedAchievement(-10);
      expect(achievement.title).toBe("Sleepy Bunny");
    });

    it('should handle boundary values', () => {
      // Test exact boundary values
      expect(getSpeedAchievement(20).title).toBe("Garden Hopper");
      expect(getSpeedAchievement(40).title).toBe("Swift Rabbit");
      expect(getSpeedAchievement(60).title).toBe("Rocket Bunny");
      expect(getSpeedAchievement(80).title).toBe("Super Sonic Bunny");
    });
  });

  describe('Achievement Structure', () => {
    it('should return object with correct properties', () => {
      const achievement = getSpeedAchievement(50);
      expect(achievement).toHaveProperty('title');
      expect(achievement).toHaveProperty('message');
      expect(achievement).toHaveProperty('illustration');
      expect(typeof achievement.title).toBe('string');
      expect(typeof achievement.message).toBe('string');
      expect(typeof achievement.illustration).toBe('string');
    });

    it('should have valid illustration paths', () => {
      const achievement = getSpeedAchievement(50);
      expect(achievement.illustration).toMatch(/^\/illustrations\/.*\.svg$/);
    });
  });
});