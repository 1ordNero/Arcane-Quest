# Arcane Tavern & Quest – Android Beta

Mobile-first Dark-Arcane-Fantasy-RPG als installierbare Progressive Web App (PWA). Die visuelle Richtung verbindet düstere Diablo-artige Fantasy mit einer klaren, stilisierten Warcraft-artigen Lesbarkeit.

**Aktuelle Beta-Version:** v0.14.54  
**Live-Beta:** https://1ordnero.github.io/Arcane-Quest/

## Aktueller Entwicklungsstand

### Kern-Loop
- Charakter erstellen und über Quests, Katakomben und Arena entwickeln
- Gold, XP, Ausrüstung und Schmiederessourcen verdienen
- Ausrüstung, Builds und eine vorbereitete Skillrotation optimieren
- Stadt als Hub für Händler, Ahnen-Schmiede, Bank und Ahnenschrein
- fünf mobile Hauptbereiche: **Taverne · Katakomben · Held · Stadt · Arena**

### Charakter
- aktueller Beta-Editor: Mensch mit 4 spielbaren Klassen und 4 Hintergründen
- langfristiges Ziel: alle 6 Völker und alle 6 Klassen spielbar machen
- dynamische Heldengeschichte und Charakterzusammenfassung
- Charakterwerte und Ausrüstung beeinflussen Proben und Kämpfe
- lokale persistente Spielstände mit Recovery-/Backup-Mechanismen
- aktuelles Maximallevel: **Stufe 50**

### Held & Ausrüstung
Der Held-Screen ist als kompaktes mobiles Dashboard mit den Bereichen **Ausrüstung · Skills · Inventar** aufgebaut.

Aktuell gibt es **9 aktive Ausrüstungsslots**:
- Rüstung: Kopf, Schulter, Brust, Beine, Stiefel
- Accessoires: Amulett, Ring
- Waffen: Haupthand, Zweithand

Bewusst entfernt wurden Ring 2, Gürtel und Handschuhe. Alte Saves werden auf die aktuelle Slot-Struktur migriert; nicht mehr verwendete ausgerüstete Gegenstände werden dabei möglichst verlustfrei ins Inventar überführt.

Die Ausrüstungsansicht verwendet das zentrale Heldenlayout:
- Heldengrafik zentral in der Ausrüstungskarte
- alle Ausrüstungsslots um den Helden angeordnet
- HP, Schaden, Rüstung sowie STR, AGI, INT, Krit, Ausweichen und Block kompakt am Helden
- Itemdetails als Pop-up statt unterhalb langer Itemlisten
- zentrale eigene Slot-/Itemgrafiken statt paralleler Legacy-Darstellungen

### Item-, Loot- & Build-System
- Item-Level entsprechend dem Charakterlevel beim Fund
- Seltenheit, Item-Level, Schmiedestufe und Roll-Qualität beeinflussen die Stärke
- variable Affixe und unterschiedliche Roll-Stärken erzeugen Item-Varianz
- hochwertige Gegenstände können mehrere Affixe besitzen
- Itemvergleich zeigt Verbesserungen bzw. Verschlechterungen gegenüber der aktuellen Ausrüstung
- gemeinsame Itemdarstellung für Questbelohnungen, Inventar, Händler, Bank und weitere Loot-Flows

Vier Build-Affinitäten erzeugen zusätzliche Ausrüstungsidentität:
- **Bollwerk** – Rüstung, Block und Überleben
- **Schatten** – AGI, Ausweichen und kritische Treffer
- **Arkan** – INT, Krit und Burst
- **Blutklinge** – STR, direkter Schaden und Krit

Bei 2 bzw. 4 ausgerüsteten Teilen einer Affinität werden Resonanzboni aktiv. Mythische und legendäre Gegenstände können zusätzliche Keystone-Eigenschaften besitzen, die Kampfregeln verändern statt ausschließlich numerische Stats zu erhöhen.

