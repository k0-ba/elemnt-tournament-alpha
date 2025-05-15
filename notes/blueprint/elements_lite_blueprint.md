# Elements Lite Blueprint: Farcaster Elemental Clash

## 1. Introduction & Vision
Design for small, mobile-sized viewports.
Keep layouts clean, uncluttered, and focused on the immediate interaction.
Typography:
Refer to FIG defaults for font choices, sizes, and weights. The goal is to feel native to Warpcast. (Your previous Inter font is a common sans-serif choice and might align well, but verify with FIG).
Color Palette:
Refer to FIG defaults. Warpcast often uses a dark theme with purple/blue accents. FIG may provide specific light/dark mode palettes.
For your game elements (Fire, Earth, Water), use clear, distinguishable accent colors. The ones from your ui_and_style.md are a good start, but ensure they have good contrast on the chosen FIG background:
Fire: 🔥 (e.g., #FF4500 - OrangeRed)
Earth: 🌍 (e.g., #8B4513 - SaddleBrown)
Water: 💧 (e.g., #1E90FF - DodgerBlue)
Visuals:
Emojis: Excellent choice for elements (🔥, 🌍, 💧) and status indicators. They are compact and universally understood.
Imagery: Any images generated for frames should be optimized for fast loading and clarity on small screens.
Buttons:
Maximum of 4 buttons per frame.
Buttons should have clear, concise labels, possibly accompanied by emojis.
Ensure sufficient tap target size for mobile users.
Interactions & Feedback:
Provide immediate feedback for user actions within the frame.
For actions requiring processing (like AI turn or waiting for opponent), use an interim frame state (e.g., "Processing...", "Waiting for opponent...").
Accessibility:
Provide text alternatives for emojis or critical visual information.
Use clear, simple language.
Ensure good color contrast.
2. Lightweight UI Documentation (Farcaster Frames)
This describes the key "screens" (frames) of the game.

Initial Frame (Game Invitation / Start New Game):
Purpose: Attract users to start or join a game.
Visual: An engaging image representing the game (e.g., dynamic composition of Fire, Earth, Water elements).
Text (example): "Elemental Clash! How will you attack? Choose your element!" or "[Player X] challenges you! Defend with your element!"
Buttons (3): [Fire 🔥], [Earth 🌍], [Water 💧]
Player 1 Choice Confirmation / Waiting Frame (After Player 1 picks):
Purpose: Confirm Player 1's choice (to P1) and present a challenge (if reshared for P2).
Visual (for P1): Image subtly confirming their choice (e.g., their chosen element highlighted, or a character turning their back to "cast" the challenge).
Text (for P1): "You chose [Fire 🔥]! Your challenge is cast. Waiting for an opponent to respond..."
Buttons (for P1, optional): [Refresh Status], [View My Open Challenges]
Visual (for P2 seeing P1's reshared challenge): Neutral "challenge incoming" graphic.
Text (for P2): "[Player 1's Name] has made their move! How will you defend? Pick your element!"
Buttons (for P2, 3): [Fire 🔥], [Earth 🌍], [Water 💧]
Results Frame:
Purpose: Display the outcome of a match.
Visual: Shows both players' chosen elements clearly, with an indicator of the winner (e.g., P1: 🔥 vs P2: 💧, with 💧 highlighted or a "Winner!" banner over P2's choice).
Text: "Player 1 ([Element]) vs Player 2 ([Element]). [Outcome: Player X wins! / It's a Tie!]"
Buttons (e.g., 2-3): [Play Again?], [Share Battle!], [View Tournament]
Tournament Status Frame (Your "Treemap" concept):
Purpose: Show the current state of an ongoing tournament.
Visual: A simplified graphical representation of matches (e.g., a list of pairings, winners progressing). A literal treemap might be too complex for a small frame; consider a clear list or bracket view.
Text: "Tournament: [Tournament Name/ID] - Round [X]"
Buttons (e.g., 1-2): [Refresh], [Back to Main]
Phase 0 - AI Opponent Interaction Frames:
Initial: Similar to "Game Invitation," but text specifies "Challenge the AI!"
Result: Similar to "Results Frame," showing AI's choice and outcome. Button: [Play AI Again?].
3. Lightweight User Flow Documentation
Describes how users navigate and interact with the game.

A. Game Discovery:
User sees a Farcaster post (a "cast") containing the game frame. This could be:
An initial "Start a new game" cast.
A reshared challenge from another player.
A reshared result/tournament update.
B. Phase 0: Single Player Mode (vs. AI):
User sees a frame: "Challenge the AI! Pick an element: [🔥] [🌍] [💧]".
User clicks an element button (e.g., Fire 🔥).
The frame updates, showing the user's choice, the AI's randomly generated choice, and the result (e.g., "You chose 🔥, AI chose 🌍. You Win!").
Option to [Play AI Again?].
C. Phase 1: Asynchronous PvP Tournament Gameplay:
Starting a New Game/Tournament (User A):
User A interacts with a "Start New Elemental Clash!" frame.
User A picks an element (e.g., Fire 🔥).
Frame updates for User A: "You picked 🔥! Your challenge is out. Waiting for an opponent."
This action creates a new cast in the feed. The public view of this cast is: "[User A] has started an Elemental Clash! How will you respond?" (User A's choice is hidden on this initial public frame).
Joining an Existing Game (User B responds to User A's cast):
User B sees User A's cast/frame: "[User A] has made their move! Pick your element to defend: [🔥] [🌍] [💧]".
User B clicks an element (e.g., Water 💧).
The frame updates for User B: "You chose 💧. User A chose 🔥. You Win!"
(Ideally) User A gets a notification or can see the updated status on their original cast/frame if they refresh: "User B responded with 💧 to your 🔥. You Lose."
Tournament Progression & Resharing (Viral Loop):
After a match, the result frame includes a [Share Battle & Challenge Next!] or similar button.
When User B (winner) reshares, the new cast might say: "I defeated User A with 💧! Who dares challenge me next? Pick your element: [🔥] [🌍] [💧]". This continues their run in the "tournament."
The system tracks these interactions as part of a tournament tree.
Viewing Tournament Status:
A [View Tournament] button on result frames or a dedicated command/link can lead to the "Tournament Status Frame," showing the current bracket/progress.
Handling Cold Start:
Initial game frames can be posted by the app creators or designated accounts to seed activity.
Preventing Duplicate Play:
If a user tries to join/start a new match while already actively engaged in one (i.e., they've made a move and are awaiting an opponent, or it's their turn), the frame should display: "You're already in a battle! Finish that one first." or disable join buttons.
4. Lightweight Product Requirements Document (PRD) - Farcaster Elemental Clash
1. Introduction & Vision

Product: Elemental Clash - A simple, asynchronous, rock-paper-scissors style game (Fire vs. Earth vs. Water) played via interactive Farcaster frames.
Vision: To create a fun, engaging, and inherently viral mini-game on Warpcast that users can easily pick up, play, and share, fostering community interaction.
2. Goals

Successfully deploy a functional and enjoyable mini-app on Farcaster.
Test and validate asynchronous multiplayer mechanics within the Farcaster ecosystem.
Achieve organic user acquisition and engagement through viral resharing of game states.
Establish a foundation for potential future expansions (e.g., tokenized tournaments).
3. Target Audience

Active Farcaster/Warpcast users.
Individuals who enjoy casual, social, turn-based games.
4. Core Gameplay & Features

Game Mechanic:
Three Elements: 🔥 Fire (beats 🌍 Earth), 🌍 Earth (beats 💧 Water), 💧 Water (beats 🔥 Fire).
Ties are possible if both players choose the same element.
Game Flow (Asynchronous PvP):
Player 1 (Initiator or Responder) picks an element. Choice is initially hidden from the opponent on the public frame.
Player 2 (Responder) picks an element.
Result is revealed to both players on the frame.
Farcaster Frame Native: All gameplay occurs within Farcaster frames.
Viral Resharing:
After each match, users can easily reshare the outcome, which also serves as an invitation for a new opponent to join the winner (or loser) in the next match of the tournament.
Tournament System:
Each match is part of an implicit or explicit tournament.
Max Players: Define a maximum number of participants for a tournament instance (e.g., 8, 16) to determine a "winner" of that instance. (This might be fluid initially).
Tournament Status View: A simple visual (e.g., "treemap" or list) showing current active matches and progression.
User Identity: Relies on Farcaster user IDs (FID).
Single Active Match Policy: Users can only be in one "active" state of a match at a time (e.g., awaiting an opponent after making their move) to prevent confusion and spam.
5. UI/UX Design

Visual Style: Clean, minimalist, emoji-centric. Adhere to Farcaster Frame Interface Guidelines (FIG) to blend with Warpcast.
Frame Layout: Optimized for mobile viewports (1.91:1 or 1:1 aspect ratio). Max 4 buttons.
Responsiveness: Frames must load and update quickly.
6. Phased Rollout Plan

Phase 0: MVP - Single Player vs. AI
Objective: Deploy the core game logic and mini-app to Farcaster.
Key Features:
Play Fire, Earth, Water against a simple AI opponent (random choices).
Basic win/loss display within the frame.
Deployable and functional on Warpcast.
Phase 1: Interactive Asynchronous PvP & Viral Loop
Objective: Enable player-vs-player asynchronous gameplay and test viral sharing mechanics.
Key Features:
Players can challenge each other.
Game state updates are reflected in frames.
Automatic resharing prompts/functionality after matches to onboard new players into the tournament.
Basic tournament status view.
Mechanism to prevent a single user from being in multiple "waiting" states in games.
(Onchain Aspect: Primarily leveraging existing Farcaster user registration. No direct new onchain value transactions in this phase.)
Phase 1.8: Play Money Introduction (Engagement Boost)
Objective: Introduce a no-value in-game currency to increase engagement and test basic economic loops.
Key Features:
All Phase 1 features.
New users receive a small number of free "play tickets" (e.g., 3 tickets).
Winners of matches/tournaments earn more play tickets (e.g., winner of a match gets 1 ticket from opponent, or tournament pot distributes tickets).
Play tickets have NO real monetary value and cannot be purchased or redeemed.
Phase 1.9: Play Money Purchase Test (Technical Validation)
Objective: Test basic smart contract interactions for acquiring in-game assets (still no real value).
Key Features:
All Phase 1.8 features.
Ability for users to "acquire" more play tickets, potentially through a simulated purchase or a testnet transaction (e.g., "buy" 10 tickets for 0.0001 testETH).
Focus is on testing the flow, not on real value. Tickets remain non-redeemable for prizes.
Phase 2: Real Ticket & Prize Economy
Objective: Introduce real-value stakes and prizes, managed by smart contracts.
Key Features:
Tournament entry requires purchasing a ticket (e.g., $1 fixed fee in ETH/Base stablecoin equivalent).
Smart contract to hold entry fees and distribute prizes.
Defined tournament sizes for prize eligibility (e.g., minimum 20 players for a $20 prize pool).
Prize distribution logic (e.g., winner-takes-all for small tournaments, tiered prizes for larger ones).
7. Technical Considerations

Technology: Farcaster Frames (likely Next.js application). Consider Frog.js/FrogUI for FIG compliance and easier development.
Backend: Required for managing game state, player moves, tournament progression, and user data.
Image Generation: Dynamic generation of images for frames based on game state.
Performance: Critical. Fast frame responses. Background tasks for any computationally intensive operations.
Smart Contracts (Phase 1.9 onwards): For ticket sales and prize distribution on Base.
8. Monetization (Phase 2 onwards)

Fees for tournament entry tickets.
9. Success Metrics (Phases 0 & 1)

Number of games played / matches completed.
Number of unique active players.
Reshare rate of game frames (viral coefficient).
Tournament completion rates.
User feedback and engagement levels.