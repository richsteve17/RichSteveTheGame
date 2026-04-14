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
import { CAREER_CHAPTERS, WRESTLERS, type Wrestler } from "@/constants/gameData";
import { getWrestlerPhoto } from "@/constants/wrestlerPhotos";

type Phase = "pre-match" | "fighting" | "post-match";
type MoveType = "normal" | "signature" | "finisher" | "distract" | "refmanip" | "guerrero" | "weapon";
type LogEntry = { text: string; type: "player" | "opponent" | "special" | "system" };

const PLAYER_BASE_STAMINA = 100;

type NarrativeRule = { line: string; chapterId?: string };
const NARRATIVE_RULES: Record<string, NarrativeRule> = {
  "korpse":      { line: "12 years, road dogs — and now this." },
  "ray-rumble":  { line: "George Burkett warned him.",             chapterId: "ch5-lethal-lottery" },
  "yams":        { line: "The Working Man is running out of road." },
  "mac-mayhem":  { line: "Emphasis on ME — whose name is on that belt?", chapterId: "ch6-mac-mayhem" },
};

function buildOpponentMoves(wrestler: { stamina: number; moves: string[]; style: string }) {
  const base = Math.round(8 + (wrestler.stamina - 70) * 0.1);
  return wrestler.moves.map((name) => ({ name, damage: base }));
}

function getWeaponMoves(stipulation: string): { name: string; damage: number }[] {
  const s = stipulation.toLowerCase();
  if (/ladder/.test(s)) return [
    { name: "Throw into Ladder", damage: 16 },
    { name: "Use Ladder as Weapon", damage: 14 },
  ];
  if (/cage/.test(s)) return [
    { name: "Ram into Cage Wall", damage: 14 },
  ];
  if (/no.dq|no disqualification|hardcore|riot city rules/.test(s)) return [
    { name: "Chair Shot", damage: 18 },
    { name: "Table Spot", damage: 22 },
    { name: "Belt Shot", damage: 15 },
  ];
  return [];
}

function WrestlerPortrait({
  photo, name, isPlayer, size = 120, borderColor,
}: { photo: any; name: string; isPlayer: boolean; size?: number; borderColor: string }) {
  if (photo) {
    return (
      <View style={[styles.portraitBox, { width: size, height: size, borderColor, borderWidth: 2, borderRadius: 8 }]}>
        <Image source={photo} style={styles.portraitImg} resizeMode="cover" />
        <View style={[styles.portraitNameBar, { backgroundColor: isPlayer ? borderColor + "EE" : "#000000CC" }]}>
          <Text style={styles.portraitNameText} numberOfLines={1}>{name.toUpperCase()}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.portraitBox, styles.portraitPlaceholder, { width: size, height: size, borderColor, borderWidth: 2, borderRadius: 8 }]}>
      <MaterialCommunityIcons name="account-outline" size={size * 0.45} color={borderColor + "66"} />
      <Text style={[styles.portraitNameText, { color: borderColor }]} numberOfLines={1}>{name.toUpperCase()}</Text>
    </View>
  );
}

