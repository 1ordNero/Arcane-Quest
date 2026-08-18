# Arcane Tavern & Quest

Mobile-first Dark-Arcane-Fantasy-RPG als installierbare Progressive Web App (PWA). Die visuelle Richtung verbindet düstere Diablo-artige Fantasy mit klarer, stilisierter Lesbarkeit für Smartphones.

**Aktueller Release Candidate:** v0.15.12  
**Live-Build:** https://1ordnero.github.io/Arcane-Quest/

> Diese README beschreibt den tatsächlich freigegebenen Stand von `main` und hat bei Widersprüchen Vorrang vor älteren GDD-Vorgaben.

## Release-Status

v0.15.12 ist der funktional vollständige Release Candidate für den aktuellen Launch-Scope. Vor einer öffentlichen Veröffentlichung ist noch ein manueller Geräte-/Regressionstest vorgesehen. Der Release Candidate enthält den vollständigen Kernloop von Charaktererstellung bis Reinkarnation und Vermächtnis sowie ein persistentes, progressives Onboarding.

Aktueller Launch-Scope der Charaktererstellung:
- Volk: **Mensch**
- Klassen: **Krieger, Magier, Hexenmeister, Druide**
- Hintergründe: **Tavernen-Stammgast, Gefallener Adeliger, Runenschmied-Lehrling, Schatten-Ausreißer**

Waldläufer, Totenbeschwörer und die weiteren fünf Völker existieren teilweise bereits in Daten-/Systemschichten, werden aber erst nach vollständigen Art-, Balance- und QA-Pässen für die Charaktererstellung freigegeben. Langfristiges Ziel bleiben alle sechs Klassen und sechs Völker.

## Kernloop

1. Charakter erstellen.
2. In der Taverne Quests, Ereignisse, Risikoaufträge und Kopfgelder spielen.
3. Katakomben als riskante 10-Raum-Expedition absolvieren.
4. In der Arena gegen skalierende Gegner und Build-Archetypen kämpfen.
5. Ausrüstung, Affixe, Skills und vorbereitete Rotation optimieren.
6. Händler und Ahnenschmiede für Wirtschaft und Item-Progression nutzen.
7. Stufe 50 erreichen und am Ahnenschrein reinkarnieren.
8. Seelensteine in dauerhaftes Vermächtnis investieren und einen neuen Lebenszyklus starten.

Das reguläre Maximallevel ist **Stufe 50**.

## Onboarding

Das Onboarding ist kontextuell, persistent und an den echten Spielfortschritt gekoppelt. Es verwendet kompakte Coachmarks direkt auf den relevanten UI-Bereichen statt eines separaten Tutorial-Modus.

Grundregeln:
- Das erste Tutorial erklärt nur Taverne, Abenteuerlust und Questwahl.
- Bereits gesperrte Systeme werden **nicht vorab erklärt**.
- Händler startet sein eigenes Mini-Tutorial erst beim ersten Betreten ab Stufe 3.
- Ahnenschmiede und Arena starten ihre Tutorials erst beim ersten Betreten ab Stufe 5.
- Katakomben werden beim ersten tatsächlichen Betreten erklärt.
- Der Heldentab erklärt Ausrüstung, Werte, Fertigkeiten und die kampfgebundene Klassenressource.
- Reinkarnation und Vermächtnis werden erst auf Stufe 50 erklärt.
- Jeder Bereich speichert seinen eigenen Tutorial-Fortschritt und wird nach Reload/PWA-Neustart korrekt fortgesetzt.
- Jedes Kapitel kann separat übersprungen werden, ohne andere spätere Tutorials zu deaktivieren.
- Reinkarnation startet das Anfänger-Onboarding nicht erneut.
- Nach einer frischen Charaktererstellung wird das Tavernen-Kapitel explizit als ausstehend markiert und über die kanonische State-Authority gestartet.
- Coachmarks verwenden einen SVG-Masken-Spotlight-Ausschnitt, sodass das hervorgehobene UI sichtbar bleibt und nicht mit Header-, Footer- oder Karten-Layern kollidiert.
- Coachmark-Texte bleiben bewusst kompakt; eine kurze Zusatzinformation ergänzt nur den wichtigsten strategischen Kontext.
- Die Coachmark-Karte wird bevorzugt ober- oder unterhalb des hervorgehobenen Elements platziert und auf kleinen Displays an die gegenüberliegende Bildschirmkante gedockt.
- Das Quest-Tutorial hebt bevorzugt eine konkrete Questkarte statt den kompletten Questbereich hervor.
- Das Katakomben-Tutorial verweist auf den tatsächlichen Schlüsselbestand im Katakomben-Header.

Für QA stellt `Arcane.onboarding` Status-, Reset- und Open-Funktionen bereit, damit einzelne Kapitel gezielt erneut getestet werden können. Im Beta-Menü kann zusätzlich das **gesamte Tutorial von vorne gestartet** werden.

