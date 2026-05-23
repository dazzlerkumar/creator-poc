import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { useChannel } from '@/hooks/use-channel';
import { centrifugeClient } from '@/lib/centrifuge-client';
import { useRealtimeStore } from '@/stores/realtime-store';
import { ConnectionStatus } from '@/types/realtime';
import type { Subscription, Centrifuge } from 'centrifuge/build/protobuf';

vi.mock('@/lib/centrifuge-client', () => ({
  centrifugeClient: {
    get: vi.fn(),
  },
}));

vi.mock('@/stores/realtime-store', () => ({
  useRealtimeStore: vi.fn(),
}));

interface MockSubscription {
  on: Mock<(event: string, callback: (...args: unknown[]) => void) => void>;
  off: Mock<(event: string, callback: (...args: unknown[]) => void) => void>;
  subscribe: Mock<() => void>;
  unsubscribe: Mock<() => void>;
}

interface MockClient {
  newSubscription: Mock<(channelName: string) => MockSubscription>;
  removeSubscription: Mock<(sub: MockSubscription) => void>;
  getSubscription: Mock<(channelName: string) => MockSubscription | null>;
}

describe('useChannel Hook', () => {
  let mockClient: MockClient;
  let mockSubscription: MockSubscription;
  let listeners: Record<string, ((...args: unknown[]) => void)[]>;
  let setChannelStatusMock: Mock<(channel: string, status: ConnectionStatus) => void>;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    listeners = {};

    mockSubscription = {
      on: vi.fn((event: string, callback: (...args: unknown[]) => void) => {
        if (!listeners[event]) {
          listeners[event] = [];
        }
        listeners[event].push(callback);
      }),
      off: vi.fn((event: string, callback: (...args: unknown[]) => void) => {
        if (listeners[event]) {
          listeners[event] = listeners[event].filter(cb => cb !== callback);
        }
      }),
      subscribe: vi.fn(),
      unsubscribe: vi.fn(),
    };

    mockClient = {
      newSubscription: vi.fn().mockReturnValue(mockSubscription),
      removeSubscription: vi.fn(),
      getSubscription: vi.fn().mockReturnValue(null),
    };

    vi.mocked(centrifugeClient.get).mockReturnValue(mockClient as unknown as Centrifuge);

    setChannelStatusMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useRealtimeStore).mockImplementation((selector: any) => {
      return selector({ setChannelStatus: setChannelStatusMock });
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const triggerSubEvent = (event: string, ...args: unknown[]) => {
    act(() => {
      if (listeners[event]) {
        listeners[event].forEach((cb) => cb(...args));
      }
    });
  };

  it('subscribes to a channel when mounted with a channel name', () => {
    const channelName = 'session:123:chat';
    const { result } = renderHook(() => useChannel(channelName));

    expect(centrifugeClient.get).toHaveBeenCalled();
    expect(mockClient.getSubscription).toHaveBeenCalledWith(channelName);
    expect(mockClient.newSubscription).toHaveBeenCalledWith(channelName);
    expect(mockSubscription.subscribe).toHaveBeenCalled();
    
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.subscription).toBe(mockSubscription as unknown as Subscription);
  });

  it('uses existing subscription if already available', () => {
    const channelName = 'session:123:chat';
    mockClient.getSubscription.mockReturnValue(mockSubscription);

    const { result } = renderHook(() => useChannel(channelName));

    expect(mockClient.getSubscription).toHaveBeenCalledWith(channelName);
    expect(mockClient.newSubscription).not.toHaveBeenCalled();
    expect(mockSubscription.subscribe).toHaveBeenCalled();
    
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.subscription).toBe(mockSubscription as unknown as Subscription);
  });

  it('does not subscribe if channelName is null', () => {
    const { result } = renderHook(() => useChannel(null));

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(centrifugeClient.get).not.toHaveBeenCalled();
    expect(result.current.subscription).toBeNull();
  });

  it('calls the onPublication callback if provided', () => {
    const channelName = 'session:123:chat';
    const onPublicationMock = vi.fn();

    renderHook(() => useChannel(channelName, { onPublication: onPublicationMock }));

    const ctx = { data: 'test data' };
    triggerSubEvent('publication', ctx);

    expect(onPublicationMock).toHaveBeenCalledWith(ctx);
  });

  it('unsubscribes and removes subscription and unbinds events on unmount', () => {
    const channelName = 'session:123:chat';
    const { unmount } = renderHook(() => useChannel(channelName));

    unmount();

    expect(mockSubscription.off).toHaveBeenCalledWith('state', expect.any(Function));
    expect(mockSubscription.off).toHaveBeenCalledWith('publication', expect.any(Function));
    expect(mockSubscription.off).toHaveBeenCalledWith('error', expect.any(Function));
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    expect(mockClient.removeSubscription).toHaveBeenCalledWith(mockSubscription as unknown as Subscription);
  });

  it('updates channel status on sub state change', () => {
    const channelName = 'session:123:chat';
    const { result } = renderHook(() => useChannel(channelName));

    triggerSubEvent('state', { newState: 'subscribed' });
    expect(setChannelStatusMock).toHaveBeenCalledWith(channelName, ConnectionStatus.CONNECTED);
    expect(result.current.state).toBe('subscribed');
    
    triggerSubEvent('state', { newState: 'subscribing' });
    expect(setChannelStatusMock).toHaveBeenCalledWith(channelName, ConnectionStatus.CONNECTING);
    expect(result.current.state).toBe('subscribing');

    triggerSubEvent('state', { newState: 'unsubscribed' });
    expect(setChannelStatusMock).toHaveBeenCalledWith(channelName, ConnectionStatus.DISCONNECTED);
    expect(result.current.state).toBe('unsubscribed');
  });

  it('sets denied status on permission denied error', () => {
    const channelName = 'session:123:chat';
    renderHook(() => useChannel(channelName));

    triggerSubEvent('error', { error: { code: 102, message: 'permission denied' } });
    expect(setChannelStatusMock).toHaveBeenCalledWith(channelName, ConnectionStatus.DENIED);
  });
});
