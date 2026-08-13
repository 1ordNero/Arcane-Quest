# Arcane Tavern & Quest – Das Finale
## Game Design Document (GDD)

> Verbindliche Designgrundlage für die Entwicklung von **Arcane Tavern & Quest**. Dieses Dokument überträgt das vorhandene GDD in Markdown, ohne inhaltliche Ergänzungen oder Änderungen.

Arcane Tavern & Quest ist ein zeitloses, tiefgründiges und unendlich spielbares Casual-Fantasy-RPG für Browser und Android. Es kombiniert das zugängliche Spielgefühl klassischer Tavernen-RPGs (wie Shakes & Fidget) mit moderner horizontaler Item-Progression nach dem Vorbild von Guild Wars 2, einem fairen Free-to-Play-Modell und einer unendlichen Reinkarnations-Schleife (Prestige).

## Inhaltsverzeichnis

1. Philosophie & Monetarisierung (Fair F2P)
2. Comic-Prolog, Lore & Onboarding
3. Charaktereditor & Klassensystem
4. Taverne & Questsystem
5. Kampfsystem, AGI-Initiative & Skills
6. Inventar, Bank & Auto-Verwerten
7. Die Ahnen-Schmiede & Legendäre Items ★
8. Dungeons & Der Prüfungsturm
9. PvP-Arena & Liga-System
10. Gildensystem & Weltbosse
11. Seelen-Reinkarnation (Prestige / New Game+)
12. Wirtschafts- & Ökonomie-Balancing

---

## 1. Philosophie & Monetarisierung (Fair F2P)

Das Spiel verzichtet bewusst auf manipulative Pay-to-Win-Mechaniken, um Chancengleichheit und Entspannung für Casual-Spieler zu garantieren:

- **Keine Premium-Währung:** Es existieren keine Pilze, Edelsteine oder Kauf-Diamanten. Im Spiel gibt es ausschließlich Gold (Ingame-Währung) und Seelensteine (Prestige-Währung).
- **Kein Battle-Pass / Kein Abo:** Kein täglicher Druck durch monatliche Pässe.
- **Rein kosmetischer Shop:** Spieler können mit Echtgeld ausschließlich optische Skins (Heldenskins, alternative Waffen-Looks, Tavernen-Hintergrund-Skins) erwerben.
- **Null Statuswerte-Vorteil:** Gekaufte Kosmetika gewähren +0 Angriff und +0 Gold. Fortschritt wird rein durch Spielzeit, Strategie und Aktivität erreicht.

## 2. Comic-Prolog, Lore & Onboarding

### Comic-Prolog (Intro)

Beim allerersten Spielstart wird die Vorgeschichte in 3 handgezeichneten Comic-Panels erzählt:

1. **Panel 1:** Eine friedliche, alte Taverne am Rande der verrufenen Schattenlande.
2. **Panel 2:** Ein violetter Arkan-Riss bricht am Himmel auf. Das leuchtende „Arkane Herz“ schlägt als Komet im Keller der Taverne ein.
3. **Panel 3:** Monster erwachen in den Katakomben. Der Wirt reicht dem jungen Helden ein verrostetes Schwert: „Deine Reise beginnt jetzt!“

### Sanftes Feature-Gating (Stufen-Freischaltung)

Um Einsteiger nicht mit Systemen zu überfordern, schalten sich die Module stufenweise frei:

| Stufe | Freischaltung |
|---:|---|
| 1 | 📜 Taverne, Rucksack (15 Plätze) & Basis-Profil |
| 3 | ⚔️ Arena (PvP-Ligen) & Händler |
| 5 | 🔨 Ahnen-Schmiede & Auto-Verwerten |
| 10 | 🏰 Dungeons (Schlüssel-System) & Bank (100 Plätze) |
| 15 | Gildensystem & Weltbosse |
| 100 | 🌌 Seelen-Reinkarnation (Prestige / New Game+) |

## 3. Charaktereditor & Klassensystem

Der Charaktereditor bietet strategische Tiefe durch Volk, Klasse, Hintergrund und Volk-Klassen-Synergien.

### A. Völker & Volks-Passiven

| Volk | Hauptattribut-Bonus | Volks-Passive | Effekt |
|---|---|---|---|
| Mensch | Balanced (+2 STR, +2 AGI, +2 INT) | Anpassungsfähigkeit | Permanent +10% XP-Gewinn |
| Elf | +4 AGI, +2 INT | Arkaner Reflex | +5% Ausweichen, +3% Krit-Chance |
| Zwerg | +4 STR, +2 HP | Steinblut | Permanent +15% Rüstungswert |
| Ork | +5 STR, +1 AGI | Blutrausch | +25% Schaden gegen Gegner unter 30% HP |
| Nachtläufer | +4 AGI, +2 INT | Schattenschritt | +5% Vampirismus (Life-Steal), 1. Schlag kritisch |
| Drachengeborener | +3 STR, +3 INT | Drachenatem | 10% Chance auf Elementarbrand (DoT über 3 Runden) |

