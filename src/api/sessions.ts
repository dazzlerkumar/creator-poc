import { clientApi } from '@/lib/api-client';

export interface SessionStatusResponse {
  status: 'live' | 'ended' | 'scheduled';
}

export async function getSessionStatus(sid: string): Promise<SessionStatusResponse> {
  return clientApi.get<SessionStatusResponse>(`/api/sessions/${sid}/status`);
}

export const sessionsApi = {
  getStatus: getSessionStatus,
};
