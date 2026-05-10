# Frontend Design

Scale constraint inherited from the platform: the audience surface must remain responsive while subscribed to a chat channel publishing up to 400K msg/sec at the broker. The local render rate is bounded by viewport, but the **ingest rate** at the WebSocket is not — design accordingly.

---

## Goals

- Single SPA, three role surfaces, one bundle (code-split per route).
- Auth identical for all roles at the protocol level (`POST /api/auth/token` → JWT). UX paths differ.
- Realtime subscriptions driven by role + session, gated server-side; client treats subscription rejection as a permission signal, not an error.
- Live chat rendering survives sustained high message rates without locking the main thread.
- No business logic in components. Hooks own data + realtime; components render.

---

## Stack (reference)

| Layer | Choice | Notes |
|---|---|---|
| Build | NextJs 16.2.4 | Dev proxies `/api/*` and `/connection/*` to backend `:8080` and `:8000` |
| Language | TypeScript (strict) | `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` on |
| UI | React 18 | Concurrent features used for chat batching (`startTransition`) |
| Routing | NextJs App Router | File-based via createBrowserRouter, role-gated loaders |
| Server state | TanStack Query v5 | All REST reads + mutations |
| Client state | Zustand | Ephemeral UI state, connection status, session selection |
| Realtime | `centrifuge-js` | One `Centrifuge` instance per app; subscriptions per channel |
| Styling | Tailwind v4 + shadcn/ui | shadcn copied in, owned in-repo |
| Forms | react-hook-form + zod | Schema validation mirrors backend DTOs |
| Pkg manager | npm | |
| Tests | vitest + Testing Library + Playwright (later) | |

---

## Role Surfaces

Each surface is a route subtree mounted at a stable prefix. Login flow lands the user on the right surface; the router does not let a user open a surface outside their role.

| Surface | Route prefix | Entry path | Audience |
|---|---|---|---|
| Creator dashboard | `/c/*` | `/login` → `/c/sessions` → `/c/s/:sessionId` | role = `creator` |
| Team moderator | `/t/*` | **DEFERRED** — currently redirects to `/error` | role = `team` (future) |
| Audience | `/join`, `/a/s/:sessionId` | magic-link `/join?session=…&invite=…` → `/a/s/:sessionId` | role = `audience` |
| Public | `/login`, `/join`, `/ended`, `/error` | — | unauthenticated |

The router is a single `createBrowserRouter` with two active role-tree segments (creator, audience). A loader at each tree root enforces role: if the in-memory JWT's `role` claim does not match the tree, redirect to the user's correct landing page (or `/login` if no token).

### Creator dashboard (`/c/*`)

| Route | Purpose |
|---|---|
| `/c/sessions` | List own sessions (active, scheduled, ended) |
| `/c/sessions/new` | Create session form |
| `/c/s/:sessionId` | Live control panel: chat, composer, pin/CTA controls, analytics strip |

The control panel is the primary surface. Default layout: chat (left, 1/3), composer + pin/CTA controls (center, 1/3), analytics (right, 1/3). Resizable.

