# Progress

Living log of what's been done and what's next. Update at the end of every session — see `RESUME_PROTOCOL.md`.

## Current state (2026-09-11)

- Base layout in place: `App.jsx` renders `Navbar`, `Welcome`, `Dock`, plus six window components: `Terminal`, `Safari`, `Resume`, `Finder`, `TextFile`, `ImageFile`, `Contact`.
- `Dock.jsx`: renders icons from `dockApps` (`src/constants/index.js`) with a GSAP-driven magnification effect on hover (`useGSAP` + `gsap.to`, scale/lift falloff based on cursor distance from each icon's center). `toggleApp` opens/closes windows via the window store.
- `src/hoc/windowWrapper.jsx` shows/hides the window (`display` toggled via `useLayoutEffect` on `isOpen`), animates it in with GSAP (`gsap.fromTo` scale/opacity/y) when it opens, and makes it draggable via `Draggable.create`, calling `focusWindow` on press to raise z-index (see Fixed below — this was silently broken until today).
- `src/components/WindowControls.jsx`: the traffic-light-style close/minimize/maximize dots rendered in each window's header; `close` is wired to `closeWindow(target)`, minimize/maximize are still visual-only.
- `src/windows/Finder.jsx` (new): reads `locations` (`src/constants/index.js`) via `useLocationStore` (`src/store/location.js`, new — holds `activeLocation`/`setActiveLocation`/`resetActiveLocation`). Sidebar lists Favorites (top-level locations) and Work's children via a shared `renderList(name, items)` helper; the content pane maps `activeLocation.children` to positioned icons. `openItem(item)` routes clicks: `fileType === 'pdf'` → opens the `resume` window, `kind === 'folder'` → navigates `activeLocation`, `fig`/`url` items with an `href` → `window.open` in a new tab, everything else → `openWindow(`${item.fileType}${item.kind}`, item)` (e.g. `txtfile`, `imgfile`).
- `src/windows/Text.jsx` (new, windowKey `txtfile`) and `src/windows/ImageFile.jsx` (new, windowKey `imgfile`): generic content-file windows, both read their data via `useWindowStore().windows[key].data` and return `null` if there's no data. `TextFile` renders `name`/optional `image`/optional `subtitle`/`description` paragraphs; `ImageFile` renders `name` and `imageUrl` inside a `.preview` wrapper.
- `src/windows/Contact.jsx` (new, windowKey `contact`): static contact card (photo, blurb, email, `socials` list from `constants/index.js`). Wired to the `contact` dock icon (`canOpen: true`) and `WINDOW_CONFIG.contact`.
- Tooltips are wired up: `react-tooltip` was added as a dependency and a `<Tooltip id="dock-tooltip" />` is rendered in `Dock.jsx`, so the existing `data-tooltip-*` attributes on dock icons work.
- `constants/index.js` defines `locations` (Work/About/Resume/Trash content trees) and `WINDOW_CONFIG` (consumed by the window store).
- Documentation set up: `RESUME_PROTOCOL.md`, `progress.md` (this file), `runbook.md`, and `README.md`.

## Fixed

- 2026-09-01: `Dock.jsx`'s `.map()` callback used a block body without a `return`, so every dock icon rendered as `undefined` (dock appeared empty). Fixed to an implicit-return arrow function.
- 2026-09-02: `npm run lint` was failing (`'app' is defined but never used` in `Dock.jsx`'s `toggleApp` stub). Added `argsIgnorePattern: '^_'` to `eslint.config.js`'s `no-unused-vars` rule and renamed the stub param to `_app`. (Superseded by the next fix, which gave `toggleApp` a real body.)
- 2026-09-02: `src/store/window.js` initialized state as `windowS` (typo) while every action (`openWindow`/`closeWindow`/`focusWindow`) read `state.windows` — so the store's `windows` was always `undefined`, throwing `Cannot read properties of undefined (reading 'finder')` on the first dock click. Fixed the key to `windows`.
- 2026-09-02: defensive pass — `openWindow`/`closeWindow`/`focusWindow` in `window.js` now no-op instead of throwing if `windowKey` isn't in `windows` (guards the still-open `trash` gap below). `Dock.jsx`'s `toggleApp` gained the same guard and its local var was renamed `window` → `appWindow` (was shadowing the browser global); also dropped a leftover `console.log(windows)`. `Welcome.jsx`'s GSAP cleanup now calls `titleCleanup?.()`/`subtitleCleanup?.()` since `setupTextHover` can return `undefined` if its ref isn't set.
- 2026-09-02: `src/hoc/windowWrapper.jsx` (now wired in via `Terminal.jsx` → `App.jsx`) had `style={zIndex}`, passing a raw number as the `style` prop instead of a style object. Threw `Uncaught Error: The style prop expects a mapping...` on every render. Fixed to `style={{ zIndex }}`.
- 2026-09-02: `src/windows/Terminal.jsx`'s `techStack.map()` callback used a block body with no `return` (same class of bug as the earlier `Dock.jsx` fix), so every tech-stack category rendered as `undefined` and the list appeared empty. Fixed to an implicit-return arrow function.
- 2026-09-04: Vite dev server errored with `Two output files share the same path but have different contents: node_modules\.vite\deps_temp_*\gsap_draggable.js`. Root cause: `App.jsx` imported `gsap/draggable` (lowercase) while the actual file on disk is `Draggable.js` — this only "worked" due to Windows' case-insensitive filesystem, but esbuild's dependency optimizer resolved it to two differently-cased internal paths and collided writing its cache. Fixed the import to `gsap/Draggable` and cleared the stale `node_modules/.vite` cache.
- 2026-09-11: `src/windows/Finder.jsx`'s `renderList(name, items)` was called with only one argument at both call sites, so `items` was `undefined` inside the function and `.map` threw `Cannot read properties of undefined (reading 'map')`. Fixed both call sites to pass `name` and `items`, and dropped the now-redundant `<div><h3>/<ul>` wrapper at the call sites since `renderList` already renders its own.
- 2026-09-11: `src/windows/Finder.jsx`'s content-pane list had two bugs: `activeLocation ?.children` had a stray space, which is not valid optional-chaining syntax; and the `.map()` callback used a block body with no `return` (same bug class as the `Dock.jsx`/`Terminal.jsx` fixes above), so nothing in the content pane rendered even after the syntax was fixed. Fixed to `activeLocation?.children.map((item) => (...))`.
- 2026-09-11: `src/hoc/windowWrapper.jsx` passed `OnPress` (capital O) to `Draggable.create`, but GSAP's Draggable reads `vars.onPress` (lowercase) — so `focusWindow(windowKey)` never fired on press and clicking/dragging a window never raised its z-index above the others. This was the open item noted since 2026-09-02. Fixed to `onPress`.
- 2026-09-11: `src/windows/Contact.jsx` displayed the email as `contact@himashijayaweera@gmail.com` (two `@` signs — not a valid address). Fixed to `himashijayaweera@gmail.com`.

## Next steps

- Build the remaining window UI components that render content from `locations` (About, Resume detail view beyond the PDF, Trash) — Finder/Terminal/Safari/Resume/TextFile/ImageFile/Contact are done, those are not.
- `dockApps` has a `photos` entry (`canOpen: true`) and `WINDOW_CONFIG.photos` exists, but there's no `Photos` window component and nothing renders it in `App.jsx` — clicking the "Gallery" dock icon flips `windows.photos.isOpen` in the store with no visible effect.
- `WINDOW_CONFIG` still has no `trash` entry. No longer a crash risk (see defensive pass above), but if trash becomes openable, add a matching `WINDOW_CONFIG.trash` entry so it actually works.

## Decisions

- Git add/commit/push is done manually by the user — do not run git write commands unless explicitly asked.
- 2026-09-01: `RESUME_PROTOCOL.md`, `progress.md`, `runbook.md` stay tracked in git, not gitignored — gitignoring would break cross-session/cross-machine continuity and leave `README.md`'s links dangling on a fresh clone.
- 2026-09-02: Claude in Chrome was declined for this session, so a reported "error shown on App.jsx" couldn't be reproduced live; lint/build passed clean, so the fix was blocked pending the exact error text from the user rather than guessed at. Codified this as a rule in `RESUME_PROTOCOL.md` → "Debugging runtime errors".
- 2026-09-02: `progress.md` only gets entries for issues once they're fixed, not when merely found/noted — avoids stale "not yet fixed" bullets going out of date as the code moves on. Codified in `RESUME_PROTOCOL.md`.
- 2026-09-11: Generic content-file windows (`TextFile`/`ImageFile`) read their data from `useWindowStore().windows[key].data`, set by `Finder`'s `openItem` via `openWindow(`${item.fileType}${item.kind}`, item)`. The windowKey naming convention (`txtfile`, `imgfile`) is derived directly from `item.fileType + item.kind` in `constants/index.js`'s `locations` data — keep those two in sync if new file types are added.
