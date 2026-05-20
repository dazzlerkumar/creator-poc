import { useState, useEffect, useRef, useCallback } from 'react';
import { useChannel } from '@/hooks/use-channel';
import { RingBuffer } from '@/lib/ring-buffer';
import { getRecentChat } from '@/api/chat';
import { creator_stage } from '@/lib/proto';
import { ChatMessage } from '@/components/live-chat';
import { PublicationContext } from 'centrifuge/build/protobuf';

const AVATAR_GRADIENTS = [
  'from-blue-500 to-indigo-500',
  'from-purple-500 to-pink-500',
  'from-rose-500 to-orange-500',
  'from-teal-500 to-emerald-500',
  'from-cyan-500 to-blue-500',
];
const DUMMY_MESSAGES: ChatMessage[] = [
  { id: '1', authorName: 'John Doe', authorAvatarColor: 'bg-red-500', messageText: 'Hello Saurabh Ji!', timestamp: new Date().toISOString(), role: 'viewer' },
  { id: '2', authorName: 'Jane Smith', authorAvatarColor: 'bg-blue-500', messageText: 'Nice to see you all!', timestamp: new Date().toISOString(), role: 'viewer' },
  { id: '3', authorName: 'Saurabh', authorAvatarColor: 'bg-green-500', messageText: 'Welcome to the stream!', timestamp: new Date().toISOString(), role: 'moderator' },
  { id: '4', authorName: 'John Doe', authorAvatarColor: 'bg-red-500', messageText: 'This is a test message.', timestamp: new Date().toISOString(), role: 'viewer' },
  { id: '5', authorName: 'Jane Smith', authorAvatarColor: 'bg-blue-500', messageText: 'Looking forward to the yoga session.', timestamp: new Date().toISOString(), role: 'viewer' },
  { id: '6', authorName: 'Saurabh', authorAvatarColor: 'bg-green-500', messageText: 'The session will start in 5 minutes.', timestamp: new Date().toISOString(), role: 'moderator' },
  { id: '7', authorName: 'Saurabh', authorAvatarColor: 'bg-green-500', messageText: 'The session will start in 5 minutes.', timestamp: new Date().toISOString(), role: 'moderator' },
  { id: '8', authorName: 'Jane Smith', authorAvatarColor: 'bg-blue-500', messageText: 'This is a very long message. It should wrap around the container. Let us see how it works. If it breaks the layout, we will fix it later.', timestamp: new Date().toISOString(), role: 'viewer' },
]
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

function getAvatarColor(role: number | string, name: string): string {
  if (role === 1 || role === 'ROLE_CREATOR') return 'from-amber-500 to-yellow-500';
  if (role === 2 || role === 'ROLE_TEAM') return 'from-emerald-500 to-teal-500';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index]!;
}

function mapToUiMessage(raw: FlexibleRawChatMessage): ChatMessage {
  const body = raw.body ?? raw.messageText ?? '';
  const displayName = raw.displayName ?? raw.display_name ?? raw.authorName ?? 'Unknown';
  const role = raw.role ?? 3;
  const id = raw.id ?? `msg-${Date.now()}-${Math.random()}`;
  const pinned = raw.pinned ?? raw.isPinned ?? false;

  let roleStr: 'viewer' | 'moderator' | 'owner' = 'viewer';
  if (role === 1 || role === 'ROLE_CREATOR') {
    roleStr = 'owner';
  } else if (role === 2 || role === 'ROLE_TEAM') {
    roleStr = 'moderator';
  }

  let timestampStr = new Date().toISOString();
  const sentAt = raw.sentAt ?? raw.sent_at;
  if (sentAt) {
    if (typeof sentAt === 'string') {
      timestampStr = sentAt;
    } else if (typeof sentAt === 'number') {
      timestampStr = new Date(sentAt).toISOString();
    } else if (typeof sentAt === 'object') {
      const seconds = sentAt.seconds ?? 0;
      const nanos = sentAt.nanos ?? 0;
      timestampStr = new Date(seconds * 1000 + Math.floor(nanos / 1000000)).toISOString();
    }
  } else if (raw.timestamp) {
    timestampStr = raw.timestamp;
  }

  return {
    id,
    authorName: displayName,
    authorAvatarColor: getAvatarColor(role, displayName),
    messageText: body,
    timestamp: timestampStr,
    role: roleStr,
    isPinned: pinned,
  };
}

export function useLiveChat(sessionId: string) {
  const [prevSessionId, setPrevSessionId] = useState(sessionId);
  const [messages, setMessages] = useState<ChatMessage[]>(DUMMY_MESSAGES);
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  if (sessionId !== prevSessionId) {
    setPrevSessionId(sessionId);
    setIsLoading(true);
    setMessages([]);
    setPinnedMessage(null);
  }

  const bufferRef = useRef(new RingBuffer<ChatMessage>(500));
  const flushScheduledRef = useRef(false);

  // Fetch initial chat history
  useEffect(() => {
    if (!sessionId) return;
    getRecentChat(sessionId)
      .then((res) => {
        const mappedMsgs = (res.messages || []).map((m) => mapToUiMessage(m as FlexibleRawChatMessage));
        setMessages(mappedMsgs.slice(-200));
        if (res.pinned_message) {
          setPinnedMessage(mapToUiMessage(res.pinned_message as FlexibleRawChatMessage));
        } else {
          setPinnedMessage(null);
        }
      })
      .catch((err) => {
        console.error('Failed to load recent chat:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sessionId]);

  const handlePublication = useCallback((ctx: PublicationContext) => {
    try {
      if (!ctx.data) return;
      const decoded = creator_stage.realtime.v1.ChatMessage.decode(new Uint8Array(ctx.data));
      const uiMsg = mapToUiMessage(decoded as FlexibleRawChatMessage);

      if (uiMsg.isPinned) {
        setPinnedMessage(uiMsg);
      }

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
          }
        });
      }
    } catch (err) {
      console.error('Error handling live chat message:', err);
    }
  }, []);

  const channelName = sessionId ? `session:${sessionId}:chat` : null;
  const { subscription } = useChannel(channelName, {
    onPublication: handlePublication,
  });

  const sendMessage = useCallback(async (text: string) => {
    if (!subscription) {
      console.warn('Cannot send message: no active subscription');
      return;
    }
    const request = creator_stage.realtime.v1.ChatPublishRequest.create({ body: text });
    const bytes = creator_stage.realtime.v1.ChatPublishRequest.encode(request).finish();
    await subscription.publish(bytes);
  }, [subscription]);

  return {
    messages,
    pinnedMessage,
    isLoading,
    sendMessage,
  };
}
