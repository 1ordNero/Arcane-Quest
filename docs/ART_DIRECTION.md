# Art Direction und Asset-Regeln

Ziel fuer v1.0 ist Release-Hardening, keine grosse neue Grafikoffensive. Neue Assets sollen die vorhandene Struktur stabilisieren, Luecken gezielt schliessen und keine Stilwechsel einfuehren.

## MVP Art-Direction-Basis

Arcane Quest ist ein Web/PWA-first Dark-Fantasy-RPG: kompakte Mobile-UI, klare Lesbarkeit, duestere Stimmung und magische Akzente. Android wird spaeter vorbereitet, deshalb muessen Touch-Flaechen, Asset-Groessen und WebP-Ladeverhalten von Anfang an mobil robust sein. Kosmetische Monetarisierung darf sichtbar hochwertig wirken, aber nie Gameplay-Vorteile, Pay-to-win-Signale oder visuelle Verwirrung in Kampf/Progression erzeugen.

### Visueller Stil

- Dunkle, arkan-mittelalterliche Grundstimmung: Obsidian, altes Metall, Leder, Pergament, Knochen, Runenlicht.
- Magie ist die Hauptlichtquelle: Kantenlicht, Glyphen, Splitter, Siegel und kurze Glow-Akzente statt heller Flaechen.
- Silhouette vor Detail: Jedes Icon, Item und Portrait muss in kleinen Mobile-Groessen sofort erkennbar bleiben.
- Wenige wiederkehrende Formen: Runenkreise, Dornen, Splitter, Ketten, Monde, Augen, Siegel und Risse.
- Kein generisches Fantasy-Mischen: Neue Assets muessen zu Klasse, Fraktion, Element, Rarity oder UI-Funktion gehoeren.
- Bestehende Asset-Familien erweitern statt neue Stilrichtungen starten.

### Farbpalette

| Zweck | Farbe | Einsatz |
| --- | --- | --- |
| Grundhintergrund | `#0c0812`, `#130f1a`, `#17111f` | App-Flachen, Panels, Modal-Hintergruende |
| Erhoehtes Panel | `#1b1425`, `#21172d` | Karten, Sheets, Hero-/Forge-Flaechen |
| Primaerer Arcane-Akzent | `#8d5cda`, `#a875ff`, `#c381ff` | Magie, aktive States, Shrine, Fokus |
| Gold / Belohnung | `#f4c15d`, `#d9b95d` | Gold, Rewards, Rarity, positive Progression |
| Blut / Gefahr | `#d8755c`, `#8e2f3d` | Krieger, Schaden, Warnungen, Blutklinge |
| Natur / Gift | `#65c987`, `#7aa35a` | Druide, Heilung, Gift, Dornen |
| Frost / Essenz | `#72c9cf`, `#5e9cff` | Mana, Essenz, kalte Magie |
| Text primaer | `#f4edf8` | Wichtige Labels |
| Text sekundar | `#b8a9c8` | Meta, Beschreibung, Kostenhinweise |

Regel: Kein Screen soll als einfarbige Purple-Flache wirken. Arcane-Violett ist Akzent, nicht Vollflaeche. Gold bleibt Belohnung/Prestige vorbehalten.

### UI-Komponenten-Stil

- Mobile zuerst: interaktive Ziele mindestens `44x44px`, primaere Aktionen eher `48-52px` hoch.
- Panels dunkel, flach und kompakt; keine grossen Marketing-Hero-Layouts im eigentlichen Spiel.
- Karten nur fuer konkrete wiederholte Objekte: Quest, Item, Skill, Node, Gegner, Reward.
- Buttons: klare Hierarchie durch Kontrast, Border und Glow; primaere Buttons arcane-violett, Belohnung/Prestige gold, Gefahr rot.
- Icons in Buttons immer links oder zentral, nie als rein dekorativer Hintergrund.
- Rarity, Status und Kosten muessen auch ohne Farbe erkennbar sein: Rahmen, Icon, Label oder Form ergaenzen.
- Kosmetik-UI darf hochwertiger wirken, bleibt aber strikt getrennt von Power-/Progression-UI.

### Icon-Richtung

