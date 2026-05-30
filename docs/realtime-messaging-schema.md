# Realtime Messaging Schema

Single source of truth for Centrifuge WebSocket protobuf payloads shared between the backend and frontend.

**Canonical proto files:** `internal/proto/common.proto`, `internal/proto/audience_chat.proto`, `internal/proto/creator_chat.proto`

**Wire format:** Centrifuge **binary protobuf** only. `ConnectRequest.data`, `PublishRequest.data`, and `Publication.data` are **raw protobuf bytes** — never JSON strings.

**Frontend requirements:**

1. Copy the three `.proto` files from this repo; do not hand-edit field numbers.
2. Regenerate TS/JS bindings (`protoc`, `ts-proto`, or `protobufjs`).
3. Use `centrifuge/build/protobuf` (default JSON Centrifuge client is rejected).
4. Encode with `.encode(...).finish()` → `Uint8Array` before `client.publish()`.

Related docs: [`system-design/client-connection-exchange.md`](system-design/client-connection-exchange.md), [`system-design/realtime-channels.md`](system-design/realtime-channels.md).

---

## Channel names

All channels are scoped by `video_broadcast_id`:

```
video_broadcast:{video_broadcast_id}:creator
video_broadcast:{video_broadcast_id}:audience
video_broadcast:{video_broadcast_id}:dm:{user_id}
```

Constants live in `internal/websocket/channels.go`. Some older docs use `:user:{id}` — runtime uses **`:dm:{id}`**.

---

## Channel mapping (audience client)

| Channel | Subscribe | Publish | Receive payload | Publish payload |
|---------|-----------|---------|-----------------|-----------------|
| `:creator` | Yes | **No** (403) | `CreatorChatEvent` | — |
| `:audience` | Yes | **Quiz votes only** | `BatchedChatMessages` | `AudienceChatEvent` (`TYPE_POLL_RESPONSE`) |
| `:dm:{ownUserId}` | Yes | **Chat only** | `CreatorChatEvent` (creator DMs) + own echo | `AudienceChatEvent` or bare `AudienceChatMessage` |

**Rules:**

- `{ownUserId}` must equal JWT `accountId` and `AudienceConnectData.user_id`.
- `{video_broadcast_id}` in the channel name must equal `AudienceConnectData.video_broadcast_id`.
- Chat text on `:audience` is rejected (use `:dm`).
- Quiz votes on `:dm` are rejected (use `:audience`).

---

## Connect handshake

Not a channel publication — sent in `ConnectRequest` at WS connect.

### Message: `AudienceConnectData`

```protobuf
message AudienceConnectData {
  string video_broadcast_id = 1;
  string user_id            = 2;
  string display_name       = 3;
}
```

### JSON mapping (logical)

```json
{
  "videoBroadcastId": "URXBh2PRp0o",
  "userId": "adaf980b-df25-4197-9efd-6ca69c35bfcf",
  "displayName": "Viewer"
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `videoBroadcastId` | **Yes** | Broadcast being joined |
| `userId` | **Yes** | Must equal JWT `accountId` |
| `displayName` | No | Optional display name |

Also set `ConnectRequest.token` to the same JWT used for REST `Authorization: Bearer`.

---

## Protobuf definitions

### `common.proto`

```protobuf
syntax = "proto3";

package creator_stage.realtime.v1;

enum Role {
  ROLE_UNSPECIFIED = 0;
  ROLE_CREATOR     = 1;
  ROLE_TEAM        = 2;
  ROLE_AUDIENCE    = 3;
}
```

### `audience_chat.proto`

```protobuf
syntax = "proto3";

package creator_stage.realtime.v1;

import "google/protobuf/timestamp.proto";
import "common.proto";

enum AudienceIngestRoute {
  AUDIENCE_INGEST_ROUTE_UNSPECIFIED = 0;
  AUDIENCE_INGEST_ROUTE_PEER        = 1;
  AUDIENCE_INGEST_ROUTE_DM          = 2;
}

// Nested chat payload. role/type do NOT belong here.
message AudienceChatMessage {
  string                    id                 = 1;
  google.protobuf.Timestamp sent_at            = 2;
  string                    body               = 3;
  string                    user_id            = 4;
  string                    display_name       = 5;
  string                    video_broadcast_id = 6;  // server-set; omit on WS publish
  AudienceIngestRoute       ingest_route       = 7;  // server-set; omit on WS publish
}

message AudienceQuizResponse {
  string                    id        = 1;
  google.protobuf.Timestamp sent_at   = 2;
  string                    quiz_id   = 3;
  string                    option_id = 4;
}

enum AudienceMessageType {
  TYPE_AUDIENCE_MESSAGE = 0;
  TYPE_POLL_RESPONSE    = 1;
  TYPE_VIDEO_METADATA   = 2;
}

