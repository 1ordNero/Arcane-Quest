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
- Dungeon, Held, Stadt, Händler und Bank erhalten bereits erste screenspezifische Verdichtungen
- bestehende fünfteilige symmetrische Fußnavigation bleibt erhalten
- Farben werden stärker semantisch verwendet: Violett für primäre Aktionen, Gold für Wert/Belohnung, Grün für Erfolg und Rot für Gefahr

> Das Design-System v1 ist bewusst die gemeinsame Grundlage. Die einzelnen Hauptscreens werden anschließend nacheinander strukturell überarbeitet, statt weitere voneinander unabhängige UI-Patches aufzubauen.

### Navigation & Mobile UI
- fünf symmetrische Hauptbereiche in der Fußleiste: Taverne, Katakomben, Held, Stadt und Arena
- Held sitzt exakt zentral und bleibt als größerer, runder Hauptbutton hervorgehoben
- die Schmiede wurde aus der Fußleiste entfernt und in die Stadt integriert
- Stadt dient als eigener Hub für Händler, Ahnen-Schmiede, Bank und spätere Verwaltungsfunktionen
- Inventar, Ausrüstung und Skills sind vollständig im Held-Bereich gebündelt

### Stadt v2
- kompakte Gebäudeübersicht
- Händler ab Stufe 3
- Ahnen-Schmiede ab Stufe 5
- Bank ab Stufe 10
- gesperrte Gebäude zeigen ihre Freischaltstufe direkt an

### Charakter / Held-Screen v2
- Charaktereditor mit 6 Völkern, 6 Klassen und 4 Hintergründen
- dynamische Heldengeschichte und Charakterzusammenfassung
- kompakter Held-Kopf mit HP, Rüstung und Schaden
- zusätzliche kompakte Übersicht für STR, AGI, INT, Krit, Ausweichen und Block
- Ausrüstung bleibt als kompaktes Icon-Raster mit anklickbaren Itemdetails dargestellt
- Itemdetails zeigen Item-Level, Macht, Bonuswerte und Vergleich zur aktuell ausgerüsteten Ausrüstung
- Skillrotation ist nun sichtbar zwischen Ausrüstung und Inventar integriert
- Inventar bleibt direkt darunter verfügbar und zeigt Item-Level, Macht, Kernstats sowie ▲ / = / ▼ Vergleich

### Skill-System v1
- basiert auf dem GDD-Prinzip einer vor dem Kampf festgelegten Rotation aus 3–4 Skills
- im Held-Screen stehen vier aktive Skill-Slots sichtbar in der Reihenfolge 1 → 2 → 3 → 4 zur Verfügung
- jeder Slot kann angetippt und aus den sechs Klassenskills neu belegt werden
- jede der sechs Klassen besitzt für die Beta sechs eigene Fertigkeiten
- GDD-Kernskills sind integriert: Schildwall, Arkaner Meteor, Gestaltwechsel, Pfeilhagel, Seelenentzug und Skelett-Diener
- Klassenressourcen gemäß GDD: Wut, Mana, Naturfokus, Energie, Seelenfragmente und Essenz des Todes
- Skills verbrauchen Klassenressource; reicht sie nicht aus, wird ein schwacher Basisangriff verwendet und Ressource regeneriert
- Skillrotation wird in automatischen Arena- und Katakomben-Kämpfen verwendet
- offensive, defensive, Heil-, Buff- und Status-Skills werden unterschieden
- Gift, Bluten, Brand und vergleichbare Status-Effekte stapeln nicht endlos; erneute Anwendung erneuert die Dauer
- bestehende automatische Arena-Kämpfe verwenden jetzt die gewählte Skillfolge zusätzlich zu Kampfhaltung und Ausrüstung
- Katakomben-Automatik berücksichtigt die gewählte Skillfolge bei Angriff und Verteidigung
- der Knochenhauer bleibt weiterhin manuell und wird nicht in die automatische Rotation gezwungen

> Skill-Balancing: Das GDD schreibt die 3–4-Skill-Rotation, die Klassenressourcen, die genannten Kernskills sowie die Status-Regel vor. Die vollständigen sechs Skilllisten, konkreten Ressourcenkosten und Schadensmultiplikatoren sind Beta-Implementierungswerte und können nach Tests angepasst werden.

### Quests & Kampf
- Standard-, Ereignis-, Kopfgeld- und Risikoquests
- kurzer automatischer Miniboss „Knochenwache“
- „Der Knochenhauer“ als teuerstes Premium-Kopfgeld mit vollständig manuellem Kampf
- Fokus, Verwundbarkeit, Angriff und Verteidigung beim Knochenhauer

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
- kompakte Ausrüstungsicons mit anklickbaren Itemdetails
- vollständige Itemstats im Inventar und bei angelegter Ausrüstung
- Legendär kann nicht regulär droppen

### Ahnen-Schmiede v2
- Freischaltung ab Stufe 5 gemäß GDD
- Aufwerten +1 bis +10 mit exponentiell steigenden Kosten
- Stufen +7 bis +10 benötigen zusätzlich Schmiede-Essenz
- Runenschmied-Lehrling erhält +10 % Aufwertungschance
- Ergebnis-Popup zeigt nach erfolgreicher Aufwertung die konkret verbesserten Stats
- Verwerten in Staub und Essenz
- Auto-Verwerten für gewöhnliche und magische Gegenstände
- Ahnenwerk zeigt das spätere Legendär-Rezept

### Arena v2
- drei Gegner: Einfach, Ebenbürtig und Herausforderer
- Aggressiv, Defensiv und Konter als Kampfhaltungen gemäß GDD
- automatische Kämpfe mit HP-Balken und Kampfprotokoll
- Ruhm, Ruhmesmünzen und Liga-Progression Bronze → Silber → Gold → Platin → Legende

### Händler v1
- gemäß GDD ab Stufe 3 freigeschaltet
- Händler bietet sechs levelskalierte Ausrüstungsgegenstände an
- Item-Level, Stats, Macht, Seltenheit und Vergleich zum angelegten Item werden vor dem Kauf angezeigt
- Sortiment kann regelmäßig neu generiert werden
- Gegenstände können direkt aus dem Rucksack verkauft werden
- Verkaufspreise liegen bewusst bei ungefähr 10–15 % des Gegenstandswerts gemäß GDD-Wirtschaftsprinzip
- Verwerten bleibt dadurch gegenüber dem reinen Verkauf relevant

### Bank v1
- gemäß GDD ab Stufe 10 freigeschaltet
- 100 feste Tresorplätze
- Gegenstände können zwischen Rucksack und Bank verschoben werden
- Bankgegenstände behalten Item-Level, Seltenheit, Stats und Schmiedestufe

### Technische Bereinigung
- veraltete Kopfgeld-Kampfversionen v1–v3 entfernt
- `character-profile.js`, `city-nav-fix-v1.js`, `auto-combat-v1.js` und die überholte `mobile-nav-v2.js` entfernt
- weitere Patch-Module bleiben vorerst bestehen, solange sie noch aktive Spiellogik liefern; die nächste Bereinigung sollte erst nach einem gezielten Konsolidierungstest erfolgen

### Weitere vorhandene Beta-Systeme
- XP, Leveling und Gold
- Feature-Gating gemäß GDD
- lokaler Spielstand via localStorage

## Android

**Live-Beta:** https://1ordnero.github.io/Arcane-Quest/

Die Beta läuft aktuell als PWA über GitHub Pages.

## Entwicklungsregel

Nach neuen spielbaren Features oder relevanten Änderungen wird diese README aktualisiert.
