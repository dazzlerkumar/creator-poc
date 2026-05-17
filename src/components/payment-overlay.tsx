'use client';

import { useEffect } from 'react';
import { X, CreditCard, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePaymentStore } from '@/stores/payment-store';
import { useRazorpay } from '@/hooks/use-razorpay';

const PAYMENT_CONFIG = {
  amount: 49900,
  currency: 'INR',
  productName: 'Habuild Live Session',
  description: 'Premium Live Yoga Session Access',
  displayAmount: '499.00',
};

export function PaymentOverlay() {
  const { status, paymentId, errorMessage, closePayment, reset } = usePaymentStore();
  const { initiatePayment } = useRazorpay();

  useEffect(() => {
    if (status === 'success') {
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

  return (
    <div className="flex flex-col h-full bg-card text-foreground overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border select-none">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-primary" />
          <span className="font-bold text-sm text-foreground tracking-wide">Payment</span>
        </div>
        <button
          onClick={closePayment}
          className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close payment"
        >
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 min-h-0">
        {status === 'idle' && <IdleState onPay={handlePay} />}
        {status === 'processing' && <ProcessingState />}
        {status === 'success' && <SuccessState paymentId={paymentId} />}
        {status === 'failed' && (
          <FailedState
            error={errorMessage}
            onRetry={handleRetry}
            onCancel={closePayment}
          />
        )}
      </div>
    </div>
  );
}

function IdleState({ onPay }: { onPay: () => void }) {
  return (
    <div className="w-full max-w-xs space-y-6 animate-in fade-in duration-500">
      {/* Product card */}
      <div className="rounded-2xl border border-border bg-background p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--yoga-blue)] to-[var(--yoga-green)] flex items-center justify-center text-white shrink-0">
            <CreditCard size={22} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-foreground truncate">
              {PAYMENT_CONFIG.productName}
            </h3>
            <p className="text-xs text-muted-foreground">
              {PAYMENT_CONFIG.description}
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground font-medium">Total</span>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-foreground tracking-tight">
                {PAYMENT_CONFIG.displayAmount}
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                {PAYMENT_CONFIG.currency}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pay button */}
      <button
        onClick={onPay}
        className={cn(
          "w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95",
          "bg-gradient-to-r from-[var(--yoga-blue)] to-[var(--yoga-green)]",
          "hover:brightness-110 shadow-lg shadow-[var(--yoga-blue)]/20"
        )}
      >
        Pay Now
      </button>

      <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
        Secured by Razorpay. Your payment details are encrypted.
      </p>
    </div>
  );
}

function ProcessingState() {
  return (
    <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Loader2 size={28} className="text-primary animate-spin" />
      </div>
      <div className="text-center space-y-1">
        <p className="font-bold text-sm text-foreground">Processing Payment</p>
        <p className="text-xs text-muted-foreground">Complete the payment in the Razorpay window</p>
      </div>
    </div>
  );
}

function SuccessState({ paymentId }: { paymentId: string | null }) {
  return (
    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
        <CheckCircle2 size={32} className="text-accent" />
      </div>
      <div className="text-center space-y-1">
        <p className="font-bold text-sm text-foreground">Payment Successful</p>
        {paymentId && (
          <p className="text-[10px] text-muted-foreground font-mono break-all">
            ID: {paymentId}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-2">Returning to chat...</p>
      </div>
    </div>
  );
}

function FailedState({
  error,
  onRetry,
  onCancel,
}: {
  error: string | null;
  onRetry: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="w-full max-w-xs flex flex-col items-center gap-5 animate-in fade-in duration-500">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle size={32} className="text-destructive" />
      </div>
      <div className="text-center space-y-1">
        <p className="font-bold text-sm text-foreground">Payment Failed</p>
        {error && (
          <p className="text-xs text-muted-foreground">{error}</p>
        )}
      </div>
      <div className="w-full space-y-2">
        <button
          onClick={onRetry}
          className={cn(
            "w-full py-3 rounded-xl font-bold text-white transition-all active:scale-95",
            "bg-gradient-to-r from-[var(--yoga-blue)] to-[var(--yoga-green)]",
            "hover:brightness-110"
          )}
        >
          Try Again
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-xl font-medium text-muted-foreground bg-muted hover:bg-muted/80 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={14} />
          Back to Chat
        </button>
      </div>
    </div>
  );
}
