'use client';

import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, UserRole } from '../../stores/auth-store';
import { getToken } from '../../api/auth';

interface AuthContextType {
  jwt: string | null;
  role: UserRole;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { jwt, role, expiry, clearToken, setToken, setRefreshTimer } = useAuthStore();

  const logout = useCallback(() => {
    clearToken();
    if (role === 'creator') {
      router.push('/login');
    } else {
      router.push('/join');
    }
  }, [clearToken, role, router]);

  const refresh = useCallback(async () => {
    if (!jwt || !expiry) return;

    try {
      // For now, we use getToken with current session context if possible.
      // This logic might need refinement based on how the backend handles refresh tokens vs session tokens.
      // For this implementation, we assume getToken can be used to refresh if we have a valid JWT.
      // If the backend requires a specific refresh endpoint, we should update this.
      
      // Since we don't have the sessionId here easily (it might be in the URL), 
      // we might need to extract it from the URL or store it in the auth store.
      // Assuming sessionId is needed for refresh:
      const sessionId = window.location.pathname.split('/').pop() || '';
      
      if (!sessionId) {
        throw new Error('No session ID found for refresh');
      }

      const response = await getToken({ sessionId });
      setToken(response.jwt, response.role, response.expiry);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    }
  }, [jwt, expiry, logout, setToken]);

  useEffect(() => {
    if (!jwt || !expiry) return;

    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = expiry - now;
    const refreshThreshold = 60; // Refresh 60 seconds before expiry

    if (timeUntilExpiry <= 0) {
      logout();
      return;
    }

    // Schedule refresh
    const delay = Math.max(0, (timeUntilExpiry - refreshThreshold) * 1000);
    const handle = window.setTimeout(refresh, delay);
    setRefreshTimer(handle as unknown as number);

    return () => {
      if (handle) {
        window.clearTimeout(handle);
      }
    };
  }, [jwt, expiry, refresh, logout, setRefreshTimer]);

  const value = {
    jwt,
    role,
    isAuthenticated: !!jwt,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
