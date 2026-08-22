# Guilds and Cosmetics

Post-v1.0 concept for asynchronous guilds and cosmetics-only progression in Arcane Quest.

## 1. Scope Decision

### v1.0: Do Not Build

Guilds are not part of the current v1.0 release candidate scope.

For v1.0, keep focus on local save authority, core loop stability, quests, catacombs, arena, items, forge, reincarnation, and release hardening.

Do not build for v1.0:

- Guild creation or joining
- Guild profiles
- Guild weekly goals
- Guild currency
- Guild shop
- Guild chat
- Guild wars
- Live raids
- Guild leaderboards
- Seasonal guild events

### Online-MVP After v1.0

Build the guild system only after local save authority and the backend MVP are stable.

The first online version should be small, asynchronous, and backend-friendly. It must not add power progression, real-time multiplayer, or social moderation burden.

### LiveOps Later

LiveOps and seasonal guild systems should come after the Online-MVP is validated.

Later additions may include seasonal banners, rotating weekly goals, prestige-only guild rankings, event cosmetics, guild hall skins, historical trophies, and returning old seasonal cosmetics.

## 2. Guild Online-MVP

The Online-MVP should contain no more than these 5 core features:

1. **Create or join a guild**
   - Guild name, tag, emblem, and visibility.
   - Roles: founder, officer, member.

2. **Guild profile**
   - Member list, guild level, weekly progress, guild currency, and last activity.

3. **Asynchronous contribution tracking**
   - Normal game activities contribute automatically to weekly goals.
   - No real-time cooperation and no direct paid progress.

4. **Weekly guild goals**
   - Three goals per week.
   - Scaled by active members.
   - Individual minimum contribution required for rewards.

5. **Cosmetic guild shop**
   - Cosmetics and guild decoration only.
   - No stats, boosts, progression shortcuts, or gameplay advantages.

## 3. Backend Data Needs

### Guild

- `guild_id`
- `name`
- `tag`
- `description`
- `emblem_shape`
- `emblem_symbol`
- `emblem_colors`
- `visibility`
- `created_at`
- `level`
- `xp`
- `currency_balance`

### GuildMember

- `guild_id`
- `user_id`
- `role`
- `joined_at`
- `last_active_at`
- `weekly_contribution`
- `weekly_reward_claimed`

### GuildWeeklyState

- `guild_id`
- `week_id`
- `active_member_count`
- `goals`
- `goal_progress`
- `goal_targets`
- `reward_state`
- `started_at`
- `ends_at`

### GuildContributionLog

- `guild_id`
- `user_id`
- `activity_type`
- `amount`
- `week_id`
- `created_at`

### GuildCosmeticUnlock

- `guild_id`
- `cosmetic_id`
- `unlocked_at`

## 4. Weekly Goal Examples

Active members are members with relevant activity during the last 7 days. Weekly targets scale from `active_member_count`, not total guild size.

### Schattenjagd

- Task: Defeat catacomb or quest enemies.
- Target: `active_member_count * 80`
- Minimum contribution for reward: `20` enemies defeated.

### Ruf der Arena

- Task: Complete arena fights.
- Target: `active_member_count * 12`
- Minimum contribution for reward: `3` arena fights.
- Wins should not count extra, so weaker players are not punished.

### Eid der Schmiede

- Task: Complete forge actions.
- Target: `active_member_count * 6`
- Minimum contribution for reward: `2` forge actions.

## 5. Guild Currency

Name: **Gildensiegel**

### Earned Through

- Completed weekly guild goals
- Individual minimum contribution
- Occasional non-purchasable event goals

### Used For

- Guild emblem shapes
- Guild emblem symbols
- Banner colors
- Profile frames
- Guild hall decoration
- Cosmetic titles
- Visual pets
- Seasonal cosmetic unlocks

### Not Used For

- XP
- Items
- Drop chances
- Arena advantages
- Forge time
- Quest progress
- Reincarnation advantages
- Any other gameplay power

## 6. Cosmetic Principles

- Cosmetics must not provide stats.
- Cosmetics must not provide XP, drop, arena, forge, quest, or reincarnation advantages.
- Cosmetics must not create faster progression or higher efficiency.
- Guild progress must not be purchasable.
- Cosmetics may show style, identity, rarity, and prestige.
- Cosmetics must never sell power.

## 7. First Cosmetic Ideas

1. **Mantel des Aschenpropheten** - character outfit
2. **Klingenhaut: Mondsplitterstahl** - weapon skin
3. **Ruestungsskin: Kryptenwaechter** - armor skin
4. **Aura: Kaltes Hexenlicht** - visual aura
5. **Titel: Eidtraeger der Tiefe** - title
6. **Profilrahmen: Dornenzirkel** - profile frame
7. **Gildenbanner: Schwarze Sonne** - guild banner
8. **Emblem-Symbol: Gebrochene Rune** - emblem symbol
9. **Begleiter: Irrlicht im Glas** - visual pet
10. **Katakombenportal-Skin: Knochenbogen** - portal skin
