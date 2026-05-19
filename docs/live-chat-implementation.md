# Live Chat Implementation Plan

Scope: Replace current mock-based `LiveChat` component with real-time chat powered by Centrifuge WebSocket and Protobuf. Messages flow bi-directionally over WebSocket. Audience users publish messages directly on subscription channel and receive broadcast messages decoded via compiled Protobuf schemas.

---

## Technical Stack & Configuration

- **Realtime Transport**: Centrifuge (v5.5.3) using Protobuf network layer (`centrifuge/build/protobuf`).
- **Data Serialization**: Standard Protobuf. Payloads received as Uint8Array byte streams from WebSocket.
- **Protobuf Library**: `protobufjs` for runtime decoding and encoding.
- **WebSocket URL**: `NEXT_PUBLIC_WS_URL` (`ws://localhost:8000/connection/websocket`).

---

## Directory & File Structure

Clean structure mapping to existing source folders:

- **Proto Source**: `proto/chat.proto`, `proto/analytics.proto`, `proto/activity.proto`
- **Compiled Proto**: `src/lib/proto.js`, `src/lib/proto.d.ts`
- **Config**: `src/config/channels.ts`
- **Stores**: `src/stores/realtime-store.ts`, `src/stores/slow-mode-store.ts`
- **Lib**: `src/lib/centrifuge-client.ts`, `src/lib/ring-buffer.ts`
- **Providers**: `src/components/providers/realtime-provider.tsx`
- **Hooks**: `src/hooks/use-channel.ts`, `src/hooks/use-live-chat.ts`
- **Types**: `src/types/chat.ts`
- **Components**: `src/components/live-chat.tsx` (modify)

---

## Data Flow

```
Sending Chat Message:
Audience Form Submit 
  -> Encode payload using creator_stage.realtime.v1.ChatPublishRequest
  -> sub.publish(encodedBytes)
  -> Sent via WebSocket

Receiving Chat Message:
WS publication on channel session:{sid}:chat
  -> Decode Uint8Array data via creator_stage.realtime.v1.ChatMessage.decode()
  -> Map to App State format
  -> Enqueue in RingBuffer
  -> Throttled RAF flush (setState once)
  -> Virtualized list render
```

---

## Implementation Tasks

### Task 1 -- Protobuf Integration and Build Setup

1. Install `protobufjs` runtime dependency:
   ```bash
   npm install protobufjs
   ```
2. Install compilation CLI tool as devDependency:
   ```bash
   npm install --save-dev protobufjs-cli
   ```
3. Create `.proto` files in root `proto/` directory:

`proto/chat.proto`
```protobuf
syntax = "proto3";

package creator_stage.realtime.v1;

option go_package = "github.com/techpix/creator-stage/internal/realtime/proto;realtimepb";

import "google/protobuf/timestamp.proto";

enum Role {
  ROLE_UNSPECIFIED = 0;
  ROLE_CREATOR     = 1;
  ROLE_TEAM        = 2;
  ROLE_AUDIENCE    = 3;
}

message ChatMessage {
  string                    id                 = 1;
  string                    video_broadcast_id = 2;
  string                    user_id            = 3;
  Role                      role               = 4;
  string                    display_name       = 5;
  string                    body               = 6;
  google.protobuf.Timestamp sent_at            = 7;
  bool                      pinned             = 8;
}

message BatchedChatMessages {
  repeated ChatMessage messages = 1;
}

message ChatPublishRequest {
  string body = 1;
  string target_user_id = 2;
}
```

`proto/analytics.proto`
```protobuf
syntax = "proto3";

package creator_stage.realtime.v1;

option go_package = "github.com/techpix/creator-stage/internal/realtime/proto;realtimepb";

import "google/protobuf/timestamp.proto";

message AnalyticsHeartbeat {
  uint32                    viewer_count    = 1;
  double                    chat_velocity   = 2;
  double                    engagement_rate = 3;
  google.protobuf.Timestamp at              = 4;
}
```

`proto/activity.proto`
```protobuf
syntax = "proto3";

package creator_stage.realtime.v1;

option go_package = "github.com/techpix/creator-stage/internal/realtime/proto;realtimepb";

import "google/protobuf/timestamp.proto";
import "chat.proto";

enum Type {
  TYPE_UNSPECIFIED = 0;
  TYPE_PIN         = 1;
  TYPE_UNPIN       = 2;
  TYPE_CTA_PUSH    = 3;
  TYPE_CTA_DISMISS = 4;
}

message Unpin {
  string message_id = 1;
}

message CTAPush {
  string label = 1;
  string url   = 2;
}

message CTADismiss {}

message ActivityEvent {
  Type                      type = 1;
  google.protobuf.Timestamp at   = 2;

  oneof body {
    ChatMessage pin         = 10;
    Unpin       unpin       = 11;
    CTAPush     cta_push    = 12;
    CTADismiss  cta_dismiss = 13;
  }
}
```