### Skill-System & Kampfrotation
- jede der sechs Klassen besitzt eigene Fertigkeiten
- neue Skills werden über Level-Meilensteine dauerhaft für die aktuelle Klassenlaufbahn freigeschaltet
- bei einer offenen Skill-Wahl erscheint ein sichtbarer Hinweis direkt am **Held-Button im Footer**
- der Skillscreen zeigt Freischaltfortschritt und nächste Skill-Meilensteine
- vorbereitete Rotation aus bis zu vier Skills
- Reihenfolge der Slots beeinflusst die tatsächliche Reihenfolge der eingesetzten Fähigkeiten
- Ressourcenverbrauch, Angriff, Heilung, Lebensraub, Buffs, defensive Fähigkeiten und Status-Effekte werden vom gemeinsamen Skillsystem verarbeitet
- Status-Effekte erneuern ihre Dauer statt unbegrenzt zu stapeln

Die vorbereitete Rotation ist inzwischen in die zentralen Kampfpunkte integriert:
- **Arena** – vollständig skillgetriebener automatischer Kampf
- **Katakomben** – automatischer Kampf läuft durch die vorbereitete Skillrotation
- **Kopfgeld / Knochenhauer** – die taktische Kampfstruktur bleibt erhalten, verwendet zusätzlich die vorbereitete Rotation für Skill-Effekte

Damit ist die Skillreihenfolge nicht nur eine Anzeige im Heldenscreen, sondern ein tatsächlicher Bestandteil der Kampfoptimierung.

### Taverne & Quests
- Standard-, Ereignis-, Kopfgeld- und Risikoquests
- kompakte Questkarten mit Details auf Abruf
- Abenteuerlust wird beim tatsächlichen Start eines Auftrags abgezogen
- automatischer Miniboss **Knochenwache**
- **Der Knochenhauer** als Premium-Kopfgeld mit taktischem Angriff-/Verteidigungs-Kampf
- Kopfgeld mit Verwundbarkeitsfenstern, Fokus, begrenzten Aktionen und Abschlusswertung
- Skillrotation wirkt inzwischen auch im Kopfgeldkampf
- Questbelohnungen verwenden die aktuelle Loot-/Itemdarstellung ohne doppelte Legacy-Itemanzeige

### Katakomben
- 10 aufeinanderfolgende Räume
- Ereignisse, Kämpfe, Schrein, Schatzkammer, Elite und Endboss
- automatische Dungeon-Kämpfe mit HP-Balken und Kampfprotokoll
- automatische Kämpfe verwenden die vorbereitete Skillrotation
- Skill-Effekte und Statusschaden werden im Kampf berücksichtigt und protokolliert
- ungesicherte Beute und freiwilliger Ausstieg als Risiko-/Belohnungssystem
- während eines aktiven Kampfes kann der Run nicht verlassen werden, um Niederlagen zu umgehen
- Endboss mit Phasenschild und Enrage
- kompakter mobiler Header und Run-Status, um möglichst viel Gameplay ohne Scrollen sichtbar zu halten
- selbstheilende Auto-Combat-Sperre gegen festhängende Kämpfe nach Reload/Unterbrechung
- eigene Katakomben-, Schlüssel-, Item- und semantische UI-Assets ersetzen zunehmend Emoji-Platzhalter

### Arena 2.0
- drei Schwierigkeitsstufen bei der Gegnerwahl
- Kampfhaltungen: Aggressiv, Defensiv und Konter
- automatische Kämpfe mit HP-Balken und Kampfprotokoll
- vorbereitete Skillrotation bestimmt die eingesetzten Fähigkeiten
- Ruhm, Ruhmesmünzen und Liga-Progression von Bronze bis Legende

Arena-Gegner besitzen zusätzlich Build-Archetypen:
- **Bollwerk** – wird bevorzugt aggressiv gekontert
- **Schatten** – Hinterhalt; Konter ist besonders effektiv
- **Arkan** – hoher Burst; Defensive reduziert die Gefahr
- **Blutklinge** – Raserei bei niedrigen HP; Defensive schwächt den Enrage

Die Arena zeigt Archetyp, Verhalten und empfohlenen Konter vor dem Kampf.

