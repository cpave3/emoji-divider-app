// @ts-ignore
import name from "emoji-name-map";

export type ThemeName = "halloween" | "xmas" | "thxGiving" | "random";

export type Theme = {
  month: number;
  emojis: string[];
  colorStyles: string;
  buttonText: string;
};

export const themes: Record<ThemeName, Theme> = {
  random: {
    month: -1,
    colorStyles: "bg-orange-600 hover:bg-orange-800",
    buttonText: "I'm feeling lucky 👀",
    emojis: Object.keys(name.emoji),
  },
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
    colorStyles: "bg-green-600 hover:bg-green-800",
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
      "family_man_woman_girl_boy",
      "handshake",
      "fallen_leaf",
      "maple_leaf",
      "carrot",
      "chestnut",
      "bacon",
      "pie",
      "house_with_garden",
      "scarf",
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
