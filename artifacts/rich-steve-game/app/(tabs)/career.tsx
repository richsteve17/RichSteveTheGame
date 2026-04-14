import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGame } from "@/context/GameContext";
import { useColors } from "@/hooks/useColors";
import { CAREER_CHAPTERS } from "@/constants/gameData";

export default function CareerScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { gameState, isChapterCompleted } = useGame();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const completedCount = CAREER_CHAPTERS.filter((c) => isChapterCompleted(c.id)).length;
  const totalCount = CAREER_CHAPTERS.length;
  const fp = gameState.freePlayStats;

  const tierColor = (tier: string) => {
    switch (tier) {
      case "main-event": return "#D4AF37";
      case "national": return "#22c55e";
      case "regional": return "#3b82f6";
      case "local": return "#f97316";
      default: return colors.mutedForeground;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={[styles.pageTitle, { color: colors.primary }]}>CAREER</Text>
        <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
          SELECT YOUR PATH
        </Text>
      </View>

      <View style={styles.cards}>
        <Pressable
          style={({ pressed }) => [
            styles.modeCard,
            styles.legacyCard,
            { borderColor: colors.primary, backgroundColor: colors.card, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.push("/legacy")}
        >
          <View style={[styles.modeBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.modeBadgeText, { color: colors.primaryForeground }]}>LEGACY MODE</Text>
          </View>
          <MaterialCommunityIcons name="book-open-variant" size={40} color={colors.primary} style={styles.modeIcon} />
          <Text style={[styles.modeTitle, { color: colors.foreground }]}>Follow the Exact Path</Text>
          <Text style={[styles.modeDesc, { color: colors.mutedForeground }]}>
            13 years. 7 eras. 29 chapters. Play it exactly as it happened — or get written out of the history books.
          </Text>
          <View style={styles.modeStats}>
            <Text style={[styles.modeStatLine, { color: colors.primary }]}>
              {completedCount} / {totalCount} chapters complete
            </Text>
          </View>
          <View style={styles.modeArrow}>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.modeCard,
            { borderColor: colors.border, backgroundColor: colors.card, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.push("/free-play")}
        >
          <View style={[styles.modeBadge, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.modeBadgeText, { color: colors.foreground }]}>FREE PLAY</Text>
          </View>
          <MaterialCommunityIcons name="fire" size={40} color={tierColor(fp.heatTier)} style={styles.modeIcon} />
          <Text style={[styles.modeTitle, { color: colors.foreground }]}>Your Career, Your Rules</Text>
          <Text style={[styles.modeDesc, { color: colors.mutedForeground }]}>
            Full roster. Any stipulation. Any outcome. Heat is the currency — book your own path to the main event.
          </Text>
          <View style={styles.modeStats}>
            <Text style={[styles.modeStatLine, { color: tierColor(fp.heatTier) }]}>
              {fp.heat} HEAT — {fp.heatTier.toUpperCase().replace("-", " ")}
            </Text>
            <Text style={[styles.modeStatSub, { color: colors.mutedForeground }]}>
              {fp.wins}W · {fp.losses}L · {fp.totalMatches} matches
            </Text>
          </View>
          <View style={styles.modeArrow}>
            <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
          </View>
        </Pressable>
      </View>

      <View style={[styles.quote, { borderColor: colors.border }]}>
        <Text style={[styles.quoteText, { color: colors.mutedForeground }]}>
          "Are people actually paying money to meet this guy?"
        </Text>
        <Text style={[styles.quoteAttrib, { color: colors.mutedForeground }]}>
          — Rich $teve, Big Mike Day, Lancaster, PA
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
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
  cards: {
    paddingHorizontal: 16,
    gap: 12,
  },
  modeCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  legacyCard: {
    borderWidth: 2,
  },
  modeBadge: {
    alignSelf: "flex-start",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 12,
  },
  modeBadgeText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  modeIcon: {
    marginBottom: 10,
  },
  modeTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
  },
  modeDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    marginBottom: 14,
  },
  modeStats: {
    gap: 2,
  },
  modeStatLine: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  modeStatSub: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  modeArrow: {
    position: "absolute",
    top: 20,
    right: 16,
  },
  quote: {
    margin: 16,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  quoteText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
    lineHeight: 20,
  },
  quoteAttrib: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    marginTop: 6,
  },
});
