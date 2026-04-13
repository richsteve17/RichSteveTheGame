import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { WRESTLERS } from "@/constants/gameData";
import { getWrestlerPhoto } from "@/constants/wrestlerPhotos";

const ROLE_COLORS: Record<string, string> = {
  "Main Event": "#D4AF37",
  Midcard: "#888888",
  "Women's Division": "#c084fc",
  Legend: "#60a5fa",
  Manager: "#f87171",
};

const STYLE_ICONS: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Technical: "cog",
  Power: "arm-flex",
  Brawler: "boxing-glove",
  "High-Flyer": "airplane",
  Cerebral: "brain",
};

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

type ViewMode = "factions" | "all";

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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("factions");

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

      <View style={[styles.toggle, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Pressable
          style={[styles.toggleBtn, view === "factions" && { backgroundColor: colors.primary }]}
          onPress={() => setView("factions")}
        >
          <Text style={[styles.toggleText, { color: view === "factions" ? colors.primaryForeground : colors.mutedForeground }]}>
            FACTIONS
          </Text>
        </Pressable>
        <Pressable
          style={[styles.toggleBtn, view === "all" && { backgroundColor: colors.primary }]}
          onPress={() => setView("all")}
        >
          <Text style={[styles.toggleText, { color: view === "all" ? colors.primaryForeground : colors.mutedForeground }]}>
            ALL WRESTLERS
          </Text>
        </Pressable>
      </View>

      {view === "factions" &&
        FACTIONS.map((faction) => (
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

      {view === "all" &&
        WRESTLERS.map((w) => {
          const expanded = expandedId === w.id;
          const roleColor = ROLE_COLORS[w.role] ?? colors.mutedForeground;
          const styleIcon = STYLE_ICONS[w.style] ?? "help-circle";
          const photo = getWrestlerPhoto(w.id);

          return (
            <Pressable
              key={w.id}
              style={({ pressed }) => [
                styles.wrestlerCard,
                {
                  backgroundColor: colors.card,
                  borderColor: expanded ? colors.primary : colors.border,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              onPress={() => setExpandedId(expanded ? null : w.id)}
            >
              <View style={styles.wrestlerRow}>
                {photo ? (
                  <View style={[styles.wrestlerPhoto, { borderColor: roleColor }]}>
                    <Image source={photo} style={styles.wrestlerPhotoImg} resizeMode="cover" />
                  </View>
                ) : (
                  <View style={[styles.wrestlerPhoto, styles.wrestlerPhotoPlaceholder, { borderColor: roleColor, backgroundColor: roleColor + "22" }]}>
                    <MaterialCommunityIcons name="account" size={28} color={roleColor + "66"} />
                  </View>
                )}
                <View style={styles.wrestlerInfo}>
                  <Text style={[styles.wrestlerName, { color: colors.foreground }]}>{w.name}</Text>
                  <Text style={[styles.wrestlerRole, { color: roleColor }]}>
                    {w.role} · {w.style}
                  </Text>
                  {w.faction && (
                    <Text style={[styles.wrestlerFaction, { color: colors.mutedForeground }]}>
                      {w.faction}
                    </Text>
                  )}
                </View>
                <View style={styles.wrestlerRight}>
                  <MaterialCommunityIcons name={styleIcon} size={18} color={colors.mutedForeground} />
                  <Text style={[styles.wrestlerStamina, { color: colors.mutedForeground }]}>
                    {w.stamina}
                  </Text>
                </View>
              </View>

              {expanded && (
                <View style={[styles.expandedContent, { borderTopColor: colors.border }]}>
                  {photo && (
                    <View style={styles.expandedPhotoWrap}>
                      <Image source={photo} style={styles.expandedPhoto} resizeMode="cover" />
                    </View>
                  )}
                  <Text style={[styles.wrestlerBio, { color: colors.mutedForeground }]}>
                    {w.bio}
                  </Text>
                  {w.signatureMove && (
                    <View style={[styles.moveBadge, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.moveBadgeText, { color: colors.primaryForeground }]}>
                        FINISHER: {w.signatureMove}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </Pressable>
          );
        })}

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

  noteBlock: { margin: 16, borderWidth: 1, borderRadius: 8, padding: 16 },
  noteTitle: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 3, marginBottom: 8 },
  noteText: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18, fontStyle: "italic" },
});