### Stadt
Die Stadt ist der zentrale Verwaltungs- und Meta-Progressions-Hub:
- Händler ab Stufe 3
- Ahnen-Schmiede ab Stufe 5
- Bank ab Stufe 10
- **Ahnenschrein** als eigener Bereich für Reinkarnation und zukünftige Vermächtnis-Systeme
- gesperrte Gebäude zeigen ihre Freischaltstufe
- einheitliche Breadcrumb-/Zurücknavigation in den Unterbereichen
- kompakte, bildstarke Gebäudekarten mit klarer Typografie, direkter Navigationsanzeige und eigener visueller Hervorhebung des Ahnenschreins

Der frühere Trainer-Platzhalter wurde entfernt. Seine geplanten Funktionen werden nicht als eigener Stadtbereich weitergeführt.

### Ahnenschrein & Reinkarnation
Der Ahnenschrein enthält aktuell die nicht-destruktive Foundation und Vorschau für das zukünftige Reinkarnationssystem.

Vorhanden bzw. vorgesehen:
- Reinkarnation ab **Stufe 50**
- Belohnung in **Seelensteinen**
- Seelensteine als Meta-Ressource, unter anderem für legendäre Ahnenwerke
- persistente Reinkarnationshistorie mit Anzahl, bestem Level, Lifetime-Seelensteinen und letzter Reinkarnation
- Vorschau der voraussichtlichen Seelenstein-Belohnung
- Vorschau der späteren Reset-/Behalten-Regeln

Der tatsächliche irreversible Reinkarnations-Reset bleibt bis zur vollständigen Absicherung deaktiviert.

### Händler & Bank
**Händler**
- levelskalierte Ausrüstungsangebote
- Gegenstände können aus dem Inventar verkauft werden
- Itemdetails und Kauf-/Verkaufsaktionen öffnen in einem gemeinsamen Pop-up

**Bank**
- 100 feste Tresorplätze
- Gegenstände können zwischen Rucksack und Bank verschoben werden
- Darstellung folgt dem gemeinsamen Item-Pop-up-Konzept

### Ahnen-Schmiede
Die Schmiede besitzt mehrere Progressionspfade:
- Aufwerten von +1 bis +10
- exponentiell steigende Kosten
- höhere Stufen benötigen zusätzliche Schmiede-Essenz
- Verwerten in Staub und Essenz
- Ahnenwerk / Legendär-Progression
- **Veredeln** für das Affix-System

Beim Veredeln können Affixe neu gewürfelt, einzelne Affixe gesperrt und Roll-Qualitäten gezielt bis 100 % verbessert werden. Die Affix-Neuberechnung entfernt alte Affix-Beiträge vor dem Neuaufbau, damit wiederholtes Veredeln keine Stats mehrfach aufaddiert.

### UI / UX
- appweites mobiles Design-System
- kompakte Header und möglichst große nutzbare Spielfläche
- fünfteilige symmetrische Fußnavigation
- zentraler Held-Button mit Charakterportrait
- Skill-Wahl-Badge direkt im Footer
- semantische Farbverwendung für Aktion, Belohnung, Erfolg und Gefahr
- reduzierte Kartenverschachtelung und Schatten
- Smartphone-Safe-Areas werden berücksichtigt
- wichtige Spielinformationen verwenden mobil lesbare Schriftgrößen
- gemeinsames Modal-/Pop-up-Muster für Itemdetails
- Arcane-Fantasy-Ladescreen während des App-Boots
- Katakomben- und Kampfansichten werden gezielt auf möglichst wenig Scrollbedarf optimiert
- Stadt-Gebäudekarten nutzen vorhandene Artworks stärker, ohne die mobile Übersicht unnötig zu verlängern

### Eigene Grafiken & Icons
Die UI wird schrittweise vollständig von Emoji-/Legacy-Platzhaltern auf eigene Dark-Arcane-Fantasy-Assets umgestellt.