## Charakter, Skills und Builds

Der Held besitzt neun aktive Ausrüstungsslots:
- Kopf
- Schulter
- Brust
- Beine
- Stiefel
- Amulett
- Ring
- Haupthand
- Zweithand

Ring 2, Gürtel und Handschuhe gehören nicht zum aktuellen kanonischen Equipment-Modell. Alte Spielstände werden auf die aktuelle Struktur migriert.

Jede Klasse verfügt über eigene Skills. Freigeschaltete Fertigkeiten werden zu einer vorbereiteten Rotation mit bis zu vier Slots zusammengestellt. Diese Rotation ist nicht nur Darstellung, sondern wird in Arena, Katakomben und Kopfgeldkämpfen tatsächlich ausgeführt. Angriff, Heilung, Lebensraub, Buffs, defensive Effekte und Statusschaden laufen über den gemeinsamen Skill-Pfad. Im Heldentab wird die vorbereitete Rotation genau einmal direkt unter der Charakter-/Ausrüstungsansicht angezeigt.

Jede Klasse besitzt eine eigene **kampfgebundene Klassenressource**. Diese Ressource ist nur während eines aktiven Kampfes relevant und sichtbar, startet zu Beginn jedes einzelnen Kampfes wieder auf dem Maximalwert und wird nicht als persistente Meta-Ressource im globalen Header geführt. Skills verbrauchen die Ressource; wenn kein vorbereiteter Skill bezahlbar ist, wird ein schwächerer Basisangriff verwendet, der Ressource regeneriert.

Die drei Kernwerte **Leben, Schaden und Rüstung** verwenden eigene UI-Icons im Heldentab. Ein Antippen öffnet eine kompakte Erklärung mit aktuellem Wert und Gameplay-Bedeutung. Leere Ausrüstungsslots bleiben visuell neutral und dunkel, damit belegte und hochwertige Slots die eigentliche Aufmerksamkeit erhalten.

Der Heldentab zeigt zusätzlich den dauerhaften Reinkarnationsfortschritt als Prestige-Merkmal. Jeder abgeschlossene Lebenszyklus erhöht die sichtbare Reinkarnationszahl und vergibt einen neuen Titel, beispielsweise **Wiedergeborener**, **Seelenwanderer** oder **Ahnenberührter**. Höhere Lebenszyklen führen die Titelprogression fort und bleiben unabhängig vom normalen Level sichtbar.

Vier Build-Affinitäten ergänzen das Equipment:
- **Bollwerk** – Defensive, Rüstung und Block
- **Schatten** – Geschick, Ausweichen und Krit
- **Arkan** – Intelligenz, Krit und Burst
- **Blutklinge** – Stärke, Schaden und offensiver Druck

## Persönliche Geschichten

Die vier Hintergründe besitzen echte Gameplay-Auswirkungen:
- **Tavernen-Stammgast:** rund 15 % geringere Abenteuerlust-Kosten
- **Gefallener Adeliger:** +10 % auf positive Goldgewinne
- **Runenschmied-Lehrling:** +10 Prozentpunkte Aufwertungschance
- **Schatten-Ausreißer:** zusätzliche 5-%-Chance, zufällige Beute um eine Seltenheitsstufe aufzuwerten

## Taverne und Quests

Die Taverne enthält Standard-, Ereignis-, Risiko- und Kopfgeldaktivitäten. Abenteuerlust wird beim tatsächlichen Start verbraucht. Questbelohnungen verwenden die gemeinsame Itemdarstellung und zeigen einen fokussierten Abschluss-/Loot-Screen.

Ereignisquests sind auf eine neutrale frühe Erfolgswahrscheinlichkeit von ungefähr **50 %** kalibriert. Passende Attribute, Klasse und Volk verschieben diese Chance anschließend nach oben; hohe Erfolgsquoten müssen dadurch erst über Charakterentwicklung und passende Builds verdient werden.

Besondere Kämpfe:
- **Knochenwache:** automatischer Miniboss
- **Der Knochenhauer:** taktisches Premium-Kopfgeld mit Angriffs-/Verteidigungsentscheidungen

## Katakomben

Die Katakomben bestehen aus zehn aufeinanderfolgenden Räumen mit Ereignissen, Kämpfen, Schrein, Schatzkammer, Elite und Endboss. Beute bleibt während des Runs ungesichert und erzeugt eine Risiko-/Belohnungsentscheidung.

Wichtige Regeln:
- automatische Kämpfe nutzen die vorbereitete Skillrotation
- Klassenressource wird für jeden Kampf neu initialisiert
- Skill- und Statusschaden werden berücksichtigt
- ein aktiver Kampf kann nicht durch Verlassen umgangen werden
- Endboss besitzt Phasen-/Enrage-Mechaniken
- Run-Zustände werden für Reload/PWA-Unterbrechungen abgesichert
- der globale Katakomben-Header zeigt neben Gold den aktuellen Katakombenschlüssel-Bestand mit dem kanonischen Schlüssel-Asset

