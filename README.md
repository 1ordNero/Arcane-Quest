# Arcane Tavern & Quest – Android Beta

Mobile-first Dark-Arcane-Fantasy-RPG als installierbare Progressive Web App (PWA). Die visuelle Richtung verbindet düstere Diablo-artige Fantasy mit einer klaren, stilisierten Warcraft-artigen Lesbarkeit.

**Aktuelle Beta-Version:** v0.10.3  
**Live-Beta:** https://1ordnero.github.io/Arcane-Quest/

## Aktueller Entwicklungsstand

### Kern-Loop
- Charakter erstellen und über Quests, Katakomben und Arena entwickeln
- Gold, XP, Ausrüstung und Schmiederessourcen verdienen
- Ausrüstung und Skillrotation optimieren
- Stadt als Hub für Händler, Ahnen-Schmiede und Bank
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
- Waffen unter dem Helden: Haupthand, Zweithand

Bewusst entfernt wurden:
- Ring 2
- Gürtel
- Handschuhe

Alte Saves werden auf die aktuelle Slot-Struktur migriert. Nicht mehr verwendete ausgerüstete Gegenstände werden dabei möglichst verlustfrei ins Inventar überführt.

Weitere Held-Systeme:
- kompakte Anzeige von STR, AGI, INT, Krit, Ausweichen und Block
- Itemdetails erst nach Auswahl
- Itemvergleich im Inventar
- reload-sichere Synchronisierung des aktuellen Equipment-Layouts und der Itemgrafiken

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
Die Stadt ist der zentrale Verwaltungs-Hub:
- Händler ab Stufe 3
- Ahnen-Schmiede ab Stufe 5
- Bank ab Stufe 10
- gesperrte Gebäude zeigen ihre Freischaltstufe
- einheitliche Breadcrumb-/Zurücknavigation in den Unterbereichen

### Händler
- levelskalierte Ausrüstungsangebote
- Gegenstände können aus dem Inventar verkauft werden
- mobile Listenansicht mit Itemwerten, Preis und Aktionen

### Bank
- 100 feste Tresorplätze
- Gegenstände können zwischen Rucksack und Bank verschoben werden
- Darstellung folgt dem gemeinsamen Item-UI

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

Alte Runtime-Verweise auf ersetzte Haltungs- und Entscheidungsicons wurden entfernt. Die Asset-Synchronisierung wird auch nach einem direkten Reload der Heldenseite erneut ausgeführt.

### Beta, PWA & Cache-Verhalten
- installierbare PWA über GitHub Pages
- Code und Bilder werden während der Beta bevorzugt network-first geladen
- Versions-/Cache-Bumps dienen dazu, alte Runtime-Assets nach Deployments zu verwerfen
- Updates werden so behandelt, dass aktive Spielsitzungen möglichst nicht durch einen Asset-Wechsel beschädigt werden
- Beta-Grafiken können gezielt aktualisiert werden
- Reset-/Recovery-Code wird früh im Bootprozess geladen

Der Beta-Reset ist dafür vorgesehen, lokalen Spielstand, Backups und Session-Daten zu entfernen und anschließend wieder die Charaktererstellung zu öffnen. Dieser Bereich wurde zuletzt mehrfach gegen Browser-/Boot-Race-Conditions gehärtet und bleibt ein besonders zu testender Beta-Pfad.

### Technische Architektur / Konsolidierung
Das Projekt ist historisch aus mehreren Runtime-/Patch-Modulen gewachsen. Die technische Konsolidierung läuft aktiv weiter.

Zuletzt wurden unter anderem:
- zentrale Render- und Navigation-Authority gestärkt
- Boot-Reihenfolgen deterministischer gemacht
- alte Merchant-/Bank-Render-Wrapper entfernt
- obsolete Dungeon-Render-/Tab-Wrapper entfernt
- obsolete Forge-Render-Wrapper entfernt
- ältere Kopfgeld- und Navigationsmodule entfernt

Ziel ist, schrittweise weniger konkurrierende Runtime-Wrapper zu besitzen und zentrale Systeme als eindeutige Source of Truth zu verwenden.

## Beta-Schwerpunkte
Besonders wichtig für aktuelle Tests sind:
- Reset → neue Charaktererstellung
- Katakomben-Autokampf über längere Runs und nach Reloads
- Equipment-Migration älterer Saves
- Schmiede-Veredelung und Affix-Neuberechnung
- aktuelle Grafiken nach Deployment/Reload
- Arena-Build-Matchups und Haltungskonter

## Plattform
Die aktuelle Beta läuft als mobile PWA über GitHub Pages und ist primär für Smartphone-Bedienung optimiert.

## Entwicklungsregel
Nach neuen spielbaren Features, Änderungen an Kernsystemen oder relevanten technischen Änderungen wird diese README mit dem tatsächlichen Stand von `main` abgeglichen.
