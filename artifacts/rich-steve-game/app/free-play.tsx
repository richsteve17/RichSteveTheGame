import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { ComponentProps, useState } from "react";
import {
  DimensionValue,
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
import { WRESTLERS, RICH_STEVE } from "@/constants/gameData";
import { getWrestlerPhoto } from "@/constants/wrestlerPhotos";

type MCIName = ComponentProps<typeof MaterialCommunityIcons>["name"];
type HeatTier = "unknown" | "local" | "regional" | "national" | "main-event";

const STIPULATIONS: { label: string; value: string; heatRequired: number; icon: MCIName }[] = [
  { label: "Standard Match",    value: "Standard Match",      heatRequired: 0,  icon: "sword-cross"    },
  { label: "No-DQ / Hardcore",  value: "No Disqualification", heatRequired: 10, icon: "fire"           },
  { label: "Ladder Match",      value: "Ladder Match",        heatRequired: 25, icon: "sort-ascending" },
  { label: "Steel Cage Match",  value: "Steel Cage Match",    heatRequired: 40, icon: "gate"           },
];

const TIER_OVR_CAP: Record<HeatTier, number> = {
  "unknown":    60,
  "local":      70,
  "regional":   80,
  "national":   999,
  "main-event": 999,
};

const TIER_COLOR: Record<HeatTier, string> = {
  "unknown":    "#888888",
  "local":      "#f97316",
  "regional":   "#3b82f6",
  "national":   "#22c55e",
  "main-event": "#D4AF37",
};

function tierLabel(tier: HeatTier) {
  if (tier === "main-event") return "MAIN EVENT";
  return tier.toUpperCase();
}

export default function FreePlayScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { gameState } = useGame();
  const fp = gameState.freePlayStats;
  const tier = fp.heatTier as HeatTier;
  const tColor = TIER_COLOR[tier];
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const isMainEvent = tier === "main-event";
  const ovrCap = TIER_OVR_CAP[tier];

  const allFighters = WRESTLERS.filter((w) => w.role !== "Manager" && w.ratings);
  const bossWrestler = allFighters.sort((a, b) => (b.ratings?.overall ?? 0) - (a.ratings?.overall ?? 0))[0] ?? null;

  const availableOpponents = allFighters
    .filter((w) => w.ratings && w.ratings.overall <= ovrCap)
    .sort((a, b) => (b.ratings?.overall ?? 0) - (a.ratings?.overall ?? 0));

  const availableStips = STIPULATIONS.filter((s) => fp.heat >= s.heatRequired);
  const lockedStips = STIPULATIONS.filter((s) => fp.heat < s.heatRequired);
  const availablePartners = allFighters.sort((a, b) => (b.ratings?.overall ?? 0) - (a.ratings?.overall ?? 0));

  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [stipulation, setStipulation] = useState(STIPULATIONS[0]!.value);
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [pickingPartner, setPickingPartner] = useState(false);
  const [isTitleMatch, setIsTitleMatch] = useState(false);

  const isBossSelected = bossWrestler && opponentId === bossWrestler.id;
  const selectedOpponent = opponentId
    ? (allFighters.find((w) => w.id === opponentId) ?? null)
    : null;
  const selectedPartner = partnerId
    ? (availablePartners.find((w) => w.id === partnerId) ?? null)
    : null;

  const heatBarWidth: DimensionValue = `${Math.min(100, fp.heat)}%`;
  const selectedPartnerPhoto = selectedPartner ? getWrestlerPhoto(selectedPartner.id) : null;

  const startMatch = () => {
    if (!opponentId || !selectedOpponent) return;
    router.push({
      pathname: "/match",
      params: {
        opponentId,
        chapterId: "",
        mode: "freePlay",
        stipulationParam: stipulation,
        freePlayOpponentOvr: String(selectedOpponent.ratings?.overall ?? 70),
        partnerId: partnerId ?? "",
        isTitleMatch: isTitleMatch ? "true" : "false",
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad + 8, paddingBottom: insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Pressable style={styles.backRow} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color={colors.primary} />
            <Text style={[styles.backText, { color: colors.primary }]}>CAREER</Text>
          </Pressable>
          <View style={[styles.modeBadge, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.modeBadgeText, { color: colors.foreground }]}>FREE PLAY</Text>
          </View>
          <Text style={[styles.pageTitle, { color: colors.foreground }]}>Your Career, Your Rules</Text>
        </View>

        <View style={[styles.heatCard, { backgroundColor: colors.card, borderColor: tColor }]}>
          <View style={styles.heatRow}>
            <MaterialCommunityIcons name="fire" size={22} color={tColor} />
            <Text style={[styles.heatValue, { color: tColor }]}>{fp.heat} HEAT</Text>
            <View style={[styles.tierBadge, { backgroundColor: tColor + "22", borderColor: tColor }]}>
              <Text style={[styles.tierBadgeText, { color: tColor }]}>{tierLabel(tier)}</Text>
            </View>
          </View>
          <View style={[styles.heatBarBg, { backgroundColor: colors.border }]}>
            <View style={[styles.heatBarFill, { width: heatBarWidth, backgroundColor: tColor }]} />
          </View>
          <View style={styles.statsRow}>
            <Text style={[styles.statItem, { color: colors.mutedForeground }]}>
              {fp.wins}W · {fp.losses}L · {fp.totalMatches} matches
            </Text>
            <Text style={[styles.statItem, { color: colors.mutedForeground }]}>
              {fp.opponentsBeaten.length} unique beaten
            </Text>
          </View>
        </View>

        {isMainEvent && bossWrestler && (
          <View style={[styles.bossSection, { borderColor: "#D4AF37", backgroundColor: "#D4AF3711" }]}>
            <View style={styles.bossTitleRow}>
              <MaterialCommunityIcons name="crown" size={18} color="#D4AF37" />
              <Text style={[styles.bossSectionTitle, { color: "#D4AF37" }]}>MAIN EVENT UNLOCKED</Text>
            </View>
            <Text style={[styles.bossDesc, { color: colors.mutedForeground }]}>
              You've reached maximum heat. The final boss is available. Win this and you've made it.
            </Text>
            <Pressable
              style={[
                styles.bossCard,
                {
                  borderColor: opponentId === bossWrestler.id ? "#D4AF37" : "#D4AF3766",
                  backgroundColor: opponentId === bossWrestler.id ? "#D4AF3733" : colors.card,
                },
              ]}
              onPress={() => setOpponentId(bossWrestler.id === opponentId ? null : bossWrestler.id)}
            >
              {(() => {
                const bossPhoto = getWrestlerPhoto(bossWrestler.id);
                return bossPhoto ? (
                  <View style={[styles.miniPhoto, { borderColor: "#D4AF37" }]}>
                    <Image source={bossPhoto} style={styles.miniPhotoImg} resizeMode="cover" />
                  </View>
                ) : (
                  <View style={[styles.miniPhoto, styles.miniPhotoPlaceholder, { borderColor: "#D4AF37" }]}>
                    <MaterialCommunityIcons name="account" size={16} color="#D4AF37" />
                  </View>
                );
              })()}
              <View style={styles.bossInfo}>
                <Text style={[styles.rosterName, { color: opponentId === bossWrestler.id ? "#D4AF37" : colors.foreground }]}>
                  {bossWrestler.name}
                </Text>
                <View style={[styles.beatenBadge, { backgroundColor: "#D4AF3722" }]}>
                  <Text style={[styles.beatenText, { color: "#D4AF37" }]}>FINAL BOSS</Text>
                </View>
              </View>
              <Text style={[styles.rosterOvr, { color: "#D4AF37" }]}>
                OVR {bossWrestler.ratings?.overall}
              </Text>
            </Pressable>
          </View>
        )}

        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>STIPULATION</Text>
          {availableStips.map((s) => (
            <Pressable
              key={s.value}
              style={[
                styles.stipRow,
                {
                  borderColor: stipulation === s.value ? colors.primary : colors.border,
                  backgroundColor: stipulation === s.value ? colors.primary + "22" : colors.card,
                },
              ]}
              onPress={() => setStipulation(s.value)}
            >
              <MaterialCommunityIcons
                name={s.icon}
                size={18}
                color={stipulation === s.value ? colors.primary : colors.foreground}
              />
              <Text style={[styles.stipLabel, { color: stipulation === s.value ? colors.primary : colors.foreground }]}>
                {s.label}
              </Text>
              {stipulation === s.value && (
                <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
              )}
            </Pressable>
          ))}
          {lockedStips.map((s) => (
            <View
              key={s.value}
              style={[styles.stipRow, { borderColor: colors.border, backgroundColor: colors.card, opacity: 0.4 }]}
            >
              <Ionicons name="lock-closed" size={16} color={colors.mutedForeground} />
              <Text style={[styles.stipLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
              <Text style={[styles.stipLock, { color: colors.mutedForeground }]}>{s.heatRequired} heat</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { borderColor: isTitleMatch ? colors.primary : colors.border }]}>
          <Pressable style={styles.toggleRow} onPress={() => setIsTitleMatch((v) => !v)}>
            <MaterialCommunityIcons
              name={isTitleMatch ? "checkbox-marked" : "checkbox-blank-outline"}
              size={22}
              color={isTitleMatch ? colors.primary : colors.mutedForeground}
            />
            <View style={styles.toggleInfo}>
              <Text style={[styles.toggleLabel, { color: isTitleMatch ? colors.primary : colors.foreground }]}>
                CHAMPIONSHIP MATCH
              </Text>
              <Text style={[styles.toggleHint, { color: colors.mutedForeground }]}>
                Win a title match: +4 heat bonus
              </Text>
            </View>
            {isTitleMatch && (
              <MaterialCommunityIcons name="crown" size={18} color={colors.primary} />
            )}
          </Pressable>
        </View>

        <View style={[styles.section, { borderColor: colors.border }]}>
          <View style={styles.sectionTitleRow}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>PARTNER (OPTIONAL)</Text>
            {selectedPartner && (
              <Pressable onPress={() => { setPartnerId(null); setPickingPartner(false); }}>
                <Text style={[styles.clearBtn, { color: colors.mutedForeground }]}>CLEAR</Text>
              </Pressable>
            )}
          </View>
          {selectedPartner ? (
            <Pressable
              style={[styles.selectedCard, { borderColor: colors.primary, backgroundColor: colors.card }]}
              onPress={() => setPickingPartner((v) => !v)}
            >
              {selectedPartnerPhoto && (
                <View style={[styles.miniPhoto, { borderColor: colors.primary }]}>
                  <Image source={selectedPartnerPhoto} style={styles.miniPhotoImg} resizeMode="cover" />
                </View>
              )}
              <Text style={[styles.selectedName, { color: colors.primary }]}>{selectedPartner.name}</Text>
              <Text style={[styles.selectedOvr, { color: colors.primary }]}>OVR {selectedPartner.ratings?.overall}</Text>
            </Pressable>
          ) : (
            <Pressable
              style={[styles.addPartnerBtn, { borderColor: colors.border }]}
              onPress={() => setPickingPartner((v) => !v)}
            >
              <MaterialCommunityIcons name="account-plus" size={18} color={colors.mutedForeground} />
              <Text style={[styles.addPartnerText, { color: colors.mutedForeground }]}>
                {pickingPartner ? "HIDE LIST" : "ADD A TAG PARTNER"}
              </Text>
            </Pressable>
          )}
          {pickingPartner && (
            <View style={styles.partnerList}>
              {availablePartners
                .filter((w) => w.id !== opponentId && w.id !== RICH_STEVE.id)
                .map((w) => {
                  const photo = getWrestlerPhoto(w.id);
                  const sel = w.id === partnerId;
                  return (
                    <Pressable
                      key={w.id}
                      style={[
                        styles.rosterRow,
                        {
                          borderColor: sel ? colors.primary : colors.border,
                          backgroundColor: sel ? colors.primary + "22" : colors.card,
                        },
                      ]}
                      onPress={() => { setPartnerId(w.id); setPickingPartner(false); }}
                    >
                      {photo ? (
                        <View style={[styles.miniPhoto, { borderColor: sel ? colors.primary : colors.border }]}>
                          <Image source={photo} style={styles.miniPhotoImg} resizeMode="cover" />
                        </View>
                      ) : (
                        <View style={[styles.miniPhoto, styles.miniPhotoPlaceholder, { borderColor: colors.border }]}>
                          <MaterialCommunityIcons name="account" size={16} color={colors.mutedForeground} />
                        </View>
                      )}
                      <Text
                        style={[styles.rosterName, { color: sel ? colors.primary : colors.foreground }]}
                        numberOfLines={1}
                      >
                        {w.name}
                      </Text>
                      <Text style={[styles.rosterOvr, { color: sel ? colors.primary : colors.mutedForeground }]}>
                        OVR {w.ratings?.overall}
                      </Text>
                    </Pressable>
                  );
                })}
            </View>
          )}
        </View>

        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            OPPONENT — {tierLabel(tier)} TIER
          </Text>
          <Text style={[styles.sectionHint, { color: colors.mutedForeground }]}>
            {tier === "unknown"
              ? "Build your heat to unlock higher-rated opponents."
              : tier === "national" || tier === "main-event"
              ? "Full roster unlocked."
              : `OVR ${ovrCap} cap. Earn more heat to face elite opponents.`}
          </Text>
          {availableOpponents
            .filter((w) => !(isMainEvent && bossWrestler && w.id === bossWrestler.id))
            .map((w) => {
              const photo = getWrestlerPhoto(w.id);
              const sel = w.id === opponentId;
              return (
                <Pressable
                  key={w.id}
                  style={[
                    styles.rosterRow,
                    {
                      borderColor: sel ? colors.primary : colors.border,
                      backgroundColor: sel ? colors.primary + "22" : colors.card,
                    },
                  ]}
                  onPress={() => setOpponentId(w.id === opponentId ? null : w.id)}
                >
                  {photo ? (
                    <View style={[styles.miniPhoto, { borderColor: sel ? colors.primary : colors.border }]}>
                      <Image source={photo} style={styles.miniPhotoImg} resizeMode="cover" />
                    </View>
                  ) : (
                    <View style={[styles.miniPhoto, styles.miniPhotoPlaceholder, { borderColor: colors.border }]}>
                      <MaterialCommunityIcons name="account" size={16} color={colors.mutedForeground} />
                    </View>
                  )}
                  <Text
                    style={[styles.rosterName, { color: sel ? colors.primary : colors.foreground }]}
                    numberOfLines={1}
                  >
                    {w.name}
                  </Text>
                  {fp.opponentsBeaten.includes(w.id) && (
                    <View style={[styles.beatenBadge, { backgroundColor: colors.primary + "22" }]}>
                      <Text style={[styles.beatenText, { color: colors.primary }]}>BEATEN</Text>
                    </View>
                  )}
                  <Text style={[styles.rosterOvr, { color: sel ? colors.primary : colors.mutedForeground }]}>
                    OVR {w.ratings?.overall}
                  </Text>
                </Pressable>
              );
            })}
          {availableOpponents.length === 0 && (
            <Text style={[styles.emptyNote, { color: colors.mutedForeground }]}>
              No opponents available. Earn heat to unlock them.
            </Text>
          )}
        </View>
      </ScrollView>

      {selectedOpponent ? (
        <View
          style={[
            styles.bottomBar,
            {
              backgroundColor: colors.background,
              borderTopColor: isBossSelected ? "#D4AF37" : colors.border,
              paddingBottom: insets.bottom + 90,
            },
          ]}
        >
          <View style={styles.matchupInfo}>
            <Text style={[styles.matchupName, { color: colors.foreground }]}>
              {RICH_STEVE.name}{selectedPartner ? ` & ${selectedPartner.name}` : ""} vs {selectedOpponent.name}
            </Text>
            <Text style={[styles.matchupStip, { color: colors.mutedForeground }]}>
              {stipulation}{isTitleMatch ? " · CHAMPIONSHIP" : ""}
            </Text>
          </View>
          <Pressable
            style={[styles.fightBtn, { backgroundColor: isBossSelected ? "#D4AF37" : colors.primary }]}
            onPress={startMatch}
          >
            <MaterialCommunityIcons
              name="sword-cross"
              size={20}
              color={colors.primaryForeground}
            />
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
            Select an opponent above to start booking
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: { paddingHorizontal: 24, paddingBottom: 12 },
  backRow: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 14 },
  backText: { fontSize: 12, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },
  modeBadge: { alignSelf: "flex-start", borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 10 },
  modeBadgeText: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  pageTitle: { fontSize: 22, fontFamily: "Inter_700Bold" },

  heatCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
  },
  heatRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  heatValue: { fontSize: 22, fontFamily: "Inter_700Bold", letterSpacing: 1, flex: 1 },
  tierBadge: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 },
  tierBadgeText: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  heatBarBg: { height: 6, borderRadius: 3, overflow: "hidden", marginBottom: 8 },
  heatBarFill: { height: "100%", borderRadius: 3 },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statItem: { fontSize: 11, fontFamily: "Inter_400Regular" },

  bossSection: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
    gap: 10,
  },
  bossTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  bossSectionTitle: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  bossDesc: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  bossCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  bossInfo: { flex: 1, gap: 4 },

  section: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    gap: 8,
  },
  sectionTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 2, marginBottom: 4 },
  sectionHint: { fontSize: 11, fontFamily: "Inter_400Regular", marginBottom: 4 },
  clearBtn: { fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 },

  stipRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    gap: 10,
  },
  stipLabel: { flex: 1, fontSize: 13, fontFamily: "Inter_500Medium" },
  stipLock: { fontSize: 10, fontFamily: "Inter_500Medium" },

  toggleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  toggleInfo: { flex: 1 },
  toggleLabel: { fontSize: 13, fontFamily: "Inter_700Bold", letterSpacing: 0.5 },
  toggleHint: { fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 2 },

  selectedCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    gap: 10,
  },
  selectedName: { flex: 1, fontSize: 13, fontFamily: "Inter_600SemiBold" },
  selectedOvr: { fontSize: 13, fontFamily: "Inter_700Bold" },
  addPartnerBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: "dashed",
    padding: 12,
    gap: 8,
  },
  addPartnerText: { fontSize: 12, fontFamily: "Inter_500Medium", letterSpacing: 1 },
  partnerList: { gap: 6 },

  rosterRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    gap: 10,
  },
  miniPhoto: { width: 36, height: 36, borderRadius: 4, overflow: "hidden", borderWidth: 1.5 },
  miniPhotoImg: { width: "100%", height: "100%" },
  miniPhotoPlaceholder: { alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" },
  rosterName: { flex: 1, fontSize: 13, fontFamily: "Inter_500Medium" },
  beatenBadge: { borderRadius: 3, paddingHorizontal: 5, paddingVertical: 1 },
  beatenText: { fontSize: 8, fontFamily: "Inter_700Bold", letterSpacing: 1 },
  rosterOvr: { fontSize: 13, fontFamily: "Inter_700Bold" },
  emptyNote: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center", paddingVertical: 8 },

  bottomBar: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    borderTopWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  matchupInfo: { flex: 1 },
  matchupName: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  matchupStip: { fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 2 },
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
    bottom: 0, left: 0, right: 0,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  hintText: { fontSize: 12, fontFamily: "Inter_400Regular" },
});
