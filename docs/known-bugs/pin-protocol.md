# Pin Message Protocol Analysis

## Verdict

**Backend protocol design, not a frontend bug.** The backend intentionally sends every pinned message as a regular `CreatorChatMessage` first, then follows with a PIN event.

## What the Backend Sends (per pin action)

For every pin operation, three events arrive in fixed order:

| # | type field | body | meaning |
|---|---|---|---|
| 1 | `0` (absent) | `creatorChatMessage: {id, message}` | Broadcasts the content to all subscribers |
| 2 | `2` (`TYPE_UNPIN`) | `unpin: {messageId}` | Clears the previously pinned message |
| 3 | `1` (`TYPE_PIN`) | `pin: {id, message}` | Sets the new pin |

Event 1 and Event 3 always carry the **same message ID and text**. This is confirmed across all three pin cycles in the logs (S2Eckd, r3doVZ, hO_ypj).

## Why It Shows in Both Places

Event 1 arrives first. Our code decodes it as a `CreatorChatMessage` (type = 0) and pushes it into the chat buffer via `requestAnimationFrame`. Event 3 arrives shortly after and our `onPin` + `onRemoveMessage` callbacks fire. But by then, React has already rendered the message in the chat list.

Result: **brief flash** — message appears in chat, then disappears as the pin event removes it.

## Root Cause

The backend's protocol **does not distinguish** between a "pinned send" and a "regular broadcast" at the `CreatorChatMessage` level. Both produce an identical type-0 event. The pin metadata only arrives in the separate type-1 event.

## Frontend Fix Applied

The `onRemoveMessage` callback (added in the previous turn) handles the steady-state correctly:

```
Event 1 → message added to chat list
Event 3 → onPin(msg) + onRemoveMessage(msg.id) → message filtered from chat list
```

This is the correct approach given the protocol. The brief flash (Event 1 renders, then Event 3 removes it) is unavoidable without further mitigation.

## Options to Eliminate the Flash

### Option A: Hold-and-confirm buffer (recommended)
When a `CreatorChatMessage` arrives, don't push it to the chat list immediately. Hold it in a pending map keyed by ID for ~500ms. If a PIN event arrives with that ID within the window, discard from chat (show as pin only). If no PIN arrives, flush it to chat.

```
CreatorChatMessage arrived → pending[id] = msg, setTimeout(500ms, flush)
PIN arrived              → delete pending[id], call onPin
Timeout fires            → flush pending[id] to chat
```

**Trade-off:** Regular broadcast messages are delayed by up to 500ms.

### Option B: Coordinate with backend
Add a boolean field to `CreatorChatMessage` proto — e.g. `is_pin: bool`. Event 1 would carry `is_pin: true` and the frontend skips adding it to the chat list entirely, waiting only for Event 3.

**Trade-off:** Requires backend proto change and deployment.

### Option C: Accept the flash (current state)
Keep `onRemoveMessage`. The flash is ~1 frame in practice since Events 1 and 3 arrive in the same WebSocket burst. Likely imperceptible on fast connections.

## Recommendation

**Option A** if the flash is visually noticeable in production. **Option C** if it isn't — the current fix already handles the steady state correctly. Option B requires backend involvement.
