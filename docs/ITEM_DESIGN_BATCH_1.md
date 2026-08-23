# Item Design Batch 1

Ziel: ein kleines, konsistentes Item-Set fuer den Web/PWA-Testrelease. Die Designs testen die MVP-Art-Direction praktisch, ohne neue Systeme oder Shop-Scope zu starten.

Alle Item-Assets folgen dem bestehenden Standard:

- Ordner: `assets/items/`
- Format: `512x512 WebP`
- Alpha: isoliertes Objekt mit transparentem Rand
- Benennung: `slot-class-or-theme-variant.webp`
- Mapping pruefen: `item-assets-v2.js`, `assets/items/manifest.json`, `item-system.js`, `item-ui-v4.js`

## Produktionsregeln

- Silhouette muss bei `44px` noch lesbar sein.
- Kein Item darf wie ein kaufbarer Power-Vorteil wirken.
- Rarity darf ueber Rahmen/Glow vorbereitet werden, aber nicht fest ins Item einbacken.
- Jedes Item braucht eine klare Slot-Funktion: Waffe, Offhand, Ruestung, Schmuck, Consumable.
- Neue Designs sollen bestehende Klassenfamilien erweitern: Krieger, Magier, Druide, Hexenmeister, Totenbeschwoerer.

## Set A: Early-Game Identitaet

### 1. `weapon-sword-rune-initiate.webp`

- Slot: Waffe
- Klasse/Thema: Krieger / allgemeiner Early-Game-Held
- Rolle: erste klare Ausruestungsverbesserung nach Startquests
- Silhouette: kurzes, breites Schwert mit leicht gebrochener Spitze
- Material: dunkler Stahl, Ledergriff, kleine violette Rune nahe der Parierstange
- Farbidee: Stahlgrau, altes Leder, Arcane-Violett als kleiner Akzent
- Gameplay-Signal: solide, verlaesslich, nicht legendär
- Prompt-Kern: isolated dark fantasy short sword, broad readable silhouette, worn steel, leather grip, small purple rune glow, transparent background, mobile game item icon, 512x512

### 2. `ring-oath-ember.webp`

- Slot: Ring
- Klasse/Thema: universell
- Rolle: frueher Schmuck-Drop, der Item-Vergleich sichtbar macht
- Silhouette: dicker Eisenring mit kleinem eingelassenem Glutstein
- Material: schwarzes Eisen, rissige Goldfassung, roter Glutkern
- Farbidee: Gefahr/Blutrot plus dezentes Gold
- Gameplay-Signal: offensiver Ring, aber bodenstaendig
- Prompt-Kern: isolated dark fantasy iron ring, cracked gold setting, small red ember gem, strong silhouette, transparent background, mobile RPG item icon, 512x512

### 3. `boots-wayfarer-leather.webp`

- Slot: Schuhe
- Klasse/Thema: universell / Reise
- Rolle: Early-Game Utility-Item
- Silhouette: ein Paar robuste Stiefel, diagonal arrangiert
- Material: dunkles Leder, Metallnieten, abgenutzte Sohlen
- Farbidee: Lederbraun stark abgedunkelt, Stahlkante, schwacher Froststaub
- Gameplay-Signal: Bewegung, Ausdauer, Reise
- Prompt-Kern: isolated worn leather adventurer boots, dark fantasy, metal studs, readable pair silhouette, subtle cold dust, transparent background, mobile RPG item icon, 512x512

## Set B: Klassenlesbarkeit

### 4. `offhand-warlock-soul-lantern.webp`

- Slot: Offhand
- Klasse/Thema: Hexenmeister
- Rolle: Klassenidentitaet fuer Seelenfragmente ohne Verwechslung mit Seelensteinen
- Silhouette: kleine Haengelaterne mit Dornbogen und violetter Flamme
- Material: schwarzes Metall, Dornen, getruebtes Glas, violette Flamme
- Farbidee: Arcane-Violett, kaltes Blau am Rand, dunkles Metall
- Gameplay-Signal: Debuff, Seelenentzug, Kampfressource
- Prompt-Kern: isolated dark fantasy warlock offhand soul lantern, thorned black metal frame, purple flame inside smoky glass, transparent background, mobile RPG item icon, 512x512

