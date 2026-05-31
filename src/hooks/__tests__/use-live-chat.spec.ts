import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { useLiveChat } from '@/hooks/use-live-chat';
import { BroadcastRealtimeClient } from '@/lib/broadcast-realtime-client';
import { useRealtimeStore } from '@/stores/realtime-store';
import { useAuthStore } from '@/stores/auth-store';
import { useUIStore } from '@/stores/ui-store';
import { ConnectionStatus } from '@/types/realtime';
import type { ChatMessage } from '@/types/chat';

vi.mock('@/lib/broadcast-realtime-client');

vi.mock('@/stores/realtime-store', () => ({
  useRealtimeStore: vi.fn(),
}));

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('@/stores/ui-store', () => ({
  useUIStore: vi.fn(),
}));

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock('@/lib/jwt-decode', () => ({
  decodeJwt: vi.fn(),
}));

import Cookies from 'js-cookie';
import { decodeJwt } from '@/lib/jwt-decode';

describe('useLiveChat hook', () => {
  let setConnectionStatusMock: Mock;
  let setShowPaymentMock: Mock;
  let mockClientInstance: Partial<BroadcastRealtimeClient> & {
    connect: Mock;
    disconnect: Mock;
    sendMessage: Mock;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    setConnectionStatusMock = vi.fn();
    setShowPaymentMock = vi.fn();

    vi.mocked(useRealtimeStore).mockImplementation((selector: unknown) => {
      return (selector as (state: unknown) => unknown)({ setConnectionStatus: setConnectionStatusMock });
    });

    vi.mocked(useAuthStore).mockImplementation((selector: unknown) => {
      return (selector as (state: unknown) => unknown)({ jwt: 'test-jwt' });
    });

    vi.mocked(useUIStore).mockImplementation((selector: unknown) => {
      return (selector as (state: unknown) => unknown)({ setShowPayment: setShowPaymentMock });
    });

    mockClientInstance = {
      connect: vi.fn(),
      disconnect: vi.fn(),
      sendMessage: vi.fn().mockResolvedValue(undefined),
    };

    vi.mocked(BroadcastRealtimeClient).mockImplementation(function(this: unknown) {
      return mockClientInstance as unknown as BroadcastRealtimeClient;
    } as unknown as typeof BroadcastRealtimeClient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes BroadcastRealtimeClient and connects', () => {
    vi.mocked(Cookies.get).mockImplementation((key) => {
      if (key === 'audienceAccessToken') return 'fake-token';
      if (key === 'USER_DATA') return JSON.stringify({ name: 'TestUser' });
      return undefined;
    });

    vi.mocked(decodeJwt).mockReturnValue({
      payload: { accountId: 'test-account-id' },
    } as unknown as ReturnType<typeof decodeJwt>);

    const { unmount } = renderHook(() => useLiveChat('123'));

    expect(BroadcastRealtimeClient).toHaveBeenCalledWith(expect.objectContaining({
      sessionId: '123',
      userId: 'test-account-id',
      displayName: 'TestUser',
      token: 'test-jwt',
    }));

    expect(mockClientInstance.connect).toHaveBeenCalled();

    unmount();

    expect(mockClientInstance.disconnect).toHaveBeenCalled();
  });

  it('updates messages state when onMessages callback is invoked', () => {
    const { result } = renderHook(() => useLiveChat('123'));

    const options = vi.mocked(BroadcastRealtimeClient).mock.calls[0]![0];

    const msg1: ChatMessage = { id: '1', authorName: 'Alice', messageText: 'Hello', timestamp: 'time', role: 'viewer', isPinned: false, isDm: false };
    const msg2: ChatMessage = { id: '2', authorName: 'Bob', messageText: 'World', timestamp: 'time2', role: 'viewer', isPinned: false, isDm: false };

    act(() => {
      options.onMessages?.([msg1]);
    });

    expect(result.current.messages).toEqual([msg1]);

    act(() => {
      options.onMessages?.([msg1, msg2]);
    });

    expect(result.current.messages).toEqual([msg1, msg2]);
  });

  it('updates pinned message when onPin callback is invoked', () => {
    const { result } = renderHook(() => useLiveChat('123'));

    const options = vi.mocked(BroadcastRealtimeClient).mock.calls[0]![0];

    const pinnedMsg: ChatMessage = { id: 'pin1', authorName: 'Admin', messageText: 'Pinned', timestamp: 'time', role: 'owner', isPinned: true, isDm: false };

    act(() => {
      options.onPin?.(pinnedMsg);
    });

    expect(result.current.pinnedMessage).toEqual(pinnedMsg);

    act(() => {
      options.onPin?.(null);
    });

    expect(result.current.pinnedMessage).toBeNull();
  });

  it('calls setShowPayment(true) on onCtaPush with data and false on null', () => {
    renderHook(() => useLiveChat('123'));

    const options = vi.mocked(BroadcastRealtimeClient).mock.calls[0]![0];

    act(() => {
      options.onCtaPush?.({ id: 'cta-1', label: 'Pay now', url: 'https://pay.example.com/checkout/abc' });
    });

    expect(setShowPaymentMock).toHaveBeenCalledWith(true);

    act(() => {
      options.onCtaPush?.(null);
    });

    expect(setShowPaymentMock).toHaveBeenCalledWith(false);
  });

  it('sends message via client and optimistically updates messages', async () => {
    const localMsg: ChatMessage = { id: 'local1', authorName: 'Deepak', messageText: 'Sending this', timestamp: 'time', role: 'viewer', isPinned: false, isDm: false };
    mockClientInstance.sendMessage.mockResolvedValue(localMsg);

    const { result } = renderHook(() => useLiveChat('123'));

    await act(async () => {
      await result.current.sendMessage('Sending this');
    });

    expect(mockClientInstance.sendMessage).toHaveBeenCalledWith('Sending this');
    expect(result.current.messages).toContainEqual(localMsg);
  });

  it('updates connection status and loading state', () => {
    const { result } = renderHook(() => useLiveChat('123'));

    const options = vi.mocked(BroadcastRealtimeClient).mock.calls[0]![0];

    act(() => {
      options.onConnectionStatus?.(ConnectionStatus.CONNECTED);
    });

    expect(setConnectionStatusMock).toHaveBeenCalledWith(ConnectionStatus.CONNECTED);

    act(() => {
      options.onLoading?.(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('removes message when onRemoveMessage callback is invoked', () => {
    const { result } = renderHook(() => useLiveChat('123'));

    const options = vi.mocked(BroadcastRealtimeClient).mock.calls[0]![0];

    const msg1: ChatMessage = { id: '1', authorName: 'Alice', messageText: 'Hello', timestamp: 'time', role: 'viewer', isPinned: false, isDm: false };
    const msg2: ChatMessage = { id: '2', authorName: 'Bob', messageText: 'World', timestamp: 'time2', role: 'viewer', isPinned: false, isDm: false };

    act(() => {
      options.onMessages?.([msg1, msg2]);
    });

    expect(result.current.messages).toHaveLength(2);

    act(() => {
      options.onRemoveMessage?.('1');
    });

    expect(result.current.messages).toEqual([msg2]);
  });
});
