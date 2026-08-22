# Backend MVP

## 1. Scope Decision

Arcane Quest will prioritize a local-first game architecture before adding online backend features. The backend MVP is explicitly post-v1.0 work and should not start before the runtime and save system are hardened.

The initial online MVP should cover only the minimum infrastructure needed for:

- Cloud save snapshots
- Leaderboards
- Guilds
- Cosmetics inventory
- Account identity
- Basic abuse and anti-cheat controls

The local save authority remains the source of truth until the online layer is mature enough to safely participate in conflict resolution. The backend should sync and validate selected data, not become the primary game runtime authority in the MVP.

Real-money shop logic, platform IAP handling, trading, realtime multiplayer, and server-authoritative combat are out of scope for the first backend MVP.

## 2. Recommended Stack

Recommended stack:

- Supabase Auth
- Supabase Postgres
- Row Level Security
- A small set of Edge Functions for sensitive writes
- Optional Supabase Storage for larger save payloads

Supabase is preferred over Firebase for this MVP because Arcane Quest's planned online data is relational: users, save snapshots, leaderboard entries, guilds, guild memberships, cosmetics, and inventories. Postgres gives clearer constraints, joins, indexes, and auditability for these relationships.

Firebase remains a reasonable alternative for apps that need fast client-side realtime sync and a document-first model, but the Arcane Quest MVP is better served by relational data and SQL-backed validation.

A custom backend should be deferred. It would add operational cost too early: authentication, session handling, migrations, backups, permissions, rate limits, admin workflows, and security review. A custom service can be introduced later for specific server-authoritative systems if the game needs them.

Pricing must be checked before adoption.

## 3. Data Model

### users

Stores the public player profile and moderation state for an authenticated account.

Suggested fields:

- `id uuid primary key`
- `display_name text`
- `avatar_cosmetic_id uuid null`
- `created_at timestamptz`
- `last_seen_at timestamptz`
- `is_banned boolean default false`
- `role text default 'player'`

`id` should match the Supabase Auth user id.

### save_snapshots

Stores append-only cloud save snapshots.

Suggested fields:

- `id uuid primary key`
- `user_id uuid references users(id)`
- `slot text`
- `version integer`
- `client_build text`
- `schema_version integer`
- `checksum text`
- `save_json jsonb null`
- `storage_path text null`
- `created_at timestamptz`
- `superseded_by uuid null references save_snapshots(id)`

The MVP should use append-only writes. The current cloud save is the latest valid snapshot for a user and slot. This avoids destructive overwrite bugs and keeps rollback possible.

Use `save_json` for small payloads. Use `storage_path` if save files become too large or need object-storage lifecycle controls.

### leaderboard_entries

Stores validated or pending leaderboard submissions.

Suggested fields:

- `id uuid primary key`
- `user_id uuid references users(id)`
- `season_id text`
- `board_key text`
- `score bigint`
- `run_id text`
- `save_snapshot_id uuid null references save_snapshots(id)`
- `client_build text`
- `submitted_at timestamptz`
- `validated_status text`
- `metadata jsonb`

Suggested statuses:

- `pending`
- `accepted`
- `rejected`
- `flagged`

Recommended uniqueness:

- Unique best-entry constraint per `(season_id, board_key, user_id)` if only the best score is stored.
- Separate run history can be added later if full submission history is needed.

### guilds

Stores guild identity and public guild state.

Suggested fields:

- `id uuid primary key`
- `name text unique`
- `tag text unique`
- `description text`
- `owner_user_id uuid references users(id)`
- `created_at timestamptz`
- `visibility text`
- `level integer default 1`
- `xp bigint default 0`

Suggested visibility values:

- `public`
- `invite_only`

### guild_memberships

Stores player membership in guilds.

Suggested fields:

- `guild_id uuid references guilds(id)`
- `user_id uuid references users(id)`
- `role text`
- `joined_at timestamptz`
- `contribution_xp bigint default 0`

Primary key:

- `(guild_id, user_id)`

Suggested roles:

- `owner`
- `officer`
- `member`

The MVP should allow one active guild membership per user unless there is a clear product reason to support multiple guilds.

### cosmetics

Stores the canonical catalog of cosmetics.

Suggested fields:

- `id uuid primary key`
- `key text unique`
- `type text`
- `rarity text`
- `source text`
- `is_active boolean default true`

Suggested cosmetic types:

- `skin`
- `portrait`
- `title`
- `effect`

Suggested sources:

- `achievement`
- `event`
- `grant`

Do not include real-money purchase handling in the first backend MVP.

### cosmetics_inventory

Stores which cosmetics a user owns.

Suggested fields:

- `user_id uuid references users(id)`
- `cosmetic_id uuid references cosmetics(id)`
- `acquired_at timestamptz`
- `source_ref text null`

Primary key:

- `(user_id, cosmetic_id)`

Inventory grants should be server-side only.

## 4. Minimal PWA API

The PWA may read safe data directly through Supabase client APIs when protected by RLS. Sensitive writes should go through Edge Functions.

### Auth and Profile

- `GET /me`
- `PATCH /me`

Allowed behavior:

- Read own profile.
- Update display name and selected avatar cosmetic.
- Reject profile updates for banned users.

### Cloud Saves

