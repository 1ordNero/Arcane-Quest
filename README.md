# Arcane Tavern & Quest – Android Beta

Diese Beta ist als installierbare Progressive Web App (PWA) umgesetzt und auf Smartphone-Bedienung optimiert.

## Aktueller Entwicklungsstand

### Navigation & Mobile UI
- fünf feste Hauptbereiche: Taverne, Katakomben, Held, Schmiede und Arena
- Held als zentraler, runder Hauptbutton hervorgehoben
- Inventar und Ausrüstung vollständig im Held-Bereich

### Charakter
- Charaktereditor mit 6 Völkern, 6 Klassen und 4 Hintergründen
- dynamische Heldengeschichte und Charakterzusammenfassung
- Charakterwerte und Ausrüstung beeinflussen Proben und Kämpfe

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
- 11 Ausrüstungsslots gemäß GDD
- feste Item-Level entsprechend dem Charakterlevel beim Fund
- Item-Level, Seltenheit und Schmiedestufe bestimmen gemeinsam die Gegenstandsstärke
- ▲ / = / ▼ zeigen Vergleiche mit aktuell ausgerüsteten Items
- kompakte Ausrüstungsicons mit anklickbaren Itemdetails
- vollständige Itemstats im Inventar und bei angelegter Ausrüstung
- Seltenheitsreihenfolge: Gewöhnlich → Selten → Magisch → Episch → Mythisch → Legendär
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
- asynchrones Arena-Konzept mit drei gleichzeitig angebotenen Gegnern
- Gegnerkategorien: Einfach, Ebenbürtig und Herausforderer
- Gegner zeigen Level, Klasse, Kampfstärke und erwartete Belohnung
- drei Kampfhaltungen gemäß GDD: Aggressiv, Defensiv und Konter
- Aggressiv erhöht Krit um 15 % und reduziert die wirksame Rüstung um 10 %
- Defensiv erhöht die wirksame Rüstung um 20 % und reduziert den verursachten Schaden um 10 %
- Konter erhöht Ausweichen um 15 % und verursacht bei erfolgreichem Ausweichen zusätzlichen Konterschaden
- Arena-Kämpfe laufen automatisch mit sichtbaren HP-Balken und laufendem Kampfprotokoll
- Charakterwerte und Ausrüstung fließen in Kampfstärke, Schaden, Krit, Rüstung und Ausweichen ein
- Herausforderer sind stärker, geben dafür deutlich mehr Ruhm und Ruhmesmünzen
- erste Liga-Progression: Bronze → Silber → Gold → Platin → Legende
- Siege erhöhen Ruhm und Ruhmesmünzen; Niederlagen können etwas Ruhm kosten
- nach jedem Kampf werden neue Gegner generiert

> Arena-Balancing: Konkrete Ruhmesgrenzen und Belohnungshöhen sind Beta-Werte und können nach Tests angepasst werden.

### Technische Bereinigung
- veraltete Kopfgeld-Kampfversionen v1–v3 entfernt
- weitere Patch-Module werden schrittweise konsolidiert

### Weitere vorhandene Beta-Systeme
- XP, Leveling und Gold
- Feature-Gating gemäß GDD
- lokaler Spielstand via localStorage

## Android

**Live-Beta:** https://1ordnero.github.io/Arcane-Quest/

Die Beta läuft aktuell als PWA über GitHub Pages.

## Entwicklungsregel

Nach neuen spielbaren Features oder relevanten Änderungen wird diese README aktualisiert.