Unter anderem vorhanden bzw. integriert:
- eigene Navigation-/Bereichsicons
- Charakter-/Heldengrafiken
- Ausrüstungs- und Itemgrafiken
- eigene Schulter-/Equipment-Assets
- Katakomben-Raum- und Gegnergrafiken
- eigener Katakombenschlüssel
- eigenes allgemeines Items-/Loot-Icon
- Kampfhaltungen unter `assets/icons/ui`
- Auswahlicons für Kraft/Kampf, Geschick und Wissen
- Arena-Challenger-Artworks für die Build-Archetypen
- Stadt-, Händler-, Bank-, Schmiede-, Ressourcen- und Stat-Icons

Verbliebene Emoji-Platzhalter werden weiterhin systematisch geprüft und durch eigene Assets ersetzt, sobald ein passendes semantisches Icon vorhanden ist.

Die Asset-Runtime lädt kritische Bilder zuerst und wärmt weitere Assets anschließend im Hintergrund vor. Bildassets verwenden einen getrennten langlebigen Cache, damit App-Updates nicht bei jedem Release sämtliche Grafiken neu laden müssen.

### Beta, PWA & Cache-Verhalten
- installierbare PWA über GitHub Pages
- kritische Assets werden beim Start priorisiert
- weniger wichtige Grafiken werden nach dem ersten stabilen Render im Hintergrund vorgeladen
- Code- und Bildcache sind getrennt
- aktive Spielsitzungen sollen nicht durch einen Asset-Wechsel während eines Deployments beschädigt werden
- Beta-Grafiken können gezielt neu geladen werden
- Reset-/Recovery-Code wird früh im Bootprozess geladen
- Script-Versionen werden bei relevanten Änderungen angehoben, um veralteten Browser-/PWA-Code zu vermeiden

Der Beta-Reset ist dafür vorgesehen, lokalen Spielstand, Backups und Session-Daten zu entfernen und anschließend wieder die Charaktererstellung zu öffnen. Dieser Bereich bleibt ein besonders zu testender Beta-Pfad.

### Technische Architektur / Konsolidierung
Das Projekt ist historisch aus mehreren Runtime-/Patch-Modulen gewachsen. Die technische Konsolidierung läuft aktiv weiter.

Zuletzt wurden unter anderem:
- zentrale Render- und Navigation-Authority gestärkt
- Boot-Reihenfolgen deterministischer gemacht
- Item-/Hero-System auf das kanonische 9-Slot-Modell vereinheitlicht
- redundante und obsolete Render-/Compatibility-Wrapper reduziert
- Versions- und Asset-Laufzeit stärker zentralisiert
- Footer-Navigation als stabiler eigener Renderpfad etabliert
- Skill-Freischaltung und Skillrotation als gemeinsame Systeme ausgebaut
- Katakomben-Autokampf mit dem öffentlichen Skill-/Combat-Pfad verbunden, damit automatische Kämpfe die Rotation nicht umgehen

Ziel ist, schrittweise weniger konkurrierende Runtime-Wrapper zu besitzen und zentrale Systeme als eindeutige Source of Truth zu verwenden.

## Roadmap – nächste größere Entwicklungsblöcke

### Phase 1 – Ahnenschrein & Vermächtnis-Fundament
**Ziel:** Den Ahnenschrein zum zentralen Meta-Progressionsort des Spiels ausbauen.

- Reinkarnations-Vorschau weiter verfeinern
- finale Regeln für erhaltene und zurückgesetzte Ressourcen definieren
- Seelenstein-Belohnungsformel balancieren
- Vermächtnisbaum als Vorschau integrieren
- Entwicklungsrichtungen **Macht**, **Überleben** und **Arkana** ausarbeiten
- Kosten- und Freischaltstruktur permanenter Knoten definieren

### Phase 2 – Sicheres Reinkarnationssystem
**Ziel:** Reinkarnation als echte, irreversible Spielaktion aktivieren.

Vor Aktivierung müssen insbesondere vorhanden sein:
- vollständige Vorher-/Nachher-Vorschau
- doppelte Bestätigung
- automatisches Savegame-Backup unmittelbar vor dem Reset
- Wiederherstellungsmöglichkeit bei fehlgeschlagenen oder unterbrochenen Vorgängen
- atomare Aktualisierung des Meta-Fortschritts
- Tests für Reload, PWA-Neustart und unterbrochene Speichervorgänge

