export interface WrestlerRatings {
  power: number;
  speed: number;
  technical: number;
  toughness: number;
  mic: number;
  heat: number;
  overall: number;
}

export interface Wrestler {
  id: string;
  name: string;
  faction: string | null;
  role: "Main Event" | "Midcard" | "Women's Division" | "Legend" | "Manager";
  style: "Technical" | "Power" | "Brawler" | "High-Flyer" | "Cerebral";
  bio: string;
  stamina: number;
  moves: string[];
  signatureMove: string | null;
  height?: string;
  weight?: string;
  hometown?: string;
  ratings?: WrestlerRatings;
}

export interface CareerChapter {
  id: string;
  era: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  eraName: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  opponentId?: string;
  stipulation: string;
  introCutscene: CutsceneSlide[];
  outroCutscene?: {
    win: CutsceneSlide[];
    lose: CutsceneSlide[];
  };
  historicalResult: "win" | "lose" | "dq" | "screwjob" | "story";
  historicalNote: string;
  riotRumbleChapter?: boolean;
  matchless?: boolean;
  promoGame?: PromoChallenge[];
}

export interface CutsceneSlide {
  speaker: string;
  text: string;
  isPromo?: boolean;
}

export interface PromoOption {
  text: string;
  isCorrect: boolean;
  crowdReaction: "heat" | "pop" | "silence";
  feedback: string;
}

export interface PromoChallenge {
  situation: string;
  options: PromoOption[];
}

export const RICH_STEVE: Wrestler = {
  id: "rich-steve",
  name: "Rich $teve",
  faction: "Project Mayhem",
  role: "Main Event",
  style: "Cerebral",
  bio: "Steve Coleman. The Chicken Shit Mastermind. 13 years on the independent circuit (2006–2019). Started as a manager at 16 due to age restrictions. Became the most cerebral heel on the East Coast indie scene. Never wore gear unless he was wrestling. Always heel. Always. His entrance theme: 'Jet Black New Year' by Thursday — used after a direct blessing from Geoff Rickly at a Warped Tour signing. The same song became his exit theme at the Lethal Lottery cash-in, cued to the countdown section — the sound of a long game coming due.",
  stamina: 100,
  moves: ["Shoulder Block", "Headlock", "Body Slam", "Back Elbow", "Nerve Hold"],
  signatureMove: "Market Crash (Side Effect)",
  height: "6'1\"",
  weight: "340 lbs",
  hometown: "Philadelphia, PA",
  ratings: { power: 71, speed: 65, technical: 79, toughness: 78, mic: 97, heat: 96, overall: 91 },
};

