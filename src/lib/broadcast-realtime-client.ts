import { createId } from "@paralleldrive/cuid2";
import { RingBuffer } from "@/lib/ring-buffer";
import { creator_stage } from "@/lib/proto";
import { centrifugeClient } from "@/lib/centrifuge-client";
import { channels } from "@/config/channels";
import { ConnectionStatus } from "@/types/realtime";
import { PublicationContext, Subscription, SubscriptionState } from "centrifuge/build/protobuf";
import { ChatMessage } from "@/app/(main)/join/_components/live-chat";

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
  const id = raw.id ?? createId();
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

export interface BroadcastRealtimeClientOptions {
  sessionId: string;
  userId: string;
  displayName: string;
  onMessages?: (messages: ChatMessage[]) => void;
  onPin?: (message: ChatMessage | null) => void;
  onConnectionStatus?: (status: ConnectionStatus) => void;
  onLoading?: (isLoading: boolean) => void;
}

export class BroadcastRealtimeClient {
  private sessionId: string;
  private userId: string;
  private displayName: string;

  private onMessages: ((messages: ChatMessage[]) => void) | undefined;
  private onPin: ((message: ChatMessage | null) => void) | undefined;
  private onConnectionStatus: ((status: ConnectionStatus) => void) | undefined;
  private onLoading: ((isLoading: boolean) => void) | undefined;

  private buffer = new RingBuffer<ChatMessage>(500);
  private flushScheduled = false;

  private client: ReturnType<typeof centrifugeClient.get> = null;
  private subscriptions: Subscription[] = [];
  private audienceSub: Subscription | null = null;

  constructor(options: BroadcastRealtimeClientOptions) {
    this.sessionId = options.sessionId;
    this.userId = options.userId;
    this.displayName = options.displayName;
    this.onMessages = options.onMessages;
    this.onPin = options.onPin;
    this.onConnectionStatus = options.onConnectionStatus;
    this.onLoading = options.onLoading;
  }

  public connect() {
    this.client = centrifugeClient.createAudience({
      videoBroadcastId: this.sessionId,
      userId: this.userId,
      displayName: this.displayName,
    });

    if (!this.client) return;

    this.client.on("connecting", () => this.onConnectionStatus?.(ConnectionStatus.CONNECTING));
    this.client.on("connected", () => this.onConnectionStatus?.(ConnectionStatus.CONNECTED));
    this.client.on("disconnected", () => this.onConnectionStatus?.(ConnectionStatus.DISCONNECTED));

    this.client.connect();

    this.audienceSub = this.setupSubscription(channels.audience(this.sessionId), this.handleAudiencePublication.bind(this));
  }

  public disconnect() {
    if (!this.client) return;

    this.subscriptions.forEach(sub => {
      sub.removeAllListeners();
      sub.unsubscribe();
      this.client!.removeSubscription(sub);
    });
    this.subscriptions = [];
    this.audienceSub = null;

    // We don't necessarily call centrifugeClient.destroy() here 
    // because other components might be using the client. 
    // The previous use-live-chat.ts just let it be or let useChannel handle unsubscribing.
  }

  private setupSubscription(channel: string, onPublication?: (ctx: PublicationContext) => void): Subscription | null {
    if (!this.client) return null;

    let sub = this.client.getSubscription(channel);
    if (!sub) {
      sub = this.client.newSubscription(channel);
    }

    if (onPublication) {
      sub.on("publication", onPublication);
    }

    sub.on("state", (ctx: { newState: SubscriptionState, oldState: SubscriptionState }) => {
      if (channel === channels.audience(this.sessionId) && ctx.newState === "subscribed") {
        this.onLoading?.(false);
      }
    });

    sub.subscribe();
    this.subscriptions.push(sub);
    return sub;
  }

  private flushBuffer() {
    const drained = this.buffer.drain();
    if (drained.length > 0) {
      this.onMessages?.(drained);
      this.onLoading?.(false);
    }
  }

  private handleAudiencePublication(ctx: PublicationContext) {
    try {
      if (!ctx.data) return;

      if (ctx.data instanceof Uint8Array || ArrayBuffer.isView(ctx.data)) {
        const bytes = ctx.data instanceof Uint8Array
          ? ctx.data
          : new Uint8Array((ctx.data as ArrayBufferView).buffer, (ctx.data as ArrayBufferView).byteOffset, (ctx.data as ArrayBufferView).byteLength);

        try {
          const decodedEvent = creator_stage.realtime.v1.AudienceChatEvents.decode(bytes);
          if (decodedEvent.chatMessage) {
            const uiMsg = mapToUiMessage(decodedEvent.chatMessage as FlexibleRawChatMessage);
            this.buffer.push(uiMsg);

            if (!this.flushScheduled) {
              this.flushScheduled = true;
              requestAnimationFrame(() => {
                this.flushScheduled = false;
                this.flushBuffer();
              });
            }
          }
        } catch {
          try {
            const batched = creator_stage.realtime.v1.BatchedChatMessages.decode(bytes);
            if (batched.messages && batched.messages.length > 0) {
              batched.messages.forEach((msg) => {
                const uiMsg = mapToUiMessage(msg as FlexibleRawChatMessage);
                this.buffer.push(uiMsg);
              });

              if (!this.flushScheduled) {
                this.flushScheduled = true;
                requestAnimationFrame(() => {
                  this.flushScheduled = false;
                  this.flushBuffer();
                });
              }
            }
          } catch {
            // ignore
          }
        }
      } else if (typeof ctx.data === "object" && ctx.data !== null && "kind" in ctx.data && (ctx.data as Record<string, unknown>).kind === "audienceChatEvents") {
        const envelope = ctx.data as { kind: string; payload: Record<string, unknown> };
        try {
          const decodedEvent = creator_stage.realtime.v1.AudienceChatEvents.decode(
            creator_stage.realtime.v1.AudienceChatEvents.encode(
              creator_stage.realtime.v1.AudienceChatEvents.fromObject(envelope.payload),
            ).finish(),
          );

          if (decodedEvent.chatMessage) {
            const uiMsg = mapToUiMessage(decodedEvent.chatMessage as FlexibleRawChatMessage);
            this.buffer.push(uiMsg);

            if (!this.flushScheduled) {
              this.flushScheduled = true;
              requestAnimationFrame(() => {
                this.flushScheduled = false;
                this.flushBuffer();
              });
            }
          }
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error("Error handling audience publication:", err);
    }
  }

  public async sendMessage(text: string): Promise<ChatMessage | null> {
    if (!this.audienceSub) {
      console.warn("Cannot send message: no active audience subscription");
      return null;
    }

    const messageId = createId();

    const localMsg: ChatMessage = {
      id: messageId,
      authorName: "You", // fallback
      messageText: text,
      timestamp: new Date().toISOString(),
      role: "viewer",
    };

    const event = creator_stage.realtime.v1.AudienceChatEvents.create({
      type: creator_stage.realtime.v1.AudienceMessageType.TYPE_AUDIENCE_MESSAGE,
      chatMessage: creator_stage.realtime.v1.AudienceChatMessage.create({
        id: messageId,
        body: text,
        userId: this.userId,
        videoBroadcastId: this.sessionId,
        displayName: this.displayName,
        role: creator_stage.realtime.v1.Role.ROLE_AUDIENCE,
      })
    });
    
    const bytes = creator_stage.realtime.v1.AudienceChatEvents.encode(event).finish();

    try {
      await this.audienceSub.publish(bytes);
      return localMsg;
    } catch (err) {
      console.error("Failed to publish message:", err);
      return null;
    }
  }
}
