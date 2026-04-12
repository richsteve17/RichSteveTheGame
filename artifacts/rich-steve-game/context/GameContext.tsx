import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@richsteve_game_state_v2";

export interface GameState {
  completedChapters: string[];
  wonChapters: string[];
  currentEra: number;
  isChampion: boolean;
  tagTitlesWon: boolean;
  heavyweightTitleWon: boolean;
  riotRumbleContractUsed: boolean;
  totalMatchesPlayed: number;
  totalMatchesWon: number;
}

const DEFAULT_STATE: GameState = {
  completedChapters: [],
  wonChapters: [],
  currentEra: 1,
  isChampion: false,
  tagTitlesWon: false,
  heavyweightTitleWon: false,
  riotRumbleContractUsed: false,
  totalMatchesPlayed: 0,
  totalMatchesWon: 0,
};

interface GameContextValue {
  gameState: GameState;
  completeChapter: (
    chapterId: string,
    won: boolean,
    options?: { isTagTitle?: boolean; isHeavyweight?: boolean; isRiotRumble?: boolean }
  ) => Promise<void>;
  resetGame: () => Promise<void>;
  isChapterUnlocked: (chapterId: string) => boolean;
  isChapterCompleted: (chapterId: string) => boolean;
  isChapterWon: (chapterId: string) => boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

const CHAPTER_ORDER = [
  // Era 1
  "ch1-managing-debut",
  "ch1-korpse-manager",
  "ch1-six-man-debut",
  // Era 2
  "ch2-ortiz",
  "ch2-spike",
  "ch2-don-e-allen",
  // Era 3
  "ch3-hostile-takeover",
  "ch3-proving-ground",
  "ch3-riot-city-rules",
  // Era 4
  "ch4-impact-society",
  "ch4-big-mike",
  "ch4-gm-loophole",
  "ch4-bruh-turns",
  // Era 5
  "ch5-riot-rumble",
  "ch5-guerrero",
  "ch5-bookstore",
  "ch5-korpse",
  "ch5-lethal-lottery",
  "ch5-last-shot",
  // Era 6 — The Lost Ending
  "ch6-mac-mayhem",
  "ch6-johnny-xross",
];

// Chapters where a WIN is required to unlock the next chapter.
// The Lost Ending Part 1 requires you to actually beat Mac — no participation trophy.
const REQUIRES_WIN_TO_ADVANCE = new Set(["ch6-mac-mayhem"]);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw) as GameState;
          setGameState({ ...DEFAULT_STATE, ...saved });
        } catch {
          setGameState(DEFAULT_STATE);
        }
      }
      setLoaded(true);
    });
  }, []);

  const save = async (next: GameState) => {
    setGameState(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const completeChapter = async (
    chapterId: string,
    won: boolean,
    options?: { isTagTitle?: boolean; isHeavyweight?: boolean; isRiotRumble?: boolean }
  ) => {
    const next = { ...gameState };
    next.totalMatchesPlayed += 1;
    if (won) next.totalMatchesWon += 1;

    if (!next.completedChapters.includes(chapterId)) {
      next.completedChapters = [...next.completedChapters, chapterId];
    }
    if (won && !next.wonChapters.includes(chapterId)) {
      next.wonChapters = [...next.wonChapters, chapterId];
    }

    if (options?.isTagTitle && won) next.tagTitlesWon = true;
    if (options?.isHeavyweight && won) next.heavyweightTitleWon = true;
    if (options?.isRiotRumble && won) {
      next.riotRumbleContractUsed = true;
      next.tagTitlesWon = true;
    }
    if (won && (options?.isTagTitle || options?.isRiotRumble)) {
      next.isChampion = true;
    }
    if (options?.isHeavyweight && won) {
      next.isChampion = true;
    }

    const idx = CHAPTER_ORDER.indexOf(chapterId);
    if (idx >= 0) {
      const era =
        idx < 3 ? 1 :
        idx < 6 ? 2 :
        idx < 9 ? 3 :
        idx < 13 ? 4 :
        idx < 19 ? 5 : 6;
      next.currentEra = Math.max(next.currentEra, era);
    }
    await save(next);
  };

  const resetGame = async () => {
    await save(DEFAULT_STATE);
  };

  const isChapterCompleted = (chapterId: string) =>
    gameState.completedChapters.includes(chapterId);

  const isChapterWon = (chapterId: string) =>
    gameState.wonChapters.includes(chapterId);

  const isChapterUnlocked = (chapterId: string): boolean => {
    const idx = CHAPTER_ORDER.indexOf(chapterId);
    if (idx === 0) return true;
    if (idx < 0) return false;
    const prev = CHAPTER_ORDER[idx - 1]!;
    if (REQUIRES_WIN_TO_ADVANCE.has(prev)) {
      return gameState.wonChapters.includes(prev);
    }
    return gameState.completedChapters.includes(prev);
  };

  if (!loaded) return null;

  return (
    <GameContext.Provider
      value={{
        gameState,
        completeChapter,
        resetGame,
        isChapterUnlocked,
        isChapterCompleted,
        isChapterWon,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
