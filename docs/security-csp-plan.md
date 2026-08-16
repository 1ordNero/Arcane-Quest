# Content Security Policy rollout plan

Arcane Quest still uses inline event handlers and inline styles in multiple UI modules. Enabling a strict Content Security Policy today would therefore risk breaking navigation, combat actions, inventory controls, and dynamically rendered screens.

## Target policy

The long-term target is a same-origin policy that does not require `unsafe-inline` for scripts:

```text
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
connect-src 'self';
worker-src 'self';
manifest-src 'self';
object-src 'none';
base-uri 'self';
```

`style-src 'unsafe-inline'` remains in the initial target because many modules currently inject style elements at runtime. Removing that exception is a separate UI refactor and is not required to eliminate script injection.

## Required migration before enforcement

1. Replace persisted or dynamic values inserted through `innerHTML` / `insertAdjacentHTML` with DOM APIs or explicit escaping.
2. Replace inline `onclick`, `oninput`, and similar attributes with delegated or direct `addEventListener` handlers.
3. Keep all executable JavaScript in same-origin `.js` files.
4. Verify the service worker, manifest, character art, item art, and generated icons are all covered by the intended source directives.
5. Test character creation, tavern quests, inventory/equipment, forge, arena, and the complete catacomb run before enabling the policy.

## Enforcement strategy

Do not add a strict CSP meta tag until the inline script-handler inventory has been removed. When ready, deploy the policy at the HTTP response-header level where possible. Start with a reporting phase at the hosting layer, inspect violations, then enforce only after the normal gameplay paths produce no script-policy violations.

This document intentionally changes no runtime behavior.