# Arcane Quest architecture

## Purpose

This document describes the current runtime structure and the migration path toward a smaller, explicit architecture. The refactor rule is: preserve gameplay behavior first, consolidate second, delete old patch modules only after their behavior has been moved and regression-checked.

## Current boot order

The page currently loads a long sequence of classic scripts from `index.html`.

1. Reset/recovery boot scripts run before the game state exists.
2. Character editor scripts may read/write the save directly.
3. `app.js` creates the global lexical state `S`, defines the original `save()` and `render()`, and performs the first render.
4. `state-runtime-v1.js` replaces `window.save` with the versioned persistence implementation and registers page lifecycle autosaves.
5. Feature modules add gameplay systems.
6. UX, guard, visual, PWA and balance modules repeatedly wrap existing global functions such as `render`, `tab`, quest starts and combat starts.

## Important current constraints

### Global state

`app.js` declares `let S`. In a classic script this is globally visible to later scripts by identifier, but it is not a property of `window`. Code must use `S` (or the new `Arcane.state.get()`) rather than `window.S`.

Known modules using `window.S` should be migrated because those checks can silently fail:

- `activity-lock-v1.js`
- `beta-navigation-guards-v1.js`

### Save ownership

There are currently multiple save concepts:

- `app.js` defines the original `save()` using `localStorage.setItem`.
- `state-runtime-v1.js` defines the authoritative versioned persistence function and assigns it to `window.save`.
- boot/reset scripts manipulate the same storage keys independently.
- character creation writes `arcaneBeta` directly.

Target: one storage module owns save, backup, migration, reset and recovery. Feature modules request persistence instead of writing save keys themselves.

### Render ownership

`app.js` owns the base `render()` function. Many modules later replace `window.render` with wrappers and call the previous implementation. This creates ordering dependencies and makes a later-loaded module able to accidentally bypass or undo another module.

Target: keep one render entry point and migrate post-render work to explicit lifecycle hooks (`Arcane.on('afterRender', ...)`).

### Navigation/activity ownership

Navigation and activity exclusion are split between several layers, including `beta-navigation-guards-v1.js` and `activity-lock-v1.js`. Both wrap overlapping start/navigation functions.

Target: one activity service answers `activeActivity()` and one navigation service decides whether a requested transition is allowed.

## Core runtime introduced in phase 1

`core-runtime-v1.js` creates a non-invasive `window.Arcane` namespace with:

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

Phase 1 deliberately does not redirect existing gameplay through these hooks yet.

## Refactor sequence

### Phase 1 — inventory and core contract

- add neutral core namespace and lifecycle contract
- document ownership/dependencies
- establish regression checklist
- no gameplay changes

### Phase 2 — state / storage / boot

- make a single storage implementation authoritative
- move reset, backup and recovery behind it
- remove duplicate raw save writes from character creation
- normalize intentional-reset lifecycle
- migrate autosave to core lifecycle

### Phase 3 — render / navigation

- add one render dispatcher
- replace chained render wrappers with `afterRender` hooks
- consolidate activity locks/navigation guards
- remove `window.S` checks

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
