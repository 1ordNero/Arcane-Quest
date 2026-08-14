# Arcane Tavern & Quest – Android Beta

Diese Beta ist als installierbare Progressive Web App (PWA) umgesetzt und auf Smartphone-Bedienung optimiert.

## Aktueller Entwicklungsstand

### UI / UX Design-System v1
- erstes appweites Design-System als Grundlage für die weitere visuelle Konsolidierung
- globaler Header deutlich kompakter: Screenname und Zweck stehen jetzt im Fokus statt des permanent großen App-Titels
- Level, Gold und Abenteuerlust werden als kleine Ressourcen-Chips dargestellt
- einheitlichere Abstände, Radien, Oberflächen und Buttonformen
- weniger Schatten und visuelles „Karten-in-Karten“-Rauschen
- Hauptinhalte erhalten mehr Platz auf kleinen Smartphone-Displays
- bestehende fünfteilige symmetrische Fußnavigation bleibt erhalten
- Farben werden stärker semantisch verwendet: Violett für primäre Aktionen, Gold für Wert/Belohnung, Grün für Erfolg und Rot für Gefahr

### Held-Screen UX v3
- der Held-Screen ist jetzt ein kompaktes Dashboard statt einer langen untereinander gestapelten Seite
- oben bleiben Charaktername, Level, Volk, Klasse sowie HP, Schaden und Rüstung ständig sichtbar
- STR, AGI, INT, Krit, Ausweichen und Block werden in einer kompakten Stat-Zeile dargestellt
- drei interne Bereiche reduzieren Scrollen deutlich: **Ausrüstung · Skills · Inventar**
- Ausrüstung zeigt nur die 11 kompakten Slot-Icons; Itemdetails öffnen sich erst nach Antippen
- Itemdetails zeigen Item-Level, Macht, Bonuswerte, Vergleich und Ausrüsten/Ablegen
- Skills besitzen einen eigenen Bereich mit der aktiven 4-Slot-Rotation
- jeder Skill-Slot kann direkt angetippt und neu belegt werden
- Inventar verwendet eine kompakte Listenansicht mit Seltenheitsrahmen, Item-Level, Macht, Stats und ▲ / = / ▼ Vergleich
- der gewählte Held-Unterbereich bleibt beim Wechsel zu anderen Hauptscreens gespeichert

### Navigation & Mobile UI
- fünf symmetrische Hauptbereiche in der Fußleiste: Taverne, Katakomben, Held, Stadt und Arena
- Held sitzt exakt zentral und bleibt als größerer, runder Hauptbutton hervorgehoben
- die Schmiede wurde aus der Fußleiste entfernt und in die Stadt integriert
- Stadt dient als eigener Hub für Händler, Ahnen-Schmiede, Bank und spätere Verwaltungsfunktionen

### Stadt v2
- kompakte Gebäudeübersicht
- Händler ab Stufe 3
- Ahnen-Schmiede ab Stufe 5
- Bank ab Stufe 10
- gesperrte Gebäude zeigen ihre Freischaltstufe direkt an

### Charakter
- Charaktereditor mit 6 Völkern, 6 Klassen und 4 Hintergründen
- dynamische Heldengeschichte und Charakterzusammenfassung
- Charakterwerte und Ausrüstung beeinflussen Proben und Kämpfe

### Skill-System v1
- basiert auf dem GDD-Prinzip einer vor dem Kampf festgelegten Rotation aus 3–4 Skills
- im Held-Screen stehen vier aktive Skill-Slots in der Reihenfolge 1 → 2 → 3 → 4 zur Verfügung
- jeder Slot kann angetippt und aus den sechs Klassenskills neu belegt werden
- jede der sechs Klassen besitzt für die Beta sechs eigene Fertigkeiten
- GDD-Kernskills sind integriert: Schildwall, Arkaner Meteor, Gestaltwechsel, Pfeilhagel, Seelenentzug und Skelett-Diener
- Klassenressourcen gemäß GDD: Wut, Mana, Naturfokus, Energie, Seelenfragmente und Essenz des Todes
- Skillrotation wird in automatischen Arena- und Katakomben-Kämpfen verwendet
- der Knochenhauer bleibt weiterhin manuell

### Quests & Kampf
- Standard-, Ereignis-, Kopfgeld- und Risikoquests
- kurzer automatischer Miniboss „Knochenwache“
- „Der Knochenhauer“ als teuerstes Premium-Kopfgeld mit vollständig manuellem Kampf

### Dungeons – Katakomben v2
- 10 aufeinanderfolgende Räume mit Ereignissen, Kämpfen, Schrein, Schatzkammer, Elite und Endboss
- Dungeon-Kämpfe laufen automatisch
- sichtbare Lebensbalken und Kampfprotokoll
- ungesicherte Beute und freiwilliger Ausstieg als Risiko-/Belohnungssystem
- Endboss mit Phasenschild und Enrage

### Loot, Inventar & Ausrüstung
- feste Item-Level entsprechend dem Charakterlevel beim Fund
- Item-Level, Seltenheit und Schmiedestufe bestimmen gemeinsam die Gegenstandsstärke
- ▲ / = / ▼ zeigen Vergleiche mit aktuell ausgerüsteten Items
- vollständige Itemstats im Inventar und bei angelegter Ausrüstung
- Legendär kann nicht regulär droppen

### Ahnen-Schmiede v2
- Freischaltung ab Stufe 5 gemäß GDD
- Aufwerten +1 bis +10 mit exponentiell steigenden Kosten
- Stufen +7 bis +10 benötigen zusätzlich Schmiede-Essenz
- Ergebnis-Popup zeigt nach erfolgreicher Aufwertung die konkret verbesserten Stats
- Verwerten in Staub und Essenz
- Ahnenwerk zeigt das spätere Legendär-Rezept

### Arena v2
- drei Gegner: Einfach, Ebenbürtig und Herausforderer
- Aggressiv, Defensiv und Konter als Kampfhaltungen gemäß GDD
- automatische Kämpfe mit HP-Balken und Kampfprotokoll
- Ruhm, Ruhmesmünzen und Liga-Progression Bronze → Silber → Gold → Platin → Legende

### Händler v1
- gemäß GDD ab Stufe 3 freigeschaltet
- Händler bietet sechs levelskalierte Ausrüstungsgegenstände an
- Gegenstände können direkt aus dem Rucksack verkauft werden

### Bank v1
- gemäß GDD ab Stufe 10 freigeschaltet
- 100 feste Tresorplätze
- Gegenstände können zwischen Rucksack und Bank verschoben werden

### Technische Bereinigung
- veraltete Kopfgeld-Kampfversionen v1–v3 entfernt
- `character-profile.js`, `city-nav-fix-v1.js`, `auto-combat-v1.js` und `mobile-nav-v2.js` entfernt
- weitere Patch-Module bleiben vorerst bestehen, solange sie noch aktive Spiellogik liefern

### Weitere vorhandene Beta-Systeme
- XP, Leveling und Gold
- Feature-Gating gemäß GDD
- lokaler Spielstand via localStorage

## Android

**Live-Beta:** https://1ordnero.github.io/Arcane-Quest/

Die Beta läuft aktuell als PWA über GitHub Pages.

## Entwicklungsregel

Nach neuen spielbaren Features oder relevanten Änderungen wird diese README aktualisiert.
