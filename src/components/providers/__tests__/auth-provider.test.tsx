import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from '../auth-provider';
import { useAuthStore } from '../../../stores/auth-store';
import { useRouter } from 'next/navigation';

vi.mock('../../../stores/auth-store', () => {
  const mockStore = vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (mockStore as any).getState = vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (mockStore as any).subscribe = vi.fn();
  return {
    useAuthStore: mockStore,
  };
});

vi.mock('../../../api/auth', () => ({
  getToken: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

const TestComponent = () => {
  const { isAuthenticated, role } = useAuth();
  return (
    <div>
      <span data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</span>
      <span data-testid="auth-role">{role ?? 'none'}</span>
    </div>
  );
};

describe('AuthProvider', () => {
  const mockPush = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useRouter as any).mockReturnValue({ push: mockPush });
    const mockState = {
      jwt: null,
      role: null,
      expiry: null,
      clearToken: vi.fn(),
      setToken: vi.fn(),
      setRefreshTimer: vi.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useAuthStore as any).mockReturnValue(mockState);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useAuthStore.getState as any).mockReturnValue(mockState);
  });

  it('renders children and shows unauthenticated state initially', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('unauthenticated');
  });

  it('shows authenticated state if store has JWT', () => {
    const mockState = {
      jwt: 'fake-jwt',
      role: 'audience',
      expiry: Date.now() / 1000 + 10000,
      clearToken: vi.fn(),
      setToken: vi.fn(),
      setRefreshTimer: vi.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useAuthStore as any).mockReturnValue(mockState);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useAuthStore.getState as any).mockReturnValue(mockState);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('auth-role')).toHaveTextContent('audience');
  });
});
