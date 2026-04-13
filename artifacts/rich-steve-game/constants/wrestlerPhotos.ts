const WRESTLER_PHOTOS: Record<string, any> = {
  "rich-steve": require("@/assets/images/wrestlers/steve-singlet.jpeg"),
  "rich-steve-suit": require("@/assets/images/wrestlers/steve-suit-award.jpeg"),
  "rich-steve-first-suit": require("@/assets/images/wrestlers/steve-first-suit.jpeg"),
  "rich-steve-suit-promo": require("@/assets/images/wrestlers/steve-suit-promo.jpeg"),
  "rich-steve-hijacked": require("@/assets/images/wrestlers/steve-hijacked-card.jpeg"),
  "rich-steve-debut": require("@/assets/images/wrestlers/steve-debut-promo.jpeg"),
  "rich-steve-pm": require("@/assets/images/wrestlers/steve-pm-entrance.jpeg"),

  "onslaught": require("@/assets/images/wrestlers/onslaught.jpeg"),
  "kj-hellfire": require("@/assets/images/wrestlers/steve-suit-kj-hellfire.jpeg"),
  "korpse": require("@/assets/images/wrestlers/korpse.jpeg"),
  "drew-bronson": require("@/assets/images/wrestlers/steve-suit-drew-bronson.jpeg"),
  "jesse-skelton": require("@/assets/images/wrestlers/steve-suit-jesse-skelton.jpeg"),
  "mac-mayhem": require("@/assets/images/wrestlers/mac-mayhem-turn.jpeg"),
  "ryan-vox": require("@/assets/images/wrestlers/ryan-vox.jpeg"),
  "wrex-savage": require("@/assets/images/wrestlers/wrex-savage.jpeg"),
  "jay-cortez": require("@/assets/images/wrestlers/jay-cortez.jpeg"),
  "johnny-xross": require("@/assets/images/wrestlers/bruh-tag-champs.jpeg"),
  "ray-rumble": require("@/assets/images/wrestlers/bruh-tag-champs.jpeg"),
  "george-burkett": require("@/assets/images/wrestlers/bruh-tag-champs.jpeg"),
  "siccend": require("@/assets/images/wrestlers/rcmw-portrait.jpeg"),
  "yams": require("@/assets/images/wrestlers/yams.jpeg"),
  "jt-funk": require("@/assets/images/wrestlers/jt-funk.jpeg"),
  "johnny-malloy": require("@/assets/images/wrestlers/johnny-malloy-champion.jpeg"),
  "gemini": require("@/assets/images/wrestlers/gemini.jpeg"),
};

const PROMOTION_LOGOS: Record<string, any> = {
  "project-mayhem": require("@/assets/images/wrestlers/project-mayhem-logo.jpeg"),
  "rampage": require("@/assets/images/wrestlers/rampage-logo.jpeg"),
  "otcw": require("@/assets/images/wrestlers/otcw-logo.jpeg"),
};

export function getWrestlerPhoto(id: string): any | null {
  return WRESTLER_PHOTOS[id] ?? null;
}

export function getLogo(id: string): any | null {
  return PROMOTION_LOGOS[id] ?? null;
}

export { WRESTLER_PHOTOS, PROMOTION_LOGOS };
