import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CAREER_CHAPTERS } from "../constants/gameData";
import type { PromoChallenge, PromoOption } from "../constants/gameData";
import { useGame } from "../context/GameContext";

const COLORS = {
  bg: "#0a0a0a",
  card: "#111111",
  border: "#1a1a1a",
  primary: "#c8a94a",
  primaryDim: "#3d2f0d",
  heat: "#c8a94a",
  pop: "#4a9ac8",
  silence: "#555555",
  correct: "#2d4a1e",
  correctBorder: "#5a8a3a",
  wrong: "#4a1e1e",
  wrongBorder: "#8a3a3a",
  neutral: "#1a1a1a",
  neutralBorder: "#2a2a2a",
  text: "#e8e8e8",
  muted: "#666666",
  red: "#c84a4a",
};

type Phase = "intro" | "challenge" | "feedback" | "complete";

const reactionIcon = (reaction: PromoOption["crowdReaction"]): string => {
  if (reaction === "heat") return "🔥";
  if (reaction === "pop") return "📢";
  return "😶";
};

const reactionLabel = (reaction: PromoOption["crowdReaction"]): string => {
  if (reaction === "heat") return "CROWD HEAT";
  if (reaction === "pop") return "CROWD POP";
  return "SILENCE";
};

const reactionColor = (reaction: PromoOption["crowdReaction"]): string => {
  if (reaction === "heat") return COLORS.heat;
  if (reaction === "pop") return COLORS.pop;
  return COLORS.silence;
};

const heatRating = (score: number, total: number): string => {
  const pct = total > 0 ? score / total : 0;
  if (pct === 1) return "MASTERCLASS";
  if (pct >= 0.75) return "STRONG HEAT";
  if (pct >= 0.5) return "MIXED";
  if (pct >= 0.25) return "WEAK";
  return "BABYFACE";
};

const heatDescription = (score: number, total: number): string => {
  const pct = total > 0 ? score / total : 0;
  if (pct === 1)
    return "Perfect heel execution. Every line landed. The crowd hates you exactly the way they should.";
  if (pct >= 0.75)
    return "Solid promo work. You got your heat. A few moments could have been sharper.";
  if (pct >= 0.5)
    return "Inconsistent. Some babyface moments slipped through. The crowd wasn't sure how to read you.";
  if (pct >= 0.25)
    return "More pops than boos. You played to the crowd instead of against them.";
  return "You were over — as a babyface. That's not what Rich $teve does.";
};

