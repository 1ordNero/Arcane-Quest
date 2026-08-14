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

### Arena UX v3
- Arena folgt nun derselben mobilen Designsprache wie Held, Taverne, Katakomben und Stadt
- Liga, Ruhm und Ruhmesmünzen werden in einer kompakten Rangübersicht gebündelt
- Fortschritt bis zur nächsten Liga wird über eine eigene Fortschrittsleiste sichtbar
- Kampfhaltungen besitzen größere Touchflächen und klarere Beschreibungen
- die aktuell gewählte Haltung ist visuell deutlich markiert
- Gegnerkarten zeigen Name, Klasse, Level, Kampfstärke, Schwierigkeit und Belohnung in einer klaren Hierarchie
- die Gegnerwahl kommuniziert deutlicher, dass höheres Risiko mehr Ruhm und Münzen bringt
- automatische Arena-Kämpfe stellen die beiden Lebensbalken stärker in den Mittelpunkt
- Kampfprotokoll und Ergebnisansicht verwenden größere, mobil lesbare Schrift
- auf Smartphones werden Haltung und Gegnerinformationen einspaltig bzw. platzsparend angeordnet

### Stadt UX v3
- Stadt, Händler, Bank und Ahnen-Schmiede verwenden nun dieselbe visuelle Hierarchie
- die Stadt ist als zentraler Hub aufgebaut und zeigt Händler, Schmiede und Bank als große, gut lesbare Gebäudezeilen
- Stadtübersicht zeigt Gold und aktuelle Rucksackbelegung kompakt an
- Unterbereiche verwenden eine einheitliche Breadcrumb-Navigation zurück zur Stadt statt unterschiedlicher Zurück-Buttons
- Händler- und Bank-Tabs besitzen größere mobile Touchflächen und besser lesbare Schrift
- Händleritems zeigen Name, Item-Level, Slot, Macht, Stats, Preis und Aktion in einer einheitlichen Listenstruktur
- Bankitems verwenden dieselbe Itemdarstellung wie der Händler
- auf kleinen Smartphones rutschen Kauf-, Verkaufs-, Einlagerungs- und Entnahmeaktionen unter die Iteminformationen, damit keine schmalen Textspalten entstehen
- Schmiede verwendet dieselbe visuelle Sprache wie Händler und Bank
- Schmiedeitems werden mobil als einspaltige Liste statt kleiner zweispaltiger Karten dargestellt
- Aufwertungskosten, Erfolgschance, Auto-Verwerten und Ahnenwerk wurden für Smartphone-Lesbarkeit vergrößert
- Freischaltstufen und gesperrte Gebäude bleiben klar sichtbar

### Taverne & Quests UX v3
- Taverne ist jetzt konsequent auf Abenteuerlust, aktive Quest und Quest-Auswahl fokussiert
- geschlossene Questkarten zeigen nur die entscheidungsrelevanten Informationen: Name, Typ, Kurzbeschreibung, Dauer, AL-Kosten und Belohnung
- Questdetails werden erst durch Antippen aufgeklappt; der Start erfolgt anschließend direkt innerhalb derselben Karte
- Risiko-/Auftragstypen werden über kompakte Status-Chips unterschieden
- Knochenhauer ist visuell als besonders gefährliches Premium-Kopfgeld hervorgehoben
- Knochenwache ist standardmäßig geschlossen und wird wie die übrigen Aufträge erst durch Antippen geöffnet
- es kann immer nur eine Questkarte gleichzeitig geöffnet sein; Knochenwache und normale Quests schließen sich gegenseitig
- aktive Quests stellen Restzeit und Fortschritt deutlich stärker in den Mittelpunkt
- Ereignisentscheidungen und Wahrscheinlichkeiten wurden für Smartphone-Lesbarkeit vergrößert
- wichtige Questtexte verwenden keine extrem kleinen 6–9-px-Schriften mehr
- Abenteuerlust wird weiterhin erst beim tatsächlichen Start eines Auftrags abgezogen

### Katakomben UX v3
- Katakomben sind während eines Runs stärker als eigener Spielmodus dargestellt
- neue kompakte, während des Runs sichtbare Statusleiste mit Raumfortschritt, aktuellen HP und ungesicherter Beute
- Gold, XP und gefundene Items werden in einer einzigen Run-Zusammenfassung gebündelt
- doppelte bzw. konkurrierende Beute- und Risiko-Boxen werden im neuen Layout ausgeblendet
- Raumfortschritt bleibt sichtbar; auf Smartphones werden die 10 Räume platzsparend in zwei Reihen dargestellt
- der aktuelle Raum bzw. Kampf steht visuell im Mittelpunkt
- Kampfprotokoll, Gegnerinformationen und Ereignisentscheidungen verwenden größere mobile Schrift
- „Beute sichern & raus“ erscheint ab den tieferen Räumen als kompakte Risikoentscheidung am Ende des aktuellen Inhalts
- bei Niederlage bleibt die bestehende Regel erhalten: ungesicherte Dungeon-Beute geht verloren

### Held-Screen UX v3
- der Held-Screen ist jetzt ein kompaktes Dashboard statt einer langen untereinander gestapelten Seite
- oben bleiben Charaktername, Level, Volk, Klasse sowie HP, Schaden und Rüstung ständig sichtbar
- STR, AGI, INT, Krit, Ausweichen und Block werden in einer kompakten Stat-Zeile dargestellt
- drei interne Bereiche reduzieren Scrollen deutlich: **Ausrüstung · Skills · Inventar**
- Ausrüstung zeigt nur die 11 kompakten Slot-Icons; Itemdetails öffnen sich erst nach Antippen
- Skills besitzen einen eigenen Bereich mit der aktiven 4-Slot-Rotation
- Inventar verwendet eine kompakte Listenansicht mit Seltenheitsrahmen, Item-Level, Macht, Stats und ▲ / = / ▼ Vergleich

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
- jede der sechs Klassen besitzt für die Beta sechs eigene Fertigkeiten
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
