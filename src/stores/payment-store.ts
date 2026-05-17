import { create } from 'zustand';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

interface PaymentState {
  isPaymentOpen: boolean;
  status: PaymentStatus;
  orderId: string | null;
  paymentId: string | null;
  errorMessage: string | null;
  openPayment: () => void;
  closePayment: () => void;
  setProcessing: (orderId: string) => void;
  setSuccess: (paymentId: string) => void;
  setFailed: (error: string) => void;
  reset: () => void;
}

const INITIAL_STATE = {
  isPaymentOpen: false,
  status: 'idle' as PaymentStatus,
  orderId: null,
  paymentId: null,
  errorMessage: null,
};

export const usePaymentStore = create<PaymentState>((set) => ({
  ...INITIAL_STATE,
  openPayment: () => set({ isPaymentOpen: true, status: 'idle', errorMessage: null }),
  closePayment: () => set(INITIAL_STATE),
  setProcessing: (orderId) => set({ status: 'processing', orderId }),
  setSuccess: (paymentId) => set({ status: 'success', paymentId, errorMessage: null }),
  setFailed: (error) => set({ status: 'failed', errorMessage: error }),
  reset: () => set(INITIAL_STATE),
}));
