# Arcane Tavern & Quest

Mobile-first Dark-Arcane-Fantasy-RPG als installierbare Progressive Web App. Die visuelle Richtung verbindet düstere Diablo-artige Fantasy mit klarer, stilisierter Smartphone-Lesbarkeit.

**Aktueller Release Candidate:** v0.15.20  
**Live-Build:** https://1ordnero.github.io/Arcane-Quest/

> Diese README beschreibt den tatsächlich freigegebenen Stand von `main` und hat bei Widersprüchen Vorrang vor älteren GDD-Vorgaben.

## Release-Status

v0.15.20 ist der aktuelle Release Candidate für den definierten Launch-Scope. Der Build befindet sich im Release-Hardening: keine neuen Kernsysteme bis zur v1.0-Freigabe, stattdessen Runtime-Konsolidierung, Regressionstests, Save/PWA-Stabilität, mobile QA und Balance. Der Kernloop von Charaktererstellung über Quests, Katakomben, Arena, Item-Progression und Schmiede bis Stufe 50, Reinkarnation und Vermächtnis ist spielbar.

Aktueller Launch-Scope der Charaktererstellung:
- Volk: **Mensch**
- Klassen: **Krieger, Magier, Hexenmeister, Druide**
- Hintergründe: **Tavernen-Stammgast, Gefallener Adeliger, Runenschmied-Lehrling, Schatten-Ausreißer**

Langfristiges Ziel bleiben alle sechs Klassen und sechs Völker. Waldläufer, Totenbeschwörer und weitere Völker werden erst nach vollständigen Art-, Balance- und QA-Pässen für die Charaktererstellung freigegeben.

Das reguläre Maximallevel bleibt **Stufe 50**.

## Kernloop

1. Charakter erstellen und progressive Tutorials absolvieren.
2. In der Taverne Quests, Ereignisse, Risikoaufträge und besondere Kämpfe spielen.
3. Ausrüstung und vorbereitete Skillrotation im Heldentab optimieren.
4. Katakomben als riskante 10-Raum-Expedition absolvieren.
5. In der Arena gegen skalierende Gegner und Build-Archetypen kämpfen.
6. Händler und Ahnenschmiede für Wirtschaft und Item-Progression nutzen.
7. Stufe 50 erreichen und am Ahnenschrein reinkarnieren.
8. Seelensteine in dauerhaftes Vermächtnis investieren und einen neuen Lebenszyklus starten.

## Onboarding

Das Onboarding ist kontextuell, persistent und an echte Freischaltungen gekoppelt. Gesperrte Systeme werden nicht vorab erklärt. Jeder relevante Bereich startet sein eigenes Mini-Tutorial erst beim ersten tatsächlichen Betreten:
- Taverne sofort nach frischer Charaktererstellung
- Held beim ersten Öffnen
- Katakomben beim ersten Betreten
- Händler ab Stufe 3
- Ahnenschmiede und Arena ab Stufe 5
- Reinkarnation und Vermächtnis erst auf Stufe 50

Jedes Kapitel speichert seinen Fortschritt separat, kann übersprungen werden und wird nach Reload oder PWA-Neustart fortgesetzt. Reinkarnation startet das Anfänger-Onboarding nicht erneut. Im Beta-Menü kann das gesamte Tutorial für QA neu gestartet werden.

Coachmarks verwenden ein Spotlight auf dem erklärten UI-Bereich. Die Erklärungskarte positioniert sich bevorzugt außerhalb des Spotlights. Auf kleinen Displays besitzt der Textbereich einen eigenen vertikalen Scrollbereich; Fortschritt und Aktionsbuttons bleiben immer erreichbar und innerhalb des Viewports.

## Held, Ausrüstung und Skills

Der Held besitzt neun aktive Ausrüstungsslots: **Kopf, Schulter, Brust, Beine, Stiefel, Amulett, Ring, Haupthand und Zweithand**. Ring 2, Gürtel und Handschuhe gehören nicht zum aktuellen kanonischen Equipment-Modell.

Der Heldentab besitzt zwei Hauptansichten: **Ausrüstung/Build** und **Inventar**. Der Inventar-Button bleibt immer erreichbar. Belegte Ausrüstungsslots und Inventargegenstände öffnen beim Antippen den gemeinsamen Item-Detaildialog; leere Slots öffnen die passende Inventarfilterung. Leere Equipment-Slots bleiben neutral dunkel und treten visuell hinter belegte Gegenstände zurück.

Die vorbereitete Skillrotation wird genau einmal direkt unter Charakter und Ausrüstung angezeigt. Bis zu vier Skills werden in Arena, Katakomben und unterstützten Questkämpfen tatsächlich in dieser Reihenfolge verwendet. Die ehemalige separate Skills-Hauptansicht und doppelte Rotationsdarstellungen sind nicht Teil des aktuellen UI.