4. Add generation script to `package.json`:
   ```json
   "proto:build": "pbjs -t static-module -w es6 -o src/lib/proto.js proto/*.proto && pbts -o src/lib/proto.d.ts src/lib/proto.js"
   ```
5. Run the build to generate `src/lib/proto.js` and `src/lib/proto.d.ts`.

---

### Task 2 -- Channels Config
File: `src/config/channels.ts`

```ts
export const channels = {
  chat:      (sid: string) => `session:${sid}:chat`,
  activity:  (sid: string) => `session:${sid}:activity`,
  analytics: (sid: string) => `session:${sid}:analytics`,
} as const;
```

---

### Task 3 -- Realtime Store
File: `src/stores/realtime-store.ts`

Tracks network status:
```ts
import { create } from 'zustand';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'denied';

interface RealtimeState {
  connectionStatus: ConnectionStatus;
  channelStatuses: Record<string, ConnectionStatus>;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setChannelStatus: (channel: string, status: ConnectionStatus) => void;
  reset: () => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  connectionStatus: 'disconnected',
  channelStatuses: {},
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  setChannelStatus: (channel, status) =>
    set((state) => ({
      channelStatuses: { ...state.channelStatuses, [channel]: status },
    })),
  reset: () => set({ connectionStatus: 'disconnected', channelStatuses: {} }),
}));
```

---

### Task 4 -- Centrifuge Client Singleton
File: `src/lib/centrifuge-client.ts`

Manages connection using Protobuf-configured client:
```ts
import { Centrifuge } from 'centrifuge/build/protobuf';

let centrifugeInstance: Centrifuge | null = null;

export const centrifugeClient = {
  get: () => centrifugeInstance,
  create: (token: string) => {
    if (centrifugeInstance) return centrifugeInstance;
    centrifugeInstance = new Centrifuge(process.env.NEXT_PUBLIC_WS_URL || '', {
      token,
      minReconnectDelay: 500,
      maxReconnectDelay: 15000,
    });
    return centrifugeInstance;
  },
  destroy: () => {
    if (centrifugeInstance) {
      centrifugeInstance.disconnect();
      centrifugeInstance = null;
    }
  },
};
```

---

### Task 5 -- Realtime Provider
File: `src/components/providers/realtime-provider.tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useRealtimeStore } from '@/stores/realtime-store';
import { centrifugeClient } from '@/lib/centrifuge-client';

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const jwt = useAuthStore((state) => state.jwt);
  const { setConnectionStatus, reset } = useRealtimeStore();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!jwt) {
      centrifugeClient.destroy();
      reset();
      return;
    }

    const client = centrifugeClient.create(jwt);

    client.on('connecting', () => setConnectionStatus('connecting'));
    client.on('connected', () => {
      setConnectionStatus('connected');
      setShowBanner(false);
    });
    client.on('disconnected', () => {
      setConnectionStatus('disconnected');
    });

    client.connect();

    let bannerTimer: NodeJS.Timeout;
    const handleStateChange = () => {
      if (client.state === 'disconnected') {
        bannerTimer = setTimeout(() => {
          if (client.state === 'disconnected') setShowBanner(true);
        }, 2000);
      } else {
        setShowBanner(false);
      }
    };

    client.on('state', handleStateChange);

    return () => {
      clearTimeout(bannerTimer);
      centrifugeClient.destroy();
      reset();
    };
  }, [jwt, setConnectionStatus, reset]);

  return (
    <>
      {showBanner && (
        <div className="bg-destructive text-destructive-foreground text-center py-2 text-xs font-semibold select-none">
          Connection lost. Reconnecting...
        </div>
      )}
      {children}
    </>
  );
}
```

---

### Task 6 -- Channel Hook
File: `src/hooks/use-channel.ts`

```ts
import { useEffect, useState } from 'react';
import { centrifugeClient } from '@/lib/centrifuge-client';
import { useRealtimeStore } from '@/stores/realtime-store';
import { Subscription, PublicationContext, SubscriptionState } from 'centrifuge/build/protobuf';

interface UseChannelOptions {
  onPublication?: (ctx: PublicationContext) => void;
}

export function useChannel(channelName: string | null, options?: UseChannelOptions) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subState, setSubState] = useState<SubscriptionState>('unsubscribed' as SubscriptionState);
  const setChannelStatus = useRealtimeStore((state) => state.setChannelStatus);

  useEffect(() => {
    if (!channelName) return;

    const client = centrifugeClient.get();
    if (!client) return;

    const sub = client.newSubscription(channelName);
    setSubscription(sub);

    sub.on('state', (ctx) => {
      setSubState(ctx.newState);
      setChannelStatus(channelName, ctx.newState as any);
    });

    if (options?.onPublication) {
      sub.on('publication', options.onPublication);
    }

    sub.on('error', (ctx) => {
      if (ctx.error.code === 102 || ctx.error.message.includes('permission denied')) {
        setChannelStatus(channelName, 'denied');
      }
    });

    sub.subscribe();

    return () => {
      sub.unsubscribe();
      client.removeSubscription(sub);
      setSubscription(null);
    };
  }, [channelName, options?.onPublication, setChannelStatus]);

  return { subscription, state: subState };
}
```

