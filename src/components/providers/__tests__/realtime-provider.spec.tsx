import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import React, { ReactElement } from 'react';
import { RealtimeProvider } from '@/components/providers/realtime-provider';
import { useAuthStore } from '@/stores/auth-store';
import { useRealtimeStore } from '@/stores/realtime-store';
import { centrifugeClient } from '@/lib/centrifuge-client';
import { ConnectionStatus } from '@/types/realtime';
import type { Centrifuge } from 'centrifuge/build/protobuf';

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('@/stores/realtime-store', () => ({
  useRealtimeStore: vi.fn(),
}));

vi.mock('@/lib/centrifuge-client', () => ({
  centrifugeClient: {
    create: vi.fn(),
    destroy: vi.fn(),
    get: vi.fn(),
  },
}));

interface MockCentrifuge {
  state: string;
  on: Mock<(event: string, callback: (...args: unknown[]) => void) => void>;
  connect: Mock<() => void>;
  disconnect: Mock<() => void>;
}

describe('RealtimeProvider', () => {
  let mockClient: MockCentrifuge;
  let listeners: Record<string, ((...args: unknown[]) => void)[]>;
  let setConnectionStatusMock: Mock<(status: ConnectionStatus) => void>;
  let resetMock: Mock<() => void>;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    listeners = {};

    mockClient = {
      state: 'disconnected',
      on: vi.fn((event: string, callback: (...args: unknown[]) => void) => {
        if (!listeners[event]) {
          listeners[event] = [];
        }
        listeners[event].push(callback);
      }),
      connect: vi.fn(),
      disconnect: vi.fn(),
    };

    vi.mocked(centrifugeClient.create).mockReturnValue(mockClient as unknown as Centrifuge);
    vi.mocked(centrifugeClient.get).mockReturnValue(mockClient as unknown as Centrifuge);

    setConnectionStatusMock = vi.fn();
    resetMock = vi.fn();

    vi.mocked(useRealtimeStore).mockReturnValue({
      setConnectionStatus: setConnectionStatusMock,
      reset: resetMock,
    } as unknown as ReturnType<typeof useRealtimeStore>);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const triggerEvent = (event: string, ...args: unknown[]) => {
    act(() => {
      if (listeners[event]) {
        listeners[event].forEach((cb) => cb(...args));
      }
    });
  };

  it('connects when JWT is set', async () => {
    vi.mocked(useAuthStore).mockReturnValue('fake-jwt-token' as unknown as ReturnType<typeof useAuthStore>);

    await act(async () => {
      render(
        <RealtimeProvider>
          <div data-testid="child">Child Content</div>
        </RealtimeProvider>
      );
    });

    expect(centrifugeClient.create).toHaveBeenCalledWith('fake-jwt-token');
    expect(mockClient.connect).toHaveBeenCalled();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('destroys client and resets store on unmount', async () => {
    vi.mocked(useAuthStore).mockReturnValue('fake-jwt-token' as unknown as ReturnType<typeof useAuthStore>);

    let unmount: () => void;
    await act(async () => {
      const rendered = render(
        <RealtimeProvider>
          <div data-testid="child">Child Content</div>
        </RealtimeProvider>
      );
      unmount = rendered.unmount;
    });

    await act(async () => {
      unmount();
    });

    expect(centrifugeClient.destroy).toHaveBeenCalled();
    expect(resetMock).toHaveBeenCalled();
  });

  it('destroys client and resets store when token is cleared/removed', async () => {
    vi.mocked(useAuthStore).mockReturnValue(null as unknown as ReturnType<typeof useAuthStore>);

    let rerender: (ui: ReactElement) => void;
    await act(async () => {
      const rendered = render(
        <RealtimeProvider>
          <div data-testid="child">Child Content</div>
        </RealtimeProvider>
      );
      rerender = rendered.rerender;
    });

    expect(centrifugeClient.destroy).toHaveBeenCalled();
    expect(resetMock).toHaveBeenCalled();

    vi.clearAllMocks();

    vi.mocked(useAuthStore).mockReturnValue('fake-jwt-token' as unknown as ReturnType<typeof useAuthStore>);
    await act(async () => {
      rerender(
        <RealtimeProvider>
          <div data-testid="child">Child Content</div>
        </RealtimeProvider>
      );
    });
    expect(centrifugeClient.create).toHaveBeenCalledWith('fake-jwt-token');

    vi.clearAllMocks();

    vi.mocked(useAuthStore).mockReturnValue(null as unknown as ReturnType<typeof useAuthStore>);
    await act(async () => {
      rerender(
        <RealtimeProvider>
          <div data-testid="child">Child Content</div>
        </RealtimeProvider>
      );
    });
    expect(centrifugeClient.destroy).toHaveBeenCalled();
    expect(resetMock).toHaveBeenCalled();
  });

  it('updates connectionStatus in store when Centrifuge state changes', async () => {
    vi.mocked(useAuthStore).mockReturnValue('fake-jwt-token' as unknown as ReturnType<typeof useAuthStore>);

    await act(async () => {
      render(
        <RealtimeProvider>
          <div data-testid="child">Child Content</div>
        </RealtimeProvider>
      );
    });

    triggerEvent('connecting');
    expect(setConnectionStatusMock).toHaveBeenCalledWith('connecting');

    triggerEvent('connected');
    expect(setConnectionStatusMock).toHaveBeenCalledWith('connected');

    triggerEvent('disconnected');
    expect(setConnectionStatusMock).toHaveBeenCalledWith('disconnected');
  });

  it('displays reconnect banner when connection stays disconnected for more than 2 seconds', async () => {
    vi.mocked(useAuthStore).mockReturnValue('fake-jwt-token' as unknown as ReturnType<typeof useAuthStore>);

    await act(async () => {
      render(
        <RealtimeProvider>
          <div data-testid="child">Child</div>
        </RealtimeProvider>
      );
    });

    expect(screen.queryByText(/Connection lost/i)).not.toBeInTheDocument();

    mockClient.state = 'disconnected';
    triggerEvent('state');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText(/Connection lost/i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.getByText(/Connection lost/i)).toBeInTheDocument();

    mockClient.state = 'connected';
    triggerEvent('state');
    expect(screen.queryByText(/Connection lost/i)).not.toBeInTheDocument();
  });
});