- Skill-Icons: action-first. Der Spieler muss Angriff, Schild, Heilung, Fluch, Bewegung oder Buff erkennen.
- UI-Icons: symbol-first. Weniger Textur, staerkere Silhouette, klare Kante.
- Resource-Icons: material-first. Gold, Seelensteine, Essenz und Staub muessen als Objekte unterscheidbar sein.
- Kleine Groessen testen: `24px`, `32px`, `44px`, `64px`.
- Kein Icon nur ueber Farbe unterscheiden; Form und Innenmotiv muessen variieren.
- Neue Icons immer als Set denken: z.B. alle Rarity Frames, alle Consumables, alle Impact-Arten.

### Charakter-, Gegner- und Item-Sprache

- Heroes: Brustbild/Kopf-Schulter, 3/4-Ansicht, ruhige Pose, klares Klassenlicht.
- Gegner: staerkere Silhouette, mehr Asymmetrie, Fraktionsmerkmal sichtbar; keine zufaellige Monster-Collage.
- Items: isoliertes Objekt mit Alpha, leicht diagonale Praesentation, zentrale Silhouette, Material klar lesbar.
- Waffen zeigen Richtung und Gewicht; Ruestungsteile zeigen Slot-Funktion; Schmuck zeigt magischen Kern.
- Consumables brauchen eigene Formfamilie: Flasche, Siegel, Band/Farbe und Fluessigkeit definieren Wirkung.
- Kosmetische Assets duerfen ornamental sein, duerfen aber nie wie staerkere Ausruestung oder Pflichtkauf wirken.

### Konsistente Asset-Pipeline

- Jede neue Grafik braucht vor Produktion: Kategorie, Zweck, Zielscreen, Dateiname, Zielgroesse und Mapping-Datei.
- Erst ein Mini-Set bauen, dann skalieren: z.B. 3 Rarity Frames statt ein einzelner Legendary-Rahmen.
- Keine finalen Assets ohne Repo-Pfad und Code-Anbindung planen.
- Keine generierten Einzelbilder direkt ins Spiel werfen; zuerst gegen bestehende Assets, Mobile-Groesse und UI-Kontrast pruefen.
- Source-Prompts, Referenzen und Varianten sollen nachvollziehbar bleiben, auch wenn nur das finale WebP committed wird.

## Bestehende Asset-Struktur

Die aktuelle Pipeline nutzt WebP-Assets direkt aus dem Repo. Diese Ordner sind fuer neue Assets massgeblich:

| Pfad | Zweck | Aktueller Einsatz |
| --- | --- | --- |
| `assets/icons/skills/` | Klassen-Skill-Icons | Wird ueber `skill-icons-v1.js` pro Klasse und Skill-ID gemappt. |
| `assets/icons/ui/` | Ressourcen, Status, UI-Aktionen, Slots, Orte, Relikte | Wird von `design-system-v1.js`, `ui-semantic-icons-v2.js`, Forge, Shrine und Dungeon-UIs genutzt. |
| `assets/items/` | Ausruestung mit Alpha | Wird ueber `item-assets-v2.js` und `assets/items/manifest.json` gepflegt. |
| `assets/characters/` | Hero-Portraits | Wird ueber `character-portraits-v1.js` als `human-{class}-{gender}.webp` referenziert. |
| `assets/icons/catacombs/` | Katakombenraeume, Pfade und Gegner-/Raum-Icons | Wird von Catacomb-Systemen fuer Raumdarstellung genutzt. |
| `assets/icons/game-v2/` | Aeltere/alternative Spiel-Icons fuer Klassen, Quests, Stadt, Dungeon | Nicht als primaerer Zielordner fuer neue UI-Icons verwenden, solange `assets/icons/ui/` passt. |

Wichtig: Neue Asset-Familien sollen vorhandene Pfade erweitern. Ein neuer Top-Level-Ordner ist nur sinnvoll, wenn eine echte neue Kategorie entsteht, z.B. `assets/vfx/` fuer Impact- oder Partikel-Assets.

## Regeln fuer neue Assets

### Format

- Primaerformat: `WebP`.
- Transparente Gameplay-Assets brauchen echte Alpha-Transparenz, keinen gemalten dunklen Quadrat-Hintergrund.
- SVG nur fuer einfache, systemische UI-Symbole verwenden. Die bestehende Spielgrafik-Pipeline ist WebP-orientiert.
- Keine neuen Emoji-Fallbacks als finaler Art-Ersatz einfuehren.

### Groessenempfehlungen

