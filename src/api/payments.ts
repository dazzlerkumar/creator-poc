import { PAYMENT_ENDPOINTS } from '@/config/endpoints';
import { client } from './client';

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

  // TODO: Remove cast when client body type is fixed
  return client<CreateOrderResponse>(PAYMENT_ENDPOINTS.CREATE_ORDER, {
    body: JSON.stringify({ amount, currency }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function verifyPayment(payload: VerifyPaymentPayload): Promise<VerifyPaymentResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    return { verified: true };
  }

  return client<VerifyPaymentResponse>(PAYMENT_ENDPOINTS.VERIFY, {
    body: JSON.stringify(payload),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}
