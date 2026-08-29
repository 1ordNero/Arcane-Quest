# Item Asset Refresh Plan

Stand: 2026-08-29

Ziel: Kleine oder schlecht lesbare Item-Assets gezielt ersetzen und gleichzeitig genug Item-Designs vorbereiten, damit Seltenheitsstufen visuell unterscheidbar werden. Dieser Plan beschraenkt sich auf das aktuelle kanonische Equipment-Modell.

## Kanonische Slots

Aktuell zaehlen nur diese neun Slots:

- Kopf
- Schulter
- Brust
- Beine
- Stiefel
- Amulett
- Ring
- Haupthand
- Zweithand

Nicht fuer diese Runde planen: Ring 2, Guertel, Handschuhe.

## Art Direction

Basils Vorgabe fuer die Erneuerung:

- Item-Motiv soll ca. 70-82% der Canvas-Hoehe oder -Breite nutzen.
- Silhouette vor Detail: mobile Lesbarkeit bei Inventar-, Reward- und Equipment-Groesse hat Prioritaet.
- Transparenter Hintergrund, keine gemalten dunklen Quadrate.
- Kein eingebauter Seltenheitsrahmen im Item selbst. Rarity bleibt UI-Layer.
- Legendary darf alte Relikt-/Ahnen-Akzente haben, aber keine Shop- oder Premium-Glitzer-Anmutung.

## Rarity-Sprache

| Seltenheit | Visuelle Sprache |
| --- | --- |
| common | Eisen, Leder, Knochen, matte Materialien, wenig bis kein Glow |
| magic | Ein farbiger Akzent, kleine Rune, schwacher Glow |
| rare | Materialkontrast, sichtbarer magischer Kern, klares Rim Light |
| epic | Arkaner/violetter Glow, sparsame Partikel, komplexere Form |
| legendary | Patiniertes Gold, Gravuren, warmes Innenlicht, Ahnen-/Reliktcharakter |

## Austausch-Welle 1: Zu kleine Assets

Diese Assets sind rechnerisch und visuell die wichtigsten Kandidaten. Ziel ist Ersatz unter gleichem Dateinamen, damit Runtime-Mapping stabil bleibt.

| Aktuelle Datei | Slot | Ziel-Rarity | Neuer Designkern | Prompt-Kern |
| --- | --- | --- | --- | --- |
| `helmet-knight.webp` | Kopf | common | Breiter Eisenhelm mit T-Visier und klarer Nackenkante | isolated dark fantasy iron knight helmet, large readable silhouette, T visor, worn steel, transparent background, mobile RPG item icon, 512x512 |
| `helmet-shadow.webp` | Kopf | rare | Dunkler Kapuzenhelm, violetter Augenriss, harte Aussenform | isolated shadow hood helmet, violet arcane eye slit, blackened metal and cloth, strong rim light, transparent background, mobile RPG item icon, 512x512 |
| `helmet-paladin.webp` | Kopf | rare | Heller Plattenhelm, goldene Stirnrune, kompakter Umriss | isolated holy paladin helmet, pale steel, small gold rune, strong readable silhouette, transparent background, mobile RPG item icon, 512x512 |
| `boots-knight.webp` | Stiefel | common | Schwere Eisenstiefel als Paar mit Lederbaendern | isolated pair of heavy knight boots, iron sabatons, leather straps, oversized readable silhouette, transparent background, mobile RPG item icon, 512x512 |
| `boots-druid.webp` | Stiefel | magic | Lederstiefel mit Wurzel-/Dornenbindung und Moosgruen | isolated druid leather boots, roots and thorn bindings, muted green glow, readable silhouette, transparent background, mobile RPG item icon, 512x512 |
| `ring-arcane.webp` | Ring | rare | Vergroesserter Ring mit schwebendem Kristallkern | isolated arcane ring, large circular silhouette, floating crystal core, cyan violet glow, transparent background, mobile RPG item icon, 512x512 |

## Austausch-Welle 2: Naechste Lesbarkeitskandidaten

| Aktuelle Datei | Slot | Ziel-Rarity | Neuer Designkern |
| --- | --- | --- | --- |
| `helmet-warlock.webp` | Kopf | epic | Gehoernter Knochen-/Metallhelm mit Seelenlicht |
| `helmet-druid.webp` | Kopf | magic | Geweih-/Wurzelhaube mit klarer Kronenform |
| `helmet-demon.webp` | Kopf | epic | Daemonischer Helm mit asymmetrischen Hoernern |
| `weapon-staff-druid.webp` | Haupthand | magic | Diagonaler Naturstab mit gegabelter Wurzelkrone |
| `armor-knight.webp` | Brust | common | Breiter Brustpanzer mit klarer Plattenform |
| `robe-mage.webp` | Brust | magic | Hohe Robe mit Runensaum und blau-violettem Licht |

## Neue Item-Designs Fuer Rarity-Abdeckung

Diese Designs schaffen mehr Loot-Breite, ohne neue Systeme zu blockieren.

| Datei | Slot | Rarity | Rolle |
| --- | --- | --- | --- |
| `weapon-sword-iron-oath.webp` | Haupthand | common | Fruehes Krieger-Schwert |
| `weapon-staff-cinder-apprentice.webp` | Haupthand | magic | Magier-Fruehstab |
| `offhand-shield-runic.webp` | Zweithand | rare | Krieger-Zweithand mit Runenidentitaet |
| `offhand-orb-moonwell.webp` | Zweithand | magic | Magier/Druiden-Orb |
| `shoulders-plate-vigil.webp` | Schulter | common | Schwere Schulter-Baseline |
| `shoulders-thorn-mantle.webp` | Schulter | rare | Druiden-Schulter mit Dornenkranz |
| `legs-plate-knight.webp` | Beine | common | Breites Plattenbeinzeug |
| `legs-shadowweave.webp` | Beine | epic | Schattenstoff-Beinzeug |
| `amulet-ember-vow.webp` | Amulett | magic | Feuer-/Eid-Amulett |
| `ring-ancestral-sigil.webp` | Ring | legendary | Ahnenring mit patiniertem Gold |

## Produktionsreihenfolge

1. Welle 1 ersetzen und unter gleichen Dateinamen speichern.
2. Contact Sheet gegen alte Assets und Batch-1-Assets pruefen.
3. `assets/items/manifest.json` aktualisieren oder neu generieren.
4. `npm test` ausfuehren.
5. Erst danach Welle 2 oder neue Rarity-Designs generieren.