| Asset-Typ | Zielgroesse | Hinweise |
| --- | --- | --- |
| Skill-Icons | `256x256` | Muss bei `24px`, `32px` und `44px` lesbar bleiben. |
| UI-Icons / Ressourcen | `256x256` | Klare Silhouette, wenig Binnenrauschen, hohe Kontrastkante. |
| Item-Art | `512x512` | Bestehende Items sind `512x512` mit Alpha; diesen Standard beibehalten. |
| Character-Portraits | `512x512` | Brustbild oder Kopf-Schulter, starker Fokus auf Gesicht/Silhouette. |
| Enemy-Portraits | `512x512` | Wie Character-Portraits, aber mit klarer Gegnerfraktion und Bedrohungsform. |
| Catacomb-/Room-Icons | `512x512` | Mehr Raumstimmung erlaubt, aber zentrale Form muss bei Mobile-Karten lesbar bleiben. |
| VFX/Impact | `512x512` | Alpha, kurze Lebensdauer, klarer Einschlagspunkt. Optional spaeter Sprite-Sequenzen. |
| Store-/Banner-Art | `1920x1080` oder `1024x512` | Nicht vor v1.0 priorisieren. |

### Naming-Konventionen

Bestehende Assets verwenden ueberwiegend kebab-case bei Items und teilweise underscore-prefixes bei Icons. Neue Assets sollen den jeweiligen Ordnerstandard fortsetzen:

- Items: `slot-class-or-theme-variant.webp`
  - Beispiel: `potion-health-minor.webp`
  - Beispiel: `weapon-staff-necrotic.webp`
- UI-Icons: `category_subject_variant.webp`
  - Beispiel: `resource_soulstone.webp`
  - Beispiel: `rarity_legendary_frame.webp`
- Skills: `skill_class_skill_id.webp`
  - Beispiel: `skill_warlock_soul_drain.webp`
  - Beispiel: `skill_mage_rune_shield.webp`
- Characters: `human-{class}-{gender}.webp` fuer Heroes beibehalten.
  - Beispiel: `human-mage-female.webp`
- Enemy-Portraits: `enemy-{faction-or-type}-{name-or-role}.webp`
  - Beispiel: `enemy-undead-bone-witch.webp`
- VFX/Impact, falls neuer Ordner angelegt wird: `impact_{element}_{action}.webp`
  - Beispiel: `impact_arcane_burst.webp`
  - Beispiel: `impact_shadow_hit.webp`

Terminologie: `Seelensteine` ist die Prestige-Waehrung. `Seelenfragmente` ist die Kampfressource des Hexenmeisters. Ein neues Prestige-Resource-Icon sollte deshalb `resource_soulstone.webp` heissen, nicht `resource_soul_shard.webp`.

### Alpha und Transparenz

- Items, Skill-Icons, Ressourcen und VFX muessen als isolierte Motive funktionieren.
- Item-Art: transparente Flaeche um das Objekt beibehalten; Objekt nicht bis an den Rand ziehen.
- VFX/Impact: weiche Alpha-Raender, keine rechteckigen Artefakte.
- UI-Icons: Alpha erlaubt, aber fuer kleine Groessen klare Aussenkante oder dunkler Kontrastsaum.
- Portraits duerfen feste Hintergruende haben, sollten aber keine stark abweichenden UI-Rahmen ins Bild selbst einbacken.

### Mapping-Dateien

Nach dem Hinzufuegen neuer Assets muessen je nach Kategorie diese Dateien geprueft oder aktualisiert werden:

| Kategorie | Zu pruefende Dateien |
| --- | --- |
| Skills | `skill-icons-v1.js`, `skill-system-v1.js`, `skill-progression-v1.js` |
| Items | `item-assets-v2.js`, `assets/items/manifest.json`, `item-system.js`, `item-ui-v4.js` |
| Ressourcen / UI | `design-system-v1.js`, `ui-semantic-icons-v2.js`, `ui-icon-completion-v1.js`, relevante Screen-Datei |
| Characters | `character-portraits-v1.js`, `editor-race-art-v2.js` falls Editor-Ansicht betroffen ist |
| Catacombs | `catacomb-icons-v1.js`, `catacomb-paths-v1.js`, `catacomb-presentation-v1.js`, `dungeon-v7.js` falls Combat betroffen ist |
| VFX/Impact | Noch keine stabile zentrale Mapping-Datei vorhanden; vor Implementierung kleine Runtime-Map anlegen statt inline streuen. |

## Priorisierte Asset-Luecken

