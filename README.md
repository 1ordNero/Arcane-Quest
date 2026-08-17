# Arcane Tavern & Quest – Android Beta

Mobile-first Dark-Arcane-Fantasy-RPG als installierbare Progressive Web App (PWA). Die visuelle Richtung verbindet düstere Diablo-artige Fantasy mit einer klaren, stilisierten Warcraft-artigen Lesbarkeit.

**Aktuelle Beta-Version:** v0.12.3  
**Live-Beta:** https://1ordnero.github.io/Arcane-Quest/

## Aktueller Entwicklungsstand

### Kern-Loop
- Charakter erstellen und über Quests, Katakomben und Arena entwickeln
- Gold, XP, Ausrüstung und Schmiederessourcen verdienen
- Ausrüstung und Skillrotation optimieren
- Stadt als Hub für Händler, Ahnen-Schmiede, Bank und Ahnenschrein
- fünf mobile Hauptbereiche: **Taverne · Katakomben · Held · Stadt · Arena**

### Charakter
- Charaktereditor mit 6 Völkern, 6 Klassen und 4 Hintergründen
- dynamische Heldengeschichte und Charakterzusammenfassung
- Charakterwerte und Ausrüstung beeinflussen Proben und Kämpfe
- lokale persistente Spielstände mit Recovery-/Backup-Mechanismen

### Held & Ausrüstung
Der Held-Screen ist als kompaktes mobiles Dashboard mit den Bereichen **Ausrüstung · Skills · Inventar** aufgebaut.

Aktuell gibt es **9 aktive Ausrüstungsslots**:
- linke Rüstungsseite: Kopf, Schulter, Brust, Beine, Stiefel
- Accessoires: Amulett, Ring
- Waffen: Haupthand, Zweithand

Bewusst entfernt wurden:
- Ring 2
- Gürtel
- Handschuhe

Alte Saves werden auf die aktuelle Slot-Struktur migriert. Nicht mehr verwendete ausgerüstete Gegenstände werden dabei möglichst verlustfrei ins Inventar überführt.

Die Ausrüstungsansicht verwendet das zentrale Heldenlayout:
- Heldengrafik zentral in der Ausrüstungskarte
- alle Ausrüstungsslots um den Helden angeordnet
- HP, Schaden, Rüstung sowie STR, AGI, INT, Krit, Ausweichen und Block direkt unter dem Helden
- keine separate doppelte Stat-Anzeige oberhalb der Helden-Untertabs
- Itemdetails werden als Pop-up statt unterhalb langer Itemlisten geöffnet

### Item-, Loot- & Build-System
- Item-Level entsprechend dem Charakterlevel beim Fund
- Seltenheit, Item-Level, Schmiedestufe und Roll-Qualität beeinflussen die Stärke
- variable Affixe und unterschiedliche Roll-Stärken erzeugen Item-Varianz
- hochwertige Gegenstände können mehrere Affixe besitzen
- Itemvergleich zeigt Verbesserungen bzw. Verschlechterungen gegenüber der aktuellen Ausrüstung

Vier Build-Affinitäten erzeugen zusätzliche Ausrüstungsidentität:
- **Bollwerk** – Rüstung, Block und Überleben
- **Schatten** – AGI, Ausweichen und kritische Treffer
- **Arkan** – INT, Krit und Burst
- **Blutklinge** – STR, direkter Schaden und Krit

Bei 2 bzw. 4 ausgerüsteten Teilen einer Affinität werden Resonanzboni aktiv.

Mythische und legendäre Gegenstände können zusätzliche Keystone-Eigenschaften besitzen, die Kampfregeln verändern statt ausschließlich numerische Stats zu erhöhen.

### Skill-System
- vor dem Kampf festgelegte Rotation aus bis zu vier Skills
- jede der sechs Klassen besitzt eigene Fertigkeiten
- Skillrotation wird in automatischen Arena- und Katakomben-Kämpfen verwendet
- der Knochenhauer bleibt als stärker manuell geprägter Kampf erhalten

### Taverne & Quests
- Standard-, Ereignis-, Kopfgeld- und Risikoquests
- kompakte Questkarten mit Details auf Abruf
- Abenteuerlust wird beim tatsächlichen Start eines Auftrags abgezogen
- automatischer Miniboss **Knochenwache**
- **Der Knochenhauer** als Premium-Kopfgeld mit manuellem Kampf
- Questbelohnungen verwenden die aktuelle Loot-/Itemdarstellung ohne doppelte Legacy-Itemanzeige

