import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGame } from "@/context/GameContext";
import { useColors } from "@/hooks/useColors";
import { CAREER_CHAPTERS } from "@/constants/gameData";

export default function CutsceneScreen() {
  const colors = useColors();
  const router = useRouter();
  const { completeChapter } = useGame();
  const params = useLocalSearchParams<{
    chapterId: string;
    showOutro?: string;
    playerWon?: string;
  }>();

  const chapter = CAREER_CHAPTERS.find((c) => c.id === params.chapterId);
  const isOutro = params.showOutro === "true";
  const playerWon = params.playerWon === "true";
  const isMatchless = chapter?.matchless === true;

  const slides = isOutro
    ? playerWon
      ? chapter?.outroCutscene?.win ?? []
      : chapter?.outroCutscene?.lose ?? []
    : chapter?.introCutscene ?? [];

  const [slideIdx, setSlideIdx] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const animateIn = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(16);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }),
    ]).start();
  };

  useEffect(() => {
    animateIn();
  }, [slideIdx]);

  if (!chapter || slides.length === 0) {
    router.back();
    return null;
  }

  const current = slides[slideIdx];
  const isLast = slideIdx === slides.length - 1;

  const handleNext = async () => {
    if (isLast) {
      if (isMatchless) {
        // Story-only chapter: mark complete and return to career
        await completeChapter(chapter.id, true);
        router.replace("/(tabs)/career");
      } else if (!isOutro) {
        // Intro done: go to the match
        router.replace({
          pathname: "/match",
          params: {
            opponentId: chapter.opponentId ?? "",
            chapterId: chapter.id,
            mode: "career",
          },
        });
      } else {
        // Outro done: back to career
        router.replace("/(tabs)/career");
      }
    } else {
      setSlideIdx((i) => i + 1);
    }
  };

  const isNarrator = current?.speaker === "NARRATOR";
  const isPromo = current?.isPromo;

  const lastButtonLabel = isMatchless
    ? "CHAPTER COMPLETE"
    : isOutro
    ? "BACK TO CAREER"
    : "ENTER THE RING";

  const lastButtonIcon = isMatchless
    ? "checkmark-circle"
    : isOutro
    ? "arrow-back"
    : "arrow-forward";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <View style={[styles.eraTag, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.eraTagText, { color: colors.primary }]}>
            {chapter.eraName.toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.progress, { color: colors.mutedForeground }]}>
          {slideIdx + 1} / {slides.length}
        </Text>
      </View>

      <View style={styles.stageInfo}>
        <Text style={[styles.chapterTitle, { color: colors.foreground }]}>{chapter.title}</Text>
        <Text style={[styles.chapterDate, { color: colors.mutedForeground }]}>
          {chapter.date} · {chapter.city}
        </Text>
        {isMatchless && (
          <View style={[styles.storyBadge, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.storyBadgeText, { color: colors.mutedForeground }]}>STORY CHAPTER</Text>
          </View>
        )}
      </View>

      <Animated.View
        style={[
          styles.slideContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {isPromo ? (
          <View style={[styles.promoCard, { backgroundColor: colors.card, borderColor: colors.primary }]}>
            <View style={styles.promoHeader}>
              <View style={[styles.promoDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.promoSpeaker, { color: colors.primary }]}>
                {current?.speaker.toUpperCase()}
              </Text>
              <Text style={[styles.promoLabel, { color: colors.mutedForeground }]}>PROMO</Text>
            </View>
            <Text style={[styles.promoText, { color: colors.foreground }]}>
              "{current?.text}"
            </Text>
          </View>
        ) : isNarrator ? (
          <View style={styles.narratorBlock}>
            <Text style={[styles.narratorText, { color: colors.mutedForeground }]}>
              {current?.text}
            </Text>
          </View>
        ) : (
          <View style={[styles.speakerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.speakerName, { color: colors.primary }]}>
              {current?.speaker.toUpperCase()}
            </Text>
            <Text style={[styles.speakerText, { color: colors.foreground }]}>
              "{current?.text}"
            </Text>
          </View>
        )}
      </Animated.View>

      <Pressable
        style={({ pressed }) => [
          styles.nextBtn,
          {
            backgroundColor: isLast ? colors.primary : colors.secondary,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        onPress={handleNext}
      >
        {isLast ? (
          <>
            <Text style={[styles.nextBtnText, { color: colors.primaryForeground }]}>
              {lastButtonLabel}
            </Text>
            <Ionicons name={lastButtonIcon} size={18} color={colors.primaryForeground} />
          </>
        ) : (
          <>
            <Text style={[styles.nextBtnText, { color: colors.foreground }]}>CONTINUE</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.foreground} />
          </>
        )}
      </Pressable>

      <View style={styles.progressDots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i === slideIdx ? colors.primary : colors.border,
                width: i === slideIdx ? 20 : 6,
              },
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    marginBottom: 16,
  },
  eraTag: {
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  eraTagText: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },
  progress: { fontSize: 12, fontFamily: "Inter_500Medium" },
  stageInfo: { marginBottom: 24, gap: 4 },
  chapterTitle: { fontSize: 24, fontFamily: "Inter_700Bold", letterSpacing: -0.5 },
  chapterDate: { fontSize: 12, fontFamily: "Inter_400Regular" },
  storyBadge: {
    alignSelf: "flex-start",
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  storyBadgeText: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },
  slideContainer: { flex: 1, justifyContent: "center" },
  narratorBlock: { paddingVertical: 20 },
  narratorText: {
    fontSize: 18,
    fontFamily: "Inter_400Regular",
    lineHeight: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
  promoCard: { borderRadius: 8, borderWidth: 2, padding: 20 },
  promoHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  promoDot: { width: 8, height: 8, borderRadius: 4 },
  promoSpeaker: { fontSize: 12, fontFamily: "Inter_700Bold", letterSpacing: 2, flex: 1 },
  promoLabel: { fontSize: 9, fontFamily: "Inter_500Medium", letterSpacing: 2 },
  promoText: { fontSize: 15, fontFamily: "Inter_400Regular", lineHeight: 25, fontStyle: "italic" },
  speakerCard: { borderRadius: 8, borderWidth: 1, padding: 20 },
  speakerName: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 2, marginBottom: 10 },
  speakerText: { fontSize: 16, fontFamily: "Inter_400Regular", lineHeight: 26 },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingVertical: 16,
    gap: 8,
    marginBottom: 16,
  },
  nextBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold", letterSpacing: 1.5 },
  progressDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingBottom: 16,
  },
  dot: { height: 6, borderRadius: 3 },
});
