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

async function handleHabuildResponse<T>(promise: Promise<unknown>): Promise<T> {
  const responseData = await promise;
  const isWrapped = responseData && typeof responseData === 'object' && 'success' in responseData && 'data' in responseData;
  return isWrapped ? (responseData as { success: boolean; data: unknown }).data as T : responseData as T;
}

export async function listPlans(phoneNumber?: string): Promise<ParsedPlansResponse> {
  const params = new URLSearchParams();
  params.set('status', 'ACTIVE');
  params.set('type', 'STANDARD');
  if (phoneNumber) {
    params.set('phoneNumber', phoneNumber);
  }

  const url = `${PLAN_ENDPOINTS.LIST}?${params.toString()}`;
  const data = await handleHabuildResponse<ListPlansResponse>(
    clientApiRequest<unknown>(url, { method: 'GET' })
  );
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
  return handleHabuildResponse<ApiPlan>(
    clientApiRequest<unknown>(PLAN_ENDPOINTS.GET(id), { method: 'GET' })
  );
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  const data = await handleHabuildResponse<Partial<CreateOrderResponse> & Record<string, unknown>>(
    clientApi.post<unknown>(PAYMENT_ENDPOINTS.CREATE_ORDER, payload)
  );

  return {
    ...data,
    id: (data.orderId || data.id) as string,
    gateway_order_id: (data.gatewayOrderId || data.gateway_order_id) as string,
    gateway_id: (data.gatewayId || data.gateway_id) as number,
  } as CreateOrderResponse;
}

export async function verifyPayment(payload: VerifyPaymentPayload): Promise<VerifyPaymentResponse> {
  return handleHabuildResponse<VerifyPaymentResponse>(
    clientApi.post<unknown>(PAYMENT_ENDPOINTS.VERIFY, payload)
  );
}

export async function getPaymentStatus(orderId: string): Promise<PaymentStatusResponse> {
  return handleHabuildResponse<PaymentStatusResponse>(
    clientApi.get<unknown>(PAYMENT_ENDPOINTS.STATUS(orderId))
  );
}

export async function getPaymentDetails(gatewayPaymentId: string): Promise<PaymentDetailsResponse> {
  return handleHabuildResponse<PaymentDetailsResponse>(
    clientApi.get<unknown>(PAYMENT_ENDPOINTS.DETAILS(gatewayPaymentId))
  );
}

export async function sendPaymentReceipt(payload: SendReceiptPayload): Promise<{ message: string }> {
  return handleHabuildResponse<{ message: string }>(
    clientApi.post<unknown>(PAYMENT_ENDPOINTS.SEND_RECEIPT, payload)
  );
}