export const WRESTLERS: Wrestler[] = [
  // ─── ERA 1 ORIGINALS ─────────────────────────────────────────
  {
    id: "onslaught",
    name: "Onslaught",
    faction: "ACPW",
    role: "Legend",
    style: "Power",
    bio: "Rich $teve's first wrestling trainer at the ACPW Academy. The man who taught him the business stood on the other side of the ring at his student's in-ring debut on April 7, 2007.",
    stamina: 85,
    moves: ["Scoop Slam", "Running Clothesline", "Suplex", "Corner Splash", "Big Boot"],
    signatureMove: null,
    ratings: { power: 84, speed: 62, technical: 73, toughness: 83, mic: 65, heat: 66, overall: 74 },
  },
  {
    id: "kj-hellfire",
    name: "KJ Hellfire",
    faction: "Living Dead 2k6",
    role: "Midcard",
    style: "Brawler",
    bio: "One half of Living Dead 2k6 with Korpse. Managed by a 16-year-old Rich $teve wearing black eye makeup at his ACPW debut on August 12, 2006. Flame mask, aggressive style.",
    stamina: 72,
    moves: ["DDT", "Clothesline", "Choke Slam", "Running Bulldog"],
    signatureMove: null,
    ratings: { power: 74, speed: 68, technical: 69, toughness: 72, mic: 64, heat: 67, overall: 70 },
  },
  {
    id: "korpse",
    name: "Korpse",
    faction: "Independent",
    role: "Main Event",
    style: "Power",
    bio: "Rich $teve's original Road Dog from ACPW. Managed together under Living Dead 2k6, then $teve managed Korpse solo until March 2007. Best friends — 'Road Dogs' — for 12 years before they ever faced each other. January 20, 2018: their first and only match against each other. $teve lost.",
    stamina: 92,
    moves: ["Chokeslam", "Sit-Out Powerbomb", "Big Boot", "Bear Hug", "Running Powerslam"],
    signatureMove: null,
    ratings: { power: 88, speed: 64, technical: 74, toughness: 86, mic: 70, heat: 71, overall: 79 },
  },
  {
    id: "ruben-ortiz",
    name: "Ruben Ortiz",
    faction: null,
    role: "Midcard",
    style: "Brawler",
    bio: "Untrained and unsafe. The reason Coleman never won the ACPW Grand Championship on August 18, 2007. The match was called a Double DQ — both men disqualified. He was booked to win.",
    stamina: 60,
    moves: ["Wild Swing", "Bear Hug", "Headlock", "Running Shoulder Block"],
    signatureMove: null,
    ratings: { power: 62, speed: 58, technical: 44, toughness: 63, mic: 42, heat: 38, overall: 52 },
  },
  {
    id: "southern-enforcer",
    name: "Southern Enforcer",
    faction: null,
    role: "Midcard",
    style: "Brawler",
    bio: "ACPW Hardcore Division. The man whose spike in a three-way hardcore match on August 25, 2007 sent Rich $teve into a years-long break from the business.",
    stamina: 75,
    moves: ["Spike DDT", "Clothesline", "Brawling Combo", "Slam"],
    signatureMove: "Spike",
    ratings: { power: 73, speed: 66, technical: 67, toughness: 74, mic: 58, heat: 62, overall: 67 },
  },
  {
    id: "don-e-allen",
    name: "Don E. Allen",
    faction: null,
    role: "Legend",
    style: "Brawler",
    bio: "ECW original. '49 F'N' Don E. Allen — black leather pants, red boots, yellow elbow pads, ACPW Internet Television Champion. Rich $teve's opponent at ACPW/3FX Entertainment on October 6, 2012. The last match before the gap.",
    stamina: 80,
    moves: ["Snap DDT", "Running Elbow", "Clothesline", "Stomp Combo"],
    signatureMove: null,
    ratings: { power: 74, speed: 65, technical: 75, toughness: 76, mic: 72, heat: 70, overall: 73 },
  },
  // ─── ERA 3: OTCW/COALITION ────────────────────────────────────
  {
    id: "justin-tyme",
    name: "Justin Tyme",
    faction: "OTCW",
    role: "Midcard",
    style: "Brawler",
    bio: "OTCW roster member. Faced Rich $teve at OTCW Proving Ground on August 27, 2016 — still in manager mode, building toward the Coalition. Later tagged with $teve at September to Remember when The Coalition officially formed.",
    stamina: 74,
    moves: ["Running Forearm", "Scoop Slam", "Shoulder Block", "Corner Clothesline"],
    signatureMove: null,
    ratings: { power: 69, speed: 71, technical: 68, toughness: 68, mic: 61, heat: 59, overall: 66 },
  },
  {
    id: "drew-bronson",
    name: "Drew Bronson",
    faction: "The Original Coalition",
    role: "Midcard",
    style: "Power",
    bio: "Original Coalition member in OTCW. Lightning bolt chest tattoo. Rich $teve managed him to victories at OTCW. Kicked to the curb when Project Mayhem streamlined its roster.",
    stamina: 78,
    moves: ["Powerbomb", "Clothesline", "Running Shoulder Block", "Slam"],
    signatureMove: null,
    ratings: { power: 81, speed: 67, technical: 72, toughness: 79, mic: 67, heat: 68, overall: 74 },
  },
  {
    id: "allistar-conrad",
    name: "Allistar Conrad",
    faction: "The Original Coalition",
    role: "Midcard",
    style: "Technical",
    bio: "British gimmick. Union Jack flag at ringside, waved by Rich $teve. Original Coalition member in OTCW. Kicked to the curb when Project Mayhem streamlined.",
    stamina: 76,
    moves: ["European Uppercut", "Neckbreaker", "Armbar", "Knee Strike"],
    signatureMove: null,
    ratings: { power: 72, speed: 70, technical: 78, toughness: 71, mic: 68, heat: 65, overall: 71 },
  },
  {
    id: "jesse-skelton",
    name: "Jesse Skelton",
    faction: "The Original Coalition",
    role: "Midcard",
    style: "Brawler",
    bio: "Cowboy hat, denim vest, heavily tattooed. Original Coalition member. Stood next to Rich $teve in a suit at OTCW outdoor night shows.",
    stamina: 73,
    moves: ["Lariat", "Brawling Combo", "Spinebuster", "Elbow Drop"],
    signatureMove: null,
    ratings: { power: 76, speed: 67, technical: 71, toughness: 74, mic: 63, heat: 66, overall: 70 },
  },
  // ─── ERA 3/4: PROJECT MAYHEM CORE ───────────────────────────
  {
    id: "mac-mayhem",
    name: "Mac Mayhem",
    faction: "Project Mayhem",
    role: "Main Event",
    style: "Power",
    bio: "Born Matt Wylde of Riot City's Most Wanted. Betrayed RCMW mid-match to join $teve and renamed himself. Held the Valhalla Visions Championship during the Era 4 run. The 'Emphasis on ME' ego clash with $teve nearly destroyed Project Mayhem — and set up the Lost Ending that never happened.",
    stamina: 95,
    moves: ["Running Shoulder Block", "Corner Splash", "Blue Collar Bomb", "Gutwrench Slam"],
    signatureMove: "Blue Collar Bomb",
    ratings: { power: 87, speed: 69, technical: 74, toughness: 85, mic: 82, heat: 80, overall: 84 },
  },
  {
    id: "ryan-vox",
    name: "Ryan Vox (The Livewire)",
    faction: "Project Mayhem",
    role: "Midcard",
    style: "High-Flyer",
    bio: "The Livewire. 5'7\", 170 lbs. Philadelphia, PA. Debut: Roots of Rampage 8/13/16. Open Challenge Champ. Former Working Class Hero with Yams — until $teve weaponized that history. Filmed the home invasion of Yams' house. Phase 2 Project Mayhem. Ultimately turned face and joined Yams and Kory Cross as Working Class Heroes.",
    stamina: 78,
    moves: ["Springboard Elbow", "Diving Cross Body", "Hurricanrana", "Moonsault", "Running Forearm"],
    signatureMove: null,
    height: "5'7\"",
    weight: "170 lbs",
    hometown: "Philadelphia, PA",
    ratings: { power: 67, speed: 89, technical: 77, toughness: 68, mic: 74, heat: 72, overall: 78 },
  },
  {
    id: "wrex-savage",
    name: "Wrex Savage",
    faction: "Project Mayhem",
    role: "Midcard",
    style: "Brawler",
    bio: "Phase 2 Project Mayhem. His unexplained presence at a show sparked the 'Emphasis on ME' confrontation between $teve and Mac Mayhem. Held his own heading into The Last Shot.",
    stamina: 80,
    moves: ["Lariat", "Powerbomb", "Spear", "Overhead Belly-to-Belly"],
    signatureMove: null,
    ratings: { power: 88, speed: 63, technical: 70, toughness: 84, mic: 66, heat: 74, overall: 77 },
  },
  {
    id: "kory-cross",
    name: "Kory Cross",
    faction: "Project Mayhem",
    role: "Manager",
    style: "Cerebral",
    bio: "Started as manager of Riot City's Most Wanted. Followed Matt Wylde when he defected and became Mac Mayhem — joining Project Mayhem alongside him. $teve's logistics man for the Rampage invasion. Turned face with Ryan Vox when $teve tried to shave Yams' beard — quit Mayhem and managed the Working Class Heroes (Yams + Vox) through The Last Shot.",
    stamina: 60,
    moves: ["Distraction", "Object Throw", "Foreign Object", "Low Blow"],
    signatureMove: null,
    ratings: { power: 61, speed: 64, technical: 65, toughness: 62, mic: 77, heat: 71, overall: 68 },
  },
  {
    id: "jay-cortez",
    name: "Jay Cortez",
    faction: "Project Mayhem",
    role: "Midcard",
    style: "Brawler",
    bio: "The Higher Power of Project Mayhem. His son Mike Sweeney was beaten down by $teve, setting off the Big Mike saga. Jay waited — then revealed himself as the 4th member at Big Mike's Curtain Call, cementing the final Project Mayhem lineup.",
    stamina: 83,
    moves: ["Lariat", "Powerbomb", "Corner Splash", "Knee Strike"],
    signatureMove: null,
    ratings: { power: 82, speed: 70, technical: 79, toughness: 81, mic: 76, heat: 74, overall: 80 },
  },
  // ─── ERA 4: IMPACT SOCIETY ───────────────────────────────────
  {
    id: "adam-armstrong",
    name: "Adam Armstrong",
    faction: "Impact Society",
    role: "Midcard",
    style: "Technical",
    bio: "Rich $teve's tag team partner in Impact Society. Together they captured the Super Star Wrestling (SSW) Tag Team Championships in 2017. Blonde hair, credible in-ring worker.",
    stamina: 79,
    moves: ["Suplex", "Armbar", "Running Knee", "Neckbreaker"],
    signatureMove: null,
    ratings: { power: 76, speed: 74, technical: 82, toughness: 75, mic: 70, heat: 67, overall: 75 },
  },
  // ─── ERA 4/5: #BRUH ──────────────────────────────────────────
  {
    id: "johnny-xross",
    name: "Johnny Xross",
    faction: "#BRUH",
    role: "Main Event",
    style: "Technical",
    bio: "One half of #BRUH with Ray Rumble. Original Coalition member and the tag backbone of Project Mayhem throughout all of 2017. Under manager George Burkett, he and Ray won the Rampage Tag Team Championships. December 9, 2017 — Big Mike's Curtain Call — #BRUH turned face and quit Project Mayhem. In the aftermath, Rich $teve cornered Xross through the cage and told him directly: 'I want you to remember one thing, #Bruh — I created you. I made you both who you are. Without me you would be nothing. You betrayed what was supposed to be a real friendship, and for what? For some idiot in a stupid hat? You made the biggest mistake you could when you crossed us.' Johnny was not at the Lethal Lottery show. That was the final piece of the plan. The man $teve's Lost Ending was always designed to put over.",
    stamina: 90,
    moves: ["Crossbody", "Armbar", "Neckbreaker", "Spinning Elbow", "Running Dropkick"],
    signatureMove: null,
    ratings: { power: 84, speed: 64, technical: 72, toughness: 83, mic: 68, heat: 77, overall: 76 },
  },
  {
    id: "ray-rumble",
    name: "Ray Rumble",
    faction: "#BRUH",
    role: "Main Event",
    style: "Brawler",
    bio: "One half of #BRUH. Tag backbone of Project Mayhem through all of 2017 alongside Johnny Xross, managed by George Burkett. Won the Rampage Tag Team Championships. Left Mayhem December 9, 2017 with Xross. When the Lethal Lottery paired him with Rich $teve — his former boss, sworn enemy — Ray went through stages: rage, reluctant acceptance, and eventually proclaiming 'the band is back together for one night.' George Burkett begged him not to trust $teve. Ray didn't listen. He found out the hard way why Burkett was right. The plan was never Yams. The plan was always #BRUH.",
    stamina: 88,
    moves: ["Haymaker", "Spinebuster", "Clothesline", "Back Suplex", "Running Knee"],
    signatureMove: null,
    ratings: { power: 81, speed: 66, technical: 72, toughness: 80, mic: 68, heat: 74, overall: 74 },
  },
  {
    id: "george-burkett",
    name: "George Burkett",
    faction: "#BRUH",
    role: "Manager",
    style: "Cerebral",
    bio: "Manager of #BRUH (Johnny Xross and Ray Rumble). Guided them through their Rampage Tag Title run. On October 2, 2018 — when the Lethal Lottery pairing was announced — Burkett was the only person in the entire wrestling world who publicly stated that Rich $teve could not be trusted with Ray Rumble as his partner. He said it to Ray's face. He said it to the crowd. Nobody listened. On October 13, 2018 — as your NEW Rampage Pro Wrestling Tag Team Champion Rich $teve posted afterward — Burkett's picture was among those stolen, like the championship itself. 'Now #BRUH will never get their titles back.' He saw it. He called it. He couldn't stop it.",
    stamina: 55,
    moves: ["Distraction", "Ringside Interference", "Object Throw"],
    signatureMove: null,
    ratings: { power: 52, speed: 54, technical: 53, toughness: 55, mic: 78, heat: 72, overall: 63 },
  },
  {
    id: "trish-adora",
    name: "Trish Adora",
    faction: "#BRUH",
    role: "Women's Division",
    style: "Technical",
    bio: "#BRUH affiliate. Rampage Women's Division standout.",
    stamina: 75,
    moves: ["Arm Drag", "Running Crossbody", "Submission Hold", "DDT"],
    signatureMove: null,
    ratings: { power: 68, speed: 78, technical: 80, toughness: 69, mic: 72, heat: 68, overall: 73 },
  },
  // ─── ERA 3/4: RIOT CITY'S MOST WANTED ───────────────────────
  {
    id: "siccend",
    name: "Siccend",
    faction: "Riot City's Most Wanted",
    role: "Main Event",
    style: "Brawler",
    bio: "Leader of Riot City's Most Wanted. Red mohawk/bandana, studded vest. Defended Rampage against the Coalition invasion. The feud that forged Project Mayhem.",
    stamina: 87,
    moves: ["Spear", "Uranage", "Corner Clothesline", "Belly-to-Back Suplex", "Running Lariat"],
    signatureMove: "Spear",
    ratings: { power: 84, speed: 71, technical: 74, toughness: 82, mic: 76, heat: 75, overall: 79 },
  },
  {
    id: "vic-ramone",
    name: "Vic Ramone",
    faction: "Riot City's Most Wanted",
    role: "Midcard",
    style: "Technical",
    bio: "RCMW member. Part of the Riot City Rules match where Matt Wylde turned on them mid-match and became Mac Mayhem.",
    stamina: 80,
    moves: ["Dropkick", "Snap Suplex", "Rolling Elbow", "Kneebar"],
    signatureMove: null,
    ratings: { power: 74, speed: 76, technical: 79, toughness: 73, mic: 68, heat: 66, overall: 73 },
  },
  {
    id: "jason-drake",
    name: "Jason Drake",
    faction: "Riot City's Most Wanted",
    role: "Midcard",
    style: "Brawler",
    bio: "RCMW member. Later photographed wearing a Project Mayhem cap — a detail that speaks to the business relationships that outlast any faction.",
    stamina: 77,
    moves: ["Clothesline", "Headbutt", "Scoop Slam", "Running Forearm"],
    signatureMove: null,
    ratings: { power: 73, speed: 68, technical: 70, toughness: 72, mic: 62, heat: 64, overall: 68 },
  },
  // ─── ERA 4/5: YAMS / WORKING CLASS ──────────────────────────
  {
    id: "yams",
    name: "Yams the Working Man",
    faction: "Working Class Heroes",
    role: "Main Event",
    style: "Brawler",
    bio: "Rampage Heavyweight Champion. The Working Man. $teve's public target for all of 2018 — while the real plan was running underneath. $teve broke into Yams' house, filmed a promo from his bathtub. Showed up at a cosplay show dressed as Yams. Shaved Yams' beard off in the ring. Was so insufferable that Vox and Kory Cross quit Mayhem over it — forming Working Class Heroes (Yams + Vox, managed by Kory). Yams cut a title match for $teve as payback for the Invasion promo. The match ended in a DQ — no decision, no satisfaction. Everyone assumed the Riot Rumble lockbox was coming for Yams. Yams played his part perfectly. He was the distraction. The plan was never him. After Kory and Vox joined him at The Last Shot, Yams led the final fight against Project Mayhem.",
    stamina: 88,
    moves: ["Lariat", "German Suplex", "Running Powerslam", "Headbutt", "Corner Splash"],
    signatureMove: null,
    ratings: { power: 84, speed: 70, technical: 74, toughness: 83, mic: 75, heat: 73, overall: 79 },
  },
  // ─── ERA 5: THE GUERRERO TARGET ──────────────────────────────
  {
    id: "eb-cohen",
    name: "E.B. Cohen",
    faction: "The Talent Agency",
    role: "Midcard",
    style: "Brawler",
    bio: "Known as 'Pancakes.' Talent Agency member. The target of Rich $teve's Eddie Guerrero tribute — the Riot Rumble lockbox tossed, the fake concussion sold so convincingly that building security thought it was a medical emergency. After the DQ bell rang, $teve dropped the act cold. Security was bowing on the way out.",
    stamina: 71,
    moves: ["Clothesline", "Suplex", "Running Shoulder Block", "Ground & Pound"],
    signatureMove: null,
    ratings: { power: 70, speed: 66, technical: 67, toughness: 68, mic: 62, heat: 58, overall: 66 },
  },
  // ─── ERA 4/5: BIG MIKE TARGETS ───────────────────────────────
  {
    id: "rd-cordova",
    name: "R.D. Cordova",
    faction: "410 Massiv",
    role: "Midcard",
    style: "Power",
    bio: "One half of 410 Massiv. RD Cordova was the man Rich $teve pinned in the 5v5 match that ended Big Mike's career as ring announcer. The most consequential pin of the Rampage era.",
    stamina: 82,
    moves: ["Running Shoulderblock", "Sidewalk Slam", "Ground & Pound", "Scoop Slam"],
    signatureMove: null,
    ratings: { power: 80, speed: 66, technical: 70, toughness: 78, mic: 62, heat: 64, overall: 70 },
  },
  {
    id: "andre-cash",
    name: "Andre Cash",
    faction: "410 Massiv",
    role: "Midcard",
    style: "Power",
    bio: "Partner of R.D. Cordova in 410 Massiv.",
    stamina: 80,
    moves: ["Powerslam", "Elbow Drop", "Clothesline", "Bear Hug"],
    signatureMove: null,
    ratings: { power: 79, speed: 65, technical: 69, toughness: 77, mic: 60, heat: 62, overall: 69 },
  },
  // ─── MIDCARD / SPECIALISTS ────────────────────────────────────
  {
    id: "jt-funk",
    name: "JT Funk",
    faction: null,
    role: "Midcard",
    style: "Technical",
    bio: "6'0\", 200 lbs. Funkytown U.S.A. Debut: Spring Brawl 3/11/17. Rampage Open Challenge Champion (2x). RPW Wrestler of the Year 2017.",
    stamina: 80,
    moves: ["Dropkick", "Suplex Combo", "Running Knee", "Armbar"],
    signatureMove: null,
    height: "6'0\"",
    weight: "200 lbs",
    hometown: "Funkytown U.S.A.",
    ratings: { power: 72, speed: 78, technical: 80, toughness: 72, mic: 74, heat: 68, overall: 75 },
  },
  {
    id: "randy-lawson",
    name: "Randy Lawson",
    faction: null,
    role: "Midcard",
    style: "Brawler",
    bio: "5'9\", 175 lbs. Richmond, VA. Debut: Vengeance 3/10/18. 'Disrespectful Youth.'",
    stamina: 74,
    moves: ["Forearm Strike", "Neckbreaker", "Running Clothesline", "DDT"],
    signatureMove: null,
    height: "5'9\"",
    weight: "175 lbs",
    hometown: "Richmond, VA",
    ratings: { power: 68, speed: 74, technical: 73, toughness: 67, mic: 65, heat: 63, overall: 68 },
  },
  {
    id: "muddy-waters",
    name: "Muddy Waters",
    faction: "Ruffnecks",
    role: "Midcard",
    style: "Brawler",
    bio: "One half of the Ruffnecks with Josh Austin.",
    stamina: 79,
    moves: ["Brawling Combo", "Scoop Slam", "Elbow Drop", "Headbutt"],
    signatureMove: null,
    ratings: { power: 74, speed: 66, technical: 69, toughness: 73, mic: 60, heat: 62, overall: 68 },
  },
  {
    id: "greywolf",
    name: "Greywolf",
    faction: null,
    role: "Midcard",
    style: "Brawler",
    bio: "Career-long ACPW/OTCW/RPW roster member known for warrior paint and gear. Has been part of the scene since Rich $teve's earliest days. Held the Valhalla Visions Championship at Rampage Pro Wrestling — a belt commissioned by photographer Robbie Blizzard, traveling and homed at RPW.",
    stamina: 78,
    moves: ["War Dance Clothesline", "Scoop Slam", "Running Shoulder Block", "Headbutt"],
    signatureMove: null,
    ratings: { power: 75, speed: 67, technical: 70, toughness: 74, mic: 62, heat: 64, overall: 69 },
  },
  // ─── THE TALENT AGENCY ───────────────────────────────────────
  {
    id: "johnny-malloy",
    name: "Beard Villain Johnny Malloy",
    faction: "The Talent Agency",
    role: "Main Event",
    style: "Technical",
    bio: "6'0\", 280 lbs. Centereach, NY. Debut: Roots of Rampage 8/13/16. Rampage Pro Wrestling Heavyweight Champion. Never pinned or submitted in Dover. Talent Agency founder. The one man Rich $teve publicly respected: 'I still respect him because he did bring people in for Dover vs. The World.'",
    stamina: 87,
    moves: ["Suplex Combo", "Figure Four", "Headlock Driver", "Running Knee", "Belly-to-Back"],
    signatureMove: null,
    height: "6'0\"",
    weight: "280 lbs",
    hometown: "Centereach, NY",
    ratings: { power: 82, speed: 68, technical: 80, toughness: 81, mic: 78, heat: 72, overall: 79 },
  },
  {
    id: "little-monster-binky",
    name: "Little Monster Binky",
    faction: "The Talent Agency",
    role: "Women's Division",
    style: "Technical",
    bio: "4'11\", 120 lbs. Queens, NY. Debut: Capital Chaos 4/8/17. The Talent Agency. Made history as the participant in the first-ever women's match in Rampage Pro Wrestling.",
    stamina: 68,
    moves: ["Arm Drag", "Hurricanrana", "Headscissors", "Pin Combo"],
    signatureMove: null,
    height: "4'11\"",
    weight: "120 lbs",
    hometown: "Queens, NY",
    ratings: { power: 60, speed: 82, technical: 78, toughness: 63, mic: 70, heat: 67, overall: 70 },
  },
  // ─── LEGENDS & ATTRACTIONS ───────────────────────────────────
  {
    id: "shane-douglas",
    name: "Shane Douglas",
    faction: "Legends",
    role: "Legend",
    style: "Technical",
    bio: "The Franchise. ECW original. Rampage attraction.",
    stamina: 85,
    moves: ["Pittsburgh Plunge", "Belly-to-Belly Suplex", "Figure Four", "Lariat"],
    signatureMove: "Pittsburgh Plunge",
    ratings: { power: 80, speed: 70, technical: 86, toughness: 81, mic: 88, heat: 85, overall: 84 },
  },
  {
    id: "justin-credible",
    name: "Justin Credible",
    faction: "Legends",
    role: "Legend",
    style: "Brawler",
    bio: "ECW original. Rampage attraction.",
    stamina: 82,
    moves: ["That's Incredible", "Superkick", "DDT", "Cane Shot"],
    signatureMove: "That's Incredible",
    ratings: { power: 76, speed: 73, technical: 78, toughness: 77, mic: 80, heat: 78, overall: 77 },
  },
  {
    id: "bull-james",
    name: "Bull James (NXT)",
    faction: "Legends",
    role: "Legend",
    style: "Power",
    bio: "Bull Dempsey. Came through Rampage Pro Wrestling and put his hands on Rich $teve — pulling him by the hair into the ring apron. One of the few men with legitimate NXT/WWE history to cross paths with $teve's career.",
    stamina: 88,
    moves: ["Running Crossbody", "Corner Splash", "Headbutt", "Bull Drop"],
    signatureMove: "Bull Drop",
    ratings: { power: 88, speed: 62, technical: 71, toughness: 86, mic: 72, heat: 70, overall: 76 },
  },
  // ─── ERA 3 ADDITIONS ─────────────────────────────────────────
  {
    id: "buddah",
    name: "Buddah",
    faction: "OTCW",
    role: "Main Event",
    style: "Power",
    bio: "OTCW heavyweight. One of the top names in Berkeley Springs. On September 24, 2016, Rich $teve and Justin Tyme challenged Buddah — and lost. The Coalition formation match.",
    stamina: 82,
    moves: ["Scoop Slam", "Running Clothesline", "Spinebuster", "Big Boot", "Powerbomb"],
    signatureMove: null,
    ratings: { power: 86, speed: 62, technical: 72, toughness: 84, mic: 66, heat: 67, overall: 73 },
  },
  {
    id: "siccend",
    name: "Siccend",
    faction: "Riot City's Most Wanted",
    role: "Midcard",
    style: "Brawler",
    bio: "Member of Riot City's Most Wanted alongside Matt Wylde and Vic Ramone. Managed by Kory Cross before the defection. The Coalition faced RCMW twice — losing the first meeting at Winter War 2016 before winning Spring Brawl 2017.",
    stamina: 75,
    moves: ["Headbutt", "DDT", "Running Knee", "Lariat", "Choke Slam"],
    signatureMove: null,
    ratings: { power: 82, speed: 69, technical: 73, toughness: 80, mic: 74, heat: 73, overall: 77 },
  },
  {
    id: "vic-ramon",
    name: "Vic Ramone",
    faction: "Riot City's Most Wanted",
    role: "Midcard",
    style: "Technical",
    bio: "Riot City's Most Wanted. Technical wrestler who held the unit together alongside Siccend. When Matt Wylde turned on him with an exploder suplex through a table at Mayhem 2017, Vic was the man left standing in the wreckage as Project Mayhem was born.",
    stamina: 74,
    moves: ["Suplex", "Armbar", "Running Elbow", "Vertical Suplex", "Neckbreaker"],
    signatureMove: null,
    ratings: { power: 73, speed: 75, technical: 78, toughness: 72, mic: 67, heat: 65, overall: 72 },
  },
  // ─── ERA 4 ADDITIONS ─────────────────────────────────────────
  {
    id: "grizzly-redwood",
    name: "Grizzly Redwood",
    faction: "Project Mayhem",
    role: "Midcard",
    style: "Brawler",
    bio: "Project Mayhem member in the Retribution era. Part of Team Mayhem at the Retribution 5-on-5 elimination match on November 4, 2017.",
    stamina: 72,
    moves: ["Running Clothesline", "Headlock", "Body Slam", "Big Boot"],
    signatureMove: null,
    ratings: { power: 73, speed: 67, technical: 68, toughness: 72, mic: 61, heat: 63, overall: 67 },
  },
  {
    id: "jt-funk",
    name: "JT Funk",
    faction: null,
    role: "Midcard",
    style: "Brawler",
    bio: "Team Rampage member at Retribution. Part of the 5-on-5 elimination squad that put Big Mike's announcing career on the line.",
    stamina: 70,
    moves: ["Lariat", "Suplex", "DDT", "Corner Punch"],
    signatureMove: null,
    ratings: { power: 71, speed: 74, technical: 76, toughness: 70, mic: 72, heat: 66, overall: 72 },
  },
  // ─── ERA 5 ADDITIONS ─────────────────────────────────────────
  {
    id: "kristopher-kollof",
    name: "Kristopher Kollof",
    faction: null,
    role: "Midcard",
    style: "Power",
    bio: "SSW regular. Part of the Triple Threat Stocking Stuffer Contract match at SSW Summer Haze 3 on August 26, 2017 — which Impact Society won to earn the cash-in contract for the SSW Tag Team Championships.",
    stamina: 74,
    moves: ["Gorilla Press", "Headlock", "Body Slam", "Lariat", "Bearhug"],
    signatureMove: null,
    ratings: { power: 83, speed: 63, technical: 68, toughness: 80, mic: 60, heat: 62, overall: 70 },
  },
  {
    id: "mal-havock",
    name: "Mal Havock",
    faction: null,
    role: "Midcard",
    style: "Brawler",
    bio: "Partner of Kristopher Kollof. Part of the SSW triple threat at Summer Haze 3 that Impact Society won to earn the tag title shot contract.",
    stamina: 72,
    moves: ["Dropkick", "Suplex", "Neckbreaker", "Running Shoulder Block"],
    signatureMove: null,
    ratings: { power: 71, speed: 71, technical: 70, toughness: 70, mic: 62, heat: 61, overall: 68 },
  },
  {
    id: "big-new-yorker",
    name: "The Big New Yorkers",
    faction: null,
    role: "Midcard",
    style: "Power",
    bio: "SSW Tag Team title holders who lost to Impact Society at SSW November Reign, November 11, 2017 — when Rich $teve and Adam Armstrong cashed in the Stocking Stuffer Contract. The defeat ended their run with the SSW Tag Team Championships.",
    stamina: 78,
    moves: ["Double Clothesline", "Slam Combo", "Backbreaker", "Running Elbow"],
    signatureMove: null,
    ratings: { power: 83, speed: 61, technical: 67, toughness: 81, mic: 64, heat: 63, overall: 71 },
  },
  {
    id: "detroits-finest",
    name: "Detroit's Finest",
    faction: null,
    role: "Midcard",
    style: "Power",
    bio: "Tag team opponents at SSW Summer Haze 3 (August 26, 2017). Competed in the Triple Threat Stocking Stuffer Contract match alongside Kristopher Kollof & Mal Havock vs Impact Society — Impact Society won.",
    stamina: 72,
    moves: ["Double Shoulder Block", "Slam", "Elbow Drop", "Running Lariat"],
    signatureMove: null,
    ratings: { power: 78, speed: 63, technical: 66, toughness: 76, mic: 58, heat: 59, overall: 68 },
  },
  {
    id: "high-voltage",
    name: "High Voltage",
    faction: null,
    role: "Midcard",
    style: "Brawler",
    bio: "Tag team opponents at AWA '2nd Annual Spring Fever' (April 8, 2017). Competed against Impact Society and The Rapprochement (Fleck & Slice) in a Falls Count Anywhere AWA Tag Team Championship match — Impact Society lost.",
    stamina: 74,
    moves: ["High Crossbody", "Running Clothesline", "Suplex", "Tag Team Slam"],
    signatureMove: null,
    ratings: { power: 74, speed: 70, technical: 68, toughness: 72, mic: 60, heat: 60, overall: 67 },
  },
  {
    id: "the-rapprochement",
    name: "The Rapprochement (Fleck & Slice)",
    faction: null,
    role: "Midcard",
    style: "Technical",
    bio: "Tag team opponents of Impact Society. Lost to them at SSW Summer Haze 3 in the three-way contract match. Faced Impact Society again at Code Red Wrestling 'Heartbreak City' on February 10, 2018 for the Code Red Tag Team Championships — Impact Society lost.",
    stamina: 73,
    moves: ["Combo Slam", "Tag Spike", "Neckbreaker", "Double Team Elbow"],
    signatureMove: null,
    ratings: { power: 70, speed: 72, technical: 74, toughness: 70, mic: 64, heat: 63, overall: 69 },
  },
];

