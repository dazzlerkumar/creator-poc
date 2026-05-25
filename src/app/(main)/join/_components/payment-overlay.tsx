"use client";

import { useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { usePaymentStore } from "@/stores/payment-store";
import { useRazorpay } from "@/hooks/use-razorpay";
import { PaymentStatus } from "@/types/payment";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// TODO: Need to implement real fetching of order
const PAYMENT_CONFIG = {
  amount: 49900,
  currency: "INR",
  productName: "Habuild Live Session",
  description: "Premium Live Yoga Session Access",
};

const PaymentIdleCard = ({ handlePay }: { handlePay: () => void }) => {
  return (
    <div className="h-max shrink-0 p-4">
      <div className="bg-[linear-gradient(89.95deg,#FFFFFF_0.05%,#EEF8F7_70.35%,#FDFEFF_96.52%)] rounded-3xl border border-secondary p-3 px-5 h-full flex flex-col justify-between relative overflow-hidden w-full">
        <div className="flex justify-between items-start flex-1 gap-2 relative z-10">
          {/* Left Content */}
          <div className="flex flex-col">
            <div className="relative w-14 aspect-[221/61] mb-6">
              <Image
                src="/logo-full.png"
                alt="Habuild"
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-foreground text-sm md:text-base font-bold leading-tight mb-4">
              Habuild Yoga Subscription
            </h3>
            <p className="text-muted-foreground text-xs leading-[1.5]">
              Join our global community and transform your life with daily yoga
              sessions.
            </p>
          </div>

          {/* Right Content */}
          <div className="w-28 md:w-30 shrink-0 flex flex-col items-center">
            <Image
              src="/saurabh-payment.png"
              alt="Saurabh Bothra"
              className="w-full object-contain mb-2"
              width={100}
              height={100}
            />
          </div>
        </div>

        <Button
          onClick={handlePay}
          variant={"brand"}
          className="mt-4 h-12"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}

const PaymentSuccessCard = () => {
  const handleViewBenefits = () => {
    window.open("https://habuild.com", "_blank", "noopener noreferrer");
  }

  return (
    <div className="h-max shrink-0 p-4">
      <div className="bg-accent-foreground rounded-3xl border border-accent p-5 py-6 h-full flex flex-col justify-between relative overflow-hidden w-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-7 h-7 text-accent-foreground fill-accent" />
            <h3 className="text-foreground text-base font-bold leading-tight">
              Subscription Active
            </h3>
          </div>
          <p className="text-grey-2 text-sm font-medium leading-[1.5]">
            Welcome to the community! Your daily wellness journey begins now.
          </p>
        </div>
        <Button
          onClick={handleViewBenefits}
          variant={"default"}
          className="h-12 bg-accent text-white rounded-4xl"
        >
          View Benefits
        </Button>
      </div>
    </div>
  );
}

const PaymentFailCard = ({ ctaFunction }: { ctaFunction: () => void }) => {
  return (
    <div className="h-max shrink-0 p-4">
      <div className="bg-destructive-foreground/40 rounded-3xl border border-destructive p-5 py-6 h-full flex flex-col justify-between relative overflow-hidden w-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-7 h-7 text-destructive-foreground fill-destructive" />
            <h3 className="text-foreground text-base font-bold leading-tight">
              Payment Failed
            </h3>
          </div>
          <p className="text-grey-2 text-sm font-medium leading-[1.5]">
            Something went wrong with your transaction. Please check your payment details and try again.
          </p>
        </div>
        <Button
          onClick={ctaFunction}
          variant={"default"}
          className="h-12 bg-destructive text-white rounded-4xl"
        >
          Retry Payment
        </Button>
      </div>
    </div>
  );
}

function ProcessingState() {
  return (
    <div className="h-max shrink-0 p-4">
      <div className="bg-[linear-gradient(89.95deg,#FFFFFF_0.05%,#EEF8F7_70.35%,#FDFEFF_96.52%)] rounded-3xl border border-secondary p-3 px-5 h-full flex flex-col justify-center items-center relative overflow-hidden w-full">
        <div className="relative w-12 aspect-[221/61]">
          <Image
            src="/logo-full.png"
            alt="Habuild"
            fill
            className="object-contain"
          />
        </div>
        <div className="w-16 h-16 rounded-full  flex items-center justify-center bg-transparent">
          <Loader2 size={28} className="text-primary animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <p className="font-bold text-sm text-foreground">Processing Payment</p>
          <p className="text-xs text-muted-foreground">
            Complete the payment in the Razorpay window
          </p>
        </div>
      </div>
    </div>
  );
}

export function PaymentOverlay() {
  const { status, closePayment, reset } =
    usePaymentStore();
  const { initiatePayment } = useRazorpay();

  useEffect(() => {
    if (status === PaymentStatus.SUCCESS) {
      const timer = setTimeout(() => closePayment(), 5000);
      return () => clearTimeout(timer);
    }
  }, [status, closePayment]);

  const handlePay = () => {
    initiatePayment({
      amount: PAYMENT_CONFIG.amount,
      currency: PAYMENT_CONFIG.currency,
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
