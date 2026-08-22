# Arcane Quest architecture

## Purpose

This document describes the current runtime structure and the migration path toward a smaller, explicit architecture. The refactor rule is: preserve gameplay behavior first, consolidate second, delete old patch modules only after their behavior has been moved and regression-checked.

## Current boot order

The page currently loads a long sequence of classic scripts from `index.html`.

1. Reset/recovery boot scripts run before the game state exists.
2. Character editor scripts use the storage authority for save/text markers, with defensive fallbacks for early boot.
3. `app.js` creates the global lexical state `S`, delegates save/reset to the storage/state authorities and defines the bootstrap `render()`.
4. `state-runtime-v1.js` replaces `window.save` with the versioned persistence implementation and registers page lifecycle autosaves.
5. Feature modules add gameplay systems.
6. UX, guard, visual, PWA and balance modules repeatedly wrap existing global functions such as `render`, `tab`, quest starts and combat starts.

## Important current constraints

### Global state

`app.js` declares `let S`. In a classic script this is globally visible to later scripts by identifier, but it is not a property of `window`. Code must use `S` (or, after the core is wired in, `Arcane.state.get()`) rather than `window.S`.

Runtime `window.S` reads have been migrated outside documentation. New modules should keep using `Arcane.state.get()` where module-safe access is needed.

### Save ownership

Storage ownership is now centralized:

- `reset-boot-v1.js` publishes the shared `ARCANE_STORAGE` helper for save, backup, text markers, reset and recovery storage operations.
- `state-runtime-v1.js` defines the authoritative versioned persistence function and assigns it to `window.save`.
- `app.js` and character creation delegate persistence to the storage/state authorities.
- defensive `localStorage` fallbacks may remain only for early boot or compatibility paths.

Target: one storage module owns save, backup, migration, reset and recovery. Feature modules request persistence instead of writing save keys themselves.

### Render ownership

`app.js` owns the bootstrap render, and `core-runtime-v1.js` installs the runtime render lifecycle. A current code search finds direct `window.render =` ownership only in `core-runtime-v1.js`.

Target: keep one render entry point and route post-render work through explicit lifecycle hooks (`Arcane.on('afterRenderSettled', ...)`).

### Navigation/activity ownership

Navigation and activity exclusion are split between several layers, including `beta-navigation-guards-v1.js` and `activity-lock-v1.js`. Both wrap overlapping start/navigation functions.

Target: one activity service answers `activeActivity()` and one navigation service decides whether a requested transition is allowed.

## Core runtime scaffold introduced in phase 1

`core-runtime-v1.js` defines a non-invasive `window.Arcane` namespace with:

- `Arcane.state.get()` — safe access to the lexical `S` state after it exists.
- `Arcane.state.screen()` — current screen helper.
- `Arcane.on(name, handler)` — lifecycle hook registration.
- `Arcane.emit(name, payload)` — lifecycle hook dispatch.
- `Arcane.diagnostics.snapshot()` — small runtime diagnostic snapshot.

Initial hook names:

- `beforeRender`
- `afterRender`
- `beforeSave`
- `afterSave`
- `screenChange`
- `bootReady`

The scaffold is loaded by `index.html` after `app.js` and before later runtime modules. It now owns render lifecycle hooks, shell rendering and navigation authority.

## Refactor sequence

### Phase 1 — inventory and core contract

- add neutral core namespace and lifecycle contract
- document ownership/dependencies
- establish regression checklist
- no gameplay changes

### Phase 2 — state / storage / boot

- wire `core-runtime-v1.js` into the boot order
- done: make a single storage implementation authoritative
- done: move reset, backup and recovery behind it
- done: remove duplicate raw save writes from character creation
- normalize intentional-reset lifecycle
- migrate autosave to core lifecycle

### Phase 3 — render / navigation

- done: add one render dispatcher
- done: replace dungeon and tavern chained render wrappers with lifecycle hooks
- consolidate activity locks/navigation guards
- done: remove runtime `window.S` checks outside documentation

### Phase 4 — feature consolidation

Consolidate one feature family at a time, keeping behavior stable:

1. Katakomben
2. combat and bounty combat
3. hero / inventory / equipment
4. tavern / quests
5. arena
6. city / merchant / bank / forge
7. UI polish/effects

### Phase 5 — file structure

Once patch chains are removed, move stable code into a clearer directory structure such as:

```
src/
  core/
  systems/
  screens/
  ui/
  content/
```

Do not move files only for aesthetics while runtime dependencies still rely on script order.

## Deletion rule

A patch module may be deleted only when all of the following are true:

1. its behavior is understood;
2. its behavior is either obsolete or migrated;
3. no loaded script or generated content references it;
4. the relevant smoke tests pass;
5. the replacement does not rely on the old script order.
