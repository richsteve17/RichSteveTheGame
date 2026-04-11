import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGame } from "@/context/GameContext";
import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { gameState } = useGame();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const completed = gameState.completedChapters.length;
  const total = 11;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPad, paddingBottom: insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <View style={styles.header}>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            PHILADELPHIA, PA · 2006–2019
          </Text>
          <Text style={[styles.title, { color: colors.primary }]}>RICH $TEVE</Text>
          <Text style={[styles.titleSub, { color: colors.foreground }]}>THE GAME</Text>
          <View style={[styles.divider, { backgroundColor: colors.primary }]} />
          <Text style={[styles.tagline, { color: colors.mutedForeground }]}>
            "Why would I wear gear if I'm not wrestling? That's what idiots and poor people do."
          </Text>
        </View>

        {(gameState.tagTitlesWon || gameState.heavyweightTitleWon) && (
          <View style={[styles.championBanner, { backgroundColor: colors.primary }]}>
            <MaterialCommunityIcons name="trophy" size={18} color={colors.primaryForeground} />
            <Text style={[styles.championText, { color: colors.primaryForeground }]}>
              {gameState.heavyweightTitleWon ? "RAMPAGE HEAVYWEIGHT CHAMPION" : "TAG TEAM CHAMPION (SOLO)"}
            </Text>
          </View>
        )}

        <View style={styles.buttons}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
              ]}
              onPress={() => router.push("/(tabs)/career")}
            >
              <MaterialCommunityIcons name="book-open-variant" size={22} color={colors.primaryForeground} />
              <Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>
                CAREER MODE
              </Text>
              <View style={[styles.progressBadge, { backgroundColor: colors.primaryForeground }]}>
                <Text style={[styles.progressText, { color: colors.primary }]}>
                  {completed}/{total}
                </Text>
              </View>
            </Pressable>
          </Animated.View>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              { borderColor: colors.primary, opacity: pressed ? 0.75 : 1 },
            ]}
            onPress={() =>
              router.push({
                pathname: "/match",
                params: {
                  opponentId: "siccend",
                  chapterId: "",
                  mode: "exhibition",
                },
              })
            }
          >
            <MaterialCommunityIcons name="sword-cross" size={20} color={colors.primary} />
            <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>
              EXHIBITION MATCH
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              { borderColor: colors.border, opacity: pressed ? 0.75 : 1 },
            ]}
            onPress={() => router.push("/(tabs)/roster")}
          >
            <Ionicons name="people" size={20} color={colors.mutedForeground} />
            <Text style={[styles.secondaryButtonText, { color: colors.mutedForeground }]}>
              FULL ROSTER
            </Text>
          </Pressable>
        </View>

        <View style={[styles.statsRow, { borderColor: colors.border }]}>
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{gameState.totalMatchesPlayed}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>MATCHES</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{gameState.totalMatchesWon}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>WINS</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{completed}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>CHAPTERS</Text>
          </View>
        </View>

        <View style={[styles.codeBlock, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.codeTitle, { color: colors.primary }]}>THE UNDENIABLE CODE</Text>
          <Text style={[styles.codeText, { color: colors.foreground }]}>
            "Know your role on the show. Study everything. Always stay humble. If you keep to those things, you will be Undeniable and Irreplaceable."
          </Text>
          <Text style={[styles.codeAttrib, { color: colors.mutedForeground }]}>— Steve Coleman</Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 11,
    letterSpacing: 3,
    fontFamily: "Inter_500Medium",
    marginBottom: 8,
  },
  title: {
    fontSize: 52,
    fontFamily: "Inter_700Bold",
    letterSpacing: -2,
    lineHeight: 56,
  },
  titleSub: {
    fontSize: 22,
    fontFamily: "Inter_400Regular",
    letterSpacing: 8,
    marginTop: 2,
    marginBottom: 16,
  },
  divider: {
    width: 40,
    height: 2,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  championBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  championText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  buttons: {
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 10,
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
    flex: 1,
    textAlign: "center",
  },
  progressBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  progressText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    gap: 10,
  },
  secondaryButtonText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1.5,
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 24,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 16,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statNum: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
  },
  statLabel: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    letterSpacing: 2,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    marginVertical: 4,
  },
  codeBlock: {
    margin: 24,
    borderRadius: 6,
    borderWidth: 1,
    padding: 20,
  },
  codeTitle: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 3,
    marginBottom: 10,
  },
  codeText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    fontStyle: "italic",
  },
  codeAttrib: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    marginTop: 10,
  },
});
