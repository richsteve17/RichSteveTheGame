import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { WRESTLERS } from "@/constants/gameData";

const AVAILABLE_OPPONENTS = WRESTLERS.filter(
  (w) => w.id !== "rich-steve" && w.role !== "Manager"
);

const STYLE_LABELS: Record<string, string> = {
  Technical: "TECHNICAL",
  Power: "POWER",
  Brawler: "BRAWLER",
  "High-Flyer": "HIGH-FLYER",
  Cerebral: "CEREBRAL",
};

export default function PlayScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const selected = AVAILABLE_OPPONENTS.find((w) => w.id === selectedId);

  const startMatch = () => {
    if (!selectedId) return;
    router.push({
      pathname: "/match",
      params: {
        opponentId: selectedId,
        chapterId: "",
        mode: "exhibition",
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Text style={[styles.pageTitle, { color: colors.primary }]}>EXHIBITION</Text>
        <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
          PICK YOUR OPPONENT
        </Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 120, gap: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {AVAILABLE_OPPONENTS.map((w) => {
          const isSelected = selectedId === w.id;
          return (
            <Pressable
              key={w.id}
              style={({ pressed }) => [
                styles.card,
                {
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  borderColor: isSelected ? colors.primary : colors.border,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
              onPress={() => setSelectedId(isSelected ? null : w.id)}
            >
              <View style={styles.cardLeft}>
                <View
                  style={[
                    styles.staminaDot,
                    {
                      backgroundColor: isSelected
                        ? colors.primaryForeground
                        : colors.primary,
                    },
                  ]}
                />
                <View>
                  <Text
                    style={[
                      styles.cardName,
                      { color: isSelected ? colors.primaryForeground : colors.foreground },
                    ]}
                  >
                    {w.name}
                  </Text>
                  <Text
                    style={[
                      styles.cardMeta,
                      { color: isSelected ? colors.primaryForeground + "bb" : colors.mutedForeground },
                    ]}
                  >
                    {STYLE_LABELS[w.style] ?? w.style} · {w.faction ?? "Independent"}
                  </Text>
                </View>
              </View>
              <View style={styles.cardRight}>
                <Text
                  style={[
                    styles.cardStamina,
                    { color: isSelected ? colors.primaryForeground : colors.mutedForeground },
                  ]}
                >
                  {w.stamina}
                </Text>
                <Text
                  style={[
                    styles.cardStaminaLabel,
                    { color: isSelected ? colors.primaryForeground + "99" : colors.mutedForeground },
                  ]}
                >
                  STA
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      {selected && (
        <View
          style={[
            styles.bottomBar,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              paddingBottom: insets.bottom + 90,
            },
          ]}
        >
          <View style={styles.selectedInfo}>
            <Text style={[styles.selectedName, { color: colors.foreground }]}>
              {selected.name}
            </Text>
            <Text style={[styles.selectedBio, { color: colors.mutedForeground }]} numberOfLines={2}>
              {selected.bio}
            </Text>
          </View>
          <Pressable
            style={[styles.goBtn, { backgroundColor: colors.primary }]}
            onPress={startMatch}
          >
            <MaterialCommunityIcons name="sword-cross" size={20} color={colors.primaryForeground} />
            <Text style={[styles.goBtnText, { color: colors.primaryForeground }]}>FIGHT</Text>
          </Pressable>
        </View>
      )}

      {!selected && (
        <View
          style={[
            styles.bottomHint,
            {
              paddingBottom: insets.bottom + 90,
              borderTopColor: colors.border,
              backgroundColor: colors.background,
            },
          ]}
        >
          <Ionicons name="hand-left-outline" size={16} color={colors.mutedForeground} />
          <Text style={[styles.hintText, { color: colors.mutedForeground }]}>
            Select an opponent above
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  pageSubtitle: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    letterSpacing: 2,
    marginTop: 4,
  },
  list: { flex: 1 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
  },
  cardLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  staminaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  cardName: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  cardMeta: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  cardRight: {
    alignItems: "center",
  },
  cardStamina: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  cardStaminaLabel: {
    fontSize: 9,
    fontFamily: "Inter_500Medium",
    letterSpacing: 1,
  },
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
  selectedInfo: {
    flex: 1,
  },
  selectedName: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  selectedBio: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
    marginTop: 2,
  },
  goBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  goBtnText: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
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
  hintText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
