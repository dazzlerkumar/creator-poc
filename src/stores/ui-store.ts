import { create } from 'zustand';

interface UIState {
  isChatVisible: boolean;
  toggleChat: () => void;
  setChatVisible: (visible: boolean) => void;
  isChatLoading: boolean;
  setChatLoading: (visible: boolean) => void;
  showPayment: boolean;
  setShowPayment: (visible: boolean) => void;
  showQuiz: boolean;
  setShowQuiz: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isChatLoading: true,
  setChatLoading: (visible: boolean) => set({ isChatLoading: visible }),
  isChatVisible: true,
  toggleChat: () => set((state) => ({ isChatVisible: !state.isChatVisible })),
  setChatVisible: (visible) => set({ isChatVisible: visible }),
  showPayment: false,
  setShowPayment: (visible) => set({ showPayment: visible }),
  showQuiz: false,
  setShowQuiz: (visible) => set({ showQuiz: visible }),
}));
