import { create } from 'zustand';
import { PaymentStatus } from '@/types/payment';

interface PaymentState {
  isPaymentOpen: boolean;
  status: PaymentStatus;
  internalOrderId: string | null;
  gatewayOrderId: string | null;
  gatewayPaymentId: string | null;
  errorMessage: string | null;
  openPayment: () => void;
  closePayment: () => void;
  setProcessing: (internalOrderId: string, gatewayOrderId: string) => void;
  setSuccess: (gatewayPaymentId: string) => void;
  setFailed: (error: string) => void;
  reset: () => void;
}

const INITIAL_STATE = {
  isPaymentOpen: false,
  status: PaymentStatus.IDLE,
  internalOrderId: null,
  gatewayOrderId: null,
  gatewayPaymentId: null,
  errorMessage: null,
};

export const usePaymentStore = create<PaymentState>((set) => ({
  ...INITIAL_STATE,
  openPayment: () => set({ isPaymentOpen: true, status: PaymentStatus.IDLE, errorMessage: null }),
  closePayment: () => set(INITIAL_STATE),
  setProcessing: (internalOrderId, gatewayOrderId) =>
    set({ status: PaymentStatus.PROCESSING, internalOrderId, gatewayOrderId }),
  setSuccess: (gatewayPaymentId) =>
    set({ status: PaymentStatus.SUCCESS, gatewayPaymentId, errorMessage: null }),
  setFailed: (error) => set({ status: PaymentStatus.FAILED, errorMessage: error }),
  reset: () => set(INITIAL_STATE),
}));
