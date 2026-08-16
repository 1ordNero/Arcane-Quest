# Arcane Quest smoke tests

Run the relevant checks after every refactor that changes runtime ownership, script order or persistence. A refactor is not complete until the affected checks pass.

## Boot and save

- Existing valid save opens on the same screen with the same level, currencies, HP and inventory.
- Reload preserves character name, gender, class and background.
- Character creation persists the selected portrait/class/name after reload.
- Corrupt primary save falls back to the valid backup without crashing.
- Reset starts a genuinely new character and does not restore the previous state on `pagehide` or reload.

## Navigation and activity locks

- Main footer changes screens when no major activity is active.
- Active quest blocks starting Katakomben/Arena when intended.
- Active Katakomben run blocks incompatible navigation/actions.
- Active Arena fight blocks incompatible activity starts.
- Allowed navigation remains available; guards do not disable unrelated buttons.

## Taverne / quests

- Quest card opens/closes correctly.
- Starting a quest consumes the expected Abenteuerlust once.
- Completed quest awards XP/gold/items once.
- Miniboss/auto combat starts and resolves.
- Quest item artwork is rendered once, not duplicated.

## Katakomben

- Entering starts at the correct room and preserves HP/run loot.
- Room artwork uses `assets/icons/catacombs/` and is displayed once.
- Combat advances automatically and cannot be escaped through normal navigation while active.
- Rest/event/treasure/elite/boss room choices still work.
- Voluntary exit is only available when allowed by the game rules.
- Defeat and successful exit apply the correct secured/unsecured loot rules.

## Hero / items

- Header/profile portrait matches selected class and gender.
- Name and class text match the created character.
- Equip/unequip updates stats once.
- Inventory item action opens the correct item.
- Ring/weapon/offhand restrictions remain intact.
- Item artwork is shown once in inventory, equipment and rewards.

## Arena

- Opponent selection and stance selection work.
- Starting a fight consumes the intended stamina once.
- Fight resolves, reward is granted once and state is reload-safe.
- Interrupted fight recovery does not duplicate rewards or stamina costs.

## City / forge / merchant / bank

- Level gates remain correct.
- Buy/sell/deposit/withdraw preserve item identity and capacity limits.
- Forge upgrade consumes the correct materials once.
- Salvage/affix/keystone/build systems remain available where intended.

## PWA / mobile

- Fresh online load requests current JavaScript/assets.
- Reload does not revert to stale artwork.
- Footer remains usable on a narrow mobile viewport.
- Reset control remains reachable even during an active combat state.
