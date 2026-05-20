import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll, Mock } from 'vitest';
import { useLiveChat } from '@/hooks/use-live-chat';
import { useChannel } from '@/hooks/use-channel';
import { server } from '../../../tests/server';
import { http, HttpResponse } from 'msw';
import { creator_stage } from '@/lib/proto';
import { PublicationContext, SubscriptionState } from 'centrifuge/build/protobuf';

vi.mock('@/hooks/use-channel', () => ({
  useChannel: vi.fn(),
}));

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('useLiveChat hook', () => {
  let mockSubscription: { publish: Mock };
  let capturedOnPublication: ((ctx: PublicationContext) => void) | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    capturedOnPublication = undefined;

    mockSubscription = {
      publish: vi.fn().mockResolvedValue(undefined),
    };

    vi.mocked(useChannel).mockImplementation((_channelName, options) => {
      capturedOnPublication = options?.onPublication;
      return {
        subscription: mockSubscription as unknown as never,
        state: 'subscribed' as SubscriptionState,
      };
    });

    // Mock requestAnimationFrame
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      return setTimeout(() => callback(Date.now()), 0);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    server.resetHandlers();
  });

  it('retrieves initial chat history on mount', async () => {
    let called = false;
    server.use(
      http.get('/api/sessions/123/chat/recent', () => {
        called = true;
        return HttpResponse.json({
          messages: [
            {
              id: 'msg-1',
              user_id: 'user-1',
              role: 3,
              display_name: 'Alice',
              body: 'Hello initial',
              sent_at: { seconds: 1779878400, nanos: 0 },
              pinned: false,
            },
          ],
          pinned_message: {
            id: 'msg-pinned',
            user_id: 'user-owner',
            role: 1,
            display_name: 'Saurabh',
            body: 'Keep straight',
            sent_at: { seconds: 1779878300, nanos: 0 },
            pinned: true,
          },
        });
      })
    );

    const { result } = renderHook(() => useLiveChat('123'));

    // Wait for the async API fetch to complete and state to update
    await vi.waitFor(() => {
      expect(called).toBe(true);
      expect(result.current.messages.length).toBeGreaterThan(0);
    });

    expect(result.current.messages[0]).toEqual({
      id: 'msg-1',
      authorName: 'Alice',
      authorAvatarColor: expect.any(String),
      messageText: 'Hello initial',
      timestamp: expect.any(String),
      role: 'viewer',
      isPinned: false,
    });

    expect(result.current.pinnedMessage).toEqual({
      id: 'msg-pinned',
      authorName: 'Saurabh',
      authorAvatarColor: expect.any(String),
      messageText: 'Keep straight',
      timestamp: expect.any(String),
      role: 'owner',
      isPinned: true,
    });
  });

  it('buffers and flushes incoming messages using requestAnimationFrame', async () => {
    server.use(
      http.get('/api/sessions/123/chat/recent', () => {
        return HttpResponse.json({ messages: [], pinned_message: null });
      })
    );

    const { result } = renderHook(() => useLiveChat('123'));

    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Mock incoming publication with Protobuf bytes
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
        authorAvatarColor: expect.any(String),
        messageText: 'Hello real-time!',
        timestamp: expect.any(String),
        role: 'viewer',
        isPinned: false,
      },
    ]);
  });

  it('sends message by publishing encoded Protobuf bytes', async () => {
    server.use(
      http.get('/api/sessions/123/chat/recent', () => {
        return HttpResponse.json({ messages: [], pinned_message: null });
      })
    );

    const { result } = renderHook(() => useLiveChat('123'));

    await vi.waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.sendMessage('Hello outbound!');

    expect(mockSubscription.publish).toHaveBeenCalled();
    const publishedBytes = mockSubscription.publish.mock.calls[0]![0] as Uint8Array;
    expect(publishedBytes).toBeDefined();

    const decoded = creator_stage.realtime.v1.ChatPublishRequest.decode(publishedBytes);
    expect(decoded.body).toBe('Hello outbound!');
  });
});
