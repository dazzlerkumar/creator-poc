export const channels = {
  audience: (sid: string) => `video_broadcast:${sid}:audience`,
} as const;