### B. Klassen & Ressourcen

- **Krieger (Stärke / Wut):** Tank-Klasse. Baut Wut auf und nutzt Schildwall, um Angriffe zu blocken.
- **Magier (Intelligenz / Mana):** High-Burst. Nutzt Arkaner Meteor und ignoriert gegnerische Rüstung teilweise.
- **Druide (Flexibel / Naturfokus):** Hybrid. Wechselt passiv die Gestalt (Bär = Tank, Katze = Krit-Dealer, Mensch = Support).
- **Waldläufer (Beweglichkeit / Energie):** Hohe Angriffsfrequenz, hohes Ausweichen und Pfeilhagel.
- **Hexenmeister (Intelligenz/AGI / Seelenfragmente):** Flüche, Debuffs und Seelenentzug (Life-Steal).
- **Totenbeschwörer (Intelligenz/STR / Essenz des Todes):** Beschwört Skelett-Diener, die Schaden abfangen.

### C. Hintergründe

- **Tavernen-Stammgast:** +15% Abenteuerlust-Effizienz.
- **Gefallener Adeliger:** +10% Gold aus allen Quellen.
- **Runenschmied-Lehrling:** +10% Erfolgschance beim Aufwerten in der Schmiede.
- **Schatten-Ausreißer:** +5% Beute-Glück (Höhere Chance auf seltene Drops).

## 4. Taverne & Questsystem

### Abenteuerlust & Offline-Fortschritt

- **100 Minuten Abenteuerlust (AL):** Das tägliche Quest-Budget. Es kann nicht durch Tränke, Gold oder Echtgeld aufgefüllt werden.
- **Automatischer Wachtdienst (Offline-Gain):** Nach dem Ausloggen geht der Held automatisch auf Stadt-Wache. Beim nächsten Login erhält der Spieler Gold und XP (gedeckelt auf max. 12 Stunden).

### Quest-Typen

1. **Standard-Raubzüge:** Bieten feste Verhältnisse von Gold, XP und AL-Kosten.
2. **Interaktive Event-Quests:** Bieten Entscheidungen mit Attributs-Checks (STR, AGI, INT).
3. **Kopfgeld-Quests:** Jagd auf schwierige Mini-Bosse für Handwerks-Materialien.
4. **Risiko-Quests:** Hohe Mali im Kampf, dafür massive Gold-Belohnungen.

## 5. Kampfsystem, AGI-Initiative & Skills

- **Initiative:** Die Beweglichkeit (AGI) bestimmt, wer zuerst angreift. Bei >50% AGI-Vorsprung besteht die Chance auf Doppel-Angriffe in derselben Runde.
- **Skilltree-Ablauf:** Der Spieler stellt vor dem Kampf eine feste Abfolge von 3–4 Skills ein, die automatisch nacheinander im Kampf gezündet werden.
- **Status-Effekte:** Effekte wie Gift oder Bluten erneuern bei erneutem Treffer lediglich ihre Wirkungsdauer und stapeln sich nicht ins Unendliche.
- **Boss-Immunitäten:** Bosse können spezifische Immunitäten besitzen (z.B. „Immun gegen Betäubung“).

## 6. Inventar, Bank & Auto-Verwerten

- **11 Ausrüstungs-Slots:** Kopf, Brust, Schulter, Beine, Gürtel, Stiefel, Amulett, Ring 1, Ring 2, Haupthand, Zweithand.
- **Rucksack:** Startet bei 15 Plätzen und ist für Gold auf bis zu 50 Plätze erweiterbar.
- **Die Bank:** 100 Tresorplätze in der Stadt zur freien Aufbewahrung.
- **Auto-Verwerten:** Schalter im Inventar, um gewöhnliche (graue) und magische (grüne) Items beim Einsammeln automatisch in Entzauberungs-Staub umzuwandeln.

## 7. Die Ahnen-Schmiede & Legendäre Items ★

### Horizontale Progression (Das GW2-Prinzip)

- **Mythisch (Maximum Stat Cap):** Das Höchstmaß an Kampfwerte-Macht (2.3× Multiplikator).
- **Legendär ★ (Das ultimative Prestige):** Hat dieselben Kampfwerte wie Mythisch, bietet aber:
  - Freies Stat-Swapping: Kostenlose Anpassung der Hauptattribute jederzeit.
  - Visual Prestige: Goldene Partikel-Aura, schimmernde Ränder, exklusive Schlag-Effekte.
  - Utility-Bonus: Permanent +15% Gold-Fund.

