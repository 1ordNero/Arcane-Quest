# Arcane Tavern & Quest – Android Beta

Diese Beta ist als installierbare Progressive Web App (PWA) umgesetzt und auf Smartphone-Bedienung optimiert. Sie lässt sich in Chrome/Edge auf Android über „Zum Startbildschirm hinzufügen“ wie eine App installieren.

## Aktueller Entwicklungsstand

### Charakter
- Charaktereditor mit 6 Völkern, 6 Klassen und 4 Hintergründen
- kompakte, mobile Charaktererstellung
- Abschlussbildschirm mit dynamischer Heldengeschichte
- Zusammenfassung von Stärken, Klassenfokus und Schwächen
- Volk, Klasse und Attribute beeinflussen spätere Proben und Kämpfe
- kompakter Heldenscreen mit Charakterwerten, Ausrüstung und Inventar

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
- Angriffsoptionen: schneller Angriff, schwerer Angriff und Klassenaktion
- Verteidigungsoptionen: Blocken, Ausweichen und Standhalten
- jede Fähigkeit besitzt begrenzte Ladungen, wodurch unterschiedliche Aktionen genutzt werden müssen
- verbrauchte Aktionsgruppen laden sich reduziert wieder auf, sobald alle Optionen erschöpft sind
- gegnerische Angriffe werden vor der Verteidigung angekündigt
- Block- und Ausweichwahrscheinlichkeiten verändern sich abhängig vom angekündigten Angriff
- klassenspezifische Angriffsaktionen
- Treffer-, Krit-, Block- und Ausweichwahrscheinlichkeiten
- direktes Feedback nach jeder Angriffs- und Verteidigungsentscheidung
- Rüstung reduziert eingehenden Schaden
- Sieg, Niederlage und Kopfgeldbelohnungen

### Loot, Inventar & Ausrüstung
- vereinheitlichtes Item- und Ausrüstungsmodell
- Ausrüstungs-Slots für Rüstung, Waffen, Schmuck und Nebenhand
- Items können ausgerüstet, ersetzt und wieder abgelegt werden
- Itemvergleich mit aktuell getragener Ausrüstung
- Gegenstände besitzen konkrete Boni wie STR, AGI, INT, HP, Rüstung, Schaden, Krit, Block und Ausweichen
- zentrale Final-Stats aus Charakter und Ausrüstung
- Ausrüstung beeinflusst Ereignisproben und Kopfgeldkämpfe
- Loot-System v1 mit Gewöhnlich, Magisch, Selten, Mythisch und Legendär
- Questtyp-spezifische Loot-Pools für Standard, Ereignis, Risiko und Kopfgeld
- bessere Seltenheitschancen bei Risiko- und Kopfgeld-Inhalten
- Lootwerte skalieren mit Charakterlevel und Seltenheit
- kompakte Inventaransicht mit Filtern nach Slot und Seltenheit
- Sortierung nach Stärke, Seltenheit oder Name
- direkte Auf-/Abwertung gegenüber aktuell ausgerüstetem Item
- aufklappbare Itemdetails mit Wertevergleich und Ausrüstungsbutton

### Weitere vorhandene Beta-Systeme
- XP, Leveling und Gold
- Rucksack / Inventar
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
