# Progress

Living log of what's been done and what's next. Update at the end of every session — see `RESUME_PROTOCOL.md`.

## Current state (2026-09-01)

- Base layout in place: `App.jsx` renders `Navbar`, `Welcome`, `Dock`.
- `Dock.jsx` added: renders icons from `dockApps` (`src/constants/index.js`). Click handler (`toggleApp`) is a stub — no window-opening logic yet.
- Dock icons carry `react-tooltip`-style data attributes (`data-tooltip-id`, `data-tooltip-content`, `data-tooltip-delay-show`), but the `react-tooltip` package isn't installed and no `<Tooltip>` is rendered — these are currently inert.
- `constants/index.js` already defines `locations` (Work/About/Resume/Trash content trees) and `WINDOW_CONFIG`, for a future window manager, but no window components consume them yet.
- Documentation set up this session: `RESUME_PROTOCOL.md`, `progress.md` (this file), `runbook.md`, and `README.md` updated to match.

## Fixed

- 2026-09-01: `Dock.jsx`'s `.map()` callback used a block body without a `return`, so every dock icon rendered as `undefined` (dock appeared empty). Fixed to an implicit-return arrow function.

## Next steps

- Decide on and implement window-opening behavior for `toggleApp` (likely wired to `WINDOW_CONFIG` / `locations`).
- Install `react-tooltip` and render a `<Tooltip id="dock-tooltip" />`, or drop the data attributes if tooltips aren't planned.
- Build out window components that read from `locations` (Finder/Work, About, Resume, Trash).

## Decisions

- Git add/commit/push is done manually by the user — do not run git write commands unless explicitly asked.
- 2026-09-01: `RESUME_PROTOCOL.md`, `progress.md`, `runbook.md` stay tracked in git, not gitignored — gitignoring would break cross-session/cross-machine continuity and leave `README.md`'s links dangling on a fresh clone.
