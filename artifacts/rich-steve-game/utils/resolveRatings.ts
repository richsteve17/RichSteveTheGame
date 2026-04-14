import type { Wrestler, WrestlerRatings } from "@/constants/gameData";

export function resolveRatings(
  wrestler: Wrestler,
  override?: Partial<WrestlerRatings>
): WrestlerRatings {
  const base: WrestlerRatings = wrestler.ratings ?? {
    power: 70,
    speed: 70,
    technical: 70,
    toughness: 70,
    mic: 70,
    heat: 70,
    overall: 70,
  };

  if (!override) return base;

  const merged: WrestlerRatings = {
    power:     override.power     ?? base.power,
    speed:     override.speed     ?? base.speed,
    technical: override.technical ?? base.technical,
    toughness: override.toughness ?? base.toughness,
    mic:       override.mic       ?? base.mic,
    heat:      override.heat      ?? base.heat,
    overall:   0,
  };

  merged.overall = Math.round(
    (merged.power + merged.speed + merged.technical + merged.toughness + merged.mic + merged.heat) / 6
  );

  return merged;
}

export function getEffectiveRatings(
  wrestler: Wrestler,
  heatTier: "unknown" | "local" | "regional" | "national" | "main-event"
): WrestlerRatings {
  const isPeak = heatTier === "national" || heatTier === "main-event";
  return resolveRatings(wrestler, isPeak ? wrestler.peakRatings : undefined);
}
