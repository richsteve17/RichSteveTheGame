import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { getWrestlerPhoto } from "@/constants/wrestlerPhotos";

const FACTIONS = [
  {
    name: "PROJECT MAYHEM",
    color: "#D4AF37",
    logo: null as any,
    members: ["Rich $teve", "Mac Mayhem", "Ryan Vox", "Wrex Savage"],
    memberIds: ["rich-steve", "mac-mayhem", "ryan-vox", "wrex-savage"],
    manager: "Kory Cross",
    higherPower: "Jay Cortez",
    description:
      "The Rampage invasion force. Born from the Coalition when Matt Wylde turned on Riot City. Phase 1: $teve, Mac, Kory Cross, and #BRUH. Phase 2: The Livewire Ryan Vox and Wrex Savage. The Emphasis on ME split almost destroyed it.",
  },
  {
    name: "#BRUH",
    color: "#60a5fa",
    logo: null as any,
    members: ["Johnny Xross", "Ray Rumble"],
    memberIds: ["johnny-xross", "ray-rumble"],
    manager: "George Burkett",
    higherPower: null,
    description:
      "Started inside The Coalition. Turned babyface December 2017. Became Rampage Tag Team Champions. The Lethal Lottery made Ray Rumble the most expensive transaction of $teve's career. Johnny Xross (L) · George Burkett mgr (C) · Ray Rumble (R).",
  },
  {
    name: "RIOT CITY'S MOST WANTED",
    color: "#ef4444",
    logo: null as any,
    members: ["Siccend", "Vic Ramone", "Jason Andrews"],
    memberIds: ["siccend", "vic-ramone", "jason-drake"],
    manager: null,
    higherPower: null,
    description:
      "The original power of Rampage. Defended their territory against the Coalition invasion until their own Matt Wylde flipped. Everything about Project Mayhem started with beating RCMW.",
  },
  {
    name: "410 MASSIV",
    color: "#888888",
    logo: null as any,
    members: ["R.D. Cordova", "Andre Cash"],
    memberIds: ["rd-cordova", "andre-cash"],
    manager: null,
    higherPower: null,
    description: "Tag team. R.D. Cordova was pinned by $teve to end Big Mike's run as ring announcer.",
  },
  {
    name: "THE TALENT AGENCY",
    color: "#D4AF37",
    logo: null as any,
    members: ["Beard Villain Johnny Malloy"],
    memberIds: ["johnny-malloy"],
    manager: null,
    higherPower: null,
    description:
      "Former Rampage Heavyweight Champion Johnny Malloy led this group. The one man $teve publicly respected: 'I still respect him because he did bring people in.'",
  },
  {
    name: "RUFFNECKS",
    color: "#888888",
    logo: null as any,
    members: ["Muddy Waters", "Josh Austin"],
    memberIds: ["muddy-waters"],
    manager: null,
    higherPower: null,
    description: "Rampage tag team.",
  },
  {
    name: "LEGENDS & ATTRACTIONS",
    color: "#60a5fa",
    logo: null as any,
    members: ["Shane Douglas", "Justin Credible"],
    memberIds: ["shane-douglas", "justin-credible"],
    manager: null,
    higherPower: null,
    description:
      "ECW originals brought in as Rampage attractions. Shane Douglas (The Franchise) and Justin Credible represented the old guard.",
  },
];


function FactionMemberPhotos({ memberIds }: { memberIds: string[] }) {
  const colors = useColors();
  const photos = memberIds.map((id) => ({ id, photo: getWrestlerPhoto(id) })).filter((p) => p.photo);
  if (photos.length === 0) return null;
  return (
    <View style={styles.factionPhotos}>
      {photos.map(({ id, photo }) => (
        <View key={id} style={[styles.factionThumb, { borderColor: colors.border }]}>
          <Image source={photo} style={styles.factionThumbImg} resizeMode="cover" />
        </View>
      ))}
    </View>
  );
}


