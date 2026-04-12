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
}

export interface CareerChapter {
  id: string;
  era: 1 | 2 | 3 | 4 | 5 | 6;
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
}

export interface CutsceneSlide {
  speaker: string;
  text: string;
  isPromo?: boolean;
}

export const RICH_STEVE: Wrestler = {
  id: "rich-steve",
  name: "Rich $teve",
  faction: "Project Mayhem",
  role: "Main Event",
  style: "Cerebral",
  bio: "Steve Coleman. The Chicken Shit Mastermind. 13 years on the independent circuit (2006–2019). Started as a manager at 16 due to age restrictions. Became the most cerebral heel on the East Coast indie scene. Never wore gear unless he was wrestling. Always heel. Always.",
  stamina: 100,
  moves: ["Shoulder Block", "Headlock", "Body Slam", "Back Elbow", "Nerve Hold"],
  signatureMove: "Market Crash (Side Effect)",
  height: "6'1\"",
  weight: "340 lbs",
  hometown: "Philadelphia, PA",
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
  },
  {
    id: "ruben-ortiz",
    name: "Ruben Ortiz",
    faction: null,
    role: "Midcard",
    style: "Brawler",
    bio: "Untrained and unsafe. The reason Coleman never won the ACPW Grand Championship on August 18, 2007. The match was so dangerous that management called a Double DQ to protect Coleman before he could be injured. He was booked to win.",
    stamina: 60,
    moves: ["Wild Swing", "Bear Hug", "Headlock", "Running Shoulder Block"],
    signatureMove: null,
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
  },
  // ─── ERA 3: OTCW/COALITION ────────────────────────────────────
  {
    id: "justin-tyme",
    name: "Justin Tyme",
    faction: "OTCW",
    role: "Midcard",
    style: "Brawler",
    bio: "OTCW roster member. In the ring at Proving Ground on August 27, 2016 when Rich $teve unbuttoned his shirt and revealed the orange singlet underneath — the in-ring return after years away from competition.",
    stamina: 74,
    moves: ["Running Forearm", "Scoop Slam", "Shoulder Block", "Corner Clothesline"],
    signatureMove: null,
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
  },
  // ─── ERA 4/5: #BRUH ──────────────────────────────────────────
  {
    id: "johnny-xross",
    name: "Johnny Xross",
    faction: "#BRUH",
    role: "Main Event",
    style: "Technical",
    bio: "One half of #BRUH with Ray Rumble. Originally part of The Original Coalition before turning babyface in December 2017. Led by manager George Burkett. Became Rampage Tag Team Champions. Johnny was not at the Lethal Lottery show — which is how $teve pulled off the cash-in. The man $teve's Lost Ending was designed to put over.",
    stamina: 90,
    moves: ["Crossbody", "Armbar", "Neckbreaker", "Spinning Elbow", "Running Dropkick"],
    signatureMove: null,
  },
  {
    id: "ray-rumble",
    name: "Ray Rumble",
    faction: "#BRUH",
    role: "Main Event",
    style: "Brawler",
    bio: "One half of #BRUH. Coalition member until the split. Won the Rampage Tag Team Championships with Johnny Xross under manager George Burkett. At the Lethal Lottery — alone, vulnerable after losing the tournament semifinals — Ray Rumble became the most expensive transaction of Rich $teve's career.",
    stamina: 88,
    moves: ["Haymaker", "Spinebuster", "Clothesline", "Back Suplex", "Running Knee"],
    signatureMove: null,
  },
  {
    id: "george-burkett",
    name: "George Burkett",
    faction: "#BRUH",
    role: "Manager",
    style: "Cerebral",
    bio: "Manager of #BRUH. The only person in the building at the Lethal Lottery who publicly called out Rich $teve — warning the crowd that $teve couldn't be trusted with Ray Rumble as his partner. He was right. He saw it coming and couldn't stop it.",
    stamina: 55,
    moves: ["Distraction", "Ringside Interference", "Object Throw"],
    signatureMove: null,
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
  },
  // ─── ERA 4/5: YAMS / WORKING CLASS ──────────────────────────
  {
    id: "yams",
    name: "Yams the Working Man",
    faction: "Working Class Heroes",
    role: "Main Event",
    style: "Brawler",
    bio: "Rampage Heavyweight Champion. Former Working Class Hero with Ryan Vox — until $teve weaponized Vox against him. $teve had no respect for Yams and made it known publicly. The Hot Tub promo. The home invasion. The cosplay match. After Kory Cross and Ryan Vox turned on Project Mayhem, Yams led them into The Last Shot as Team Rampage.",
    stamina: 88,
    moves: ["Lariat", "German Suplex", "Running Powerslam", "Headbutt", "Corner Splash"],
    signatureMove: null,
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
  },
];

