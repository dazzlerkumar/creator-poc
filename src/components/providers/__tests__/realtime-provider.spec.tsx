import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { RealtimeProvider } from '@/components/providers/realtime-provider';
import { useRealtimeStore } from '@/stores/realtime-store';
import { ConnectionStatus } from '@/types/realtime';

vi.mock('@/stores/realtime-store', () => ({
  useRealtimeStore: vi.fn(),
}));

describe('RealtimeProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Helper to mock the Zustand store's selected state
  const mockStore = (status: ConnectionStatus) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useRealtimeStore).mockImplementation((selector: any) => {
      const state = { connectionStatus: status };
      return selector(state);
    });
  };

  it('renders children correctly', () => {
    mockStore(ConnectionStatus.CONNECTING);
    render(
      <RealtimeProvider>
        <div data-testid="child">Child Content</div>
      </RealtimeProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('shows disconnect banner after 2 seconds of being disconnected', () => {
    mockStore(ConnectionStatus.DISCONNECTED);
    render(<RealtimeProvider><div /></RealtimeProvider>);

    expect(screen.queryByText(/Connection lost\. Reconnecting\.\.\./i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const banner = screen.getByText(/Connection lost\. Reconnecting\.\.\./i);
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('bg-destructive');
  });

  it('shows connecting banner after 500ms of being connecting', () => {
    mockStore(ConnectionStatus.CONNECTING);
    render(<RealtimeProvider><div /></RealtimeProvider>);

    expect(screen.queryByText(/Connecting\.\.\./i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    const banner = screen.getByText('Connecting...');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('bg-destructive');
  });

  it('shows connection denied banner after 2 seconds of being denied', () => {
    mockStore(ConnectionStatus.DENIED);
    render(<RealtimeProvider><div /></RealtimeProvider>);

    expect(screen.queryByText(/Connection denied/i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const banner = screen.getByText('Connection denied');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('bg-destructive');
  });

  it('hides banner immediately when status is connected', () => {
    // First render with disconnected to show the banner
    let currentStatus = ConnectionStatus.DISCONNECTED;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useRealtimeStore).mockImplementation((selector: any) => {
      return selector({ connectionStatus: currentStatus });
    });

    const { rerender } = render(<RealtimeProvider><div /></RealtimeProvider>);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText(/Connection lost/i)).toBeInTheDocument();

    // Now change to connected
    currentStatus = ConnectionStatus.CONNECTED;
    rerender(<RealtimeProvider><div /></RealtimeProvider>);

    act(() => {
      // It uses a 0ms timeout to hide
      vi.advanceTimersByTime(0);
    });

    expect(screen.queryByText(/Connection lost/i)).not.toBeInTheDocument();
  });
});
