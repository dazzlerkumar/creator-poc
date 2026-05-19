import { create } from 'zustand';
import { ConnectionStatus } from '@/types/realtime';

interface RealtimeState {
  connectionStatus: ConnectionStatus;
  channelStatuses: Record<string, ConnectionStatus>;
}

interface RealtimeActions {
  setConnectionStatus: (status: ConnectionStatus) => void;
  setChannelStatus: (channel: string, status: ConnectionStatus) => void;
  reset: () => void;
}

export type RealtimeStore = RealtimeState & RealtimeActions;

const INITIAL_STATE: RealtimeState = {
  connectionStatus: ConnectionStatus.DISCONNECTED,
  channelStatuses: {},
};

export const useRealtimeStore = create<RealtimeStore>((set) => ({
  ...INITIAL_STATE,

  setConnectionStatus: (status) => set({ connectionStatus: status }),

  setChannelStatus: (channel, status) =>
    set((state) => ({
      channelStatuses: {
        ...state.channelStatuses,
        [channel]: status,
      },
    })),

  reset: () => set(INITIAL_STATE),
}));
