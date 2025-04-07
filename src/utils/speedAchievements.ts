type Achievement = {
  title: string;
  message: string;
  illustration: string;
};

export const getSpeedAchievement = (wpm: number): Achievement => {
  if (wpm < 20) {
    return {
      title: "Sleepy Bunny",
      message: "Taking it easy, hop by hop! 🌸",
      illustration: "/illustrations/sleepy-bunny.svg",
    };
  } else if (wpm < 40) {
    return {
      title: "Garden Hopper",
      message: "Bouncing through the carrot patch! Keep going!",
      illustration: "/illustrations/garden-bunny.svg",
    };
  } else if (wpm < 60) {
    return {
      title: "Swift Rabbit",
      message: "Zooming through the meadow! Amazing speed!",
      illustration: "/illustrations/swift-bunny.svg",
    };
  } else if (wpm < 80) {
    return {
      title: "Rocket Bunny",
      message: "Incredible! You're faster than a jumping jackrabbit!",
      illustration: "/illustrations/rocket-bunny.svg",
    };
  } else {
    return {
      title: "Super Sonic Bunny",
      message: "Phenomenal! You're typing at the speed of light!",
      illustration: "/illustrations/supersonic-bunny.svg",
    };
  }
};