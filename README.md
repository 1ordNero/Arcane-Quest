# Arcane Tavern & Quest – Android Beta

Diese Beta ist als installierbare Progressive Web App (PWA) umgesetzt und auf Smartphone-Bedienung optimiert.

## Aktueller Entwicklungsstand

### Navigation & Mobile UI
- fünf feste Hauptbereiche: Taverne, Katakomben, Held, Schmiede und Arena
- Held als zentraler, runder Hauptbutton hervorgehoben
- Inventar und Ausrüstung vollständig im Held-Bereich
- der zusätzliche Katakomben-Button innerhalb der Taverne wurde entfernt; die Katakomben werden ausschließlich über ihren eigenen Tab geöffnet

### Charakter
- Charaktereditor mit 6 Völkern, 6 Klassen und 4 Hintergründen
- dynamische Heldengeschichte und Charakterzusammenfassung
- Charakterwerte und Ausrüstung beeinflussen Proben und Kämpfe

### Quests & Kampf
- Standard-, Ereignis-, Kopfgeld- und Risikoquests
- Wahrscheinlichkeitsproben mit Charakterwerten
- Feedback nach Entscheidungen
- kurzer automatischer Miniboss „Knochenwache“ für 16 Abenteuerlust mit reduzierter Beute
- die Knochenwache ist standardmäßig eingeklappt und wird wie andere Questkarten erst per Tipp geöffnet
- Miniboss-Kämpfe zeigen sichtbare Lebensbalken und ein laufendes Kampfprotokoll
- „Der Knochenhauer“ ist das teuerste Tavernen-Kopfgeld mit 36 Abenteuerlust
- Knochenhauer besitzt die hochwertigste Belohnungsstufe innerhalb der Tavernen-Quests
- Knochenhauer-Kampf ist vollständig manuell und verwendet Angriff, Verteidigung, Fokus, Verwundbarkeit und Bossphasen
- Premium-Kopfgeldbonus erhöht Gold und XP des Knochenhauers zusätzlich

### Dungeons – Katakomben v2
- regulär gemäß GDD ab Stufe 10 und über Schlüssel; während der Beta direkt testbar
- 10 aufeinanderfolgende Räume
- Raumtypen: Ereignis, normaler Kampf, Elitekampf, Ruheschrein, Schatzkammer und Endboss
- sichtbarer 10-Raum-Fortschritt
- Ereignisentscheidungen zeigen konkrete Erfolgschance, Charakterattribut, Risikoeinschätzung und mögliche Konsequenzen
- Kraft, Geschick und Wissen besitzen konkrete Aktionsbeschreibungen
- aktuelle ungesicherte Dungeon-Beute mit Gold, XP und Items bleibt während des Runs sichtbar
- freiwilliger Ausstieg sichert die bisherige Beute
- Niederlage verliert die ungesicherte Dungeon-Beute
- Risiko-/Belohnungsanzeige ab den tieferen Ebenen
- Raum 6: Schrein der Stille mit 25 % HP-Regeneration
- Raum 9: Schatzkammer mit garantierter Zwischenbelohnung
- Elitegegner „Grabritter“ als Zwischenprüfung
- sämtliche Dungeon-Kämpfe laufen automatisch ab
- Lebensbalken und Kampfprotokoll stehen im Fokus
- Endboss „Hüter der Katakomben“ mit Phasenschild und Enrage
- Dungeon-Loot nutzt das zentrale Item-System; Legendär bleibt von regulären Drops ausgeschlossen

### Loot, Inventar & Ausrüstung
- 11 Ausrüstungsslots gemäß GDD
- Seltenheitsreihenfolge: Gewöhnlich → Selten → Magisch → Episch → Mythisch → Legendär
- Seltenheit wird primär durch farbige Item-Rahmen dargestellt
- Mythisch ist die höchste regulär findbare Stufe
- Legendär bleibt Prestige-Ausrüstung für spätere Reinkarnation/Ahnenschmiede und kann nicht regulär droppen
- Itemwerte beeinflussen Final-Stats, Ereignisproben und Kämpfe

### Ahnen-Schmiede v2
- Freischaltung ab Stufe 5 gemäß GDD
- drei kompakte Bereiche: Aufwerten, Verwerten und Ahnenwerk
- Gegenstände können von +1 bis +10 aufgewertet werden
- Aufwertungskosten steigen exponentiell; Stufen 7–10 sind bewusst sehr teuer
- frühe Stufen kosten primär Gold und Entzauberungs-Staub
- ab Stufe 7 wird zusätzlich Schmiede-Essenz benötigt
- hohe Stufen besitzen deutlich geringere Erfolgschancen
- der Hintergrund „Runenschmied-Lehrling“ gewährt gemäß GDD +10 % Erfolgschance beim Aufwerten
- bei Fehlschlag bleiben Item und Aufwertungsstufe erhalten; eingesetzte Materialien werden verbraucht
- erfolgreiche Aufwertungen erhöhen Item-Macht und schrittweise vorhandene Itemwerte
- nach jeder erfolgreichen Aufwertung erscheint ein Ergebnis-Popup mit der neuen Item-Stufe sowie den konkret gestiegenen Werten (z. B. Macht, Schaden, Rüstung oder Attribute)
- unerwünschte Inventar-Gegenstände können in Entzauberungs-Staub zerlegt werden
- Epische und Mythische Items liefern zusätzlich Schmiede-Essenz beim Verwerten
- Auto-Verwerten-Schalter für gewöhnliche und magische Gegenstände sind gemäß GDD integriert
- Ahnenwerk zeigt das vollständige GDD-Rezept für Legendär: Mythisch +10, 100 Legendäre Essenzen, 50 Seelensteine und 1 Relikt der Urahnen
- Legendär behält gemäß GDD die Kampfwerte von Mythisch und ist als Prestige-Stufe mit freiem Stat-Swapping und +15 % Gold-Fund vorgesehen
- Legendäre Essenzen bleiben für das eigentliche Legendär-Rezept reserviert und werden nicht für normale +1-bis-+10-Aufwertungen verbraucht

> Balancing-Hinweis: Die exakten Gold-, Staub- und Essenzkosten sowie die Erfolgswahrscheinlichkeiten der Stufen +1 bis +10 sind eine Beta-Implementierungsentscheidung. Das GDD schreibt die Aufwertungen +1 bis +10 und den Runenschmied-Bonus vor, definiert aber keine konkrete Kostenkurve.

### Technische Bereinigung
- veraltete Kopfgeld-Kampfversionen v1–v3 entfernt
- weitere Patch-Module werden schrittweise konsolidiert

### Weitere vorhandene Beta-Systeme
- XP, Leveling und Gold
- Arena-Prototyp
- Feature-Gating gemäß GDD
- lokaler Spielstand via localStorage

## Android

**Live-Beta:** https://1ordnero.github.io/Arcane-Quest/

Die Beta läuft aktuell als PWA über GitHub Pages.

## Entwicklungsregel

Nach neuen spielbaren Features oder relevanten Änderungen wird diese README aktualisiert.
