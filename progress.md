# Progress

Living log of what's been done and what's next. Update at the end of every session — see `RESUME_PROTOCOL.md`.

## Current state (2026-09-02)

- Base layout in place: `App.jsx` renders `Navbar`, `Welcome`, `Dock`.
- `Dock.jsx`: renders icons from `dockApps` (`src/constants/index.js`) with a GSAP-driven magnification effect on hover (`useGSAP` + `gsap.to`, scale/lift falloff based on cursor distance from each icon's center).
- `toggleApp` now calls into a real window store (`src/store/window.js`, Zustand + immer) — clicking an openable dock icon opens/closes/focuses its window via `openWindow`/`closeWindow`. No window UI components consume this state yet, so nothing visibly opens.
- Tooltips are wired up: `react-tooltip` was added as a dependency and a `<Tooltip id="dock-tooltip" />` is rendered in `Dock.jsx`, so the existing `data-tooltip-*` attributes on dock icons work.
- `constants/index.js` defines `locations` (Work/About/Resume/Trash content trees) and `WINDOW_CONFIG` (consumed by the new window store), but no window components read from `locations` yet.
- Documentation set up: `RESUME_PROTOCOL.md`, `progress.md` (this file), `runbook.md`, and `README.md`.

## Fixed

- 2026-09-01: `Dock.jsx`'s `.map()` callback used a block body without a `return`, so every dock icon rendered as `undefined` (dock appeared empty). Fixed to an implicit-return arrow function.
- 2026-09-02: `npm run lint` was failing (`'app' is defined but never used` in `Dock.jsx`'s `toggleApp` stub). Added `argsIgnorePattern: '^_'` to `eslint.config.js`'s `no-unused-vars` rule and renamed the stub param to `_app`. (Superseded by the next fix, which gave `toggleApp` a real body.)
- 2026-09-02: `src/store/window.js` initialized state as `windowS` (typo) while every action (`openWindow`/`closeWindow`/`focusWindow`) read `state.windows` — so the store's `windows` was always `undefined`, throwing `Cannot read properties of undefined (reading 'finder')` on the first dock click. Fixed the key to `windows`.
- 2026-09-02: defensive pass — `openWindow`/`closeWindow`/`focusWindow` in `window.js` now no-op instead of throwing if `windowKey` isn't in `windows` (guards the still-open `trash` gap below). `Dock.jsx`'s `toggleApp` gained the same guard and its local var was renamed `window` → `appWindow` (was shadowing the browser global); also dropped a leftover `console.log(windows)`. `Welcome.jsx`'s GSAP cleanup now calls `titleCleanup?.()`/`subtitleCleanup?.()` since `setupTextHover` can return `undefined` if its ref isn't set.

## Next steps

- Build window UI components that open/close based on `windowStore` state and render content from `locations` (Finder/Work, About, Resume, Trash).
- `WINDOW_CONFIG` still has no `trash` entry. No longer a crash risk (see defensive pass above), but if trash becomes openable, add a matching `WINDOW_CONFIG.trash` entry so it actually works.

## Decisions

- Git add/commit/push is done manually by the user — do not run git write commands unless explicitly asked.
- 2026-09-01: `RESUME_PROTOCOL.md`, `progress.md`, `runbook.md` stay tracked in git, not gitignored — gitignoring would break cross-session/cross-machine continuity and leave `README.md`'s links dangling on a fresh clone.
- 2026-09-02: Claude in Chrome was declined for this session, so a reported "error shown on App.jsx" couldn't be reproduced live; lint/build passed clean, so the fix was blocked pending the exact error text from the user rather than guessed at. Codified this as a rule in `RESUME_PROTOCOL.md` → "Debugging runtime errors".
- Found during review (not yet fixed, not yet wired into the app): `src/hoc/windowWrapper.jsx`'s `Wrapped` component body closes before its `return`, so the JSX ends up outside the function referencing undefined `ref`/`zIndex` (lint: `no-undef`). Harmless today since nothing imports it yet — will throw the moment it's wired in.
