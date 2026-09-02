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

- `src/App.jsx` — top-level layout: `Navbar`, `Welcome`, `Dock`.
- `src/components/` — UI components, re-exported via `src/components/index.js`.
- `src/constants/index.js` — static content: nav links/icons, dock apps, blog posts, tech stack, socials, gallery, Finder `locations` (Work/About/Resume/Trash), and `WINDOW_CONFIG`.
- `src/store/window.js` — Zustand (+ immer) store for window state (`windows`, keyed by app id), with `openWindow`/`closeWindow`/`focusWindow` actions. Seeded from `WINDOW_CONFIG`.
- `src/index.css` — global styles (Tailwind).

## Path aliases (`vite.config.js`)

- `#components` → `src/components`
- `#constants` → `src/constants`
- `#store` → `src/store`
- `#hoc` → `src/hoc`
- `#windows` → `src/windows`

Import through these instead of relative `../../` paths, e.g. `import Dock from "#components/Dock"`.

## Known gaps

See `progress.md` for the live list. As of 2026-09-02:

- `toggleApp` updates the window store, but no component renders windows yet, so clicking a dock icon has no visible effect.
- `WINDOW_CONFIG` has no `trash` key — fine while `trash`'s `canOpen: false`, but would throw if trash ever becomes openable without adding it first.

## Git

Git is managed manually by the user. Do not run `git add`, `git commit`, or `git push` unless explicitly asked to in the conversation.
