import { create } from 'zustand';
import { PaymentStatus } from '@/types/payment';

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
  status: PaymentStatus.IDLE,
  orderId: null,
  paymentId: null,
  errorMessage: null,
};

export const usePaymentStore = create<PaymentState>((set) => ({
  ...INITIAL_STATE,
  openPayment: () => set({ isPaymentOpen: true, status: PaymentStatus.IDLE, errorMessage: null }),
  closePayment: () => set(INITIAL_STATE),
  setProcessing: (orderId) => set({ status: PaymentStatus.PROCESSING, orderId }),
  setSuccess: (paymentId) => set({ status: PaymentStatus.SUCCESS, paymentId, errorMessage: null }),
  setFailed: (error) => set({ status: PaymentStatus.FAILED, errorMessage: error }),
  reset: () => set(INITIAL_STATE),
}));