Die Kernwerte **Leben, Schaden und Rüstung** verwenden eigene kanonische UI-Icons. Ein Antippen öffnet eine kurze Erklärung mit aktuellem Wert und Gameplay-Bedeutung. STR, AGI, INT, Krit, Ausweichen und Block ergänzen diese Basiswerte.

## Kampfressourcen

Jede Klasse besitzt eine eigene **kampfgebundene Klassenressource**:
- Krieger: Wut
- Magier: Mana
- Druide: Naturfokus
- Waldläufer: Energie
- Hexenmeister: Seelenfragmente
- Totenbeschwörer: Essenz des Todes

Die Ressource ist ausschließlich während eines aktiven Kampfes relevant. Jeder einzelne Kampf startet mit einem frischen Maximalvorrat. Skills verbrauchen Ressource; ist kein vorbereiteter Skill bezahlbar, verwendet der Held eine schwächere Ersatzaktion und regeneriert Ressource. Die Ressource ist keine persistente Meta-Ressource und wird nicht im globalen Header geführt.

In der Arena erscheint die Klassenressource direkt unter der Lebensleiste des Helden als eigene, farblich klar unterscheidbare Leiste mit aktuellem und maximalem Wert. Held und Gegner verwenden im Kampf echte Portrait-/Challenger-Assets statt Emojis.

## Taverne und Quests

Die Taverne enthält Standardquests, Ereignisse, Risikoaufträge und besondere Kämpfe. Abenteuerlust wird erst beim tatsächlichen Start einer Aktivität verbraucht.

Ereignisquests sind auf eine neutrale frühe Erfolgswahrscheinlichkeit von ungefähr **50 %** kalibriert. Attribute, Klasse und weitere passende Boni erhöhen die Chance erst durch Charakterentwicklung.

Besondere Kämpfe:
- **Knochenwache:** automatischer Miniboss
- **Der Knochenhauer:** taktisches Kopfgeld mit Angriffs-, Fokus- und Verteidigungsentscheidungen

Questbelohnungen verwenden die gemeinsame Itemdarstellung sowie kanonische Gold- und XP-Assets.

## Katakomben

Die Katakomben bestehen aus zehn aufeinanderfolgenden Räumen mit Ereignissen, Kämpfen, Schreinen, Schätzen, Elitegegnern und Endboss. Beute bleibt während des Runs ungesichert und erzeugt eine Risiko-/Belohnungsentscheidung.

Wichtige Regeln:
- ein neuer Run benötigt einen Katakombenschlüssel
- der Schlüsselbestand ist im Katakomben-Header sichtbar
- automatische Kämpfe nutzen die vorbereitete Skillrotation
- die Klassenressource wird für jeden Kampf neu initialisiert
- Skill- und Statusschaden werden berücksichtigt
- ein aktiver Kampf kann nicht durch Verlassen umgangen werden
- der Endboss besitzt Phasen-/Enrage-Mechaniken
- Run-Zustände werden für Reload/PWA-Unterbrechungen abgesichert

## Arena

Die Arena bietet drei Gegner-Schwierigkeitsstufen, die Haltungen **Aggressiv**, **Defensiv** und **Konter** sowie Liga-Progression von Bronze bis Legende.

Gegner besitzen Build-Archetypen:
- **Bollwerk** – wird bevorzugt aggressiv gekontert
- **Schatten** – Hinterhalt; Konter ist besonders effektiv
- **Arkan** – Burst; Defensive reduziert die Gefahr
- **Blutklinge** – Raserei bei niedrigen HP; Defensive schwächt den Enrage

Ausrüstung, Attribute, Haltung, Skillrotation und Klassenressource laufen im selben Kampfpfad. Verursachter und erlittener Schaden, Krits, Ausweichen und Konter werden während des Kampfes direkt erfasst und im Ergebnisdialog ausgewertet. Seit der Runtime-Konsolidierung besitzt `arena-v2.js` selbst die vollständige Arena-Darstellung einschließlich Kampfportraits und Klassenressourcenleiste; frühere Repair-Renderer wurden entfernt.

## Stadt und Ahnenschmiede

Freischaltungen:
- Händler ab Stufe 3
- Ahnenschmiede ab Stufe 5
- Bank ab Stufe 10
- Ahnenschrein für Reinkarnation und Vermächtnis

Die Ahnenschmiede unterstützt Aufwerten bis +10, Verwerten, Affix-Veredelung und legendäres Ahnenwerk. Erfolgreiche Aufwertungen erhalten einen eigenen Ergebnisdialog mit Itemgrafik, alter/neuer Schmiedestufe, Machtänderung und verbrauchten Ressourcen.

## Reinkarnation und Vermächtnis

