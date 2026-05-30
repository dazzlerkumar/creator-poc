export interface ChatMessage {
  id: string;
  authorName: string;
  messageText: string;
  timestamp: string;
  role: "viewer" | "moderator" | "owner";
  isPinned?: boolean;
  isDm?: boolean;
}