## Arena

Die Arena bietet drei Gegner-Schwierigkeitsstufen, die Haltungen **Aggressiv**, **Defensiv** und **Konter** sowie Liga-Progression von Bronze bis Legende.

Gegner besitzen Build-Archetypen:
- **Bollwerk** – wird bevorzugt aggressiv gekontert
- **Schatten** – Hinterhalt; Konter ist besonders effektiv
- **Arkan** – Burst; Defensive reduziert die Gefahr
- **Blutklinge** – Raserei bei niedrigen HP; Defensive schwächt den Enrage

Die Skillrotation und Arena-Build-Logik laufen im selben Kampfpfad. Verursachter und erlittener Schaden, Krits, Ausweichen und Konter werden während des Kampfes direkt erfasst und im Ergebnisdialog ausgewertet.

## Stadt

Die Stadt ist der Meta-/Verwaltungshub:
- Händler ab Stufe 3
- Ahnenschmiede ab Stufe 5
- Bank ab Stufe 10
- Ahnenschrein für Reinkarnation und Vermächtnis

Der globale Header und die Stadt-Unterbereiche sind auf kompakte Smartphone-Nutzung ausgelegt und vermeiden redundante Überschriften/Ressourcenleisten.

## Ahnenschmiede

Die Ahnenschmiede unterstützt:
- Aufwerten bis +10 mit steigenden Kosten und Erfolgschance
- Verwerten in Schmiedestaub und Essenz
- Affix-Veredelung
- Legendäres Ahnenwerk

Erfolgreiche Aufwertungen erhalten einen eigenen Ergebnisdialog mit Itemgrafik, alter/neuer Schmiedestufe, Machtänderung und verbrauchten Ressourcen.

Bei der Veredelung können Affixe neu gewürfelt, ein Affix gesperrt und die Rollqualität verbessert werden. Affix-Beiträge werden vor der Neuberechnung entfernt, damit keine Werte mehrfach aufaddiert werden.

## Reinkarnation und Vermächtnis

Reinkarnation ist ab **Stufe 50** aktiv. Vor jedem irreversiblen Reset wird automatisch eine separate Wiederherstellungskopie des Spielstands geschrieben. Der Vorgang besitzt eine doppelte Bestätigung und wird blockiert, solange eine kritische Aktivität läuft.

Die Seelenstein-Belohnung setzt sich aus Stufe-50-Basis, Quest-Meilensteinen, Arena-Siegen und Vermächtnisbonus zusammen.

Bei einer Reinkarnation bleiben erhalten:
- Name, Volk, Geschlecht, Klasse und Hintergrund
- Seelensteine und freigeschaltetes Vermächtnis
- Reinkarnationshistorie und Prestige-Titel
- legendäre Gegenstände
- Ruhmesmünzen
- freigeschaltete Inventar-/Bankkapazität

Zurückgesetzt werden:
- Stufe und XP
- Gold
- normale Ausrüstung und normale Inventargegenstände
- Schmiedestaub, Essenzen und Ahnenrelikte
- **sämtliche Katakombenschlüssel**
- Quest-/Arena-Ruhm-Fortschritt
- aktive Runs und Kampfzustände
- aktuelle Skill-Freischaltungen/Rotation des Lebenszyklus

Der kanonische Katakombenschlüssel-Bestand ist `S.keys` und wird beim Reinkarnationsreset explizit auf `0` gesetzt.

Der Vermächtnisbaum besitzt drei Zweige mit sequenziell freischaltbaren Knoten:
- **Macht:** Gesamtschaden und Krit
- **Überleben:** maximales Leben, Rüstung, Block und Ausweichen
- **Arkana:** XP, Gold, Beuteglück und Seelenstein-Bonus

Die Boni wirken direkt auf die zugehörigen Progressions-, Loot-, Stat- und Kampfsysteme.

## Save, Recovery und PWA

Der Spielstand wird lokal gespeichert und versioniert migriert. Aktuell gilt Save-Schema **v4**. Zusätzlich zum normalen Backup gibt es einen dedizierten Reinkarnations-Snapshot, damit der letzte Lebenszyklus bei einem technischen Fehler wiederhergestellt werden kann.

Die PWA trennt Code- und Asset-Cache, aktualisiert den Service Worker kontrolliert und hält kritische Assets beim Start priorisiert. Unterbrochene Aktivitäten werden beim Neustart in einen sicheren Zustand gebracht. Service-Worker-Wechsel erzwingen während einer laufenden Sitzung keinen automatischen Seiten-Reload mehr; eine vorbereitete Version wird beim nächsten regulären App-Start vollständig verwendet.