export default function RosterScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPad + 8, paddingBottom: insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageHeader}>
        <Text style={[styles.pageTitle, { color: colors.primary }]}>RAMPAGE ROSTER</Text>
        <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
          THE REAL NAMES · THE REAL PEOPLE
        </Text>
      </View>

      {FACTIONS.map((faction) => (
        <View key={faction.name} style={[styles.factionBlock, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <View style={[styles.factionAccent, { backgroundColor: faction.color }]} />
          <View style={styles.factionContent}>
            <View style={styles.factionHeader}>
              <Text style={[styles.factionName, { color: faction.color }]}>{faction.name}</Text>
              {faction.manager && (
                <Text style={[styles.factionRole, { color: colors.mutedForeground }]}>
                  MGR: {faction.manager}
                </Text>
              )}
              {faction.higherPower && (
                <Text style={[styles.factionRole, { color: colors.mutedForeground }]}>
                  HIGHER POWER: {faction.higherPower}
                </Text>
              )}
            </View>
            <FactionMemberPhotos memberIds={faction.memberIds} />
            <Text style={[styles.factionDesc, { color: colors.mutedForeground }]}>
              {faction.description}
            </Text>
            <View style={styles.factionMembers}>
              {faction.members.map((m) => (
                <View key={m} style={[styles.memberPill, { backgroundColor: colors.secondary }]}>
                  <Text style={[styles.memberPillText, { color: colors.foreground }]}>{m}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}

      <View style={[styles.noteBlock, { borderColor: colors.border }]}>
        <Text style={[styles.noteTitle, { color: colors.primary }]}>SUIT RULE</Text>
        <Text style={[styles.noteText, { color: colors.mutedForeground }]}>
          Rich $teve only wore wrestling gear during active matches. For promos, segments, or managing outside the ring — suits only. "Why would I wear gear if I'm not wrestling? That's what idiots and poor people do."
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: { paddingHorizontal: 24, paddingBottom: 16 },
  pageTitle: { fontSize: 28, fontFamily: "Inter_700Bold", letterSpacing: 2 },
  pageSubtitle: { fontSize: 11, fontFamily: "Inter_500Medium", letterSpacing: 2, marginTop: 4 },
  toggle: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
  },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: "center" },
  toggleText: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },

  factionBlock: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
  },
  factionAccent: { width: 4 },
  factionContent: { flex: 1, padding: 14 },
  factionHeader: { marginBottom: 8 },
  factionName: { fontSize: 14, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },
  factionRole: { fontSize: 11, fontFamily: "Inter_500Medium", marginTop: 2 },
  factionPhotos: { flexDirection: "row", gap: 6, marginBottom: 10 },
  factionThumb: { width: 52, height: 52, borderRadius: 6, overflow: "hidden", borderWidth: 1 },
  factionThumbImg: { width: "100%", height: "100%" },
  factionDesc: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 10 },
  factionMembers: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  memberPill: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  memberPillText: { fontSize: 11, fontFamily: "Inter_500Medium" },

  wrestlerCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  wrestlerRow: { flexDirection: "row", alignItems: "center", padding: 12, gap: 10 },
  wrestlerPhoto: {
    width: 56,
    height: 56,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1.5,
  },
  wrestlerPhotoImg: { width: "100%", height: "100%" },
  wrestlerPhotoPlaceholder: { alignItems: "center", justifyContent: "center" },
  wrestlerInfo: { flex: 1 },
  wrestlerName: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  wrestlerRole: { fontSize: 11, fontFamily: "Inter_500Medium", marginTop: 1 },
  wrestlerFaction: { fontSize: 10, fontFamily: "Inter_400Regular", marginTop: 1 },
  wrestlerRight: { alignItems: "center", gap: 2, paddingLeft: 8 },
  wrestlerStamina: { fontSize: 11, fontFamily: "Inter_700Bold" },

  expandedContent: { padding: 14, paddingTop: 12, borderTopWidth: 1 },
  expandedPhotoWrap: { width: "100%", height: 180, borderRadius: 6, overflow: "hidden", marginBottom: 12 },
  expandedPhoto: { width: "100%", height: "100%" },
  wrestlerBio: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 20 },
  moveBadge: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  moveBadgeText: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 1 },

  ratingsCard: {
    marginTop: 14,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  ratingsHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  ratingsTitle: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 3 },
  leakedBadge: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  leakedText: { fontSize: 8, fontFamily: "Inter_700Bold", letterSpacing: 1.5, color: "#ef4444" },
  ratingsBody: { flexDirection: "row", alignItems: "center", gap: 14 },
  ratingBars: { flex: 1, gap: 5 },

  ratingBarRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  ratingBarLabel: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 0.5, width: 34, textAlign: "right" },
  ratingBarTrack: { flex: 1, height: 6, borderRadius: 3, overflow: "hidden" },
  ratingBarFill: { height: "100%", borderRadius: 3 },
  ratingBarValue: { fontSize: 10, fontFamily: "Inter_700Bold", width: 24, textAlign: "right" },
  ratingBarGrade: { fontSize: 9, fontFamily: "Inter_700Bold", width: 12, textAlign: "center" },

  ovrBadge: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  ovrNumber: { fontFamily: "Inter_700Bold" },
  ovrLabel: { fontFamily: "Inter_700Bold", letterSpacing: 1, marginTop: -2 },

  leaderboardHeader: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  leakedStamp: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  leakedStampText: { fontSize: 9, fontFamily: "Inter_700Bold", letterSpacing: 1.5 },
  leaderboardTitle: { fontSize: 22, fontFamily: "Inter_700Bold", letterSpacing: 3 },
  leaderboardSubtitle: { fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 4 },

  rankCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rankNum: { fontSize: 14, fontFamily: "Inter_700Bold", width: 28, textAlign: "center" },
  rankPhoto: {
    width: 46,
    height: 46,
    borderRadius: 5,
    overflow: "hidden",
    borderWidth: 1.5,
  },
  rankPhotoImg: { width: "100%", height: "100%" },
  rankPhotoPlaceholder: { alignItems: "center", justifyContent: "center" },
  rankInfo: { flex: 1 },
  rankName: { fontSize: 13, fontFamily: "Inter_600SemiBold", marginBottom: 4 },
  rankMiniStats: { flexDirection: "row", gap: 6 },
  rankMiniStat: { alignItems: "center" },
  rankMiniLabel: { fontSize: 7, fontFamily: "Inter_700Bold", letterSpacing: 0.5 },
  rankMiniValue: { fontSize: 11, fontFamily: "Inter_700Bold" },

  noteBlock: { margin: 16, borderWidth: 1, borderRadius: 8, padding: 16 },
  noteTitle: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 3, marginBottom: 8 },
  noteText: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18, fontStyle: "italic" },
});
