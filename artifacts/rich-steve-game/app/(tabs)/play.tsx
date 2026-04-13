import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { WRESTLERS, RICH_STEVE, type WrestlerRatings } from "@/constants/gameData";
import { getWrestlerPhoto } from "@/constants/wrestlerPhotos";

const RATING_ATTRS: { key: keyof Omit<WrestlerRatings, "overall">; label: string; color: string }[] = [
  { key: "power",     label: "PWR",   color: "#ef4444" },
  { key: "speed",     label: "SPD",   color: "#22c55e" },
  { key: "technical", label: "TEC",   color: "#3b82f6" },
  { key: "toughness", label: "TOUGH", color: "#f97316" },
  { key: "mic",       label: "MIC",   color: "#D4AF37" },
  { key: "heat",      label: "HEAT",  color: "#a855f7" },
];

function ovrColor(ovr: number) {
  return ovr >= 90 ? "#D4AF37" : ovr >= 80 ? "#22c55e" : ovr >= 70 ? "#3b82f6" : "#888888";
}

function OvrBadge({ overall, dim }: { overall: number; dim?: boolean }) {
  const color = dim ? "#555555" : ovrColor(overall);
  return (
    <View style={[styles.ovrBadge, { borderColor: color }]}>
      <Text style={[styles.ovrNumber, { color }]}>{overall}</Text>
      <Text style={[styles.ovrLabel, { color }]}>OVR</Text>
    </View>
  );
}

