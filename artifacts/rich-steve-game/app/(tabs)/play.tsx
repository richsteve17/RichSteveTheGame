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

function OvrBadge({ overall, selected }: { overall: number; selected: boolean }) {
  const color = overall >= 90 ? "#D4AF37" : overall >= 80 ? "#22c55e" : overall >= 70 ? "#3b82f6" : "#888888";
  return (
    <View style={[styles.ovrBadge, { borderColor: selected ? "#ffffff" : color }]}>
      <Text style={[styles.ovrNumber, { color: selected ? "#ffffff" : color }]}>{overall}</Text>
      <Text style={[styles.ovrLabel, { color: selected ? "#ffffffbb" : color }]}>OVR</Text>
    </View>
  );
}

export default function PlayScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const ranked = [...WRESTLERS]
    .filter((w) => w.id !== "rich-steve" && w.role !== "Manager" && w.ratings)
    .sort((a, b) => b.ratings!.overall - a.ratings!.overall);

  const selected = ranked.find((w) => w.id === selectedId);

  const startMatch = () => {
    if (!selectedId) return;
    router.push({
      pathname: "/match",
      params: { opponentId: selectedId, chapterId: "", mode: "exhibition" },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          paddingTop: topPad + 8,
          paddingBottom: insets.bottom + 130,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: colors.primary }]}>EXHIBITION</Text>
          <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
            PICK YOUR OPPONENT
          </Text>
        </View>

        <View style={[styles.leaderboardHeader, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <View style={[styles.leakedStamp, { borderColor: "#ef4444" }]}>
            <Text style={[styles.leakedStampText, { color: "#ef4444" }]}>⚠ CONFIDENTIAL — DO NOT DISTRIBUTE</Text>
          </View>
          <Text style={[styles.leaderboardTitle, { color: colors.primary }]}>OFFICIAL RATINGS</Text>
          <Text style={[styles.leaderboardSubtitle, { color: colors.mutedForeground }]}>
            Rampage Pro Wrestling · 2006–2019 · All promotions
          </Text>
        </View>

        {ranked.map((w, i) => {
          const isSelected = selectedId === w.id;
          const photo = getWrestlerPhoto(w.id);
          const roleColor = isSelected ? colors.primaryForeground : (
            w.role === "Main Event" ? "#D4AF37" :
            w.role === "Legend" ? "#60a5fa" :
            w.role === "Women's Division" ? "#c084fc" : "#888888"
          );
          const r = w.ratings!;
          const rankColor = i === 0 ? "#D4AF37" : i === 1 ? "#aaaaaa" : i === 2 ? "#cd7f32" : colors.mutedForeground;

          return (
            <Pressable
              key={`${i}-${w.id}`}
              style={({ pressed }) => [
                styles.rankCard,
                {
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  borderColor: isSelected ? colors.primary : colors.border,
                  opacity: pressed ? 0.88 : 1,
                },
              ]}
              onPress={() => setSelectedId(isSelected ? null : w.id)}
            >
              <Text style={[styles.rankNum, { color: isSelected ? colors.primaryForeground + "aa" : rankColor }]}>
                #{i + 1}
              </Text>

              {photo ? (
                <View style={[styles.rankPhoto, { borderColor: isSelected ? colors.primaryForeground + "55" : roleColor + "88" }]}>
                  <Image source={photo} style={styles.rankPhotoImg} resizeMode="cover" />
                </View>
              ) : (
                <View style={[styles.rankPhoto, styles.rankPhotoPlaceholder, { borderColor: isSelected ? colors.primaryForeground + "55" : "#44444455" }]}>
                  <MaterialCommunityIcons name="account" size={22} color={isSelected ? colors.primaryForeground + "66" : "#44444488"} />
                </View>
              )}

              <View style={styles.rankInfo}>
                <Text style={[styles.rankName, { color: isSelected ? colors.primaryForeground : colors.foreground }]} numberOfLines={1}>
                  {w.name}
                </Text>
                <View style={styles.rankMiniStats}>
                  {RATING_ATTRS.map((attr) => (
                    <View key={attr.key} style={styles.rankMiniStat}>
                      <Text style={[styles.rankMiniLabel, { color: isSelected ? colors.primaryForeground + "99" : colors.mutedForeground }]}>
                        {attr.label}
                      </Text>
                      <Text style={[styles.rankMiniValue, { color: isSelected ? colors.primaryForeground : attr.color }]}>
                        {r[attr.key]}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <OvrBadge overall={r.overall} selected={isSelected} />
            </Pressable>
          );
        })}
      </ScrollView>

      {selected ? (
        <View
          style={[
            styles.bottomBar,
            { backgroundColor: colors.background, borderTopColor: colors.border, paddingBottom: insets.bottom + 90 },
          ]}
        >
          <View style={styles.selectedInfo}>
            <Text style={[styles.selectedName, { color: colors.foreground }]}>{selected.name}</Text>
            <Text style={[styles.selectedMeta, { color: colors.mutedForeground }]} numberOfLines={1}>
              {selected.role} · OVR {selected.ratings!.overall}
            </Text>
          </View>
          <Pressable style={[styles.fightBtn, { backgroundColor: colors.primary }]} onPress={startMatch}>
            <MaterialCommunityIcons name="sword-cross" size={20} color={colors.primaryForeground} />
            <Text style={[styles.fightBtnText, { color: colors.primaryForeground }]}>FIGHT</Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={[
            styles.bottomHint,
            { backgroundColor: colors.background, borderTopColor: colors.border, paddingBottom: insets.bottom + 90 },
          ]}
        >
          <MaterialCommunityIcons name="gesture-tap" size={16} color={colors.mutedForeground} />
          <Text style={[styles.hintText, { color: colors.mutedForeground }]}>
            Tap a wrestler to challenge them
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  pageHeader: { paddingHorizontal: 24, paddingBottom: 16 },
  pageTitle: { fontSize: 28, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  pageSubtitle: { fontSize: 11, fontFamily: "Inter_500Medium", letterSpacing: 2, marginTop: 4 },

  leaderboardHeader: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  leakedStamp: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
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
    gap: 10,
  },
  rankNum: { fontSize: 14, fontFamily: "Inter_700Bold", width: 28, textAlign: "center" },
  rankPhoto: {
    width: 46,
    height: 46,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1.5,
  },
  rankPhotoImg: { width: "100%", height: "100%" },
  rankPhotoPlaceholder: { alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" },
  rankInfo: { flex: 1 },
  rankName: { fontSize: 13, fontFamily: "Inter_600SemiBold", marginBottom: 4 },
  rankMiniStats: { flexDirection: "row", gap: 6 },
  rankMiniStat: { alignItems: "center" },
  rankMiniLabel: { fontSize: 7, fontFamily: "Inter_700Bold", letterSpacing: 0.5 },
  rankMiniValue: { fontSize: 11, fontFamily: "Inter_700Bold" },

  ovrBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  ovrNumber: { fontSize: 18, fontFamily: "Inter_700Bold" },
  ovrLabel: { fontSize: 7, fontFamily: "Inter_700Bold", letterSpacing: 1, marginTop: -2 },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selectedInfo: { flex: 1 },
  selectedName: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  selectedMeta: { fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 2 },
  fightBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  fightBtnText: { fontSize: 14, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },

  bottomHint: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  hintText: { fontSize: 12, fontFamily: "Inter_400Regular" },
});
