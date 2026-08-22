# Arcane Quest Known Risks

This document tracks release-relevant risks that should be reduced before v1.0.

## Runtime Authority

- `index.html` still loads a long flat chain of classic scripts. Script order remains a regression risk.
- Direct `window.render` ownership is now centralized in `core-runtime-v1.js`; future decorators should continue using `Arcane` lifecycle hooks.
- Screen-specific behavior should stay in the documented source-of-truth files instead of new repair runtimes.

## State and Persistence

- Direct browser storage access should remain centralized in the storage authority, with defensive compatibility fallbacks only where needed for load order.
- Reset, recovery and tutorial state should continue using canonical storage helpers instead of feature-local persistence.
- Save migration changes must stay forward-compatible and recovery-capable.

## Global State Access

- Runtime `window.S` reads have been removed outside documentation.
- New modules should use `Arcane.state.get()` for module-safe access, or direct lexical `S` only where the classic-script scope is intentional.

## Mobile and PWA

- Release testing must cover Android Chrome and installed PWA mode.
- Footer, dialogs, onboarding coachmarks and safe areas need repeated checks at narrow phone widths.
- Service worker updates must not interrupt an active play session.

## Backend Scope

- Backend work should wait until local save ownership is stable.
- First backend scope should be cloud save backup, leaderboard, cosmetics inventory and guild MVP.
- Anti-cheat requirements must be defined before public leaderboards become meaningful.
