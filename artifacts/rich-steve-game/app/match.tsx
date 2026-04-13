import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
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
import { getWrestlerPhoto } from "@/constants/wrestlerPhotos";

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

function WrestlerPortrait({
  photo,
  name,
  isPlayer,
  size = 140,
  borderColor,
}: {
  photo: any | null;
  name: string;
  isPlayer: boolean;
  size?: number;
  borderColor: string;
}) {
  if (photo) {
    return (
      <View style={[styles.portraitBox, { width: size, height: size, borderColor, borderWidth: 2, borderRadius: 8 }]}>
        <Image source={photo} style={styles.portraitImg} resizeMode="cover" />
        <View style={[styles.portraitNameBar, { backgroundColor: isPlayer ? borderColor + "EE" : "#000000CC" }]}>
          <Text style={styles.portraitNameText} numberOfLines={1}>
            {name.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.portraitBox, styles.portraitPlaceholder, { width: size, height: size, borderColor, borderWidth: 2, borderRadius: 8 }]}>
      <MaterialCommunityIcons name="account-outline" size={size * 0.45} color={borderColor + "66"} />
      <Text style={[styles.portraitNameText, { color: borderColor }]} numberOfLines={1}>
        {name.toUpperCase()}
      </Text>
    </View>
  );
}

function SmallPortrait({
  photo,
  size = 44,
  borderColor,
}: {
  photo: any | null;
  size?: number;
  borderColor: string;
}) {
  if (photo) {
    return (
      <View style={{ width: size, height: size, borderRadius: 6, overflow: "hidden", borderWidth: 1.5, borderColor }}>
        <Image source={photo} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
      </View>
    );
  }
  return (
    <View style={{ width: size, height: size, borderRadius: 6, borderWidth: 1.5, borderColor, alignItems: "center", justifyContent: "center", backgroundColor: borderColor + "22" }}>
      <MaterialCommunityIcons name="account" size={size * 0.6} color={borderColor + "66"} />
    </View>
  );
}

