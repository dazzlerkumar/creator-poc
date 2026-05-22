import { PAYMENT_ENDPOINTS } from '@/config/endpoints';
import { clientApi } from '@/lib/api-client';

interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}

interface VerifyPaymentPayload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface VerifyPaymentResponse {
  verified: boolean;
}

const USE_MOCK = true;

export async function createOrder(amount: number, currency: string): Promise<CreateOrderResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 500));
    return {
      orderId: `order_mock_${Date.now()}`,
      amount,
      currency,
    };
  }

  return clientApi.post<CreateOrderResponse>(PAYMENT_ENDPOINTS.CREATE_ORDER, { amount, currency });
}

export async function verifyPayment(payload: VerifyPaymentPayload): Promise<VerifyPaymentResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    return { verified: true };
  }

  return clientApi.post<VerifyPaymentResponse>(PAYMENT_ENDPOINTS.VERIFY, payload);
}