### Rezept für ein Legendäres Item ★

1. 1× Mythische Basis (+10 aufgewertet)
2. 100× Legendäre Essenzen (Drop aus hohen Dungeons & Weltbossen)
3. 50× Seelensteine (Aus der Seelen-Reinkarnation)
4. 1× Relikt der Urahnen (Extrem seltener Droplist-Fund)

## 8. Dungeons & Der Prüfungsturm

- **Freischaltung:** Erste Katakomben ab Stufe 10 via Schlüssel-Fund.
- **Harte Endbosse (Ebene 10):** Bosse besitzen Phasen-Schilde, Enrage-Timer (Wut-Rausch ab Runde 10) oder Schadens-Immunitäten.
- **Der Prüfungsturm:** Endloses Endgame-Dungeon mit mathematisch skalierenden Monstern (1.18^Ebene) und wöchentlich wechselnden Elementar-Affixen.

## 9. PvP-Arena & Liga-System

- **Asynchrones PvP:** Wähle aus 3 Gegnern (Einfach, Ebenbürtig, Herausforderer).
- **3 Kampf-Haltungen:**
  - **Aggressiv:** +15% Crit-Chance, -10% Rüstung.
  - **Defensiv:** +20% Rüstung, -10% Schaden.
  - **Konter:** +15% Ausweichen & Konterschaden.
- **Ligen-System:** Aufstieg von Bronze bis Legenden (Top 100).
- **Gladiatoren-Shop:** Belohnungen für Ruhmesmünzen (Auren, Rahmen, Edelstein-Säcke).

## 10. Gildensystem & Weltbosse

- **Festungsausbau:** Taverne (+Gold), Bibliothek (+XP) und Waffenkammer (bis zu 30 Mitglieder).
- **Gilden-Weltbosse:** Giganten mit Milliarden HP und Phasen-Schilden. Alle Mitglieder haben 3 Angriffs-Tickets pro Tag, um gemeinsam den Boss über Tage hinweg niederzuringen.

## 11. Seelen-Reinkarnation (Prestige / New Game+)

- **Freischaltung:** Ab Level 100 oder Dungeon-Ebene 20.
- **Der Reset:** Level, Gold, normales Equipment und Dungeon-Fortschritt werden auf 0 zurückgesetzt.
- **Das Vermächtnis:** Der Spieler erhält Seelensteine für den Arkan-Talentbaum.
- **Dauerhafter Besitz:** Das Arkane Herz (Relikt), Legendäre Items ★, Gilden-Boni, Titel, Auren und Ruhmesmünzen bleiben ewig erhalten.

## 12. Wirtschafts- & Ökonomie-Balancing

- **Exponentielle Attributskosten:** `Kosten_Attribut(n) = Basis-Kosten × (1.08)^n`. Verhindert, dass Gold wertlos wird oder Attribute unendlich gespammt werden.
- **Entzaubern statt Verkaufen:** Items bringen beim Händler nur 10–15% Goldwert, werden aber primär kostenlos für Schmiede-Essenzen zerlegt.
- **Gold-Sinks:** Attributs-Trainer, Rucksack-Erweiterungen, Schmiede-Aufwertungen (+1 bis +10) und Gilden-Spenden spülen Gold kontinuierlich aus dem Spiel.

---

## Entwicklungsregel für Codex

Dieses Dokument ist die **Quelle für die im GDD festgelegten Spielinhalte**. Bei der Implementierung soll Codex:

1. die hier genannten Begriffe, Werte, Freischaltungen und Systeme beibehalten;
2. keine fehlenden Spielregeln stillschweigend erfinden oder als GDD-Fakten darstellen;
3. bei technischen Entscheidungen die bestehende Web-/Android-Zielsetzung berücksichtigen;
4. neue Mechaniken klar als Implementierungsentscheidung kennzeichnen, wenn sie nicht im GDD festgelegt sind;
5. bestehende funktionierende Spielsysteme nicht ohne Grund entfernen oder ersetzen;
6. bei widersprüchlichen oder unklaren Anforderungen auf die Unklarheit hinweisen, statt eine neue Regel als verbindlich anzunehmen.

> Hinweis: Die Entwicklungsregeln am Ende sind eine technische Arbeitsanweisung für Codex und **kein zusätzlicher Spielinhalt des ursprünglichen GDD**. Der Spielinhalt darüber entspricht dem bereitgestellten GDD.
