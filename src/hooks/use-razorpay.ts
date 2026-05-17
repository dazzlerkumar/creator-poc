'use client';

import { useCallback, useRef } from 'react';
import { loadRazorpayScript } from '@/lib/razorpay';
import { createOrder, verifyPayment } from '@/api/payments';
import { usePaymentStore } from '@/stores/payment-store';
import type { RazorpayInstance, RazorpayOptions } from '@/types/razorpay.d';

const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_PLACEHOLDER';

interface PaymentConfig {
  amount: number;
  currency: string;
  productName: string;
  description: string;
}

export function useRazorpay() {
  const rzpRef = useRef<RazorpayInstance | null>(null);
  const { setProcessing, setSuccess, setFailed } = usePaymentStore();

  const initiatePayment = useCallback(async (config: PaymentConfig) => {
    try {
      await loadRazorpayScript();

      const order = await createOrder(config.amount, config.currency);
      setProcessing(order.orderId);

      const options: RazorpayOptions = {
        key: RAZORPAY_KEY,
        amount: config.amount,
        currency: config.currency,
        name: config.productName,
        description: config.description,
        order_id: order.orderId,
        handler: async (response) => {
          try {
            const result = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (result.verified) {
              setSuccess(response.razorpay_payment_id);
            } else {
              setFailed('Payment verification failed');
            }
          } catch {
            setFailed('Payment verification failed');
          }
        },
        modal: {
          escape: false,
          backdropclose: false,
          confirm_close: true,
          ondismiss: () => {
            setFailed('Payment was cancelled');
          },
        },
        theme: {
          color: '#3B82F6',
        },
      };

      const rzp = new window.Razorpay(options);
      rzpRef.current = rzp;
      rzp.open();
    } catch (error) {
      setFailed(error instanceof Error ? error.message : 'Payment initiation failed');
    }
  }, [setProcessing, setSuccess, setFailed]);

  return { initiatePayment };
}
