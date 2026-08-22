# Arcane Quest – Release Readiness v0.15.23

Stand: 22. August 2026

## Automatisch abgesichert

- [x] JavaScript-Syntax aller Runtime-Dateien
- [x] Runtime-Graph, Assets und Load-Order
- [x] kanonische State-, Save-, Render- und Navigation-Authority
- [x] keine geladenen Zugriffe über `window.S`
- [x] Save-Schema-v4-Normalisierung und Wertebegrenzung
- [x] Hintergrundpassive „Gefallener Adeliger“
- [x] frische Charaktererstellung und persistente Wiederherstellung
- [x] Questkosten und einmalige Belohnungsvergabe
- [x] Katakombenschlüssel und Dungeon-Reload
- [x] Arena-Ausdauer nach unterbrochenem Kampf
- [x] Reinkarnation, Schlüssel-Reset und Erhalt legendärer Gegenstände
- [x] Recovery eines beschädigten Primär-Saves aus dem Backup
- [x] mobile Viewport-/Footer-Prüfung
- [x] mobile Chromium- und WebKit-Profile
- [x] PWA-Manifest und erforderliche App-Icons
- [x] Offline-Start mit persistentem Spielstand im mobilen Chromium-Profil
- [x] Aktivierung eines neuen Builds und Bereinigung alter Build-Caches
- [x] alleinige Save-Authority ohne Feature-Wrapper um `window.save`
- [x] idempotente Beutevergabe der Quest „Die versunkene Krypta“

Ausführung:

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium webkit
pnpm test
```

## Vor öffentlicher Freigabe manuell erforderlich

- [ ] vollständiger Durchlauf von Stufe 1 bis 50
- [ ] vollständiger Katakombenrun einschließlich Endboss und freiwilligem Rückzug
- [ ] alle vier Klassen und Hintergründe auf echten Geräten
- [ ] Android/Chrome im Browser und als installierte PWA
- [ ] iPhone/Safari und Home-Screen-PWA
- [ ] Offline-Start sowie Update von einer älteren installierten Version auf echten Geräten
- [ ] Save-Import/-Export mit realen Spielständen aus v0.15.19 und v0.15.20
- [ ] Händler, Bank und sämtliche Schmiedeaktionen mit vollem Inventar
- [ ] Reinkarnations-Recovery über die sichtbaren QA-Werkzeuge
- [ ] Reduced Motion, Safe Areas, Tastaturfokus und Screenreader-Grundprüfung
- [ ] Balanceprotokoll für Spielzeit, Gold, Abenteuerlust, Arena und Seelensteine

## Rechtliche Release-Blocker

- [ ] Lizenz für den Spielcode festlegen und als `LICENSE` hinzufügen
- [ ] Urheber, Quelle und Lizenz aller 208 WebP-Assets dokumentieren
- [ ] Nutzungsrechte der Schriftarten, Musik- und Audioquellen dokumentieren
- [ ] Credits/Attribution im Spiel oder in einer dauerhaft erreichbaren Datei veröffentlichen
- [ ] kurzen Datenschutzhinweis veröffentlichen: Spielstände und Telemetrie bleiben lokal; der Build enthält derzeit keine externen Analyse- oder Tracking-Endpunkte

Die Rechts- und Lizenzentscheidungen benötigen eine ausdrückliche Freigabe des Rechteinhabers und werden nicht automatisch angenommen.

## Freigaberegel

Keine öffentliche v1.0-Freigabe bei offenen P0-/P1-Fehlern, fehlgeschlagenen automatisierten Tests, ungeklärten Assetrechten oder nicht geprüftem Save-/PWA-Updatepfad. Offene reine Balance- oder Darstellungsfehler dürfen nur mit dokumentierter Entscheidung als bekannte Einschränkungen verbleiben.