// Audience WS uplink envelope. role and type are at ROOT level.
message AudienceChatEvent {
  Role                role = 1;
  AudienceMessageType type = 2;

  oneof body {
    AudienceChatMessage  chat_message  = 10;
    AudienceQuizResponse quiz_response = 11;
  }
}

// Server → audience on :audience only (never client-published).
message BatchedChatMessages {
  uint32 live_active_connections = 1;
  repeated AudienceChatMessage messages = 2;
}
```

### `creator_chat.proto`

```protobuf
syntax = "proto3";

package creator_stage.realtime.v1;

import "google/protobuf/timestamp.proto";
import "common.proto";

enum Type {
  TYPE_CREATOR_MESSAGE = 0;
  TYPE_PIN             = 1;
  TYPE_UNPIN           = 2;
  TYPE_CTA_PUSH        = 3;
  TYPE_CTA_DISMISS     = 4;
  TYPE_QUIZ_START      = 5;
  TYPE_QUIZ_END        = 6;
}

message CreatorChatMessage {
  string          id                  = 1;
  string          message             = 2;
  optional string audience_message_id = 3;
}

message Pin {
  string id      = 1;
  string message = 2;
}

message Unpin {
  string message_id = 1;
}

enum CtaType {
  TYPE_PAYMENT = 0;
}

message CTAPush {
  string  id    = 1;
  string  label = 2;
  string  url   = 3;
  CtaType type  = 4;
}

message CTADismiss {
  string message_id = 1;
}

message QuizOption {
  string id    = 1;
  string label = 2;
}

message Quiz {
  string              id                 = 1;
  string              quiz_id            = 2;
  string              video_broadcast_id = 3;
  string              question           = 4;
  repeated QuizOption options            = 5;
  int32               duration_secs      = 6;
}

message QuizOptionCount {
  string option_id = 1;
  int32  count     = 2;
}

message QuizResults {
  string                   id     = 1;
  string                   quiz_id = 2;
  repeated QuizOptionCount counts = 3;
}

