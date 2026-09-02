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

## Ownership notes

- Git add/commit/push are handled manually by the user. Never run git write commands (`git add`, `git commit`, `git push`, etc.) unless explicitly asked to in that conversation.
- `progress.md`, `runbook.md`, and this file are living documents — keep them current rather than accurate-as-of-creation.
- `RESUME_PROTOCOL.md`, `progress.md`, and `runbook.md` are deliberately **not** gitignored (decided 2026-09-01). Gitignoring them would defeat their purpose — cross-session/cross-machine continuity — since a fresh clone would be missing them, and `README.md` links to all three. Don't re-add them to `.gitignore` without raising this tradeoff again.
