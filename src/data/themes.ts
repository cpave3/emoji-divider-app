export type ThemeName = "halloween" | "xmas" | "thxGiving";

export type Theme = {
  month: number;
  emojis: string[];
  colorStyles: string;
  buttonText: string;
};

export const themes: Record<ThemeName, Theme> = {
  halloween: {
    month: 9,
    colorStyles: "bg-violet-600 hover:bg-violet-800",
    buttonText: "Trick or Treat 🎃",
    emojis: [
      "smiling_imp",
      "imp",
      "japanese_goblin",
      "japanese_ogre",
      "skull",
      "ghost",
      "alien",
      "woman_vampire",
      "man_vampire",
      "woman_zombie",
      "man_zombie",
      "woman_supervillain",
      "man_supervillain",
      "jack_o_lantern",
      "spider_web",
      "bat",
      "spider",
    ],
  },
  thxGiving: {
    month: 10,
    colorStyles: "bg-blue-600 hover:bg-blue-800",
    buttonText: "Give Thanks 🦃",
    emojis: [
      "turkey",
      "sweet_potato",
      "honey_pot",
      "bread",
      "cheese",
      "tada",
      "pray",
      "raised_hands",
      "corn",
      "potato",
    ],
  },
  xmas: {
    month: 11,
    colorStyles: "bg-red-600 hover:bg-red-800",
    buttonText: "Jingle Bells 🎄",
    emojis: [
      "santa",
      "snowflake",
      "snowman",
      "snowman_with_snow",
      "christmas_tree",
      "deer",
      "candy",
      "gift",
      "bell",
      "confetti_ball",
    ],
  },
};
