# Rich $teve: The Game

A mobile Expo wrestling game based on Steve Coleman's real indie wrestling career (2006–2019) as "Rich $teve." Turn-based in-ring match gameplay with a story-driven career mode covering all four real eras.

## Project Structure

This is a pnpm monorepo with multiple artifacts:

- `artifacts/rich-steve-game/` — Expo mobile app (port 18438)
- `artifacts/api-server/` — Express API server (port 8080)
- `artifacts/mockup-sandbox/` — Component preview server (port 8081)

## Rich Steve Game Architecture

### Core Principle
**NO HALLUCINATING.** All character details (stats, moves, promos, storylines) are real or explicitly confirmed by Steve Coleman. Generic move names are used for opponents whose finishers/signatures are not confirmed.

### Confirmed Real Data
- **Rich $teve**: Steve Coleman, 6'1", 340 lbs, Philadelphia PA
- **Finisher**: Money Drop (Big Splash)
- **Signature**: Market Crash (Side Effect)
- **Theme**: "Jet Black New Year" by Thursday
- **Suit Rule**: Only wears gear during active matches
- **Real match result**: Lost to Korpse at ACPW "No Turning Back" January 20, 2018

### Four Career Eras
1. **Era 1: Origins & Foundations (2006–2012)** — ACPW, teenage debut, Korpse road dog era
2. **Era 2: The OTCW Resurrection (2016)** — Hostile takeover, Coalition, The Scalping
3. **Era 3: The Rampage Invasion (2017–2018)** — Project Mayhem, Big Mike saga, Lethal Lottery solo tag title heist
4. **Era 4: The Homecoming & Lost Ending** — ACPW return vs. Korpse, the unfinished story

### Verbatim Promo Archive (Real Quotes)
- Korpse Return Promo (ACPW comeback)
- "Emphasis on ME" Project Mayhem split
- Hijacked/Home Invasion Promo
- Hot Tub Promo
- **Big Mike Day Bookstore Incident** (transcribed from video using OpenAI Whisper)

### Key Files
- `artifacts/rich-steve-game/constants/gameData.ts` — All game data: roster (19 wrestlers), 11 career chapters, 4 eras, factions
- `artifacts/rich-steve-game/context/GameContext.tsx` — AsyncStorage-based game state
- `artifacts/rich-steve-game/app/(tabs)/index.tsx` — Home screen
- `artifacts/rich-steve-game/app/(tabs)/career.tsx` — Career mode (4 eras, 11 chapters, lock/unlock)
- `artifacts/rich-steve-game/app/(tabs)/roster.tsx` — Full roster (factions/individual view)
- `artifacts/rich-steve-game/app/match.tsx` — Turn-based match engine
- `artifacts/rich-steve-game/app/cutscene.tsx` — Promo/storyline cutscene screen

### Match Engine
- Turn-based combat with stamina bars
- Player moves: Shoulder Block (8), Body Slam (10), Back Elbow (8), Nerve Hold (7)
- Signature: Market Crash / Side Effect (25 dmg, 3-turn cooldown)
- Finisher: Money Drop / Big Splash (instant win when opponent < 25% stamina)
- Heel Tactics (one-time each): Crowd Distraction, Referee Manipulation, Guerrero Special (DQ win)
- Haptic feedback on mobile

### Game State (AsyncStorage)
- Completed chapters
- Current era progress
- Title victories (tag, heavyweight)
- Riot Rumble contract status
- Match history (played/won)

## Tech Stack

- **Expo** ~54.0.27 with Expo Router
- **React Native** with TypeScript
- **@react-native-async-storage/async-storage** for persistence
- **expo-haptics** for mobile haptic feedback
- **@expo/vector-icons** (Ionicons, MaterialCommunityIcons)
- **@expo-google-fonts/inter** for typography
- **Colors**: Deep black (#0a0a0a) bg, gold (#D4AF37) primary, dark red (#8B0000) accent

## OpenAI Integration
- Set up via Replit AI Integrations proxy
- Used for: Big Mike Day video transcription (Whisper gpt-4o-mini-transcribe)
- Env vars: `AI_INTEGRATIONS_OPENAI_BASE_URL`, `AI_INTEGRATIONS_OPENAI_API_KEY`

## Known Non-Hallucinated Data Gaps
Opponent heights/weights are NOT shown for wrestlers where we don't have confirmed data. Generic move categories (power, technical, brawler) are used for opponent AI without inventing real finisher names. The user (Steve Coleman) should confirm any additional details before they're added.
