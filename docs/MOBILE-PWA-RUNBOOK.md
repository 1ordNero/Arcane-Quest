# Mobile / PWA QA Runbook

Use this runbook for release-candidate checks on a real Android device.

## Scope

Run every check in both contexts:

- Android Chrome
- Installed PWA

Record results as:

- `PASS`
- `FAIL`
- `BLOCKER`
- `NOT TESTED`

For every failure, capture:

- device model
- Android version
- browser or PWA context
- viewport or orientation
- screen / flow
- short reproduction steps
- screenshot or screen recording when useful

## Setup

1. Open the current hosted PWA build in Android Chrome.
2. Clear site data before the fresh-start pass.
3. Install the PWA from Chrome.
4. Launch the installed PWA from the app icon.
5. Repeat the same critical flows in Chrome and installed PWA.

Do not mix results from a temporary checkout, emulator-only pass, or desktop browser pass into the real-device QA summary.

## Smoke Pass

### 1. Fresh Start

Steps:

1. Open the app with cleared site data.
2. Wait for the first usable screen.
3. Reload once.

Expected:

- No blank screen.
- No endless loading.
- Character creation or the expected start surface is visible.
- Reload returns to a usable state.

Blocker if:

- App cannot start.
- User is stuck before character creation.
- Reload breaks the app.

### 2. Character Creation

Steps:

1. Create a character.
2. Use a short name.
3. Select class, gender, and background.
4. Confirm creation.

Expected:

- All controls are tappable.
- Text is readable on small screens.
- Confirmation enters the playable state.
- Keyboard does not hide required actions.

Blocker if:

- Character creation cannot be completed.
- Required controls are hidden, clipped, or untappable.

### 3. Navigation

Steps:

1. Use the footer navigation.
2. Visit Taverne, Held, Rucksack, Schmiede, and Arena.
3. Return to Taverne.

Expected:

- Footer remains visible but does not cover primary actions.
- Every target screen opens.
- Active state changes correctly.
- No horizontal scrolling appears.

Blocker if:

- A main tab cannot be opened.
- Footer blocks core controls.

### 4. Quest Flow

Steps:

1. Open the quest area from the Taverne.
2. Start one available quest or primary quest action.
3. Check reward or progress feedback.
4. Reload and verify state remains usable.

Expected:

- Primary quest action is tappable.
- Progress / reward feedback is visible.
- Reload does not duplicate or lose progress.

Blocker if:

- Quest flow cannot be started.
- State is corrupted after quest action or reload.

### 5. Arena Flow

Steps:

1. Open Arena.
2. Start or inspect the available combat flow.
3. Tap primary combat actions several times.
4. Observe result feedback.

Expected:

- Combat controls fit the viewport.
- Health/status feedback remains readable.
- Fast taps do not create broken state.

Blocker if:

- Combat cannot be used.
- Buttons overlap, disappear, or become untappable.

### 6. Dungeon / Katakomben Flow

Steps:

1. Open Katakomben when available.
2. Inspect room, enemy, reward, and action surfaces.
3. Scroll long content.
4. Trigger a modal or reward surface if available.

Expected:

- Content stays inside the viewport.
- Modals and rewards remain closable.
- No action is hidden behind footer or system UI.

Blocker if:

- Dungeon action is blocked.
- Modal or reward surface traps the user.

### 7. Inventory / Equipment

Steps:

1. Open Rucksack.
2. Inspect empty state or item list.
3. Open item details if available.
4. Check long names and rarity labels.

Expected:

- Item text wraps or truncates safely.
- Detail panel remains visible.
- Scrolling is stable.

Blocker if:

- Inventory cannot be inspected.
- Important item actions are hidden or untappable.

### 8. Forge

Steps:

1. Open Schmiede.
2. Inspect available upgrade / salvage actions.
3. Trigger only reversible or clearly safe actions during QA.

Expected:

- Costs and requirements are readable.
- Disabled states are understandable.
- Confirmation / result feedback is visible.

Blocker if:

- Forge screen cannot be used.
- Costs or actions are clipped in a way that can cause accidental use.

### 9. Reincarnation / Legacy

Steps:

1. Open the Reinkarnation or legacy surface when available.
2. Inspect the confirmation flow.
3. Stop before irreversible reset unless the build is a disposable QA save.

Expected:

- Irreversible action is clearly marked.
- Confirm / cancel controls are separated and readable.
- User can back out safely.

Blocker if:

- Irreversible action can be triggered accidentally.
- Confirmation cannot be read or cancelled.

## PWA-Specific Checks

Run these only in the installed PWA:

1. Launch from app icon.
2. Switch to another app and return.
3. Kill the PWA from recent apps and relaunch.
4. Toggle network off, open app, then restore network.

Expected:

- App launches without browser chrome.
- State survives app switch and relaunch.
- Offline / recovery state remains usable.
- No duplicate navigation stack appears.

Blocker if:

- PWA launch loses progress.
- Relaunch creates a blank screen.
- Installed PWA behaves materially worse than Chrome.

## Layout Checklist

Check on at least one small Android width and one modern standard width:

- No horizontal scroll.
- Footer does not cover primary buttons.
- Modals fit vertically.
- Safe area and bottom system UI do not hide content.
- Long item, quest, and skill names do not break layout.
- Touch targets are large enough for thumb input.
- Overlay close buttons remain reachable.

## Release Summary Template

```text
Build:
Date:
Tester:
Device:
Android:
Chrome:
Context: Chrome / Installed PWA

Fresh start:
Character creation:
Navigation:
Quest:
Arena:
Katakomben:
Inventory:
Forge:
Reincarnation:
PWA relaunch:
Offline / recovery:

Blockers:
Major issues:
Minor issues:
Notes:
Release recommendation: PASS / HOLD
```
