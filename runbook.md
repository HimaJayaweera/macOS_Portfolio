# Runbook

Operational reference for running and working on this project.

## Requirements

- Node.js (check with `node -v`)
- npm (bundled with Node)

## Install

```
npm install
```

## Common commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project structure

- `src/App.jsx` — top-level layout: `Navbar`, `Welcome`, `Dock`, `Home`, plus the window components (`Terminal`, `Safari`, `Resume`, `Finder`, `TextFile`, `ImageFile`, `Contact`, `Photo`).
- `src/components/` — UI components, re-exported via `src/components/index.js`. Includes `Home.jsx`, the desktop project-folder icons (not a window).
- `src/windows/` — window content components, each wrapped via `windowWrapper(Component, windowKey)` and re-exported via `src/windows/index.js`. `Finder.jsx` browses `locations`; `Text.jsx` (windowKey `txtfile`) and `ImageFile.jsx` (windowKey `imgfile`) are generic content-file viewers driven by `windows[key].data`; `Photo.jsx` (windowKey `photos`) is a gallery grid that opens `ImageFile` as a separate window per thumbnail click.
- `src/constants/index.js` — static content: nav links/icons, dock apps, blog posts, tech stack, socials, gallery, Finder `locations` (Work/About/Resume/Trash), and `WINDOW_CONFIG`.
- `src/store/window.js` — Zustand (+ immer) store for window state (`windows`, keyed by app id), with `openWindow`/`closeWindow`/`focusWindow` actions. Seeded from `WINDOW_CONFIG`.
- `src/store/location.js` — Zustand (+ immer) store for Finder navigation (`activeLocation`, defaulting to `locations.work`), with `setActiveLocation`/`resetActiveLocation` actions.
- `src/index.css` — global styles (Tailwind), including per-window `#windowKey { ... }` blocks (e.g. `#finder`, `#txtfile`, `#imgfile`, `#contact`).

## Path aliases (`vite.config.js`)

- `#components` → `src/components`
- `#constants` → `src/constants`
- `#store` → `src/store`
- `#hoc` → `src/hoc`
- `#windows` → `src/windows`

Import through these instead of relative `../../` paths, e.g. `import Dock from "#components/Dock"`.

## Known gaps

See `progress.md` for the live list. As of 2026-09-11:

- `WINDOW_CONFIG` has no `trash` key — fine while `trash`'s `canOpen: false`, but would throw if trash ever becomes openable without adding it first.

## Git

Git is managed manually by the user. Do not run `git add`, `git commit`, or `git push` unless explicitly asked to in the conversation.
