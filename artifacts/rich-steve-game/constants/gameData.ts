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
}

export interface CareerChapter {
  id: string;
  era: 1 | 2 | 3 | 4;
  eraName: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  opponentId: string;
  stipulation: string;
  introCutscene: CutsceneSlide[];
  outroCutscene: {
    win: CutsceneSlide[];
    lose: CutsceneSlide[];
  };
  historicalResult: "win" | "lose" | "dq" | "screwjob";
  historicalNote: string;
  riotRumbleChapter?: boolean;
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
  bio: "Steve Coleman. Philadelphia, PA. 6'1\", 340 lbs. The Chicken Shit Mastermind. 13 years on the independent circuit (2006–2019). Never wore gear unless he was wrestling — because only idiots and poor people do.",
  stamina: 100,
  moves: ["Shoulder Block", "Headlock", "Body Slam", "Back Elbow", "Nerve Hold"],
  signatureMove: "Market Crash (Side Effect)",
};

export const WRESTLERS: Wrestler[] = [
  {
    id: "mac-mayhem",
    name: "Mac Mayhem",
    faction: "Project Mayhem",
    role: "Main Event",
    style: "Power",
    bio: "Formerly Matt Wylde of Riot City's Most Wanted. Betrayed RCMW to join $teve and renamed himself Mac Mayhem. The tension between his ego and $teve's control became Project Mayhem's defining conflict.",
    stamina: 95,
    moves: ["Running Shoulder Block", "Corner Splash", "Gutwrench Slam", "Running Knee"],
    signatureMove: "Blue Collar Bomb",
  },
  {
    id: "johnny-xross",
    name: "Johnny Xross",
    faction: "#BRUH",
    role: "Main Event",
    style: "Technical",
    bio: "One half of #BRUH. Originally part of The Original Coalition before turning babyface. Led by George Burkett, he and Ray Rumble became the Rampage Tag Team Champions. The finale of the story $teve never got to finish.",
    stamina: 90,
    moves: ["Crossbody", "Armbar", "Neckbreaker", "Spinning Elbow"],
    signatureMove: null,
  },
  {
    id: "ray-rumble",
    name: "Ray Rumble (#BRUH)",
    faction: "#BRUH",
    role: "Main Event",
    style: "Brawler",
    bio: "The other half of #BRUH. Was a Coalition member until the split. With manager George Burkett, he and Johnny Xross captured the Rampage Tag Team Championships — the same belts $teve would heist solo at the Lethal Lottery.",
    stamina: 88,
    moves: ["Haymaker", "Spinebuster", "Clothesline", "Back Suplex"],
    signatureMove: null,
  },
  {
    id: "korpse",
    name: "Korpse",
    faction: "Independent",
    role: "Main Event",
    style: "Power",
    bio: "Rich $teve's original Road Dog from ACPW. They were manager and client before becoming best friends. $teve managed him through 2007. January 20, 2018 was their first-ever match against each other — and $teve lost.",
    stamina: 92,
    moves: ["Chokeslam", "Sit-Out Powerbomb", "Big Boot", "Bear Hug"],
    signatureMove: null,
  },
  {
    id: "yams",
    name: "Yams the Working Man",
    faction: "Independent",
    role: "Main Event",
    style: "Brawler",
    bio: "The Rampage Heavyweight Champion during the Riot Rumble era. $teve had no respect for Yams and made it known repeatedly. He beat him in the battle royal. The Hot Tub promo, the home invasion — it all led back to Yams.",
    stamina: 88,
    moves: ["Lariat", "German Suplex", "Running Powerslam", "Headbutt"],
    signatureMove: null,
  },
  {
    id: "siccend",
    name: "Siccend",
    faction: "Riot City's Most Wanted",
    role: "Main Event",
    style: "Brawler",
    bio: "Leader of Riot City's Most Wanted. Defended Rampage against $teve's invading Coalition crew. The RCMW feud was the fire that forged Project Mayhem.",
    stamina: 85,
    moves: ["Spear", "Uranage", "Corner Clothesline", "Belly-to-Back Suplex"],
    signatureMove: null,
  },
  {
    id: "vic-ramone",
    name: "Vic Ramone",
    faction: "Riot City's Most Wanted",
    role: "Midcard",
    style: "Technical",
    bio: "RCMW member. Part of the Riot City Rules match that ultimately birthed Mac Mayhem when Matt Wylde betrayed them mid-match.",
    stamina: 80,
    moves: ["Dropkick", "Snap Suplex", "Rolling Elbow", "Kneebar"],
    signatureMove: null,
  },
  {
    id: "rd-cordova",
    name: "R.D. Cordova",
    faction: "410 Massiv",
    role: "Midcard",
    style: "Power",
    bio: "One half of 410 Massiv. $teve pinned RD Cordova in the 5v5 match that ended Big Mike's career as ring announcer. One of the most significant pins of the Rampage era.",
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
  {
    id: "ryan-vox",
    name: "Ryan Vox (The Livewire)",
    faction: "Project Mayhem",
    role: "Midcard",
    style: "High-Flyer",
    bio: "Joined Project Mayhem in Phase 2. Was formerly part of the Working Class Heroes alongside Yams — until $teve weaponized that history. He filmed the home invasion of Yams' house. That's the job.",
    stamina: 78,
    moves: ["Springboard Elbow", "Diving Cross Body", "Hurricanrana", "Moonsault"],
    signatureMove: null,
  },
  {
    id: "wrex-savage",
    name: "Wrex Savage",
    faction: "Project Mayhem",
    role: "Midcard",
    style: "Brawler",
    bio: "Phase 2 Project Mayhem. His unexplained presence at the show was the spark for the Emphasis on ME confrontation between $teve and Mac Mayhem.",
    stamina: 80,
    moves: ["Lariat", "Powerbomb", "Spear", "Overhead Belly-to-Belly"],
    signatureMove: null,
  },
  {
    id: "johnny-malloy",
    name: "Beard Villain Johnny Malloy",
    faction: "The Talent Agency",
    role: "Main Event",
    style: "Technical",
    bio: "Rampage Heavyweight Champion before Yams. $teve respected Malloy for drawing people to Dover vs. The World. 'I still respect him because he did bring people in.' A rare compliment from $teve.",
    stamina: 87,
    moves: ["Suplex Combo", "Figure Four", "Headlock Driver", "Running Knee"],
    signatureMove: null,
  },
  {
    id: "trish-adora",
    name: "Trish Adora",
    faction: "#BRUH",
    role: "Women's Division",
    style: "Technical",
    bio: "#BRUH affiliate. One of the women's division standouts in Rampage.",
    stamina: 75,
    moves: ["Arm Drag", "Running Crossbody", "Submission Hold", "DDT"],
    signatureMove: null,
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
    id: "kory-cross",
    name: "Kory Cross",
    faction: "Project Mayhem",
    role: "Manager",
    style: "Cerebral",
    bio: "Project Mayhem's manager. The one exception $teve made to his 'no managers' rule — Cross handled logistics. The detail that mattered: $teve ran the words himself, Cross ran everything else.",
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
    bio: "The 'Higher Power' of Project Mayhem. His son Mike Sweeney was beaten down by $teve, starting the Big Mike saga. Jay later revealed himself as the 4th member of Project Mayhem at Big Mike's Curtain Call.",
    stamina: 83,
    moves: ["Lariat", "Powerbomb", "Corner Splash", "Knee Strike"],
    signatureMove: null,
  },
  {
    id: "shane-douglas",
    name: "Shane Douglas",
    faction: "Legends",
    role: "Legend",
    style: "Technical",
    bio: "The Franchise. A Rampage legend attraction.",
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
    bio: "ECW Original. Rampage attraction.",
    stamina: 82,
    moves: ["That's Incredible", "Superkick", "DDT", "Cane Shot"],
    signatureMove: "That's Incredible",
  },
];

export const CAREER_CHAPTERS: CareerChapter[] = [
  {
    id: "ch1-debut",
    era: 1,
    eraName: "Era 1: Origins & Foundations",
    title: "The Debut",
    date: "April 7, 2007",
    venue: "Cardinal Krol Center",
    city: "Springfield, PA",
    opponentId: "korpse",
    stipulation: "Tag Team Match",
    historicalResult: "lose",
    historicalNote: "Historical result: Onslaught, Patch & Wrecker defeated D-Craze, Rich Steve & Vinny Hoffa. First match. First loss.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "April 7, 2007. Cardinal Krol Center. Springfield, PA.",
      },
      {
        speaker: "NARRATOR",
        text: "Steve Coleman is 17 years old. He has been a manager. Now, finally, they will let him wrestle.",
      },
      {
        speaker: "NARRATOR",
        text: "The same man who trained him — Onslaught — is on the other side of the ring. This is how the business works.",
      },
      {
        speaker: "Rich $teve",
        text: "Everybody starts somewhere. Tonight is where I start. And I do not intend to stay at the bottom.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Not how it happened in real life. But tonight — you rewrote it.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Onslaught, Patch & Wrecker. The loss goes in the books. But you were in the ring. That was the beginning.",
        },
        {
          speaker: "NARRATOR",
          text: "Everyone starts somewhere. You started here.",
        },
      ],
    },
  },
  {
    id: "ch2-grand-championship",
    era: 1,
    eraName: "Era 1: Origins & Foundations",
    title: "The Grand Championship Incident",
    date: "August 18, 2007",
    venue: "VFW Post 1451",
    city: "South River, NJ",
    opponentId: "korpse",
    stipulation: "ACPW Grand Championship",
    historicalResult: "screwjob",
    historicalNote: "Management called for a Double DQ to protect Coleman from an unsafe, untrained opponent. The title was taken from him before he could hold it.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "August 18, 2007. VFW Post 1451. South River, NJ.",
      },
      {
        speaker: "NARRATOR",
        text: "Tonight was supposed to be the night. The ACPW Grand Championship. Coleman's name was on the booking sheet to win.",
      },
      {
        speaker: "NARRATOR",
        text: "His opponent: Ruben Ortiz. Untrained. Unsafe. A liability in the ring.",
      },
      {
        speaker: "NARRATOR",
        text: "Management will protect Coleman. They will call a Double DQ before he can be hurt. He will not leave with the title.",
      },
      {
        speaker: "Rich $teve",
        text: "I was supposed to be champion tonight. Was. Booked. And they took it. That's this business. You don't complain. You come back.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "You took what should have been yours from day one. The title they almost gave you — now you have it.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Double DQ. No title. Management made the call. They were protecting you.",
        },
        {
          speaker: "NARRATOR",
          text: "You learned something tonight: the business does not always give you what you earned. You have to take it.",
        },
      ],
    },
  },
  {
    id: "ch3-hostile-takeover",
    era: 2,
    eraName: "Era 2: The OTCW Resurrection",
    title: "The Hostile Takeover",
    date: "July 30, 2016",
    venue: "OTCW Uncivil War",
    city: "Berkeley Springs, WV",
    opponentId: "siccend",
    stipulation: "No Disqualification",
    historicalResult: "win",
    historicalNote: "After the match, $teve declared himself General Manager of OTCW, citing Daddy's Money and legal backing from attorney Donnie Diablo.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "July 30, 2016. OTCW Uncivil War.",
      },
      {
        speaker: "NARRATOR",
        text: "Crazii Shea brought Rich $teve in as a secret weapon. Nobody in this market knew who he was. That was the point.",
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
    id: "ch4-scalping",
    era: 2,
    eraName: "Era 2: The OTCW Resurrection",
    title: "The Scalping",
    date: "2016",
    venue: "OTCW Event",
    city: "Berkeley Springs, WV",
    opponentId: "siccend",
    stipulation: "Handcuffed to Sheriff Jay White — Coalition vs. Crazii Shea",
    historicalResult: "lose",
    historicalNote: "Coalition lost. Crazii Shea scalped Coleman with a knife while Sheriff Jay White and Big Mike held him down.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "The rivalry with Crazii Shea reaches its peak. $teve has been humiliated — forced to hand out promotional flyers in Berkeley Springs twice a month.",
      },
      {
        speaker: "NARRATOR",
        text: "Tonight: $teve is handcuffed to Sheriff Jay White. If the Coalition loses — Shea gets his.",
      },
      {
        speaker: "Rich $teve",
        text: "I do not hand out flyers. I do not pass out literature like some kind of door-to-door salesman. When this is over, Shea will remember who he is dealing with.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "Tonight the Coalition prevailed. Shea does not get his moment.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Coalition lost. $teve is handcuffed. Sheriff Jay White holds one arm. Big Mike holds the other.",
        },
        {
          speaker: "NARRATOR",
          text: "Crazii Shea produces a knife. The crowd watches in stunned silence as he scalps Coleman.",
        },
        {
          speaker: "NARRATOR",
          text: "This was the price. And $teve paid it. He did not forget.",
        },
      ],
    },
  },
  {
    id: "ch5-invasion",
    era: 3,
    eraName: "Era 3: The Rampage Invasion",
    title: "The Invasion",
    date: "2017",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "siccend",
    stipulation: "Riot City Rules Match — Coalition vs. RCMW",
    historicalResult: "win",
    historicalNote: "During the payoff of this match, Matt Wylde betrayed Riot City to join $teve. He renamed himself Mac Mayhem. Project Mayhem was born.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "The Coalition narrows. $teve brings a surgical strike into Rampage Pro Wrestling: himself, Johnny Xross, Ray Rumble, Drew Bronson, Allistar Conrad.",
      },
      {
        speaker: "NARRATOR",
        text: "Standing in their way: Riot City's Most Wanted. Siccend, Vic Ramone, Matt Wylde.",
      },
      {
        speaker: "Rich $teve",
        text: "Riot City thinks they own Rampage. They think this is their turf. Tonight we demonstrate what a surgical strike looks like. When the Coalition arrives — nothing is the same after.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "During the match — Matt Wylde stops. Looks at Riot City. Looks at $teve.",
        },
        {
          speaker: "NARRATOR",
          text: "He joins $teve. Renames himself Mac Mayhem. The Coalition is reborn as something sharper, meaner, and more dangerous.",
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
      ],
    },
  },
  {
    id: "ch6-big-mike-saga",
    era: 3,
    eraName: "Era 3: The Rampage Invasion",
    title: "Big Mike's Last Call",
    date: "2017",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "rd-cordova",
    stipulation: "5-on-5 — If Team Rampage loses, Big Mike retires",
    historicalResult: "win",
    historicalNote: "$teve pinned R.D. Cordova of 410 Massiv to end Big Mike's career as ring announcer.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "Ring announcer Big Mike stepped up when $teve beat down Jay Cortez's 16-year-old son, Mike Sweeney.",
      },
      {
        speaker: "NARRATOR",
        text: "The stakes: if Team Rampage loses this 5-on-5, Big Mike retires. $teve needs to pin his man.",
      },
      {
        speaker: "Rich $teve",
        text: "Big Mike, I have been in this building doing what I do. And you decided to get tough. Now you put your career on the line? Let me show you what Project Mayhem does to people who get in our way.",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "One. Two. Three. $teve pins R.D. Cordova. Team Rampage loses.",
        },
        {
          speaker: "NARRATOR",
          text: "Big Mike's microphone goes silent. His run as ring announcer is over.",
        },
        {
          speaker: "Rich $teve",
          text: "That's how Project Mayhem works, Mike. We don't just beat people. We end chapters.",
          isPromo: true,
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Mike lives to announce another day. This isn't over.",
        },
      ],
    },
  },
  {
    id: "ch7-gm-loophole",
    era: 3,
    eraName: "Era 3: The Rampage Invasion",
    title: "The GM Loophole",
    date: "2018",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "rd-cordova",
    stipulation: "Project Mayhem Exhibition",
    historicalResult: "win",
    historicalNote: "Big Mike returned as the new General Manager. The contract only barred him from being an announcer — not a GM. $teve realized this in real time and sold the revelation without a single word.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "Big Mike has returned to Rampage. New role. General Manager.",
      },
      {
        speaker: "NARRATOR",
        text: "The contract only said he couldn't be the ring announcer.",
      },
      {
        speaker: "NARRATOR",
        text: "$teve enters the arena. Sees Mike at the GM podium. The realization hits him — and he sells it entirely through his face. Not one word.",
      },
      {
        speaker: "Rich $teve",
        text: "...",
        isPromo: true,
      },
    ],
    outroCutscene: {
      win: [
        {
          speaker: "NARRATOR",
          text: "The loophole is real. Mike is back. But $teve is still Project Mayhem. And Project Mayhem adapts.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "A loss in the ring. But the real story is the loophole. Mike is back. The game just changed.",
        },
      ],
    },
  },
  {
    id: "ch8-lethal-lottery",
    era: 3,
    eraName: "Era 3: The Rampage Invasion",
    title: "The Solo Tag Title Heist",
    date: "October 2018",
    venue: "Rampage Pro Wrestling — Lethal Lottery",
    city: "Devil's Playpen",
    opponentId: "ray-rumble",
    stipulation: "Riot Rumble Cash-In — Rampage Tag Team Championships",
    historicalResult: "win",
    historicalNote: "After losing in the tournament semifinals with Ray Rumble as his partner, $teve hit the Money Drop on Ray, cashed in the Riot Rumble contract, and pinned him — walking out as the sole holder of both Tag Team Championship belts.",
    riotRumbleChapter: true,
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "October 2018. The Lethal Lottery. The draw assigns $teve and Ray Rumble as partners. Johnny Xross is not at the show.",
      },
      {
        speaker: "NARRATOR",
        text: "They lose in the semifinals to Riot City's Most Wanted. Ray Rumble is shaken. Vulnerable.",
      },
      {
        speaker: "NARRATOR",
        text: "$teve senses it. He has the Riot Rumble contract — a cash-in guarantee for any title, any time, any place.",
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
          text: "Rich $teve stands alone in the ring holding both Rampage Pro Wrestling Tag Team Championship belts. As a solo competitor.",
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
          text: "Ray survives. The contract goes unspent. But the Lethal Lottery showed the world how close it came.",
        },
      ],
    },
  },
  {
    id: "ch9-no-turning-back",
    era: 4,
    eraName: "Era 4: The Homecoming",
    title: "No Turning Back",
    date: "January 20, 2018",
    venue: "Neumann University",
    city: "Aston, PA",
    opponentId: "korpse",
    stipulation: "Grudge Match — ACPW Return",
    historicalResult: "lose",
    historicalNote: "First-ever meeting between $teve and Korpse as opponents. $teve lost. He was the manager. Now the student had returned — and the teacher won.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "January 20, 2018. ACPW. Neumann University. Aston, PA.",
      },
      {
        speaker: "NARRATOR",
        text: "Years away. Now the call comes: ACPW wants Rich $teve for their return show. He says no. Then they say who the opponent is. Korpse.",
      },
      {
        speaker: "Rich $teve",
        text: "When I was first approached by ACPW and asked if I would be a part of their return show... my response was no. ACPW is my past.",
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
          text: "In the game, the student finally surpasses the teacher. You gave your Road Dog the respect of a proper ending.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Korpse wins. The teacher defeats the student.",
        },
        {
          speaker: "NARRATOR",
          text: "This was the real result. January 20, 2018. $teve lost to Korpse. Their first and only meeting.",
        },
        {
          speaker: "NARRATOR",
          text: "That doesn't make the promo any less right.",
        },
      ],
    },
  },
  {
    id: "ch10-lost-ending-part1",
    era: 4,
    eraName: "Era 4: The Lost Ending",
    title: "The Ascent — vs. Mac Mayhem",
    date: "The Show That Never Happened",
    venue: "Big Mike's Curtain Call — Devil's Playpen",
    city: "Devil's Playpen",
    opponentId: "mac-mayhem",
    stipulation: "Rampage Heavyweight Championship — Mayhem Rules Match",
    historicalResult: "win",
    historicalNote: "This match was planned but never happened. Rampage collapsed before the story could be finished. Here, you finish it.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "This match never happened.",
      },
      {
        speaker: "NARRATOR",
        text: "Rampage Pro Wrestling collapsed before the story could reach its ending. The Mayhem Rules Match was scheduled. Jay Cortez was revealed as the 4th member of Project Mayhem. Mac had gone full 'Emphasis on ME.'",
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
        text: "It's Project Mayhem. Emphasize on Mayhem. ME.",
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
          text: "Mac Mayhem retains. The 'Emphasis on ME' stands. Try again — this chapter doesn't close until you win it.",
        },
      ],
    },
  },
  {
    id: "ch11-lost-ending-finale",
    era: 4,
    eraName: "Era 4: The Lost Ending",
    title: "The Finale — vs. Johnny Xross",
    date: "The Night After It Never Happened",
    venue: "Rampage Pro Wrestling",
    city: "Devil's Playpen",
    opponentId: "johnny-xross",
    stipulation: "Rampage Heavyweight Championship",
    historicalResult: "lose",
    historicalNote: "The planned ending: Johnny Xross (#BRUH) returns to challenge the new champion. $teve puts him over, crowning a new champion. The full circle.",
    introCutscene: [
      {
        speaker: "NARRATOR",
        text: "You are the Rampage Heavyweight Champion.",
      },
      {
        speaker: "NARRATOR",
        text: "Johnny Xross returns immediately. The man who was with you in The Original Coalition. The man who turned babyface. The man who became one of the best in Rampage.",
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
          text: "You kept the title. That's not how it was supposed to go. But you're the champion — that choice is yours.",
        },
      ],
      lose: [
        {
          speaker: "NARRATOR",
          text: "Johnny Xross wins the Rampage Pro Wrestling Heavyweight Championship.",
        },
        {
          speaker: "NARRATOR",
          text: "The Credibility Rule. Build up your opponent. Don't break them down. If you bury your opponent and then beat them, you defeated a nobody. Keep them credible — and your loss means something.",
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

export const ERAS = [
  {
    id: 1,
    name: "Era 1",
    subtitle: "Origins & Foundations",
    years: "2006–2012",
    description: "From teenage manager at ACPW to in-ring debut at Cardinal Krol Center. The road with Korpse. The Grand Championship that got taken away.",
    chapterIds: ["ch1-debut", "ch2-grand-championship"],
  },
  {
    id: 2,
    name: "Era 2",
    subtitle: "The OTCW Resurrection",
    years: "2016",
    description: "Crazii Shea calls. A new market. Nobody knows who Rich $teve is yet. The Hostile Takeover. The Coalition. The Scalping.",
    chapterIds: ["ch3-hostile-takeover", "ch4-scalping"],
  },
  {
    id: 3,
    name: "Era 3",
    subtitle: "The Rampage Invasion",
    years: "2017–2018",
    description: "Project Mayhem is born. The Big Mike saga. The GM Loophole. The Solo Tag Title Heist at the Lethal Lottery.",
    chapterIds: ["ch5-invasion", "ch6-big-mike-saga", "ch7-gm-loophole", "ch8-lethal-lottery"],
  },
  {
    id: 4,
    name: "Era 4",
    subtitle: "The Homecoming & The Lost Ending",
    years: "2018–The Night That Never Came",
    description: "Return to ACPW. The grudge match with Korpse. And the ending Rampage never got to see — the one that was supposed to happen.",
    chapterIds: ["ch9-no-turning-back", "ch10-lost-ending-part1", "ch11-lost-ending-finale"],
  },
];

export const BOOKSTORE_PROMO = `"We found Big Mike Day! Look, I can't forget my contract — you never know, there might be a Working Man around. In case Yams shows up, I got the thing on me. I always got the thing on me. Cash in any time, any place, of my choosing.

Are people actually paying money to meet this guy? Meet the author, Big Mike Scott.

Mike, can you sign this for me? Do you know what I got right here? That is the Rampage Riot Rumble contract. The one that I put you into. The retirement that Project Mayhem caused.

How many people have actually come to see this fat piece of crap today? How many? Zero. That is hilarious, Mike.

I'm gonna take these, though. I'll leave you two. But Mike — since you've left Rampage, things have been great. Project Mayhem has only been getting better.

And one more thing: soon, I'm gonna be the Rampage Pro Wrestling Heavyweight Champion. So keep selling The Weird One.

I'm taking my water back. Have a great day, folks. Remember — if you ever need an actual star, call somebody. Because this guy is selling nothing."`;

export const FACTIONS = [
  {
    name: "PROJECT MAYHEM",
    members: ["Rich $teve", "Mac Mayhem", "Ryan Vox", "Wrex Savage"],
    manager: "Kory Cross",
    higherPower: "Jay Cortez",
    description: "The Rampage invasion force. Born from the Coalition when Matt Wylde turned on Riot City. Phase 1 merged $teve, Mac, Kory Cross, and #BRUH. Phase 2 added The Livewire Ryan Vox and Wrex Savage. The 'Emphasis on ME' split nearly destroyed it — but the Lost Ending was always supposed to bring it home.",
  },
  {
    name: "#BRUH",
    members: ["Johnny Xross", "Ray Rumble", "Trish Adora"],
    manager: "George Burkett",
    description: "Started in The Coalition. Turned babyface in December 2017. Became Rampage Tag Team Champions. The Lethal Lottery made Ray Rumble the most expensive transaction of $teve's career.",
  },
  {
    name: "RIOT CITY'S MOST WANTED",
    members: ["Siccend", "Vic Ramone", "Jason Andrews"],
    description: "The original power of Rampage. Defended their territory against the Coalition invasion until their own Matt Wylde flipped. Everything about Project Mayhem started with beating RCMW.",
  },
  {
    name: "410 MASSIV",
    members: ["R.D. Cordova", "Andre Cash"],
    description: "Tag team. R.D. Cordova was the man $teve pinned to end Big Mike's announcing career.",
  },
  {
    name: "THE TALENT AGENCY",
    members: ["Beard Villain Johnny Malloy", "Binky", "E.B. Cohen", "Junior Reyes"],
    description: "Former Rampage Heavyweight Champion Johnny Malloy led this faction. The one man $teve publicly respected — Malloy drew people to Dover vs. The World.",
  },
  {
    name: "RUFFNECKS",
    members: ["Muddy Waters", "Josh Austin"],
    description: "Rampage tag team.",
  },
];
