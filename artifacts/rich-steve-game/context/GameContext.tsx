import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@richsteve_game_state";

export interface GameState {
  completedChapters: string[];
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
  completeChapter: (chapterId: string, won: boolean, options?: { isTagTitle?: boolean; isHeavyweight?: boolean; isRiotRumble?: boolean }) => Promise<void>;
  resetGame: () => Promise<void>;
  isChapterUnlocked: (chapterId: string) => boolean;
  isChapterCompleted: (chapterId: string) => boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

const CHAPTER_ORDER = [
  "ch1-debut",
  "ch2-grand-championship",
  "ch3-hostile-takeover",
  "ch4-scalping",
  "ch5-invasion",
  "ch6-big-mike-saga",
  "ch7-gm-loophole",
  "ch8-lethal-lottery",
  "ch9-no-turning-back",
  "ch10-lost-ending-part1",
  "ch11-lost-ending-finale",
];

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
    if (options?.isTagTitle && won) next.tagTitlesWon = true;
    if (options?.isHeavyweight && won) next.heavyweightTitleWon = true;
    if (options?.isRiotRumble && won) {
      next.riotRumbleContractUsed = true;
      next.tagTitlesWon = true;
    }
    if (won && (options?.isTagTitle || options?.isRiotRumble || options?.isHeavyweight)) {
      next.isChampion = true;
    }

    const idx = CHAPTER_ORDER.indexOf(chapterId);
    if (idx >= 0) {
      const era = idx < 2 ? 1 : idx < 4 ? 2 : idx < 8 ? 3 : 4;
      next.currentEra = Math.max(next.currentEra, era);
    }
    await save(next);
  };

  const resetGame = async () => {
    await save(DEFAULT_STATE);
  };

  const isChapterCompleted = (chapterId: string) => {
    return gameState.completedChapters.includes(chapterId);
  };

  const isChapterUnlocked = (chapterId: string) => {
    const idx = CHAPTER_ORDER.indexOf(chapterId);
    if (idx === 0) return true;
    if (idx < 0) return false;
    const prev = CHAPTER_ORDER[idx - 1];
    return gameState.completedChapters.includes(prev!);
  };

  if (!loaded) return null;

  return (
    <GameContext.Provider
      value={{ gameState, completeChapter, resetGame, isChapterUnlocked, isChapterCompleted }}
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
