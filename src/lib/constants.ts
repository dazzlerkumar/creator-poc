import { Plan } from "@/types/payment";

export const API_VERSION = 'v1';
export const APP_NAME = 'creator-stage-audience';
export const COOKIES_EXPIRY = 7 * 24 * 60 * 60; // 7 days in seconds
export const PAYMENT_SUCCESS_HIDE_DELAY_MS = 3 * 60 * 1000;
export const PAYMENT_DONE = "habuild-audience-payment-done"
export const HABUILD_WEBSITE_URL = 'https://habuild.com'
export const HABUILD_SUPPORT_CONTACT = 'https://wa.me/917969329686'

export const PLANS: Plan[] = [
  { id: "12m", label: "12 Months", amount: 99900, display: "₹999", badge: "Save 50%", currency: "INR" },
  { id: "6m", label: "6 months", amount: 69900, display: "₹699", badge: "Save 30%", currency: "INR" },
  { id: "3m", label: "3 months", amount: 29900, display: "₹299", badge: "Save 10%", currency: "INR" },
];

export const PAYMENT_CONFIG = {
  currency: "INR",
  productName: "Habuild Live Session",
  description: "Premium Live Yoga Session Access",
};