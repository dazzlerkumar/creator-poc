import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
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
  subscribe: Mock<() => void>;
  unsubscribe: Mock<() => void>;
}

interface MockClient {
  newSubscription: Mock<(channelName: string) => MockSubscription>;
  removeSubscription: Mock<(sub: MockSubscription) => void>;
}

describe('useChannel Hook', () => {
  let mockClient: MockClient;
  let mockSubscription: MockSubscription;
  let listeners: Record<string, ((...args: unknown[]) => void)[]>;
  let setChannelStatusMock: Mock<(channel: string, status: ConnectionStatus) => void>;

  beforeEach(() => {
    vi.clearAllMocks();
    listeners = {};

    mockSubscription = {
      on: vi.fn((event: string, callback: (...args: unknown[]) => void) => {
        if (!listeners[event]) {
          listeners[event] = [];
        }
        listeners[event].push(callback);
      }),
      subscribe: vi.fn(),
      unsubscribe: vi.fn(),
    };

    mockClient = {
      newSubscription: vi.fn().mockReturnValue(mockSubscription),
      removeSubscription: vi.fn(),
    };

    vi.mocked(centrifugeClient.get).mockReturnValue(mockClient as unknown as Centrifuge);

    setChannelStatusMock = vi.fn();
    vi.mocked(useRealtimeStore).mockReturnValue(setChannelStatusMock as unknown as ReturnType<typeof useRealtimeStore>);
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
    expect(mockClient.newSubscription).toHaveBeenCalledWith(channelName);
    expect(mockSubscription.subscribe).toHaveBeenCalled();
    expect(result.current.subscription).toBe(mockSubscription as unknown as Subscription);
  });

  it('does not subscribe if channelName is null', () => {
    const { result } = renderHook(() => useChannel(null));

    expect(centrifugeClient.get).not.toHaveBeenCalled();
    expect(result.current.subscription).toBeNull();
  });

  it('binds the onPublication callback if provided', () => {
    const channelName = 'session:123:chat';
    const onPublicationMock = vi.fn();

    renderHook(() => useChannel(channelName, { onPublication: onPublicationMock }));

    expect(mockSubscription.on).toHaveBeenCalledWith('publication', onPublicationMock);
  });

  it('unsubscribes and removes subscription on unmount', () => {
    const channelName = 'session:123:chat';
    const { unmount } = renderHook(() => useChannel(channelName));

    unmount();

    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    expect(mockClient.removeSubscription).toHaveBeenCalledWith(mockSubscription as unknown as Subscription);
  });

  it('updates channel status on sub state change', () => {
    const channelName = 'session:123:chat';
    renderHook(() => useChannel(channelName));

    triggerSubEvent('state', { newState: 'subscribed' });
    expect(setChannelStatusMock).toHaveBeenCalledWith(channelName, ConnectionStatus.CONNECTED);
  });

  it('sets denied status on permission denied error', () => {
    const channelName = 'session:123:chat';
    renderHook(() => useChannel(channelName));

    triggerSubEvent('error', { error: { code: 102, message: 'permission denied' } });
    expect(setChannelStatusMock).toHaveBeenCalledWith(channelName, ConnectionStatus.DENIED);
  });
});
