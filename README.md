# Abria — Interactive Visual Demo

Clickable prototype built from the Abria UI screens developed in the ChatGPT conversation.

## What is included

- Login
- Language selection
- Core teleprompter / Speak UI
- Record mode
- PDF / own-text upload concept
- Lessons split UI
- Profile
- World Language Map
- Friends Map
- Party Map
- Orbit Chat
- Abria TV channels
- Talent Mode
- Wonders Collection

## Run locally

No build step or dependencies.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

This project is static and can be published directly with GitHub Pages from the repository root.

## Prototype strategy

This first demo deliberately uses the approved mockup images as visual source screens so the prototype stays visually close to the artwork. Navigation and module switching are interactive. The next engineering phase can replace each image screen with native HTML/React components while keeping the same design system.
