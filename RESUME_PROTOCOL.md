# Resume Protocol

Read this file first when starting or resuming work on this project — whether you're a future Claude Code session or a human returning after a break.

## Purpose

Defines how work on the macOS Portfolio project is picked up mid-stream without losing context or re-deriving decisions that were already made.

## Read order

1. `RESUME_PROTOCOL.md` (this file) — the process itself.
2. `progress.md` — what's been done, current state, next steps.
3. `runbook.md` — how to install, run, build, and lint the project.
4. `README.md` — project overview for anyone new to the repo.

## Update rule

Whenever this file changes, `README.md` must be updated in the same pass to reflect it. This is a hard rule, not a suggestion.

## Session start checklist

- [ ] Read `progress.md` → "Current state" section.
- [ ] Check `git status` / recent `git log` for anything not yet reflected in `progress.md`.
- [ ] Note any open questions or decisions in `progress.md` before starting new work.

## Session end checklist

- [ ] Update `progress.md` with what changed and the new current state.
- [ ] Update `runbook.md` if commands, scripts, or setup steps changed.
- [ ] If this file changed, update `README.md` to match (see Update rule above).

## progress.md logging rule

Only log an issue in `progress.md`'s "Fixed" section once it is actually fixed. Do not add "found but not yet fixed" notes — they go stale as the code moves on and can end up describing a problem that no longer exists. If something is found but left alone (out of scope, user said to leave it, etc.), mention it in conversation, not in `progress.md`; add the entry only when it's later fixed.

## Debugging runtime errors

When asked to fix "the error shown on X", first check whether browser tooling (e.g. Claude in Chrome) is available this session:

- If it is, use it to reproduce and read the actual console error before touching code.
- If it isn't (declined or unavailable), `npm run lint` and `npm run build`/`vite build` only catch static/syntax issues, not runtime ones. Do not guess at a runtime error from a diff alone — ask the user to paste the exact error text/stack trace before making speculative fixes.

## Known recurring bug pattern: `.map()` with a block body and no `return`

Twice so far (`Dock.jsx`'s dock icons, then `Terminal.jsx`'s tech-stack list), a `.map()` callback was written with a block body (`{ ... }`) but no `return` statement, so it silently produced `undefined` for every item and the section rendered empty — no error, no console output, just nothing on screen.

When debugging "X isn't showing up" / "list is empty" with no console error, grep the relevant component's `.map()` calls first and check each has either an implicit return (`=> ( ... )`) or an explicit `return` inside its block body, before looking elsewhere.

## Ownership notes

- Git add/commit/push are handled manually by the user. Never run git write commands (`git add`, `git commit`, `git push`, etc.) unless explicitly asked to in that conversation.
- `progress.md`, `runbook.md`, and this file are living documents — keep them current rather than accurate-as-of-creation.
- `RESUME_PROTOCOL.md`, `progress.md`, and `runbook.md` are deliberately **not** gitignored (decided 2026-09-01). Gitignoring them would defeat their purpose — cross-session/cross-machine continuity — since a fresh clone would be missing them, and `README.md` links to all three. Don't re-add them to `.gitignore` without raising this tradeoff again.