### Katakomben
- 10 aufeinanderfolgende Räume
- Ereignisse, Kämpfe, Schrein, Schatzkammer, Elite und Endboss
- automatische Dungeon-Kämpfe mit HP-Balken und Kampfprotokoll
- ungesicherte Beute und freiwilliger Ausstieg als Risiko-/Belohnungssystem
- während eines aktiven Kampfes kann der Run nicht verlassen werden, um Niederlagen zu umgehen
- Endboss mit Phasenschild und Enrage
- kompakter mobiler Header und Run-Status, um möglichst viel Gameplay ohne Scrollen sichtbar zu halten
- selbstheilende Auto-Combat-Sperre gegen festhängende Kämpfe nach Reload/Unterbrechung

### Arena 2.0
- drei Schwierigkeitsstufen bei der Gegnerwahl
- Kampfhaltungen: Aggressiv, Defensiv und Konter
- automatische Kämpfe mit HP-Balken und Kampfprotokoll
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

Der frühere Trainer-Platzhalter wurde entfernt. Seine geplanten Funktionen werden nicht als eigener Stadtbereich weitergeführt.

### Ahnenschrein & Reinkarnation
Der Ahnenschrein enthält aktuell die nicht-destruktive Vorschau für das zukünftige Reinkarnationssystem.

Geplant bzw. bereits als Foundation vorhanden:
- Reinkarnation ab Stufe 100
- Belohnung in **Seelensteinen**
- Seelensteine dienen unter anderem als Ressource für legendäre Ahnenwerke
- persistente Reinkarnationshistorie mit Anzahl, bestem Level, Lifetime-Seelensteinen und letzter Reinkarnation
- Vorschau der voraussichtlichen Seelenstein-Belohnung
- Vorschau der späteren Reset-/Behalten-Regeln

Der tatsächliche Reinkarnations-Reset ist derzeit noch deaktiviert.

### Händler
- levelskalierte Ausrüstungsangebote
- Gegenstände können aus dem Inventar verkauft werden
- Itemdetails und Kauf-/Verkaufsaktionen öffnen in einem gemeinsamen Pop-up

### Bank
- 100 feste Tresorplätze
- Gegenstände können zwischen Rucksack und Bank verschoben werden
- Darstellung folgt dem gemeinsamen Item-Pop-up-Konzept

### Ahnen-Schmiede
Die Schmiede besitzt aktuell mehrere Progressionspfade:
- Aufwerten von +1 bis +10
- exponentiell steigende Kosten
- höhere Stufen benötigen zusätzliche Schmiede-Essenz
- Verwerten in Staub und Essenz
- Ahnenwerk / Legendär-Progression
- **Veredeln** für das Affix-System

Beim Veredeln können:
- Affixe neu gewürfelt werden
- einzelne Affixe gesperrt werden
- Roll-Qualitäten gezielt bis 100 % verbessert werden

Die Affix-Neuberechnung entfernt alte Affix-Beiträge vor dem Neuaufbau, damit wiederholtes Veredeln keine Stats mehrfach aufaddiert.

### UI / UX
- appweites mobiles Design-System
- kompakte Header und größere nutzbare Spielfläche
- fünfteilige symmetrische Fußnavigation
- semantische Farbverwendung für Aktion, Belohnung, Erfolg und Gefahr
- reduzierte Kartenverschachtelung und Schatten
- Smartphone-Safe-Areas werden berücksichtigt
- wichtige Spielinformationen verwenden mobil lesbare Schriftgrößen
- gemeinsames Modal-/Pop-up-Muster für Itemdetails in Held, Händler und Bank
- Arcane-Fantasy-Ladescreen während des App-Boots

### Eigene Grafiken & Icons
Die UI wird schrittweise vollständig von Emoji-/Legacy-Platzhaltern auf eigene Dark-Arcane-Fantasy-Assets umgestellt.

Unter anderem vorhanden bzw. integriert:
- eigene Navigation-/Bereichsicons
- Katakomben-Raum- und Gegnergrafiken
- Itemgrafiken
- Charakter-/Heldengrafiken
- Kampfhaltungen unter `assets/icons/ui`
- Auswahlicons für Kraft/Kampf, Geschick und Wissen
- Arena-Challenger-Artworks für die Build-Archetypen
- Stadt-, Händler-, Bank-, Schmiede-, Ressourcen- und Stat-Icons

