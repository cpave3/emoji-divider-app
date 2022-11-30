/* This example requires Tailwind CSS v2.0+ */
import React from "react";

// @ts-ignore
import name from "emoji-name-map";

import { ThemeName, themes } from "./data/themes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// determine if current month is october
function isOctober() {
  const today = new Date();
  return today.getMonth() === 9;
}

// loop through each theme, and determine if any of them have a current month
function getCurrentTheme() {
  const params = new URLSearchParams(window.location.search);
  const themeOverride = params.get("theme");

  if (themeOverride && themes[themeOverride as ThemeName]) {
    return themes[themeOverride as ThemeName];
  }

  const themeNames = Object.keys(themes) as ThemeName[];
  const currentMonth = new Date().getMonth();
  const currentThemeName = themeNames.find(
    (themeName) => themes[themeName].month === currentMonth
  );
  return currentThemeName ? themes[currentThemeName] : themes["random"];
}

export default function Example() {
  const [search, setSearch] = React.useState("");
  const [selectedEmojis, setSelectedEmojis] = React.useState<string[]>([]);
  const [limit, setLimit] = React.useState(12);

  const emojiMap: Record<string, string> = getResults(search);

  function handleEmojiClick(emoji: string) {
    setSelectedEmojis((old) => [...old, emoji]);
  }

  function removeSelectedEmojiByIndex(index: number) {
    setSelectedEmojis((old) => old.filter((_, i) => i !== index));
  }

  function generateBuffer(arr: any[], desiredTotal: number) {
    const buffer = [];

    // fill out the buffer by looping through the array, and adding items from it until we reach the desired total

    for (
      let i = 0;
      buffer.length + arr.length < desiredTotal;
      i < arr.length - 1 ? i++ : (i = 0)
    ) {
      buffer.push(arr[i % arr.length]);
    }

    return buffer;
  }

  function getFullEmojiArray() {
    const buffer = generateBuffer(selectedEmojis, limit);
    return [...selectedEmojis, ...buffer].map(
      (emojiName) => name.emoji[emojiName]
    );
  }

  const holidayButton = () => {
    const theme = getCurrentTheme();
    const getRandomThemeEmojis = () => {
      if (theme === null) {
        return null;
      }
      const themeEmojis = [...theme.emojis];

      const randomEmojis = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * themeEmojis.length);
        randomEmojis.push(themeEmojis.splice(randomIndex, 1)[0]);
      }
      setSelectedEmojis(randomEmojis);
    };

    if (theme === null) {
      return null;
    }

    return (
      <button
        onClick={getRandomThemeEmojis}
        className={classNames(
          "text-white font-bold py-2 px-4 rounded",
          theme.colorStyles
        )}
      >
        {theme.buttonText}
      </button>
    );
  };

  return (
    <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex justify-center h-20 sticky top-0 bg-white border-b">
        <ul className="flex text-5xl h-full align-middle justify-center">
          {getFullEmojiArray().map((emoji, index) => {
            const isBuffered = index >= selectedEmojis.length;
            return (
              <li
                className={classNames(
                  "flex align-middle leading-normal",
                  isBuffered
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                )}
                onClick={
                  !isBuffered
                    ? () => removeSelectedEmojiByIndex(index)
                    : undefined
                }
                key={`${emoji}:${index}`}
              >
                {emoji}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-4 flex justify-center flex-col">
        {selectedEmojis.length > 0 ? (
          <>
            <div className="flex justify-center gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  window.navigator.clipboard.writeText(
                    getFullEmojiArray().join("")
                  )
                }
              >
                Copy Emojis to Clipboard
              </button>
              {holidayButton()}
            </div>
            <div className="flex justify-center pt-4">
              <span>Repeat up to</span>
              <input
                type="number"
                max={20}
                min={1}
                className="w-12 mx-2"
                onChange={(e) => setLimit(Number.parseInt(e.target.value))}
                value={limit}
              />
              <span>{limit == 1 ? "emoji" : "emojis"}</span>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <span>Select an emoji to begin or</span>
            {holidayButton()}
          </div>
        )}
      </div>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <input
            aria-label="Search for an emoji"
            placeholder="Search for an emoji"
            className="w-96 p-2 border border-gray-300 rounded"
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div>
          <ul className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
            {Object.keys(emojiMap).map((emoji) => {
              return (
                <li
                  title={emoji}
                  className="text-4xl flex justify-center cursor-pointer"
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emojiMap[emoji]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}

function getResults(search: string) {
  const emojis = name.emoji;

  const filtered = Object.keys(emojis).filter((key) => {
    return key.includes(search);
  });

  const results: Record<string, string> = {};

  filtered.forEach((key) => {
    results[key] = emojis[key];
  });

  return results;
}
