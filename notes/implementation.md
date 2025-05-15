# Elemental Clash Implementation Documentation

## Overview

Elemental Clash is a simple turn-based game implemented as a Farcaster Frame and a web application. The game pits players against an AI opponent in a rock-paper-scissors style elemental battle.

## Core Game Mechanics

- **Elements**: Fire 🔥, Earth 🌍, and Water 💧
- **Rules**:
  - Fire 🔥 beats Earth 🌍
  - Earth 🌍 beats Water 💧
  - Water 💧 beats Fire 🔥
- **Phase 0 (Current)**: Single player vs AI with random choices
- **Phase 1 (Planned)**: Asynchronous PvP and viral sharing

## Implementation Structure

### Web Application

- **Main UI**: `app/page.tsx` - Contains the main game interface for browser interaction
- **Components**: Uses minimal UI components for a clean gaming experience

### Farcaster Frame

- **Frame Endpoint**: `app/api/frame/route.ts` - Handles GET and POST requests for the Farcaster frame
- **Image Endpoint**: `app/api/frame/image/route.ts` - Provides image generation for the frame (simplified in Phase 0)

## Technical Details

### Game Logic

The game's core logic is implemented in both the web app and the frame endpoint:

1. Player selects an element (Fire, Earth, or Water)
2. AI randomly selects an element
3. Winner is determined based on the elemental rules
4. Result is displayed to the player

### Important Environment Variables

- `NEXT_PUBLIC_URL`: Base URL for the application
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME`: Project identifier
- `FARCASTER_HEADER`, `FARCASTER_PAYLOAD`, `FARCASTER_SIGNATURE`: For Farcaster frame validation

## Development Roadmap

### Phase 0: MVP (Current)
- Single player vs AI
- Text-based frame
- Simple UI with basic game mechanics

### Phase 1: PvP (Planned)
- Asynchronous player vs player matches
- Health bar system with 5 HP
- Enhanced UI with battle animations
- User profiles and match history

### Phase 2: Enhanced Features (Future)
- Tournament system
- Leaderboards
- Special elemental abilities
- Rewards and achievements

## Deployment

The application is deployed on Vercel at: https://elemnt-tournament-alpha.vercel.app/

- Main web app: https://elemnt-tournament-alpha.vercel.app/
- Farcaster frame: https://elemnt-tournament-alpha.vercel.app/api/frame