---

### Task 7 -- Ring Buffer Utility
File: `src/lib/ring-buffer.ts`

Plain JS circular buffer for performance isolation:
```ts
export class RingBuffer<T> {
  private buffer: T[];
  private head = 0;
  private tail = 0;
  private isFull = false;

  constructor(private capacity: number = 500) {
    this.buffer = new Array(capacity);
  }

  push(item: T): void {
    this.buffer[this.tail] = item;
    if (this.isFull) {
      this.head = (this.head + 1) % this.capacity;
    }
    this.tail = (this.tail + 1) % this.capacity;
    if (this.tail === this.head) {
      this.isFull = true;
    }
  }

  drain(): T[] {
    const result: T[] = [];
    if (this.size === 0) return result;

    let current = this.head;
    while (current !== this.tail || this.isFull) {
      result.push(this.buffer[current]);
      current = (current + 1) % this.capacity;
      this.isFull = false;
    }
    this.head = 0;
    this.tail = 0;
    return result;
  }

  get size(): number {
    if (this.isFull) return this.capacity;
    if (this.tail >= this.head) return this.tail - this.head;
    return this.capacity - (this.head - this.tail);
  }

  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.isFull = false;
  }
}
```

---

### Task 8 -- Live Chat Data Hook
File: `src/hooks/use-live-chat.ts`

Hooks into WS, decodes Protobuf payloads, manages animation frame scheduler:
```ts
import { useEffect, useState, useRef, useTransition, useCallback } from 'react';
import { useChannel } from './use-channel';
import { channels } from '@/config/channels';
import { RingBuffer } from '@/lib/ring-buffer';
import { creator_stage } from '@/lib/proto';
import { ChatMessage, WireChatMessage } from '@/types/chat';

export function useLiveChat(sessionId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [, startTransition] = useTransition();

  const bufferRef = useRef(new RingBuffer<ChatMessage>(500));
  const rafRef = useRef<number | null>(null);

  const onChatPublication = useCallback((ctx: any) => {
    try {
      const decoded = creator_stage.realtime.v1.ChatMessage.decode(ctx.data);
      const msg: ChatMessage = {
        id: decoded.id,
        authorName: decoded.displayName,
        authorAvatarColor: decoded.role === 1 ? 'from-amber-500 to-yellow-500' : 'from-blue-500 to-emerald-500',
        messageText: decoded.body,
        timestamp: new Date(Number(decoded.sentAt?.seconds) * 1000).toISOString(),
        role: decoded.role === 1 ? 'owner' : decoded.role === 2 ? 'moderator' : 'viewer',
        isPinned: decoded.pinned,
      };

      bufferRef.current.push(msg);

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          const fresh = bufferRef.current.drain();
          startTransition(() => {
            setMessages((prev) => {
              const next = [...prev, ...fresh];
              return next.slice(-200);
            });
          });
          rafRef.current = null;
        });
      }
    } catch (err) {
      console.error('Failed to decode chat publication:', err);
    }
  }, []);

  const { subscription } = useChannel(channels.chat(sessionId), {
    onPublication: onChatPublication,
  });

  const sendMessage = useCallback(async (body: string) => {
    if (!subscription) return;
    
    const requestPayload = creator_stage.realtime.v1.ChatPublishRequest.create({
      body,
      targetUserId: '',
    });
    const encoded = creator_stage.realtime.v1.ChatPublishRequest.encode(requestPayload).finish();
    
    await subscription.publish(encoded);
  }, [subscription]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return {
    messages,
    sendMessage,
  };
}
```

---

### Task 9 -- Refactor `LiveChat` UI Component
File: `src/components/live-chat.tsx`

Modify the component:
1. Accept `sessionId` as component prop.
2. Call `const { messages, sendMessage } = useLiveChat(sessionId);`.
3. Replace local state storage array and forms mock handler with properties from hook.
4. Replace message submit handler:
   ```ts
   const handleSendMessage = (e?: FormEvent) => {
     e?.preventDefault();
     if (!inputText.trim()) return;
     sendMessage(inputText.trim());
     setInputText('');
   };
   ```

---

## Verification Plan

### Manual Integration Test
1. Spin up Centrifugo broker/backend server.
2. Join session via frontend app to acquire token.
3. Establish WebSocket connection.
4. Input text and submit message.
5. Verify outbound WebSocket publish frame contains correct Protobuf bytes.
6. Verify message loops back from server and triggers UI render.
