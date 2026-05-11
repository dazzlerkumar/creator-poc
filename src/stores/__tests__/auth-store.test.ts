import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../auth-store';

describe('Auth Store', () => {
  beforeEach(() => {
    useAuthStore.getState().clearToken();
  });

  it('should initialize with null values', () => {
    const state = useAuthStore.getState();
    expect(state.jwt).toBeNull();
    expect(state.role).toBeNull();
    expect(state.expiry).toBeNull();
  });

  it('should setToken correctly', () => {
    const mockJwt = 'mock-jwt-token';
    const mockRole = 'creator';
    const mockExpiry = Date.now() + 3600000;

    useAuthStore.getState().setToken(mockJwt, mockRole, mockExpiry);

    const state = useAuthStore.getState();
    expect(state.jwt).toBe(mockJwt);
    expect(state.role).toBe(mockRole);
    expect(state.expiry).toBe(mockExpiry);
  });

  it('should clearToken correctly', () => {
    useAuthStore.getState().setToken('token', 'audience', Date.now());
    useAuthStore.getState().clearToken();

    const state = useAuthStore.getState();
    expect(state.jwt).toBeNull();
    expect(state.role).toBeNull();
    expect(state.expiry).toBeNull();
  });

  it('should persist to sessionStorage', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');
    useAuthStore.getState().setToken('token', 'creator', Date.now());

    // Check if sessionStorage was called (Zustand persist uses it)
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