Reinkarnation ist ab **Stufe 50** aktiv. Vor dem irreversiblen Reset wird ein separater Wiederherstellungs-Snapshot geschrieben; der Vorgang besitzt eine doppelte Bestätigung und wird während kritischer Aktivitäten blockiert.

Erhalten bleiben unter anderem Charakteridentität, Seelensteine, freigeschaltetes Vermächtnis, Reinkarnationshistorie/Prestige, dafür vorgesehene legendäre Gegenstände, Ruhmesmünzen sowie freigeschaltete Kapazitäten.

Zurückgesetzt werden unter anderem Stufe, XP, Gold, normale Ausrüstung, normale Inventargegenstände, temporäre Schmiederessourcen, aktive Aktivitäten, aktuelle Skillprogression und **sämtliche Katakombenschlüssel**. Der kanonische Schlüsselbestand ist `S.keys` und wird explizit auf `0` gesetzt.

Der Vermächtnisbaum besitzt die Zweige **Macht, Überleben und Arkana**. Knoten müssen innerhalb eines Zweiges sequenziell freigeschaltet werden; spätere Stufen können nicht übersprungen werden.

## Save, Recovery und PWA

Der Spielstand wird lokal gespeichert und versioniert migriert. Aktuell gilt Save-Schema **v4**. Zusätzlich zum normalen Backup existiert ein dedizierter Vor-Reinkarnations-Snapshot.

Die PWA trennt Code- und Asset-Cache. Service-Worker-Wechsel erzwingen während einer laufenden Sitzung keinen automatischen Reload mehr. Charaktererstellung und Tutorial dürfen dadurch nicht mitten in einer Interaktion neu starten.

## UI / UX

Verbindliche Richtung:
- kompakter globaler Header
- Kampfressourcen nur im aktiven Kampf
- fünfteilige mobile Fußnavigation mit zentralem Held-Button
- genau eine sichtbare Skillrotation im Heldentab
- neutral dunkle leere Equipment-Slots
- gemeinsame Item-Detaildialoge für Equipment und Inventar
- adaptive, scrollbare Tutorial-Coachmarks mit immer erreichbaren Aktionen
- echte Dark-Arcane-Fantasy-Assets statt ersetzbarer Emojis, wenn ein kanonisches Asset vorhanden ist
- Smartphone-Safe-Areas und kleine Displaybreiten müssen vollständig unterstützt werden
- Reduced-Motion-Unterstützung und dezente Touch-Haptik auf unterstützten Geräten

## Technische Architektur

Das Projekt ist eine frameworkfreie PWA. Verbindliche Regeln:
- genau eine State-/Save-Authority
- genau eine Render-/Navigation-Authority
- Screen-spezifische Layout-Ownership
- globale Runtime-Module liefern Daten/APIs/Design-Tokens statt konkurrierender Screen-Geometrie
- keine neuen Patch-Ketten, wenn die eigentliche Source of Truth korrigiert werden kann
- Save-Migrationen bleiben vorwärtskompatibel
- destruktive Meta-Aktionen besitzen Recovery-Snapshots
- bei jeder relevanten Änderung werden Versionsnummer und README gemeinsam aktualisiert

Die verbindliche Runtime-Ownership ist in `docs/RUNTIME-ARCHITECTURE.md` dokumentiert. Mit der Runtime-Konsolidierung wurden die separaten Arena-Repair-Runtimes sowie die Hero-Tutorial-/Visibility-Bridges aus dem Produktionsgraph entfernt und in `arena-v2.js` bzw. `hero-dashboard-v8.js` konsolidiert.

GitHub Actions prüfen JavaScript-Syntax, Runtime-/Asset-Referenzen, Load-Order, Build-Version, kritische öffentliche APIs sowie zentrale Ownership- und Reinkarnations-Invarianten. `index.html` darf ausschließlich tatsächlich vorhandene Runtime-Dateien referenzieren.

## Release-Test

Der manuelle Release-Test ist in `docs/RELEASE-CHECKLIST.md` beschrieben. Besonders relevant sind Charaktererstellung, progressives Onboarding, alle Questtypen, Klassenressourcen in jedem Kampfpfad, vollständiger Katakombenrun, Arena, Held/Inventar/Item-Popups, Händler, Bank, alle Schmiede-Tabs, Reinkarnation/Vermächtnis, Save/Reload/PWA-Neustart und Layouttests auf kleinen wie großen Smartphones.

## Entwicklerwerkzeuge

Interne Testwerkzeuge sind im normalen Release-Build unsichtbar. Für QA können sie über `?beta=1` oder `?debug=1` aktiviert werden. Dort stehen Testressourcen, Level-Steuerung, Tutorial-Neustart sowie Save-Export/-Import und Recovery-Aktionen zur Verfügung.