// ─── CAREER CHAPTERS ────────────────────────────────────────────

export const CAREER_CHAPTERS: CareerChapter[] = [

  // ══ ERA 1: THE FUTURE ════════════════════════════════════════

  {
    id: "ch1-managing-debut",
    era: 1,
    eraName: "Era 1: The Future",
    title: "The Managing Debut",
    date: "August 12, 2006",
    venue: "Northeast Community Center",
    city: "Philadelphia, PA",
    stipulation: "Tag Team Match — Managing Living Dead 2k6",
    historicalResult: "story",
    historicalNote: "Dragonfly & Sebastian Rose defeat Living Dead 2k6 (KJ Hellfire & Korpse) w/ Rich Steve. Rich $teve's actual debut — at 16, in black eye makeup, managing at ringside.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "August 12, 2006. Northeast Community Center. Philadelphia, PA.",
      },
      {
        speaker: "NARRATOR",
        text: "Steve Coleman is 16 years old. Age restrictions bar him from competing. So they put him at ringside instead — managing Living Dead 2k6: KJ Hellfire and Korpse.",
      },
      {
        speaker: "NARRATOR",
        text: "Black eye makeup. Suit. A microphone he doesn't need to be handed.",
      },
      {
        speaker: "NARRATOR",
        text: "The kid who would become Rich $teve is already working the crowd before anyone knows his name.",
      },
      {
        speaker: "Rich $teve",
        text: "Everybody has to start somewhere. I started right here — at ringside, in a suit, at sixteen. That was the beginning. Nobody saw it then. They see it now.",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "The crowd has no idea who you are. You're 16, in black eye makeup, at the Northeast Community Center. You grab the mic at ringside.",
        options: [
          {
            text: "What you're looking at is Living Dead 2k6 — the most dangerous tag team in this building tonight.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Immediate heat. Nobody claps. Perfect.",
          },
          {
            text: "Hi everyone, great to be here at this wrestling show tonight!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "A 16-year-old babyface manager gets a nice-guy pop. That's not what you're here to do.",
          },
          {
            text: "Say nothing. Just point at your team and nod.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "Silence is a weapon — but not yet. You're still unknown. You need the mic.",
          },
          {
            text: "We hope to give you a great show tonight, and we appreciate your support!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "That's not Rich $teve. That's a kid who doesn't know what he's doing.",
          },
        ],
      },
      {
        situation: "KJ Hellfire and Korpse are having trouble getting crowd heat. The building is dead. You need to wake them up — against your own team.",
        options: [
          {
            text: "Are you people not SEEING what these two are capable of? Open your eyes.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Good. Make the crowd feel stupid for not reacting. Classic manager work.",
          },
          {
            text: "C'mon everyone! Make some noise for Living Dead 2k6!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "They clap politely. You got a babyface reaction for a heel team. Counterproductive.",
          },
          {
            text: "KORPSE IS GOING TO DESTROY SOMEONE TONIGHT — PAY ATTENTION!",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Loud. Aggressive. Now they're booing. That's heat. Job done.",
          },
          {
            text: "Applaud your team from ringside. Encourage them visually.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "A suit-wearing teenager clapping ringside. Nobody cares.",
          },
        ],
      },
      {
        situation: "Dragonfly and Sebastian Rose enter to a crowd pop. The crowd is into them. You need to cut it off right now.",
        options: [
          {
            text: "Oh good. Look who showed up. Two people completely unprepared for what's coming.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Cold. Dismissive. The crowd boos you, which means they're now invested. That's the goal.",
          },
          {
            text: "Good luck out there tonight, gentlemen. May the best team win.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "The crowd cheers your sportsmanship. You just got a babyface pop as a heel manager. Terrible.",
          },
          {
            text: "The noise you hear for them tonight? That's the last time they get that. Watch Living Dead 2k6.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "You reframed their pop as temporary. The crowd reacts with boos. Excellent heel logic.",
          },
          {
            text: "BOOOO! These guys are GARBAGE! BOOOO!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "A 16-year-old screaming boo at a wrestling show made the crowd laugh with you. That's not heat.",
          },
        ],
      },
    ],
  },

  {
    id: "ch1-korpse-manager",
    era: 1,
    eraName: "Era 1: The Future",
    title: "The Casket Match",
    date: "October 21, 2006",
    venue: "ACPW — Northeast Community Center",
    city: "Philadelphia, PA",
    stipulation: "Managing Korpse — Casket Match: Korpse vs Dr. Spider",
    historicalResult: "story",
    historicalNote: "October 21, 2006. ACPW. Northeast Community Center. Philadelphia, PA. After Living Dead 2k6 dissolved, Rich $teve managed Korpse exclusively. Tonight: Korpse (w/Rich $teve) vs Dr. Spider — a casket match. WIN. They built something lasting. Crazii Shea is at these shows. The connections forming now will define everything that comes after.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "Living Dead 2k6 dissolves. KJ Hellfire gone. Rich $teve and Korpse: two people left.",
      },
      {
        speaker: "NARRATOR",
        text: "For the next several months, $teve manages Korpse exclusively. They work every show together. They become best friends. Road Dogs.",
      },
      {
        speaker: "NARRATOR",
        text: "Crazii Shea is at shows. The relationships being built right now will define everything that comes after.",
      },
      {
        speaker: "Rich $teve",
        text: "Korpse is my guy. Was. Is. That's 12 years of history. We built something before I even threw my first punch in a ring. That matters.",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "Korpse's opponent enters to a decent crowd reaction. You step between them before the bell.",
        options: [
          {
            text: "Before this goes any further — do you understand what you've agreed to step in the ring with?",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The crowd boos. Korpse looks dangerous. The opponent looks nervous. Exactly right.",
          },
          {
            text: "Hey Korpse! You got this, buddy! Let's go!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "That's a cheerleader, not a manager. The crowd cheers you. Wrong.",
          },
          {
            text: "This match is going to be a great one for everyone here tonight!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You just called a feel-good sports promo. You're a heel manager. Try again.",
          },
          {
            text: "You want to walk away right now? Because nobody would blame you.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Psychological. The opponent hesitates. The crowd turns on you. Perfect.",
          },
        ],
      },
      {
        situation: "The opponent plays to the crowd and gets a big pop. You need to kill the moment before it builds.",
        options: [
          {
            text: "Enjoy it. That's the last good thing that happens to you tonight.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Cold. Simple. The pop dies. The crowd turns on you. Job done.",
          },
          {
            text: "Nothing — wait for it to die down on its own.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You let them have the moment. A manager who doesn't interrupt is a bad manager.",
          },
          {
            text: "Please quiet down, everyone! Show some respect!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "They boo louder. But they're booing you, not reacting to Korpse. You created wrong heat.",
          },
          {
            text: "While you're playing to a crowd that doesn't matter — Korpse is in there thinking about how to end this.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "You refocused the room on your client. The pop is gone. Good work.",
          },
        ],
      },
      {
        situation: "The match is turning. The opponent is mounting a comeback. The crowd is getting loud. You need to do something.",
        options: [
          {
            text: "Step on the apron. Draw the referee's attention — give Korpse time to recover.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Classic heel manager move. The crowd screams. The referee misses the recovery. Right call.",
          },
          {
            text: "Cheer Korpse on from ringside loudly!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "The crowd responds to your energy — positively. You fired up the building for the wrong team.",
          },
          {
            text: "Stay calm. Trust Korpse to turn it around himself.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "Passive. A good manager anticipates. Korpse needed you and you did nothing.",
          },
          {
            text: "Bang the apron. Call out the referee for a slow count on your client.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The referee turns to argue with you. Korpse uses the distraction. That's managing.",
          },
        ],
      },
    ],
  },

  {
    id: "ch1-nightmare-xmas",
    era: 1,
    eraName: "Era 1: The Future",
    title: "Nightmare Before Christmas",
    date: "December 23, 2006",
    venue: "ACPW Nightmare Before Christmas — Northeast Community Center",
    city: "Philadelphia, PA",
    stipulation: "ACPW — Managing Korpse: Pre-Match Segment + Promo",
    historicalResult: "story",
    historicalNote: "December 23, 2006. ACPW 'Nightmare Before Christmas.' Rich $teve was managing Korpse, who faced Dr. Spider. The event featured promotional segments, announcements, and a pre-match segment. $teve was the architect behind the scenes.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "December 23, 2006. ACPW. Northeast Community Center. Philadelphia.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve doesn't wrestle tonight. He doesn't need to. Korpse is in the ring. $teve is in the room.",
      },
      {
        speaker: "NARRATOR",
        text: "This is what managing looks like: being the most important person at ringside while everyone watches someone else.",
      },
      {
        speaker: "Rich $teve",
        text: "They're watching Korpse. But they're listening to me. That's the difference between a performer and a businessman.",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "Pre-match. You have the microphone before Korpse's match. The ACPW crowd doesn't know you yet. Establish yourself.",
        options: [
          {
            text: "I'm Rich $teve. And the man behind me is going to do exactly what I tell him.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "You established the power dynamic before the bell. The crowd boos both of you. Perfect.",
          },
          {
            text: "Korpse is the most dangerous man in this building tonight!",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You put over your client... without putting over yourself. The Mastermind doesn't play second fiddle even to his own guy.",
          },
          {
            text: "Merry Christmas, Philadelphia! Great to be here!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You just got a pop on December 23rd for being festive. That is not the point.",
          },
          {
            text: "Watch carefully. This is how it's done.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Arrogant. Dismissive. Short. The crowd knew immediately they were supposed to hate you. Correct.",
          },
        ],
      },
      {
        situation: "During the match, Dr. Spider starts gaining momentum. Korpse is in trouble. You're at ringside.",
        options: [
          {
            text: "Grab the referee's attention on the far side. Buy Korpse the opening.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Classic distraction play. The crowd catches it. They boo. The plan works.",
          },
          {
            text: "Cheer Korpse on from ringside with encouraging words.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "The crowd liked your enthusiasm. That is not a compliment.",
          },
          {
            text: "Remain expressionless. Let Korpse handle it himself.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You're a manager. Managers manage. You stood there doing nothing when your man needed you.",
          },
          {
            text: "Slap the mat and direct Korpse with sharp hand signals — back to basics.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Tactical. Controlled. You guided the match from ringside. The crowd hated the efficiency of it.",
          },
        ],
      },
    ],
  },

  // ══ ERA 2: DADDY'S MONEY ════════════════════════════════════

  {
    id: "ch1-six-man-debut",
    era: 2,
    eraName: "Era 2: Daddy's Money",
    title: "The In-Ring Debut",
    date: "April 7, 2007",
    venue: "Cardinal Krol Center",
    city: "Springfield, PA",
    opponentId: "onslaught",
    stipulation: "6-Man Tag — D-Craze & Rich Steve & Vinny Hoffa vs Onslaught & Patch & Wrecker",
    historicalResult: "lose",
    historicalNote: "Onslaught, Patch & Wrecker defeated D-Craze, Rich Steve & Vinny Hoffa. First in-ring match. First loss. The man who trained him stood on the other side.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "April 7, 2007. Cardinal Krol Center. Springfield, PA.",
      },
      {
        speaker: "NARRATOR",
        text: "Coleman has managed. He has talked. Now they will finally let him wrestle.",
      },
      {
        speaker: "NARRATOR",
        text: "The man who trained him — Onslaught — is on the other side of the ring. That's how the business works.",
      },
      {
        speaker: "NARRATOR",
        text: "285 lbs. Announced from Malibu. Black shirt. 'Rich $teve Is...' on the front. 'Better Than You' on the back with the R$ Superman logo.",
      },
      {
        speaker: "Rich $teve",
        text: "I was 16 when I started managing. They finally let me compete at 17. My trainer is across from me. He's not gonna go easy. Good.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Not how it happened. But tonight — you beat your own trainer. The student opened with a statement.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Onslaught, Patch & Wrecker. Loss goes in the books.",
        },
        {
          speaker: "NARRATOR",
          text: "The debut loss doesn't define you. You were in the ring. That's the beginning.",
        },
      ],
    },
  },

  // ══ ERA 2: DADDY'S MONEY (cont.) ════════════════════════════

  {
    id: "ch2-ortiz",
    era: 2,
    eraName: "Era 2: Daddy's Money",
    title: "The Grand Championship",
    date: "August 18, 2007",
    venue: "VFW Post 1451",
    city: "South River, NJ",
    opponentId: "ruben-ortiz",
    stipulation: "ACPW Grand Championship Match",
    historicalResult: "dq",
    historicalNote: "Called a Double DQ — both men disqualified. Coleman was booked to win the ACPW Grand Championship but never got it. He didn't get another title shot until years later.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "August 18, 2007. VFW Post 1451. South River, NJ.",
      },
      {
        speaker: "NARRATOR",
        text: "The ACPW Grand Championship. Coleman's name is on the sheet to win. The match is booked. The title was supposed to come home with him.",
      },
      {
        speaker: "NARRATOR",
        text: "His opponent: Ruben Ortiz. Untrained. Unsafe. A liability in the ring.",
      },
      {
        speaker: "NARRATOR",
        text: "It ends in a Double DQ. Both men disqualified. He was booked to win and he'll leave with nothing.",
      },
      {
        speaker: "Rich $teve",
        text: "I was scheduled to win. Booked. And they took it — not because I lost, but because my opponent was a danger. That's this business. You don't complain. You come back.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "You took what was always supposed to be yours. The title they nearly handed you — you earned it tonight.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Double DQ. No title. Both men disqualified — and you were booked to win.",
        },
        {
          speaker: "NARRATOR",
          text: "The business doesn't always give you what you earned. You have to take it. He wouldn't get another shot until years later.",
        },
      ],
    },
  },

  {
    id: "ch2-spike",
    era: 2,
    eraName: "Era 2: Daddy's Money",
    title: "The Spike",
    date: "August 25, 2007",
    venue: "Northeast Community Center",
    city: "Philadelphia, PA",
    opponentId: "southern-enforcer",
    stipulation: "ACPW Hardcore Title Three-Way",
    historicalResult: "lose",
    historicalNote: "ACPW Hardcore Title Three-Way: Southern Enforcer (c) w/ Lady D defeated Rich Steve and Ugly Baby. Rich $teve was challenging for the Hardcore Title. A spike in the match sent Coleman into a years-long break from the business.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "August 25, 2007. One week after the Grand Championship was taken from him.",
      },
      {
        speaker: "NARRATOR",
        text: "A Hardcore Title Three-Way. Southern Enforcer (c) w/ Lady D defending against Ugly Baby and Rich $teve.",
      },
      {
        speaker: "NARRATOR",
        text: "This match will not end the way anyone expects.",
      },
      {
        speaker: "Rich $teve",
        text: "I was in the ring for eight months. Eight months of building something. Then — one match, one spot — and the break begins.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "In the game, you avoid it. In reality — the spike sent Coleman away. Not tonight.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "The spike. The match ends. The break begins.",
        },
        {
          speaker: "NARRATOR",
          text: "Steve Coleman steps away from wrestling. The gap between this moment and his return is measured in years.",
        },
        {
          speaker: "NARRATOR",
          text: "Some things are harder to come back from than a loss.",
        },
      ],
    },
  },

  {
    id: "ch2-don-e-allen",
    era: 2,
    eraName: "Era 2: Daddy's Money",
    title: "The Last Match (Before The Gap)",
    date: "October 6, 2012",
    venue: "Vineland High School",
    city: "Vineland, NJ",
    opponentId: "don-e-allen",
    stipulation: "ACPW/3FX Entertainment — Singles Match",
    historicalResult: "story",
    historicalNote: "Rich $teve's final match before leaving wrestling entirely. Don E. Allen was an ECW original — '49 F'N.' The show also featured Blue Meanie and Stevie Richards.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "October 6, 2012. ACPW/3FX Entertainment. Vineland High School. Vineland, NJ.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve is back. Briefly. The opponent is Don E. Allen — ECW original. '49 F'N.'",
      },
      {
        speaker: "NARRATOR",
        text: "Coleman doesn't know it yet, but this is his last match for a long time.",
      },
      {
        speaker: "NARRATOR",
        text: "He steps away from wrestling after tonight. He will not return to competition until 2016.",
      },
      {
        speaker: "Rich $teve",
        text: "ECW original. I respect the business. But this is my ring too. Always has been.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "A win. And then — silence. Rich $teve steps away from wrestling.",
        },
        {
          speaker: "NARRATOR",
          text: "He will be back. The business doesn't let people like him stay gone.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Don E. Allen. The result barely matters.",
        },
        {
          speaker: "NARRATOR",
          text: "Rich $teve steps away from wrestling after this night. The next time he competes will be 2016.",
        },
        {
          speaker: "NARRATOR",
          text: "Not because he lost. Because some things in life are heavier than any match result.",
        },
      ],
    },
  },

  // ══ ERA 3: OTCW / THE COALITION ════════════════════════════

  {
    id: "ch3-hostile-takeover",
    era: 3,
    eraName: "Era 3: OTCW & The Coalition",
    title: "Uncivil War",
    date: "July 30, 2016",
    venue: "OTCW Uncivil War — Triple B Arena",
    city: "Berkeley Springs, WV",
    opponentId: "siccend",
    stipulation: "No Disqualification — Singles Match",
    historicalResult: "win",
    historicalNote: "Crazii Shea — who $teve knew from ACPW — brought him in as a secret weapon. Nobody in Berkeley Springs had heard of Rich $teve. That was the point. After the match, ring announcer Big Mike interviewed him — and $teve grabbed the mic, cited Daddy's Money and attorney Donnie Diablo, and declared himself the GM of OTCW on the spot.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "July 30, 2016. OTCW Uncivil War. Triple B Arena. Berkeley Springs, WV.",
      },
      {
        speaker: "NARRATOR",
        text: "Crazii Shea makes the call. He and $teve go back — ACPW, the early days. Shea needs a secret weapon nobody in this market has ever seen. That's the weapon.",
      },
      {
        speaker: "NARRATOR",
        text: "Coleman walks in wearing a suit. Nobody in the building knows who he is. Big Mike — the ring announcer — is waiting to interview whoever comes out of this match.",
      },
      {
        speaker: "NARRATOR",
        text: "The match ends. Big Mike steps forward with the mic. $teve takes it.",
      },
      {
        speaker: "Rich $teve",
        text: "Nobody knows me here. That ends tonight. My name is Rich $teve. And with Daddy's Money and legal representation from attorney Donnie Diablo — I am declaring myself the General Manager of OTCW.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "The Hostile Takeover is complete. OTCW now operates under new management.",
        },
        {
          speaker: "Rich $teve",
          text: "Nobody owns this company. I do.",
          isPromo: true,
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "They stopped you in the ring. They cannot stop what comes next.",
        },
        {
          speaker: "Rich $teve",
          text: "This isn't over. I have attorneys.",
          isPromo: true,
        },
      ],
    },
    promoGame: [
      {
        situation: "Big Mike — the OTCW ring announcer — steps forward with the mic after your match. Nobody in Berkeley Springs knows who you are. The crowd is watching. Big Mike hands you the microphone.",
        options: [
          {
            text: "My name is Rich $teve. And with Daddy's Money and attorney Donnie Diablo — I am declaring myself the General Manager of OTCW.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "That's the line. Confident, legal, and completely absurd in the best way possible. The crowd doesn't know what just happened. That's the point.",
          },
          {
            text: "Thanks for having me tonight. It's good to be back in a ring.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You thanked the crowd. You're a heel who just took over a company. There is no thanking anyone.",
          },
          {
            text: "I've got nothing to say. The match said everything.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "The match said nothing to these people — they've never seen you before. You needed the introduction. You needed the claim.",
          },
          {
            text: "I came here because Crazii Shea believed in me. Let's give it up for Shea.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You deflected credit to Shea. A heel takes the moment for himself — he doesn't share the spotlight.",
          },
        ],
      },
      {
        situation: "The crowd is confused. Some are laughing. OTCW management starts arguing. Big Mike is looking at you like you're insane. How do you follow up the declaration?",
        options: [
          {
            text: "My attorneys have already filed the paperwork. This is not a negotiation.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Legal certainty. You're not asking — you're informing. The crowd hates it. That's correct.",
          },
          {
            text: "Look, we can work something out. I'm a reasonable man.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You offered a compromise. That's babyface behavior. Reasonable men don't declare themselves GM uninvited.",
          },
          {
            text: "Daddy's Money. You can't fight it. Accept it.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Simple. Arrogant. Completely unapologetic. The crowd boos because there's nothing they can do. Perfect.",
          },
          {
            text: "Fine — take the mic back. I'll make this official through official channels.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You handed the mic back and said you'd do it properly. The moment died with it.",
          },
        ],
      },
    ],
  },

  {
    id: "ch3-proving-ground",
    era: 3,
    eraName: "Era 3: OTCW & The Coalition",
    title: "Proving Ground",
    date: "August 27, 2016",
    venue: "OTCW Proving Ground — Triple B Arena",
    city: "Berkeley Springs, WV",
    opponentId: "justin-tyme",
    stipulation: "Singles Match — GM Managing At Ringside",
    historicalResult: "story",
    historicalNote: "August 27, 2016. OTCW Proving Ground. Triple B Arena. Berkeley Springs, WV. Rich $teve is still the GM — suit on, managing at ringside. Three managed victories tonight: Jesse Skelton wins, Tony Link wins, Justin Tyme wins. The in-ring return has not happened yet. That's September.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "August 27, 2016. OTCW Proving Ground. Triple B Arena. Berkeley Springs, WV.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve is still the GM. Still wearing the suit. Still the architect behind the scenes.",
      },
      {
        speaker: "NARRATOR",
        text: "But the OTCW roster is starting to respect the name. The Coalition is forming around him. It won't be long.",
      },
      {
        speaker: "Rich $teve",
        text: "This is what patience looks like. The suit stays on until I decide otherwise. And when I decide — everyone will know.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "The GM proves he can hold his own. But the real statement is still coming.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "A stumble. The suit stays on. September is still ahead.",
        },
      ],
    },
  },

  {
    id: "ch3-september-remember",
    era: 3,
    eraName: "Era 3: OTCW & The Coalition",
    title: "September to Remember",
    date: "September 24, 2016",
    venue: "OTCW September to Remember — Triple B Arena",
    city: "Berkeley Springs, WV",
    opponentId: "buddah",
    stipulation: "The Coalition Forms — Hair vs Hair (Link vs Justice) — Rich $teve & Tyme vs Buddah",
    historicalResult: "lose",
    historicalNote: "September 24, 2016. OTCW September to Remember. Triple B Arena. Berkeley Springs, WV. The Coalition officially forms: Sly Scarpone, Jesse Skelton, Little Monster Binky, Ray Rumble, Johnny Xross, Alistar Conrad, Drew Bronson, Tony Link, Justin Tyme, and Rich $teve. The suit comes off — $teve reveals the orange singlet and returns to in-ring competition. Tony Link loses to Justice with a shaving stipulation attached — Rich $teve, as Link's manager, gets his head shaved. Then $teve and Justin Tyme face Buddah — LOSS.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "September 24, 2016. OTCW September to Remember. Triple B Arena. Berkeley Springs, WV.",
      },
      {
        speaker: "NARRATOR",
        text: "Tonight — the suit comes off. Rich $teve walks to the ring. He unbuttons the shirt. Underneath: the orange singlet. In-ring competition officially begins.",
      },
      {
        speaker: "NARRATOR",
        text: "The Coalition forms tonight. Ten men. One faction. But the night comes with a cost.",
      },
      {
        speaker: "NARRATOR",
        text: "Tony Link's match against Justice has a shaving stipulation. Link loses. Rich $teve — as Link's manager — takes the consequence. The hair comes off.",
      },
      {
        speaker: "Rich $teve",
        text: "You want my hair? Fine. Take it. Take everything you can get tonight — because after tonight, you get nothing. The Coalition is real. The suit is gone. And I will not forget a single person in that ring.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "The Coalition wins its first tag match. The group has its statement victory.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "The Coalition loses its debut tag match. Buddah hands $teve and Tyme a loss.",
        },
        {
          speaker: "NARRATOR",
          text: "The Coalition was just born. The setbacks come early. They don't come forever.",
        },
      ],
    },
  },

  {
    id: "ch3-winter-war",
    era: 3,
    eraName: "Era 3: OTCW & The Coalition",
    title: "Winter War",
    date: "December 9, 2016",
    venue: "Rampage Pro Wrestling Winter War — Delaware Agriculture Museum",
    city: "Dover, DE",
    stipulation: "Tag Team Match — The Coalition (Xross, Bronson, Conrad w/$teve) vs RCMW (Wylde, Vic Ramon, Siccend w/Kory Cross) — LOSS",
    historicalResult: "story",
    historicalNote: "December 9, 2016. The Coalition's Rampage debut — Johnny Xross, Drew Bronson, and Alistar Conrad managed by Rich $teve against Riot City's Most Wanted (Matt Wylde, Vic Ramon, Siccend w/Kory Cross). The Coalition lost.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "December 9, 2016. Rampage Pro Wrestling. Delaware Agriculture Museum. Dover, DE.",
      },
      {
        speaker: "NARRATOR",
        text: "The Coalition's Rampage debut. Johnny Xross. Drew Bronson. Alistar Conrad. Rich $teve in the corner.",
      },
      {
        speaker: "NARRATOR",
        text: "Across the ring: Riot City's Most Wanted. Matt Wylde. Vic Ramon. Siccend. Kory Cross managing.",
      },
      {
        speaker: "Rich $teve",
        text: "We're in their house for the first time. Riot City thinks they own Rampage. Tonight is our introduction. They won't forget it — even if we lose.",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "The Coalition is on Rampage for the first time. The crowd doesn't know them. Riot City has home advantage. What's your opening statement?",
        options: [
          {
            text: "We're The Coalition. And we are taking over Rampage Pro Wrestling.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Direct. Territorial. The RPW crowd has a new enemy. Good opening.",
          },
          {
            text: "Thank you RPW! We're excited for this opportunity!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You came into enemy territory as grateful visitors. That's not an invasion.",
          },
          {
            text: "Stay quiet. Let Riot City's entrance get the reaction. Take notes.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You let them own the moment. The Mastermind doesn't observe passively in enemy territory.",
          },
          {
            text: "The Coalition is here. Riot City — your reign ends tonight.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Claiming their territory on the first night. Arrogant. Threatening. Correct.",
          },
        ],
      },
      {
        situation: "The Coalition loses the match. The RPW crowd is celebrating. Riot City is standing tall. What do you do?",
        options: [
          {
            text: "Leave the ring slowly. Head held up. Eyes locked on Riot City. Say nothing.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Dignified in defeat. Threatening in silence. The crowd reads the promise of a return.",
          },
          {
            text: "Shake hands with Riot City. Acknowledge the better team won tonight.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "Sportsmanship after a heel loss is a babyface move. Do not congratulate them.",
          },
          {
            text: "Snap and attack from behind — turn the celebration into a beatdown.",
            isCorrect: false,
            crowdReaction: "heat",
            feedback: "You got heat but burned the moment. The slow walk out was more threatening than the attack.",
          },
          {
            text: "Point at each Riot City member one by one. A threat without words.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The crowd felt it. Each pointed finger a promise. The Coalition will be back.",
          },
        ],
      },
    ],
  },

  {
    id: "ch3-spring-brawl",
    era: 3,
    eraName: "Era 3: OTCW & The Coalition",
    title: "Spring Brawl",
    date: "March 11, 2017",
    venue: "Rampage Pro Wrestling Spring Brawl — Delaware Agricultural Museum",
    city: "Dover, DE",
    stipulation: "6-Man Tag Elimination — Coalition (Xross, Rumble, Conrad w/$teve) vs RCMW (Wylde, Vic Ramon, Siccend w/Kory Cross) — WIN",
    historicalResult: "story",
    historicalNote: "March 11, 2017. The Coalition's rematch against Riot City's Most Wanted — 6-man tag elimination. Johnny Xross, Ray Rumble, and Alistar Conrad (w/Rich $teve) defeated Matt Wylde, Vic Ramon, and Siccend (w/Kory Cross). The tide turns.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "March 11, 2017. Spring Brawl. The Coalition gets its rematch.",
      },
      {
        speaker: "NARRATOR",
        text: "Six-man tag. Elimination rules. Johnny Xross. Ray Rumble. Alistar Conrad. Rich $teve in the corner.",
      },
      {
        speaker: "NARRATOR",
        text: "Across from them: Riot City's Most Wanted. The same lineup. The same Kory Cross managing.",
      },
      {
        speaker: "Rich $teve",
        text: "We lost in December. In their building. Tonight — elimination rules. Every single one of them gets accounted for.",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "Before the match. The Coalition has been losing to Riot City. Tonight is the rematch. The RPW crowd still sees you as invaders. Set the tone.",
        options: [
          {
            text: "We studied everything Riot City did in December. Tonight is different.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Calculated. Prepared. The crowd hates that you treat this like a chess game.",
          },
          {
            text: "We just want a fair match tonight! That's all we're asking for!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You just made the heel faction sound sympathetic. The crowd cheered your plea for fairness. Wrong.",
          },
          {
            text: "Let Xross and Rumble do the talking. You stand behind them silently.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You're the Mastermind. You don't defer to your team for the promo.",
          },
          {
            text: "Kory Cross is a good manager. But he's managing the wrong team.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "You insulted Kory Cross by complimenting his skills and pivoting to the insult. Clinical.",
          },
        ],
      },
      {
        situation: "The Coalition wins. The RPW crowd is stunned. Riot City is down. The Coalition stands in the ring.",
        options: [
          {
            text: "Stand in the center of the ring. Arms out. Let the crowd process what just happened.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The silence followed by boos is the reaction you need. The Coalition owns this moment.",
          },
          {
            text: "Celebrate wildly with the team. Jump around. Big emotion.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "The crowd celebrated with you. You turned a heel win into a feel-good moment.",
          },
          {
            text: "Immediately leave. Don't let them see your reaction.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You gave them nothing. No statement. The win needed to be declared.",
          },
          {
            text: "Grab the mic. One sentence: 'We told you.'",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Three words. Maximum impact. The crowd explodes in boos. Perfect closer.",
          },
        ],
      },
    ],
  },

  {
    id: "ch3-riot-city-rules",
    era: 3,
    eraName: "Era 3: OTCW & The Coalition",
    title: "The Invasion",
    date: "2017",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "siccend",
    stipulation: "Riot City Rules — Coalition vs Riot City's Most Wanted",
    historicalResult: "win",
    historicalNote: "During the payoff match, Matt Wylde betrayed Riot City to join $teve. He renamed himself Mac Mayhem. Project Mayhem was born.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "The Coalition narrows for a surgical strike on Rampage Pro Wrestling.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve's crew: Johnny Xross, Ray Rumble, Drew Bronson, Allistar Conrad. Facing them: Riot City's Most Wanted — Siccend, Vic Ramone, Matt Wylde.",
      },
      {
        speaker: "NARRATOR",
        text: "Kory Cross is managing RCMW tonight. He doesn't know what's about to happen.",
      },
      {
        speaker: "Rich $teve",
        text: "Riot City thinks they own Rampage. Tonight we demonstrate what a surgical strike looks like. When the Coalition arrives — nothing is the same after.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Mid-match — Matt Wylde stops. Looks at Riot City. Looks at $teve.",
        },
        {
          speaker: "NARRATOR",
          text: "He walks across. Renames himself Mac Mayhem. Kory Cross follows.",
        },
        {
          speaker: "Rich $teve",
          text: "Welcome to Project Mayhem.",
          isPromo: true,
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Riot City held their ground tonight. But this is not finished.",
        },
        {
          speaker: "NARRATOR",
          text: "Matt Wylde hasn't made his choice yet. That moment is still coming.",
        },
      ],
    },
  },

  // ══ ERA 5: MIRAI NO SUTĀ (IMPACT SOCIETY) ══════════════════

  {
    id: "ch5-impact-debut",
    era: 5,
    eraName: "Era 5: Mirai no Sutā",
    title: "Impact Society Debut",
    date: "March 2017",
    venue: "Super Star Wrestling",
    city: "SSW Circuit",
    stipulation: "Impact Society Debut — Rich $teve & Adam Armstrong",
    historicalResult: "story",
    historicalNote: "March 2017. Impact Society — Rich $teve and Adam Armstrong — debuted in Super Star Wrestling. Two cousins from Baltimore taking their game beyond Delaware. The first appearance in SSW territory.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "March 2017. Super Star Wrestling. A new territory.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve and Adam Armstrong. Cousins. The Chicken Shit Mastermind and his partner.",
      },
      {
        speaker: "NARRATOR",
        text: "They call themselves Impact Society. They came from Baltimore basements and Philadelphia hardcore. Now they're in SSW — and they're here to take something.",
      },
      {
        speaker: "Rich $teve",
        text: "Delaware was just the beginning. Impact Society goes where the gold is. SSW has gold. Simple math.",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "First night in SSW. The crowd has no idea who you are. Armstrong is beside you. You have the microphone.",
        options: [
          {
            text: "Impact Society is here. And we're not leaving without what we came for.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Territorial and threatening on the first night. The crowd felt it immediately.",
          },
          {
            text: "What's up SSW! We love this territory already!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "The crowd loved the enthusiasm. You're the heel making a debut. Wrong.",
          },
          {
            text: "Let Armstrong do the intro. You stand back looking around the building.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You surveyed the building. You didn't establish yourself. The Mastermind leads.",
          },
          {
            text: "Rich $teve. Adam Armstrong. Impact Society. Take note.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Cold. Clipped. The crowd doesn't know what Impact Society is yet — but they know it's not friendly.",
          },
        ],
      },
      {
        situation: "An SSW local tells you that outsiders aren't welcome here. The crowd rallies behind them. How do you respond?",
        options: [
          {
            text: "Your territory ends when I step through that curtain.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Immediate territorial escalation. The crowd boos. You've established the conflict perfectly.",
          },
          {
            text: "We respect your house. We just want a fair shot.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You asked for respect instead of taking it. Babyface energy from a heel faction.",
          },
          {
            text: "Laugh it off. Don't engage.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "Dismissing locals with a laugh is an okay heel move, but you left heat on the table.",
          },
          {
            text: "Armstrong, what do we say to people who tell us we're not welcome?",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "You turned it into a bit — pulling Armstrong in. The crowd booed the synchronized arrogance.",
          },
        ],
      },
    ],
  },

  {
    id: "ch5-awa-loss",
    era: 5,
    eraName: "Era 5: Mirai no Sutā",
    title: "AWA Spring Fever",
    date: "April 8, 2017",
    venue: "Appalachian Wrestling Alliance 2nd Annual Spring Fever — Ellamore VFD",
    city: "Ellamore, WV",
    opponentId: "high-voltage",
    stipulation: "Falls Count Anywhere — AWA Tag Team Championship: Impact Society vs High Voltage vs The Rapprochement (Fleck & Slice)",
    historicalResult: "lose",
    historicalNote: "April 8, 2017. AWA 2nd Annual Spring Fever. Ellamore VFD, Ellamore, WV. Falls Count Anywhere triple threat for the AWA Tag Team Championship. Impact Society (Rich $teve & Adam Armstrong) vs High Voltage vs The Rapprochement (Fleck & Slice) — Impact Society lost.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "April 8, 2017. Appalachian Wrestling Alliance. Ellamore, West Virginia.",
      },
      {
        speaker: "NARRATOR",
        text: "AWA Tag Team Championship. Falls Count Anywhere. Three teams.",
      },
      {
        speaker: "NARRATOR",
        text: "Impact Society. High Voltage. The Rapprochement — Fleck and Slice.",
      },
      {
        speaker: "Rich $teve",
        text: "First AWA title shot. Falls Count Anywhere — anywhere in this building, every surface is a pinfall. Armstrong and I have done worse places than this.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Impact Society wins the AWA Tag Team Championships. First gold outside of Delaware.",
        },
        {
          speaker: "NARRATOR",
          text: "Rich $teve and Adam Armstrong are AWA Tag Team Champions. The expansion works.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Impact Society loses. The AWA title shot fails.",
        },
        {
          speaker: "NARRATOR",
          text: "Two other teams in the match. Falls Count Anywhere. A lot of variables. The Stocking Stuffer Contract is still ahead.",
        },
      ],
    },
  },

  {
    id: "ch5-ssw-contract",
    era: 5,
    eraName: "Era 5: Mirai no Sutā",
    title: "The Stocking Stuffer Contract",
    date: "August 26, 2017",
    venue: "Super Star Wrestling",
    city: "SSW Circuit",
    stipulation: "Triple Threat — Stocking Stuffer Contract Match WIN",
    historicalResult: "win",
    historicalNote: "August 26, 2017. Rich $teve won the SSW Stocking Stuffer Contract in a Triple Threat match. The contract gave him a future SSW Tag Title shot to use at any time — and Impact Society would cash it in on November 11.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "August 26, 2017. Super Star Wrestling. Three men. One contract.",
      },
      {
        speaker: "NARRATOR",
        text: "The Stocking Stuffer Contract: a guaranteed SSW Tag Title shot, redeemable at any time.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve enters a Triple Threat match for it. One of them walks out holding the contract.",
      },
      {
        speaker: "Rich $teve",
        text: "A briefcase. A contract. An insurance policy. Armstrong and I are Impact Society — and Impact Society cashes in.",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "SSW crowd doesn't know you yet. You're in a Triple Threat. Before the bell, you take the mic to establish your presence.",
        options: [
          {
            text: "I'm Rich $teve. That contract has my name on it already — you just don't know it yet.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Cool. Declarative. The crowd doesn't know whether to believe you. They should.",
          },
          {
            text: "Good evening SSW! Great to be here!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "Friendly babyface energy. In a Triple Threat for a contract. Wrong entirely.",
          },
          {
            text: "Whoever's holding that contract at the end — look out. I'm cashing in.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You telegraphed the whole plan out loud. The Mastermind doesn't broadcast.",
          },
          {
            text: "Impact Society. Remember the name.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Short. Threatening. The crowd doesn't have a reference point yet — which makes it more unsettling.",
          },
        ],
      },
      {
        situation: "The other two men in the Triple Threat are fighting each other. You stand back and let them wear each other down.",
        options: [
          {
            text: "Observe. Watch the pace. Calculate the moment to move.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The Chicken Shit Mastermind at work. Let them bleed each other out. You pick the bones.",
          },
          {
            text: "Jump in and show the crowd you're a competitor.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You just expended energy to get a pop. That's babyface logic in a contract match.",
          },
          {
            text: "Slide out of the ring and wait for one of them to cover.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You let them decide the match. You're supposed to be the one with the plan.",
          },
          {
            text: "Let both men wear down. Strike when the moment is undeniable.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Patient. Calculated. Clinical. When you move — it ends fast.",
          },
        ],
      },
      {
        situation: "You win. The Stocking Stuffer Contract is in your hands. The crowd boos. Armstrong is ringside. What do you say?",
        options: [
          {
            text: "Say nothing. Hand the contract to Armstrong and walk.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The silence is the statement. Impact Society walks out with the contract.",
          },
          {
            text: "Thank you SSW! We'll use this contract for a great match!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You're making the crowd like you after winning a heel Triple Threat. Wrong.",
          },
          {
            text: "LOOK AT THESE TITLES! WHO'S THE BEST NOW?",
            isCorrect: false,
            crowdReaction: "heat",
            feedback: "You got heat but you looked desperate for it. A confident heel doesn't beg the crowd for a reaction.",
          },
          {
            text: "This is what Project Mayhem does. This is Impact Society. Goodnight.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Clean, branding, exit. You left the room with the belts AND the last word. Perfect heel.",
          },
        ],
      },
    ],
  },

  {
    id: "ch5-ssw-titles",
    era: 5,
    eraName: "Era 5: Mirai no Sutā",
    title: "The Cash-In",
    date: "November 11, 2017",
    venue: "Super Star Wrestling November Reign — Scotland Community Center",
    city: "Scotland, PA",
    opponentId: "big-new-yorker",
    stipulation: "SSW Tag Team Championship — Stocking Stuffer Contract Cash-In: Impact Society vs The Big New Yorkers",
    historicalResult: "win",
    historicalNote: "November 11, 2017. SSW November Reign. Scotland Community Center, Scotland, PA. Impact Society cashed in the Stocking Stuffer Contract against The Big New Yorkers for the SSW Tag Team Championships — and WON. Rich $teve and Adam Armstrong's first title. The first championship of Rich $teve's career.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "November 11, 2017. SSW November Reign. Scotland Community Center. Scotland, PA.",
      },
      {
        speaker: "NARRATOR",
        text: "Impact Society holds the Stocking Stuffer Contract. They've chosen tonight. They've chosen The Big New Yorkers.",
      },
      {
        speaker: "NARRATOR",
        text: "Armstrong is ready. $teve is ready. The contract is cashed.",
      },
      {
        speaker: "Rich $teve",
        text: "We earned this shot in August. Three teams. One contract. We took it. Now — we take the belts.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Impact Society wins the SSW Tag Team Championships. The cash-in works.",
        },
        {
          speaker: "NARRATOR",
          text: "Rich $teve and Adam Armstrong hold gold in SSW. The Chicken Shit Mastermind strategy delivers.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "The Big New Yorkers retain. Impact Society's cash-in fails.",
        },
        {
          speaker: "NARRATOR",
          text: "Big New Yorkers win. First title victory. The contract — worthless.",
        },
        {
          speaker: "NARRATOR",
          text: "The SSW chapter of Impact Society closes without a title. $teve will carry this.",
        },
      ],
    },
  },

  // ══ ERA 4: WELCOME TO #HIJACKED ═════════════════════════════

  {
    id: "ch4-big-mike",
    era: 4,
    eraName: "Era 4: Welcome to #Hijacked",
    title: "Retribution",
    date: "November 4, 2017",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "rd-cordova",
    stipulation: "5-on-5 Elimination — Team Mayhem ($teve, Mac, Vox, Wrex, Grizzly Redwood) vs Team Rampage (Big Mike, Yams, JT Funk, R.D. Cordova, Andre Cash)",
    historicalResult: "win",
    historicalNote: "November 4, 2017. Rampage Pro Wrestling 'Retribution.' Mayhem at full strength: Rich $teve and Mac Mayhem leading, with #BRUH (Johnny Xross and Ray Rumble) as the tag backbone, Wrex Savage, Grizzly Redwood. Team Rampage: Big Mike, Yams, JT Funk, R.D. Cordova, Andre Cash. If Team Rampage loses, Big Mike's career as ring announcer is over. Rich $teve pinned R.D. Cordova to seal the win. Mayhem's last great triumph — one month before everything changed.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "November 4, 2017. Rampage Pro Wrestling. The stakes couldn't be higher.",
      },
      {
        speaker: "NARRATOR",
        text: "Team Rampage: Big Mike, Yams, JT Funk, R.D. Cordova, Andre Cash. If they lose — Big Mike retires as ring announcer.",
      },
      {
        speaker: "NARRATOR",
        text: "Team Mayhem: $teve, Mac, Vox, Wrex, Grizzly Redwood. Five against five. Elimination rules.",
      },
      {
        speaker: "Rich $teve",
        text: "Big Mike chose to make this personal. Five men can't protect him from what Project Mayhem does tonight.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "One. Two. Three. R.D. Cordova pinned. Team Rampage loses.",
        },
        {
          speaker: "NARRATOR",
          text: "Big Mike's microphone goes silent. As ring announcer — he is finished.",
        },
        {
          speaker: "Rich $teve",
          text: "We don't just beat people, Mike. We end chapters.",
          isPromo: true,
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Team Mayhem couldn't finish the job. Big Mike survives — for now.",
        },
      ],
    },
  },

  {
    id: "ch6-gm-loophole",
    era: 6,
    eraName: "Era 6: The Year of Mayhem",
    title: "The GM Loophole",
    date: "2018",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    stipulation: "Big Mike Returns — The Loophole Revealed",
    historicalResult: "story",
    historicalNote: "Big Mike returned to Rampage as the new General Manager. The contract only barred him from being ring announcer — not GM. $teve sold the realization entirely through facial expression. Not one word.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "Big Mike has returned to Rampage. New role. General Manager.",
      },
      {
        speaker: "NARRATOR",
        text: "The contract only said ring announcer. It said nothing about General Manager.",
      },
      {
        speaker: "NARRATOR",
        text: "$teve enters the arena. Sees Mike at the GM podium.",
      },
      {
        speaker: "NARRATOR",
        text: "The realization hits him — and he sells it entirely through his face. Not one word. The crowd reads every thought.",
      },
      {
        speaker: "Rich $teve",
        text: "...",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "You enter the arena. Big Mike is standing at the GM podium. He's back. The crowd goes crazy. They're looking at you for a reaction.",
        options: [
          {
            text: "Say absolutely nothing. Let your face do the work.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The crowd reads every thought across your face. A silent heel sell in a loud building — this is the moment.",
          },
          {
            text: "THIS ISN'T OVER, MIKE! WE'RE NOT DONE!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You reacted like a babyface chasing revenge. That's not Rich $teve — that's someone who lost.",
          },
          {
            text: "That's impossible! I had him retired! This cannot be happening!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "Shock and denial gives Mike the power in the room. He looks like he won. Wrong.",
          },
          {
            text: "ATTORNEYS. I need my attorneys. Right now.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Heel logic. You're not angry — you're looking for the counter-attack. The crowd hates it. Good.",
          },
        ],
      },
      {
        situation: "Mike is reading from a contract at the podium. You grab your own copy. You read. You find the loophole — it says ring announcer. Not GM.",
        options: [
          {
            text: "It says ring announcer. It says RING ANNOUNCER. You son of a—",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "You're furious — but it's heel-fury. The crowd loves Mike more because of your reaction. Perfect dynamic.",
          },
          {
            text: "Well played, Mike. I didn't see that coming.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You're giving Mike credit? A heel does not congratulate the guy who outmaneuvered him.",
          },
          {
            text: "I'll take this to the Board of Directors first thing tomorrow morning.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "Too corporate-calm. The room needed an emotional reaction from you. This fell flat.",
          },
          {
            text: "Crumple the contract. Don't say a word. Walk to the back.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The dramatic exit without words. The crowd reads pure fury in the silence. That's the sell.",
          },
        ],
      },
      {
        situation: "The crowd is on their feet for Big Mike. He's soaking in the ovation. You're still visible at the entrance. Final image of the segment.",
        options: [
          {
            text: "Walk out slowly. Jaw clenched. Eyes on Mike. Not one word.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The slow walk tells the whole story. The crowd boos you out. Mike gets his moment. Right call.",
          },
          {
            text: "I'm going to get you fired, Mike! This is not OVER!",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You interrupted his moment with a cheap threat. That breaks the spell of the silent sell.",
          },
          {
            text: "Fine. You want to be GM? I'll play by your rules.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "That's almost a heel acceptance speech. You can't show that you're okay with this.",
          },
          {
            text: "Turn your back on him. Don't give him the acknowledgment of eye contact.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Dismissing someone by refusing to look at them — that's maximum disrespect, which is maximum heat.",
          },
        ],
      },
    ],
  },

  {
    id: "ch4-bruh-turns",
    era: 4,
    eraName: "Era 4: Welcome to #Hijacked",
    title: "Big Mike's Curtain Call",
    date: "December 9, 2017",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    stipulation: "Randolph Scot Memorial 25-Man Rumble — Rampage Pro Wrestling 'Big Mike's Curtain Call'",
    historicalResult: "lose",
    historicalNote: "December 9, 2017. Rampage Pro Wrestling 'Big Mike's Curtain Call.' Rich $teve entered the Randolph Scot Memorial 25-man rumble — and was the last man eliminated. Big Mike threw him out. But after the rumble ended, the night was far from over. Johnny Xross and Ray Rumble announced they were done with Project Mayhem. The crowd cheered. George Burkett walked out with them. When the celebration died down, $teve found Xross near the cage — face to face, no crowd, no performance — and told him: 'I want you to remember one thing, #Bruh. I created you. I made you both who you are. Without me you would be nothing. You betrayed what was supposed to be a real friendship, and for what? For some idiot in a stupid hat? You made the biggest mistake you could when you crossed us.' The clock started that night. October 13, 2018 was the collection date.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "December 9, 2017. Rampage Pro Wrestling. Big Mike's Curtain Call.",
      },
      {
        speaker: "NARRATOR",
        text: "This is the night after Retribution — Mayhem's biggest win. $teve. Mac. Wrex. Vox. And the tag backbone: #BRUH — Johnny Xross and Ray Rumble, managed by George Burkett. They have been together through all of 2017. Coalition to Mayhem. One unit.",
      },
      {
        speaker: "NARRATOR",
        text: "Big Mike's last night as ring announcer. The Randolph Scot Memorial 25-man battle royal. $teve enters. Last man standing wins.",
      },
      {
        speaker: "NARRATOR",
        text: "$teve is the last one. One elimination away from the finish. And the man waiting to throw him out is Big Mike himself.",
      },
      {
        speaker: "Rich $teve",
        text: "This is Big Mike's night? Fine. Let him have the stage. Because when this rumble is over — every eye in that building will still be on me.",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "Johnny Xross and Ray Rumble stand in the middle of the ring. They announce they're done with Project Mayhem. The crowd cheers. The locker room watches.",
        options: [
          {
            text: "Anyone who leaves Project Mayhem gets exactly what they deserve on the outside.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Calm. Certain. No yelling. Just a fact. The crowd hates it. That's the correct register.",
          },
          {
            text: "Guys, the door is always open if you change your minds. We're family.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You're being gracious on the way out. That makes you look weak. A heel doesn't offer olive branches.",
          },
          {
            text: "Fine. Go. See how far you get without me building this for you.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Taking credit for everything they have while dismissing their departure — perfect heel logic.",
          },
          {
            text: "Xross. Rumble. Let's talk about this privately. Come to the back.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You tried to de-escalate in public. The crowd saw weakness. A heel does not negotiate publicly.",
          },
        ],
      },
      {
        situation: "#BRUH is cutting their exit promo, explaining their reasons for leaving. The crowd is reacting. You're still standing in the ring behind them.",
        options: [
          {
            text: "Stand behind them. Arms crossed. Stone-faced. Let them finish.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Your presence looming behind them creates menace without words. The crowd boos you for just existing there.",
          },
          {
            text: "Leave the ring to give them space. Let them have their moment.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You graciously stepped aside and gave them the ring. That's babyface behavior.",
          },
          {
            text: "Interrupt them mid-sentence. Take the mic.",
            isCorrect: false,
            crowdReaction: "heat",
            feedback: "You got heat, but you also cut off a turn that the crowd was invested in. Short-sighted.",
          },
          {
            text: "Wait until they're completely done. Let the silence hang. Then smile slowly.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The slow smile says: I'm not threatened. This is going to cost them. Maximum heel.",
          },
        ],
      },
      {
        situation: "George Burkett walks out and stands with #BRUH. He's betraying Project Mayhem openly. The room is watching your reaction.",
        options: [
          {
            text: "Burkett. Good luck. You're going to need it more than they will.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "You called them weak while dismissing Burkett. Cold, classy heel work.",
          },
          {
            text: "Burkett, don't do this. We can work something out.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You showed desperation. The crowd sees you reaching for loyalty you lost. Wrong.",
          },
          {
            text: "Fine. All of you — go. I don't need any of you.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "The dismissal covers your anger. The crowd reads it as arrogance. Perfect.",
          },
          {
            text: "You think you're better off without me? Go find out.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "A challenge wrapped in a dismissal. It works. The crowd knows the consequences are coming.",
          },
        ],
      },
      {
        situation: "The crowd is celebrating. #BRUH is gone. The show is over. You find Xross near the cage — alone. You get in his face. This is not in front of the crowd. This is real.",
        options: [
          {
            text: "I want you to remember one thing, #Bruh. I created you. I made you both who you are. Without me you would be nothing. You made the biggest mistake you could when you crossed us.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "That's the line. Word for word, it happened. Low voice. No performance. Just a promise. This is the real Rich $teve.",
          },
          {
            text: "You'll regret this. I'll make sure of it.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "A generic threat. The moment required specificity. You had years of history with this man — use it.",
          },
          {
            text: "You betrayed what was supposed to be a real friendship. For what? For some idiot in a stupid hat.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Now you're in the real language of the moment. The 'idiot in a stupid hat' is Burkett. The crowd doesn't hear this — but Xross does. That's the point.",
          },
          {
            text: "This is just business. No hard feelings. Good luck out there.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You tried to be professional and detached. But this was personal. A true heel acknowledges the personal — and weaponizes it.",
          },
        ],
      },
    ],
  },

  // ══ ERA 6: THE YEAR OF MAYHEM ═══════════════════════════════

  {
    id: "ch5-riot-rumble",
    era: 6,
    eraName: "Era 6: The Year of Mayhem",
    title: "The Riot Rumble",
    date: "March 10, 2018",
    venue: "Rampage Pro Wrestling 'Vengeance' — Delaware Agricultural Museum",
    city: "Dover, DE",
    opponentId: "eb-cohen",
    stipulation: "Riot Rumble Battle Royal — Last man standing earns a guaranteed title contract: any time, any place of their choosing",
    historicalResult: "win",
    historicalNote: "March 10, 2018. Rampage Pro Wrestling 'Vengeance.' Delaware Agricultural Museum. Dover, DE. Rich $teve won the Riot Rumble battle royal — last eliminating E.B. Cohen — earning a guaranteed briefcase redeemable for any Rampage title, any time, any place of his choosing.",
    riotRumbleChapter: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "The Riot Rumble. Last man standing wins a guaranteed title contract — any Rampage championship, any time, any place of their choosing.",
      },
      {
        speaker: "NARRATOR",
        text: "Yams the Working Man sits on top of Rampage as Heavyweight Champion. $teve has no respect for Yams and has made it known — publicly, repeatedly.",
      },
      {
        speaker: "NARRATOR",
        text: "Win this, and the champion's title is just a matter of when $teve decides to cash in.",
      },
      {
        speaker: "Rich $teve",
        text: "Any time. Any place. Of my choosing. That's the contract. And I intend to collect.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Rich $teve wins the Riot Rumble. The briefcase — the contract — is his.",
        },
        {
          speaker: "Rich $teve",
          text: "Yams. I have this. And you don't know when. That's the point.",
          isPromo: true,
        },
        {
          speaker: "NARRATOR",
          text: "The public story: Rich $teve vs Yams. The briefcase is coming for the Heavyweight Title. Everyone can see it. The bathtub. The cosplay. The beard. The Invasion promo. That's what everyone is supposed to see.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Eliminated. The contract goes to someone else tonight.",
        },
        {
          speaker: "NARRATOR",
          text: "The story isn't over. $teve will find another way.",
        },
      ],
    },
  },

  {
    id: "ch5-guerrero",
    era: 6,
    eraName: "Era 6: The Year of Mayhem",
    title: "The Guerrero Special",
    date: "April 21, 2018",
    venue: "Rampage Pro Wrestling 'Apocalypse' — Delaware Agricultural Museum",
    city: "Dover, DE",
    opponentId: "eb-cohen",
    stipulation: "Singles Match — Riot Rumble Contract on the Line",
    historicalResult: "win",
    historicalNote: "April 21, 2018. Rampage Pro Wrestling 'Apocalypse.' Delaware Agricultural Museum. Dover, DE. $teve tossed the Riot Rumble lockbox to E.B. Cohen, faked a concussion so convincingly that building security called for medical help. After the DQ bell rang, he dropped the act entirely. Security bowed on the way out. Contract retained.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "April 21, 2018. One month after winning the Riot Rumble. $teve has been feuding hard with Yams — broken into his house, filmed a promo from his bathtub. Everyone assumes the lockbox is going to Yams eventually. That's the plan. That's what they need to believe.",
      },
      {
        speaker: "NARRATOR",
        text: "Tonight the contract itself is on the line. E.B. Cohen — 'Pancakes' — is the opponent. If Cohen wins, the briefcase changes hands.",
      },
      {
        speaker: "NARRATOR",
        text: "$teve's plan: the Guerrero Special. Toss the lockbox to Cohen. Take the hit. Sell the concussion.",
      },
      {
        speaker: "NARRATOR",
        text: "Building security calls for a medical team. The crowd believes it.",
      },
      {
        speaker: "NARRATOR",
        text: "The DQ bell rings. The contract is safe. $teve stands up. Cold. Calculated. Revelation.",
      },
      {
        speaker: "Rich $teve",
        text: "Eddie Guerrero was a genius. That spot was my tribute. The fact that security actually came over — that's not a mistake, that's mastery.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "DQ victory. Contract retained. Security bowing on the way out.",
        },
        {
          speaker: "NARRATOR",
          text: "That's not a trick. That's the most sophisticated heel work on the East Coast.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "The plan didn't hold. But the concept was right. The execution will be sharper next time.",
        },
      ],
    },
  },

  {
    id: "ch5-bookstore",
    era: 6,
    eraName: "Era 6: The Year of Mayhem",
    title: "Big Mike Day",
    date: "July 14, 2018",
    venue: "The Book Warehouses — Lancaster, PA",
    city: "Lancaster, PA",
    stipulation: "The Bookstore Incident — Big Mike's 'The Weird One' Book Signing",
    historicalResult: "story",
    historicalNote: "July 14, 2018. Lancaster, PA. Rich $teve crashed Big Mike's memoir signing at The Book Warehouses. Zero customers. He pulled out the Riot Rumble contract, mocked the book, took the candy, drank Mike's water, and left with the rest of the candy for the road. Context: by this point in 2018, $teve had already broken into Yams' house (bathtub promo), showed up at a cosplay event dressed as Yams, and shaved Yams' beard. Ryan Vox and Kory Cross quit Mayhem over it — forming Working Class Heroes with Yams. Steve had cut an Invasion promo that angered Yams enough to offer a title match (resulting in a DQ). Everyone was watching the Yams feud. Nobody was watching the lockbox.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "Big Mike has written a memoir. 'The Weird One.' He is doing a book signing in Lancaster, PA.",
      },
      {
        speaker: "NARRATOR",
        text: "$teve finds out. He shows up.",
      },
      {
        speaker: "Rich $teve",
        text: "We found Big Mike Day! Look, I can't forget my contract — you never know, there might be a Working Man around. I always got the thing on me. Cash in any time, any place, of my choosing.",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "Are people actually paying money to meet this guy? Meet the author, Big Mike Scott. Mike, can you sign this for me? Do you know what I got right here? The Rampage Riot Rumble contract. The one that I put you into. The retirement that Project Mayhem caused.",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "How many people have actually come to see this fat piece of crap today? How many? Zero. That is hilarious, Mike.",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "I'm gonna take these. I'll leave you two. But Mike — since you've left Rampage, things have been great. Project Mayhem has only been getting better. And one more thing: soon, I'm gonna be the Rampage Pro Wrestling Heavyweight Champion. So keep selling The Weird One. I'm taking my water back. Have a great day, folks.",
        isPromo: true,
      },
    ],
    promoGame: [
      {
        situation: "You walk into a Lancaster, PA bookstore. Big Mike is at a table with copies of 'The Weird One.' Zero customers. He sees you enter.",
        options: [
          {
            text: "We found Big Mike Day! I can't forget my contract — you never know, there might be a Working Man around.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "That's the real line. You walked in already working. Zero warmup needed. The contract appears immediately.",
          },
          {
            text: "Mike, congratulations on the book launch! How's it going so far?",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "You're being cordial. This is not a cordial visit. You're here to make a point.",
          },
          {
            text: "Interesting choice of venue, Mike. Good exposure here?",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "Small talk. You're Rich $teve. You don't do small talk with people you've already beaten.",
          },
          {
            text: "I heard about the book and wanted to come support you.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "Genuine support? You crashed this signing to humiliate him. Get back in character.",
          },
        ],
      },
      {
        situation: "You pull out the Riot Rumble cash-in contract. Mike goes quiet. The moment you've been waiting for.",
        options: [
          {
            text: "Are people actually paying money to meet this guy? Do you know what I got right here? The Rampage Riot Rumble contract. The one that I put you into. The retirement that Project Mayhem caused.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Real quote. Every sentence a dagger. The contract is the murder weapon and you're holding it up.",
          },
          {
            text: "This contract means I can cash in for any title. Just wanted you to know, Mike.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "You're explaining the contract instead of weaponizing it. That's weak. Use it against him personally.",
          },
          {
            text: "Since I'm here, do you want to sign this one too? Maybe you've got a pen.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "A decent jab. But it misses the emotional devastation of the real line. Not enough.",
          },
          {
            text: "Remember this piece of paper, Mike? The thing that ended your career? Let me remind you.",
            isCorrect: false,
            crowdReaction: "heat",
            feedback: "Close. But generic. The power of the real line is its specific, verbatim detail about the retirement.",
          },
        ],
      },
      {
        situation: "Zero customers have come in. Big Mike has nothing. You're about to close the bit. One last line.",
        options: [
          {
            text: "How many people have actually come to see this fat piece of crap today? How many? Zero. That is HILARIOUS, Mike.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Real quote. The laugh at the end is the most devastating part. Pure heel execution.",
          },
          {
            text: "Well Mike, I hope the rest of the signing goes better. Keep grinding.",
            isCorrect: false,
            crowdReaction: "pop",
            feedback: "Positive send-off. That's the exact opposite of what this promo needs.",
          },
          {
            text: "Maybe try a different city next time. Or lower the price.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "Marketing advice for a man you just destroyed? This isn't a consulting session.",
          },
          {
            text: "Zero. Count them. That's your fanbase, Mike. Zero people. That's what Project Mayhem left you with.",
            isCorrect: false,
            crowdReaction: "heat",
            feedback: "Good energy. But the real line's laugh is what elevates it. The joy is part of the punishment.",
          },
        ],
      },
      {
        situation: "You've made your point. Time to exit. You spot a bowl of candy on the table and Mike's water bottle.",
        options: [
          {
            text: "I'm gonna take these. And Mike — I'm taking my water back. Have a great day, folks.",
            isCorrect: true,
            crowdReaction: "heat",
            feedback: "Real quote. 'My water' is the perfect absurdist closer. You take the props and leave him with nothing.",
          },
          {
            text: "Mind if I take a piece? Thanks, Mike. See you at Rampage.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "Polite. Measured. You just ended a masterpiece promo with a handshake. No.",
          },
          {
            text: "Leave without taking anything. Let the humiliation speak for itself.",
            isCorrect: false,
            crowdReaction: "silence",
            feedback: "The candy and the water ARE the humiliation. Taking his things is the physical exclamation point.",
          },
          {
            text: "Knock the candy off the table. Make a mess. Leave.",
            isCorrect: false,
            crowdReaction: "heat",
            feedback: "You got heat but it's cheap heat. Taking the items is smarter — and funnier — than destroying them.",
          },
        ],
      },
    ],
  },

  {
    id: "ch5-korpse",
    era: 5,
    eraName: "Era 5: Mirai no Sutā",
    title: "No Turning Back",
    date: "January 20, 2018",
    venue: "Neumann University",
    city: "Aston, PA",
    opponentId: "korpse",
    stipulation: "Grudge Match — ACPW Return. 12 Years in the Making.",
    historicalResult: "lose",
    historicalNote: "First-ever match between Rich $teve and Korpse as opponents. $teve lost. The Road Dog became the opponent — and the teacher won.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "January 20, 2018. ACPW. Neumann University. Aston, PA.",
      },
      {
        speaker: "NARRATOR",
        text: "Years away from ACPW. $teve says no when they call. Then they tell him who the opponent is. Korpse.",
      },
      {
        speaker: "Rich $teve",
        text: "When I was first approached by ACPW and asked if I would be a part of their return show... my response was no. ACPW is my past. I was that little greenhorn who thought he knew everything. I mean, I pretty much did know everything, but since I've left there, I have continued to evolve. Why would I grace them with my presence?",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "But then they told me: 'We want you to wrestle Korpse.' That got my attention. Where the hell has Korpse been? He has done absolutely nothing of note since ACPW closed. An insane asylum? Wow.",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "You have somebody who has not left a one-cell room for years going up against a man who is at the peak of his career — no, who is going higher every single day.",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "I'm not that little 16-year-old kid you posted in the video. I'm a man now. You? You were just a conversation piece. People don't remember your name. They just go, 'There was a guy who looked like a midget Undertaker and wore an ICP shirt.'",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "Korpse, I am going to show you that the student has far, far surpassed the teacher. And when I pin you — because I will — you're gonna look up at me with those cold dead eyes and realize that I always have been, and I always will be, better than you. One. Two. Three.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "In the game, the student finally surpasses the teacher.",
        },
        {
          speaker: "NARRATOR",
          text: "That promo was right. You made it right tonight.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Korpse wins. The teacher defeats the student. January 20, 2018.",
        },
        {
          speaker: "NARRATOR",
          text: "This was the real result. Their first and only meeting as opponents.",
        },
        {
          speaker: "NARRATOR",
          text: "That doesn't make the promo any less accurate. $teve believed every word. The promo was perfect. The match just didn't go his way.",
        },
      ],
    },
  },

  {
    id: "ch5-lethal-lottery",
    era: 6,
    eraName: "Era 6: The Year of Mayhem",
    title: "The Solo Tag Title Heist",
    date: "October 13, 2018",
    venue: "PTV Lethal Lottery — Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "ray-rumble",
    stipulation: "Riot Rumble Cash-In — Rampage Tag Team Championships",
    historicalResult: "win",
    historicalNote: "October 13, 2018. Rampage Pro Wrestling PTV Lethal Lottery. Dover, DE. The year-long plan comes due. The bracket randomly assigns Rich $teve and Ray Rumble as partners. Everyone assumes the Riot Rumble briefcase will be cashed on Yams — $teve has feuded publicly with Yams all year (bathtub promo, cosplay show appearance, shaving Yams' beard, the Invasion promo, the DQ title match, the formation of Working Class Heroes). Nobody remembers the lockbox could go anywhere. Nobody except George Burkett, who immediately warns the crowd: don't trust Rich $teve. First round: $teve and Ray defeat Muddy Waters and Brother Greatness. Stage Three: the band is back together. Semifinals: Riot City's Most Wanted eliminates them. Tournament is over. Ray is shaken, vulnerable, still in the building. Johnny Xross is not at the show — he's home. $teve hits the Money Drop. Cashes the Riot Rumble briefcase. Pins his own partner. Walks out the sole holder of both Rampage Pro Wrestling Tag Team Championship belts. The plan from day 1. December 9, 2017 was the start. October 13, 2018 was the finish.",
    riotRumbleChapter: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "October 2, 2018. The PTV Lethal Lottery bracket is announced. Rich $teve's randomly assigned partner: Ray Rumble.",
      },
      {
        speaker: "NARRATOR",
        text: "Everyone assumes the Riot Rumble briefcase is going to be cashed on Yams. $teve has been feuding with him all year. The beard. The bathtub. The cosplay. Everyone is watching that hand.",
      },
      {
        speaker: "Rich $teve",
        text: "I think that it's absolutely appalling that I go from fighting Yams The Working Man to being forced to team with my former associate, and known traitor, Ray Rumble at the PTV Lethal Lottery. But I guess I'll show #Bruh a little bit about how Project Mayhem does things, since they seem to have forgotten their roots.",
        isPromo: true,
      },
      {
        speaker: "NARRATOR",
        text: "Stage One: Outrage. October 2. That was the public face. The fans bought it. They thought he was furious about the pairing.",
      },
      {
        speaker: "NARRATOR",
        text: "George Burkett heard the announcement. He was the only one in the entire wrestling world who immediately called it. He warned Ray. He warned the crowd. Don't trust Rich $teve.",
      },
      {
        speaker: "NARRATOR",
        text: "October 4. Stage Two. Rich $teve posts a photo of happier times — him, Xross, and Ray Rumble.",
      },
      {
        speaker: "Rich $teve",
        text: "On 10/13 Ray and myself will try and put our difference aside for one night to win the damn thing. At the PTV Lethal Lottery — see the reunion that no one thought would ever happen.",
        isPromo: true,
      },
      {
        speaker: "NARRATOR",
        text: "Reluctant acceptance. The fans are eating it up. Ray is starting to hear it. The 'band is back together.' One night. For old times.",
      },
      {
        speaker: "NARRATOR",
        text: "October 13. Show night. Johnny Xross is not at the building. He's alone. Ray Rumble is in the tournament with his former boss — the man who stood over him through a cage and said 'I created you.'",
      },
      {
        speaker: "NARRATOR",
        text: "First round: $teve and Ray Rumble defeat Muddy Waters and Brother Greatness. It's working. Ray is starting to trust it. Stage Three — the band is back together.",
      },
      {
        speaker: "NARRATOR",
        text: "Semifinals: Riot City's Most Wanted eliminates them. The tournament run is over. Ray Rumble is shaken. He's still in the building. The briefcase is still in $teve's pocket. And everyone has forgotten it was never meant for Yams.",
      },
      {
        speaker: "George Burkett",
        text: "I told you. I told every single one of you — you cannot trust Rich $teve. He is not Ray's partner. He has never been Ray's partner. Do NOT turn your back on him.",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "Any time. Any place. Of my choosing. The long game doesn't have a clock — until it does.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Money Drop. One. Two. Three.",
        },
        {
          speaker: "NARRATOR",
          text: "Rich $teve stands in the ring holding both Rampage Pro Wrestling Tag Team Championship belts. Solo. George Burkett was right. Nobody listened.",
        },
        {
          speaker: "Rich $teve",
          text: "BRUH! BRUH! BRUH! You Dover fans are so stupid.",
          isPromo: true,
        },
        {
          speaker: "NARRATOR",
          text: "The next day — October 14, 2018. The dust settles. $teve posts the cage photo. December 9, 2017. Steve staring through the cage at Johnny Xross.",
        },
        {
          speaker: "Rich $teve",
          text: "Now that the dust has settled — this was the plan from day 1. In this moment, I was telling Johnny Xross that I wasn't going to forget what they did to us. In this moment, I vowed my revenge. In THIS MOMENT, I knew it was only a matter of time. Unlike you idiots, I play the long game. I want to thank Johnny Malloy and Yams for playing their part. Really. You both kept the fans so distracted. They really thought I was going to cash in on one of you two. I even got the chance to shave that stupid beard off of Yams' face as a bonus. But the plan all along was #BRUH. And now I can sit back and smile as your NEW Rampage Pro Wrestling Tag Team Champion.",
          isPromo: true,
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Ray survives. Burkett was right — and $teve missed his window.",
        },
      ],
    },
  },

  {
    id: "ch5-last-shot",
    era: 6,
    eraName: "Era 6: The Year of Mayhem",
    title: "The Final Shot",
    date: "April 27, 2019",
    venue: "Rampage Pro Wrestling — The Final Shot",
    city: "Devil's Playpen",
    opponentId: "big-mike",
    stipulation: "6-Man Tag — Jay Cortez + Rich $teve + Wrex Savage vs Yams + Big Mike + Kory Cross (WCH)",
    historicalResult: "story",
    historicalNote: "The final Rampage Pro Wrestling show. 6-man tag: Jay Cortez, Rich $teve, and Wrex Savage vs Yams, Big Mike, and Kory Cross (managing Working Class Heroes). Jay Cortez gets pinned. Big Mike becomes GM. Mac Mayhem turned face. The last chapter.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "April 27, 2019. The Final Shot. The last Rampage Pro Wrestling show.",
      },
      {
        speaker: "NARRATOR",
        text: "Six men. Jay Cortez, Rich $teve, Wrex Savage versus Yams, Big Mike, Kory Cross.",
      },
      {
        speaker: "NARRATOR",
        text: "Mac Mayhem is gone — turned face. The Project Mayhem inner circle is fractured. Cortez is all that's left alongside $teve.",
      },
      {
        speaker: "NARRATOR",
        text: "Big Mike wants the GM seat. Kory Cross has the Working Class Heroes in his corner. This is the endgame.",
      },
      {
        speaker: "Rich $teve",
        text: "Cortez is my partner tonight. I've had worse. Big Mike wants to be GM — over my dead body. I'll tear every Working Class Hero apart to keep that from happening.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Team $teve wins the last Rampage Pro Wrestling match.",
        },
        {
          speaker: "NARRATOR",
          text: "But history says Cortez gets pinned. Big Mike gets the GM seat. The story ends the same way.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Jay Cortez is pinned. It's over.",
        },
        {
          speaker: "NARRATOR",
          text: "Big Mike becomes GM. Rampage Pro Wrestling ends under his control.",
        },
        {
          speaker: "NARRATOR",
          text: "Rampage Pro Wrestling is finished. Rich $teve walks out the same way he walked in — alone.",
        },
      ],
    },
  },

  // ══ ERA 6: THE LOST ENDING ══════════════════════════════════

  {
    id: "ch6-mac-mayhem",
    era: 7,
    eraName: "Era 7: The Lost Ending",
    title: "The Ascent — vs. Mac Mayhem",
    date: "The Show That Never Happened",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "mac-mayhem",
    stipulation: "Rampage Heavyweight Championship — Mayhem Rules Match",
    historicalResult: "win",
    historicalNote: "This match was planned but never happened. Rampage collapsed before the story could finish. Here — you finish it. You must win to advance.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "This match never happened.",
      },
      {
        speaker: "NARRATOR",
        text: "Rampage Pro Wrestling collapsed before the story reached its ending. The Mayhem Rules Match was scheduled. Jay Cortez had revealed himself as Higher Power. Mac had gone full 'Emphasis on ME.'",
      },
      {
        speaker: "NARRATOR",
        text: "The Rampage Heavyweight Championship was supposed to come home to $teve. Here — it does.",
      },
      {
        speaker: "Rich $teve",
        text: "What is the name of the team? What is the name of the team, Mac?",
        isPromo: true,
      },
      {
        speaker: "Mac Mayhem",
        text: "It's Project Mayhem. Emphasize on Mayhem. ME!",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "Oh really? For the past couple of months it's always been Rich $teve this, Rich $teve that. And you're wearing Riot City gear. At least I know what a team is!",
        isPromo: true,
      },
      {
        speaker: "Mac Mayhem",
        text: "At least I know what a team is!",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "If it wasn't for me — we wouldn't have gotten to the level we're at. Tonight, I prove it. Not for you. Not for them. For the history of this character. For everything I built.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Money Drop. One. Two. Three.",
        },
        {
          speaker: "NARRATOR",
          text: "Rich $teve is the Rampage Pro Wrestling Heavyweight Champion.",
        },
        {
          speaker: "NARRATOR",
          text: "The story Rampage never got to tell — you just told it.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Mac Mayhem retains. The Emphasis on ME stands.",
        },
        {
          speaker: "NARRATOR",
          text: "This chapter doesn't close until you win it. Rich $teve doesn't leave without that title.",
        },
      ],
    },
  },

  {
    id: "ch6-johnny-xross",
    era: 7,
    eraName: "Era 7: The Lost Ending",
    title: "The Finale — vs. Johnny Xross",
    date: "The Night After It Never Happened",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "johnny-xross",
    stipulation: "Rampage Heavyweight Championship",
    historicalResult: "lose",
    historicalNote: "The planned ending: Johnny Xross returns immediately to challenge. $teve puts him over — crowning a new champion. The Credibility Rule made real. The full circle.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "You are the Rampage Heavyweight Champion.",
      },
      {
        speaker: "NARRATOR",
        text: "Johnny Xross returns immediately. The man from The Original Coalition. The man who turned babyface. One of the best in Rampage.",
      },
      {
        speaker: "NARRATOR",
        text: "This was the plan: $teve holds it long enough to make it mean something. Then passes it to the right guy.",
      },
      {
        speaker: "Rich $teve",
        text: "Johnny. You want this? Then earn it.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "You kept the title. That wasn't the plan — but you're the champion. That choice is yours.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Johnny Xross wins the Rampage Pro Wrestling Heavyweight Championship.",
        },
        {
          speaker: "NARRATOR",
          text: "The Credibility Rule. Build up your opponent. Don't bury them. If you bury your opponent and then beat them, you defeated a nobody. Keep them credible — and your loss means something.",
        },
        {
          speaker: "NARRATOR",
          text: "This was the plan all along. The story Steve Coleman spent 13 years writing — it ends with him putting someone else over.",
        },
        {
          speaker: "NARRATOR",
          text: "That's not losing. That's the business.",
        },
        {
          speaker: "Rich $teve",
          text: "Know your role on the show. Study everything. Always stay humble. If you keep to those things — you will be Undeniable and Irreplaceable.",
          isPromo: true,
        },
      ],
    },
  },
];

