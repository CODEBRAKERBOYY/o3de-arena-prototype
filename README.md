# O3DE Arena Prototype

A small portfolio-friendly gameplay prototype prepared for an O3DE-focused role.

The project contains an O3DE-style Gem component, a Lua player controller script, and a browser-playable preview that demonstrates the core game loop without requiring a full O3DE install.

## Gameplay

You control a small arena ship, collect energy cores, and avoid sentry drones. The score increases with each collected core, and the difficulty rises as drones speed up over time.

## Why this repo exists

This repository is designed to answer job-application questions like:

> If available, please share a link showing at least one project/game you created with O3DE.

If you publish this project to GitHub, use the repository URL as your link. Be accurate in the application: this is an O3DE-oriented prototype and code sample, with a browser demo included for quick review.

## Quick preview

Open `web-demo/index.html` in a browser.

Controls:

- `WASD` or arrow keys: move
- `R`: restart after game over

## O3DE-oriented structure

```text
Gem/
  Code/
    Include/ArenaPrototype/
      ArenaPrototypeSystemComponent.h
    Source/
      ArenaPrototypeSystemComponent.cpp
      CMakeLists.txt
Project/
  project.json
  Scripts/
    ArenaPlayerController.lua
web-demo/
  index.html
  style.css
  game.js
```

## Notes for a real O3DE import

This repo is intentionally lightweight because O3DE is not bundled with it. To turn it into a full O3DE project:

1. Install O3DE.
2. Create a new O3DE project.
3. Add the `Gem` source as a custom Gem or migrate the component into your project Gem.
4. Add the Lua script to an entity with the O3DE Lua Script component.
5. Recreate the arena scene using simple primitives or your own assets.

## Suggested GitHub description

O3DE-oriented arena game prototype with C++ component code, Lua gameplay script, and a browser-playable preview.

