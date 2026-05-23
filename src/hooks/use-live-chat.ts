import { useState, useRef, useCallback, useEffect } from "react";
import { useChannel } from "@/hooks/use-channel";
import { RingBuffer } from "@/lib/ring-buffer";
import { creator_stage } from "@/lib/proto";
import { ChatMessage } from "@/app/(main)/join/_components/live-chat";
import { PublicationContext } from "centrifuge/build/protobuf";
import { centrifugeClient } from "@/lib/centrifuge-client";
import { useRealtimeStore } from "@/stores/realtime-store";
import { channels } from "@/config/channels";
import { ConnectionStatus } from "@/types/realtime";
interface FlexibleRawChatMessage {
  id?: string;
  video_broadcast_id?: string;
  user_id?: string;
  role?: number | string;
  display_name?: string;
  displayName?: string;
  authorName?: string;
  body?: string;
  messageText?: string;
  sent_at?: { seconds?: number; nanos?: number } | string | number | null;
  sentAt?: { seconds?: number; nanos?: number } | string | number | null;
  pinned?: boolean;
  isPinned?: boolean;
  timestamp?: string;
}

function mapToUiMessage(raw: FlexibleRawChatMessage, isDm = false): ChatMessage {
  const body = raw.body ?? raw.messageText ?? "";
  const displayName =
    raw.displayName ?? raw.display_name ?? raw.authorName ?? "Unknown";
  const role = raw.role ?? 3;
  const id = raw.id ?? `msg-${Date.now()}-${Math.random()}`;
  const pinned = raw.pinned ?? raw.isPinned ?? false;

  let roleStr: "viewer" | "moderator" | "owner" = "viewer";
  if (role === 1 || role === "ROLE_CREATOR") {
    roleStr = "owner";
  } else if (role === 2 || role === "ROLE_TEAM") {
    roleStr = "moderator";
  }

  let timestampStr = new Date().toISOString();
  const sentAt = raw.sentAt ?? raw.sent_at;
  if (sentAt) {
    if (typeof sentAt === "string") {
      timestampStr = sentAt;
    } else if (typeof sentAt === "number") {
      timestampStr = new Date(sentAt).toISOString();
    } else if (typeof sentAt === "object") {
      const seconds = sentAt.seconds ?? 0;
      const nanos = sentAt.nanos ?? 0;
      timestampStr = new Date(
        seconds * 1000 + Math.floor(nanos / 1000000),
      ).toISOString();
    }
  } else if (raw.timestamp) {
    timestampStr = raw.timestamp;
  }

  return {
    id,
    authorName: displayName,
    messageText: body,
    timestamp: timestampStr,
    role: roleStr,
    isPinned: pinned,
    isDm,
  };
}