// ─── ERAS ────────────────────────────────────────────────────────

export const ERAS = [
  {
    id: 1,
    name: "Era 1",
    subtitle: "The Future",
    years: "2006–2007",
    description: "Age 16. Black eye makeup. Managing Living Dead 2k6 at Northeast Community Center. Korpse. Dr. Spider. The Nightmare Before Christmas. Then — finally — they let him wrestle.",
    chapterIds: ["ch1-managing-debut", "ch1-korpse-manager", "ch1-nightmare-xmas"],
  },
  {
    id: 2,
    name: "Era 2",
    subtitle: "Daddy's Money",
    years: "2007–2012",
    description: "The in-ring debut. The Grand Championship match. A spike. And then — silence. Five years away from the business.",
    chapterIds: ["ch1-six-man-debut", "ch2-ortiz", "ch2-spike", "ch2-don-e-allen"],
  },
  {
    id: 3,
    name: "Era 3",
    subtitle: "OTCW & The Coalition",
    years: "2016–2017",
    description: "Crazii Shea calls. OTCW. The suit comes off. The Coalition forms. The scalping. Winter War. Spring Brawl. Then — Rampage.",
    chapterIds: ["ch3-hostile-takeover", "ch3-proving-ground", "ch3-september-remember", "ch3-winter-war", "ch3-spring-brawl", "ch3-riot-city-rules"],
  },
  {
    id: 4,
    name: "Era 4",
    subtitle: "Welcome to #Hijacked",
    years: "2017",
    description: "#BRUH at full power. Mayhem at its peak — $teve and Mac leading, Xross and Rumble as the tag backbone, Wrex, Vox. Retribution. Big Mike's Curtain Call. Then December 9th. The night that started the clock.",
    chapterIds: ["ch4-big-mike", "ch4-bruh-turns"],
  },
  {
    id: 5,
    name: "Era 5",
    subtitle: "Mirai no Sutā",
    years: "2017–2018",
    description: "Impact Society is born. AWA. The Stocking Stuffer Contract. The first title. No Turning Back — Rich $teve vs Korpse.",
    chapterIds: ["ch5-impact-debut", "ch5-awa-loss", "ch5-ssw-contract", "ch5-ssw-titles", "ch5-korpse"],
  },
  {
    id: 6,
    name: "Era 6",
    subtitle: "The Year of Mayhem",
    years: "2018–2019",
    description: "The Riot Rumble briefcase. Big Mike as GM — the loophole. Feuding with Yams. The bathtub promo. The cosplay. The beard. Vox and Kory turn. Everyone watching the wrong hand. And then — October 13th. The long game collected.",
    chapterIds: ["ch6-gm-loophole", "ch5-riot-rumble", "ch5-guerrero", "ch5-bookstore", "ch5-lethal-lottery", "ch5-last-shot"],
  },
  {
    id: 7,
    name: "Era 7",
    subtitle: "The Lost Ending",
    years: "The Night That Never Came",
    description: "Rampage collapsed before the story finished. The Mayhem Rules Match against Mac Mayhem. The Heavyweight Championship. And the ending that was always supposed to happen — against Johnny Xross.",
    chapterIds: ["ch6-mac-mayhem", "ch6-johnny-xross"],
  },
];