export default function PromoScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const { completeChapter } = useGame();

  const chapter = CAREER_CHAPTERS.find((c) => c.id === chapterId);
  const challenges: PromoChallenge[] = chapter?.promoGame ?? [];

  const [phase, setPhase] = useState<Phase>("intro");
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentChallenge = challenges[challengeIdx] ?? null;

  const fadeTransition = (cb: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      cb();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleOptionSelect = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    const opt = currentChallenge!.options[idx];
    if (opt.isCorrect) setScore((s) => s + 1);
    setPhase("feedback");
  };

  const handleNext = () => {
    const nextIdx = challengeIdx + 1;
    if (nextIdx >= challenges.length) {
      fadeTransition(() => {
        setPhase("complete");
      });
    } else {
      fadeTransition(() => {
        setChallengeIdx(nextIdx);
        setSelectedIdx(null);
        setPhase("challenge");
      });
    }
  };

  const handleBegin = () => {
    fadeTransition(() => {
      setPhase("challenge");
    });
  };

  const handleComplete = async () => {
    if (isCompleting) return;
    setIsCompleting(true);
    await completeChapter(chapterId!, true);
    router.replace("/(tabs)/career");
  };

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Chapter not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/career")}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.muted} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerEra}>{chapter.eraName.toUpperCase()}</Text>
          <Text style={styles.headerTitle}>{chapter.title}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {phase === "intro" && (
          <IntroPhase chapter={chapter} onBegin={handleBegin} />
        )}

        {(phase === "challenge" || phase === "feedback") &&
          currentChallenge && (
            <ChallengePhase
              challenge={currentChallenge}
              challengeIdx={challengeIdx}
              totalChallenges={challenges.length}
              score={score}
              selectedIdx={selectedIdx}
              phase={phase}
              onSelectOption={handleOptionSelect}
              onNext={handleNext}
            />
          )}

        {phase === "complete" && (
          <CompletePhase
            score={score}
            total={challenges.length}
            chapterTitle={chapter.title}
            onComplete={handleComplete}
            isCompleting={isCompleting}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

function IntroPhase({
  chapter,
  onBegin,
}: {
  chapter: (typeof CAREER_CHAPTERS)[0];
  onBegin: () => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.introContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.promoMicContainer}>
        <Text style={styles.promoMicIcon}>🎤</Text>
        <Text style={styles.promoLabel}>PROMO CHALLENGE</Text>
      </View>

      <View style={styles.chapterInfoCard}>
        <Text style={styles.chapterDate}>{chapter.date}</Text>
        <Text style={styles.chapterVenue}>
          {chapter.venue} · {chapter.city}
        </Text>
        <View style={styles.dividerLine} />
        <Text style={styles.chapterStip}>{chapter.stipulation}</Text>
      </View>

      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>HOW THIS WORKS</Text>
        <Text style={styles.instructionsText}>
          Read the situation. Pick the response that a heel would make. Rich
          $teve is always heel — he never plays to the crowd, never shows
          weakness, never compliments his enemies.
        </Text>
        <Text style={styles.instructionsText}>
          🔥 Heat = correct. You're doing your job.{"\n"}
          📢 Pop = wrong. You worked babyface.{"\n"}
          😶 Silence = wrong. You left the moment on the table.
        </Text>
      </View>

      <TouchableOpacity style={styles.beginButton} onPress={onBegin}>
        <Text style={styles.beginButtonText}>CUT THE PROMO</Text>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={COLORS.bg}
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

function ChallengePhase({
  challenge,
  challengeIdx,
  totalChallenges,
  score,
  selectedIdx,
  phase,
  onSelectOption,
  onNext,
}: {
  challenge: PromoChallenge;
  challengeIdx: number;
  totalChallenges: number;
  score: number;
  selectedIdx: number | null;
  phase: "challenge" | "feedback";
  onSelectOption: (idx: number) => void;
  onNext: () => void;
}) {
  const selectedOption =
    selectedIdx !== null ? challenge.options[selectedIdx] : null;

  return (
    <ScrollView
      contentContainerStyle={styles.challengeContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>
          {challengeIdx + 1} / {totalChallenges}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((challengeIdx + 1) / totalChallenges) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.scoreText}>
          {score} 🔥
        </Text>
      </View>

      <View style={styles.situationCard}>
        <Text style={styles.situationLabel}>THE SITUATION</Text>
        <Text style={styles.situationText}>{challenge.situation}</Text>
      </View>

      <Text style={styles.optionsLabel}>YOUR RESPONSE:</Text>

      {challenge.options.map((opt, idx) => {
        let cardStyle = styles.optionCard;
        let borderColor = COLORS.neutralBorder;
        let bgColor = COLORS.neutral;

        if (selectedIdx !== null) {
          if (idx === selectedIdx) {
            bgColor = opt.isCorrect ? COLORS.correct : COLORS.wrong;
            borderColor = opt.isCorrect
              ? COLORS.correctBorder
              : COLORS.wrongBorder;
          } else if (opt.isCorrect) {
            bgColor = COLORS.correct;
            borderColor = COLORS.correctBorder;
          }
        }

        return (
          <TouchableOpacity
            key={idx}
            style={[cardStyle, { backgroundColor: bgColor, borderColor }]}
            onPress={() => onSelectOption(idx)}
            disabled={selectedIdx !== null}
            activeOpacity={0.75}
          >
            <View style={styles.optionRow}>
              <Text style={styles.optionLetter}>
                {["A", "B", "C", "D"][idx]}
              </Text>
              <Text style={styles.optionText}>{opt.text}</Text>
              {selectedIdx !== null && idx === selectedIdx && (
                <Ionicons
                  name={opt.isCorrect ? "checkmark-circle" : "close-circle"}
                  size={20}
                  color={opt.isCorrect ? COLORS.correctBorder : COLORS.wrongBorder}
                  style={{ marginLeft: 8, flexShrink: 0 }}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}

      {phase === "feedback" && selectedOption && (
        <View style={styles.feedbackCard}>
          <View style={styles.feedbackReactionRow}>
            <Text style={styles.feedbackReactionIcon}>
              {reactionIcon(selectedOption.crowdReaction)}
            </Text>
            <Text
              style={[
                styles.feedbackReactionLabel,
                { color: reactionColor(selectedOption.crowdReaction) },
              ]}
            >
              {reactionLabel(selectedOption.crowdReaction)}
            </Text>
            {selectedOption.isCorrect && (
              <View style={styles.correctBadge}>
                <Text style={styles.correctBadgeText}>+1 HEAT</Text>
              </View>
            )}
          </View>
          <Text style={styles.feedbackText}>{selectedOption.feedback}</Text>

          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>
              {challengeIdx + 1 < totalChallenges
                ? "NEXT SITUATION"
                : "FINISH PROMO"}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={COLORS.bg}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

function CompletePhase({
  score,
  total,
  chapterTitle,
  onComplete,
  isCompleting,
}: {
  score: number;
  total: number;
  chapterTitle: string;
  onComplete: () => void;
  isCompleting: boolean;
}) {
  const rating = heatRating(score, total);
  const description = heatDescription(score, total);
  const pct = total > 0 ? score / total : 0;
  const isPerfect = pct === 1;

  return (
    <ScrollView
      contentContainerStyle={styles.completeContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.completeIconWrap}>
        <Text style={styles.completeIcon}>{isPerfect ? "🔥" : "🎤"}</Text>
      </View>

      <Text style={styles.completeTitle}>PROMO COMPLETE</Text>
      <Text style={styles.completeChapterName}>{chapterTitle}</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreCardLabel}>HEAT RATING</Text>
        <Text
          style={[
            styles.scoreCardRating,
            { color: pct >= 0.75 ? COLORS.heat : pct >= 0.5 ? "#aaa" : COLORS.red },
          ]}
        >
          {rating}
        </Text>
        <Text style={styles.scoreCardFraction}>
          {score} / {total} correct responses
        </Text>
        <View style={styles.scoreBarBg}>
          <View
            style={[
              styles.scoreBarFill,
              {
                width: `${(score / Math.max(total, 1)) * 100}%`,
                backgroundColor:
                  pct >= 0.75
                    ? COLORS.heat
                    : pct >= 0.5
                    ? "#888"
                    : COLORS.red,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      <TouchableOpacity
        style={[styles.completeButton, isCompleting && { opacity: 0.6 }]}
        onPress={onComplete}
        disabled={isCompleting}
      >
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={COLORS.bg}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.completeButtonText}>
          {isCompleting ? "SAVING..." : "CHAPTER COMPLETE"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flex: 1,
  },
  errorText: {
    color: COLORS.text,
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    fontFamily: "SpaceMono",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 6,
    width: 36,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerEra: {
    fontSize: 9,
    color: COLORS.muted,
    fontFamily: "SpaceMono",
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    marginTop: 1,
  },
  headerRight: {
    width: 36,
  },

  introContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  promoMicContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  promoMicIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  promoLabel: {
    fontSize: 11,
    color: COLORS.primary,
    fontFamily: "SpaceMono",
    letterSpacing: 3,
  },
  chapterInfoCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  chapterDate: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: "SpaceMono",
    letterSpacing: 1,
    marginBottom: 4,
  },
  chapterVenue: {
    fontSize: 13,
    color: COLORS.text,
    fontFamily: "SpaceMono",
    marginBottom: 12,
  },
  dividerLine: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },
  chapterStip: {
    fontSize: 11,
    color: COLORS.muted,
    fontFamily: "SpaceMono",
    lineHeight: 16,
  },
  instructionsCard: {
    backgroundColor: COLORS.primaryDim,
    borderWidth: 1,
    borderColor: "#5d3e10",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 10,
    color: COLORS.primary,
    fontFamily: "SpaceMono",
    letterSpacing: 2,
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 12,
    color: COLORS.text,
    fontFamily: "SpaceMono",
    lineHeight: 18,
    marginBottom: 8,
    opacity: 0.9,
  },
  beginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  beginButtonText: {
    color: COLORS.bg,
    fontSize: 14,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    letterSpacing: 2,
  },

  challengeContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  progressText: {
    fontSize: 11,
    color: COLORS.muted,
    fontFamily: "SpaceMono",
    width: 36,
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  scoreText: {
    fontSize: 11,
    color: COLORS.primary,
    fontFamily: "SpaceMono",
    width: 36,
    textAlign: "right",
  },
  situationCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  situationLabel: {
    fontSize: 9,
    color: COLORS.muted,
    fontFamily: "SpaceMono",
    letterSpacing: 2,
    marginBottom: 10,
  },
  situationText: {
    fontSize: 13,
    color: COLORS.text,
    fontFamily: "SpaceMono",
    lineHeight: 20,
  },
  optionsLabel: {
    fontSize: 10,
    color: COLORS.muted,
    fontFamily: "SpaceMono",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  optionCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  optionLetter: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    marginRight: 10,
    marginTop: 1,
    width: 16,
    flexShrink: 0,
  },
  optionText: {
    fontSize: 12,
    color: COLORS.text,
    fontFamily: "SpaceMono",
    lineHeight: 18,
    flex: 1,
  },
  feedbackCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  feedbackReactionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  feedbackReactionIcon: {
    fontSize: 20,
  },
  feedbackReactionLabel: {
    fontSize: 12,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    letterSpacing: 1,
    flex: 1,
  },
  correctBadge: {
    backgroundColor: COLORS.correct,
    borderWidth: 1,
    borderColor: COLORS.correctBorder,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  correctBadgeText: {
    fontSize: 9,
    color: COLORS.correctBorder,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  feedbackText: {
    fontSize: 12,
    color: COLORS.text,
    fontFamily: "SpaceMono",
    lineHeight: 18,
    marginBottom: 16,
    opacity: 0.85,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingVertical: 11,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: COLORS.bg,
    fontSize: 12,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  completeContainer: {
    padding: 24,
    paddingBottom: 48,
    alignItems: "center",
  },
  completeIconWrap: {
    marginTop: 20,
    marginBottom: 16,
  },
  completeIcon: {
    fontSize: 52,
  },
  completeTitle: {
    fontSize: 20,
    color: COLORS.primary,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    letterSpacing: 3,
    marginBottom: 6,
  },
  completeChapterName: {
    fontSize: 13,
    color: COLORS.muted,
    fontFamily: "SpaceMono",
    marginBottom: 28,
    letterSpacing: 1,
  },
  scoreCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  scoreCardLabel: {
    fontSize: 10,
    color: COLORS.muted,
    fontFamily: "SpaceMono",
    letterSpacing: 2,
    marginBottom: 10,
  },
  scoreCardRating: {
    fontSize: 24,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 6,
  },
  scoreCardFraction: {
    fontSize: 12,
    color: COLORS.muted,
    fontFamily: "SpaceMono",
    marginBottom: 14,
  },
  scoreBarBg: {
    width: "100%",
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  scoreBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  descriptionCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    width: "100%",
    marginBottom: 28,
  },
  descriptionText: {
    fontSize: 12,
    color: COLORS.text,
    fontFamily: "SpaceMono",
    lineHeight: 20,
    textAlign: "center",
    opacity: 0.85,
  },
  completeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  completeButtonText: {
    color: COLORS.bg,
    fontSize: 14,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
