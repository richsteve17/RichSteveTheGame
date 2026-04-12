import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGame } from "@/context/GameContext";
import { useColors } from "@/hooks/useColors";
import { CAREER_CHAPTERS, WRESTLERS } from "@/constants/gameData";

type Phase = "pre-match" | "fighting" | "post-match";
type LogEntry = { text: string; type: "player" | "opponent" | "special" | "system" };

const PLAYER_BASE_STAMINA = 100;

const OPPONENT_MOVES = [
  { name: "Brawling Combo", damage: 10 },
  { name: "Running Shoulderblock", damage: 12 },
  { name: "Scoop Slam", damage: 8 },
  { name: "Headbutt", damage: 9 },
  { name: "Elbow Drop", damage: 8 },
];

export default function MatchScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams<{ opponentId: string; chapterId: string; mode: string }>();
  const { completeChapter } = useGame();

  const opponent = WRESTLERS.find((w) => w.id === params.opponentId) ?? WRESTLERS[0]!;
  const chapter = CAREER_CHAPTERS.find((c) => c.id === params.chapterId);
  const isExhibition = params.mode === "exhibition";

  const [phase, setPhase] = useState<Phase>("pre-match");
  const [playerStamina, setPlayerStamina] = useState(PLAYER_BASE_STAMINA);
  const [opponentStamina, setOpponentStamina] = useState(opponent.stamina);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [marketCrashCooldown, setMarketCrashCooldown] = useState(0);
  const [distractUsed, setDistractUsed] = useState(false);
  const [refManipUsed, setRefManipUsed] = useState(false);
  const [guerreroUsed, setGuerreroUsed] = useState(false);
  const [refManipActive, setRefManipActive] = useState(false);
  const [winner, setWinner] = useState<"player" | "opponent" | null>(null);
  const [winReason, setWinReason] = useState("");
  const [turn, setTurn] = useState(1);
  const [isOpponentTurn, setIsOpponentTurn] = useState(false);
  const [signatureUsed, setSignatureUsed] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const flash = () => {
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const addLog = useCallback((text: string, type: LogEntry["type"]) => {
    setLog((prev) => [...prev, { text, type }]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  const endMatch = useCallback(
    async (w: "player" | "opponent", reason: string) => {
      setWinner(w);
      setWinReason(reason);
      setPhase("post-match");
      const won = w === "player";
      if (!isExhibition && params.chapterId) {
        await completeChapter(params.chapterId, won, {
          isTagTitle: params.chapterId === "ch5-lethal-lottery",
          isHeavyweight: params.chapterId === "ch6-mac-mayhem",
          isRiotRumble: params.chapterId === "ch5-lethal-lottery",
        });
      }
      Haptics.notificationAsync(
        won ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error
      );
    },
    [isExhibition, params.chapterId, completeChapter]
  );

  const opponentAttack = useCallback(
    (pStam: number) => {
      if (refManipActive) {
        addLog(`${opponent.name}'s move is NEGATED by Referee Manipulation!`, "special");
        setRefManipActive(false);
        setIsOpponentTurn(false);
        setTurn((t) => t + 1);
        setMarketCrashCooldown((c) => Math.max(0, c - 1));
        return;
      }

      const hasSig = !signatureUsed && Math.random() < 0.2;
      let dmg: number;
      let moveName: string;

      if (hasSig) {
        moveName = opponent.signatureMove ?? "Signature Move";
        dmg = 20 + Math.floor(Math.random() * 8);
        setSignatureUsed(true);
        addLog(`${opponent.name} hits the ${moveName} for ${dmg} damage!`, "opponent");
        flash();
        shake();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        const move = OPPONENT_MOVES[Math.floor(Math.random() * OPPONENT_MOVES.length)]!;
        moveName = move.name;
        dmg = move.damage + Math.floor(Math.random() * 5) - 2;
        dmg = Math.max(3, dmg);
        addLog(`${opponent.name} hits ${moveName} for ${dmg} damage.`, "opponent");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }

      const newStam = Math.max(0, pStam - dmg);
      setPlayerStamina(newStam);

      if (newStam === 0) {
        endMatch("opponent", `${opponent.name} wins by pinfall.`);
      } else {
        setIsOpponentTurn(false);
        setTurn((t) => t + 1);
        setMarketCrashCooldown((c) => Math.max(0, c - 1));
      }
    },
    [opponent, refManipActive, signatureUsed, addLog, endMatch]
  );

  useEffect(() => {
    if (isOpponentTurn && phase === "fighting") {
      const timer = setTimeout(() => opponentAttack(playerStamina), 900);
      return () => clearTimeout(timer);
    }
  }, [isOpponentTurn, phase, playerStamina, opponentAttack]);

  const playerMove = (
    moveName: string,
    damage: number,
    type: "normal" | "signature" | "finisher" | "distract" | "refmanip" | "guerrero"
  ) => {
    if (isOpponentTurn || phase !== "fighting") return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (type === "distract") {
      setDistractUsed(true);
      addLog("Crowd Distraction! The referee is occupied — opponent loses their next turn.", "special");
      setRefManipActive(true);
      setIsOpponentTurn(true);
      setMarketCrashCooldown((c) => Math.max(0, c - 1));
      return;
    }

    if (type === "refmanip") {
      setRefManipUsed(true);
      setRefManipActive(true);
      addLog("Referee Manipulation activated — opponent's next move is negated.", "special");
      setIsOpponentTurn(true);
      setMarketCrashCooldown((c) => Math.max(0, c - 1));
      return;
    }

    if (type === "guerrero") {
      setGuerreroUsed(true);
      addLog("$teve tosses the Riot Rumble Lockbox to the opponent and drops!", "special");
      addLog("The referee sees the weapon — DISQUALIFICATION! $teve wins by DQ!", "special");
      flash();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      endMatch("player", "Win by Disqualification (The Guerrero Special)");
      return;
    }

    if (type === "finisher") {
      addLog("THE MONEY DROP! Big Splash connects! ONE — TWO — THREE!", "special");
      flash();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      endMatch("player", "Win by Pinfall — The Money Drop (Big Splash)");
      return;
    }

    const actualDmg = damage + Math.floor(Math.random() * 5) - 2;
    const finalDmg = Math.max(3, actualDmg);
    const newOppStam = Math.max(0, opponentStamina - finalDmg);
    setOpponentStamina(newOppStam);

    if (type === "signature") {
      addLog(`MARKET CRASH connects! ${finalDmg} damage — ${opponent.name} is rocked!`, "special");
      setMarketCrashCooldown(3);
      flash();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else {
      addLog(`$teve hits ${moveName} for ${finalDmg} damage.`, "player");
    }

    if (newOppStam === 0) {
      addLog(`${opponent.name} is out cold! $teve covers!`, "player");
      endMatch("player", "Win by Pinfall");
    } else {
      setIsOpponentTurn(true);
      setMarketCrashCooldown((c) => Math.max(0, c - 1));
    }
  };

  const canFinisher = opponentStamina <= Math.floor(opponent.stamina * 0.25);
  const canMarketCrash = marketCrashCooldown === 0;

  const staminaPct = (val: number, max: number) => Math.max(0, Math.min(1, val / max));

  const getStaminaColor = (pct: number) => {
    if (pct > 0.5) return "#22c55e";
    if (pct > 0.25) return "#f59e0b";
    return "#ef4444";
  };

  if (phase === "pre-match") {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.preMatch}>
          <Text style={[styles.preVS, { color: colors.mutedForeground }]}>VS</Text>
          <Text style={[styles.prePlayer, { color: colors.primary }]}>RICH $TEVE</Text>
          <Text style={[styles.preVS2, { color: colors.mutedForeground }]}>vs.</Text>
          <Text style={[styles.preOpponent, { color: colors.foreground }]}>{opponent.name}</Text>
          <Text style={[styles.preStip, { color: colors.mutedForeground }]}>
            {chapter?.stipulation ?? "Exhibition Match"}
          </Text>
          {chapter && (
            <Text style={[styles.preVenue, { color: colors.mutedForeground }]}>
              {chapter.venue} · {chapter.city}
            </Text>
          )}
          <View style={[styles.preNote, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.preNoteText, { color: colors.mutedForeground }]}>
              Turn-based match. Use your moves, signature, and finisher strategically. Heel tactics are one-time-use per match.
            </Text>
          </View>
          <Pressable
            style={[styles.startBtn, { backgroundColor: colors.primary }]}
            onPress={() => {
              setPhase("fighting");
              addLog(`The bell rings. Rich $teve vs. ${opponent.name}.`, "system");
              addLog(`$teve is dressed for war. The gear is on.`, "system");
            }}
          >
            <Text style={[styles.startBtnText, { color: colors.primaryForeground }]}>
              RING THE BELL
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (phase === "post-match") {
    const won = winner === "player";
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.postMatch}>
          <MaterialCommunityIcons
            name={won ? "trophy" : "emoticon-sad"}
            size={60}
            color={won ? colors.primary : colors.mutedForeground}
          />
          <Text style={[styles.postResult, { color: won ? colors.primary : colors.destructive }]}>
            {won ? "VICTORY" : "DEFEAT"}
          </Text>
          <Text style={[styles.postReason, { color: colors.foreground }]}>{winReason}</Text>
          <Text style={[styles.postTurns, { color: colors.mutedForeground }]}>
            Turn {turn} · {opponent.name} ended at {opponentStamina}% stamina
          </Text>
          {!isExhibition && chapter && (
            <View style={[styles.postNote, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.postNoteTitle, { color: colors.primary }]}>HISTORICAL RECORD</Text>
              <Text style={[styles.postNoteText, { color: colors.mutedForeground }]}>
                {chapter.historicalNote}
              </Text>
            </View>
          )}
          <View style={styles.postButtons}>
            {!isExhibition && chapter && (
              <Pressable
                style={[styles.postBtn, { backgroundColor: colors.primary }]}
                onPress={() =>
                  router.replace({
                    pathname: "/cutscene",
                    params: { chapterId: chapter.id, showOutro: "true", playerWon: won ? "true" : "false" },
                  })
                }
              >
                <Text style={[styles.postBtnText, { color: colors.primaryForeground }]}>
                  CONTINUE STORY
                </Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.postBtn, { borderColor: colors.border, borderWidth: 1 }]}
              onPress={() => router.back()}
            >
              <Text style={[styles.postBtnText, { color: colors.foreground }]}>BACK</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[{ flex: 1 }, { transform: [{ translateX: shakeAnim }] }]}>
        <Animated.View
          style={[
            styles.flashOverlay,
            { opacity: flashAnim, backgroundColor: colors.primary },
          ]}
          pointerEvents="none"
        />

        <View style={styles.matchHeader}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={colors.mutedForeground} />
          </Pressable>
          <Text style={[styles.turnLabel, { color: colors.mutedForeground }]}>TURN {turn}</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.staminaBars}>
          <View style={styles.staminaRow}>
            <Text style={[styles.fighterLabel, { color: colors.primary }]}>RICH $TEVE</Text>
            <Text style={[styles.staminaNum, { color: getStaminaColor(staminaPct(playerStamina, PLAYER_BASE_STAMINA)) }]}>
              {playerStamina}
            </Text>
          </View>
          <View style={[styles.staminaBar, { backgroundColor: colors.secondary }]}>
            <View
              style={[
                styles.staminaFill,
                {
                  width: `${staminaPct(playerStamina, PLAYER_BASE_STAMINA) * 100}%`,
                  backgroundColor: getStaminaColor(staminaPct(playerStamina, PLAYER_BASE_STAMINA)),
                },
              ]}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.staminaRow}>
            <Text style={[styles.fighterLabel, { color: colors.foreground }]} numberOfLines={1}>
              {opponent.name.toUpperCase()}
            </Text>
            <Text style={[styles.staminaNum, { color: getStaminaColor(staminaPct(opponentStamina, opponent.stamina)) }]}>
              {opponentStamina}
            </Text>
          </View>
          <View style={[styles.staminaBar, { backgroundColor: colors.secondary }]}>
            <View
              style={[
                styles.staminaFill,
                {
                  width: `${staminaPct(opponentStamina, opponent.stamina) * 100}%`,
                  backgroundColor: getStaminaColor(staminaPct(opponentStamina, opponent.stamina)),
                },
              ]}
            />
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          style={[styles.logArea, { backgroundColor: colors.card, borderColor: colors.border }]}
          contentContainerStyle={{ padding: 10, gap: 4 }}
          showsVerticalScrollIndicator={false}
        >
          {log.map((entry, i) => (
            <Text
              key={i}
              style={[
                styles.logEntry,
                {
                  color:
                    entry.type === "special"
                      ? colors.primary
                      : entry.type === "player"
                      ? colors.foreground
                      : entry.type === "opponent"
                      ? colors.destructive
                      : colors.mutedForeground,
                  fontFamily: entry.type === "special" ? "Inter_600SemiBold" : "Inter_400Regular",
                },
              ]}
            >
              {entry.text}
            </Text>
          ))}
          {isOpponentTurn && (
            <Text style={[styles.logEntry, { color: colors.mutedForeground, fontStyle: "italic" }]}>
              {opponent.name} is moving...
            </Text>
          )}
        </ScrollView>

        <View style={[styles.moves, { backgroundColor: colors.background }]}>
          <View style={styles.movesRow}>
            {["Shoulder Block", "Body Slam", "Back Elbow", "Nerve Hold"].map((move, idx) => {
              const damages = [8, 10, 8, 7];
              return (
                <Pressable
                  key={move}
                  style={({ pressed }) => [
                    styles.moveBtn,
                    {
                      backgroundColor: colors.secondary,
                      borderColor: colors.border,
                      opacity: isOpponentTurn ? 0.4 : pressed ? 0.7 : 1,
                    },
                  ]}
                  disabled={isOpponentTurn}
                  onPress={() => playerMove(move, damages[idx]!, "normal")}
                >
                  <Text style={[styles.moveBtnText, { color: colors.foreground }]}>{move}</Text>
                  <Text style={[styles.moveDmg, { color: colors.mutedForeground }]}>{damages[idx]!}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.specialRow}>
            <Pressable
              style={({ pressed }) => [
                styles.sigBtn,
                {
                  backgroundColor: canMarketCrash && !isOpponentTurn ? colors.accent : colors.secondary,
                  borderColor: colors.border,
                  opacity: !canMarketCrash || isOpponentTurn ? 0.4 : pressed ? 0.8 : 1,
                },
              ]}
              disabled={!canMarketCrash || isOpponentTurn}
              onPress={() => playerMove("Market Crash", 25, "signature")}
            >
              <Text style={[styles.sigBtnText, { color: canMarketCrash ? "#fff" : colors.mutedForeground }]}>
                MARKET CRASH
              </Text>
              <Text style={[styles.sigSub, { color: canMarketCrash ? "#ffffff99" : colors.mutedForeground }]}>
                {marketCrashCooldown > 0 ? `Cooldown: ${marketCrashCooldown}` : "Side Effect · 25 dmg"}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.finBtn,
                {
                  backgroundColor: canFinisher && !isOpponentTurn ? colors.primary : colors.secondary,
                  borderColor: colors.border,
                  opacity: !canFinisher || isOpponentTurn ? 0.3 : pressed ? 0.85 : 1,
                },
              ]}
              disabled={!canFinisher || isOpponentTurn}
              onPress={() => playerMove("Money Drop", 0, "finisher")}
            >
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={16}
                color={canFinisher ? colors.primaryForeground : colors.mutedForeground}
              />
              <Text style={[styles.finBtnText, { color: canFinisher ? colors.primaryForeground : colors.mutedForeground }]}>
                MONEY DROP
              </Text>
            </Pressable>
          </View>

          <View style={styles.heelRow}>
            <Text style={[styles.heelLabel, { color: colors.mutedForeground }]}>HEEL TACTICS</Text>
            <View style={styles.heelBtns}>
              <Pressable
                style={[styles.heelBtn, { backgroundColor: colors.card, borderColor: colors.border, opacity: distractUsed || isOpponentTurn ? 0.35 : 1 }]}
                disabled={distractUsed || isOpponentTurn}
                onPress={() => playerMove("Crowd Distraction", 0, "distract")}
              >
                <Text style={[styles.heelBtnText, { color: colors.foreground }]}>DISTRACT</Text>
              </Pressable>
              <Pressable
                style={[styles.heelBtn, { backgroundColor: colors.card, borderColor: colors.border, opacity: refManipUsed || isOpponentTurn ? 0.35 : 1 }]}
                disabled={refManipUsed || isOpponentTurn}
                onPress={() => playerMove("Ref Manipulation", 0, "refmanip")}
              >
                <Text style={[styles.heelBtnText, { color: colors.foreground }]}>REF MANIP</Text>
              </Pressable>
              <Pressable
                style={[styles.heelBtn, { backgroundColor: colors.card, borderColor: colors.border, opacity: guerreroUsed || isOpponentTurn ? 0.35 : 1 }]}
                disabled={guerreroUsed || isOpponentTurn}
                onPress={() => playerMove("Guerrero Special", 0, "guerrero")}
              >
                <Text style={[styles.heelBtnText, { color: colors.foreground }]}>GUERRERO</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
    pointerEvents: "none",
  },
  preMatch: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 8 },
  preVS: { fontSize: 11, letterSpacing: 4, fontFamily: "Inter_500Medium" },
  prePlayer: { fontSize: 36, fontFamily: "Inter_700Bold", letterSpacing: -1 },
  preVS2: { fontSize: 14, fontFamily: "Inter_400Regular" },
  preOpponent: { fontSize: 28, fontFamily: "Inter_600SemiBold", textAlign: "center" },
  preStip: { fontSize: 12, fontFamily: "Inter_500Medium", textAlign: "center", marginTop: 4 },
  preVenue: { fontSize: 11, fontFamily: "Inter_400Regular", textAlign: "center" },
  preNote: { borderWidth: 1, borderRadius: 6, padding: 14, marginTop: 16, marginBottom: 8 },
  preNoteText: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18, textAlign: "center" },
  startBtn: { marginTop: 8, borderRadius: 6, paddingVertical: 16, paddingHorizontal: 48 },
  startBtnText: { fontSize: 15, fontFamily: "Inter_700Bold", letterSpacing: 2 },

  postMatch: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 12 },
  postResult: { fontSize: 40, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  postReason: { fontSize: 14, fontFamily: "Inter_500Medium", textAlign: "center" },
  postTurns: { fontSize: 12, fontFamily: "Inter_400Regular" },
  postNote: { borderWidth: 1, borderRadius: 6, padding: 14, width: "100%" },
  postNoteTitle: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 2, marginBottom: 6 },
  postNoteText: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  postButtons: { width: "100%", gap: 10, marginTop: 8 },
  postBtn: { borderRadius: 6, paddingVertical: 14, alignItems: "center" },
  postBtnText: { fontSize: 13, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },

  matchHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, paddingVertical: 8 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  turnLabel: { fontSize: 12, fontFamily: "Inter_600SemiBold", letterSpacing: 2 },

  staminaBars: { paddingHorizontal: 16, paddingBottom: 8, gap: 4 },
  staminaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 },
  fighterLabel: { fontSize: 12, fontFamily: "Inter_700Bold", letterSpacing: 1, flex: 1 },
  staminaNum: { fontSize: 14, fontFamily: "Inter_700Bold" },
  staminaBar: { height: 8, borderRadius: 4, overflow: "hidden" },
  staminaFill: { height: "100%", borderRadius: 4 },
  divider: { height: 1, marginVertical: 8 },

  logArea: { flex: 1, marginHorizontal: 12, borderRadius: 6, borderWidth: 1, marginBottom: 8 },
  logEntry: { fontSize: 13, lineHeight: 20 },

  moves: { paddingHorizontal: 12, paddingBottom: 12, gap: 8 },
  movesRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  moveBtn: { flex: 1, minWidth: "45%", borderRadius: 6, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 8, alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  moveBtnText: { fontSize: 11, fontFamily: "Inter_500Medium" },
  moveDmg: { fontSize: 11, fontFamily: "Inter_700Bold" },

  specialRow: { flexDirection: "row", gap: 8 },
  sigBtn: { flex: 2, borderRadius: 6, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 12, alignItems: "center" },
  sigBtnText: { fontSize: 13, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  sigSub: { fontSize: 10, fontFamily: "Inter_400Regular", marginTop: 2 },
  finBtn: { flex: 1, borderRadius: 6, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 8, alignItems: "center", justifyContent: "center", gap: 4 },
  finBtnText: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 0.5, textAlign: "center" },

  heelRow: { gap: 6 },
  heelLabel: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  heelBtns: { flexDirection: "row", gap: 6 },
  heelBtn: { flex: 1, borderRadius: 6, borderWidth: 1, paddingVertical: 10, alignItems: "center" },
  heelBtnText: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },
});
