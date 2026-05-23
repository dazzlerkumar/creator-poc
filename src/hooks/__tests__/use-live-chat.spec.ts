import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { useLiveChat } from '@/hooks/use-live-chat';
import { useChannel } from '@/hooks/use-channel';
import { centrifugeClient } from '@/lib/centrifuge-client';
import { useRealtimeStore } from '@/stores/realtime-store';
import { creator_stage } from '@/lib/proto';
import { PublicationContext, SubscriptionState } from 'centrifuge/build/protobuf';
import { ConnectionStatus } from '@/types/realtime';

vi.mock('@/hooks/use-channel', () => ({
  useChannel: vi.fn(),
}));

vi.mock('@/lib/centrifuge-client', () => ({
  centrifugeClient: {
    createAudience: vi.fn(),
    get: vi.fn(),
  },
}));

vi.mock('@/stores/realtime-store', () => ({
  useRealtimeStore: vi.fn(),
}));

describe('useLiveChat hook', () => {
  let mockSubscription: { publish: Mock };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockClient: any;
  let capturedOnPublication: ((ctx: PublicationContext) => void) | undefined;
  let capturedDmOnPublication: ((ctx: PublicationContext) => void) | undefined;
  let setConnectionStatusMock: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    capturedOnPublication = undefined;

    mockSubscription = {
      publish: vi.fn().mockResolvedValue(undefined),
    };

    vi.mocked(useChannel).mockImplementation((channelName, options) => {
      if (channelName && channelName.includes(':broadcast')) {
        capturedOnPublication = options?.onPublication;
      } else if (channelName && channelName.includes(':dm')) {
        capturedDmOnPublication = options?.onPublication;
      }
      return {
        subscription: mockSubscription as unknown as never,
        state: 'subscribed' as SubscriptionState,
      };
    });

    mockClient = {
      on: vi.fn(),
      connect: vi.fn(),
      removeListener: vi.fn(),
    };
    vi.mocked(centrifugeClient.get).mockReturnValue(mockClient);

    setConnectionStatusMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useRealtimeStore).mockImplementation((selector: any) => {
      return selector({ setConnectionStatus: setConnectionStatusMock });
    });

    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      return setTimeout(() => callback(Date.now()), 0);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('initializes centrifuge audience and connects', () => {
    const { unmount } = renderHook(() => useLiveChat('123'));

    expect(centrifugeClient.createAudience).toHaveBeenCalledWith({
      videoBroadcastId: '123',
      userId: '2',
      displayName: 'Deepak',
    });

    expect(mockClient.on).toHaveBeenCalledWith('connecting', expect.any(Function));
    expect(mockClient.on).toHaveBeenCalledWith('connected', expect.any(Function));
    expect(mockClient.on).toHaveBeenCalledWith('disconnected', expect.any(Function));
    expect(mockClient.connect).toHaveBeenCalled();

    unmount();

    expect(mockClient.removeListener).toHaveBeenCalledWith('connecting', expect.any(Function));
    expect(mockClient.removeListener).toHaveBeenCalledWith('connected', expect.any(Function));
    expect(mockClient.removeListener).toHaveBeenCalledWith('disconnected', expect.any(Function));
  });

  it('updates connection status on centrifuge client events', () => {
    renderHook(() => useLiveChat('123'));

    const onCalls = mockClient.on.mock.calls;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connectingHandler = onCalls.find((c: any) => c[0] === 'connecting')[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connectedHandler = onCalls.find((c: any) => c[0] === 'connected')[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const disconnectedHandler = onCalls.find((c: any) => c[0] === 'disconnected')[1];

    act(() => connectingHandler());
    expect(setConnectionStatusMock).toHaveBeenCalledWith(ConnectionStatus.CONNECTING);

    act(() => connectedHandler());
    expect(setConnectionStatusMock).toHaveBeenCalledWith(ConnectionStatus.CONNECTED);

    act(() => disconnectedHandler());
    expect(setConnectionStatusMock).toHaveBeenCalledWith(ConnectionStatus.DISCONNECTED);
  });

  it('buffers and flushes incoming messages using requestAnimationFrame', async () => {
    const { result } = renderHook(() => useLiveChat('123'));

    expect(capturedOnPublication).toBeDefined();

    const pbMsg = creator_stage.realtime.v1.ChatMessage.create({
      id: 'msg-incoming-1',
      userId: 'user-incoming',
      role: creator_stage.realtime.v1.Role.ROLE_AUDIENCE,
      displayName: 'Bob',
      body: 'Hello real-time!',
      sentAt: { seconds: 1779878500, nanos: 0 },
      pinned: false,
    });
    const bytes = creator_stage.realtime.v1.ChatMessage.encode(pbMsg).finish();

    vi.useFakeTimers();

    act(() => {
      capturedOnPublication!({ data: bytes } as unknown as PublicationContext);
    });

    // State shouldn't be updated immediately due to buffering/RAF
    expect(result.current.messages).toEqual([]);

    // Run animation frame timeout
    await act(async () => {
      vi.runAllTimers();
    });

    vi.useRealTimers();

    expect(result.current.messages).toEqual([
      {
        id: 'msg-incoming-1',
        authorName: 'Bob',
        messageText: 'Hello real-time!',
        timestamp: expect.any(String),
        role: 'viewer',
        isPinned: false,
        isDm: false,
      },
    ]);
  });

  it('sets pinned message if incoming message is pinned', async () => {
    const { result } = renderHook(() => useLiveChat('123'));

    expect(capturedOnPublication).toBeDefined();

    const activityEnvelope = {
      kind: 'activity',
      payload: {
        body: 'pin',
        pin: {
          id: 'msg-pinned-1',
          userId: 'user-owner',
          role: 1, // ROLE_CREATOR
          displayName: 'Saurabh',
          body: 'Pinned message!',
          sentAt: { seconds: 1779878500, nanos: 0 },
          pinned: true,
        }
      }
    };

    vi.useFakeTimers();

    act(() => {
      capturedOnPublication!({ data: activityEnvelope } as unknown as PublicationContext);
    });

    await act(async () => {
      vi.runAllTimers();
    });

    vi.useRealTimers();

    expect(result.current.pinnedMessage).toEqual({
      id: 'msg-pinned-1',
      authorName: 'Saurabh',
      messageText: 'Pinned message!',
      timestamp: expect.any(String),
      role: 'owner',
      isPinned: true,
      isDm: false,
    });
  });

  it('sends message by publishing encoded Protobuf bytes', async () => {
    const { result } = renderHook(() => useLiveChat('123'));

    await act(async () => {
      await result.current.sendMessage('Hello outbound!');
    });

    expect(mockSubscription.publish).toHaveBeenCalled();
    const publishedBytes = mockSubscription.publish.mock.calls[0]![0] as Uint8Array;
    expect(publishedBytes).toBeDefined();

    const decoded = creator_stage.realtime.v1.ChatPublishRequest.decode(publishedBytes);
    expect(decoded.body).toBe('Hello outbound!');
  });

  it('handles DM publications', async () => {
    const { result } = renderHook(() => useLiveChat('123'));

    expect(capturedDmOnPublication).toBeDefined();

    const pbMsg = creator_stage.realtime.v1.ChatMessage.create({
      id: 'msg-dm-1',
      userId: 'user-dm',
      role: creator_stage.realtime.v1.Role.ROLE_AUDIENCE,
      displayName: 'Alice',
      body: 'Direct message!',
      sentAt: { seconds: 1779878500, nanos: 0 },
      pinned: false,
    });
    const bytes = creator_stage.realtime.v1.ChatMessage.encode(pbMsg).finish();

    act(() => {
      capturedDmOnPublication!({ data: bytes } as unknown as PublicationContext);
    });

    expect(result.current.messages).toEqual([
      {
        id: 'msg-dm-1',
        authorName: 'Alice',
        messageText: 'Direct message!',
        timestamp: expect.any(String),
        role: 'viewer',
        isPinned: false,
        isDm: true,
      },
    ]);
  });
});
