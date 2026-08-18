# Arcane Quest – Release Checklist v0.15.4

Diese Checkliste ist für den manuellen Geräte-/Regressionstest des Release Candidates vorgesehen. Jeder Punkt soll mindestens auf einem aktuellen Android-Smartphone im Browser und als installierte PWA geprüft werden.

## 1. Installation und Boot

- Frischer Aufruf ohne vorhandenen Spielstand öffnet die Charaktererstellung.
- PWA lässt sich installieren und startet im Standalone-Modus.
- Boot-Loader verschwindet zuverlässig und blockiert keine Eingabe.
- Nach Reload wird der letzte gültige Spielstand geladen.
- Normale Release-Ansicht zeigt keinen Entwickler-`β`-Button.
- Aufruf mit `?beta=1` zeigt die Entwicklerwerkzeuge.

## 2. Onboarding

- Während der Charaktererstellung erscheint noch kein Tutorial-Overlay.
- Nach Abschluss der Charaktererstellung startet das Taverne-Onboarding.
- Taverne erklärt Willkommen, Abenteuerlust und Questwahl in kurzen Coachmarks.
- Fortschritt eines teilweise abgeschlossenen Tutorials bleibt nach Reload erhalten.
- `Überspringen` beendet nur das aktuelle Kapitel; spätere System-Tutorials bleiben aktiv.
- Heldentab erklärt Ausrüstung, Itemvergleich/Fortschritt und kampfgebundene Klassenressource.
- Katakomben-Tutorial erscheint erst beim ersten tatsächlichen Betreten der Katakomben.
- Händler-Tutorial erscheint nicht vor Stufe 3 und startet beim ersten Betreten ab Stufe 3.
- Ahnenschmiede-Tutorial erscheint nicht vor Stufe 5 und startet beim ersten Betreten ab Stufe 5.
- Arena-Tutorial erscheint nicht vor Stufe 5 und startet beim ersten Betreten ab Stufe 5.
- Reinkarnations-/Vermächtnis-Tutorial erscheint erst auf Stufe 50.
- Bereits abgeschlossene Kapitel erscheinen nach Reinkarnation nicht erneut.
- `Arcane.onboarding.status()` liefert plausiblen Kapitelstatus; `reset(id)` und `open(id)` funktionieren für QA.

## 3. Charakter und Progression

- Alle vier freigegebenen Klassen lassen sich als Mensch erstellen.
- Beide Geschlechter/Portraitvarianten der freigegebenen Klassen laden korrekt.
- Alle vier Hintergründe lassen sich auswählen und ihre Boni wirken.
- XP steigt korrekt; Level-Cap ist 50.
- Skill-Meilensteine erscheinen und können gewählt werden.
- Rotation lässt sich verändern und bleibt nach Reload erhalten.

## 4. Taverne

- Standardquest starten, warten/abschließen und Reward abholen.
- Ereignisquest abschließen.
- Risikoquest abschließen.
- Knochenwache abschließen.
- Knochenhauer gewinnen und verlieren.
- Abenteuerlust-Kosten stimmen und Tavernen-Stammgast reduziert sie.
- Reward-Screen zeigt korrekte Itemgrafik, Gold und XP.

## 5. Katakomben

- Run mit Schlüssel starten.
- Ereignis-, Kampf-, Schrein-, Schatz- und Eliteraum prüfen.
- Skillrotation wird im Kampf verwendet.
- Während eines aktiven Kampfes ist Verlassen blockiert.
- Freiwilliger Rückzug außerhalb des Kampfes funktioniert.
- Boss bis zum Abschluss spielen.
- Reload während eines Runs führt zu einem sicheren fortsetzbaren Zustand.

## 6. Arena

- Gegnerwahl mit allen drei Schwierigkeitsstufen.
- Aggressiv, Defensiv und Konter testen.
- Bollwerk, Schatten, Arkan und Blutklinge mindestens einmal bekämpfen.
- Skillrotation wird ausgeführt und Build-Konter bleibt wirksam.
- Sieg-/Niederlage-Dialog zeigt korrekte Liga, Ruhm und Ruhmesmünzen.
- Kampfanalyse zeigt verursachten/erlittenen Schaden, Krits, Ausweichen und Konter plausibel.
- Footer/Entwickler-UI überlagert den Ergebnisdialog nicht.

## 7. Held, Inventar, Bank und Händler

- Gegenstand ausrüsten und ersetzen.
- Alle neun Equipment-Slots prüfen.
- Itemvergleich zeigt plausible Änderungen.
- Bank-Ein-/Auslagerung testen.
- Händlerkauf und -verkauf testen.
- Inventargrenzen und volle Inventare prüfen.
- Save/Reload erhält Items ohne Duplikate.

## 8. Ahnenschmiede

- Aufwertung erfolgreich und fehlgeschlagen testen.
- Erfolgspopup zeigt korrektes Item, Stufenwechsel und Kosten.
- Verwerten einzeln und gesammelt testen.
- Veredelung: Item wählen, Affix sperren, neu würfeln, Qualität verbessern.
- Ahnenwerk mit ungeeignetem und geeignetem Item testen.
- Lange Itemnamen dürfen keine Karten überlaufen lassen.

## 9. Reinkarnation und Vermächtnis

- Über Entwicklerwerkzeuge auf Stufe 50 setzen und ausreichend Seelen/Materialien geben.
- Reinkarnation während aktiver Quest/Katakombe/Arena muss blockiert sein.
- Doppelte Bestätigung erscheint.
- Nach Reinkarnation: Level 1, normaler Fortschritt zurückgesetzt.
- Identität, Seelensteine, Vermächtnis, legendäre Gegenstände und Ruhmesmünzen bleiben erhalten.
- Sämtliche Katakombenschlüssel sind nach Reinkarnation gelöscht.
- Vermächtnisknoten müssen je Zweig sequenziell gekauft werden.
- Macht-/Überleben-/Arkana-Boni sichtbar und funktional prüfen.
- `Vor Reinkarnation` in Entwicklerwerkzeugen stellt den Snapshot wieder her.

## 10. Save und Recovery

- Save exportieren und wieder importieren.
- Automatisches Backup wiederherstellen.
- Reload direkt nach Schmieden, Questreward, Arenasieg und Vermächtniskauf.
- PWA vollständig beenden und neu starten.
- Keine Ressource oder Ausrüstung darf verdoppelt oder verloren gehen.

## 11. Mobile UI

Mindestens bei ca. 360 px, 390–430 px und einem größeren Smartphone prüfen:
- Header bleibt kompakt.
- Footer verdeckt keine primären Buttons oder Dialoge.
- Keine horizontale Seite scrollt unbeabsichtigt.
- Lange Item-/Gegnernamen umbrechen sauber.
- Modals und Tutorial-Coachmarks bleiben innerhalb des Viewports bedienbar.
- Hervorgehobene Tutorial-Ziele sind deutlich sichtbar und nach dem Tutorial wieder vollständig interaktiv.
- Safe-Areas am oberen/unteren Bildschirmrand funktionieren.

## Freigabekriterium

Ein Release-Blocker ist jeder reproduzierbare Fehler, der Spielstandverlust, Hard-Lock, unbeabsichtigte Progressionsduplikation, Umgehung einer Niederlage, nicht bedienbare Kernnavigation oder abgeschnittene Primäraktionen verursacht. Erst nach Abschluss dieser Liste ohne Release-Blocker wird der Release Candidate als öffentlicher Release-Build freigegeben.