1. Enemy-Portraits
   - Aktuell gibt es Hero-Portraits und Catacomb-Icons, aber keine dedizierte Gegner-Portrait-Familie.
   - Wichtig fuer Dungeon, Arena, Boss-Feedback und spaetere Store-/Promo-Bilder.

2. VFX/Impact-Assets
   - Skills besitzen Icons, aber noch keine konsistente Treffer-/Zauberwirkung.
   - Zuerst statische Impact-WebPs mit Alpha, spaeter optional Sprite-Sequenzen.

3. Consumables
   - Ausruestung ist gut abgedeckt; Traenke und verbrauchbare Items fehlen als eigene klare Familie.
   - Wichtig fuer Loot, Merchant und Inventarlesbarkeit.

4. Currency/Resource Icons
   - Gold, XP, HP, Energie, Schmiedestaub, Essenz und Seelensteine sind teilweise vorhanden.
   - Vor neuen Ressourcen erst Terminologie klaeren und bestehende UI-Nutzung pruefen.

5. Rarity Frames
   - Rarity sollte nicht nur ueber Text oder Farbe laufen.
   - Frames muessen als UI-Layer funktionieren und duerfen Item-Silhouetten nicht verdecken.

## Konkrete naechste 10 Assets

Diese Liste ist bewusst klein und v1.0-kompatibel. Sie schliesst Luecken, ohne neue Klassen, Rassen oder Shop-Systeme zu erzwingen.

1. `assets/icons/ui/resource_soulstone.webp`
   - Prestige-Waehrung `Seelensteine`; konsistent mit GDD und Shrine-UI.

2. `assets/icons/ui/resource_legendary_essence.webp`
   - Fuer spaetere Forge-/Ahnenwerk-Kosten, falls `legendaryEssence` sichtbar als eigene Ressource gebraucht wird.

3. `assets/icons/ui/rarity_common_frame.webp`
   - Neutraler Rahmen fuer Item-Baseline und visuelle Tests.

4. `assets/icons/ui/rarity_rare_frame.webp`
   - Erste magische Rarity-Stufe mit Cyan/Blau-Akzent.

5. `assets/icons/ui/rarity_legendary_frame.webp`
   - Gold/Rot-Ahnenwerk-Frame fuer High-End-Feedback.

6. `assets/items/potion-health-minor.webp`
   - Kleiner Heiltrank als Consumable-Baseline.

7. `assets/items/potion-mana-minor.webp`
   - Mana-/Ressourcen-Trank als zweite Consumable-Silhouette.

8. `assets/vfx/impact_arcane_burst.webp`
   - Arkaner Einschlag fuer Magier, Shrine und allgemeine Magic-Feedbacks.

9. `assets/vfx/impact_shadow_hit.webp`
   - Schatten-/Hexenmeister-Treffer fuer Debuffs und Dungeon-Gegner.

10. `assets/characters/enemy-undead-bone-witch.webp`
   - Erstes dediziertes Enemy-Portrait; geeignet fuer Katakomben, Boss-/Elite-Feedback und Stilanker.

Hinweis zu `assets/vfx/`: Der Ordner existiert aktuell nicht. Wenn VFX als eigene Kategorie umgesetzt wird, sollte gleichzeitig eine kleine zentrale Mapping-Datei entstehen, damit Impact-Assets nicht zufaellig in mehreren Screens hart verdrahtet werden.

## Nicht vor v1.0

- Grosse neue Character-Rassen.
- Komplette neue Klassen-Art.
- Cosmetics-Shop-Grafiken.
- Store-Banner und Marketing-Key-Art.
- Unnoetige Stilwechsel bei Farbpalette, Icon-Rahmen, Portrait-Licht oder Item-Perspektive.
- Massenhafte Einzelbild-Generierung ohne Mapping, Manifest und Mobile-Lesbarkeitscheck.

## Produktionscheck fuer jedes neue Asset

Vor Merge oder Release-Aufnahme:

1. Dateiname folgt dem passenden Ordnerstandard.
2. Asset ist WebP und in der empfohlenen Zielgroesse.
3. Mobile-Lesbarkeit bei `24px`, `32px`, `44px` oder der realen UI-Groesse geprueft.
4. Alpha-Kanten sind sauber, keine rechteckigen Hintergrundreste.
5. Mapping-Dateien sind aktualisiert.
6. Asset wird im relevanten Screen tatsaechlich angezeigt.
7. Keine neue Stilfamilie, wenn eine bestehende erweitert werden kann.