function SmallPortrait({ photo, size = 44, borderColor }: { photo: any; size?: number; borderColor: string }) {
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
  const params = useLocalSearchParams<{
    opponentId: string;
    chapterId: string;
    mode: string;
    characterId?: string;
    historicalResult?: string;
    legacyMode?: string;
    stipulationParam?: string;
    freePlayOpponentOvr?: string;
    partnerId?: string;
  }>();
  const { completeChapter, recordFreePlayMatch } = useGame();

  const chapter = CAREER_CHAPTERS.find((c) => c.id === params.chapterId);
  const isExhibition = params.mode === "exhibition";
  const isFreePlay = params.mode === "freePlay";
  const isLegacy = params.legacyMode === "true";
  const stipulation = chapter?.stipulation ?? params.stipulationParam ?? "";
  const isNoDQ = /no.dq|no disqualification|hardcore|riot city rules/i.test(stipulation);
  const isCage = /cage/i.test(stipulation);
  const isLadder = /ladder/i.test(stipulation);

  const rawOpponentIds: string[] = chapter?.opponentIds ??
    (chapter?.opponentId ? [chapter.opponentId] :
      (params.opponentId ? [params.opponentId] : []));
  const opponentTeam: Wrestler[] = rawOpponentIds
    .map((id) => WRESTLERS.find((w) => w.id === id))
    .filter((w): w is Wrestler => !!w);
  const resolvedTeam: Wrestler[] = opponentTeam.length > 0 ? opponentTeam : [WRESTLERS[0]!];

  const rawPartnerIds: string[] = chapter?.partnerIds ??
    (params.partnerId ? [params.partnerId] : []);
  const partnerTeam: Wrestler[] = rawPartnerIds
    .map((id) => WRESTLERS.find((w) => w.id === id))
    .filter((w): w is Wrestler => !!w);
  const isTagMatch = resolvedTeam.length > 1 || partnerTeam.length > 0;

  const isWargames = /war.?games/i.test(stipulation);

  const characterId = params.characterId ?? "rich-steve";
  const characterWrestler = WRESTLERS.find((w) => w.id === characterId);
  const playerName = characterId === "rich-steve" ? "Rich $teve" : (characterWrestler?.name ?? "Rich $teve");
  const stevePhoto = (chapter?.playerPhotoKey ? getWrestlerPhoto(chapter.playerPhotoKey) : null) ?? getWrestlerPhoto(characterId);

  const weaponMoves = getWeaponMoves(stipulation);

  const [phase, setPhase] = useState<Phase>("pre-match");
  const [playerStamina, setPlayerStamina] = useState(PLAYER_BASE_STAMINA);
  const [partnerStaminas, setPartnerStaminas] = useState<number[]>(() => partnerTeam.map((p) => p.stamina));
  const [activePartnerIdx, setActivePartnerIdx] = useState<number | null>(null);
  const [opponentStaminas, setOpponentStaminas] = useState<number[]>(() =>
    isWargames ? [resolvedTeam[0]!.stamina, ...resolvedTeam.slice(1).map(() => -1)] : resolvedTeam.map((w) => w.stamina)
  );
  const [activeOpponentIdx, setActiveOpponentIdx] = useState(0);
  const [wgOppEntered, setWgOppEntered] = useState(1);
  const [wgPartEntered, setWgPartEntered] = useState(0);
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
  const [tagUsed, setTagUsed] = useState(false);
  const [climbProgress, setClimbProgress] = useState(0);
  const [climbActive, setClimbActive] = useState(false);
  const [heatDelta, setHeatDelta] = useState<number | null>(null);
  const [matchFailed, setMatchFailed] = useState(false);

  const narrativeFired = useRef<Set<number>>(new Set());
  const heelUsedRef = useRef(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const activeOpponent = resolvedTeam[activeOpponentIdx] ?? resolvedTeam[0]!;
  const activeOpponentStamina = opponentStaminas[activeOpponentIdx] ?? 0;
  const opponentPhoto = getWrestlerPhoto(activeOpponent.id);
  const opponentMoves = buildOpponentMoves(activeOpponent);
  const partnerIn = activePartnerIdx !== null;
  const activePartner = activePartnerIdx !== null ? partnerTeam[activePartnerIdx] ?? null : null;
  const activePlayerName = activePartner ? activePartner.name : playerName;
  const activePartnerStamina = activePartnerIdx !== null ? (partnerStaminas[activePartnerIdx] ?? 0) : 0;
  const activePlayerStamina = partnerIn ? activePartnerStamina : playerStamina;
  const activePlayerMaxStamina = partnerIn && activePartner ? activePartner.stamina : PLAYER_BASE_STAMINA;
  const alivePartnerCount = partnerStaminas.filter((s, i) => s > 0 && i < partnerTeam.length).length;

  const canFinisher = activeOpponentStamina <= Math.floor(activeOpponent.stamina * 0.25) && !isLadder;
  const canMarketCrash = marketCrashCooldown === 0;
  const canClimb = isLadder && activeOpponentStamina === 0;
  const canCageEscape = isCage && activeOpponentStamina <= Math.floor(activeOpponent.stamina * 0.30);
  const showClimbButton = canClimb || canCageEscape;

  const staminaPct = (val: number, max: number) => Math.max(0, Math.min(1, val / max));
  const getStaminaColor = (pct: number) => pct > 0.5 ? "#22c55e" : pct > 0.25 ? "#f59e0b" : "#ef4444";

  const shake = useCallback(() => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  }, [shakeAnim]);

  const flash = useCallback(() => {
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [flashAnim]);

  const addLog = useCallback((text: string, type: LogEntry["type"]) => {
    setLog((prev) => [...prev, { text, type }]);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  const endMatch = useCallback(async (w: "player" | "opponent", reason: string) => {
    const won = w === "player";
    setWinner(w);
    setWinReason(reason);

    if (isFreePlay) {
      const isStip = !/standard/i.test(params.stipulationParam ?? "Standard Match");
      const method = /submission/i.test(reason) ? "submission"
        : /guerrero/i.test(reason) ? "guerrero"
        : "pin";
      const oppOvr = parseInt(params.freePlayOpponentOvr ?? "70", 10);
      const { heatDelta: delta } = await recordFreePlayMatch({
        won,
        method,
        isStipulation: isStip,
        opponentId: params.opponentId ?? "",
        opponentOvr: oppOvr,
        heelUsed: heelUsedRef.current,
      });
      setHeatDelta(delta);
      setPhase("post-match");
      Haptics.notificationAsync(won ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
    } else if (!isExhibition && params.chapterId) {
      const histResult = params.historicalResult ?? "win";
      if (isLegacy && !won && histResult === "win") {
        setMatchFailed(true);
        setPhase("post-match");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        return;
      }
      await completeChapter(params.chapterId, won, {
        isTagTitle: params.chapterId === "ch5-lethal-lottery",
        isHeavyweight: params.chapterId === "ch6-mac-mayhem",
        isRiotRumble: params.chapterId === "ch5-lethal-lottery",
      });
      setPhase("post-match");
      Haptics.notificationAsync(won ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
    } else {
      setPhase("post-match");
      Haptics.notificationAsync(won ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
    }
  }, [isExhibition, isFreePlay, isLegacy, params.chapterId, params.historicalResult,
      params.freePlayOpponentOvr, params.opponentId, params.stipulationParam,
      completeChapter, recordFreePlayMatch]);

  const checkNarrative = useCallback((oppId: string, newStam: number, maxStam: number) => {
    if (narrativeFired.current.size >= 2) return;
    const rule = NARRATIVE_RULES[oppId];
    if (!rule) return;
    if (rule.chapterId && rule.chapterId !== params.chapterId) return;
    const pct = (newStam / maxStam) * 100;
    const thresholds = [80, 60, 40, 20] as const;
    for (const t of thresholds) {
      if (pct <= t && !narrativeFired.current.has(t)) {
        narrativeFired.current.add(t);
        setTimeout(() => addLog(`📢 "${rule.line}"`, "special"), 300);
        break;
      }
    }
  }, [addLog, params.chapterId]);

  const maybeNewEntrant = useCallback((newTurn: number, oppStams: number[]) => {
    if (!isTagMatch && !isWargames) return;

    if (isWargames) {
      const oppInterval = 5;
      const partInterval = 7;
      const nextOppEntry = wgOppEntered * oppInterval;
      const nextPartEntry = (wgPartEntered + 1) * partInterval;

      if (newTurn === nextOppEntry && wgOppEntered < resolvedTeam.length) {
        const nextIdx = wgOppEntered;
        const entrant = resolvedTeam[nextIdx];
        if (entrant) {
          setWgOppEntered((n) => n + 1);
          setOpponentStaminas((prev) => {
            const next = [...prev];
            next[nextIdx] = entrant.stamina;
            return next;
          });
          setActiveOpponentIdx(nextIdx);
          setTimeout(() => addLog(`⚡ WAR GAMES: ${entrant.name} enters the cage! The numbers shift!`, "special"), 200);
        }
      }

      if (newTurn === nextPartEntry && wgPartEntered < partnerTeam.length) {
        const nextPartIdx = wgPartEntered;
        const entrant = partnerTeam[nextPartIdx];
        if (entrant) {
          setWgPartEntered((n) => n + 1);
          setActivePartnerIdx(nextPartIdx);
          setTimeout(() => addLog(`⚡ WAR GAMES: ${entrant.name} enters for your team! Numbers are even!`, "special"), 200);
        }
      }
      return;
    }

    if (resolvedTeam.length <= 1) return;
    if (newTurn % 5 !== 0) return;
    const aliveOthers = oppStams.map((s, i) => ({ i, s })).filter(({ i, s }) => i !== activeOpponentIdx && s > 0);
    if (aliveOthers.length === 0) return;
    const next = aliveOthers[Math.floor(Math.random() * aliveOthers.length)]!;
    setActiveOpponentIdx(next.i);
    const incoming = resolvedTeam[next.i]!;
    setTimeout(() => addLog(`🔄 ${activeOpponent.name} tags out — ${incoming.name} steps in!`, "system"), 200);
  }, [
    isTagMatch, isWargames, resolvedTeam, partnerTeam, activeOpponentIdx,
    activeOpponent, wgOppEntered, wgPartEntered, addLog,
  ]);

  const opponentAttack = useCallback((pStam: number) => {
    if (activeOpponentStamina === 0 && isWargames) {
      setIsOpponentTurn(false);
      setTurn((t) => {
        const next = t + 1;
        setOpponentStaminas((prev) => {
          maybeNewEntrant(next, prev);
          return prev;
        });
        return next;
      });
      return;
    }

    if (refManipActive) {
      addLog(`${activeOpponent.name}'s move is NEGATED by Referee Manipulation!`, "special");
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
      moveName = activeOpponent.signatureMove ?? "Signature Move";
      dmg = 20 + Math.floor(Math.random() * 8);
      setSignatureUsed(true);
      addLog(`${activeOpponent.name} hits the ${moveName} for ${dmg} damage!`, "opponent");
      flash();
      shake();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else {
      const move = opponentMoves[Math.floor(Math.random() * opponentMoves.length)]!;
      moveName = move.name;
      dmg = Math.max(3, move.damage + Math.floor(Math.random() * 5) - 2);
      addLog(`${activeOpponent.name} hits ${moveName} for ${dmg} damage.`, "opponent");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (climbActive && (isLadder || isCage)) {
      const climbLoss = Math.min(climbProgress, 25);
      setClimbProgress((p) => Math.max(0, p - climbLoss));
      if (climbLoss > 0) addLog(`${activeOpponent.name} drags you down! Climb progress lost.`, "system");
    }

    if (partnerIn && activePartnerIdx !== null) {
      const curPartnerStam = partnerStaminas[activePartnerIdx] ?? 0;
      const newPartStam = Math.max(0, curPartnerStam - dmg);
      setPartnerStaminas((prev) => {
        const next = [...prev];
        next[activePartnerIdx] = newPartStam;
        return next;
      });
      if (newPartStam === 0) {
        const eliminatedName = activePartner?.name ?? "Your partner";
        addLog(`${eliminatedName} has been eliminated!`, "special");
        const nextAlive = partnerStaminas.findIndex((s, i) => i !== activePartnerIdx && i < partnerTeam.length && s > 0);
        if (nextAlive >= 0) {
          setActivePartnerIdx(nextAlive);
          addLog(`${partnerTeam[nextAlive]!.name} steps in to replace them!`, "system");
        } else {
          setActivePartnerIdx(null);
          addLog(`No partners left — ${playerName} is on their own!`, "special");
        }
        setIsOpponentTurn(false);
        setTurn((t) => t + 1);
        setMarketCrashCooldown((c) => Math.max(0, c - 1));
        return;
      }
    } else {
      const newStam = Math.max(0, pStam - dmg);
      setPlayerStamina(newStam);
      if (newStam === 0) {
        if (isWargames && alivePartnerCount > 0) {
          const nextPartner = partnerStaminas.findIndex((s, i) => s > 0 && i < partnerTeam.length);
          if (nextPartner >= 0) {
            setActivePartnerIdx(nextPartner);
            addLog(`${playerName} is down! ${partnerTeam[nextPartner]!.name} steps up!`, "special");
            setIsOpponentTurn(false);
            setTurn((t) => t + 1);
            setMarketCrashCooldown((c) => Math.max(0, c - 1));
            return;
          }
        }
        endMatch("opponent", `${activeOpponent.name} wins.`);
        return;
      }
    }

    setIsOpponentTurn(false);
    setTurn((t) => {
      const next = t + 1;
      setOpponentStaminas((prev) => {
        maybeNewEntrant(next, prev);
        return prev;
      });
      return next;
    });
    setMarketCrashCooldown((c) => Math.max(0, c - 1));
  }, [
    activeOpponent, activeOpponentStamina, refManipActive, signatureUsed, opponentMoves,
    addLog, endMatch, flash, shake, climbActive, isLadder, isCage,
    climbProgress, partnerIn, activePartnerIdx, activePartner, partnerStaminas,
    partnerTeam, playerName, isWargames, alivePartnerCount, maybeNewEntrant,
  ]);

  useEffect(() => {
    if (isOpponentTurn && phase === "fighting") {
      const timer = setTimeout(() => opponentAttack(playerStamina), 900);
      return () => clearTimeout(timer);
    }
  }, [isOpponentTurn, phase, playerStamina, opponentAttack]);

  const handleHotTag = () => {
    if (tagUsed || partnerTeam.length === 0 || isOpponentTurn || phase !== "fighting") return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setTagUsed(true);

    if (partnerIn && activePartnerIdx !== null) {
      const partnerName = activePartner?.name ?? "Your partner";
      setActivePartnerIdx(null);
      addLog(`🔥 HOT TAG — ${partnerName} tags back in ${playerName}!`, "special");
    } else {
      const nextAlive = partnerStaminas.findIndex((s, i) => s > 0 && i < partnerTeam.length);
      if (nextAlive < 0) {
        addLog("No available partners — fight on!", "system");
        return;
      }
      setActivePartnerIdx(nextAlive);
      const incoming = partnerTeam[nextAlive]!;
      addLog(`🔥 HOT TAG — ${playerName} tags in ${incoming.name}!`, "special");
    }

    if (resolvedTeam.length > 1) {
      setOpponentStaminas((prev) => {
        const nextIdx = (activeOpponentIdx + 1) % resolvedTeam.length;
        if ((prev[nextIdx] ?? 0) > 0) {
          setActiveOpponentIdx(nextIdx);
          const incoming = resolvedTeam[nextIdx]!;
          addLog(`${incoming.name} rushes in to meet them!`, "system");
        }
        return prev;
      });
    }
    setIsOpponentTurn(true);
  };

  const handleClimb = () => {
    if (isOpponentTurn || phase !== "fighting") return;
    if (!showClimbButton) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!climbActive) setClimbActive(true);
    const gain = 22 + Math.floor(Math.random() * 16);
    const newProgress = Math.min(100, climbProgress + gain);
    if (newProgress >= 100) {
      setClimbProgress(100);
      flash();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (isLadder) {
        addLog(`${activePlayerName} GRABS the contract from the top of the ladder!`, "special");
        endMatch("player", "Win — Retrieved the Contract (Ladder Match)");
      } else {
        addLog(`${activePlayerName} ESCAPES over the top of the cage!`, "special");
        endMatch("player", "Win — Cage Escape");
      }
    } else {
      setClimbProgress(newProgress);
      const label = isLadder ? "ladder" : "cage wall";
      addLog(`${activePlayerName} climbs the ${label}... ${newProgress}% there.`, "player");
      setIsOpponentTurn(true);
      setMarketCrashCooldown((c) => Math.max(0, c - 1));
    }
  };

  const playerMove = (moveName: string, damage: number, type: MoveType) => {
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
      if (isCage) { addLog("No referee to manipulate — you're inside a steel cage.", "system"); return; }
      setRefManipUsed(true);
      setRefManipActive(true);
      addLog("Referee Manipulation activated — opponent's next move is negated.", "special");
      setIsOpponentTurn(true);
      setMarketCrashCooldown((c) => Math.max(0, c - 1));
      return;
    }

    if (type === "guerrero") {
      if (isNoDQ) { addLog("There are no disqualifications — the Guerrero Special doesn't work here.", "system"); return; }
      setGuerreroUsed(true);
      heelUsedRef.current = true;
      addLog(`${activePlayerName} tosses the Riot Rumble Lockbox to the opponent and drops!`, "special");
      addLog(`The referee sees the weapon — DISQUALIFICATION! ${activePlayerName} wins by DQ!`, "special");
      flash();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      endMatch("player", "Win by Disqualification (The Guerrero Special)");
      return;
    }

    if (type === "finisher") {
      if (isLadder || isCage) { addLog("No pin here — you need to climb!", "system"); return; }
      addLog("THE MONEY DROP! Big Splash connects! ONE — TWO — THREE!", "special");
      flash();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      endMatch("player", "Win by Pinfall — The Money Drop (Big Splash)");
      return;
    }

    const finalDmg = Math.max(3, damage + Math.floor(Math.random() * 5) - 2);
    const newOppStam = Math.max(0, activeOpponentStamina - finalDmg);

    setOpponentStaminas((prev) => {
      const next = [...prev];
      next[activeOpponentIdx] = newOppStam;
      return next;
    });

    if (type === "signature") {
      addLog(`MARKET CRASH connects! ${finalDmg} damage — ${activeOpponent.name} is rocked!`, "special");
      setMarketCrashCooldown(3);
      flash();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else if (type === "weapon") {
      heelUsedRef.current = true;
      addLog(`${activePlayerName} hits ${moveName} for ${finalDmg} damage! BRUTAL!`, "special");
      flash();
    } else {
      addLog(`${activePlayerName} hits ${moveName} for ${finalDmg} damage.`, "player");
    }

    checkNarrative(activeOpponent.id, newOppStam, activeOpponent.stamina);

    if (newOppStam === 0) {
      if (isLadder) {
        addLog(`${activeOpponent.name} is DOWN! Now ${activePlayerName} has to climb the ladder!`, "special");
      } else if (isCage) {
        addLog(`${activeOpponent.name} is weakened — the cage wall is there!`, "special");
        setIsOpponentTurn(true);
        setMarketCrashCooldown((c) => Math.max(0, c - 1));
      } else {
        const updatedStaminas = opponentStaminas.map((s, i) => i === activeOpponentIdx ? 0 : s);
        const nextAliveIdx = updatedStaminas.findIndex((s, i) => i !== activeOpponentIdx && s > 0);
        const allOppsEntered = wgOppEntered >= resolvedTeam.length;
        const allEnteredEliminated = allOppsEntered && updatedStaminas.every((s) => s === 0);
        const isWargamesWin = isWargames && allEnteredEliminated;

        if (isWargamesWin) {
          addLog(`${activeOpponent.name} is down! ALL enemies eliminated — ${activePlayerName}'s team wins WAR GAMES!`, "special");
          flash();
          endMatch("player", "Win — Last Team Standing (War Games)");
        } else if ((isTagMatch || isWargames) && nextAliveIdx >= 0) {
          addLog(`${activeOpponent.name} ELIMINATED! The next opponent steps in!`, "special");
          setActiveOpponentIdx(nextAliveIdx);
          setSignatureUsed(false);
          setIsOpponentTurn(true);
          setMarketCrashCooldown((c) => Math.max(0, c - 1));
        } else if (!isWargames) {
          addLog(`${activeOpponent.name} is out cold! ${activePlayerName} covers!`, "player");
          endMatch("player", isTagMatch ? "Win by Pinfall (Tag Elimination)" : "Win by Pinfall");
        } else {
          addLog("⏳ Ring is momentarily clear... the next entrant is inbound.", "system");
          setIsOpponentTurn(true);
          setMarketCrashCooldown((c) => Math.max(0, c - 1));
        }
      }
    } else {
      setIsOpponentTurn(true);
      setMarketCrashCooldown((c) => Math.max(0, c - 1));
    }
  };

  if (phase === "pre-match") {
    const playerTeamPhotos = [stevePhoto, ...partnerTeam.map((p) => getWrestlerPhoto(p.id))];
    const playerTeamNames = [playerName, ...partnerTeam.map((p) => p.name)];
    const oppTeamPhotos = resolvedTeam.map((o) => getWrestlerPhoto(o.id));
    const oppTeamNames = resolvedTeam.map((o) => o.name);

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.preMatch}>
          <Text style={[styles.preEra, { color: colors.mutedForeground }]}>
            {chapter?.venue ? `${chapter.venue} · ${chapter.city}` : "EXHIBITION MATCH"}
          </Text>
          {chapter?.stipulation && (
            <Text style={[styles.preStip, { color: colors.primary }]}>{chapter.stipulation}</Text>
          )}

          <View style={styles.faceoffRow}>
            <View style={styles.faceoffSide}>
              {isTagMatch && playerTeamPhotos.length > 1 ? (
                <View style={styles.teamStack}>
                  {playerTeamPhotos.map((photo, i) => (
                    <WrestlerPortrait
                      key={i}
                      photo={photo}
                      name={playerTeamNames[i] ?? ""}
                      isPlayer
                      size={i === 0 ? 100 : 70}
                      borderColor={colors.primary}
                    />
                  ))}
                </View>
              ) : (
                <WrestlerPortrait photo={stevePhoto} name={playerName} isPlayer size={120} borderColor={colors.primary} />
              )}
            </View>

            <View style={styles.vsCircle}>
              <Text style={[styles.vsText, { color: colors.mutedForeground }]}>VS</Text>
            </View>

            <View style={styles.faceoffSide}>
              {isTagMatch && oppTeamPhotos.length > 1 ? (
                <View style={styles.teamStack}>
                  {oppTeamPhotos.map((photo, i) => (
                    <WrestlerPortrait
                      key={i}
                      photo={photo}
                      name={oppTeamNames[i] ?? ""}
                      isPlayer={false}
                      size={i === 0 ? 100 : 70}
                      borderColor={colors.destructive}
                    />
                  ))}
                </View>
              ) : (
                <WrestlerPortrait photo={oppTeamPhotos[0]!} name={oppTeamNames[0]!} isPlayer={false} size={120} borderColor={colors.destructive} />
              )}
            </View>
          </View>

          <View style={[styles.preNote, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.preNoteText, { color: colors.mutedForeground }]}>
              {isWargames
                ? "WAR GAMES — Two rings, one massive cage. Teams enter one at a time every 5 turns. Eliminate every opponent to win. Last team standing."
                : isTagMatch
                ? "Tag match — use the Hot Tag once per match to bring in your partner. Heel tactics remain one-time-use."
                : "Turn-based match. Use moves, signature, and finisher strategically. Heel tactics are one-time-use per match."}
            </Text>
          </View>

          <Pressable
            style={[styles.startBtn, { backgroundColor: colors.primary }]}
            onPress={() => {
              setPhase("fighting");
              addLog(`The bell rings. ${isTagMatch ? "Tag match is underway!" : `${playerName} vs. ${activeOpponent.name}.`}`, "system");
              addLog(`${playerName} steps in first. The gear is on.`, "system");
            }}
          >
            <Text style={[styles.startBtnText, { color: colors.primaryForeground }]}>RING THE BELL</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (phase === "post-match") {
    if (matchFailed) {
      return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.postMatch}>
            <MaterialCommunityIcons name="book-cancel" size={52} color={colors.destructive} />
            <Text style={[styles.postResult, { color: colors.destructive }]}>CHAPTER FAILED</Text>
            <Text style={[styles.postReason, { color: colors.foreground }]}>
              The history books don't lie.{"\n"}Rich $teve won this one.
            </Text>
            <Text style={[styles.postTurns, { color: colors.mutedForeground }]}>
              Return to the chapter intro and try again.
            </Text>
            <View style={styles.postButtons}>
              {params.chapterId ? (
                <Pressable
                  style={[styles.postBtn, { backgroundColor: colors.primary }]}
                  onPress={() => router.replace({ pathname: "/cutscene", params: { chapterId: params.chapterId } })}
                >
                  <Text style={[styles.postBtnText, { color: colors.primaryForeground }]}>TRY AGAIN</Text>
                </Pressable>
              ) : null}
              <Pressable
                style={[styles.postBtn, { borderColor: colors.border, borderWidth: 1 }]}
                onPress={() => router.replace("/legacy")}
              >
                <Text style={[styles.postBtnText, { color: colors.foreground }]}>BACK TO LEGACY</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    const won = winner === "player";
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.postMatch}>
          <View style={styles.postPortraitRow}>
            <SmallPortrait photo={stevePhoto} size={64} borderColor={won ? colors.primary : colors.mutedForeground} />
            <MaterialCommunityIcons name={won ? "trophy" : "emoticon-sad"} size={44} color={won ? colors.primary : colors.mutedForeground} />
            <SmallPortrait photo={opponentPhoto} size={64} borderColor={won ? colors.mutedForeground : colors.destructive} />
          </View>
          <Text style={[styles.postResult, { color: won ? colors.primary : colors.destructive }]}>
            {won ? "VICTORY" : "DEFEAT"}
          </Text>
          <Text style={[styles.postReason, { color: colors.foreground }]}>{winReason}</Text>
          <Text style={[styles.postTurns, { color: colors.mutedForeground }]}>
            Turn {turn} · {activeOpponent.name} ended at {activeOpponentStamina}% stamina
          </Text>
          {isFreePlay && heatDelta !== null && (
            <View style={[
              styles.heatDeltaBadge,
              {
                borderColor: heatDelta >= 0 ? colors.primary : colors.destructive,
                backgroundColor: heatDelta >= 0 ? colors.primary + "22" : colors.destructive + "22",
              },
            ]}>
              <MaterialCommunityIcons name="fire" size={16} color={heatDelta >= 0 ? colors.primary : colors.destructive} />
              <Text style={[styles.heatDeltaText, { color: heatDelta >= 0 ? colors.primary : colors.destructive }]}>
                {heatDelta >= 0 ? `+${heatDelta}` : `${heatDelta}`} HEAT
              </Text>
            </View>
          )}
          <View style={styles.postButtons}>
            {!isExhibition && !isFreePlay && chapter && (
              <Pressable
                style={[styles.postBtn, { backgroundColor: colors.primary }]}
                onPress={() => router.replace({
                  pathname: "/cutscene",
                  params: { chapterId: chapter.id, showOutro: "true", playerWon: won ? "true" : "false" },
                })}
              >
                <Text style={[styles.postBtnText, { color: colors.primaryForeground }]}>CONTINUE STORY</Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.postBtn, { borderColor: colors.border, borderWidth: 1 }]}
              onPress={() => isFreePlay ? router.replace("/free-play") : router.back()}
            >
              <Text style={[styles.postBtnText, { color: colors.foreground }]}>
                {isFreePlay ? "BACK TO FREE PLAY" : "BACK"}
              </Text>
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
          style={[styles.flashOverlay, { opacity: flashAnim, backgroundColor: colors.primary }]}
          pointerEvents="none"
        />

        <View style={[styles.matchHUD, { borderBottomColor: colors.border }]}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={colors.mutedForeground} />
          </Pressable>

          <View style={styles.hudInner}>
            <View style={styles.hudFighter}>
              <SmallPortrait
                photo={partnerIn && activePartner ? getWrestlerPhoto(activePartner.id) : stevePhoto}
                size={44}
                borderColor={colors.primary}
              />
              <View style={styles.hudStaminaCol}>
                <View style={[styles.hudBar, { backgroundColor: colors.secondary }]}>
                  <View
                    style={[
                      styles.hudBarFill,
                      {
                        width: `${staminaPct(activePlayerStamina, activePlayerMaxStamina) * 100}%`,
                        backgroundColor: getStaminaColor(staminaPct(activePlayerStamina, activePlayerMaxStamina)),
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.hudName, { color: colors.primary }]}>
                  {partnerIn && activePartner ? activePartner.name.split(" ")[0]!.toUpperCase() : "$TEVE"}
                </Text>
              </View>
            </View>

            <Text style={[styles.hudTurn, { color: colors.mutedForeground }]}>T{turn}</Text>

            <View style={[styles.hudFighter, { flexDirection: "row-reverse" }]}>
              <SmallPortrait photo={opponentPhoto} size={44} borderColor={colors.destructive} />
              <View style={[styles.hudStaminaCol, { alignItems: "flex-end" }]}>
                <View style={[styles.hudBar, { backgroundColor: colors.secondary }]}>
                  <View
                    style={[
                      styles.hudBarFill,
                      {
                        width: `${staminaPct(activeOpponentStamina, activeOpponent.stamina) * 100}%`,
                        backgroundColor: getStaminaColor(staminaPct(activeOpponentStamina, activeOpponent.stamina)),
                        alignSelf: "flex-end",
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.hudName, { color: colors.destructive }]} numberOfLines={1}>
                  {activeOpponent.name.split(" ")[0]!.toUpperCase()}
                  {isTagMatch && resolvedTeam.length > 1 ? ` (${activeOpponentIdx + 1}/${resolvedTeam.length})` : ""}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ width: 40 }} />
        </View>

        {(isLadder || isCage) && showClimbButton && (
          <View style={[styles.climbBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.climbTrack, { backgroundColor: colors.secondary }]}>
              <View style={[styles.climbFill, { width: `${climbProgress}%`, backgroundColor: colors.primary }]} />
            </View>
            <Text style={[styles.climbLabel, { color: colors.primary }]}>
              {isLadder ? "LADDER CLIMB" : "CAGE ESCAPE"} — {climbProgress}%
            </Text>
          </View>
        )}

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
                  color: entry.type === "special" ? colors.primary
                    : entry.type === "player" ? colors.foreground
                    : entry.type === "opponent" ? colors.destructive
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
              {activeOpponent.name} is moving...
            </Text>
          )}
        </ScrollView>

        <View style={[styles.moves, { backgroundColor: colors.background }]}>
          {weaponMoves.length > 0 && (
            <View style={styles.movesRow}>
              {weaponMoves.map((wm) => (
                <Pressable
                  key={wm.name}
                  style={({ pressed }) => [
                    styles.moveBtn,
                    styles.weaponBtn,
                    {
                      borderColor: colors.destructive,
                      opacity: isOpponentTurn ? 0.4 : pressed ? 0.7 : 1,
                    },
                  ]}
                  disabled={isOpponentTurn}
                  onPress={() => playerMove(wm.name, wm.damage, "weapon")}
                >
                  <Text style={[styles.moveBtnText, { color: colors.destructive }]}>{wm.name}</Text>
                  <Text style={[styles.moveDmg, { color: colors.destructive }]}>{wm.damage}</Text>
                </Pressable>
              ))}
            </View>
          )}

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

            {showClimbButton ? (
              <Pressable
                style={({ pressed }) => [
                  styles.finBtn,
                  {
                    backgroundColor: !isOpponentTurn ? colors.primary : colors.secondary,
                    borderColor: colors.border,
                    opacity: isOpponentTurn ? 0.4 : pressed ? 0.85 : 1,
                  },
                ]}
                disabled={isOpponentTurn}
                onPress={handleClimb}
              >
                <MaterialCommunityIcons name="ladder" size={16} color={!isOpponentTurn ? colors.primaryForeground : colors.mutedForeground} />
                <Text style={[styles.finBtnText, { color: !isOpponentTurn ? colors.primaryForeground : colors.mutedForeground }]}>
                  {isLadder ? "CLIMB" : "ESCAPE"}
                </Text>
              </Pressable>
            ) : (
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
            )}
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
                style={[styles.heelBtn, { backgroundColor: colors.card, borderColor: colors.border, opacity: refManipUsed || isOpponentTurn || isCage ? 0.35 : 1 }]}
                disabled={refManipUsed || isOpponentTurn || isCage}
                onPress={() => playerMove("Ref Manipulation", 0, "refmanip")}
              >
                <Text style={[styles.heelBtnText, { color: colors.foreground }]}>{isCage ? "NO REF" : "REF MANIP"}</Text>
              </Pressable>

              <Pressable
                style={[styles.heelBtn, { backgroundColor: colors.card, borderColor: colors.border, opacity: guerreroUsed || isOpponentTurn || isNoDQ ? 0.35 : 1 }]}
                disabled={guerreroUsed || isOpponentTurn || isNoDQ}
                onPress={() => playerMove("Guerrero Special", 0, "guerrero")}
              >
                <Text style={[styles.heelBtnText, { color: colors.foreground }]}>{isNoDQ ? "NO DQ" : "GUERRERO"}</Text>
              </Pressable>

              {isTagMatch && partnerTeam.length > 0 && (
                <Pressable
                  style={[styles.heelBtn, { backgroundColor: tagUsed ? colors.card : colors.accent, borderColor: colors.border, opacity: tagUsed || isOpponentTurn ? 0.35 : 1 }]}
                  disabled={tagUsed || isOpponentTurn}
                  onPress={handleHotTag}
                >
                  <Text style={[styles.heelBtnText, { color: tagUsed ? colors.foreground : "#fff" }]}>
                    {tagUsed ? "TAGGED" : "HOT TAG"}
                  </Text>
                </Pressable>
              )}
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
  preStip: { fontSize: 12, fontFamily: "Inter_700Bold", letterSpacing: 1, textAlign: "center" },

  faceoffRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12, marginVertical: 8, width: "100%" },
  faceoffSide: { flex: 1, alignItems: "center" },
  teamStack: { gap: 6, alignItems: "center" },
  vsCircle: { alignItems: "center", justifyContent: "center" },
  vsText: { fontSize: 22, fontFamily: "Inter_700Bold" },

  portraitBox: { overflow: "hidden", position: "relative" },
  portraitImg: { width: "100%", height: "100%" },
  portraitPlaceholder: { alignItems: "center", justifyContent: "center", gap: 4 },
  portraitNameBar: { position: "absolute", bottom: 0, left: 0, right: 0, paddingVertical: 4, paddingHorizontal: 6, alignItems: "center" },
  portraitNameText: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 1, color: "#FFFFFF" },

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

  matchHUD: { flexDirection: "row", alignItems: "center", paddingHorizontal: 8, paddingVertical: 10, borderBottomWidth: 1, gap: 4 },
  backBtn: { width: 40, height: 44, alignItems: "center", justifyContent: "center" },
  hudInner: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  hudFighter: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  hudStaminaCol: { flex: 1 },
  hudBar: { height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 3 },
  hudBarFill: { height: "100%", borderRadius: 4 },
  hudName: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  hudTurn: { fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1, textAlign: "center", minWidth: 28 },

  climbBar: { paddingHorizontal: 12, paddingVertical: 6, borderBottomWidth: 1, gap: 4 },
  climbTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  climbFill: { height: "100%", borderRadius: 3 },
  climbLabel: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 2, textAlign: "center" },

  logArea: { flex: 1, borderTopWidth: 1, borderBottomWidth: 1 },
  logEntry: { fontSize: 13, lineHeight: 20 },

  moves: { paddingTop: 8, paddingBottom: 4 },
  movesRow: { flexDirection: "row", paddingHorizontal: 8, gap: 6, marginBottom: 8 },
  moveBtn: { flex: 1, borderWidth: 1, borderRadius: 6, paddingVertical: 10, alignItems: "center", gap: 2 },
  weaponBtn: { backgroundColor: "transparent" },
  moveBtnText: { fontSize: 9, fontFamily: "Inter_600SemiBold", letterSpacing: 0.5, textAlign: "center" },
  moveDmg: { fontSize: 9, fontFamily: "Inter_700Bold" },

  specialRow: { flexDirection: "row", paddingHorizontal: 8, gap: 8, marginBottom: 8 },
  sigBtn: { flex: 1, borderWidth: 1, borderRadius: 6, paddingVertical: 10, paddingHorizontal: 12, alignItems: "center" },
  sigBtnText: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  sigSub: { fontSize: 9, fontFamily: "Inter_400Regular", marginTop: 2 },
  finBtn: { flex: 1, borderWidth: 1, borderRadius: 6, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  finBtnText: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1 },

  heelRow: { paddingHorizontal: 8, paddingBottom: 8 },
  heelLabel: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 2, marginBottom: 6 },
  heelBtns: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  heelBtn: { flex: 1, minWidth: 70, borderWidth: 1, borderRadius: 6, paddingVertical: 8, alignItems: "center" },
  heelBtnText: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 0.5 },

  heatDeltaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  heatDeltaText: { fontSize: 20, fontFamily: "Inter_700Bold", letterSpacing: 2 },
});
