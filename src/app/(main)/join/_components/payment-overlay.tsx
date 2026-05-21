"use client";

import { useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Star,
  RefreshCw,
} from "lucide-react";
import { usePaymentStore } from "@/stores/payment-store";
import { useRazorpay } from "@/hooks/use-razorpay";
import { PaymentStatus } from "@/types/payment";

const PAYMENT_CONFIG = {
  amount: 49900,
  currency: "INR",
  productName: "Habuild Live Session",
  description: "Premium Live Yoga Session Access",
  displayAmount: "499.00",
};

interface PaymentCardProps {
  containerClassName: string;
  watermark: React.ReactNode;
  badgeClassName: string;
  badgeIcon: React.ReactNode;
  title: string;
  titleClassName: string;
  subtitle: string;
  subtitleClassName: string;
  description: string;
  descriptionClassName: string;
  children: React.ReactNode;
}

function PaymentCard({
  containerClassName,
  watermark,
  badgeClassName,
  badgeIcon,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  description,
  descriptionClassName,
  children,
}: PaymentCardProps) {
  return (
    <div
      className={`p-6 relative overflow-hidden h-full flex flex-col justify-between ${containerClassName}`}
    >
      <div className="absolute -top-6 -right-6 opacity-10 pointer-events-none select-none">
        {watermark}
      </div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${badgeClassName}`}
            >
              {badgeIcon}
            </div>
            <div className="flex flex-col min-w-0">
              <h3
                className={`font-bold leading-tight truncate ${titleClassName}`}
              >
                {title}
              </h3>
              <p
                className={`text-[11px] uppercase tracking-[0.15em] font-bold ${subtitleClassName}`}
              >
                {subtitle}
              </p>
            </div>
          </div>
          <p
            className={`text-[14px] leading-relaxed font-medium ${descriptionClassName}`}
          >
            {description}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

function YogaIcon({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M272-160q-30 0-51-21t-21-51q0-21 12-39.5t32-26.5l156-62v-90q-54 63-125.5 96.5T120-320v-80q68 0 123.5-28T344-508l54-64q12-14 28-21t34-7h40q18 0 34 7t28 21l54 64q45 52 100.5 80T840-400v80q-83 0-154.5-33.5T560-450v90l156 62q20 8 32 26.5t12 39.5q0 30-21 51t-51 21H400v-20q0-26 17-43t43-17h120q9 0 14.5-5.5T600-260q0-9-5.5-14.5T580-280H460q-42 0-71 29t-29 71v20h-88Zm151.5-503.5Q400-687 400-720t23.5-56.5Q447-800 480-800t56.5 23.5Q560-753 560-720t-23.5 56.5Q513-640 480-640t-56.5-23.5Z" />
    </svg>
  );
}

function ProcessingState() {
  return (
    <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300 bg-[linear-gradient(135deg,#005ab4_0%,#0076e6_50%,#00458d_100%)] h-55 shrink-0 w-full justify-center">
      <div className="w-16 h-16 rounded-full  flex items-center justify-center bg-white">
        <Loader2 size={28} className="text-primary animate-spin" />
      </div>
      <div className="text-center space-y-1">
        <p className="font-bold text-sm text-white">Processing Payment</p>
        <p className="text-xs text-white/70">
          Complete the payment in the Razorpay window
        </p>
      </div>
    </div>
  );
}

export function PaymentOverlay() {
  const { status, paymentId, errorMessage, closePayment, reset } =
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

  const cardConfig = {
    [PaymentStatus.IDLE]: {
      containerClassName:
        "bg-[linear-gradient(135deg,#005ab4_0%,#0076e6_50%,#00458d_100%)]",
      watermark: <YogaIcon size={120} className="text-white" />,
      badgeClassName:
        "bg-white/20 backdrop-blur-md border border-white/30 text-white",
      badgeIcon: <YogaIcon size={28} />,
      title: "Habuild Yoga Subscription",
      titleClassName: "text-white text-[16px]",
      subtitle: "SPECIAL COMMUNITY OFFER",
      subtitleClassName: "text-white/70",
      description:
        "Join our global community and transform your life with daily yoga sessions.",
      descriptionClassName: "text-white/90",
      children: (
        <button
          onClick={handlePay}
          className="w-full py-3 bg-white text-[var(--yoga-blue)] font-bold rounded-xl hover:bg-slate-50 hover:shadow-lg hover:shadow-[var(--yoga-blue)]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg text-[15px] cursor-pointer"
        >
          Pay Now
          <ArrowRight className="w-5 h-5" />
        </button>
      ),
    },
    [PaymentStatus.SUCCESS]: {
      containerClassName: "bg-green-50",
      watermark: <CheckCircle2 size={120} className="text-green-600" />,
      badgeClassName: "bg-green-100 border border-green-200",
      badgeIcon: <CheckCircle2 className="text-green-600 w-8 h-8" />,
      title: "Subscription Active",
      titleClassName: "text-foreground text-[18px]",
      subtitle: "Verified Member",
      subtitleClassName: "text-green-700",
      description:
        "Welcome to the community! Your daily wellness journey begins now.",
      descriptionClassName: "text-muted-foreground",
      children: (
        <div className="flex flex-col gap-2">
          <button className="w-full py-3 bg-white border border-border text-foreground font-bold rounded-xl hover:bg-muted active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[15px] cursor-pointer">
            View Benefits
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </button>
          {paymentId && (
            <p className="text-[9px] text-muted-foreground/60 font-mono text-center truncate select-all">
              ID: {paymentId}
            </p>
          )}
        </div>
      ),
    },
    [PaymentStatus.FAILED]: {
      containerClassName: "bg-red-50",
      watermark: <AlertCircle size={120} className="text-red-500" />,
      badgeClassName: "bg-red-100 border border-red-200",
      badgeIcon: <AlertCircle className="text-red-500 w-8 h-8" />,
      title: "Payment Failed",
      titleClassName: "text-red-700 text-[18px]",
      subtitle: "Transaction Issue",
      subtitleClassName: "text-red-500",
      description:
        errorMessage ||
        "Something went wrong with your transaction. Please check your payment details and try again.",
      descriptionClassName: "text-muted-foreground",
      children: (
        <div className="space-y-2">
          <button
            onClick={handleRetry}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[15px] cursor-pointer"
          >
            Retry Payment
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  };

  const currentConfig =
    cardConfig[status as Exclude<PaymentStatus, PaymentStatus.PROCESSING>];

  if (!currentConfig) return null;

  return (
    <div className="h-55 shrink-0">
      <PaymentCard {...currentConfig} />
    </div>
  );
}