### Phase 3 – Reinkarnation mit dem bestehenden Spiel verzahnen
**Ziel:** Reinkarnation soll neue Spielmöglichkeiten eröffnen und nicht nur einen schnelleren Zahlen-Reset darstellen.

Geplant sind unter anderem skalierende Katakomben, neue Elite-/Bossvarianten, zusätzliche Arenaebenen, Endgame-Affixe, Meta-Freischaltungen für Schmiede und Ahnenwerk sowie seltene Reinkarnationsereignisse.

### Phase 4 – Endgame-Loop
**Ziel:** Nach der ersten Reinkarnation einen langfristig skalierenden Kernloop schaffen.

Mögliche Systeme:
- skalierende **Arkane Prüfungen** als Endlos-/Challenge-Modus
- zunehmende Katakombentiefe
- persönliche Bestwerte
- Elite-Modifikatoren und kombinierte Gegneraffixe
- Endgame-spezifische Materialien
- zusätzliche legendäre und mythische Keystone-Effekte

### Phase 5 – Klassen, Skills & Build-Tiefe
**Ziel:** Die sechs Klassen spielmechanisch noch deutlicher voneinander abgrenzen.

- Skillsets weiter ausbauen und balancieren
- zusätzliche Rotations-, Ressourcen- und Synergieentscheidungen
- klassenspezifische Keystone-/Legendär-Effekte
- Builds stärker mit Ausrüstung, Vermächtnis und Kampfsystem verzahnen
- Kampfhaltungen und Gegner-Archetypen weiter ausbauen

### Phase 6 – Content-Ausbau
- zusätzliche Questketten und seltene Ereignisse
- neue Katakombenräume und Bossbegegnungen
- zusätzliche Händler-/Schmiede-Angebote
- neue Itemfamilien, Affixe und legendäre Gegenstände
- mehr persönliche Story- und Hintergrundereignisse

### Phase 7 – Technische Konsolidierung & Release-Vorbereitung
Dieser Block läuft parallel zu allen Gameplay-Phasen weiter:
- monolithische Runtime-Dateien weiter in System-, State- und View-Schichten aufteilen
- obsolete Compatibility-Shims und Legacy-Code entfernen
- zentrale Item-, Asset-, Dialog-, Combat- und Navigationsschnittstellen vereinheitlichen
- automatisierte Regressionstests für Save/Load, Equipment, Skills, Reinkarnation und Kampfzustände aufbauen
- Performance und Speicherverbrauch auf mobilen Geräten messen
- PWA-Updatepfad und Offline-/Cache-Verhalten weiter härten
- README und GDD regelmäßig mit dem tatsächlichen `main`-Stand synchronisieren

## Beta-Schwerpunkte
Besonders wichtig für aktuelle Tests sind:
- Skill-Freischaltung auf den vorgesehenen Level-Meilensteinen
- Footer-Hinweis bei noch nicht gewähltem Skill
- tatsächliche Rotationsreihenfolge und Ressourcenverbrauch in Arena, Katakomben und Kopfgeld
- Katakomben-Autokampf über längere Runs und nach Reloads
- Verlassen-Sperre während aktiver Katakombenkämpfe
- Equipment-Migration älterer Saves
- korrektes Helden-/Ausrüstungslayout auf unterschiedlichen Smartphone-Größen
- Schmiede-Veredelung und Affix-Neuberechnung
- aktuelle Grafiken nach Deployment/Reload
- verbleibende Emoji-/Legacy-Platzhalter
- Arena-Build-Matchups und Haltungskonter
- Ahnenschrein und Reinkarnations-Vorschau

## Plattform
Die aktuelle Beta läuft als mobile PWA über GitHub Pages und ist primär für Smartphone-Bedienung optimiert.

## Entwicklungsregel
Nach neuen spielbaren Features, Änderungen an Kernsystemen oder relevanten technischen Änderungen wird diese README mit dem tatsächlichen Stand von `main` abgeglichen. Größere neue Systeme sollten zusätzlich gegen die Roadmap geprüft und dort nach Abschluss aktualisiert werden.