# Arcane Quest – Runtime Architecture

Diese Datei definiert die kanonischen Verantwortlichkeiten des Release-Builds. Neue Fixes sollen grundsätzlich in der jeweiligen Source of Truth erfolgen und nicht als nachgelagerte Repair-Kette.

## Globale Authorities

- `core-runtime-v1.js`: zentrale Render-, Navigation- und Event-Authority.
- `state-runtime-v1.js`: Save, Normalisierung, Migration, Backup und Recovery.
- `asset-runtime-v1.js`: Asset-Hydrierung und Asset-Lifecycle.
- `release-runtime-v1.js`: einzige Quelle der sichtbaren Build-Version.

## Screen-Ownership

- Taverne/Quest-Auswahl: `tavern.js` + `quest-system-v1.js`.
- Katakomben: `dungeon-v7.js`; ergänzende Module dürfen Mechaniken erweitern, aber keinen zweiten vollständigen Dungeon-Renderer etablieren.
- Arena: `arena-v2.js` ist der kanonische Renderer. `arena-system-v1.js` besitzt Arena-State und Kampflogik; `arena-ux-v3.js` darf die bestehende Darstellung dekorieren, aber `window.arena` nicht ersetzen.
- Händler: `merchant-v3.js` besitzt Kauf-/Verkaufszustand und Transaktionen. `item-detail-popup-v1.js` darf Aktionen darstellen, muss aber den Händler-Kontext an `merchantBuy`/`merchantSell` delegieren.
- Held: `hero-dashboard-v8.js` besitzt das aktuelle Equipment-Dashboard, die einmalige Skillrotation, Stat-Dialoge, Inventar-Tab-Normalisierung und Item-Tap-Weiterleitung.
- Schmiede: `forge-v5.js` ist die primäre Schmiede-Authority; Affix-/Ahnenwerk-Module erweitern die Mechanik innerhalb dieses Screens.
- Reinkarnation: `reincarnation-v1.js` besitzt Reset, Recovery-Snapshot, Schlüssel-Wipe, Seelensteine und Vermächtnisregeln. `shrine-runtime-v2.js` ist ausschließlich Adapter/UI-Integration und darf keinen eigenen Reset implementieren.
- Onboarding: `onboarding-v1.js` besitzt Zustand und Kapitelprogression. Layout-/Copy-Module dürfen nur Darstellung ergänzen und keinen zweiten Tutorial-State führen.

## Verbotene Repair-Runtimes

Die früheren Dateien `arena-render-fix-v1.js`, `arena-view-repair-v1.js`, `hero-tutorial-bridge-v1.js` und `hero-skill-visibility-v1.js` wurden in die kanonischen Owner zurückgeführt und dürfen nicht erneut in `index.html` geladen werden.

## Release-Regeln

1. Ein Fehler wird zuerst in der Source of Truth behoben.
2. Ein neues Runtime-Modul benötigt eine klar abgegrenzte Verantwortung und darf keine bestehende globale Authority ersetzen.
3. Screen-Renderer werden genau einmal veröffentlicht.
4. Persistente Datenänderungen laufen über die zentrale Save-Authority.
5. Destruktive Meta-Aktionen müssen Recovery-fähig sein.
6. `index.html` darf keine fehlenden, obsoleten oder doppelten Runtimes laden.
7. Jede Release-relevante Änderung erhöht die Build-Version und aktualisiert bei Bedarf README/Release-Checkliste.
8. Code Health muss vor Release vollständig grün sein.

## Release-Hardening

Bis v1.0 werden keine neuen Kernsysteme begonnen. Priorität haben Regressionstests, Save/PWA-Stabilität, mobile Bedienbarkeit, Balance und das Entfernen verbleibender unnötiger Patch-Ketten.