// ─── CAREER CHAPTERS ────────────────────────────────────────────

export const CAREER_CHAPTERS: CareerChapter[] = [

  // ══ ERA 1: ACPW ORIGINS ══════════════════════════════════════

  {
    id: "ch1-managing-debut",
    era: 1,
    eraName: "Era 1: ACPW Origins",
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
  },

  {
    id: "ch1-korpse-manager",
    era: 1,
    eraName: "Era 1: ACPW Origins",
    title: "The Road Dog",
    date: "2006–2007",
    venue: "ACPW Circuit",
    city: "Philadelphia, PA",
    stipulation: "Managing Korpse — Solo Stint",
    historicalResult: "story",
    historicalNote: "After Living Dead 2k6 dissolved, Rich $teve managed Korpse exclusively until March 2007. They became best friends — Road Dogs — in the process.",
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
  },

  {
    id: "ch1-six-man-debut",
    era: 1,
    eraName: "Era 1: ACPW Origins",
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

  // ══ ERA 2: ACPW SOLO RUN ════════════════════════════════════

  {
    id: "ch2-ortiz",
    era: 2,
    eraName: "Era 2: ACPW Solo Run",
    title: "The Grand Championship",
    date: "August 18, 2007",
    venue: "VFW Post 1451",
    city: "South River, NJ",
    opponentId: "ruben-ortiz",
    stipulation: "ACPW Grand Championship Match",
    historicalResult: "dq",
    historicalNote: "Management called a Double DQ to protect Coleman from an unsafe, untrained Ruben Ortiz. Coleman was booked to win. He didn't get another title shot until years later.",
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
        text: "Management will protect Coleman. They call a Double DQ before anyone gets hurt. He will not leave with the title.",
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
          text: "Double DQ. No title. Management made the call to protect you.",
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
    eraName: "Era 2: ACPW Solo Run",
    title: "The Spike",
    date: "August 25, 2007",
    venue: "Northeast Community Center",
    city: "Philadelphia, PA",
    opponentId: "southern-enforcer",
    stipulation: "ACPW Hardcore Title Three-Way",
    historicalResult: "lose",
    historicalNote: "Southern Enforcer defeated Rich Steve and Ugly Baby. A spike in the match sent Coleman into a years-long break from the business.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "August 25, 2007. One week after the Grand Championship was taken from him.",
      },
      {
        speaker: "NARRATOR",
        text: "A hardcore three-way. Southern Enforcer. Ugly Baby. Rich $teve.",
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
    eraName: "Era 2: ACPW Solo Run",
    title: "The Last Match",
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
    eraName: "Era 3: OTCW & The Original Coalition",
    title: "The Hostile Takeover",
    date: "July 30, 2016",
    venue: "OTCW Uncivil War — Triple B Arena",
    city: "Berkeley Springs, WV",
    opponentId: "siccend",
    stipulation: "No Disqualification — GM Declaration Match",
    historicalResult: "win",
    historicalNote: "Crazii Shea brought $teve in as a secret weapon. Nobody in Berkeley Springs knew who he was. That was the point. After the match, $teve declared himself GM of OTCW, citing Daddy's Money and attorney Donnie Diablo.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "July 30, 2016. OTCW Uncivil War. Triple B Arena. Berkeley Springs, WV.",
      },
      {
        speaker: "NARRATOR",
        text: "It has been four years since his last match. Crazii Shea begs Coleman to return — a veteran nobody in this market has heard of. That's the weapon.",
      },
      {
        speaker: "NARRATOR",
        text: "Coleman shows up in a suit. Nobody knows what's coming.",
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
  },

  {
    id: "ch3-proving-ground",
    era: 3,
    eraName: "Era 3: OTCW & The Original Coalition",
    title: "The Return",
    date: "August 27, 2016",
    venue: "OTCW Proving Ground — Triple B Arena",
    city: "Berkeley Springs, WV",
    opponentId: "justin-tyme",
    stipulation: "Singles Match — The In-Ring Return",
    historicalResult: "win",
    historicalNote: "Rich $teve unbuttoned his suit shirt at ringside to reveal the orange singlet underneath — returning to active in-ring competition for the first time in years.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "August 27, 2016. OTCW Proving Ground. Triple B Arena.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve has been the GM. The talking piece. The suit. Now — he removes the suit.",
      },
      {
        speaker: "NARRATOR",
        text: "At ringside, he unbuttons the purple shirt. Underneath: the orange singlet. The crowd doesn't know what to make of it.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve is wrestling again.",
      },
      {
        speaker: "Rich $teve",
        text: "The GM role was always temporary. The wrestler? That's permanent. I'm 340 pounds of everything this business has been waiting for.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "The return is complete. Rich $teve is back in the ring. The Coalition has its leader.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Ring rust. It happens. He'll shake it off.",
        },
        {
          speaker: "NARRATOR",
          text: "The return is still the story. A loss on the comeback trail doesn't erase what's coming.",
        },
      ],
    },
  },

  {
    id: "ch3-riot-city-rules",
    era: 3,
    eraName: "Era 3: OTCW & The Original Coalition",
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

  // ══ ERA 4: PROJECT MAYHEM ═══════════════════════════════════

  {
    id: "ch4-impact-society",
    era: 4,
    eraName: "Era 4: Project Mayhem",
    title: "Impact Society",
    date: "2017",
    venue: "Super Star Wrestling",
    city: "SSW Circuit",
    stipulation: "SSW Tag Team Championship — Impact Society (Rich $teve & Adam Armstrong)",
    historicalResult: "win",
    historicalNote: "Rich $teve and Adam Armstrong captured the SSW (Super Star Wrestling) Tag Team Championships as Impact Society.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "Project Mayhem dominates Rampage. But $teve never limits himself to one market.",
      },
      {
        speaker: "NARRATOR",
        text: "Super Star Wrestling. Impact Society: Rich $teve and Adam Armstrong. SSW Tag Team Championship.",
      },
      {
        speaker: "NARRATOR",
        text: "Two belts. Two markets. That's how the Chicken Shit Mastermind works.",
      },
      {
        speaker: "Rich $teve",
        text: "Impact Society. SSW Tag Team Champions. I hold gold in every room I walk into. That is not a coincidence.",
        isPromo: true,
      },
    ],
  },

  {
    id: "ch4-big-mike",
    era: 4,
    eraName: "Era 4: Project Mayhem",
    title: "Big Mike's Curtain Call",
    date: "2017",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "rd-cordova",
    stipulation: "5-on-5 Elimination — If Team Rampage loses, Big Mike retires as announcer",
    historicalResult: "win",
    historicalNote: "$teve pinned R.D. Cordova of 410 Massiv to end Big Mike's career as ring announcer. Jay Cortez is revealed as the 4th member and Higher Power of Project Mayhem.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "Ring announcer Big Mike stepped up when $teve beat down Jay Cortez's son — 16-year-old Mike Sweeney.",
      },
      {
        speaker: "NARRATOR",
        text: "Tonight: 5-on-5. If Team Rampage loses, Big Mike retires. $teve has to pin his man.",
      },
      {
        speaker: "NARRATOR",
        text: "And then — Jay Cortez walks out. The Higher Power of Project Mayhem. The man whose son started all of this.",
      },
      {
        speaker: "Rich $teve",
        text: "Big Mike, I have been in this building doing what I do. You decided to get tough. You put your career on the line. Let me show you what Project Mayhem does to people who get in our way.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "One. Two. Three. RD Cordova pinned. Team Rampage loses.",
        },
        {
          speaker: "NARRATOR",
          text: "Big Mike's microphone goes silent.",
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
          text: "Mike lives to announce another day. The story isn't finished.",
        },
      ],
    },
  },

  {
    id: "ch4-gm-loophole",
    era: 4,
    eraName: "Era 4: Project Mayhem",
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
  },

  {
    id: "ch4-bruh-turns",
    era: 4,
    eraName: "Era 4: Project Mayhem",
    title: "#BRUH Leaves Mayhem",
    date: "December 2017",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    stipulation: "Johnny Xross & Ray Rumble turn face — quit Project Mayhem",
    historicalResult: "story",
    historicalNote: "#BRUH (Johnny Xross and Ray Rumble) turn babyface and leave Project Mayhem in December 2017. $teve leads a beatdown. They go on to win the Rampage Tag Team Championships under manager George Burkett.",
    matchless: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "December 2017. Johnny Xross and Ray Rumble have had enough.",
      },
      {
        speaker: "NARRATOR",
        text: "#BRUH turns face and quits Project Mayhem.",
      },
      {
        speaker: "NARRATOR",
        text: "$teve's response: a beatdown. Make an example. Remind everyone what happens when you walk away from Project Mayhem.",
      },
      {
        speaker: "NARRATOR",
        text: "George Burkett picks up the pieces. Under his management, #BRUH goes on to win the Rampage Tag Team Championships.",
      },
      {
        speaker: "George Burkett",
        text: "You cannot trust Rich $teve. You never could. Those belts should have been theirs from the start.",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "They left. They had to go. Every group has people who think they can survive without the man running the show. #BRUH will find out what that costs them.",
        isPromo: true,
      },
    ],
  },

  // ══ ERA 5: PROJECT MAYHEM PEAK ══════════════════════════════

  {
    id: "ch5-riot-rumble",
    era: 5,
    eraName: "Era 5: Project Mayhem Peak",
    title: "The Riot Rumble",
    date: "2018",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "yams",
    stipulation: "Riot Rumble Battle Royal — Winner gets contract: any time, any place",
    historicalResult: "win",
    historicalNote: "Rich $teve won the Riot Rumble battle royal, earning a guaranteed cash-in contract for any title, at any time and place of his choosing.",
    riotRumbleChapter: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "The Riot Rumble. Last man standing wins a contract: any title, any time, any place.",
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
    era: 5,
    eraName: "Era 5: Project Mayhem Peak",
    title: "The Guerrero Special",
    date: "2018",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "eb-cohen",
    stipulation: "Singles Match — Riot Rumble Contract on the Line",
    historicalResult: "win",
    historicalNote: "$teve tossed the Riot Rumble lockbox to E.B. Cohen, faked a concussion so convincingly that building security called for medical help. After the DQ bell, he dropped the act entirely. Security bowed on the way out.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "The Riot Rumble contract is on the line. E.B. Cohen — 'Pancakes' — is the opponent.",
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
    era: 5,
    eraName: "Era 5: Project Mayhem Peak",
    title: "Big Mike Day",
    date: "2018",
    venue: "Bookstore Signing — Lancaster, PA",
    city: "Lancaster, PA",
    stipulation: "The Bookstore Incident — Big Mike's 'The Weird One' Book Signing",
    historicalResult: "story",
    historicalNote: "Rich $teve crashed Big Mike's memoir signing. Zero customers. He pulled out the Riot Rumble contract, mocked the book, took the candy, drank Mike's water, and left with the rest of the candy for the road.",
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
  },

  {
    id: "ch5-korpse",
    era: 5,
    eraName: "Era 5: Project Mayhem Peak",
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
    era: 5,
    eraName: "Era 5: Project Mayhem Peak",
    title: "The Solo Tag Title Heist",
    date: "October 2018",
    venue: "Rampage Pro Wrestling — Lethal Lottery",
    city: "Devil's Playpen",
    opponentId: "ray-rumble",
    stipulation: "Riot Rumble Cash-In — Rampage Tag Team Championships",
    historicalResult: "win",
    historicalNote: "The Lethal Lottery randomly assigned $teve and Ray Rumble as partners. Johnny Xross was not at the show. After losing to RCMW in the semifinals, $teve hit the Money Drop on a vulnerable Ray Rumble, cashed the Riot Rumble contract, and pinned him — walking out as sole holder of both Rampage Tag Team Championship belts.",
    riotRumbleChapter: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "October 2018. The Lethal Lottery. Partners assigned by random draw.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve's partner: Ray Rumble. Johnny Xross is not at the show.",
      },
      {
        speaker: "NARRATOR",
        text: "George Burkett sees $teve's name next to Ray's on the sheet. He tells the crowd: don't trust Rich $teve. He cannot be trusted.",
      },
      {
        speaker: "NARRATOR",
        text: "They lose in the semifinals to Riot City's Most Wanted. Ray Rumble is shaken. Vulnerable.",
      },
      {
        speaker: "George Burkett",
        text: "I told everyone. I told every single person in this building — you cannot trust Rich $teve. He is not Ray's partner. He never was.",
        isPromo: true,
      },
      {
        speaker: "Rich $teve",
        text: "Any time. Any place. Of my choosing.",
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
          text: "The Riot Rumble contract is cashed. Any time. Any place. Tonight was my time. Tonight was my place. And I chose to make Ray Rumble the greatest transaction of my career.",
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
    era: 5,
    eraName: "Era 5: Project Mayhem Peak",
    title: "The Last Shot",
    date: "April 27, 2019",
    venue: "Rampage Pro Wrestling — The Final Shot",
    city: "Devil's Playpen",
    opponentId: "kory-cross",
    stipulation: "6-Man Tag — Team Mayhem (Rich $teve, Mac Mayhem, Wrex Savage) vs Team Rampage (Kory Cross, Ryan Vox, Yams)",
    historicalResult: "story",
    historicalNote: "The final Rampage Pro Wrestling show. Rich $teve held both Tag Team Championship belts. Team Rampage — Kory Cross managing Ryan Vox and Yams as Working Class Heroes — faced Team Mayhem in the main event. The last chapter of Rampage Pro Wrestling.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "April 27, 2019. The Final Shot. The last Rampage Pro Wrestling show.",
      },
      {
        speaker: "NARRATOR",
        text: "Rich $teve went to shave Yams' beard. A power play. A public humiliation.",
      },
      {
        speaker: "NARRATOR",
        text: "Kory Cross and Ryan Vox attacked him. Turned face. Quit Project Mayhem. The two men who built Mayhem alongside $teve are now on the other side.",
      },
      {
        speaker: "NARRATOR",
        text: "Tonight: Team Rampage — Working Class Heroes, Kory Cross managing — vs Team Mayhem. $teve. Mac. Wrex.",
      },
      {
        speaker: "Rich $teve",
        text: "Kory Cross managed RCMW before he came with me. Now he thinks he can turn on me and manage against me? He knows exactly how I operate. That's why he's dangerous. And that's why I'm going to end this.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Team Mayhem wins the last Rampage Pro Wrestling match.",
        },
        {
          speaker: "NARRATOR",
          text: "Rich $teve, Mac Mayhem, Wrex Savage. The last Project Mayhem standing.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Team Rampage wins the final match in Rampage Pro Wrestling history.",
        },
        {
          speaker: "NARRATOR",
          text: "Kory Cross. Ryan Vox. Yams. The Working Class Heroes close out the promotion.",
        },
        {
          speaker: "NARRATOR",
          text: "Rampage Pro Wrestling is over. The Lost Ending was always waiting.",
        },
      ],
    },
  },

  // ══ ERA 6: THE LOST ENDING ══════════════════════════════════

  {
    id: "ch6-mac-mayhem",
    era: 6,
    eraName: "Era 6: The Lost Ending",
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
    era: 6,
    eraName: "Era 6: The Lost Ending",
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
    subtitle: "ACPW Origins",
    years: "2006–2007",
    description: "Age 16. Black eye makeup. Managing Living Dead 2k6 at ringside before he could compete. Korpse becomes the first Road Dog. Then — finally — they let him wrestle.",
    chapterIds: ["ch1-managing-debut", "ch1-korpse-manager", "ch1-six-man-debut"],
  },
  {
    id: 2,
    name: "Era 2",
    subtitle: "ACPW Solo Run",
    years: "2007–2012",
    description: "The Grand Championship match that should have been his. A spike that sent him away. A return match years later — the last one before the gap begins.",
    chapterIds: ["ch2-ortiz", "ch2-spike", "ch2-don-e-allen"],
  },
  {
    id: 3,
    name: "Era 3",
    subtitle: "OTCW & The Original Coalition",
    years: "2016",
    description: "Crazii Shea calls. Nobody in Berkeley Springs knows who Rich $teve is. The suit comes off at Proving Ground. The Coalition invades Rampage — and Matt Wylde becomes Mac Mayhem.",
    chapterIds: ["ch3-hostile-takeover", "ch3-proving-ground", "ch3-riot-city-rules"],
  },
  {
    id: 4,
    name: "Era 4",
    subtitle: "Project Mayhem",
    years: "2017",
    description: "SSW Tag Team gold. Big Mike's career ended. The GM Loophole. #BRUH turns face and leaves. The core locks in: $teve, Mac, Wrex, Kory, Vox.",
    chapterIds: ["ch4-impact-society", "ch4-big-mike", "ch4-gm-loophole", "ch4-bruh-turns"],
  },
  {
    id: 5,
    name: "Era 5",
    subtitle: "Project Mayhem Peak",
    years: "2018–2019",
    description: "The Riot Rumble briefcase. The Guerrero Special. The Bookstore. Korpse. The Solo Tag Heist. And The Last Shot — the final Rampage Pro Wrestling show.",
    chapterIds: ["ch5-riot-rumble", "ch5-guerrero", "ch5-bookstore", "ch5-korpse", "ch5-lethal-lottery", "ch5-last-shot"],
  },
  {
    id: 6,
    name: "Era 6",
    subtitle: "The Lost Ending",
    years: "The Night That Never Came",
    description: "Rampage collapsed before the story finished. The Mayhem Rules Match. The Heavyweight Championship. And the ending that was always supposed to happen.",
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
