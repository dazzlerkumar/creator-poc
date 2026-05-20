import { client } from './client';

export interface RawChatMessage {
  id: string;
  video_broadcast_id?: string;
  user_id: string;
  role: number | string;
  display_name: string;
  body: string;
  sent_at: { seconds: number; nanos: number } | string;
  pinned?: boolean;
}

export interface ChatRecentResponse {
  messages: RawChatMessage[];
  pinned_message?: RawChatMessage | null;
  active_cta?: unknown;
}

export async function getRecentChat(sessionId: string): Promise<ChatRecentResponse> {
  return client<ChatRecentResponse>(`/api/sessions/${sessionId}/chat/recent`);
}

export const chatApi = {
  getRecent: getRecentChat,
};