Die Asset-Runtime lädt kritische Bilder zuerst und wärmt weitere Assets anschließend im Hintergrund vor. Bildassets verwenden einen getrennten langlebigen Cache, damit App-Updates nicht bei jedem Release sämtliche Grafiken neu laden müssen.

### Beta, PWA & Cache-Verhalten
- installierbare PWA über GitHub Pages
- kritische Assets werden beim Start priorisiert
- weniger wichtige Grafiken werden nach dem ersten stabilen Render im Hintergrund vorgeladen
- Code- und Bildcache sind getrennt
- aktive Spielsitzungen sollen nicht durch einen Asset-Wechsel während eines Deployments beschädigt werden
- Beta-Grafiken können über **Grafiken ↻** bzw. `?refreshAssets=1` gezielt neu geladen werden
- Reset-/Recovery-Code wird früh im Bootprozess geladen

Der Beta-Reset ist dafür vorgesehen, lokalen Spielstand, Backups und Session-Daten zu entfernen und anschließend wieder die Charaktererstellung zu öffnen. Dieser Bereich bleibt ein besonders zu testender Beta-Pfad.

### Technische Architektur / Konsolidierung
Das Projekt ist historisch aus mehreren Runtime-/Patch-Modulen gewachsen. Die technische Konsolidierung läuft aktiv weiter.

Zuletzt wurden unter anderem:
- zentrale Render- und Navigation-Authority gestärkt
- Boot-Reihenfolgen deterministischer gemacht
- alte Merchant-/Bank-Render-Wrapper entfernt
- obsolete Dungeon-Render-/Tab-Wrapper entfernt
- obsolete Forge-Render-Wrapper entfernt
- Item-/Hero-System auf das kanonische 9-Slot-Modell vereinheitlicht
- redundante Save-/Loot-Kompatibilitätswrapper entfernt
- Versions- und Asset-Laufzeit stärker zentralisiert

Ziel ist, schrittweise weniger konkurrierende Runtime-Wrapper zu besitzen und zentrale Systeme als eindeutige Source of Truth zu verwenden.

## Roadmap – nächste größere Entwicklungsblöcke

Die Reihenfolge beschreibt die aktuell geplanten größeren Arbeitspakete. Kleine Bugfixes, UI-Korrekturen, Balancing und technische Bereinigungen können parallel zwischen diesen Meilensteinen erfolgen.

### Phase 1 – Ahnenschrein & Vermächtnis-Fundament
**Ziel:** Den Ahnenschrein zum zentralen Meta-Progressionsort des Spiels ausbauen.

Geplante Anpassungen:
- Reinkarnations-Vorschau weiter verfeinern
- finale Regeln definieren, welche Ressourcen und Gegenstände bei einer Reinkarnation erhalten bleiben
- Seelenstein-Belohnungsformel anhand von Level und relevanten Fortschrittswerten balancieren
- Vermächtnisbaum als Vorschau integrieren
- zunächst drei Entwicklungsrichtungen vorsehen:
  - **Macht** – Schaden, Krit und offensive Skalierung
  - **Überleben** – Leben, Rüstung, Block und defensive Skalierung
  - **Arkana** – XP, Gold, Lootqualität und Meta-Effizienz
- Kosten- und Freischaltstruktur der permanenten Knoten definieren

Der Vermächtnisbaum soll zunächst ohne irreversible Käufe getestet werden, damit UI und Balancing vor dem Einsatz echter Seelensteine überprüft werden können.

### Phase 2 – Sicheres Reinkarnationssystem
**Ziel:** Reinkarnation als echte, irreversible Spielaktion aktivieren.

Vor Aktivierung müssen folgende Schutzmechanismen vorhanden sein:
- vollständige Vorher-/Nachher-Vorschau
- doppelte Bestätigung des Reinkarnationsvorgangs
- automatisches Savegame-Backup unmittelbar vor dem Reset
- Wiederherstellungsmöglichkeit für fehlgeschlagene oder unterbrochene Reinkarnationen
- atomare Aktualisierung des Meta-Fortschritts
- Tests für Reload, PWA-Neustart und unterbrochene Speichervorgänge

Geplanter Resetumfang:
- Level und XP
- Gold und laufabhängige Ressourcen
- aktive Quest-, Arena- und Katakombenzustände
- reguläre Progressionsausrüstung entsprechend der finalen Reset-Regeln

Dauerhaft erhalten bleiben sollen insbesondere:
- Charakteridentität
- Seelensteine
- Reinkarnationshistorie
- Vermächtnisfortschritt
- explizit als dauerhaft definierte legendäre Inhalte

