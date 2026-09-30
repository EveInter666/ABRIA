# Abria — Interactive Demo

Interactive static prototype of the Abria language-learning ecosystem.

## Included modules

- Login
- Language selection
- Core teleprompter / Speak mode
- Speed controls
- Own text / PDF concept
- Lessons split UI
- Profile
- World Language Map
- Friends Map
- Party Study Groups
- Orbit Chat
- Abria TV language channels
- Talent Mode
- Wonders Collection / Tower of Babel progression

## Run locally

No build step and no dependencies.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## GitHub Pages

The demo is static and can be published directly from the repository root:

1. Open **Settings → Pages**
2. Under **Build and deployment**, choose **Deploy from a branch**
3. Select **main** and **/(root)**
4. Save

## Current prototype status

This repository is the first native interactive build: the screens are recreated in HTML/CSS/JavaScript rather than being flat screenshots. It follows the Abria black/gold visual system and implements the major navigation and interactions.

Next engineering steps can add camera/microphone recording, real teleprompter scrolling, authentication, speech analysis, file parsing, real-time groups, persistent XP, and backend services.
