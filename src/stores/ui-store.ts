import { create } from 'zustand';

interface UIState {
  isChatVisible: boolean;
  toggleChat: () => void;
  setChatVisible: (visible: boolean) => void;
  isChatLoading: boolean;
  setChatLoading: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isChatLoading: true,
  setChatLoading: (visible: boolean) => set({ isChatLoading: visible }),
  isChatVisible: true,
  toggleChat: () => set((state) => ({ isChatVisible: !state.isChatVisible })),
  setChatVisible: (visible) => set({ isChatVisible: visible }),
}));
