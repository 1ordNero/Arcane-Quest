# Arcane Tavern & Quest – Android Beta

Diese Beta ist als installierbare Progressive Web App (PWA) umgesetzt und auf Smartphone-Bedienung optimiert. Sie lässt sich in Chrome/Edge auf Android über „Zum Startbildschirm hinzufügen“ wie eine App installieren.

## Aktueller Entwicklungsstand

### Navigation & Mobile UI
- fünf feste Hauptbereiche in der unteren Navigation: Taverne, Katakomben, Held, Schmiede und Arena
- Held ist als zentraler, runder und über die Navigationsleiste hinausragender Hauptbutton hervorgehoben
- Taverne und Katakomben liegen links vom Held; Schmiede und Arena rechts
- Katakomben besitzen zusätzlich eine sichtbare Zurück-/Verlassen-Navigation
- der separate Rucksack-Tab ist entfernt; Inventar und Ausrüstung befinden sich vollständig im Held-Bereich

### Charakter
- Charaktereditor mit 6 Völkern, 6 Klassen und 4 Hintergründen
- kompakte, mobile Charaktererstellung
- Abschlussbildschirm mit dynamischer Heldengeschichte
- Zusammenfassung von Stärken, Klassenfokus und Schwächen
- Volk, Klasse und Attribute beeinflussen spätere Proben und Kämpfe
- kompakter Heldenscreen mit Charakterwerten, Ausrüstung und vollständig integriertem Inventar

### Quests & Abenteuerlust
- tägliche Abenteuerlust mit Reset nach Tageswechsel
- Questkarten als aufklappbare Accordion-Ansicht
- immer nur eine aktive Quest gleichzeitig
- Quest-Timer läuft tabübergreifend weiter
- Standard-, Ereignis-, Kopfgeld- und Risikoquests
- Quest-Abschlussbildschirm mit Gold, XP, Materialien, Items und Level-Up
- Ereignis- und Risikoquests verwenden das zentrale Loot-System statt Platzhalter-Beute

### Ereignisquests
- mehrstufige Ereignisse mit unterschiedlichen Entscheidungen
- unsichtbares Zufalls-/Wahrscheinlichkeitssystem statt sichtbarer Würfel
- STR-, AGI- und INT-Proben
- Erfolgschancen werden durch Charakterwerte, Volk, Klasse und Ausrüstung beeinflusst
- kritischer Erfolg, Erfolg, Fehlschlag und kritischer Fehlschlag
- eigener Feedback-Screen nach jeder Entscheidung
- Entscheidungen beeinflussen Questbelohnungen und mögliche Beute

### Kopfgeld & Kampf
- Mini-Boss-Kampfsystem am Beispiel „Der Knochenhauer“
- rundenbasierte Kämpfe mit Spieler- und Gegner-HP
- klar getrennte Angriffs- und Verteidigungsphasen
- Ablauf: Angriff → gegnerische Angriffsvorschau → Verteidigung → nächster Angriff
- kostenloser Basisangriff „Einfacher Schlag“ ohne Ladungen und ohne Fokuskosten
- Angriffsoptionen mit begrenzten Ladungen: schneller Angriff, schwerer Angriff und Klassenaktion
- Verteidigungsoptionen mit begrenzten Ladungen: Blocken, Ausweichen und Standhalten
- Fokus-System, Boss-Verwundbarkeit, drei Bossphasen und laufende Kampfwertung von S bis C
- höhere Kampfwertung erhöht Gold, XP, Essenzen und die Chance auf bessere Loot-Seltenheit
- Rüstung, Block, Ausweichen, Krit und Ausrüstung beeinflussen den Kampf

### Dungeons – Katakomben v1
- gemäß GDD regulär ab Stufe 10 über einen gefundenen Schlüssel zugänglich
- für die aktuelle Beta-Testphase ist der Dungeon unabhängig von der Charakterstufe direkt freigeschaltet
- beim Laden werden für den Beta-Test mindestens 5 Katakomben-Schlüssel bereitgestellt; verbrauchte Testschlüssel werden bei Bedarf wieder aufgefüllt
- der Eintrittsbutton ist während der Beta unabhängig vom Level aktiv
- ein Schlüssel wird beim Betreten verbraucht
- erste spielbare Expedition mit fünf aufeinanderfolgenden Räumen
- Mischung aus Attributs-Ereignissen, normalen Kämpfen und einem Endboss
- Ereignisräume verwenden STR-, AGI- oder INT-Proben und können Gold, Beute oder HP-Verlust erzeugen
- Kampfräume besitzen Angriffs- und Verteidigungsphasen sowie angekündigte gegnerische Angriffe
- drei Angriffsvarianten und Blocken, Ausweichen oder Standhalten als Verteidigung
- HP bleiben über die gesamte Expedition erhalten
- Gold, XP und gefundene Items werden während des Runs als Dungeon-Beute gesammelt
- freiwilliges Verlassen sichert die bis dahin gesammelte Beute; Niederlage verliert ungesicherte Dungeon-Beute
- Endboss „Hüter der Katakomben“ schließt die erste Expedition ab
- Dungeon-Loot nutzt das bestehende Item-System; Legendär bleibt von regulären Drops ausgeschlossen
- die im GDD vorgesehene vollständige 10-Ebenen-Struktur mit Phasenschilden, Enrage und Immunitäten ist für die nächste Dungeon-Ausbaustufe vorgesehen

