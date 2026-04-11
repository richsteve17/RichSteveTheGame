import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { FACTIONS, WRESTLERS } from "@/constants/gameData";

const ROLE_COLORS: Record<string, string> = {
  "Main Event": "#D4AF37",
  Midcard: "#888888",
  "Women's Division": "#c084fc",
  Legend: "#60a5fa",
  Manager: "#f87171",
};

const STYLE_ICONS: Record<string, string> = {
  Technical: "cog",
  Power: "arm-flex",
  Brawler: "boxing-glove",
  "High-Flyer": "airplane",
  Cerebral: "brain",
};

export default function RosterScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [view, setView] = useState<"factions" | "all">("factions");

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
          <View key={faction.name} style={[styles.factionBlock, { borderColor: colors.border }]}>
            <View style={styles.factionHeader}>
              <Text style={[styles.factionName, { color: colors.primary }]}>{faction.name}</Text>
              {faction.manager && (
                <Text style={[styles.factionManager, { color: colors.mutedForeground }]}>
                  MGR: {faction.manager}
                </Text>
              )}
              {faction.higherPower && (
                <Text style={[styles.factionManager, { color: colors.mutedForeground }]}>
                  HIGHER POWER: {faction.higherPower}
                </Text>
              )}
            </View>
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
        ))}

      {view === "all" &&
        WRESTLERS.map((w) => {
          const expanded = expandedId === w.id;
          const roleColor = ROLE_COLORS[w.role] ?? colors.mutedForeground;
          const styleIcon = (STYLE_ICONS[w.style] ?? "help") as any;

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
                <View style={styles.wrestlerLeft}>
                  <View
                    style={[
                      styles.roleIndicator,
                      { backgroundColor: roleColor },
                    ]}
                  />
                  <View>
                    <Text style={[styles.wrestlerName, { color: colors.foreground }]}>
                      {w.name}
                    </Text>
                    <Text style={[styles.wrestlerRole, { color: roleColor }]}>
                      {w.role} · {w.style}
                    </Text>
                    {w.faction && (
                      <Text style={[styles.wrestlerFaction, { color: colors.mutedForeground }]}>
                        {w.faction}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.wrestlerRight}>
                  <MaterialCommunityIcons
                    name={styleIcon}
                    size={20}
                    color={colors.mutedForeground}
                  />
                </View>
              </View>

              {expanded && (
                <View style={[styles.expandedContent, { borderTopColor: colors.border }]}>
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
          Rich $teve only wore wrestling gear during active matches. For promos, segments, or managing out in the crowd — suits only. "Why would I wear gear if I'm not wrestling? That's what idiots and poor people do."
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  toggle: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 6,
    borderWidth: 1,
    overflow: "hidden",
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  factionBlock: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  factionHeader: {
    marginBottom: 8,
  },
  factionName: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  factionManager: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    marginTop: 2,
  },
  factionDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    marginBottom: 10,
  },
  factionMembers: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  memberPill: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  memberPillText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  wrestlerCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  wrestlerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  wrestlerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  roleIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  wrestlerName: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  wrestlerRole: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    marginTop: 1,
  },
  wrestlerFaction: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  wrestlerRight: {
    paddingLeft: 8,
  },
  expandedContent: {
    padding: 14,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  wrestlerBio: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  moveBadge: {
    alignSelf: "flex-start",
    marginTop: 10,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  moveBadgeText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  noteBlock: {
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  noteTitle: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 3,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    fontStyle: "italic",
  },
});
