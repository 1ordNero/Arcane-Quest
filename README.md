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
- Wahrscheinlichkeitsproben mit Charakterwerten
- Feedback nach Entscheidungen
- Knochenhauer-Kampf mit Angriff/Verteidigung, Fokus, Verwundbarkeit, Bossphasen und Kampfwertung
- kostenloser Basisangriff verhindert festgefahrene Kämpfe

### Dungeons – Katakomben v2
- regulär gemäß GDD ab Stufe 10 und über Schlüssel; während der Beta direkt testbar
- 10 aufeinanderfolgende Räume statt der ursprünglichen fünf
- Raumtypen: Ereignis, normaler Kampf, Elitekampf, Ruheschrein, Schatzkammer und Endboss
- sichtbarer 10-Raum-Fortschritt
- Ereignisentscheidungen zeigen konkrete Erfolgschance, Charakterattribut, Risikoeinschätzung und mögliche Konsequenzen
- aktuelle ungesicherte Dungeon-Beute mit Gold, XP und Items bleibt während des Runs sichtbar
- freiwilliger Ausstieg sichert die bisherige Beute
- Niederlage verliert die ungesicherte Dungeon-Beute
- Risiko-/Belohnungsanzeige ab den tieferen Ebenen; zunehmende Tiefe signalisiert steigenden Loot-Wert
- Ruheschrein in Raum 6 stellt 25 % der maximalen HP wieder her
- Schatzkammer in Raum 9 bietet eine garantierte Zwischenbelohnung vor dem Boss
- Elitegegner „Grabritter“ als Zwischenprüfung
- Endboss „Hüter der Katakomben“ mit Phasenschild
- Boss-Schaden trifft zunächst das Phasenschild, bevor Lebenspunkte reduziert werden
- Boss-Enrage ab Runde 7 erhöht den verursachten Schaden
- Boss besitzt mehrere angekündigte Angriffe mit unterschiedlichen sinnvollen Verteidigungen
- Dungeon-Loot nutzt das zentrale Item-System; Legendär bleibt von regulären Drops ausgeschlossen

### Loot, Inventar & Ausrüstung
- 11 Ausrüstungsslots gemäß GDD
- Seltenheitsreihenfolge: Gewöhnlich → Selten → Magisch → Episch → Mythisch → Legendär
- Seltenheit wird primär durch farbige Item-Rahmen dargestellt
- Mythisch ist die höchste regulär findbare Stufe
- Legendär bleibt Prestige-Ausrüstung für spätere Reinkarnation/Ahnenschmiede und kann nicht regulär droppen
- Itemwerte beeinflussen Final-Stats, Ereignisproben und Kämpfe

### Technische Bereinigung
- veraltete Kopfgeld-Kampfversionen v1–v3 entfernt
- weitere Patch-Module werden schrittweise konsolidiert

### Weitere vorhandene Beta-Systeme
- XP, Leveling und Gold
- Ahnen-Schmiede-Prototyp
- Arena-Prototyp
- Feature-Gating gemäß GDD
- lokaler Spielstand via localStorage

## Android

**Live-Beta:** https://1ordnero.github.io/Arcane-Quest/

Die Beta läuft aktuell als PWA über GitHub Pages.

## Entwicklungsregel

Nach neuen spielbaren Features oder relevanten Änderungen wird diese README aktualisiert.
