import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CAREER_CHAPTERS } from "@/constants/gameData";

const STORAGE_KEY = "@richsteve_game_state_v2";

export interface FreePlayStats {
  totalMatches: number;
  wins: number;
  losses: number;
  heat: number;
  heatTier: "unknown" | "local" | "regional" | "national" | "main-event";
  opponentsBeaten: string[];
  consecutiveNonWins: number;
}

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
  freePlayStats: FreePlayStats;
}

const DEFAULT_FREE_PLAY_STATS: FreePlayStats = {
  totalMatches: 0,
  wins: 0,
  losses: 0,
  heat: 0,
  heatTier: "unknown",
  opponentsBeaten: [],
  consecutiveNonWins: 0,
};

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
  freePlayStats: DEFAULT_FREE_PLAY_STATS,
};

function computeHeatTier(heat: number): FreePlayStats["heatTier"] {
  if (heat >= 100) return "main-event";
  if (heat >= 50) return "national";
  if (heat >= 25) return "regional";
  if (heat >= 10) return "local";
  return "unknown";
}

interface GameContextValue {
  gameState: GameState;
  completeChapter: (
    chapterId: string,
    won: boolean,
    options?: { isTagTitle?: boolean; isHeavyweight?: boolean; isRiotRumble?: boolean }
  ) => Promise<void>;
  recordFreePlayMatch: (args: {
    won: boolean;
    method: string;
    isStipulation: boolean;
    opponentId: string;
    opponentOvr: number;
    heelUsed: boolean;
    isTitleMatch: boolean;
    intentionalLoss: boolean;
  }) => Promise<{ heatDelta: number }>;
  resetGame: () => Promise<void>;
  isChapterUnlocked: (chapterId: string) => boolean;
  isChapterCompleted: (chapterId: string) => boolean;
  isChapterWon: (chapterId: string) => boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

const CHAPTER_ORDER = [
  "ch1-managing-debut",
  "ch1-korpse-manager",
  "ch1-nightmare-xmas",
  "ch1-six-man-debut",
  "ch2-ortiz",
  "ch2-spike",
  "ch2-don-e-allen",
  "ch3-hostile-takeover",
  "ch3-proving-ground",
  "ch3-september-remember",
  "ch3-winter-war",
  "ch3-spring-brawl",
  "ch3-riot-city-rules",
  "ch4-big-mike",
  "ch4-bruh-turns",
  "ch5-impact-debut",
  "ch5-awa-loss",
  "ch5-ssw-contract",
  "ch5-ssw-titles",
  "ch5-korpse",
  "ch6-gm-loophole",
  "ch5-riot-rumble",
  "ch5-guerrero",
  "ch5-bookstore",
  "ch5-lethal-lottery",
  "ch5-last-shot",
  "ch6-mac-mayhem",
  "ch6-johnny-xross",
];

const REQUIRES_WIN_TO_ADVANCE = new Set(["ch6-mac-mayhem"]);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw) as GameState;
          setGameState({
            ...DEFAULT_STATE,
            ...saved,
            freePlayStats: { ...DEFAULT_FREE_PLAY_STATS, ...(saved.freePlayStats ?? {}) },
          });
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

    const chapterData = CAREER_CHAPTERS.find((c) => c.id === chapterId);
    if (chapterData) {
      next.currentEra = Math.max(next.currentEra, chapterData.era);
    }
    await save(next);
  };

  const recordFreePlayMatch = async (args: {
    won: boolean;
    method: string;
    isStipulation: boolean;
    opponentId: string;
    opponentOvr: number;
    heelUsed: boolean;
    isTitleMatch: boolean;
    intentionalLoss: boolean;
  }): Promise<{ heatDelta: number }> => {
    const prev = gameState.freePlayStats;
    const RICH_STEVE_OVR = 91;

    let delta = 0;
    if (args.won) {
      if (args.isStipulation) {
        delta = 3;
      } else if (args.method === "submission") {
        delta = 2;
      } else {
        delta = 1;
      }
      if (args.opponentOvr > RICH_STEVE_OVR) delta += 2;
      if (args.isTitleMatch) delta += 4;
    } else if (args.intentionalLoss) {
      delta = 1;
    }
    if (args.heelUsed) delta += 1;
    const hadProgress = args.won || args.heelUsed || args.intentionalLoss;
    if (!hadProgress && prev.consecutiveNonWins >= 3) delta -= 1;

    const newHeat = Math.max(0, prev.heat + delta);
    const newConsecutive = hadProgress ? 0 : prev.consecutiveNonWins + 1;
    const newOpponentsBeaten =
      args.won && !prev.opponentsBeaten.includes(args.opponentId)
        ? [...prev.opponentsBeaten, args.opponentId]
        : prev.opponentsBeaten;

    const nextFP: FreePlayStats = {
      totalMatches: prev.totalMatches + 1,
      wins: prev.wins + (args.won ? 1 : 0),
      losses: prev.losses + (args.won ? 0 : 1),
      heat: newHeat,
      heatTier: computeHeatTier(newHeat),
      opponentsBeaten: newOpponentsBeaten,
      consecutiveNonWins: newConsecutive,
    };

    const next: GameState = { ...gameState, freePlayStats: nextFP };
    await save(next);
    return { heatDelta: delta };
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
        recordFreePlayMatch,
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
