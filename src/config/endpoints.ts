import { API_VERSION, APP_NAME } from '../lib/constants';

const BASE_API = `/api/${API_VERSION}/${APP_NAME}`;

const PAYMENT_SERVICE_URL =
    process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || '';

export const AUTH_ENDPOINTS = {
    LOGIN: `${BASE_API}/auth/login`,
    REFRESH_TOKEN: `${BASE_API}/auth/refresh`,
    LOGOUT: `${BASE_API}/auth/logout`,
    TOKEN: `${BASE_API}/auth/token`,
};

export const PLAN_ENDPOINTS = {
    LIST: `${PAYMENT_SERVICE_URL}/public/plan`,
    GET: (id: number): string => `${PAYMENT_SERVICE_URL}/public/plan/v1/${id}`,
};

export const PAYMENT_ENDPOINTS = {
    CREATE_ORDER: `${PAYMENT_SERVICE_URL}/payment/create-order`,
    VERIFY: `${PAYMENT_SERVICE_URL}/payment/verify-payment`,
    STATUS: (orderId: string): string => `${PAYMENT_SERVICE_URL}/payment/status/${orderId}`,
    DETAILS: (gatewayPaymentId: string): string => `${PAYMENT_SERVICE_URL}/payment/details/${gatewayPaymentId}`,
    SEND_RECEIPT: `${PAYMENT_SERVICE_URL}/payment/send-payment-receipt`,
};
