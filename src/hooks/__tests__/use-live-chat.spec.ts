import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { useLiveChat } from '@/hooks/use-live-chat';
import { BroadcastRealtimeClient } from '@/lib/broadcast-realtime-client';
import { useRealtimeStore } from '@/stores/realtime-store';
import { useAuthStore } from '@/stores/auth-store';
import { ConnectionStatus } from '@/types/realtime';

vi.mock('@/lib/broadcast-realtime-client');

vi.mock('@/stores/realtime-store', () => ({
  useRealtimeStore: vi.fn(),
}));

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

describe('useLiveChat hook', () => {
  let setConnectionStatusMock: Mock;
  let mockClientInstance: Partial<BroadcastRealtimeClient> & {
    connect: Mock;
    disconnect: Mock;
    sendMessage: Mock;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    setConnectionStatusMock = vi.fn();
    vi.mocked(useRealtimeStore).mockImplementation((selector: unknown) => {
      return (selector as (state: unknown) => unknown)({ setConnectionStatus: setConnectionStatusMock });
    });

    vi.mocked(useAuthStore).mockImplementation((selector: unknown) => {
      return (selector as (state: unknown) => unknown)({ jwt: 'test-jwt' });
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
    const { unmount } = renderHook(() => useLiveChat('123'));

    expect(BroadcastRealtimeClient).toHaveBeenCalledWith(expect.objectContaining({
      sessionId: '123',
      userId: expect.any(String),
      displayName: expect.any(String),
      token: 'test-jwt',
    }));

    expect(mockClientInstance.connect).toHaveBeenCalled();

    unmount();

    expect(mockClientInstance.disconnect).toHaveBeenCalled();
  });

  it('updates messages state when onMessages callback is invoked', () => {
    const { result } = renderHook(() => useLiveChat('123'));

    const options = vi.mocked(BroadcastRealtimeClient).mock.calls[0]![0];
    
    act(() => {
      options.onMessages?.([
        { id: '1', authorName: 'Alice', messageText: 'Hello', timestamp: 'time', role: 'viewer', isPinned: false, isDm: false }
      ]);
    });

    expect(result.current.messages).toEqual([
      { id: '1', authorName: 'Alice', messageText: 'Hello', timestamp: 'time', role: 'viewer', isPinned: false, isDm: false }
    ]);

    // De-duplication check
    act(() => {
      options.onMessages?.([
        { id: '1', authorName: 'Alice', messageText: 'Hello', timestamp: 'time', role: 'viewer', isPinned: false, isDm: false },
        { id: '2', authorName: 'Bob', messageText: 'World', timestamp: 'time2', role: 'viewer', isPinned: false, isDm: false }
      ]);
    });

    expect(result.current.messages).toEqual([
      { id: '1', authorName: 'Alice', messageText: 'Hello', timestamp: 'time', role: 'viewer', isPinned: false, isDm: false },
      { id: '2', authorName: 'Bob', messageText: 'World', timestamp: 'time2', role: 'viewer', isPinned: false, isDm: false }
    ]);
  });

  it('updates pinned message when onPin callback is invoked', () => {
    const { result } = renderHook(() => useLiveChat('123'));

    const options = vi.mocked(BroadcastRealtimeClient).mock.calls[0]![0];
    
    const pinnedMsg = { id: 'pin1', authorName: 'Admin', messageText: 'Pinned', timestamp: 'time', role: 'owner' as const, isPinned: true, isDm: false };
    
    act(() => {
      options.onPin?.(pinnedMsg);
    });

    expect(result.current.pinnedMessage).toEqual(pinnedMsg);

    act(() => {
      options.onPin?.(null);
    });

    expect(result.current.pinnedMessage).toBeNull();
  });

  it('sends message via client and optimistically updates messages', async () => {
    const localMsg = { id: 'local1', authorName: 'Deepak', messageText: 'Sending this', timestamp: 'time', role: 'viewer' as const, isPinned: false, isDm: false };
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
});
