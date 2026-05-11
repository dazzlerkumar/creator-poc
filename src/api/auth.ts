import { clientApi } from '@/lib/api-client';
import { UserRole, useAuthStore } from '../stores/auth-store';

export interface AuthTokenResponse {
  jwt: string;
  role: UserRole;
  expiry: number; // Unix timestamp
}

export interface GetTokenParams {
  sessionId: string;
  inviteToken?: string;
  identityToken?: string;
}

export async function login(identityToken: string): Promise<AuthTokenResponse> {
  return clientApi.post<AuthTokenResponse>('/api/auth/login', { identity_token: identityToken });
}

export async function getToken(params: GetTokenParams): Promise<AuthTokenResponse> {
  return clientApi.post<AuthTokenResponse>('/api/auth/token', {
    session_id: params.sessionId,
    invite_token: params.inviteToken,
    identity_token: params.identityToken,
  });
}

export const authApi = {
  login,
  getToken,
  logout: () => {
    // Basic logout implementation for now
    useAuthStore.getState().clearToken();
  }
};
