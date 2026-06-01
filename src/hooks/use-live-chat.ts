"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chat";
import { useRealtimeStore } from "@/stores/realtime-store";
import { useAuthStore } from "@/stores/auth-store";
import { useUIStore } from "@/stores/ui-store";
import { useQuizStore } from "@/stores/quiz-store";
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
  const setShowPayment = useUIStore((state) => state.setShowPayment);
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
    let decoded = null;

    if (token) {
      try {
        decoded = decodeJwt(token);
      } catch (error) {
        console.error('Invalid JWT in cookie:', error);
      }
    }

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
      onRemoveMessage: (id) => setMessages((prev) => prev.filter((m) => m.id !== id)),
      onConnectionStatus: setConnectionStatus,
      onLoading: setIsLoading,
      onCtaPush: (cta) => setShowPayment(cta !== null),
      onQuizStart: (quizPayload) => {
        const payload = quizPayload as { id?: string; quizId?: string; question: string; options?: Array<{ id: string; label: string }>; durationSecs?: number };
        // Map protobuf Quiz payload to QuizQuestion store type
        const question = {
          questionId: payload.id || payload.quizId || "",
          text: payload.question || "",
          options: (payload.options || []).map((o) => ({
            id: o.id,
            text: o.label
          })),
          durationSeconds: payload.durationSecs || 60
        };
        useQuizStore.getState().startQuiz(question);
        useUIStore.getState().setShowQuiz(true);
      },
      onQuizEnd: (resultsPayload) => {
        console.log(resultsPayload)
        // In a real app we might parse results, here we just end it
        useQuizStore.getState().endQuiz();
        useUIStore.getState().setShowQuiz(false);
      },
    });

    clientRef.current = client;
    client.connect();

    return () => {
      client.disconnect();
      clientRef.current = null;
    };
  }, [sessionId, setConnectionStatus, jwt, setShowPayment]);

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
