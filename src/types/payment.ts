export enum PaymentStatus {
  IDLE = 'idle',
  PROCESSING = 'processing',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface PlanRegion {
  amount: number;
  discounted_amount: number | null;
  currency: string;
  gateway_id: number;
}

export interface ApiPlan {
  id: number;
  name: string;
  description: string;
  category: string;
  status: string;
  rank: number;
  base_plan_id: number | null;
  features: Record<string, unknown>;
  programs: Record<string, unknown>;
  metadata: Record<string, unknown>;
  is_international: boolean;
  country: string;
  regions: Record<string, PlanRegion>;
}

export interface CreateOrderPayload {
  plan_id: number;
  amount: number;
  currency: string;
  phone_number: string;
  member_name: string;
  member_email?: string;
  region_code?: string;
  notes?: Record<string, string>;
}

export interface CreateOrderResponse {
  id: string;
  orderId: string;
  plan_id: number;
  amount: number;
  currency: string;
  status: string;
  member_name: string;
  member_email: string;
  phone_number: string;
  gateway_id: number;
  gateway_order_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface VerifyPaymentPayload {
  order_id: string;
  razorpay_payment_id: string;
  signature: string;
}

export interface VerifyPaymentResponse {
  id: string;
  order_id: string;
  gateway_id: number;
  gateway_payment_id: string;
  gateway_signature: string;
  status: string;
  amount: number;
  currency: string;
  amount_refunded: number;
  receipt: string;
  phone_number: string;
  metadata: Record<string, unknown>;
  settlement_id: string | null;
  settled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentStatusResponse {
  status: 'created' | 'pending' | 'success' | 'failed';
  gateway_order_id: string;
  gateway_payment_id: string;
  amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentDetailsResponse {
  amount: number;
  amount_refunded: number;
  receipt: string;
  currency: string;
  status: string;
  order_id: string;
  plan_id: number;
  member_name: string;
  member_email: string;
  phone_number: string;
  gateway_order_id: string;
  gateway_payment_id: string;
  gateway_id: number;
  plan_category: string;
}

export interface SendReceiptPayload {
  gatewayPaymentId: string;
  phoneNumber: string;
  name?: string;
  email?: string;
  city?: string;
  state?: string;
  pincode?: string;
  address?: string;
  gstNumber?: string;
  gstCompanyName?: string;
  date?: string;
}

export interface ListPlansResponse {
  is_international?: boolean;
  country?: string;
  [planId: string]: unknown;
}

export interface ParsedPlansResponse {
  plans: ApiPlan[];
  isInternational: boolean;
  country: string;
}