### Loot, Inventar & Ausrüstung
- Inventar ist vollständig in den Held-Tab integriert; der separate Rucksack-Tab wurde aus der Navigation entfernt
- GDD-Ausrüstung mit 11 Slots: Kopf, Brust, Schulter, Beine, Gürtel, Stiefel, Amulett, Ring 1, Ring 2, Haupthand und Zweithand
- Items können direkt im Held-Tab betrachtet, verglichen, ausgerüstet, ersetzt und abgelegt werden
- Gegenstände besitzen konkrete Boni wie STR, AGI, INT, HP, Rüstung, Schaden, Krit, Block und Ausweichen
- zentrale Final-Stats aus Charakter und Ausrüstung
- Seltenheit wird im Inventar primär über farbige Item-Rahmen und Leuchteffekte dargestellt statt über ausgeschriebene Seltenheitsnamen
- aktuelle Progressionsreihenfolge: Gewöhnlich → Selten → Magisch → Episch → Mythisch → Legendär
- Gewöhnlich ist häufig; Selten, Magisch und Episch werden stufenweise seltener; Mythisch ist die seltenste reguläre Drop-Stufe
- Mythisch bildet gemäß GDD das Maximum der regulären Kampfwerte mit 2,3× Multiplikator
- Legendär besitzt gemäß GDD dieselben Kampfwerte wie Mythisch und ist als Prestige-Stufe für die Ahnen-Schmiede vorgesehen
- Legendäre Gegenstände werden nicht mehr als reguläre Quest-, Kopfgeld- oder Dungeon-Drops erzeugt
- spätere Legendär-Herstellung ist an die Ahnen-Schmiede, eine mythische +10 Basis, legendäre Essenzen, Seelensteine und ein Relikt der Urahnen gebunden
- Questtyp-spezifische Loot-Pools für Standard, Ereignis, Risiko und Kopfgeld
- Risiko-, Kopfgeld- und Dungeon-Inhalte besitzen höhere Chancen auf bessere reguläre Seltenheitsstufen
- Lootwerte skalieren mit Charakterlevel und Seltenheit

> Hinweis: Die zusätzliche Stufe „Episch“ und die Reihenfolge „Selten vor Magisch“ wurden auf Basis der aktuellen Produktentscheidung ergänzt. Das GDD selbst nennt für Auto-Verwerten gewöhnliche und magische Items sowie Mythisch und Legendär als Endgame-Stufen, definiert aber keine vollständige Zwischenstufen-Reihenfolge.

### Technische Bereinigung
- veraltete Kopfgeld-Kampfversionen v1, v2 und v3 wurden aus dem Repository entfernt
- `index.html` lädt nur noch die aktuell benötigten Kampfmodule v4 und v5
- weitere Module werden erst entfernt, wenn ihre noch benötigte Logik vollständig konsolidiert wurde

### Weitere vorhandene Beta-Systeme
- XP, Leveling und Gold
- Ahnen-Schmiede-Prototyp
- Arena-Prototyp
- Feature-Gating gemäß GDD
- lokaler Spielstand via localStorage

## Android

Die Beta läuft aktuell als PWA über GitHub Pages. Auf Android kann sie in Chrome über „Zum Startbildschirm hinzufügen“ bzw. „App installieren“ installiert werden.

**Live-Beta:** https://1ordnero.github.io/Arcane-Quest/

Für einen späteren echten APK-Build kann das Web-Frontend in eine Capacitor-, TWA- oder vergleichbare Android-Hülle integriert werden.

## Entwicklungsregel

Nach neuen spielbaren Features oder relevanten Änderungen wird diese README aktualisiert, damit der aktuelle Funktionsumfang des Projekts nachvollziehbar bleibt.
