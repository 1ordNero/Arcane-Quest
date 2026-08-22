# Arcane Quest Release Roadmap

## Current Snapshot

- Repo: `https://github.com/1ordNero/Arcane-Quest`
- Current stack: static, framework-free HTML/CSS/JavaScript PWA.
- Product target: Web/PWA first, Android after that.
- Monetization direction: cosmetics only.
- Current public build docs and `release-runtime-v1.js` publish `v0.15.20`.

## Technical Findings

1. Runtime architecture is intentionally moving toward single authorities:
   - `core-runtime-v1.js` for render/navigation/events.
   - `state-runtime-v1.js` for save/migration/recovery.
   - `asset-runtime-v1.js` for asset lifecycle.
   - `release-runtime-v1.js` for build version.
2. `index.html` still loads a long flat chain of classic scripts. This is workable for release hardening, but script order remains a major regression risk.
3. Some older patch patterns remain:
   - `dungeon-presentation-v1.js` and `tavern-presentation-v1.js` still wrap `window.render`.
   - Several modules still read `window.S`; because `S` is a global lexical binding, this can fail silently.
   - Direct `localStorage` writes remain in editor, onboarding, telemetry, reset and compatibility paths.
4. CI exists and is useful:
   - `.github/workflows/code-health.yml` checks JavaScript syntax, runtime graph, asset references, load order, authority violations, critical public APIs and reincarnation invariants.
5. PWA foundation exists:
   - `manifest.webmanifest`, `sw.js`, app icons and installable metadata are present.
   - Release checklist already requires Android browser and installed PWA testing.

## Release Strategy

### Phase 0 - Freeze and Audit

- Keep release documentation synchronized with `release-runtime-v1.js`.
- Run GitHub Actions on `main` and treat red Code Health as release-blocking.
- Open or import the existing GitHub issues into the planning board.
- Maintain `docs/KNOWN-RISKS.md` for remaining authority and storage debt.

### Phase 1 - Runtime Hardening

- Move remaining post-render decorators from direct `window.render` wrappers to `Arcane.on('afterRenderSettled', ...)`.
- Replace `window.S` reads with `S` where lexical access is valid, or `Arcane.state.get()` where module-safe access is needed.
- Route character creation and tutorial persistence through the state/storage authority.
- Keep the current static PWA architecture until v1.0 unless a specific blocker requires bundling.

### Phase 2 - Mobile/PWA Quality

- Add a minimal Playwright smoke suite for:
  - fresh boot and character creation,
  - reload persistence,
  - footer navigation on 360px, 390px and 430px widths,
  - modal/tutorial button reachability,
  - service worker registration.
- Test real Android through the phone harness when available.
- Add asset-size and missing-alt checks before expanding graphics further.

### Phase 3 - Content and Graphics

- Create an art bible before generating more assets:
  - UI palette and typography,
  - icon style,
  - character portrait framing,
  - item rarity language,
  - background and combat effect rules.
- Replace any remaining emoji/fallback visuals with canonical assets only after a manifest-driven asset reference exists.

### Phase 4 - Backend MVP

- Do not add backend before save ownership is stable.
- Backend MVP scope:
  - anonymous/device-linked account upgrade path,
  - cloud save backup,
  - leaderboard,
  - cosmetics inventory,
  - guild membership and guild score.
- Recommended first backend candidates: Supabase or Firebase. Choose after deciding whether auth, realtime guild activity and admin tooling matter more than portability.

### Phase 5 - Android

- Keep PWA as source of truth.
- Package with Trusted Web Activity or Capacitor after Web/PWA release is stable.
- Add Android-specific checks for offline boot, update behavior, safe areas, back button and storage persistence.

## First 10 Engineering Tickets

1. Done: align release documentation with `release-runtime-v1.js`.
2. Run GitHub Actions Code Health and capture failing checks, if any.
3. Convert `dungeon-presentation-v1.js` render wrapper to an `Arcane` lifecycle hook.
4. Convert `tavern-presentation-v1.js` render wrapper to an `Arcane` lifecycle hook.
5. Replace high-risk `window.S` reads in combat/resource and story modules.
6. Move character creation save writes behind `state-runtime-v1.js`.
7. Add Playwright smoke test scaffold.
8. Add mobile viewport smoke tests for footer, dialogs and onboarding.
9. Create `docs/ART_DIRECTION.md`.
10. Draft backend data model for cloud saves, leaderboards, guilds and cosmetics.
