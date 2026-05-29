"use client";

import { useCallback, useRef } from "react";
import { loadRazorpayScript } from "@/lib/razorpay";
import { createOrder, verifyPayment } from "@/api/payments";
import { usePaymentStore } from "@/stores/payment-store";
import LocalStorageService from "@/lib/local-storage";
import type { RazorpayInstance, RazorpayOptions } from "@/types/razorpay.d";
import type { CreateOrderPayload } from "@/types/payment";
import { 
  PAYMENT_DONE,
  PAYMENT_INTERNAL_ORDER_ID,
  PAYMENT_GATEWAY_ORDER_ID,
  PAYMENT_GATEWAY_PAYMENT_ID
} from "@/lib/constants";

const RAZORPAY_KEY =
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_PLACEHOLDER";

export interface PaymentConfig {
  planId: number;
  amount: number;
  currency: string;
  phoneNumber: string;
  memberName: string;
  memberEmail?: string;
  regionCode?: string;
  productName: string;
  description: string;
}

export function useRazorpay(): { initiatePayment: (config: PaymentConfig) => Promise<void> } {
  const rzpRef = useRef<RazorpayInstance | null>(null);
  const { setProcessing, setSuccess, setFailed } = usePaymentStore();

  const initiatePayment = useCallback(
    async (config: PaymentConfig): Promise<void> => {
      try {
        await loadRazorpayScript();

        const orderPayload: CreateOrderPayload = {
          plan_id: config.planId,
          amount: config.amount,
          currency: config.currency,
          phone_number: config.phoneNumber,
          member_name: config.memberName,
          ...(config.memberEmail ? { member_email: config.memberEmail } : {}),
          region_code: config.regionCode || "IND",
        };

        const order = await createOrder(orderPayload);
        const internalOrderId = order.id;
        const gatewayOrderId = order.gateway_order_id;

        LocalStorageService.set(PAYMENT_INTERNAL_ORDER_ID, internalOrderId);
        LocalStorageService.set(PAYMENT_GATEWAY_ORDER_ID, gatewayOrderId);

        setProcessing(internalOrderId, gatewayOrderId);

        const options: RazorpayOptions = {
          key: RAZORPAY_KEY,
          amount: config.amount,
          currency: config.currency,
          name: config.productName,
          description: config.description,
          order_id: gatewayOrderId,
          prefill: {
            contact: config.phoneNumber,
            name: config.memberName,
            ...(config.memberEmail ? { email: config.memberEmail } : {}),
          },
          handler: async (response) => {
            try {
              const result = await verifyPayment({
                order_id: internalOrderId,
                razorpay_payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              });

              if (result.status === "success" || result.status === "captured") {
                LocalStorageService.set(PAYMENT_DONE, true);
                LocalStorageService.set(PAYMENT_GATEWAY_PAYMENT_ID, result.gateway_payment_id);
                setSuccess(result.gateway_payment_id);
              } else {
                setFailed("Payment verification failed");
              }
            } catch {
              setFailed("Payment verification failed");
            }
          },
          modal: {
            escape: false,
            backdropclose: false,
            confirm_close: true,
            ondismiss: () => {
              setFailed("Payment was cancelled");
            },
          },
          theme: {
            color: "#3B82F6",
          },
        };

        const rzp = new window.Razorpay(options);
        rzpRef.current = rzp;
        rzp.open();
      } catch (error) {
        setFailed(
          error instanceof Error ? error.message : "Payment initiation failed",
        );
      }
    },
    [setProcessing, setSuccess, setFailed],
  );

  return { initiatePayment };
}
