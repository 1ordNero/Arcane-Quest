# Arcane Tavern & Quest – Android Beta

Diese Beta ist als installierbare Progressive Web App (PWA) umgesetzt und auf Smartphone-Bedienung optimiert. Sie lässt sich in Chrome/Edge auf Android über „Zum Startbildschirm hinzufügen“ wie eine App installieren.

## Aktueller Entwicklungsstand

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
- Legendäre Gegenstände werden nicht mehr als reguläre Quest- oder Kopfgeld-Drops erzeugt
- spätere Legendär-Herstellung ist an die Ahnen-Schmiede, eine mythische +10 Basis, legendäre Essenzen, Seelensteine und ein Relikt der Urahnen gebunden
- Questtyp-spezifische Loot-Pools für Standard, Ereignis, Risiko und Kopfgeld
- Risiko- und Kopfgeld-Inhalte besitzen höhere Chancen auf die besseren regulären Seltenheitsstufen
- Lootwerte skalieren mit Charakterlevel und Seltenheit

> Hinweis: Die zusätzliche Stufe „Episch“ und die Reihenfolge „Selten vor Magisch“ wurden auf Basis der aktuellen Produktentscheidung ergänzt. Das GDD selbst nennt für Auto-Verwerten gewöhnliche und magische Items sowie Mythisch und Legendär als Endgame-Stufen, definiert aber keine vollständige Zwischenstufen-Reihenfolge.

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