### 5. `weapon-staff-mage-sigilwood.webp`

- Slot: Waffe
- Klasse/Thema: Magier
- Rolle: frueher bis mittlerer Stab mit klarer Mana-Sprache
- Silhouette: schlanker Stab mit rundem Runensiegel oben
- Material: dunkles Holz, Silberbänder, blaues Mana-Siegel
- Farbidee: Frost/Essenz-Blau, Silber, wenig Violett
- Gameplay-Signal: Mana, Kontrolle, Zauberfokus
- Prompt-Kern: isolated arcane mage staff, dark wood shaft, silver bindings, circular blue mana sigil top, readable silhouette, transparent background, mobile RPG item icon, 512x512

### 6. `armor-druid-thornmantle.webp`

- Slot: Ruestung
- Klasse/Thema: Druide
- Rolle: Natur/Gift/Heilungsfamilie staerken
- Silhouette: Brustpanzer aus Leder und gebogenen Dornen
- Material: Leder, Rinde, Knochenclips, gruenes Harzlicht
- Farbidee: dunkles Leder, Naturgruen, Knochenweiss
- Gameplay-Signal: Ueberleben, Naturfokus, Dornen
- Prompt-Kern: isolated druid chest armor, dark leather and bark plates, curved thorns, bone clasps, subtle green resin glow, transparent background, mobile RPG item icon, 512x512

## Set C: Loot-Varianz

### 7. `amulet-catacomb-moon.webp`

- Slot: Amulett
- Klasse/Thema: Katakomben / universell
- Rolle: besonderer Dungeon-Drop mit hoher Wiedererkennbarkeit
- Silhouette: Halbmond-Amulett an kurzer Kette
- Material: angelaufenes Silber, Knochenperlen, dunkler Riss im Mond
- Farbidee: Silber, Knochen, kaltes Cyan
- Gameplay-Signal: Katakombenfund, magischer Schutz
- Prompt-Kern: isolated dark fantasy crescent moon amulet, tarnished silver, bone beads, cracked center with cyan glow, transparent background, mobile RPG item icon, 512x512

### 8. `potion-bloodroot-minor.webp`

- Slot: Consumable
- Klasse/Thema: Verbrauchsitem / Heilung
- Rolle: Start einer klaren Consumable-Familie
- Silhouette: kleine runde Flasche mit Wurzelband
- Material: Glas, rotes Elixier, Lederband, getrocknete Wurzel
- Farbidee: Blutrot, Naturgruen als kleiner Sekundaerakzent
- Gameplay-Signal: Heilung, verbrauchbar, nicht Ausruestung
- Prompt-Kern: isolated small healing potion, round glass bottle, red liquid, leather wrap, dried root charm, clear consumable silhouette, transparent background, mobile RPG item icon, 512x512

## Empfohlene Produktionsreihenfolge

1. `potion-bloodroot-minor.webp`
2. `weapon-sword-rune-initiate.webp`
3. `ring-oath-ember.webp`
4. `offhand-warlock-soul-lantern.webp`
5. `amulet-catacomb-moon.webp`

Diese fuenf reichen fuer einen ersten visuellen Test: Consumable, Waffe, Schmuck, Klassen-Offhand und Dungeon-Drop.

## Abnahmekriterien

- Bei `44px` ist Slot und Hauptform erkennbar.
- Objekt hat genug transparenten Rand und beruehrt den Bildrand nicht.
- Kein Design fuehrt eine neue Stilrichtung ein.
- Kein Cosmetic-/Premium-Signal im Power-Item.
- Dateiname, Manifest und Mapping sind nachvollziehbar.