## UI / UX

- kompakter globaler Header mit Bereich, persistenten Ressourcen und XP
- Kampfressourcen ausschließlich im aktiven Kampf
- fünfteilige mobile Fußnavigation
- zentraler Held-Button mit Portrait
- sichtbares Reinkarnations-Prestige mit Lebenszyklus-Titeln im Heldentab
- vorbereitete Fertigkeiten einmalig direkt unter Charakter und Ausrüstung
- Kernwerte Leben, Schaden und Rüstung mit kanonischen Icons und antippbaren Erklärungen
- leere Equipment-Slots neutral und dunkel statt visuell hervorgehoben
- progressives, kontextuelles Onboarding mit separaten Kapiteln pro freigeschaltetem System
- Spotlight-Coachmarks mit garantiert sichtbarem Zielbereich und adaptiver Platzierung
- Katakombenschlüssel sichtbar im Katakomben-Header
- Smartphone-Safe-Areas
- einheitliche Item-Pop-ups und Dialoge
- hochwertige Quest-, Arena-, Forge- und Reward-Präsentation
- eigene Dark-Arcane-Fantasy-Assets für zentrale Navigation, Räume, Ressourcen, Gebäude, Gegner und Equipment
- Reduced-Motion-Unterstützung
- dezente Touch-Haptik auf unterstützten Geräten

## Technische Architektur

Das Projekt ist eine frameworkfreie PWA. Die technische Richtung ist verbindlich:
- genau eine State-/Save-Authority
- genau eine Render-/Navigation-Authority
- Screen-spezifische Layout-Ownership
- globale Runtime-Module liefern Daten, APIs und Design-Tokens statt konkurrierende Screen-Geometrie
- keine neuen Patch-Ketten für Probleme, die an der eigentlichen Source of Truth behoben werden können
- Save-Migrationen sind vorwärtskompatibel und destruktive Meta-Aktionen erhalten Recovery-Snapshots

GitHub Actions prüfen JavaScript-Syntax, Script-/Asset-Referenzen, Load-Order, Runtime-Ownership und zentrale API-Guards.

## Release-Test

Der manuelle Release-Test ist in `docs/RELEASE-CHECKLIST.md` beschrieben. Besonders relevant sind:
- frischer Start und Charaktererstellung ohne unerwarteten zweiten Seiten-Reload
- vollständiges Erst-Onboarding in Taverne und Heldentab
- Quest-Tutorial: hervorgehobene Questkarte bleibt innerhalb des Spotlight-Ausschnitts sichtbar und wird von der Coachmark-Karte nicht verdeckt
- Katakomben-Tutorial: Schlüssel-Coachmark zeigt auf den sichtbaren Schlüsselbestand im Header
- Beta-Menü: `Tutorial neu starten` setzt alle Kapitel zurück und startet wieder in der Taverne
- keine Tutorials für noch gesperrte Systeme
- Händler-Tutorial beim ersten Betreten ab Stufe 3
- Schmiede- und Arena-Tutorials beim ersten Betreten ab Stufe 5
- Reinkarnations-/Vermächtnis-Tutorial erst auf Stufe 50
- Tutorial-Fortsetzung nach Reload/PWA-Neustart und separates Überspringen einzelner Kapitel
- Heldentab: nur eine Skillrotation sichtbar, leere Slots neutral, Stat-Popups für Leben/Schaden/Rüstung
- Level-/Skill-Progression bis 50
- alle Questtypen inklusive Ereigniswahrscheinlichkeiten
- Klassenressource: Sichtbarkeit nur im Kampf, Verbrauch und Reset je Kampf
- kompletter Katakombenrun inklusive Boss und Verlassen-Sperre
- Arena mit allen Haltungen/Build-Archetypen
- Equipment, Bank, Händler und alle Schmiede-Tabs
- Reinkarnation, Vermächtniskauf, Schlüsselreset und Wiederherstellung des Vor-Reinkarnations-Snapshots
- Save/Reload/PWA-Neustart während und nach Aktivitäten
- Layout auf kleinen und großen Smartphone-Displays

## Entwicklerwerkzeuge

Die internen Testwerkzeuge sind im normalen Release-Build unsichtbar. Für gezielte QA können sie über `?beta=1` oder `?debug=1` aktiviert werden. Dort stehen Testressourcen, Level-Steuerung, ein vollständiger Tutorial-Neustart sowie Save-Export/-Import und Recovery-Aktionen zur Verfügung.

## Entwicklungsregel

README und sichtbare Versionsnummer werden bei relevanten Änderungen gemeinsam mit `main` aktualisiert. Diese README ist die aktuelle Produkt-/Design-Referenz; ältere GDD-Regeln gelten nur, soweit sie dem aktuellen README nicht widersprechen.