- `GET /saves`
- `GET /saves/latest?slot=main`
- `POST /saves/snapshots`

Allowed behavior:

- Read own save snapshots.
- Create a new snapshot for own account.
- Never overwrite or delete existing snapshots from the client.

Conflict resolution should remain explicit in the PWA: local newer, cloud newer, or manual choice.

### Leaderboards

- `GET /leaderboards/:boardKey?season=current`
- `POST /leaderboards/:boardKey/submit`

Allowed behavior:

- Read accepted public leaderboard entries.
- Submit score attempts only through an Edge Function.
- Store new submissions as `pending`, `accepted`, `rejected`, or `flagged` after validation.

The client must not directly insert accepted leaderboard entries.

### Guilds

- `GET /guilds/search`
- `GET /guilds/:id`
- `POST /guilds`
- `POST /guilds/:id/join`
- `POST /guilds/:id/leave`

Allowed behavior:

- Search public guilds.
- Create a guild through server-side validation.
- Join or leave according to guild visibility and membership rules.
- Restrict officer and owner actions to server-side or RLS-checked flows.

### Cosmetics

- `GET /cosmetics`
- `GET /inventory`
- `POST /cosmetics/equip`

Allowed behavior:

- Read active cosmetic catalog.
- Read own inventory.
- Equip only owned cosmetics.
- Grant inventory entries only from server-side trusted flows.

## 5. Auth Strategy

Recommended strategy: device-first with optional account upgrade.

The MVP should allow players to start without forced login. The first session can create an anonymous account or local-only identity. Login should be introduced as an upgrade path for cloud saves, guilds, leaderboard identity, and cross-device use.

Recommended flow:

1. Player starts locally without account friction.
2. The PWA creates or associates an anonymous backend identity only when online features are enabled.
3. Cloud save sync requires explicit player consent.
4. Player can later link a persistent login provider.
5. Existing anonymous data migrates into the linked account.

Supported login methods can be decided later. Good candidates are:

- Email magic link
- Google
- Apple
- Discord

Do not require login for core offline play before v1.0.

## 6. Anti-Cheat Baseline

The backend MVP should not try to fully prevent client-side cheating. It should block obvious abuse, preserve audit data, and keep public leaderboards credible.

Baseline controls:

- Leaderboard writes only through Edge Functions or trusted server code.
- No direct client writes to accepted leaderboard rows.
- Rate limits per user and device signal.
- Store `client_build`, `schema_version`, `run_id`, and `checksum`.
- Reject impossible values for score, time, level, floor, currency, inventory, or progression.
- Compare submitted score against the referenced save snapshot where possible.
- Mark suspicious submissions as `flagged` instead of deleting them.
- Require stricter validation for top leaderboard ranks.
- Allow user-level ban or leaderboard exclusion flags.

Examples of plausibility checks:

- Minimum possible run duration.
- Maximum reachable floor for the submitted build.
- Score range for the reported mode.
- Required progression milestones.
- Save schema compatibility.
- Duplicate `run_id` rejection.

Replay upload, deterministic server verification, and full telemetry-based cheat detection should be deferred until the leaderboard design proves it needs them.

## 7. RLS Rules Overview

RLS must be enabled for all tables exposed to the PWA.

Recommended policy shape:

### users

- Users can read their own full profile.
- Users can read public profile fields for leaderboard and guild display.
- Users can update only safe fields on their own profile.
- Moderation fields are server-only.

### save_snapshots

- Users can read only their own save snapshots.
- Users can insert snapshots only for their own user id.
- Users cannot update or delete snapshots from the client.
- Server code may mark snapshots superseded or invalid.

### leaderboard_entries

- Anyone can read accepted public entries.
- Users cannot directly insert accepted entries.
- Submissions should be created or finalized by Edge Functions.
- Users may read their own pending, rejected, or flagged submissions if the product needs that feedback.

### guilds

- Public guilds are readable.
- Guild creation should be server-validated.
- Guild updates are limited to owner or officer roles.
- Ownership transfer should be server-side only.

### guild_memberships

- Users can read memberships for visible guilds.
- Users can read their own membership.
- Join and leave operations should enforce membership limits and guild visibility.
- Role changes are owner or officer controlled and should be server-side or tightly checked.

### cosmetics

- Active cosmetics are publicly readable.
- Inactive or unreleased cosmetics are server/admin-only.
- Client cannot create, update, or delete cosmetics.

### cosmetics_inventory

- Users can read only their own inventory.
- Users cannot grant cosmetics to themselves.
- Inventory inserts are server-side only.
- Equip operations must verify ownership.

## 8. Explicitly Deferred Until After MVP

The following are deferred until after the first backend MVP:

- Real-money shop logic
- Platform IAP validation
- Refund and entitlement reconciliation
- Trading between players
- Guild wars
- Guild raids
- Guild bank
- Realtime multiplayer
- Server-authoritative combat
- Server-authoritative loot generation
- Full replay upload and verification
- Telemetry-heavy cheat detection
- Advanced admin dashboard
- Complex cross-account merge workflows
- LiveOps tooling for seasons and events
- Chat, direct messages, and moderation systems

These systems should be designed only after v1.0 proves the runtime, local save authority, and online MVP requirements.
