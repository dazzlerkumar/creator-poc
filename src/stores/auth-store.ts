import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserRole = 'audience' | 'creator' | null;

export interface AuthState {
  jwt: string | null;
  role: UserRole;
  expiry: number | null;
  refreshTimerHandle: number | null;
}

export interface AuthActions {
  setToken: (jwt: string, role: UserRole, expiry: number) => void;
  clearToken: () => void;
  setRefreshTimer: (handle: number | null) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      jwt: null,
      role: null,
      expiry: null,
      refreshTimerHandle: null,

      setToken: (jwt, role, expiry) => set({ 
        jwt, 
        role, 
        expiry 
      }),

      clearToken: () => {
        set((state) => {
          if (state.refreshTimerHandle) {
            clearTimeout(state.refreshTimerHandle);
          }
          return {
            jwt: null,
            role: null,
            expiry: null,
            refreshTimerHandle: null,
          };
        });
      },

      setRefreshTimer: (handle) => set({ refreshTimerHandle: handle }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        jwt: state.jwt,
        role: state.role,
        expiry: state.expiry,
      }),
    }
  )
);