### Phase 3 – Reinkarnation mit dem bestehenden Spiel verzahnen
**Ziel:** Reinkarnation soll neue Spielmöglichkeiten eröffnen und nicht nur einen schnelleren Zahlen-Reset darstellen.

Geplant:
- Katakomben skalieren mit Reinkarnationsfortschritt
- neue Elite-/Bossvarianten oder Modifikatoren
- Arena erhält zusätzliche Schwierigkeits- oder Ligaebenen
- Loot kann Reinkarnations- bzw. Endgame-Affixe erhalten
- Schmiede und Ahnenwerk erhalten zusätzliche Meta-Freischaltungen
- Quests können seltene Reinkarnationsereignisse oder höhere Belohnungsstufen erhalten
- Vermächtnisknoten können bestehende Spielmechaniken gezielt verändern

### Phase 4 – Endgame-Loop
**Ziel:** Nach der ersten Reinkarnation einen langfristig skalierenden Kernloop schaffen.

Mögliche Systeme:
- skalierende **Arkane Prüfungen** als Endlos-/Challenge-Modus
- zunehmende Katakombentiefe über die bisherigen Standardräume hinaus
- saisonunabhängige persönliche Bestwerte
- Elite-Modifikatoren und kombinierte Gegneraffixe
- Endgame-spezifische Materialien
- zusätzliche legendäre und mythische Keystone-Effekte
- stärkere Build-Spezialisierung statt ausschließlich linearer Stat-Steigerung

### Phase 5 – Klassen, Skills & Build-Tiefe
**Ziel:** Die sechs Klassen spielmechanisch deutlicher voneinander abgrenzen.

Geplant:
- Skillsets jeder Klasse weiter ausbauen
- zusätzliche Entscheidungen bei Skillrotation und Synergien
- klassenspezifische Keystone-/Legendär-Effekte
- Builds stärker mit Ausrüstung, Vermächtnis und Kampfsystem verzahnen
- bestehende Kampfhaltungen und Gegner-Archetypen weiter ausbauen

### Phase 6 – Content-Ausbau
**Ziel:** Nach Stabilisierung des Meta- und Endgame-Loops mehr spielbare Vielfalt hinzufügen.

Mögliche Erweiterungen:
- zusätzliche Questketten und seltene Ereignisse
- neue Katakombenräume und Bossbegegnungen
- weitere Stadtfunktionen, sofern sie einen klaren Gameplay-Nutzen besitzen
- zusätzliche Händler-/Schmiede-Angebote
- neue Itemfamilien, Affixe und legendäre Gegenstände
- mehr persönliche Story- und Hintergrundereignisse

### Phase 7 – Technische Konsolidierung & Release-Vorbereitung
Dieser Block läuft parallel zu allen Gameplay-Phasen weiter.

Schwerpunkte:
- verbliebene monolithische Runtime-Dateien in System-, State- und View-Schichten aufteilen
- obsolete Compatibility-Shims und Legacy-Code entfernen
- zentrale Item-, Asset-, Dialog- und Navigationsschnittstellen weiter vereinheitlichen
- automatisierte Regressionstests für Save/Load, Equipment, Reinkarnation und Kampfzustände aufbauen
- Performance und Speicherverbrauch auf mobilen Geräten messen
- PWA-Updatepfad und Offline-/Cache-Verhalten weiter härten
- README und GDD regelmäßig mit dem tatsächlichen `main`-Stand synchronisieren

## Beta-Schwerpunkte
Besonders wichtig für aktuelle Tests sind:
- Reset → neue Charaktererstellung
- Katakomben-Autokampf über längere Runs und nach Reloads
- Equipment-Migration älterer Saves
- korrektes zentrales Helden-/Ausrüstungslayout auf allen Helden-Untertabs
- Schmiede-Veredelung und Affix-Neuberechnung
- aktuelle Grafiken nach Deployment/Reload
- Arena-Build-Matchups und Haltungskonter
- Ahnenschrein und Reinkarnations-Vorschau

## Plattform
Die aktuelle Beta läuft als mobile PWA über GitHub Pages und ist primär für Smartphone-Bedienung optimiert.

## Entwicklungsregel
Nach neuen spielbaren Features, Änderungen an Kernsystemen oder relevanten technischen Änderungen wird diese README mit dem tatsächlichen Stand von `main` abgeglichen. Größere neue Systeme sollten zusätzlich gegen die Roadmap geprüft und dort nach Abschluss aktualisiert werden.