The pin control is a button alongside the composer that opens a list of pre-configured templates (see [Pin Templates](#pin-templates)); selecting one sends the message and pins it in a single action. Unpin is a button on the currently-pinned banner. The CTA control is a small dialog (`label`, `url`) with push/dismiss buttons.

> **Deferred routes** (`feature-intent.md`): `/c/s/:sessionId/polls`, `/c/s/:sessionId/activities`, `/c/s/:sessionId/team`, `/c/s/:sessionId/invites`, `/c/s/:sessionId/insights`. None of these exist in POC. The audience invite flow is fed by externally-minted JWTs — the creator does not generate or rotate invites in-app.

### Team moderator (`/t/*`) — DEFERRED

The `/t/*` tree is not part of POC. Routes redirect to `/error`. Future scope adds the moderator panel, full-bleed chat moderation surface, and chat moderation actions (delete / pin free-form / timeout / ban).

### Audience (`/a/s/:sessionId`)

The creator's YouTube embed is the visual focus. Engagement (chat, pinned banner, CTA card) sits beside or below the player depending on viewport. The mental model is **YouTube Live with a richer right rail** — viewers should not need a tutorial.

#### UX principles

- **YouTube-grade familiarity.** Player on top/left, chat on the side, no novel chrome. A first-time viewer who knows YouTube Live should be able to use this surface without instruction. No multi-step onboarding, no modal explainers, no settings the viewer must configure before participating.
- **Mobile is a first-class target, not a port.** Most audience traffic is phones. Layout, tap targets, and chat density are tuned for mobile first; desktop is the upscale.
- **Engagement never blocks viewing.** Pinned banner, CTA card, and chat overlay or stack — they do not push the player out of view or require tab switches. The viewer can ignore everything except the player and still have a working experience.
- **One creator-driven element at a time on mobile.** Mobile real estate cannot host both a pinned banner and a CTA card simultaneously without crowding chat. POC behaviour: when both a pin and a CTA are active, the **CTA card takes precedence** (it's an explicit ask for action) and the pinned banner collapses into a single-line "View pinned" affordance that expands on tap. Desktop/tablet show both stacked.

#### Layout by viewport

| Viewport | Layout |
|---|---|
| Mobile portrait (`< 768px`) | Player on top (16:9), chat stacked below (scrollable, last N messages). Active CTA card slides up as a dismissible sheet over the chat region — never over the player. Pinned banner collapses to a single-line strip above chat (tap to expand). Composer pinned to bottom (above OS keyboard). |
| Mobile landscape | Auto-enters fullscreen player by default; chat overlays as a translucent right-side drawer the user can toggle (icon on player chrome). Drawer width ~30% of viewport; player remains visible behind. Pin and CTA render inside the drawer. |
| Tablet | Player left (60%), chat right (40%), pinned banner + CTA card stacked above chat. |
| Desktop (`≥ 1024px`) | Player left, chat right rail, pinned banner + CTA card stacked above chat. Resizable split. |

#### Fullscreen behavior

- **Native fullscreen toggle on the player** (Fullscreen API), available on all viewports. The YouTube IFrame Player API exposes its own fullscreen control; we surface our own button that calls `requestFullscreen()` on the **container** (player + chat overlay), not just the iframe — so chat stays visible in fullscreen as an overlay.
- In fullscreen, chat is a **translucent right-side overlay** (toggleable, default on for landscape/desktop, default off for mobile portrait fullscreen).
- Exit fullscreen returns to the previous layout exactly — no layout shift, no scroll-position loss.

#### Audience regions

| Region | Content |
|---|---|
| Player | YouTube embed; native controls + our fullscreen + chat-toggle buttons |
| Chat | Last N messages from Redis Sorted Set (REST initial fetch), live-updated via WS |
| Composer | Single-line chat input; disabled while slow-mode cooldown is active |
| Pinned banner | Persistent strip above the chat feed showing the currently-pinned chat message. Hidden when no message is pinned. The pinned message also remains in scrollback at its original timestamp |
| CTA card | Active call-to-action with a button labelled `label` opening `url` in a new tab (`target="_blank" rel="noopener noreferrer"`). Hidden when no CTA is active |
| Status | Connection state, session status, error toasts (bottom toast on mobile, top-right on desktop) |

No analytics. Subscribe attempts to `:analytics` are denied server-side; client never attempts.

#### YouTube IFrame Player configuration

The embed (`youtube.com/embed/<videoId>`) renders the video + player chrome only — **YouTube's native chat is never in the iframe**. Live chat lives on the watch page or the live-chat popout, neither of which we load. Our right-rail chat is the only chat on the page by construction.

Player params we set on the iframe URL:

| Param | Value | Reason |
|---|---|---|
| `enablejsapi` | `1` | Enables `postMessage` control + state events (play/pause/buffering, used for engagement timing analytics) |
| `origin` | our origin | Required by YouTube when `enablejsapi=1` |
| `playsinline` | `1` | iOS Safari plays inline instead of forcing the native fullscreen player. **Required** — without it our overlay-chat-in-fullscreen design breaks on iPhone |
| `modestbranding` | `1` | Minimizes YouTube logo in controls |
| `rel` | `0` | Restricts end-screen related videos to the same channel (can't fully disable post-2018; moot for live but set defensively) |
| `controls` | `1` | Keep YouTube's native controls — re-implementing play/pause/quality/captions is not worth it and would diverge from viewer expectations |

Loaded via the `YT.Player` JS API (script `https://www.youtube.com/iframe_api`) so we can listen for state changes.

What we cannot suppress and must accept:

- "YouTube" wordmark in the bottom-right of player controls.
- The player menu's "Watch on YouTube" link — clicking it exits to `youtube.com` where the viewer would see native chat. This is a deliberate exit ramp; we don't try to block it.
- iOS Safari < 17 may still force the native fullscreen player in some edge cases despite `playsinline=1`. In that mode our overlay chat is not visible. Mitigation: detect via `webkitpresentationmode` and surface a "tap to return" affordance; otherwise accept the degraded experience for that minority.

#### Performance budget (mobile)

The audience bundle target (< 200KB gz initial JS) is non-negotiable on mobile. The chat ring-buffer + RAF flush pipeline is what keeps low-end Android phones responsive at high publish rates. Virtualization is mandatory on the chat list for the same reason.

---

## Auth Flow

Three entry paths, all converge on a JWT held in memory + a silent refresh loop.

### Audience: magic-link

```
User clicks https://app/join?session=<sid>&invite=<invite_jwt>
  → /join page: GET /api/sessions/{sid}/status   (public, unauth)
      ├─ ended → /ended
      └─ live  → POST /api/auth/token { session_id, invite_token: invite_jwt }
                  ├─ 200 → store JWT in memory; navigate /a/s/{sid}
                  ├─ 401 → /error?reason=invalid_invite
                  └─ 410 → /ended
```

The `invite_jwt` is **externally minted** (HS256/ES256 with `{email, exp, jti}`) by an auxiliary tool — the platform does not generate, rotate, or revoke invites. Magic links are distributed 1:1 via SMS/WhatsApp.

The invite JWT is **stored once in `sessionStorage`** keyed by `session_id` so a tab refresh re-mints a session JWT without sending the user back to the link. It is never persisted beyond the tab.

### Creator: direct login

```
/login
  → in-app HMAC identity_token minter (DEV/POC — gated by import.meta.env.DEV
    via VITE_IDENTITY_HMAC_KEY). Production replaces this with a real IdP
    handoff.
  → POST /api/auth/login { identity_token }
  → store platform-scoped JWT
  → /c/sessions
```

When the creator picks a session, the client calls `POST /api/auth/token` with the same `identity_token` to upgrade to a session-scoped JWT. The platform-scoped JWT is discarded for that session's lifetime.

### Silent refresh

Every JWT carries `exp`. On token receipt, schedule `setTimeout(refresh, exp - now - 60s)`. The refresh handler re-runs `/api/auth/token` with the cached upstream token (`invite_token` for audience, `identity_token` for creator). On failure, fall back to `/join` (audience) or `/login` (creator). Refresh fails cleanly to `/ended` if the upstream token has itself expired.

This is implemented in a single `AuthProvider` at the root. All other code reads `useAuth()` and never sees the refresh dance.

### Token storage

In-memory only (`useAuthStore` Zustand state). Not in `localStorage` — XSS surface. The upstream token for refresh lives in `sessionStorage` (audience: `invite_jwt`) or in memory (creator: `identity_token`, who re-logs in on tab close).

---

## Realtime: Centrifuge Integration

One `Centrifuge` instance per app, created after the session-scoped JWT lands. Connection URL points at the backend Centrifuge endpoint; the JWT is passed as the connection token.

```
AuthProvider obtains JWT
  → RealtimeProvider creates Centrifuge instance with token
  → On connect, RealtimeProvider exposes a typed subscribe API:
        useChannel('chat'),  useChannel('activity'),  useChannel('analytics')
        // useChannel('poll') exists in code as a stub but is unused in POC
  → Each hook resolves the channel name via the same naming scheme
        as backend (session:{id}:{domain}) — kept in a shared constants file
  → On role mismatch (audience subscribing to analytics), Centrifuge returns
    a subscribe error; the hook surfaces it as `denied` and does not retry.
```

Reconnect strategy: rely on Centrifuge's built-in exponential backoff. On reconnect, hooks resubscribe automatically. **State that lived in publish events is re-fetched via REST after reconnect**, not replayed from history (channels have no history — see `realtime-channels.md`). Specifically:

- Chat + pinned message + active CTA: re-fetch from `GET /api/sessions/:id/chat/recent`, which returns `{ messages, pinned_message, active_cta }`. Then resume the chat + activity WS subscriptions.
- (Future: active poll / active activity REST refetch when polls and activities re-enter scope.)

This is the **standard recovery pattern** for every realtime view in this app. Implemented as a `useRealtimeBackedQuery` hook that wraps a TanStack Query query + a Centrifuge subscription, refetching the query on reconnect.

### Channel name constants

```
src/realtime/channels.ts

export const channels = {
  chat:      (sid: string) => `session:${sid}:chat`,
  activity:  (sid: string) => `session:${sid}:activity`,
  analytics: (sid: string) => `session:${sid}:analytics`,
  // poll: STUBBED — not used in POC; kept in sync with backend constants
  // until polls re-enter scope.
} as const;
```

Mirrors `internal/realtime/channels.go`. A small CI check (`make check-channel-parity` or a unit test) compares the two and fails if they drift.

---

## State Model

Two stores, clear boundaries.

### TanStack Query (server state)

Owns everything that came from REST. Query keys are tuples: `['session', sessionId, 'chat', 'recent']`, `['poll', pollId, 'results']`, etc. Mutations invalidate by prefix.

For realtime-backed views, the WS subscription writes into the query cache via `queryClient.setQueryData`. The component reads via `useQuery` — no parallel state path. This is the rule:

> **The query cache is the single read source. Realtime updates write to it. Components never read directly from a WS subscription.**

This makes Suspense + reconnect-refetch + cache invalidation all behave consistently.

### Zustand (client state)

| Store | Scope |
|---|---|
| `useAuthStore` | JWT, role, expiry, refresh timer handle |
| `useRealtimeStore` | Connection status (`connecting | connected | disconnected | denied`), per-channel subscription status |
| `useUIStore` | Layout state (panel sizes), modal stack, toast queue |
| `useSlowModeStore` | (audience only) cooldown deadline per session |

No `useSessionStore` — the active session is a URL parameter, read from the router, not stored in client state. Shared session metadata lives in TanStack Query under `['session', sessionId]`.

---

## Live Chat: Render Pipeline

The hard part of the audience surface. Constraints:

- WS ingest can sustain hundreds of messages/sec on a single session.
- React re-renders are expensive at this rate; one `setState` per message is not viable.
- Most messages scroll off screen before the user reads them — display is lossy by design.

Pipeline:

```
WS message
  → enqueue into a ring buffer (size 500) outside React state
  → request animation frame (debounced — at most one flush per ~50ms)
  → flush: drain ring buffer, take the most recent N (e.g. 200), setState once
  → virtualized list (react-virtuoso or similar) renders only viewport items
```

Rules:

- **Ring buffer is plain JS, not React state.** Writes from the WS handler do not trigger renders.
- **Coalesced flush.** One state update per animation frame max — typically ~16ms cadence, throttled further to ~50ms under high rates.
- **Bounded retention.** Live view shows last 200 messages. Older messages are dropped from client memory; the VOD archive (Postgres) is the historical source if ever needed (out of scope for live UI).
- **Auto-scroll lock.** If the user scrolls up, suppress auto-scroll-to-bottom and show a "N new messages" pill. Standard chat behavior, but explicit because at high rates the pill counter can lap quickly — count must come from the buffer, not from rendered items.
- **Moderation actions** (delete / pin free-form / timeout / ban) are **deferred to future scope**. POC has no chat moderation surface or backend mutation API. Pinning in POC is template-only, driven by `POST /api/sessions/:id/chat/pin` from the creator dashboard, not from a per-message moderation menu.

This pipeline is implemented once in `useLiveChat(sessionId)` and used by both creator and audience surfaces. The differences across roles are only in what controls render alongside (composer slow-mode UI for audience; pin/CTA composer for creator).

---

## Slow Mode (Audience)

Server returns `429 Too Many Requests` with a `Retry-After` header (seconds) when audience exceeds the slow-mode rate. Client behavior:

- The composer disables itself for `Retry-After` seconds, showing a countdown.
- The cooldown deadline is stored in `useSlowModeStore` keyed by session, so a navigation away and back does not reset the lockout.
- The client does **not** pre-emptively block sends based on its own clock — it sends and reacts to 429. The server is the source of truth (clock skew, multiple tabs, etc.).

---

## Pin Templates

Pin templates are pre-configured chat messages the creator selects from a list and pushes-and-pins in one action. POC stores templates as **frontend constants**:

```ts
// src/features/chat/pin-templates.ts
export type PinTemplate = { id: string; body: string };
export const PIN_TEMPLATES: ReadonlyArray<PinTemplate> = [
  // populated per deployment
];
```

The wire contract for pinning carries a `message_id`, not a `template_id`, so migrating templates from this constants file to a `chat_pin_templates` DB table later is a frontend-only change. The backend doesn't know templates exist.

Creator flow:

1. Creator opens template picker, selects an entry.
2. Frontend `POST /api/sessions/:id/chat` with the template's `body` → server returns the new message's `message_id`.
3. Frontend `POST /api/sessions/:id/chat/pin { message_id }` immediately after.
4. Server publishes `{ type: "chat_pinned", message_id, ts }` on `:activity`.

If step 3 fails (network blip), the message exists in the chat feed unpinned — recoverable by the creator clicking "pin" on the template again. The two-step flow keeps pinning a pure flag operation server-side.

## CTA UI

CTA composer (creator): a small dialog with two fields — `label` (button text) and `url` (must be `https://`, max 2048 chars, validated client-side via zod and re-validated server-side). Submit calls `POST /api/sessions/:id/cta`. A "Dismiss" button on the live preview calls `DELETE /api/sessions/:id/cta`.

CTA card (audience): renders the active CTA above the chat feed (or in the engagement region per viewport rules). Clicking the button opens `url` in a new tab with `target="_blank" rel="noopener noreferrer"`. Click-tracking is **not implemented in POC**; the card component carries a `// TODO(telemetry): emit CTA click event` marker.

## Polls / Quizzes / Reactions / Insights — DEFERRED

All of the following are out of POC scope and tracked in `docs/feature-intent.md`:

- Poll create / activate / close / vote (and the `:poll` channel).
- Quiz, reaction, and custom activity components under `src/features/activities/types/`.
- Optimistic local vote rendering.
- `/c/s/:id/insights` historical analytics surface.

The `src/features/polls/` and `src/features/activities/` folders may exist with stubbed code; do not extend them in POC.

---

## Analytics Panel (Creator)

Subscribed to `session:{id}:analytics`. Pushed at 5–10s heartbeat. Renders:

- Viewer count (large) — note: counts platform-joined audience only, not raw YouTube viewers.
- Chat msg/sec (gauge, sparkline of last 60s held in client memory).

`active_poll_votes` and `engagement rate` are deferred along with the polls surface. Team subscription to this channel is deferred.

No historical analytics in the POC — that is a separate view (`/c/s/:id/insights`) tracked in future scope.

---

## Folder Layout

```
frontend/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── index.html
├── public/
└── src/
    ├── main.tsx                    # bootstraps router + providers
    ├── app/
    │   ├── router.tsx              # createBrowserRouter, role gates
    │   ├── providers.tsx           # AuthProvider, RealtimeProvider, QueryClientProvider
    │   └── error-boundary.tsx
    ├── auth/
    │   ├── auth-store.ts           # Zustand
    │   ├── auth-provider.tsx       # silent refresh loop
    │   ├── use-auth.ts
    │   └── api.ts                  # /api/auth/login, /api/auth/token
    ├── realtime/
    │   ├── centrifuge-client.ts    # singleton wrapper
    │   ├── realtime-provider.tsx
    │   ├── channels.ts             # MUST match internal/realtime/channels.go
    │   ├── use-channel.ts
    │   └── use-realtime-backed-query.ts
    ├── api/
    │   ├── client.ts               # fetch wrapper, attaches JWT
    │   ├── sessions.ts             # GET /sessions/:id/status, etc.
    │   ├── chat.ts                 # send, recent (with pinned + cta), pin/unpin
    │   └── cta.ts                  # push, dismiss
    ├── features/
    │   ├── chat/
    │   │   ├── use-live-chat.ts    # ring buffer, RAF flush
    │   │   ├── chat-list.tsx       # virtualized
    │   │   ├── chat-composer.tsx   # slow-mode aware
    │   │   ├── pinned-banner.tsx   # audience: renders sessions.pinned_message
    │   │   ├── pin-templates.ts    # creator: pin template constants (POC)
    │   │   └── pin-control.tsx     # creator: template picker + push+pin
    │   ├── cta/
    │   │   ├── cta-composer.tsx    # creator
    │   │   └── cta-card.tsx        # audience
    │   ├── analytics/
    │   └── sessions/
    │   # polls/, activities/ — DEFERRED (may exist as stubs from earlier scope;
    │   # do not extend)
    ├── routes/
    │   ├── public/
    │   │   ├── login.tsx
    │   │   ├── join.tsx
    │   │   ├── ended.tsx
    │   │   └── error.tsx
    │   ├── creator/                # /c/*
    │   ├── team/                   # /t/*
    │   └── audience/               # /a/*
    ├── ui/                         # shadcn-owned components, in-repo
    ├── lib/                        # pure utilities
    ├── styles/
    └── test/                       # vitest setup, MSW (REST only — see note)
```

Note on testing: REST is mocked with MSW for component tests (test-only, **not** an integration shortcut). Integration-style flow tests run against the real backend via Playwright in CI. This stays consistent with the project rule that integration tests do not mock services — MSW here is for unit/component tests only.

---

## Bundle / Code Splitting

- One bundle per role tree (`creator`, `audience`) via React Router's `lazy` loaders. (Future: `team` bundle when team surface ships.)
- Audience bundle is the smallest and the budget-constrained one (it loads on every viewer device). Target: < 200KB gzipped initial JS, including React + Centrifuge + virtualization. Excludes media (YouTube embed handles itself).
- Creator bundle can be larger (analytics, charting) — not on the critical path for 10M users.

---

## Out of Scope for POC

- Mobile-specific layouts beyond responsive web. Native apps not in scope.
- i18n. Strings are English, but routed through a single `t(key)` helper so wiring i18n later is mechanical.
- Themes beyond light/dark via Tailwind's `dark:` modifier.
- VOD playback / chat replay — backend has the data (Postgres archive); UI is deferred.
- Historical analytics dashboards — live panel only for POC.
- Per-user notifications / DMs — chat is global per session.

---

## Resolved Decisions (2026-05-06)

The four open questions in earlier drafts have been resolved by the product owner:

1. **Identity service hand-off in dev** — **Option (a) chosen.** In-app HMAC `identity_token` minter on `/login`, gated by `import.meta.env.DEV` and `VITE_IDENTITY_HMAC_KEY`. Production replaces this with a real IdP handoff.
2. **YouTube embed wiring** — `youtube_video_id` (renamed from `youtube_broadcast_id`) is returned both by `GET /api/sessions/:id` (creator) and by the **public, unauth** `GET /api/sessions/:id/status` endpoint (so `/join` can render the player without a session JWT). Platform does not call YouTube's Data/Live APIs at all in POC; the field is the 11-char video ID consumed directly by the IFrame embed.
3. **Reconnect UX** — Banner shows only after the disconnect exceeds 2 seconds. Short blips render no UI.
4. **Optimistic vote** — Deferred to future scope along with the polls surface.