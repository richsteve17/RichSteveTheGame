import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
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
import { CAREER_CHAPTERS, ERAS } from "@/constants/gameData";

export default function CareerScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isChapterUnlocked, isChapterCompleted, gameState } = useGame();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const getEraProgress = (eraId: number) => {
    const era = ERAS.find((e) => e.id === eraId);
    if (!era) return { done: 0, total: 0 };
    const done = era.chapterIds.filter((id) => isChapterCompleted(id)).length;
    return { done, total: era.chapterIds.length };
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPad + 8, paddingBottom: insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <Text style={[styles.pageTitle, { color: colors.primary }]}>CAREER MODE</Text>
        <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
          13 YEARS · 6 ERAS · 21 CHAPTERS
        </Text>
      </View>

      {gameState.tagTitlesWon && (
        <View style={[styles.titleBelt, { backgroundColor: colors.primary }]}>
          <MaterialCommunityIcons name="trophy" size={16} color={colors.primaryForeground} />
          <Text style={[styles.titleBeltText, { color: colors.primaryForeground }]}>
            RAMPAGE TAG TEAM CHAMPIONSHIPS — HELD SOLO
          </Text>
        </View>
      )}
      {gameState.heavyweightTitleWon && (
        <View style={[styles.titleBelt, { backgroundColor: colors.primary }]}>
          <MaterialCommunityIcons name="crown" size={16} color={colors.primaryForeground} />
          <Text style={[styles.titleBeltText, { color: colors.primaryForeground }]}>
            RAMPAGE HEAVYWEIGHT CHAMPIONSHIP
          </Text>
        </View>
      )}

      {ERAS.map((era) => {
        const progress = getEraProgress(era.id);
        const eraChapters = CAREER_CHAPTERS.filter((c) => c.era === era.id);
        const eraUnlocked = isChapterUnlocked(era.chapterIds[0]!);

        return (
          <View key={era.id} style={[styles.eraBlock, { borderColor: colors.border }]}>
            <View style={styles.eraHeader}>
              <View style={styles.eraHeaderLeft}>
                <Text style={[styles.eraName, { color: colors.primary }]}>
                  {era.name}
                </Text>
                <Text style={[styles.eraSubtitle, { color: colors.foreground }]}>
                  {era.subtitle}
                </Text>
                <Text style={[styles.eraYears, { color: colors.mutedForeground }]}>
                  {era.years}
                </Text>
              </View>
              <View style={[styles.eraProgress, { backgroundColor: colors.card }]}>
                <Text style={[styles.eraProgressNum, { color: eraUnlocked ? colors.primary : colors.mutedForeground }]}>
                  {progress.done}/{progress.total}
                </Text>
              </View>
            </View>

            <Text style={[styles.eraDesc, { color: colors.mutedForeground }]}>
              {era.description}
            </Text>

            <View style={styles.chapters}>
              {eraChapters.map((chapter, idx) => {
                const unlocked = isChapterUnlocked(chapter.id);
                const completed = isChapterCompleted(chapter.id);

                return (
                  <Pressable
                    key={chapter.id}
                    style={({ pressed }) => [
                      styles.chapter,
                      {
                        backgroundColor: completed
                          ? colors.card
                          : unlocked
                          ? colors.secondary
                          : colors.card,
                        borderColor: completed ? colors.primary : colors.border,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                    disabled={!unlocked}
                    onPress={() =>
                      router.push({
                        pathname: "/cutscene",
                        params: { chapterId: chapter.id },
                      })
                    }
                  >
                    <View style={styles.chapterLeft}>
                      {completed ? (
                        <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
                      ) : unlocked ? (
                        chapter.matchless ? (
                          <Ionicons name="book" size={20} color={colors.foreground} />
                        ) : (
                          <MaterialCommunityIcons name="sword-cross" size={22} color={colors.foreground} />
                        )
                      ) : (
                        <Ionicons name="lock-closed" size={18} color={colors.mutedForeground} />
                      )}
                    </View>
                    <View style={styles.chapterContent}>
                      <Text
                        style={[
                          styles.chapterTitle,
                          { color: unlocked ? colors.foreground : colors.mutedForeground },
                        ]}
                      >
                        {chapter.title}
                      </Text>
                      <Text style={[styles.chapterMeta, { color: colors.mutedForeground }]}>
                        {chapter.date} · {chapter.venue}
                      </Text>
                      <Text style={[styles.chapterStip, { color: colors.mutedForeground }]}>
                        {chapter.stipulation}
                      </Text>
                      {chapter.riotRumbleChapter && !gameState.riotRumbleContractUsed && (
                        <View style={[styles.contractTag, { backgroundColor: colors.primary }]}>
                          <Text style={[styles.contractTagText, { color: colors.primaryForeground }]}>
                            RIOT RUMBLE CONTRACT
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.chapterRight}>
                      {unlocked && (
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color={completed ? colors.primary : colors.mutedForeground}
                        />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}

      <View style={[styles.archiveNote, { borderColor: colors.border }]}>
        <Text style={[styles.archiveTitle, { color: colors.primary }]}>BOOKSTORE INCIDENT</Text>
        <Text style={[styles.archiveText, { color: colors.mutedForeground }]}>
          "Are people actually paying money to meet this guy? How many people have actually come to see this fat piece of crap today? Zero. That is hilarious, Mike."
        </Text>
        <Text style={[styles.archiveAttrib, { color: colors.mutedForeground }]}>
          — Rich $teve, Big Mike Day, Lancaster, PA
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageHeader: {
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
  titleBelt: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  titleBeltText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  eraBlock: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  eraHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  eraHeaderLeft: {
    flex: 1,
  },
  eraName: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  eraSubtitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginTop: 2,
  },
  eraYears: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  eraProgress: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  eraProgressNum: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  eraDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    marginBottom: 14,
  },
  chapters: {
    gap: 8,
  },
  chapter: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    padding: 12,
    gap: 10,
  },
  chapterLeft: {
    width: 28,
    alignItems: "center",
  },
  chapterContent: {
    flex: 1,
    gap: 2,
  },
  chapterTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  chapterMeta: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  chapterStip: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.5,
  },
  contractTag: {
    alignSelf: "flex-start",
    marginTop: 4,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  contractTagText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  chapterRight: {
    width: 20,
    alignItems: "center",
  },
  archiveNote: {
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  archiveTitle: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 3,
    marginBottom: 8,
  },
  archiveText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
    lineHeight: 20,
  },
  archiveAttrib: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    marginTop: 8,
  },
});