export default function MatchScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams<{ opponentId: string; chapterId: string; mode: string; characterId?: string }>();
  const { completeChapter } = useGame();

  const opponent = WRESTLERS.find((w) => w.id === params.opponentId) ?? WRESTLERS[0]!;
  const chapter = CAREER_CHAPTERS.find((c) => c.id === params.chapterId);
  const isExhibition = params.mode === "exhibition";
  const characterId = params.characterId ?? "rich-steve";
  const characterWrestler = WRESTLERS.find((w) => w.id === characterId);
  const playerName = characterId === "rich-steve" ? "Rich $teve" : (characterWrestler?.name ?? "Rich $teve");

  const stevePhoto = getWrestlerPhoto(characterId);
  const opponentPhoto = getWrestlerPhoto(opponent.id);

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
      addLog(`${playerName} tosses the Riot Rumble Lockbox to the opponent and drops!`, "special");
      addLog(`The referee sees the weapon — DISQUALIFICATION! ${playerName} wins by DQ!`, "special");
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
      addLog(`${playerName} hits ${moveName} for ${finalDmg} damage.`, "player");
    }

    if (newOppStam === 0) {
      addLog(`${opponent.name} is out cold! ${playerName} covers!`, "player");
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
          <Text style={[styles.preEra, { color: colors.mutedForeground }]}>
            {chapter?.venue ? `${chapter.venue} · ${chapter.city}` : "EXHIBITION MATCH"}
          </Text>
          {chapter?.stipulation && (
            <Text style={[styles.preStip, { color: colors.primary }]}>
              {chapter.stipulation}
            </Text>
          )}

          <View style={styles.faceoffRow}>
            <View style={styles.faceoffSide}>
              <WrestlerPortrait
                photo={stevePhoto}
                name={playerName}
                isPlayer
                borderColor={colors.primary}
              />
            </View>

            <View style={styles.vsCircle}>
              <Text style={[styles.vsText, { color: colors.mutedForeground }]}>VS</Text>
            </View>

            <View style={styles.faceoffSide}>
              <WrestlerPortrait
                photo={opponentPhoto}
                name={opponent.name}
                isPlayer={false}
                borderColor={colors.destructive}
              />
            </View>
          </View>

          <View style={[styles.preNote, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.preNoteText, { color: colors.mutedForeground }]}>
              Turn-based match. Use moves, signature, and finisher strategically. Heel tactics are one-time-use per match.
            </Text>
          </View>
          <Pressable
            style={[styles.startBtn, { backgroundColor: colors.primary }]}
            onPress={() => {
              setPhase("fighting");
              addLog(`The bell rings. ${playerName} vs. ${opponent.name}.`, "system");
              addLog(`${playerName} is dressed for war. The gear is on.`, "system");
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
          <View style={styles.postPortraitRow}>
            <SmallPortrait photo={stevePhoto} size={64} borderColor={won ? colors.primary : colors.mutedForeground} />
            <MaterialCommunityIcons
              name={won ? "trophy" : "emoticon-sad"}
              size={44}
              color={won ? colors.primary : colors.mutedForeground}
            />
            <SmallPortrait photo={opponentPhoto} size={64} borderColor={won ? colors.mutedForeground : colors.destructive} />
          </View>
          <Text style={[styles.postResult, { color: won ? colors.primary : colors.destructive }]}>
            {won ? "VICTORY" : "DEFEAT"}
          </Text>
          <Text style={[styles.postReason, { color: colors.foreground }]}>{winReason}</Text>
          <Text style={[styles.postTurns, { color: colors.mutedForeground }]}>
            Turn {turn} · {opponent.name} ended at {opponentStamina}% stamina
          </Text>
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

        <View style={[styles.matchHUD, { borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={colors.mutedForeground} />
          </Pressable>

          <View style={styles.hudInner}>
            <View style={styles.hudFighter}>
              <SmallPortrait photo={stevePhoto} size={44} borderColor={colors.primary} />
              <View style={styles.hudStaminaCol}>
                <View style={[styles.hudBar, { backgroundColor: colors.secondary }]}>
                  <Animated.View
                    style={[
                      styles.hudBarFill,
                      {
                        width: `${staminaPct(playerStamina, PLAYER_BASE_STAMINA) * 100}%`,
                        backgroundColor: getStaminaColor(staminaPct(playerStamina, PLAYER_BASE_STAMINA)),
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.hudName, { color: colors.primary }]}>$TEVE</Text>
              </View>
            </View>

            <Text style={[styles.hudTurn, { color: colors.mutedForeground }]}>T{turn}</Text>

            <View style={[styles.hudFighter, { flexDirection: "row-reverse" }]}>
              <SmallPortrait photo={opponentPhoto} size={44} borderColor={colors.destructive} />
              <View style={[styles.hudStaminaCol, { alignItems: "flex-end" }]}>
                <View style={[styles.hudBar, { backgroundColor: colors.secondary }]}>
                  <Animated.View
                    style={[
                      styles.hudBarFill,
                      {
                        width: `${staminaPct(opponentStamina, opponent.stamina) * 100}%`,
                        backgroundColor: getStaminaColor(staminaPct(opponentStamina, opponent.stamina)),
                        alignSelf: "flex-end",
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.hudName, { color: colors.destructive }]} numberOfLines={1}>
                  {opponent.name.split(" ")[0]!.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ width: 40 }} />
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

  preMatch: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, gap: 12 },
  preEra: { fontSize: 10, letterSpacing: 3, fontFamily: "Inter_500Medium", textAlign: "center" },
  preStip: { fontSize: 13, fontFamily: "Inter_700Bold", letterSpacing: 1, textAlign: "center" },

  faceoffRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginVertical: 8,
    width: "100%",
  },
  faceoffSide: { flex: 1, alignItems: "center" },
  vsCircle: { alignItems: "center", justifyContent: "center" },
  vsText: { fontSize: 22, fontFamily: "Inter_700Bold" },

  portraitBox: { overflow: "hidden", position: "relative" },
  portraitImg: { width: "100%", height: "100%" },
  portraitPlaceholder: { alignItems: "center", justifyContent: "center", gap: 4 },
  portraitNameBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  portraitNameText: {
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
    color: "#FFFFFF",
  },

  preNote: { borderWidth: 1, borderRadius: 6, padding: 12, width: "100%" },
  preNoteText: { fontSize: 11, fontFamily: "Inter_400Regular", lineHeight: 16, textAlign: "center" },
  startBtn: { borderRadius: 6, paddingVertical: 16, paddingHorizontal: 48, marginTop: 4 },
  startBtnText: { fontSize: 15, fontFamily: "Inter_700Bold", letterSpacing: 2 },

  postMatch: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 12 },
  postPortraitRow: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 8 },
  postResult: { fontSize: 40, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  postReason: { fontSize: 14, fontFamily: "Inter_500Medium", textAlign: "center" },
  postTurns: { fontSize: 12, fontFamily: "Inter_400Regular" },
  postNote: { borderWidth: 1, borderRadius: 6, padding: 14, width: "100%" },
  postNoteTitle: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 2, marginBottom: 6 },
  postNoteText: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  postButtons: { width: "100%", gap: 10, marginTop: 8 },
  postBtn: { borderRadius: 6, paddingVertical: 14, alignItems: "center" },
  postBtnText: { fontSize: 13, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },

  matchHUD: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap: 4,
  },
  backBtn: { width: 40, height: 44, alignItems: "center", justifyContent: "center" },
  hudInner: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  hudFighter: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  hudStaminaCol: { flex: 1 },
  hudBar: { height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 3 },
  hudBarFill: { height: "100%", borderRadius: 4 },
  hudName: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  hudTurn: { fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1, textAlign: "center", minWidth: 28 },

  logArea: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 0,
  },
  logEntry: { fontSize: 13, lineHeight: 20 },

  moves: { paddingTop: 8, paddingBottom: 4 },
  movesRow: { flexDirection: "row", paddingHorizontal: 8, gap: 6, marginBottom: 8 },
  moveBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
  },
  moveBtnText: { fontSize: 9, fontFamily: "Inter_600SemiBold", letterSpacing: 0.5, textAlign: "center" },
  moveDmg: { fontSize: 9, fontFamily: "Inter_700Bold" },

  specialRow: { flexDirection: "row", paddingHorizontal: 8, gap: 8, marginBottom: 8 },
  sigBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  sigBtnText: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  sigSub: { fontSize: 9, fontFamily: "Inter_400Regular", marginTop: 2 },
  finBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  finBtnText: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1 },

  heelRow: { paddingHorizontal: 8, paddingBottom: 8 },
  heelLabel: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 2, marginBottom: 6 },
  heelBtns: { flexDirection: "row", gap: 8 },
  heelBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: "center",
  },
  heelBtnText: { fontSize: 9, fontFamily: "Inter_600SemiBold", letterSpacing: 0.5 },
});
