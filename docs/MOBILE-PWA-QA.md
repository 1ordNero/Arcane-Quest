# Mobile / PWA QA

## Scope

This document covers the mobile QA baseline for `Arcane-Quest` on:

- Android Chrome
- installed PWA

The browser and the installed app must both be checked. Real-device testing remains mandatory; browser emulation is only a supplement for fast feedback and layout regression checks.

## Test Matrix

Run the core flows in both contexts:

- Android Chrome
- installed PWA

Check each flow for:

- Start
- Navigation
- Rendering
- Interaction
- Performance
- Persistency
- Error handling

The goal is to verify that the app behaves consistently across the browser and the standalone PWA shell, with no differences that break playability or state retention.

## Required Viewports

Test at these widths at minimum:

- 360px
- 390px to 430px
- large smartphone viewport

Use the smallest viewport to catch text wrapping, button crowding, footer overlap, and safe-area issues first. Use the larger viewport to verify that layouts scale cleanly without relying on the smallest case only.

## Critical Manual Flows

These flows are mandatory for release QA:

- Fresh start
  - App opens cleanly
  - No blank screen, crash, or broken bootstrap
  - Main state is visible without manual recovery

- Character creation
  - Inputs are reachable and readable on touch devices
  - Validation messages are visible
  - Completion produces the expected playable state

- Reload
  - Refresh does not lose progress
  - Reload does not duplicate state or actions
  - The user returns to a usable screen

- Quest
  - Quest screen loads correctly
  - Primary action is tappable
  - Progress and rewards are visible and understandable

- Arena
  - Combat UI remains usable on small screens
  - Action buttons are easy to tap
  - Results and state changes render correctly

- Katakomben
  - Long content scrolls correctly
  - Lists, rewards, and modal content stay within the viewport
  - No clipping or hidden actions

- Inventar
  - Items are readable
  - Empty states and long item names render correctly
  - Scrolling does not break selection or visibility

- Ahnenschmiede
  - Crafting flow is usable on touch
  - Important controls are not blocked by overlays or the keyboard
  - Confirmations are clear and deliberate

- Reinkarnation
  - Confirm flow is obvious
  - Irreversible action is clearly communicated
  - State resets correctly after completion

## UI Risk Areas

Focus review on the following areas:

- Footer
  - Must not cover primary actions
  - Must not jump or overlap during scroll

- Modals
  - Must fit on small screens
  - Close actions must stay visible and reachable
  - Background content must not remain interactive

- Coachmarks
  - Must not hide critical controls
  - Must be dismissible on touch
  - Must not create layout shifts that block play

- Safe Areas
  - Bottom UI must respect device insets
  - No content should sit under system bars or notches

- Long texts
  - Quest names, item names, labels, and error text must wrap safely
  - No horizontal overflow from unbounded strings
  - Truncation must not remove essential meaning

- Touch zones
  - Primary controls need enough spacing for thumb input
  - Small icons and adjacent buttons must not cause mis-taps

- Overlay / stacking
  - Popovers, dialogs, and tooltips must layer correctly
  - No important element should disappear behind another layer
  - Scroll locking must release correctly after close

## v1.0 Blocker Criteria

Treat the following as release blockers:

- Start blocker
  - App does not load reliably on Android Chrome or in the installed PWA
  - Blank screen, crash, or endless loading state

- Flow blocker
  - A critical flow cannot be completed
  - Character creation, questing, arena, inventory, or reincarnation is blocked

- Interaction blocker
  - Primary buttons are not tappable
  - Modals cannot be closed
  - Input or scrolling is broken on mobile

- Persistency blocker
  - Reload or app restart loses progress
  - Browser and PWA states diverge in a way that breaks play

- Layout blocker
  - Important content is clipped or hidden on required viewports
  - Footer, overlays, or safe-area handling block core actions

- Performance blocker
  - Startup or route changes are too slow for practical mobile use
  - Visible jank or frozen UI prevents normal interaction

## Automation Candidates

The first automation pass should cover only stable, high-signal checks:

- Playwright smoke tests
  - Start the app
  - Open the main screen
  - Exercise one happy-path core flow

- Mobile viewport checks
  - Run at 360px and one mid-size smartphone width
  - Verify that the page stays usable without horizontal scroll

- No horizontal scroll
  - Assert that the document width does not exceed the viewport
  - Catch accidental overflow from long labels, cards, or fixed elements

- Modal / footer assertions
  - Verify that modals stay inside the viewport
  - Verify that the footer does not cover primary controls

- Reload / state checks
  - Reload after a completed step
  - Confirm that the expected state survives the refresh

Keep the automation small and deterministic. The goal is fast regression signal, not full gameplay coverage.