// ─── BOOKSTORE PROMO (Full Transcript) ─────────────────────────

export const BOOKSTORE_PROMO = `"We found Big Mike Day! Look, I can't forget my contract — you never know, there might be a Working Man around. In case Yams shows up, I got the thing on me. I always got the thing on me. Cash in any time, any place, of my choosing.

Are people actually paying money to meet this guy? Meet the author, Big Mike Scott.

Mike, can you sign this for me? Do you know what I got right here? That is the Rampage Riot Rumble contract. The one that I put you into. The retirement that Project Mayhem caused.

How many people have actually come to see this fat piece of crap today? How many? Zero. That is hilarious, Mike.

I'm gonna take these, though. I'll leave you two. But Mike — since you've left Rampage, things have been great. Project Mayhem has only been getting better.

And one more thing: soon, I'm gonna be the Rampage Pro Wrestling Heavyweight Champion. So keep selling The Weird One.

I'm taking my water back. Have a great day, folks. Remember — if you ever need an actual star, call somebody. Because this guy is selling nothing."`;

// ─── VALHALLA VISIONS CHAMPIONSHIP ─────────────────────────────

export const VALHALLA_VISIONS_CHAMPIONSHIP = {
  name: "Valhalla Visions Championship",
  description: "Commissioned by Robbie Blizzard, owner of Valhalla Visions photography. A traveling belt homed at Rampage Pro Wrestling. Held by Mac Mayhem and Greywolf at different points during the RPW run.",
  holders: ["Mac Mayhem", "Greywolf"],
};

