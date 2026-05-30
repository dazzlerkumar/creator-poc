"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chat";
import { useRealtimeStore } from "@/stores/realtime-store";
import { useAuthStore } from "@/stores/auth-store";
import { BroadcastRealtimeClient } from "@/lib/broadcast-realtime-client";
import Cookies from "js-cookie";
import { decodeJwt } from "@/lib/jwt-decode";



export function useLiveChat(sessionId = "4uPEuX") {
  const [prevSessionId, setPrevSessionId] = useState(sessionId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setConnectionStatus = useRealtimeStore(
    (state) => state.setConnectionStatus,
  );
  const jwt = useAuthStore((state) => state.jwt);

  const clientRef = useRef<BroadcastRealtimeClient | null>(null);

  if (sessionId !== prevSessionId) {
    setPrevSessionId(sessionId);
    setIsLoading(true);
    setMessages([]);
    setPinnedMessage(null);
  }

  useEffect(() => {
    if (!sessionId) return;
    const token = Cookies.get('audienceAccessToken') || '';
    const decoded = decodeJwt(token);
    const client = new BroadcastRealtimeClient({
      sessionId,
      userId: decoded?.payload?.accountId || 'anonymous-user',
      displayName: JSON.parse(Cookies.get('USER_DATA') || '{}')?.name || 'Anonymous',
      ...(jwt ? { token: jwt } : {}),
      onMessages: (newMessages) => {
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const deduped = newMessages.filter((m) => !existingIds.has(m.id));
          if (deduped.length === 0) return prev;
          const next = [...prev, ...deduped];
          return next.slice(-200);
        });
      },
      onPin: (msg) => setPinnedMessage(msg),
      onConnectionStatus: setConnectionStatus,
      onLoading: setIsLoading,
    });

    clientRef.current = client;
    client.connect();

    return () => {
      client.disconnect();
      clientRef.current = null;
    };
  }, [sessionId, setConnectionStatus, jwt]);

  const sendMessage = useCallback(async (text: string) => {
    if (!clientRef.current) return;

    const localMsg = await clientRef.current.sendMessage(text);
    if (localMsg) {
      setMessages((prev) => {
        if (prev.some((m) => m.id === localMsg.id)) return prev;
        const next = [...prev, localMsg];
        return next.slice(-200);
      });
    }
  }, []);

  return {
    messages,
    pinnedMessage,
    isLoading,
    sendMessage,
  };
}
