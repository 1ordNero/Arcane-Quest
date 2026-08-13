# Arcane Tavern & Quest – Android Beta

Diese Beta ist als installierbare Progressive Web App (PWA) umgesetzt und auf Smartphone-Bedienung optimiert. Sie lässt sich in Chrome/Edge auf Android über „Zum Startbildschirm hinzufügen“ wie eine App installieren.

## Enthaltene Beta-Systeme
- Comic-/Lore-artiger Einstiegstext und Tavernen-Hub
- Charaktereditor: 6 Völker, 6 Klassen, 4 Hintergründe
- Abenteuerlust, Standard-/Event-/Risiko-Quests
- XP, Leveling, Gold und Offline-Wachdienst bis 12h
- Automatisches rundenbasiertes Kampfsystem mit Skill-Sequenz-Gefühl
- Rucksack und Auto-Verwertung
- Ahnen-Schmiede-Prototyp
- Arena-Prototyp
- Feature-Gating gemäß GDD
- lokaler Spielstand via localStorage

## Android
`index.html`, `app.js`, `manifest.webmanifest` und `icon.svg` auf einen Webserver legen oder lokal öffnen. Für die komfortable Installation auf Android: Chrome → Menü → „Zum Startbildschirm hinzufügen“ / „App installieren“.

Für einen echten APK-Build kann dieses Web-Frontend anschließend in eine WebView/Capacitor/TWA-Hülle gepackt werden.
