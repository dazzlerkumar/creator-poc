export const channels = {
  chat: (sid: string) => `session:${sid}:chat`,
  activity: (sid: string) => `session:${sid}:activity`,
  analytics: (sid: string) => `session:${sid}:analytics`,
} as const;
