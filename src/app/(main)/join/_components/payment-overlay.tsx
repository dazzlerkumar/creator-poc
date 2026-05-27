"use client";

import { useEffect, useRef } from "react";
import { usePaymentStore } from "@/stores/payment-store";
import { useRazorpay } from "@/hooks/use-razorpay";
import { PaymentStatus } from "@/types/payment";
import { PAYMENT_CONFIG, PAYMENT_DONE, PAYMENT_SUCCESS_HIDE_DELAY_MS } from "@/lib/constants";
import LocalStorageService from "@/lib/local-storage";
import { useUIStore } from "@/stores/ui-store";

import { PaymentIdleCard } from "@/components/payments/payment-idle-card";
import { PaymentSuccessCard } from "@/components/payments/payment-success-card";
import { PaymentFailCard } from "@/components/payments/payment-fail-card";
import { ProcessingState } from "@/components/payments/processing-state";

export function PaymentOverlay() {
  const { status, reset, setSuccess } = usePaymentStore();
  const { initiatePayment } = useRazorpay();
  const { setShowPayment } = useUIStore();
  const initialCheckDone = useRef(false);

  useEffect(() => {
    if (!initialCheckDone.current) {
      if (LocalStorageService.get<boolean>(PAYMENT_DONE)) {
        setSuccess("paid_previously");
      }
      initialCheckDone.current = true;
    }
  }, [setSuccess]);

  useEffect(() => {
    if (status === PaymentStatus.SUCCESS) {
      const timer = setTimeout(() => {
        setShowPayment(false);
      }, PAYMENT_SUCCESS_HIDE_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [status, setShowPayment]);

  const handlePay = (amount: number, currency: string) => {
    initiatePayment({
      amount,
      currency,
      productName: PAYMENT_CONFIG.productName,
      description: PAYMENT_CONFIG.description,
    });
  };

  const handleRetry = () => {
    reset();
    setTimeout(() => {
      usePaymentStore.getState().openPayment();
    }, 0);
  };

  if (status === PaymentStatus.PROCESSING) {
    return <ProcessingState />;
  }
  if (status === PaymentStatus.SUCCESS) {
    return <PaymentSuccessCard />;
  }
  if (status === PaymentStatus.FAILED) {
    return <PaymentFailCard ctaFunction={handleRetry} />;
  }
  return (
    <PaymentIdleCard handlePay={handlePay} />
  );
}