// Server → audience on :creator and :dm.
message CreatorChatEvent {
  Role                      role               = 1;
  Type                      type               = 2;
  google.protobuf.Timestamp sent_at            = 3;
  string                    target_user_id     = 4;  // set for DMs; empty for room broadcast
  string                    video_broadcast_id = 5;

  oneof body {
    CreatorChatMessage creator_chat_message = 10;
    Pin                pin                  = 11;
    Unpin              unpin                = 12;
    CTAPush            cta_push             = 13;
    CTADismiss         cta_dismiss          = 14;
    Quiz               quiz_start           = 15;
    QuizResults        quiz_end             = 16;
  }
}
```

### Removed / do not use

| Type | Status |
|------|--------|
| `ChatPublishRequest` | Not in current protos. Use `AudienceChatEvent` or bare `AudienceChatMessage`. |
| `ChatMessage` | Not in current protos. |
| `video_broadcast:{id}:pin` | Channel does not exist. Pin = `CreatorChatEvent` `TYPE_PIN` on `:creator`. |

---

## Audience publish payloads

Validation logic: `internal/websocket/validate/validate.go`.

### Chat → `:dm:{ownUserId}`

**Preferred:** `AudienceChatEvent`

```json
{
  "role": "ROLE_AUDIENCE",
  "type": "TYPE_AUDIENCE_MESSAGE",
  "chatMessage": {
    "id": "client-generated-id",
    "body": "hello"
  }
}
```

**Minimal (also accepted):** bare `AudienceChatMessage`

```json
{
  "body": "hello"
}
```

| Field | Location | Required on publish | Notes |
|-------|----------|---------------------|-------|
| `role` | Root of `AudienceChatEvent` | Recommended | `ROLE_AUDIENCE` (3) or `ROLE_UNSPECIFIED` |
| `type` | Root | **Yes** (full envelope) | `TYPE_AUDIENCE_MESSAGE` (0) |
| `chatMessage.body` | Nested | **Yes** | 1–500 runes after trim |
| `chatMessage.id` | Nested | No | Client-generated id |
| `chatMessage.userId` | Nested | No | If set, must match connection user |
| `chatMessage.videoBroadcastId` | Nested | No | If set, must match connection broadcast |
| `chatMessage.displayName` | Nested | No | Server uses connect context |
| `chatMessage.sentAt` | Nested | No | Server sets on ingest |
| `chatMessage.ingestRoute` | Nested | No | Server sets |

### Quiz vote → `:audience`

**Message:** `AudienceChatEvent`

```json
{
  "role": "ROLE_AUDIENCE",
  "type": "TYPE_POLL_RESPONSE",
  "quizResponse": {
    "optionId": "JEXtFg",
    "quizId": "BUo2Hu"
  }
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `quizResponse.optionId` | **Yes** | Valid option id |
| `quizResponse.quizId` | No | Validated if present |
| `type` | **Yes** | `TYPE_POLL_RESPONSE` (1) |

---

## Server → audience receive payloads

### `:creator` — `CreatorChatEvent`

Creator chat:

```json
{
  "role": "ROLE_CREATOR",
  "type": "TYPE_CREATOR_MESSAGE",
  "videoBroadcastId": "URXBh2PRp0o",
  "sentAt": "2026-05-28T12:00:00Z",
  "creatorChatMessage": {
    "id": "msg-id",
    "message": "Hello everyone!"
  }
}
```

Pin (no separate pin channel):

```json
{
  "role": "ROLE_CREATOR",
  "type": "TYPE_PIN",
  "videoBroadcastId": "URXBh2PRp0o",
  "pin": { "id": "pin-msg-id", "message": "Pinned text" }
}
```

Other `type` values: `TYPE_UNPIN`, `TYPE_CTA_PUSH`, `TYPE_CTA_DISMISS`, `TYPE_QUIZ_START`, `TYPE_QUIZ_END`.

### `:audience` — `BatchedChatMessages`

```json
{
  "liveActiveConnections": 1234,
  "messages": [
    {
      "id": "peer-msg-1",
      "body": "from another viewer",
      "userId": "other-user-uuid",
      "displayName": "Alice",
      "videoBroadcastId": "URXBh2PRp0o",
      "sentAt": "2026-05-28T12:00:00Z"
    }
  ]
}
```

Skip messages where `userId === self`.

### `:dm:{ownUserId}` — `CreatorChatEvent`

Creator DM example:

```json
{
  "role": "ROLE_CREATOR",
  "type": "TYPE_CREATOR_MESSAGE",
  "targetUserId": "adaf980b-df25-4197-9efd-6ca69c35bfcf",
  "creatorChatMessage": {
    "id": "dm-msg-id",
    "message": "Thanks for your question!"
  }
}
```

**Self-echo:** The broker echoes your own publishes. On `:dm`, drop publications where `role === ROLE_AUDIENCE`; deliver `ROLE_CREATOR` and `ROLE_TEAM`.

---

## Common frontend mistakes (cause 109 Bad Request)

| Wrong | Correct |
|-------|---------|
| `role` inside `chatMessage` | `role` on **`AudienceChatEvent` root** (field 1) |
| `type` inside `chatMessage` | `type` on **`AudienceChatEvent` root** (field 2) |
| `body` at field 7 on `AudienceChatMessage` | `body` is field **3** |
| `videoBroadcastId` at field 3 | field **6** on `AudienceChatMessage` |
| `displayName` at field 6 | field **5** on `AudienceChatMessage` |
| JSON string in `PublishRequest.data` | **Protobuf bytes** |
| Chat publish on `:audience` | Chat on **`:dm:{ownUserId}`** |
| Quiz publish on `:dm` | Quiz on **`:audience`** |
| Separate `:pin` channel | Handle `TYPE_PIN` on `:creator` |

---

## Centrifuge error codes

| Code | Meaning |
|------|---------|
| `103` | Permission denied — wrong channel or DM user id mismatch |
| `109` | Bad request — malformed protobuf, empty/invalid body, field mismatch |
| `111` | Rate limit — default 1 chat message per 3 seconds per user |

**Size limits:** publish wire max 4 KiB; chat message wire max 8 KiB; body 1–500 runes.

---

## TypeScript example

```ts
import { Centrifuge } from 'centrifuge/build/protobuf';
import {
  AudienceChatEvent,
  AudienceMessageType,
  Role,
} from './proto/audience_chat';

const vbId = 'URXBh2PRp0o';
const userId = 'adaf980b-df25-4197-9efd-6ca69c35bfcf';

// After connect with AudienceConnectData + JWT:
const wire = AudienceChatEvent.encode({
  role: Role.ROLE_AUDIENCE,
  type: AudienceMessageType.TYPE_AUDIENCE_MESSAGE,
  chatMessage: {
    id: crypto.randomUUID().replace(/-/g, ''),
    body: 'hi',
  },
}).finish();

await client.publish(`video_broadcast:${vbId}:dm:${userId}`, wire);
```

---

## Backend dev: generate test frames

```bash
go run ./cmd/jsontoproto \
  --command=publish \
  --channel='video_broadcast:URXBh2PRp0o:dm:adaf980b-df25-4197-9efd-6ca69c35bfcf' \
  --id=5 \
  AudienceChatEvent \
  '{"role":"ROLE_AUDIENCE","type":"TYPE_AUDIENCE_MESSAGE","chatMessage":{"id":"msg-1","body":"hi"}}'
```

Regenerate Go bindings after proto changes:

```bash
make protoc
```
