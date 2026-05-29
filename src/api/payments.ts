"use client";

import { PLAN_ENDPOINTS, PAYMENT_ENDPOINTS } from '@/config/endpoints';
import { clientApi, clientApiRequest } from '@/lib/api-client';
import type {
  ListPlansResponse,
  ParsedPlansResponse,
  ApiPlan,
  CreateOrderPayload,
  CreateOrderResponse,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
  PaymentStatusResponse,
  PaymentDetailsResponse,
  SendReceiptPayload,
} from '@/types/payment';

export async function listPlans(phoneNumber?: string): Promise<ParsedPlansResponse> {
  const params = new URLSearchParams();
  params.set('status', 'ACTIVE');
  params.set('type', 'STANDARD');
  if (phoneNumber) {
    params.set('phoneNumber', phoneNumber);
  }
  /*   params.set('phoneNumber', `+97142345678`); */
  const url = `${PLAN_ENDPOINTS.LIST}?${params.toString()}`;
  const responseData = await clientApiRequest<ListPlansResponse | { success: boolean; data: ListPlansResponse }>(url, { method: 'GET' });
  
  const data = 'success' in responseData && 'data' in responseData ? responseData.data : responseData;
  console.log("api", data)

  const isInternational = Boolean(data.is_international);
  const country = String(data.country || 'IND');

  const plans: ApiPlan[] = [];
  for (const key in data) {
    if (key !== 'is_international' && key !== 'country' && typeof data[key] === 'object' && data[key] !== null) {
      plans.push(data[key] as ApiPlan);
    }
  }

  plans.sort((a, b) => a.rank - b.rank);

  return { plans, isInternational, country };
}

export async function getPlan(id: number): Promise<ApiPlan> {
  return clientApiRequest<ApiPlan>(PLAN_ENDPOINTS.GET(id), { method: 'GET' });
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  return clientApi.post<CreateOrderResponse>(
    PAYMENT_ENDPOINTS.CREATE_ORDER,
    payload,
  );
}

export async function verifyPayment(payload: VerifyPaymentPayload): Promise<VerifyPaymentResponse> {
  return clientApi.post<VerifyPaymentResponse>(
    PAYMENT_ENDPOINTS.VERIFY,
    payload,
  );
}

export async function getPaymentStatus(orderId: string): Promise<PaymentStatusResponse> {
  return clientApi.get<PaymentStatusResponse>(
    PAYMENT_ENDPOINTS.STATUS(orderId),
  );
}

export async function getPaymentDetails(gatewayPaymentId: string): Promise<PaymentDetailsResponse> {
  return clientApi.get<PaymentDetailsResponse>(
    PAYMENT_ENDPOINTS.DETAILS(gatewayPaymentId),
  );
}

export async function sendPaymentReceipt(payload: SendReceiptPayload): Promise<{ message: string }> {
  return clientApi.post<{ message: string }>(
    PAYMENT_ENDPOINTS.SEND_RECEIPT,
    payload,
  );
}
