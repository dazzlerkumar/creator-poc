import { describe, expect, it, beforeEach } from 'vitest';
import { useRealtimeStore } from '@/stores/realtime-store';
import { ConnectionStatus } from '@/types/realtime';

describe('Realtime Store', () => {
  beforeEach(() => {
    useRealtimeStore.getState().reset();
  });

  it('initializes with disconnected status and empty channel statuses', () => {
    const state = useRealtimeStore.getState();
    expect(state.connectionStatus).toBe(ConnectionStatus.DISCONNECTED);
    expect(state.channelStatuses).toEqual({});
  });

  it('updates connection status', () => {
    useRealtimeStore.getState().setConnectionStatus(ConnectionStatus.CONNECTING);
    expect(useRealtimeStore.getState().connectionStatus).toBe(ConnectionStatus.CONNECTING);

    useRealtimeStore.getState().setConnectionStatus(ConnectionStatus.CONNECTED);
    expect(useRealtimeStore.getState().connectionStatus).toBe(ConnectionStatus.CONNECTED);

    useRealtimeStore.getState().setConnectionStatus(ConnectionStatus.DENIED);
    expect(useRealtimeStore.getState().connectionStatus).toBe(ConnectionStatus.DENIED);
  });

  it('updates channel status without affecting unrelated channels', () => {
    useRealtimeStore.getState().setChannelStatus('session:1:chat', ConnectionStatus.CONNECTING);
    expect(useRealtimeStore.getState().channelStatuses).toEqual({
      'session:1:chat': ConnectionStatus.CONNECTING,
    });

    useRealtimeStore.getState().setChannelStatus('session:1:activity', ConnectionStatus.CONNECTED);
    expect(useRealtimeStore.getState().channelStatuses).toEqual({
      'session:1:chat': ConnectionStatus.CONNECTING,
      'session:1:activity': ConnectionStatus.CONNECTED,
    });

    useRealtimeStore.getState().setChannelStatus('session:1:chat', ConnectionStatus.CONNECTED);
    expect(useRealtimeStore.getState().channelStatuses).toEqual({
      'session:1:chat': ConnectionStatus.CONNECTED,
      'session:1:activity': ConnectionStatus.CONNECTED,
    });
  });

  it('resets state correctly', () => {
    useRealtimeStore.getState().setConnectionStatus(ConnectionStatus.CONNECTED);
    useRealtimeStore.getState().setChannelStatus('session:1:chat', ConnectionStatus.CONNECTED);

    useRealtimeStore.getState().reset();

    const state = useRealtimeStore.getState();
    expect(state.connectionStatus).toBe(ConnectionStatus.DISCONNECTED);
    expect(state.channelStatuses).toEqual({});
  });
});
