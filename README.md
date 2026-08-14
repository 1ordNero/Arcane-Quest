# Arcane Tavern & Quest – Android Beta

Diese Beta ist als installierbare Progressive Web App (PWA) umgesetzt und auf Smartphone-Bedienung optimiert.

## Aktueller Entwicklungsstand

### Navigation & Mobile UI
- feste Hauptbereiche: Taverne, Katakomben, Stadt, Held, Schmiede und Arena
- Held als zentraler, runder Hauptbutton hervorgehoben
- Stadt bündelt Händler und Bank
- Händler- und Bankansichten besitzen wieder die vollständige Fußnavigation
- Händler und Bank zeigen zusätzlich einen kompakten Zurück-Button zur Taverne
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
- eigenes Stadt-Menü mit Händler und Bank
- Händler bietet sechs levelskalierte Ausrüstungsgegenstände an
- Item-Level, Stats, Macht, Seltenheit und Vergleich zum angelegten Item werden vor dem Kauf angezeigt
- Sortiment kann regelmäßig neu generiert werden
- Gegenstände können direkt aus dem Rucksack verkauft werden
- Verkaufspreise liegen bewusst bei ungefähr 10–15 % des Gegenstandswerts gemäß GDD-Wirtschaftsprinzip
- Verwerten bleibt dadurch gegenüber dem reinen Verkauf relevant

> Händler-Balancing: Konkrete Kaufpreise, Sortimentsgröße, Seltenheitsverteilung und Aktualisierungszeit sind Beta-Implementierungswerte; das GDD legt diese Zahlen nicht fest.

### Bank v1
- gemäß GDD ab Stufe 10 freigeschaltet
- 100 feste Tresorplätze
- Gegenstände können zwischen Rucksack und Bank verschoben werden
- Einlagern verbraucht keinen Rucksackplatz; Entnehmen benötigt einen freien Rucksackplatz
- Bankgegenstände behalten Item-Level, Seltenheit, Stats und Schmiedestufe
- kompakte Umschaltung zwischen Tresor und Rucksack

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