// ─── FACTIONS ────────────────────────────────────────────────────

export const FACTIONS = [
  {
    name: "PROJECT MAYHEM",
    color: "#D4AF37",
    members: ["Rich $teve", "Mac Mayhem", "Ryan Vox", "Wrex Savage"],
    manager: "Kory Cross",
    higherPower: "Jay Cortez",
    description: "Born when Matt Wylde crossed the ring and renamed himself Mac Mayhem. Phase 1: $teve, Mac, Kory Cross, and #BRUH. Phase 2: Ryan Vox and Wrex Savage. The Emphasis on ME split almost broke it. The Lost Ending was supposed to bring it home.",
  },
  {
    name: "#BRUH",
    color: "#60a5fa",
    members: ["Johnny Xross", "Ray Rumble", "Trish Adora"],
    manager: "George Burkett",
    higherPower: null,
    description: "Started inside The Coalition. Turned babyface December 2017 and quit Project Mayhem. Under manager George Burkett — the only man who publicly called $teve's cash-in before it happened — they became Rampage Tag Team Champions.",
  },
  {
    name: "WORKING CLASS HEROES",
    color: "#4ade80",
    members: ["Yams the Working Man", "Ryan Vox"],
    manager: "Kory Cross",
    higherPower: null,
    description: "Formed when Kory Cross and Ryan Vox attacked Rich $teve mid-beard-shave attempt and quit Project Mayhem. Joined Yams. Kory Cross went from RCMW manager to Project Mayhem logistics to managing the team that faced Mayhem at The Last Shot.",
  },
  {
    name: "RIOT CITY'S MOST WANTED",
    color: "#ef4444",
    members: ["Siccend", "Vic Ramone", "Jason Drake", "Matt Wylde"],
    manager: "Kory Cross (pre-defection)",
    higherPower: null,
    description: "The original power of Rampage. Kory Cross managed them before following Matt Wylde across the ring. Everything about Project Mayhem started with dismantling RCMW.",
  },
  {
    name: "THE ORIGINAL COALITION",
    color: "#888888",
    members: ["Rich $teve", "Johnny Xross", "Ray Rumble", "Drew Bronson", "Allistar Conrad", "Jesse Skelton"],
    manager: null,
    higherPower: null,
    description: "OTCW era. The weapon Crazii Shea imported. Drew Bronson and Allistar Conrad kicked to the curb when the group went to Rampage and became Project Mayhem.",
  },
  {
    name: "IMPACT SOCIETY",
    color: "#f59e0b",
    members: ["Rich $teve", "Adam Armstrong"],
    manager: null,
    higherPower: null,
    description: "Super Star Wrestling (SSW) cross-promotion stable. SSW Tag Team Champions 2017.",
  },
  {
    name: "410 MASSIV",
    color: "#888888",
    members: ["R.D. Cordova", "Andre Cash"],
    manager: null,
    higherPower: null,
    description: "Tag team. R.D. Cordova was pinned by $teve to end Big Mike's announcing career.",
  },
  {
    name: "THE TALENT AGENCY",
    color: "#888888",
    members: ["Beard Villain Johnny Malloy", "Little Monster Binky", "E.B. Cohen", "Junior Reyes"],
    manager: null,
    higherPower: null,
    description: "Rampage Heavyweight Champion Johnny Malloy led this faction. The one man $teve publicly respected. 'I still respect him because he did bring people in.'",
  },
  {
    name: "RUFFNECKS",
    color: "#888888",
    members: ["Muddy Waters", "Josh Austin"],
    manager: null,
    higherPower: null,
    description: "Rampage tag team.",
  },
];
