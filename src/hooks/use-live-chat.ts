"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChatMessage } from "@/app/(main)/join/_components/live-chat";
import { useRealtimeStore } from "@/stores/realtime-store";
import { BroadcastRealtimeClient } from "@/lib/broadcast-realtime-client";

export function useLiveChat(sessionId = "4uPEuX") {
  const [prevSessionId, setPrevSessionId] = useState(sessionId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setConnectionStatus = useRealtimeStore(
    (state) => state.setConnectionStatus,
  );

  const clientRef = useRef<BroadcastRealtimeClient | null>(null);

  if (sessionId !== prevSessionId) {
    setPrevSessionId(sessionId);
    setIsLoading(true);
    setMessages([]);
    setPinnedMessage(null);
  }

  useEffect(() => {
    if (!sessionId) return;

    const client = new BroadcastRealtimeClient({
      sessionId,
      userId: "2",
      displayName: "Deepak",
      onMessages: (newMessages) => {
        setMessages((prev) => {
          const next = [...prev, ...newMessages];
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
  }, [sessionId, setConnectionStatus]);

  const sendMessage = useCallback(async (text: string) => {
    if (!clientRef.current) return;
    
    const localMsg = await clientRef.current.sendMessage(text);
    if (localMsg) {
      setMessages((prev) => {
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
