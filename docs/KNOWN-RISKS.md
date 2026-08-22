# Arcane Quest Known Risks

This document tracks release-relevant risks that should be reduced before v1.0.

## Runtime Authority

- `index.html` still loads a long flat chain of classic scripts. Script order remains a regression risk.
- Remaining direct render wrappers should be migrated to `Arcane` lifecycle hooks.
- Screen-specific behavior should stay in the documented source-of-truth files instead of new repair runtimes.

## State and Persistence

- Direct `localStorage` writes still exist in several compatibility and editor paths.
- Character creation, reset, recovery and tutorial state should continue moving behind the canonical storage authority.
- Save migration changes must stay forward-compatible and recovery-capable.

## Global State Access

- Some modules still read `window.S`. Because `S` is a global lexical binding, these checks can silently fail.
- Prefer direct lexical `S` where valid, or `Arcane.state.get()` for module-safe access.

## Mobile and PWA

- Release testing must cover Android Chrome and installed PWA mode.
- Footer, dialogs, onboarding coachmarks and safe areas need repeated checks at narrow phone widths.
- Service worker updates must not interrupt an active play session.

## Backend Scope

- Backend work should wait until local save ownership is stable.
- First backend scope should be cloud save backup, leaderboard, cosmetics inventory and guild MVP.
- Anti-cheat requirements must be defined before public leaderboards become meaningful.
