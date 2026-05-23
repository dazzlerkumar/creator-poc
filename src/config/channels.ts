export const channels = {
  chat: (sid: string) => `video_broadcast:${sid}:chat`,
  broadcast: (sid: string) => `video_broadcast:${sid}:broadcast`,
  dm: (sid: string, userId: string) => `video_broadcast:${sid}:dm:${userId}`,
  activity: (sid: string) => `video_broadcast:${sid}:activity`,
  analytics: (sid: string) => `video_broadcast:${sid}:analytics`,
} as const;