function SlotCard({
  label,
  wrestler,
  isActive,
  onPress,
  colors: c,
}: {
  label: string;
  wrestler: typeof RICH_STEVE | null;
  isActive: boolean;
  onPress: () => void;
  colors: ReturnType<typeof useColors>;
}) {
  const photo = wrestler ? getWrestlerPhoto(wrestler.id) : null;
  const borderCol = isActive ? c.primary : c.border;
  return (
    <Pressable
      style={[styles.slotCard, { borderColor: borderCol, backgroundColor: isActive ? c.primary + "22" : c.card }]}
      onPress={onPress}
    >
      <Text style={[styles.slotLabel, { color: isActive ? c.primary : c.mutedForeground }]}>{label}</Text>
      {wrestler ? (
        <View style={styles.slotInner}>
          {photo ? (
            <View style={[styles.slotPhoto, { borderColor: borderCol }]}>
              <Image source={photo} style={styles.slotPhotoImg} resizeMode="cover" />
            </View>
          ) : (
            <View style={[styles.slotPhoto, styles.slotPhotoEmpty, { borderColor: borderCol }]}>
              <MaterialCommunityIcons name="account" size={18} color={c.mutedForeground} />
            </View>
          )}
          <Text style={[styles.slotName, { color: c.foreground }]} numberOfLines={1}>{wrestler.name}</Text>
          {wrestler.ratings && (
            <Text style={[styles.slotOvr, { color: ovrColor(wrestler.ratings.overall) }]}>
              {wrestler.ratings.overall}
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.slotEmpty}>
          <MaterialCommunityIcons name="plus-circle-outline" size={20} color={isActive ? c.primary : c.mutedForeground} />
          <Text style={[styles.slotEmptyText, { color: isActive ? c.primary : c.mutedForeground }]}>
            {isActive ? "TAP BELOW" : "NONE"}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default function PlayScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const all = [RICH_STEVE, ...WRESTLERS].filter((w) => w.role !== "Manager" && w.ratings);
  const ranked = [...all].sort((a, b) => b.ratings!.overall - a.ratings!.overall);

  const [characterId, setCharacterId] = useState<string>("rich-steve");
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [picking, setPicking] = useState<"character" | "opponent">("opponent");

  const character = ranked.find((w) => w.id === characterId) ?? RICH_STEVE;
  const opponent = opponentId ? ranked.find((w) => w.id === opponentId) ?? null : null;

  const handleCardTap = (id: string) => {
    if (picking === "character") {
      setCharacterId(id);
      if (opponentId === id) setOpponentId(null);
      setPicking("opponent");
    } else {
      if (id === characterId) {
        setPicking("character");
        return;
      }
      setOpponentId(id);
    }
  };

  const startMatch = () => {
    if (!opponentId) return;
    router.push({
      pathname: "/match",
      params: { characterId, opponentId, chapterId: "", mode: "exhibition" },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: topPad + 8, paddingBottom: insets.bottom + 160 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: colors.primary }]}>EXHIBITION</Text>
          <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
            {picking === "character" ? "PICK YOUR WRESTLER" : "PICK YOUR OPPONENT"}
          </Text>
        </View>

        <View style={[styles.matchupBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SlotCard
            label="YOU"
            wrestler={character}
            isActive={picking === "character"}
            onPress={() => setPicking("character")}
            colors={colors}
          />
          <View style={styles.vsBox}>
            <Text style={[styles.vsText, { color: colors.mutedForeground }]}>VS</Text>
          </View>
          <SlotCard
            label="OPPONENT"
            wrestler={opponent}
            isActive={picking === "opponent"}
            onPress={() => setPicking("opponent")}
            colors={colors}
          />
        </View>

        <View style={[styles.leaderboardHeader, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <View style={[styles.leakedStamp, { borderColor: "#ef4444" }]}>
            <Text style={[styles.leakedStampText, { color: "#ef4444" }]}>⚠ CONFIDENTIAL — DO NOT DISTRIBUTE</Text>
          </View>
          <Text style={[styles.leaderboardTitle, { color: colors.primary }]}>OFFICIAL RATINGS</Text>
          <Text style={[styles.leaderboardSubtitle, { color: colors.mutedForeground }]}>2006–2019</Text>
        </View>

        {ranked.map((w, i) => {
          const isCharacter = w.id === characterId;
          const isOpponent = w.id === opponentId;
          const isHighlighted = picking === "character" ? isCharacter : isOpponent;
          const isDimmed = picking === "character" ? false : isCharacter;
          const photo = getWrestlerPhoto(w.id);
          const r = w.ratings!;
          const rankColor = i === 0 ? "#D4AF37" : i === 1 ? "#aaaaaa" : i === 2 ? "#cd7f32" : colors.mutedForeground;

          let cardBg = colors.card;
          let cardBorder = colors.border;
          if (isHighlighted) {
            cardBg = colors.primary;
            cardBorder = colors.primary;
          } else if (isDimmed) {
            cardBg = colors.card;
            cardBorder = colors.border;
          }

          return (
            <Pressable
              key={`${i}-${w.id}`}
              style={({ pressed }) => [
                styles.rankCard,
                { backgroundColor: cardBg, borderColor: cardBorder, opacity: pressed ? 0.85 : isDimmed ? 0.45 : 1 },
              ]}
              onPress={() => handleCardTap(w.id)}
            >
              <Text style={[styles.rankNum, { color: isHighlighted ? colors.primaryForeground + "aa" : rankColor }]}>
                #{i + 1}
              </Text>

              {isCharacter && !isHighlighted && (
                <View style={[styles.youBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.youBadgeText, { color: colors.primaryForeground }]}>YOU</Text>
                </View>
              )}

              {photo ? (
                <View style={[styles.rankPhoto, { borderColor: isHighlighted ? colors.primaryForeground + "55" : "#44444488" }]}>
                  <Image source={photo} style={styles.rankPhotoImg} resizeMode="cover" />
                </View>
              ) : (
                <View style={[styles.rankPhoto, styles.rankPhotoPlaceholder, { borderColor: "#44444455" }]}>
                  <MaterialCommunityIcons name="account" size={22} color="#44444488" />
                </View>
              )}

              <View style={styles.rankInfo}>
                <Text style={[styles.rankName, { color: isHighlighted ? colors.primaryForeground : colors.foreground }]} numberOfLines={1}>
                  {w.name}
                </Text>
                <View style={styles.rankMiniStats}>
                  {RATING_ATTRS.map((attr) => (
                    <View key={attr.key} style={styles.rankMiniStat}>
                      <Text style={[styles.rankMiniLabel, { color: isHighlighted ? colors.primaryForeground + "99" : colors.mutedForeground }]}>
                        {attr.label}
                      </Text>
                      <Text style={[styles.rankMiniValue, { color: isHighlighted ? colors.primaryForeground : attr.color }]}>
                        {r[attr.key]}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <OvrBadge overall={r.overall} dim={isDimmed} />
            </Pressable>
          );
        })}
      </ScrollView>

      {opponent ? (
        <View style={[styles.bottomBar, { backgroundColor: colors.background, borderTopColor: colors.border, paddingBottom: insets.bottom + 90 }]}>
          <View style={styles.selectedInfo}>
            <Text style={[styles.selectedName, { color: colors.foreground }]}>
              {character.name} vs {opponent.name}
            </Text>
            <Text style={[styles.selectedMeta, { color: colors.mutedForeground }]}>
              OVR {character.ratings?.overall ?? "?"} vs OVR {opponent.ratings?.overall ?? "?"}
            </Text>
          </View>
          <Pressable style={[styles.fightBtn, { backgroundColor: colors.primary }]} onPress={startMatch}>
            <MaterialCommunityIcons name="sword-cross" size={20} color={colors.primaryForeground} />
            <Text style={[styles.fightBtnText, { color: colors.primaryForeground }]}>FIGHT</Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.bottomHint, { backgroundColor: colors.background, borderTopColor: colors.border, paddingBottom: insets.bottom + 90 }]}>
          <MaterialCommunityIcons name="gesture-tap" size={16} color={colors.mutedForeground} />
          <Text style={[styles.hintText, { color: colors.mutedForeground }]}>
            {picking === "character" ? "Tap a wrestler above to play as them" : "Tap a wrestler above to challenge them"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  pageHeader: { paddingHorizontal: 24, paddingBottom: 12 },
  pageTitle: { fontSize: 28, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  pageSubtitle: { fontSize: 11, fontFamily: "Inter_500Medium", letterSpacing: 2, marginTop: 4 },

  matchupBar: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "stretch",
    overflow: "hidden",
  },
  slotCard: {
    flex: 1,
    padding: 10,
    borderWidth: 0,
  },
  slotLabel: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 1.5, marginBottom: 6 },
  slotInner: { flexDirection: "row", alignItems: "center", gap: 6 },
  slotPhoto: { width: 32, height: 32, borderRadius: 4, overflow: "hidden", borderWidth: 1.5 },
  slotPhotoImg: { width: "100%", height: "100%" },
  slotPhotoEmpty: { alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" },
  slotName: { flex: 1, fontSize: 11, fontFamily: "Inter_600SemiBold" },
  slotOvr: { fontSize: 14, fontFamily: "Inter_700Bold" },
  slotEmpty: { flexDirection: "row", alignItems: "center", gap: 6, paddingTop: 4 },
  slotEmptyText: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },
  vsBox: { width: 36, alignItems: "center", justifyContent: "center" },
  vsText: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1 },

  leaderboardHeader: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  leakedStamp: { borderWidth: 1, borderRadius: 3, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 10 },
  leakedStampText: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },
  leaderboardTitle: { fontSize: 22, fontFamily: "Inter_700Bold", letterSpacing: 3 },
  leaderboardSubtitle: { fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 4 },

  rankCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rankNum: { fontSize: 14, fontFamily: "Inter_700Bold", width: 28, textAlign: "center" },
  youBadge: { borderRadius: 3, paddingHorizontal: 4, paddingVertical: 1 },
  youBadgeText: { fontSize: 7, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  rankPhoto: { width: 46, height: 46, borderRadius: 5, overflow: "hidden", borderWidth: 1.5 },
  rankPhotoImg: { width: "100%", height: "100%" },
  rankPhotoPlaceholder: { alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" },
  rankInfo: { flex: 1 },
  rankName: { fontSize: 13, fontFamily: "Inter_600SemiBold", marginBottom: 4 },
  rankMiniStats: { flexDirection: "row", gap: 6 },
  rankMiniStat: { alignItems: "center" },
  rankMiniLabel: { fontSize: 7, fontFamily: "Inter_700Bold", letterSpacing: 0.5 },
  rankMiniValue: { fontSize: 11, fontFamily: "Inter_700Bold" },

  ovrBadge: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  ovrNumber: { fontSize: 18, fontFamily: "Inter_700Bold" },
  ovrLabel: { fontSize: 7, fontFamily: "Inter_700Bold", letterSpacing: 1, marginTop: -2 },

  bottomBar: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    borderTopWidth: 1, padding: 16, flexDirection: "row", alignItems: "center", gap: 12,
  },
  selectedInfo: { flex: 1 },
  selectedName: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  selectedMeta: { fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 2 },
  fightBtn: { flexDirection: "row", alignItems: "center", borderRadius: 6, paddingVertical: 14, paddingHorizontal: 20, gap: 8 },
  fightBtnText: { fontSize: 14, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },

  bottomHint: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    borderTopWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, padding: 16,
  },
  hintText: { fontSize: 12, fontFamily: "Inter_400Regular" },
});