export function useLiveChat(sessionId = "4uPEuX") {
  const [prevSessionId, setPrevSessionId] = useState(sessionId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setConnectionStatus = useRealtimeStore(
    (state) => state.setConnectionStatus,
  );

  if (sessionId !== prevSessionId) {
    setPrevSessionId(sessionId);
    setIsLoading(true);
    setMessages([]);
    setPinnedMessage(null);
  }

  // Ensure Centrifuge is instantiated for this sessionId
  centrifugeClient.createAudience({
    videoBroadcastId: sessionId,
    userId: "2",
    displayName: "Deepak",
  });

  useEffect(() => {
    if (!sessionId) return;
    const client = centrifugeClient.get();
    if (!client) return;

    const handleConnecting = () =>
      setConnectionStatus(ConnectionStatus.CONNECTING);
    const handleConnected = () =>
      setConnectionStatus(ConnectionStatus.CONNECTED);
    const handleDisconnected = () =>
      setConnectionStatus(ConnectionStatus.DISCONNECTED);

    client.on("connecting", handleConnecting);
    client.on("connected", handleConnected);
    client.on("disconnected", handleDisconnected);

    client.connect();

    return () => {
      client.removeListener("connecting", handleConnecting);
      client.removeListener("connected", handleConnected);
      client.removeListener("disconnected", handleDisconnected);
    };
  }, [sessionId, setConnectionStatus]);

  const bufferRef = useRef(new RingBuffer<ChatMessage>(500));
  const flushScheduledRef = useRef(false);
  const handlePublication = useCallback((ctx: PublicationContext) => {
    try {
      if (!ctx.data) {
        console.warn("Received empty publication data", ctx);
        return;
      }

      console.log("[broadcast] raw publication:", ctx.data);

      // The :broadcast channel carries two distinct wire formats:
      // 1. Binary Uint8Array → protobuf ChatMessage (creator/team chat lines)
      // 2. Plain object with kind="activity" → JSON gateway envelope for ActivityEvent (pin/unpin/CTA/quiz)
      if (ctx.data instanceof Uint8Array || ArrayBuffer.isView(ctx.data)) {
        const bytes = ctx.data instanceof Uint8Array
          ? ctx.data
          : new Uint8Array((ctx.data as ArrayBufferView).buffer, (ctx.data as ArrayBufferView).byteOffset, (ctx.data as ArrayBufferView).byteLength);

        try {
          const decoded = creator_stage.realtime.v1.ChatMessage.decode(bytes);

          console.log("Decoded Broadcast:", decoded);

          const uiMsg = mapToUiMessage(decoded as FlexibleRawChatMessage);
          console.log("UI Broadcast:", uiMsg);
          bufferRef.current.push(uiMsg);

          if (!flushScheduledRef.current) {
            flushScheduledRef.current = true;
            requestAnimationFrame(() => {
              flushScheduledRef.current = false;
              const drained = bufferRef.current.drain();
              if (drained.length > 0) {
                setMessages((prev) => {
                  const next = [...prev, ...drained];
                  return next.slice(-200);
                });
                setIsLoading(false);
              }
            });
          }
        } catch {
          // Not a ChatMessage — try ActivityEvent (pin/unpin/CTA/quiz)
          try {
            const activity = creator_stage.realtime.v1.ActivityEvent.decode(bytes);
            console.log("Decoded ActivityEvent:", activity);

            if (activity.body === "pin" && activity.pin) {
              setPinnedMessage(mapToUiMessage(activity.pin as FlexibleRawChatMessage));
            } else if (activity.body === "unpin") {
              setPinnedMessage(null);
            }
          } catch (activityErr) {
            console.warn("Unknown binary publication on :broadcast — not ChatMessage or ActivityEvent", activityErr);
          }
        }
      } else if (typeof ctx.data === "object" && ctx.data !== null && "kind" in ctx.data && (ctx.data as Record<string, unknown>).kind === "activity") {
        // ActivityEvent envelope — handle pin/unpin/CTA
        const envelope = ctx.data as { kind: string; payload: Record<string, unknown> };
        console.log("Received ActivityEvent envelope:", envelope);

        try {
          const activity = creator_stage.realtime.v1.ActivityEvent.decode(
            creator_stage.realtime.v1.ActivityEvent.encode(
              creator_stage.realtime.v1.ActivityEvent.fromObject(envelope.payload),
            ).finish(),
          );

          if (activity.body === "pin" && activity.pin) {
            const pinnedUiMsg = mapToUiMessage(activity.pin as FlexibleRawChatMessage);
            setPinnedMessage(pinnedUiMsg);
          } else if (activity.body === "unpin") {
            setPinnedMessage(null);
          }
        } catch (activityErr) {
          console.warn("Failed to process ActivityEvent:", activityErr);
        }
      } else {
        console.warn("Unknown publication format on :broadcast", ctx.data);
      }
    } catch (err) {
      console.error("Error handling broadcast publication:", err);
    }
  }, []);

  const handleDmPublication = useCallback((ctx: PublicationContext) => {
    try {
      if (!ctx.data || !(ctx.data instanceof Uint8Array || ArrayBuffer.isView(ctx.data))) {
        console.warn("Unexpected DM publication format", ctx.data);
        return;
      }
      console.log("[dm] raw publication:", ctx.data);
      const bytes = ctx.data instanceof Uint8Array
        ? ctx.data
        : new Uint8Array((ctx.data as ArrayBufferView).buffer, (ctx.data as ArrayBufferView).byteOffset, (ctx.data as ArrayBufferView).byteLength);
      const decoded = creator_stage.realtime.v1.ChatMessage.decode(bytes);
      console.log("DM decoded:", decoded)
      const uiMsg = { ...mapToUiMessage(decoded as FlexibleRawChatMessage), isDm: true };
      console.log("UI DM decoded:", uiMsg)
      setMessages((prev) => [...prev, uiMsg].slice(-200));
    } catch (err) {
      console.error("Error handling DM publication:", err);
    }
  }, []);


  const { state: broadcastState } = useChannel(channels.broadcast(sessionId), {
    onPublication: handlePublication,
  });

  const { subscription: chatSub } = useChannel(channels.chat(sessionId));
  useChannel(channels.dm(sessionId, "2"), { onPublication: handleDmPublication });

  useEffect(() => {
    if (broadcastState === "subscribed") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, [broadcastState]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!chatSub) {
        console.warn("Cannot send message: no active chat subscription");
        return;
      }

      const localMsg: ChatMessage = {
        id: `local-${Date.now()}-${Math.random()}`,
        authorName: "You",
        messageText: text,
        timestamp: new Date().toISOString(),
        role: "viewer",
      };

      setMessages((prev) => {
        const next = [...prev, localMsg];
        return next.slice(-200);
      });

      const request = creator_stage.realtime.v1.ChatPublishRequest.create({
        body: text,
      });
      const bytes =
        creator_stage.realtime.v1.ChatPublishRequest.encode(request).finish();

      try {
        await chatSub.publish(bytes);
      } catch (err) {
        console.error("Failed to publish message:", err);
      }
    },
    [chatSub],
  );

  return {
    messages,
    pinnedMessage,
    isLoading,
    sendMessage,
  };
}
