export const channels = {
  audience: (sid: string) => `video_broadcast:${sid}:audience`,
  broadcast: (sid: string) => `video_broadcast:${sid}:creator`,
  directMessage: (sid: string, uid: string) => `video_broadcast:${sid}:dm:${uid}`,
} as const;
