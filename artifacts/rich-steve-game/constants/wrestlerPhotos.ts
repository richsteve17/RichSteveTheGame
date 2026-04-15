const WRESTLER_PHOTOS: Record<string, any> = {
  // ─── RICH $TEVE ERA PORTRAITS ─────────────────────────────────
  "rich-steve":             require("@/assets/images/wrestlers/steve-singlet.jpeg"),
  "rich-steve-debut":       require("@/assets/images/wrestlers/steve-debut-promo.jpeg"),
  "rich-steve-first-suit":  require("@/assets/images/wrestlers/steve-first-suit.jpeg"),
  "rich-steve-suit":        require("@/assets/images/wrestlers/steve-suit-award.jpeg"),
  "rich-steve-suit-promo":  require("@/assets/images/wrestlers/steve-suit-promo.jpeg"),
  "rich-steve-hijacked":    require("@/assets/images/wrestlers/steve-hijacked-card.jpeg"),
  "rich-steve-pm":          require("@/assets/images/wrestlers/steve-pm-entrance.jpeg"),
  "rich-steve-ssw":         require("@/assets/images/wrestlers/steve-ssw-impact.jpeg"),

  // ─── RICH $TEVE ACTION SHOTS ──────────────────────────────────
  "rich-steve-action":       require("@/assets/images/wrestlers/steve-action-slam.jpeg"),
  "rich-steve-money-drop":   require("@/assets/images/wrestlers/steve-money-drop.jpeg"),
  "rich-steve-money-drop-2": require("@/assets/images/wrestlers/steve-money-drop-2.jpeg"),
  "rich-steve-spinebuster":  require("@/assets/images/wrestlers/steve-spinebuster.jpeg"),
  "rich-steve-vs-korpse":    require("@/assets/images/wrestlers/steve-vs-korpse-card.jpeg"),

  // ─── OPPONENT / FACTION PORTRAITS ─────────────────────────────
  "onslaught":           require("@/assets/images/wrestlers/onslaught.jpeg"),
  "kj-hellfire":         require("@/assets/images/wrestlers/steve-suit-kj-hellfire.jpeg"),
  "korpse":              require("@/assets/images/wrestlers/korpse.jpeg"),
  "drew-bronson":        require("@/assets/images/wrestlers/steve-suit-drew-bronson.jpeg"),
  "jesse-skelton":       require("@/assets/images/wrestlers/steve-suit-jesse-skelton.jpeg"),
  "big-mike":            require("@/assets/images/wrestlers/big-mike.jpeg"),
  "mac-mayhem":          require("@/assets/images/wrestlers/mac-mayhem-turn.jpeg"),
  "mac-mayhem-alt":      require("@/assets/images/wrestlers/mac-mayhem.jpeg"),
  "mac-mayhem-promo":    require("@/assets/images/wrestlers/mac-mayhem-promo.jpeg"),
  "ryan-vox":            require("@/assets/images/wrestlers/ryan-vox.jpeg"),
  "wrex-savage":         require("@/assets/images/wrestlers/wrex-savage.jpeg"),
  "jay-cortez":          require("@/assets/images/wrestlers/jay-cortez.jpeg"),
  "johnny-xross":        require("@/assets/images/wrestlers/bruh-xross-rumble.jpeg"),
  "ray-rumble":          require("@/assets/images/wrestlers/bruh-xross-rumble.jpeg"),
  "george-burkett":      require("@/assets/images/wrestlers/bruh-tag-champs.jpeg"),
  "detroits-finest":     require("@/assets/images/wrestlers/detroits-finest.jpeg"),
  "siccend":             require("@/assets/images/wrestlers/rcmw-portrait.jpeg"),
  "yams":                require("@/assets/images/wrestlers/yams.jpeg"),
  "jt-funk":             require("@/assets/images/wrestlers/jt-funk.jpeg"),
  "johnny-malloy":       require("@/assets/images/wrestlers/johnny-malloy-champion.jpeg"),
  "johnny-malloy-action":require("@/assets/images/wrestlers/johnny-malloy.jpeg"),
  "gemini":              require("@/assets/images/wrestlers/gemini.jpeg"),

  // ─── ERA / FACTION SHOTS ──────────────────────────────────────
  "hijacked-faction":    require("@/assets/images/wrestlers/hijacked-faction.jpeg"),
  "rampage-wrestler":    require("@/assets/images/wrestlers/rampage-wrestler.jpeg"),

  // ─── STAIRWAY TO GOLD / TIFFANY ARC (June 24, 2017) ──────────
  // Steve photoshopped with Tiffany — event backdrop, Project Mayhem logo
  "tiffany-steve-promo":    require("@/assets/images/wrestlers/tiffany-steve-promo.jpeg"),
  // Steve walking Tiffany out by the ring — #HIJACKED shirt
  "tiffany-steve-ringside": require("@/assets/images/wrestlers/steve-tiffany-ringside.jpeg"),
  // Steve and Tiffany close up — #HIJACKED shirt, Paul Milliner photo
  "tiffany-steve-hijacked": require("@/assets/images/wrestlers/tiffany-steve-hijacked.jpeg"),
  // Steve and Tiffany photoshopped at Disney/castle
  "tiffany-steve-disney":   require("@/assets/images/wrestlers/tiffany-steve-disney.jpeg"),
  // Steve entering the ring in "Who Loves His Tiffany...This Guy" shirt
  "steve-tiffany-shirt":    require("@/assets/images/wrestlers/steve-tiffany-shirt.jpeg"),
  // Tiffany slapping Steve in the face — she finally had enough
  "tiffany-slap":           require("@/assets/images/wrestlers/tiffany-slap.jpeg"),
  // Steve facing off with Jay Cortez's son before the attack
  "steve-faces-son":        require("@/assets/images/wrestlers/steve-faces-son.jpeg"),
  // Steve attacking Jay Cortez's son — indoor shot (Frank Boris photo)
  "steve-attacks-jay-son":  require("@/assets/images/wrestlers/steve-attacks-jay-son.jpeg"),
  // Steve punching Jay's son — outdoor ring, sunset
  "steve-punches-son":      require("@/assets/images/wrestlers/steve-punches-son.jpeg"),
  // Jay Cortez (red shirt) shielding his son as Steve wails on them
  "jay-protects-son":       require("@/assets/images/wrestlers/jay-protects-son.jpeg"),
  // Big Mike returning in red shirt + suspenders with baseball bat, facing Steve in the ring
  "big-mike-bat-staredown": require("@/assets/images/wrestlers/big-mike-bat-staredown.jpeg"),
  // Big Mike with bat — Jay Cortez and son visible, Mike about to intervene
  "big-mike-bat-return":    require("@/assets/images/wrestlers/big-mike-bat-return.jpeg"),
};

const PROMOTION_LOGOS: Record<string, any> = {
  "project-mayhem": require("@/assets/images/wrestlers/project-mayhem-logo.jpeg"),
  "rampage":        require("@/assets/images/wrestlers/rampage-logo.jpeg"),
  "otcw":           require("@/assets/images/wrestlers/otcw-logo.jpeg"),
};

export function getWrestlerPhoto(id: string): any | null {
  return WRESTLER_PHOTOS[id] ?? null;
}

export function getLogo(id: string): any | null {
  return PROMOTION_LOGOS[id] ?? null;
}

export { WRESTLER_PHOTOS, PROMOTION_LOGOS };
