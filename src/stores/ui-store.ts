import { create } from 'zustand';

interface UIState {
  isChatVisible: boolean;
  toggleChat: () => void;
  setChatVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isChatVisible: true,
  toggleChat: () => set((state) => ({ isChatVisible: !state.isChatVisible })),
  setChatVisible: (visible) => set({ isChatVisible: visible }),
}));
